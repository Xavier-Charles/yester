import { useEffect, useState } from "react";
import CheckNFTs from "./api/checkNFTs.js";
import CastVote from "./components/CastVote.jsx";
import NFTCard from "./components/NFTCard";
import VoteResults from "./components/VoteResults.jsx";

const appId = import.meta.env.VITE_ROP_TESTNET_APP_ID;
const serverUrl = import.meta.env.VITE_ROP_TESTNET_APP_SERVER_URL;

function App() {
  Moralis.start({ serverUrl, appId });

  const [NFTs, setNFTs] = useState([]);
  const [address, setAddress] = useState(null);
  const [prevVoteData, setprevVoteData] = useState(null);
  const [prevCid, setPrevCid] = useState(null);
  const handleAuthenticate = async () => {
    try {
      const data = await CheckNFTs();
      setNFTs(data.nfts);
      setAddress(data.address);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch(
      `https://api.airtable.com/v0/appismYWRXdxU1M0k/yestervote?api_key=${
        import.meta.env.VITE_AIRTABLE_API_KEY
      }`
    )
      .then((resp) => resp.json())
      .then((data) => {
        if (data?.records[0]) {
          const lastCid = data?.records[0]?.fields?.value;
          setPrevCid(lastCid);
          fetch(`https://ipfs.io/ipfs/${lastCid}`)
            .then((resp) => resp.json())
            .then((vdata) => {
              setprevVoteData(JSON.parse(vdata));
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center mt-20">
      <div className="max-w-7xl">
        <div className="flex justify-center">
          <button
            onClick={handleAuthenticate}
            className="flex-shrink-0 text-cadet bg-gold border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg mt-10 sm:mt-0"
          >
            Connect Wallet
          </button>
        </div>
        <div className="w-full mb-6 mt-20 lg:mb-0">
          <h1 className="sm:text-3xl text-2xl font-serif font-medium title-font mb-2 text-gray-900">
            Your NFTs
          </h1>
          <div className="h-1 w-44 bg-gold rounded"></div>
        </div>
        <div class="flex border-l-2  max-w-7xl mt-10 mb-20 overflow-x-scroll hide-scroll-bar">
          <div class="relative flex flex-nowrap lg:ml-20 md:ml-14 ml-10 ">
            {NFTs?.length > 0 ? (
              <>
                {NFTs?.map((nft) => (
                  <NFTCard nft={nft} />
                ))}
                {NFTs.length > 3 && (
                  <div className="absolute left-0 bottom-[50%] pl-2 lg:-ml-20 md:-ml-14 -ml-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-arrow-left stroke-gray-800 animate-pulse"
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="current"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <line x1="5" y1="12" x2="11" y2="18" />
                      <line x1="5" y1="12" x2="11" y2="6" />
                    </svg>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full max-w-lg text-center flex justify-center my-6 mx-auto">
                <h1 className="text-base sm:text-base px-2 font-mono  mb-2 py-20 text-gray-400">
                  When You Connect Your Wallet, Your NFTs Will Be Displayed
                  Here.
                  {/* <Link to="/mint" className="text-gold">
                    Mint a test NFT
                  </Link> */}
                </h1>
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex justify-center">
          <CastVote
            prevVoteData={prevVoteData}
            prevCid={prevCid}
            address={address}
            setprevVoteData={setprevVoteData}
          />
        </div>
        {console.log(prevVoteData)}
        {prevVoteData?.data?.for && (
          <div className="w-full flex justify-center">
            <VoteResults
              prevCid={prevCid}
              vagainst={prevVoteData?.data?.against}
              vfor={prevVoteData?.data?.for}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
