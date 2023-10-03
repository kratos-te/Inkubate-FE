/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { FC, useRef } from "react";
import { useAccount, useConnect } from "wagmi";

import { useModal } from "@/contexts/ModalContext";

import Button from "./Button";
import { ConnectButton } from "./ConnectButton";
import { CloseCircleIcon } from "./SvgIcons";

export const WalletModal: FC = () => {
  const { address } = useAccount();
  const { closeWalletModal, isOpenedWalletModal } = useModal();
  // const { userAddress, getUserData, setToken } = useUser();

  const { connect, connectors } = useConnect();
  // const { signMessageAsync } = useSignMessage();

  const modalRef = useRef<HTMLDivElement>(null);

  const handleConnectWallet = async (connector: any) => {
    connect({ connector });
    closeWalletModal();
  };

  if (!isOpenedWalletModal) return;
  return (
    <div
      className={`${
        address ? "hidden" : ""
      } fixed z-50 w-full h-full min-h-screen top-0 bg-black/90 transition-opacity`}
    >
      <div className="w-full h-full flex justify-center items-center">
        <div
          ref={modalRef}
          className="bg-[#171C21] w-[530px] overflow-hidden rounded-2xl relative mt-[50px] p-6 max-lg:w-[377px]"
        >
          <button
            className="group rounded-lg  absolute right-6 max-lg:right-6 top-6 max-lg:top-6 z-10"
            onClick={closeWalletModal}
          >
            <CloseCircleIcon className="group-hover:rotate-90 duration-300" />
          </button>
          <div className="modal_header">
            <div className="text-white text-[30px] mb-[26px]  text-left leading-7  font-semibold max-lg:text-[20px]">
              Connect your wallet
            </div>
          </div>
          <div className="modal_body text-center">
            <div className="flex flex-col mt-10 max-lg:mt-2">
              {connectors.map((connector, index) => {
                return (
                  <ConnectButton
                    key={index}
                    name={connector.name}
                    onClick={() => handleConnectWallet(connector)}
                    logo={`./assets/icons/${connector.name}.svg`}
                  />
                );
              })}
              <Button
                className="text-[16px] font-semibold"
                isButton
                onClick={closeWalletModal}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
