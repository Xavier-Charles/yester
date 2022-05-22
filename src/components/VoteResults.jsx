import moment from "moment";
import React, { useEffect, useState } from "react";

const VoteResults = ({ prevCid, vagainst, vfor }) => {
  const totalVotes = vfor + vagainst;

  const percentVote = (v) =>
    totalVotes > 0 && v ? Math.round((v * 10) / totalVotes) / 10 : 0;

  return (
    <div className="w-full max-w-3xl " id="sidebar-right">
      <div className="space-y-4 mt-4 lg:mt-0">
        <div className="md:rounded-xl md:border bg-skin-block-bg border-skin-border text-base">
          <h4
            className="px-4 pt-3 block rounded-t-none md:rounded-t-lg border-y md:border-t-0 border-skin-border"
            style={{ paddingBottom: "12px" }}
          >
            Information{" "}
          </h4>
          <div className="p-4 leading-5 sm:leading-6">
            <div className="space-y-1">
              <div>
                <b>IPFS</b>
                <a
                  href="https://cloudflare-ipfs.com/ipfs/Qme6unqKYhKTymXjB8G8ZWyjNtrskqE8k44m16u1LLv85S"
                  target="_blank"
                  className="whitespace-nowrap float-right"
                  rel="noopener noreferrer"
                >
                  {prevCid}
                  <i
                    className="iconfont iconexternal-link ml-1"
                    style={{ fontSize: "16px", lineHeight: "16px" }}
                  ></i>
                </a>
              </div>
              <div>
                <b>Voting system</b>
                <span className="float-right text-skin-link">Basic voting</span>
              </div>
              <div>
                <b>Start date</b>
                <span className="float-right text-skin-link">
                  {moment("Sun May 22 2022 18:59:43").format(
                    "MMM DD, YYYY, HH:mm"
                  )}
                </span>
              </div>
              <div>
                <b>End date</b>
                <span className="text-skin-link float-right">
                  {moment("Sun June 28 2022 18:59:43").format(
                    "MMM DD, YYYY, HH:mm"
                  )}
                </span>
              </div>
              {/* <div>
                <b>Snapshot</b>
                <a
                  href="https://etherscan.io/block/14394206"
                  target="_blank"
                  className="whitespace-nowrap float-right"
                  rel="noopener noreferrer"
                >
                  14,394,206
                  <i
                    className="iconfont iconexternal-link ml-1"
                    style={{ fontSize: "16px", lineHeight: "16px" }}
                  ></i>
                </a>
              </div> */}
            </div>
          </div>
        </div>
        {/* 
        * 
        *
        Results
        *
        *
        */}
        <div className="md:rounded-xl md:border bg-skin-block-bg border-skin-border text-base">
          <h4
            className="px-4 pt-3 block rounded-t-none md:rounded-t-lg border-y md:border-t-0 border-skin-border"
            style={{ paddingBottom: "12px" }}
          >
            Results
          </h4>
          <div className="p-4 leading-5 sm:leading-6">
            <div className="space-y-3">
              <div>
                <div className="text-skin-link mb-1 flex justify-between">
                  <div className="flex overflow-hidden">
                    <span className="mr-1 truncate">For: {vfor}</span>
                  </div>
                </div>
                <div className="h-2 relative overflow-hidden rounded-full flex">
                  <div className="w-full h-full bg-gray-200 absolute z-5"></div>
                  <div
                    className="bg-gold h-full z-10"
                    style={{
                      width: `${percentVote(vfor) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="text-skin-link mb-1 flex justify-between">
                  <div className="flex overflow-hidden">
                    <span className="mr-1 truncate">Against: {vagainst}</span>
                  </div>
                </div>
                <div className="h-2 relative overflow-hidden rounded-full flex">
                  <div className="w-full h-full bg-gray-200 absolute z-5"></div>
                  <div
                    className="bg-cadet h-full z-10"
                    style={{
                      width: `${percentVote(vagainst) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              {/* <div>
                <div className="text-skin-link mb-1 flex justify-between">
                  <div className="flex overflow-hidden">
                    <span className="mr-1 truncate">Abstain</span>
                  </div>
                  <template className="flex justify-end space-x-2"></template>
                </div>
                <div className="h-2 relative overflow-hidden rounded-full flex">
                  <div className="w-full h-full bg-[color:var(--border-color)] absolute z-5"></div>
                  <div
                    className="bg-primary h-full z-10"
                    style={{ width: "0.499%" }}
                  ></div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteResults;
