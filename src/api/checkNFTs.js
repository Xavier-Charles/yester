import { ConnectWallet } from "./connectWallet";

const CheckNFTs = async (address) => {
  // return undefined
  // const address = await ConnectWallet();
  // use this as default since only tribunal address is defined
  const contractAddress = import.meta.env.VITE_TEST_CONTRACT_ADDRESS; // use this as default since only tribunal address is defined
  // const chain = ropsten // use this later
  try {
    const res = await fetch(
      `https://deep-index.moralis.io/api/v2/${address}/nft?chain=eth&format=decimal`,
      {
        method: "GET",
        headers: {
          "X-API-Key": import.meta.env.VITE_MORALIS_API_KEY,
        },
      }
    );

    const nfts = (await res.json()).result;

    return {address, nfts};
  } catch (err) {
    console.log({ err });

    return null;
  }
};

export default CheckNFTs;
