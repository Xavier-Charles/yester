import React, { useState } from "react";
import CheckNFTs from "../api/checkNFTs";

const CastVote = ({ proposal, handleProposal }) => {
  const [message, setMessage] = useState(null);
  const handleMessage = (m) => {
    setMessage(m);
    setTimeout(() => setMessage(null), 5000);
  };
  const handleVote = async (type) => {
  };
  return (
    <div className="md:rounded-xl md:border bg-skin-block-bg border-skin-border text-base my-4 max-w-3xl">
      <h4
        className="px-4 pt-3 text-2xl block rounded-t-none md:rounded-t-lg border-y md:border-t-0 border-skin-border"
        style={{ paddingBottom: "12px" }}
      >
        Cast your vote
      </h4>
      <div className="p-4 leading-5 sm:leading-6">
        <p className="mt-2 mb-6">
          The proposal is that a pool of tokens is allocated across the X
          Council for the term. This is to cover gas costs incurred in voting
          and offer fair allocation for the group as long as they fulfil their
          functions outlined above. The sum is for the whole council for the
          entire term. The funds can also be allocated to everyone voting as
          highlighted by some of the comments on the initial version of the
          council proposal. This action can be decided on by the council as one
          of their first joint proposals.
        </p>
        <div className="mb-3">
          <div className="mb-3">
            <button
              type="button"
              onClick={() => handleVote("For")}
              className="button px-[24px] py-2 block w-full mb-2 rounded md:rounded-xl md:border border active:bg-gold  border-gray-200 hover:border-gold"
            >
              For
            </button>
            <button
              type="button"
              onClick={() => handleVote("Against")}
              className="button px-[24px] py-2 mt-1 block w-full mb-2 rounded md:rounded-xl md:border border active:bg-gold  border-gray-200 hover:border-gold"
            >
              Against
            </button>
          </div>
        </div>
        {message && (
          <p
            className={`my-2 text-center ${
              message === "Vote Sucessful." ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default CastVote;
