import React from "react";
import { Card, Rating, Button } from "@douyinfe/semi-ui";
import { ethers, BigNumber } from "ethers";
import DeGame_Core from "../contracts/DeGame_Core.json";
import DeGame_Listing from "../contracts/DeGame_Listing.json";

export default function Listing() {
  const { Meta } = Card;

  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const signer = provider.getSigner();
  // const CoreContract = new ethers.Contract(
  //   "0xcF273e8a5381EaC0eE797127e60eD3015d366291",
  //   DeGame_Core,
  //   signer
  // );
  // const NFTcontract = new ethers.Contract(
  //   "0x64c4bC7008Af9ebB2CC084FFA443DF74DDF35d49",
  //   DeGame_Listing,
  //   signer
  // );
  // const CoreTransaction = CoreContract.fetchGameItems();

  // Call smart contract, get all the current game listings
  async function getCurrentGameListing() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const CoreContract = new ethers.Contract(
      "0xcF273e8a5381EaC0eE797127e60eD3015d366291",
      DeGame_Core,
      signer
    );
    const NFTcontract = new ethers.Contract(
      "0x64c4bC7008Af9ebB2CC084FFA443DF74DDF35d49",
      DeGame_Listing,
      signer
    );
    // call the contract function .fetchGameItems() from the DeGame_Listing smart contract
    const CoreTransaction = await CoreContract.fetchGameItems();
    console.log(CoreTransaction.length); // number of game listings
    console.log(BigNumber.from(CoreTransaction[0][0]).toString()); // GameID
    console.log(CoreTransaction[0][1]); // nftContract address
    console.log(BigNumber.from(CoreTransaction[0][2]).toString()); // tokenID
    console.log(CoreTransaction[0][3]); // seller address
    console.log(CoreTransaction[0][4]); // buyer address
    console.log(BigNumber.from(CoreTransaction[0][5]).toString()); // price
    // Define variables for the game listing details
    // const numListing = CoreTransaction.length;
    // const GameID = BigNumber.from(CoreTransaction[0][0]).toString();
    // const nftContract = CoreTransaction[0][1];
    const tokenID = BigNumber.from(CoreTransaction[0][2]).toString();
    // const seller = CoreTransaction[0][3];
    // const buyer = CoreTransaction[0][4];
    // const price = BigNumber.from(CoreTransaction[0][5]).toString();
    // get game item details from the smart contract
    const getGameUri = await NFTcontract.getGameListingDetails(tokenID);
    console.log(getGameUri);
  }

  return (
    <>
      <Button
        size="default"
        style={{ marginTop: 20, marginBottom: 20 }}
        onClick={() => getCurrentGameListing()}
      >
        Refresh Game Listing
      </Button>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <Card
          style={{ maxWidth: 360 }}
          actions={[
            // eslint-disable-next-line react/jsx-key
            <Rating size="small" defaultValue={4} />,
          ]}
          headerLine={false}
          cover={
            <img
              alt="example"
              src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo.jpeg"
            />
          }
        >
          <Meta
            title="Semi Doc"
            description="Easily manage your project icons and easily upload, update and share a series of project icons."
          />
        </Card>
        <Card
          style={{ maxWidth: 360 }}
          actions={[
            // eslint-disable-next-line react/jsx-key
            <Rating size="small" defaultValue={4} />,
          ]}
          headerLine={false}
          cover={
            <img
              alt="example"
              src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo.jpeg"
            />
          }
        >
          <Meta
            title="Semi Doc"
            description="Easily manage your project icons and easily upload, update and share a series of project icons."
          />
        </Card>
        <Card
          style={{ maxWidth: 360 }}
          actions={[
            // eslint-disable-next-line react/jsx-key
            <Rating size="small" defaultValue={4} />,
          ]}
          headerLine={false}
          cover={
            <img
              alt="example"
              src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo.jpeg"
            />
          }
        >
          <Meta
            title="Semi Doc"
            description="Easily manage your project icons and easily upload, update and share a series of project icons."
          />
        </Card>
        <Card
          style={{ maxWidth: 360 }}
          actions={[
            // eslint-disable-next-line react/jsx-key
            <Rating size="small" defaultValue={4} />,
          ]}
          headerLine={false}
          cover={
            <img
              alt="example"
              src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo.jpeg"
            />
          }
        >
          <Meta
            title="Semi Doc"
            description="Easily manage your project icons and easily upload, update and share a series of project icons."
          />
        </Card>
      </div>
    </>
  );
}

// [
//   [
//     {
//       type: "BigNumber",
//       hex: "0x01",
//     },
//     "0x64c4bC7008Af9ebB2CC084FFA443DF74DDF35d49",
//     {
//       type: "BigNumber",
//       hex: "0x02",
//     },
//     "0x4c6b1f30641982C9B935b95AC85D09f239b922Cd",
//     "0x0000000000000000000000000000000000000000",
//     {
//       type: "BigNumber",
//       hex: "0x016345785d8a0000",
//     },
//   ],
//   [
//     {
//       type: "BigNumber",
//       hex: "0x02",
//     },
//     "0x64c4bC7008Af9ebB2CC084FFA443DF74DDF35d49",
//     {
//       type: "BigNumber",
//       hex: "0x03",
//     },
//     "0x4c6b1f30641982C9B935b95AC85D09f239b922Cd",
//     "0x0000000000000000000000000000000000000000",
//     {
//       type: "BigNumber",
//       hex: "0x016345785d8a0000",
//     },
//   ],
//   [
//     {
//       type: "BigNumber",
//       hex: "0x03",
//     },
//     "0x64c4bC7008Af9ebB2CC084FFA443DF74DDF35d49",
//     {
//       type: "BigNumber",
//       hex: "0x04",
//     },
//     "0x4c6b1f30641982C9B935b95AC85D09f239b922Cd",
//     "0x0000000000000000000000000000000000000000",
//     {
//       type: "BigNumber",
//       hex: "0x016345785d8a0000",
//     },
//   ],
// ];
