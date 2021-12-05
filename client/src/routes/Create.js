import React, { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import { hasEthereum } from "../utils/ethereum";
import { Form, Row, Button, Typography } from "@douyinfe/semi-ui";
// import { useFormState } from "@douyinfe/semi-ui";

// Import the contract ABI
import DeGame_Core from "../contracts/DeGame_Core.json";
import DeGame_Listing from "../contracts/DeGame_Listing.json";

export default function Create() {
  // // To inspect the values of the form, use the `useFormState` hook.
  // const ComponentUsingFormState = () => {
  //   const formState = useFormState();
  //   return (
  //     <div style={{ wordWrap: true, marginTop: 20 }}>
  //       <Paragraph type="tertiary">{JSON.stringify(formState)}</Paragraph>
  //     </div>
  //   );
  // };

  // Set up states for the form
  // eslint-disable-next-line
  const [category, setCategory] = useState("");
  // eslint-disable-next-line
  const [title, setTitle] = useState("");
  // eslint-disable-next-line
  const [price, setPrice] = useState("");
  // eslint-disable-next-line
  const [location, setLocation] = useState("");
  // eslint-disable-next-line
  const [description, setDescription] = useState("");
  // eslint-disable-next-line
  const [shipment, setShipment] = useState("");
  // eslint-disable-next-line
  const [agree, setAgree] = useState(false);
  const [connectedWalletAddress, setConnectedWalletAddressState] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submittedMsg, setSubmittedMsg] = useState("");
  const [loginMsg, setLoginMsg] = useState("");
  const categoryRef = useRef();
  const titleRef = useRef();
  const priceRef = useRef();
  const locationRef = useRef();
  const descriptionRef = useRef();
  const shipmentRef = useRef();
  const agreeRef = useRef();

  // If wallet is already connected...
  useEffect(() => {
    if (!hasEthereum()) {
      setConnectedWalletAddressState(
        `\u{1F3E6} MetaMask unavailable. Please connect wallet in order to create a listing.`
      );
      setDisableSubmit(true);
      return;
    }
    async function setConnectedWalletAddress() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      try {
        const signerAddress = await signer.getAddress();

        setConnectedWalletAddressState(
          `\u{1F3E6} Connected wallet: ${signerAddress}`
        );
      } catch {
        setConnectedWalletAddressState("\u{1F3E6} No wallet connected");
        return;
      }
    }
    async function setLoginMessage() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress();
      // check against hasura server see if the user already registered details
      // if not, then disable the submit button and show the message

      var myHeaders = new Headers();
      myHeaders.append("content-type", "application/json");
      myHeaders.append(
        "x-hasura-admin-secret",
        process.env.REACT_APP_HASURA_GRAPHQL_ADMIN_SECRET
      );

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch(
        "https://degame-cat-2v0s2t.hasura.app/api/rest/check_signup?_eq=" +
          signerAddress,
        requestOptions
      )
        .then((response) => response.json())
        .catch((error) => console.log("error", error));

      if (response["users"].length < 1) {
        setLoginMsg(
          "\u{1F92D} Please register your details first before creating a new listing."
        );
        setDisableSubmit(true);
      } else {
        console.log("user already registered");
      }
    }
    setConnectedWalletAddress();
    setLoginMessage();
  }, []);

  // Request access to MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  // Call smart contract, set new value
  async function createGameListingViaContract(e) {
    if (!hasEthereum()) {
      setConnectedWalletAddressState(`MetaMask unavailable`);
      return;
    }
    setLoading(true);
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    // TODO Check if the address has enough balance to pay for the transaction
    // const web3 = require("web3");
    // Ether is equal to MATIC here
    // const amount = web3.utils.toWei("0.1", "ether");
    setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`);

    // Get Metadata from Hasura Server by referencing the title
    var myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");
    myHeaders.append(
      "x-hasura-admin-secret",
      process.env.REACT_APP_HASURA_GRAPHQL_ADMIN_SECRET
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(
      process.env.REACT_APP_HASURA_API_URL +
        "get_featured_metadata?_iregex=" +
        titleRef.current.value,
      requestOptions
    )
      .then((res) => res.json())
      .catch((error) => console.log("error", error));

    const NFTcontract = new ethers.Contract(
      "0x64c4bC7008Af9ebB2CC084FFA443DF74DDF35d49",
      DeGame_Listing,
      signer
    );
    const CoreContract = new ethers.Contract(
      "0xcF273e8a5381EaC0eE797127e60eD3015d366291",
      DeGame_Core,
      signer
    );

    if (response["game"].length < 1) {
      const metadata = "ipfs://QmdcW3oaiC4VsvWhM2d6vJuakjMFtJTKvTZS3zZteqokf4";
      const NFTtransaction = await NFTcontract.createGameListing(metadata);
      await NFTtransaction.wait();
      console.log(NFTtransaction);
    } else {
      const metadata = response["game"][0]["metadata"];
      const NFTtransaction = await NFTcontract.createGameListing(metadata);
      await NFTtransaction.wait();
      console.log(NFTtransaction);
    }

    // TODO How to get the returned GameID? msg.sender?
    const GetIDTransaction = await NFTcontract.getLastListingID();

    // call the contract function .createGameItem() from the DeGame_Core smart contract
    const options = { value: "100000000000000000" }; // current listing fee is 0.1 MATIC
    const CoreTransaction = await CoreContract.createGameItem(
      "0x64c4bC7008Af9ebB2CC084FFA443DF74DDF35d49",
      GetIDTransaction,
      "100000000000000000",
      options
    );
    await CoreTransaction.wait();
    console.log(CoreTransaction);
    setSubmittedMsg(`🎉 Your game had been listed!`);

    // TODO Submit form to Hasura Server for internal use
    // TODO Need to first build users database in Hasura Server

    categoryRef.current.value = "";
    titleRef.current.value = "";
    priceRef.current.value = "";
    locationRef.current.value = "";
    descriptionRef.current.value = "";
    shipmentRef.current.value = "";
    agreeRef.current.checked = false;
    setCategory("");
    setTitle("");
    setPrice("");
    setLocation("");
    setDescription("");
    setShipment("");
    setAgree(false);
    setLoading(false);
  }

  const { Input, InputNumber, Select, TextArea, Checkbox, Switch } = Form;
  const { Title, Paragraph } = Typography;
  const style = { width: "100%" };
  const treeData = [
    {
      label: "VIC",
      value: "VIC",
      key: "0",
      children: [
        {
          label: "Melbourne",
          value: "Melbourne",
          key: "0-0",
          children: [
            {
              label: "City",
              value: "City",
              key: "0-0-0",
            },
            {
              label: "Richmond",
              value: "Richmond",
              key: "0-0-1",
            },
          ],
        },
      ],
    },
    {
      label: "NSW",
      value: "NSW",
      key: "1",
    },
    {
      label: "QLD",
      value: "QLD",
      key: "2",
    },
    {
      label: "WA",
      value: "WA",
      key: "3",
    },
    {
      label: "SA",
      value: "SA",
      key: "4",
    },
    {
      label: "NT",
      value: "NT",
      key: "5",
    },
    {
      label: "TAS",
      value: "TAS",
      key: "6",
    },
  ];

  return (
    <div
      className="create"
      style={{
        display: "inline-flex",
        maxWidth: "850px",
        width: "95%",
      }}
    >
      <Form
        style={{ padding: 10, width: "100%", wordWrap: "break-word" }}
        onSubmit={createGameListingViaContract}
      >
        <Title heading={5} style={{ marginBottom: 10 }}>
          {`\u{1F195}`} Create a New Listing
        </Title>
        <Paragraph type="tertiary">
          {`Fill in the below informations to list your game to the DeGame marketplace. The game listing will be published under your ethereum wallet address deposit is required for each listing. Deposit amount is equal to the list price you set. Deposit will be returned to your wallet once trade completed.`}
        </Paragraph>
        <Paragraph type="secondary">
          {connectedWalletAddress && (
            <p className="text-md">{connectedWalletAddress}</p>
          )}
        </Paragraph>
        <div style={{ marginTop: 10 }}>
          {loginMsg && <Paragraph type="danger">{loginMsg}</Paragraph>}
        </div>
        <br />
        <Row>
          <Select
            field="category"
            style={style}
            label={"\u{1F4C2} Category"}
            placeholder="Select"
            ref={categoryRef}
            onValueChange={(e) => setCategory(e.target.value)}
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select.Option value="Nintendo Switch">
              Nintendo Switch
            </Select.Option>
          </Select>
        </Row>
        <Row>
          <Input
            field="title"
            label={"\u{1F3AE} What game are you selling?"}
            initValue={"Animal Crossing™: New Horizons"}
            style={style}
            trigger="blur"
            ref={titleRef}
            name="title"
            onValueChange={(e) => setTitle(e.target.value)}
            rules={[{ required: true, message: "Please enter the game title" }]}
          />
        </Row>
        <Row>
          <InputNumber
            field="price"
            label={"\u{1F4B2} List Price ($)"}
            initValue={20}
            style={style}
            ref={priceRef}
            onValueChange={(e) => setPrice(e.target.value)}
            rules={[{ required: true, message: "Please enter the list price" }]}
          />
        </Row>
        <Row>
          <Form.Cascader
            placeholder="Choose Area"
            treeData={treeData}
            field="location"
            label={"\u{1F310} Location"}
            style={style}
            ref={locationRef}
            onValueChange={(e) => setLocation(e.target.value)}
            rules={[{ required: true, message: "Please select a location" }]}
          ></Form.Cascader>
        </Row>
        <Row>
          <TextArea
            field="description"
            label={"\u{1F4DD} Description"}
            maxCount={1000}
            ref={descriptionRef}
            onValueChange={(e) => setDescription(e.target.value)}
            initValue="do Lorem velit elit consectetur minim dolor eiusmod reprehenderit laborum excepteur consectetur consequat qui occaecat sit commodo ex commodo exercitation cillum sunt mollit amet reprehenderit amet deserunt excepteur ullamco tempor exercitation Lorem nulla aliquip mollit consectetur ut eu anim exercitation quis voluptate eu laboris voluptate elit dolore culpa non occaecat"
            rules={[
              {
                required: true,
                message: "Please enter the description",
              },
            ]}
          />
        </Row>
        <Row>
          <Switch
            field="shipping"
            label={"\u{1F4E6} Offer Shipping"}
            style={{ marginRight: "95%" }}
            ref={shipmentRef}
            onValueChange={(e) => setShipment(e.target.checked)}
          />
        </Row>
        <Checkbox
          value="false"
          field="agree"
          noLabel={true}
          ref={agreeRef}
          onValueChange={(e) => setAgree(e.target.checked)}
          rules={[{ required: true, message: "Please agree to the terms" }]}
        >
          I agree to publicly list the item on the blockchain
        </Checkbox>
        <div style={{ marginTop: 10 }} />
        <Button
          type="primary"
          htmlType="submit"
          className="btn-margin-right"
          disabled={disableSubmit}
          loading={loading}
        >
          Submit
        </Button>
        <Button htmlType="reset">Reset</Button>
        <div style={{ marginTop: 30 }}>
          {submittedMsg && (
            <Title heading={4} type="success">
              {submittedMsg}
            </Title>
          )}
        </div>
      </Form>
    </div>
  );
}
