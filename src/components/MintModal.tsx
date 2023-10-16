"use client";
import { FC, useState } from "react";
import { useModal } from "@/contexts/ModalContext";
import { CloseCircleIcon, MinusIcon, PlusIcon } from "./SvgIcons";
import { LoadingPad } from "./LoadingPad";
import ClickAwayComponent from "./ClickAwayComponent";
import { useErc721a } from "@/hooks/useErc721a";
import { CollectionParam, LaunchpadParam } from "@/utils/types";
import { createNft } from "@/actions/nft";
import axios from "axios";

interface MintModalProps {
  collection: CollectionParam;
  launchpad: LaunchpadParam;
}
export const MintModal: FC<MintModalProps> = ({ collection, launchpad }) => {
  const { mintNFT, getMintingStartTime, getTokenUri } = useErc721a();
  const { closeMintModal, isOpenedMintModal } = useModal();
  const [mintValue, setMintValue] = useState<number>(1);
  const [mintStatus, setMintStatus] = useState<boolean>(false);
  const [mintSuccess] = useState<boolean>(false);

  const handleMinus = () => {
    setMintValue(mintValue - 1);
  };
  const handlePlus = () => {
    setMintValue(mintValue + 1);
  };

  const handleGetTokenURI = async (address: string, id: string) => {
    try {
      const tokenUri = await getTokenUri(address, id);
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Content-Type": "application/json",
        },
      };
      const response = await axios.get(tokenUri, config);
      const data = await response.data;
      return data;
    } catch (err) {
      console.log(err);
      return {
        image: "fetching-failed",
        attributes: [],
      };
    }
  };
  const handleMint = async (amount: number) => {
    setMintStatus(true);
    try {
      const startTimeRes = await getMintingStartTime(collection.address);
      if (startTimeRes?.res) console.log("here", startTimeRes.res);
      const value = Number(launchpad.mintPrice) * amount;
      console.log("value", value, collection.address);
      const rept = await mintNFT(amount, value.toString(), collection.address);
      console.log("transaction result is ", rept);
      if (rept.status === "success") {
        rept.logs.map(async (item) => {
          const decimalValue = parseInt(item.topics[3] as `0x${string}`, 16);

          const tokenUri = await getTokenUri(
            collection.address,
            decimalValue.toString()
          );
          const nftData = await handleGetTokenURI(
            collection.address,
            decimalValue.toString()
          );

          console.log("nftData ===============", nftData);
          const createNFT = await createNft({
            collectionId: collection.id,
            name: collection.name,
            nftId: decimalValue.toString(),
            address: collection.address,
            assetUrl: tokenUri,
            imgUrl: nftData.image,
            royalty: 0,
            contractType: "ERC721",
            attributes: nftData.attributes,
            price: launchpad.mintPrice.toString(),
            txHash: item.transactionHash || "",
          });
          console.log("created Nft,", createNFT);
          return createNFT;
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setMintStatus(false);
    }
  };

  if (!isOpenedMintModal) return null;
  return (
    <div
      className={`fixed z-50 w-full h-full min-h-screen top-0  bg-black/90 transition-opacity`}
    >
      <div className="w-full h-full flex justify-center items-center overflow-auto">
        <ClickAwayComponent
          onClickAway={closeMintModal}
          className="bg-[#171C21] w-[530px] rounded-2xl  relative  bg-no-repeat bg-center bg-cover p-5"
        >
          <button
            className="group md:rounded-xl absolute right-0 md:right-4 top-4 md:top-6 z-10"
            onClick={closeMintModal}
          >
            <CloseCircleIcon className="group-hover:rotate-90 duration-300" />
          </button>
          <div className="modal_header">
            <div className="text-white text-[24px] mb-[26px] max-w-[280px] text-left leading-7 mt-4  font-bold">
              Mint NFT
            </div>
          </div>
          <div className="modal_body text-center">
            {mintStatus ? (
              <div className="flex-col items-center pt-4 pb-16">
                <LoadingPad
                  title="Complete Purchase"
                  description="Confirm the transaction in your wallet to purchase the NFT."
                />
              </div>
            ) : (
              <div className="flex-col items-center">
                <div className="flex w-full justify-between py-16 px-[90px] border-b-[1px] border-[#666666]">
                  <button
                    className="flex items-center justify-center"
                    onClick={handleMinus}
                  >
                    <MinusIcon />
                  </button>
                  <p className="text-[36px] text-white font-bold font-poppins">
                    {mintValue}
                  </p>
                  <button
                    className="flex items-center justify-center"
                    onClick={handlePlus}
                  >
                    <PlusIcon />
                  </button>
                </div>
                <div className="flex justify-between pt-[14px]">
                  <p className="text-white text-[20px] font-semibold">Total</p>
                  <p className="text-white text-[20px] font-semibold">Free</p>
                </div>
              </div>
            )}

            <button
              className={`w-full rounded-[12px] text-[16px] font-semibold py-3 mt-[38px] ${
                mintStatus ? "bg-[#666666] text-[#F2F2F2] " : "bg-white"
              }`}
              onClick={() => handleMint(mintValue)}
            >
              {mintStatus ? "Cancel " : "Mint NFT"}
            </button>
            {mintSuccess && (
              <div className="flex flex-col gap-[38px]">
                <div className="flex  text-[18px] text-[#F2F2F2] font-medium text-left">
                  Your mint transaction is in progress, and your NFT will be
                  viewable in your wallet shortly.
                </div>
                <div className="flex flex-col gap-[14px]">
                  <div className="flex justify-between">
                    <p className="text-[18px] text-white font-bold">Status</p>
                    <p className="text-[16px] text-[#B3B3B3] font-normal">
                      Processing
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-[18px] text-white font-bold">
                      Transaction
                    </p>
                    <p className="text-[16px] text-[#B3B3B3] font-normal">
                      0xa4334...57c2
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-[24px] mb-4">
                  <button className="bg-secondary text-white py-3 text-[16px] font-semibold rounded-[12px]">
                    View NFTs
                  </button>
                  <button className="bg-white py-3 text-[16px] font-semibold rounded-[12px]">
                    View Transaction
                  </button>
                </div>
              </div>
            )}
          </div>
        </ClickAwayComponent>
      </div>
    </div>
  );
};
