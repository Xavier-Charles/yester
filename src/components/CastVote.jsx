import React, { useState } from "react";
import moment from "moment";
import CheckNFTs from "../api/checkNFTs";

const CastVote = ({ prevVoteData, address, prevCid, setprevVoteData }) => {
  const [hash, setHash] = useState(null);

  const handleVote = (type) => {
    const nextVoteData = prevVoteData;
    if (prevVoteData) {
      if (type === "for") {
        nextVoteData.data.for++;
      } else nextVoteData.data.against++;

      nextVoteData.timestamp = moment();
      nextVoteData.initiator = address;
      nextVoteData.prev = prevCid;

      const nextVoteDataJson = JSON.stringify(nextVoteData);
      console.log(nextVoteDataJson);

      Moralis.authenticate({
        signingMessage: "Verify wallet address to vote.",
      }).then((authdata) => {
        console.log(authdata);
        const file = new Moralis.File("file.json", {
          base64: btoa(JSON.stringify(nextVoteDataJson)),
        });
        file.saveIPFS().then((uploadData) => {
          console.log(uploadData);
          // temp1._hash;
          if (uploadData._hash) {
            setHash(uploadData._hash);
            fetch(
              `https://api.airtable.com/v0/appismYWRXdxU1M0k/yestervote?api_key=${
                import.meta.env.VITE_AIRTABLE_API_KEY
              }`,
              {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  records: [
                    {
                      id: "recHi1OeDsx29XoJP",
                      fields: {
                        cid: "cid",
                        value: uploadData._hash,
                      },
                    },
                  ],
                }),
              }
            )
              .then((res) => res.json())
              .then((resp) => {
                console.log(resp);
                // setprevVoteData(nextVoteData);
              });
          }
        });
      });
    }
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
              onClick={() => handleVote("for")}
              className={`"button px-[24px] py-2 block w-full mb-2 rounded md:rounded-xl md:border border border-gray-200 ${
                !prevVoteData || !address
                  ? "opacity-40"
                  : " active:bg-gold hover:border-gold "
              }`}
              disabled={!prevVoteData || !address}
            >
              For
            </button>
            <button
              type="button"
              onClick={() => handleVote("against")}
              className={`button px-[24px] py-2 mt-1 block w-full mb-2 rounded md:rounded-xl md:border border border-gray-200 ${
                !prevVoteData || !address
                  ? "opacity-40"
                  : "active:bg-gold hover:border-gold "
              }`}
              disabled={!prevVoteData || !address}
            >
              Against
            </button>
          </div>
        </div>
        {hash && (
          <p
            // className={`my-2 text-center ${
            //   message === "Vote Sucessful." ? "text-green-500" : "text-red-500"
            // }`}
            className={`my-2 text-center  text-green-500 `}
          >
            Your vote hash is {hash}
          </p>
        )}
      </div>
    </div>
  );
};

export default CastVote;
