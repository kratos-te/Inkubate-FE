/* eslint-disable @next/next/no-img-element */
"use client";
import { FC, useState } from "react";
import { useModal } from "@/contexts/ModalContext";
import { CloseCircleIcon, MinusIcon, PlusIcon } from "./SvgIcons";
import { LoadingPad } from "./LoadingPad";
import ClickAwayComponent from "./ClickAwayComponent";
import { useErc721a } from "@/hooks/useErc721a";
import { CollectionParam, LaunchpadParam, NftItem } from "@/utils/types";
import { createNft } from "@/actions/nft";
import { errorAlert, successAlert } from "./ToastGroup";

interface MintModalProps {
  collection: CollectionParam;
  launchpad: LaunchpadParam;
}
export const MintModal: FC<MintModalProps> = ({ collection, launchpad }) => {
  const { mintNFT, getMintingStartTime } = useErc721a();
  const { closeMintModal, isOpenedMintModal } = useModal();
  const [mintValue, setMintValue] = useState<number>(1);
  const [mintingProgress, setMintingProgress] = useState<boolean>(false);
  const [mintSuccess, setMintSuccess] = useState<boolean>(false);
  const [nfts, setNfts] = useState<NftItem[]>([]);

  const handleMinus = () => {
    setMintValue(mintValue - 1);
  };
  const handlePlus = () => {
    setMintValue(mintValue + 1);
  };

  const handleMint = async (amount: number) => {
    setMintingProgress(true);
    try {
      const startTimeRes = await getMintingStartTime(collection.address);
      if (startTimeRes?.res) console.log("here", startTimeRes.res);
      const value = Number(launchpad.mintPrice) * amount;
      const rept = await mintNFT(amount, value.toString(), collection.address);
      console.log(rept);
      const createNfts = await createNft({
        collectionId: collection.id,
        contractType: "ERC721",
        price: launchpad.mintPrice.toString(),
        txHash: rept.transactionHash || "",
        network: "MAIN",
      });
      console.log("created Nft", createNfts);
      setNfts(createNfts);
      setMintSuccess(true)
      successAlert("Minted Successfully!");
    } catch (e: any) {
      console.log(e.message);
      if (e.message.includes("User rejected the request."))
        errorAlert("User rejected the request.");
      else errorAlert("Failed Minting");
    } finally {
      setMintingProgress(false);
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
            {mintingProgress ? (
              <div className="flex-col items-center pt-4 pb-16">
                <LoadingPad
                  title="Complete Purchase"
                  description="Confirm the transaction in your wallet to purchase the NFT."
                />
              </div>
            ) : nfts.length > 0 ? (
              <div className="w-full flex justify-center flex-wrap">
                {nfts.map((nft) => (
                  <div key={nft.id}>
                    <img src={nft.image} alt={nft.name} className="w-20 h-20" />
                    <span>
                      {nft.name} #{nft.tokenId}
                    </span>
                  </div>
                ))}
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
                mintingProgress ? "bg-[#666666] text-[#F2F2F2] " : "bg-white"
              }`}
              onClick={() => handleMint(mintValue)}
            >
              {mintingProgress ? "Cancel " : "Mint NFT"}
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
