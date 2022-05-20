import React from "react";
import { ethers } from "ethers";
import { useState } from "react";

const contract_address = import.meta.env.VITE_TEST_CONTRACT_ADDRESS;
const token_uri = import.meta.env.VITE_TEST_TOKEN_URI;

export const ConnectWallet = async () => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      // console.log("Metamask not detected");
      return;
    }
    let chainId = await ethereum.request({ method: "eth_chainId" });
    // console.log("Connected to chain:" + chainId);

    const ropstenChainId = "0x3";

    if (chainId !== ropstenChainId) {
      alert("You are not connected to the Ropsten Testnet!");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    // console.log("Found account", accounts[0]);
    return accounts[0];
  } catch (error) {
    console.log("Error connecting to metamask", error);
    return null;
  }
};
