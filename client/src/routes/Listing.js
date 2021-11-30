import React from "react";
import { Card, Rating } from "@douyinfe/semi-ui";

export default function Listing() {
  const { Meta } = Card;

  //   // Call smart contract, get all the current game listings
  //   async function getCurrentGameListing() {
  //     if (!hasEthereum()) {
  //       setConnectedWalletAddressState(`MetaMask unavailable`);
  //       return;
  //     }

  //     await requestAccount();
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const signerAddress = await signer.getAddress();
  //     // const web3 = require("web3");
  //     // Ether is equal to MATIC here
  //     // const amount = web3.utils.toWei("0.1", "ether");
  //     setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`);
  //     const NFTcontract = new ethers.Contract(
  //       "0x64c4bC7008Af9ebB2CC084FFA443DF74DDF35d49",
  //       DeGame_Listing,
  //       signer
  //     );
  //     const CoreContract = new ethers.Contract(
  //       "0xcF273e8a5381EaC0eE797127e60eD3015d366291",
  //       DeGame_Core,
  //       signer
  //     );

  //     // call the contract function .createGameListing() from the DeGame_Listing smart contract
  //     const NFTtransaction = await NFTcontract.createGameListing(
  //       // pass in game metadata uri here - set a random string for now
  //       "https://degame.tech/metadata/"
  //     );
  //     await NFTtransaction.wait();
  //     console.log(NFTtransaction);

  //     // TODO How to get the returned GameID?
  //     const GetIDTransaction = await NFTcontract.getLastListingID();

  //     // call the contract function .createGameItem() from the DeGame_Core smart contract
  //     const options = { value: "100000000000000000" };
  //     const CoreTransaction = await CoreContract.createGameItem(
  //       "0x64c4bC7008Af9ebB2CC084FFA443DF74DDF35d49",
  //       // pass in the GameID here - use #3 as the default GameID for now
  //       GetIDTransaction,
  //       "100000000000000000",
  //       options
  //     );
  //     await CoreTransaction.wait();
  //     console.log(CoreTransaction);
  //   }

  return (
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
  );
}
