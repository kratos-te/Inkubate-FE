"use client";
import { FC, useEffect, useRef } from "react";
import { useAccount, useConnect, useSignMessage } from "wagmi";
import { useModal } from "@/contexts/ModalContext";

import { CloseCircleIcon } from "./SvgIcons";
import { ConnectButton } from "./ConnectButton";
import { useSession } from "@/contexts/SessionContext";
// import { INFURN_APU_KEY } from "@/config";
import { getNonce, signIn } from "@/utils/api";
import { useUser } from "@/contexts/UserContext";
import Button from "./Button";
import { MetamaskIcon, TrustwalletIcon, CoinbaseWallet, WalletconnectIcon } from "./SvgIcons";

const walletImg = [
  <MetamaskIcon />, <TrustwalletIcon />, <CoinbaseWallet />, <WalletconnectIcon />
];

const message = "Connected with Inkubate";

// const web3 = new Web3(`https://mainnet.infura.io/v3/${INFURN_APU_KEY}`);
// const message = "Connected with Inkubate";

// interface WalletModalProps {
//   onClick?: Function;
//   isActivating: boolean;
// }

export const WalletModal: FC = () => {
  const { address, isConnected } = useAccount();
  const { closeWalletModal, isOpenedWalletModal } = useModal();
  const { sign } = useSession();
  const { userAddress } = useUser()
  // const recoveredAddress = useRef<string>()

  const { connect, connectors } = useConnect();
  const { signMessageAsync } = useSignMessage({ message: 'Connected with Inkubate' })
  // const [signature, setSignature] = useState("")

  const modalRef = useRef<HTMLDivElement>(null);

  const handleConnectWallet = async (connector: any) => {
    connect({ connector });
    if (typeof address === "string" && isConnected) {
      const nonce = await getNonce(address);
      signMessageAsync({ message }).then(async (sign) => {
        console.log(sign)
        const token = await signIn(address, sign.toString())
      })
      // console.log("token", signature);
    // console.log("signature", signature)
      sign();
      closeWalletModal();
    }
  };

  useEffect(() => {
    if (isConnected) {
      // signMessage({ message })
      // const getSignature = signMessageData?.toString()
      // console.log("signature", getSignature)
      // if (getSignature)
      //   setSignature(getSignature)
    }
  }, [isConnected])

  if (!isOpenedWalletModal) return;
  return (
    <div
      className={`${address ? "hidden" : ""
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
                    logo={walletImg[index]}
                  />
                );
              })}
              <Button className="text-[16px] font-semibold" isButton onClick={closeWalletModal}>Cancel</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

