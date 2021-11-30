import React, { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import { hasEthereum } from "../utils/ethereum";
import { Form, Row, Button, Typography } from "@douyinfe/semi-ui";
import { useFormState } from "@douyinfe/semi-ui";

// Import the contract ABI
import DeGame_Core from "../contracts/DeGame_Core.json";
import DeGame_Listing from "../contracts/DeGame_Listing.json";

export default function Create() {
  // To inspect the values of the form, use the `useFormState` hook.
  const ComponentUsingFormState = () => {
    const formState = useFormState();
    return (
      <div style={{ wordWrap: true, marginTop: 20 }}>
        <Paragraph type="tertiary">{JSON.stringify(formState)}</Paragraph>
      </div>
    );
  };

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
  const [submittedMsg, setSubmittedMsg] = useState("");
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
      setConnectedWalletAddressState(`MetaMask unavailable`);
      return;
    }
    async function setConnectedWalletAddress() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      try {
        const signerAddress = await signer.getAddress();
        setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`);
      } catch {
        setConnectedWalletAddressState("No wallet connected");
        return;
      }
    }
    setConnectedWalletAddress();
  }, []);

  // Request access to MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  // // Call smart contract, fetch current value
  // async function fetchGameListingDetails() {
  //   if (!hasEthereum()) {
  //     setConnectedWalletAddressState(`MetaMask unavailable`);
  //     return;
  //   }
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const contract = new ethers.Contract(
  //     // haven't deploy yet to testnet
  //     process.env.DEGAME_CORE_CONTRACT,
  //     // haven't import the ABI yet
  //     CreateProjectToken.abi,
  //     provider
  //   );
  //   try {
  //     // call the contract function .getProjectTokenAddress()
  //     const data = await contract.getProjectTokenAddress();
  //     // set state and display the info to the user
  //     setPTAddressState(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // Call smart contract, set new value
  async function createGameListingViaContract() {
    if (!hasEthereum()) {
      setConnectedWalletAddressState(`MetaMask unavailable`);
      return;
    }

    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    // const web3 = require("web3");
    // Ether is equal to MATIC here
    // const amount = web3.utils.toWei("0.1", "ether");
    setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`);
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

    // call the contract function .createGameListing() from the DeGame_Listing smart contract
    const NFTtransaction = await NFTcontract.createGameListing(
      // pass in game metadata uri here - set a random string for now
      "https://degame.tech/metadata/"
    );
    await NFTtransaction.wait();
    console.log(NFTtransaction);

    // TODO How to get the returned GameID?
    const GetIDTransaction = await NFTcontract.getLastListingID();

    // call the contract function .createGameItem() from the DeGame_Core smart contract
    const options = { value: "100000000000000000" };
    const CoreTransaction = await CoreContract.createGameItem(
      "0x64c4bC7008Af9ebB2CC084FFA443DF74DDF35d49",
      // pass in the GameID here - use #3 as the default GameID for now
      GetIDTransaction,
      "100000000000000000",
      options
    );
    await CoreTransaction.wait();
    console.log(CoreTransaction);
    setSubmittedMsg(`🎉 Your game had been listed!`);
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
        onValueChange={(v) => console.log(v)}
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
        <br />
        <Row>
          <Select
            field="category"
            style={style}
            label={"\u{1F4C2} Category"}
            placeholder="Select"
            ref={categoryRef}
            onValueChange={(e) => setCategory(e.target.value)}
          >
            <Select.Option value="Nintendo Switch">
              Nintendo Switch
            </Select.Option>
            <Select.Option value="Xbox">Xbox</Select.Option>
            <Select.Option value="Play Station">Play Station</Select.Option>
          </Select>
        </Row>
        <Row>
          <Input
            field="title"
            label={"\u{1F3AE} What game are you selling?"}
            initValue={"Animal Crossing: New Horizons"}
            style={style}
            trigger="blur"
            ref={titleRef}
            onValueChange={(e) => setTitle(e.target.value)}
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
        >
          I agree to publicly list the item on the blockchain
        </Checkbox>
        <div style={{ marginTop: 10 }} />
        <Button type="primary" htmlType="submit" className="btn-margin-right">
          Submit
        </Button>
        <Button htmlType="reset">Reset</Button>
        <div style={{ marginTop: 10 }}>
          {submittedMsg && (
            <Paragraph type="tertiary">{submittedMsg}</Paragraph>
          )}
        </div>
        <ComponentUsingFormState />
      </Form>
    </div>
  );
}
