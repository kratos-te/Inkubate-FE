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

const walletImg = [
  "/assets/images/wallet/metamask.svg",
  "/assets/images/wallet/coinbase.svg",
  "/assets/images/wallet/walletconnect.svg",
  "/assets/images/wallet/trust-wallet.svg",
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
          className="bg-[#171C21] w-full max-w-[440px] overflow-hidden relative mt-[50px] bg-no-repeat bg-center bg-cover p-11"
        >
          <button
            className="group rounded-lg md:rounded-xl p-1 md:p-2.5 absolute right-2 md:right-9 top-2 md:top-9 z-10"
            onClick={closeWalletModal}
            style={{
              background:
                "linear-gradient(135deg, rgba(113, 113, 113, 0.30) 0%, rgba(171, 171, 171, 0.70) 100%)",
            }}
          >
            <CloseCircleIcon className="group-hover:rotate-90 duration-300" />
          </button>
          <div className="modal_header">
            <div className="text-white text-[24px] mb-[26px] max-w-[280px] text-center leading-7 uppercase mx-auto font-bold">
              CONNECT WALLET
            </div>
          </div>
          <div className="modal_body text-center">
            <p className="text-[#ffffffcc] text-[16px] leading-7 pb-6">
              Please select a wallet to connect
            </p>
            <div className="flex flex-col">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

