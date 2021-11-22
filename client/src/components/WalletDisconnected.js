import React, { useState, useEffect } from "react";
import { hasEthereum } from "../utils/ethereum";
import { ethers } from "ethers";

function Wallet() {
  const [connectedWalletAddress, setConnectedWalletAddressState] = useState("");
  // If wallet is already connected...
  useEffect(() => {
    if (!hasEthereum()) {
      setConnectedWalletAddressState(`⚠️ MetaMask unavailable`);
      return;
    }
    async function setConnectedWalletAddress() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      try {
        const signerAddress = await signer.getAddress();
        setConnectedWalletAddressState(`${signerAddress}`);
      } catch {
        setConnectedWalletAddressState("No wallet connected");
        return;
      }
    }
    setConnectedWalletAddress();
  }, []);
  return (
    <>
      <h3
        style={{
          textAlign: "center",
          fontSize: 18,
          marginTop: 40,
          marginInline: 20,
          marginBottom: 40,
          wordWrap: "break-word",
        }}
      >
        {connectedWalletAddress && (
          <p className="text-md">{connectedWalletAddress}</p>
        )}
      </h3>
    </>
  );
}

export default Wallet;
