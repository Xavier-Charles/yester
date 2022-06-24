import React from "react";

const NFTCard = ({ nft }) => {
  const metaData = JSON.parse(nft.metadata);

  return (
    <div
      key={`${nft?.token_id}-${nft?.token_address}`}
      className="md:w-[30%] sm:mb-0 mb-6 min-w-[320px] border border-gray-200 hover:border-gold p-6 m-2 rounded-lg"
    >
      <div className=" h-64 overflow-hidden">
        <img
          alt="content"
          className="object-cover object-center h-full w-full"
          src={metaData?.image?.replace("ipfs://", "https://ipfs.io/ipfs/")}
        />
      </div>
      <div className="h-0.5 w-[80%] bg-gray-800 rounded"></div>
      <h2 className="text-xl font-medium title-font text-gray-800 mt-5">
        {nft.name}
      </h2>
      <p className="text-base leading-relaxed text-gray-800 mt-2">
        {nft.symbol} - #{nft.token_id}
      </p>
    </div>
  );
};

export default NFTCard;
