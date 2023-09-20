"use client";
import { FC, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useModal } from "@/contexts/ModalContext";
import { CloseCircleIcon } from "./SvgIcons";
import Typography from "./Typography";
import ToggleSwitch from "./ToggleSwitch";

const LaunchpadModal: FC = () => {
  const { isOpenedLaunchpad, closeLaunchpadModal } = useModal();
  const { register, handleSubmit } = useForm();

  const [isFreeMint, setIsFreeMint] = useState(true);
  const [isReserve, setIsReserve] = useState(false);

  const handleDeploy = (data: any) => {
    console.log("data:", data);
  };

  if (!isOpenedLaunchpad) return;
  return (
    <div className="fixed top-0 left-0 z-50 grid w-screen h-screen xld:place-content-center">
      <div className="absolute left-0 top-0 w-full h-full bg-[#000000] opacity-50" />
      <div className="w-screen xld:w-[1400px] h-screen xld:h-auto max-h-screen xld:max-h-[calc(100vh-60px)] flex roudned-none xld:rounded-xl relative bg-dark-200 flex-col-reverse md:flex-row">
        <button
          className="group rounded-lg md:rounded-xl p-1 md:p-2.5 absolute right-2 md:right-9 top-2 md:top-9 z-10"
          onClick={closeLaunchpadModal}
          style={{
            background:
              "linear-gradient(135deg, rgba(113, 113, 113, 0.30) 0%, rgba(171, 171, 171, 0.70) 100%)",
          }}
        >
          <CloseCircleIcon className="group-hover:rotate-90 duration-300" />
        </button>
        <div className="w-full md:w-1/2 px-5 md:px-10 xld:px-[64px] py-20 overflow-auto custom-scroll">
          <form onSubmit={() => handleSubmit(handleDeploy)}>
            <Typography className="text-[14px] md:text-[16px]">
              Name*
            </Typography>
            <input
              {...register("name", { required: true })}
              className="bg-dark-400 w-full rounded-xl mt-2 mb-6 p-[14px] text-light-100 placeholder:text-third"
              placeholder="Enter a name for the collection"
            />
            <Typography className="text-[14px] md:text-[16px]">
              Suply
            </Typography>
            <input
              {...register("supply", { required: false })}
              className="bg-dark-400 w-full rounded-xl mt-2 mb-6 p-[14px] text-light-100 placeholder:text-third"
              placeholder="Set the max tokens for the collection"
            />

            <Typography className="text-[14px] md:text-[16px]">
              Public mint
            </Typography>
            <input
              {...register("publicMint", { required: false })}
              className="bg-dark-400 w-full rounded-xl mt-2 mb-6 p-[14px] text-light-100 placeholder:text-third"
              placeholder="Set the max tokens allowed per wallet"
            />

            <Typography className="text-[14px] md:text-[16px]">
              Symbol
            </Typography>
            <input
              {...register("symbol", { required: false })}
              className="bg-dark-400 w-full rounded-xl mt-2 mb-6 p-[14px] text-light-100 placeholder:text-third"
              placeholder="Enter a symbol or the collection, e.g. OPNFT"
            />

            <Typography className="text-[14px] md:text-[16px]">
              Allowlist mint
            </Typography>
            <input
              {...register("allowlistMint", { required: false })}
              className="bg-dark-400 w-full rounded-xl mt-2 mb-6 p-[14px] text-light-100 placeholder:text-third"
              placeholder="Set the max tokens allowed per wallet"
            />
            <button
              className="w-full rounded-xl bg-light-100 text-[#000] hover:bg-[#aaa] font-poppins leading-[1.5] py-3 px-6 duration-300"
              type="submit"
            >
              Deploy Contract
            </button>
            <div className="flex items-center justify-between mt-8">
              <Typography className="font-semibold">Free mint</Typography>
              <ToggleSwitch
                checked={isFreeMint}
                onToggle={() => setIsFreeMint(!isFreeMint)}
              />
            </div>
            <Typography className="text-[14px] text-third mt-3">
              Inkubate Launchpad currently only supports free-to-mint projects
            </Typography>
            <div className="flex items-center justify-between mt-8">
              <Typography className="font-semibold">Reserve tokens</Typography>
              <ToggleSwitch
                checked={isReserve}
                onToggle={() => setIsReserve(!isReserve)}
              />
            </div>
            <Typography className="text-[14px] text-third mt-3">
              Allow the contract owner to mint a token reserve seperate from the
              allowlist mint
            </Typography>
          </form>
        </div>
        <div className="relative grid w-full md:w-1/2 place-content-center overflow-hidden md:rounded-r-xl h-[400px] md:h-full py-[100px] md:py-0">
          <div
            className="absolute top-0 left-0 w-full h-full opacity-80 z-[2] "
            style={{
              backgroundImage:
                "linear-gradient(227deg, rgba(39, 16, 104, 0.80) 0%, #412269 100%)",
            }}
          />
          <div className="w-full h-full absolute left-0 top-0 z-[1]">
            <Image
              src={"/assets/images/launchpad-bg.png"}
              className="absolute z-0"
              alt=""
              fill
              objectFit="cover"
            />
          </div>
          <div className="text-center max-w-[600px] roudned-r-xl px-5 md:px-8">
            <Typography
              component="h2"
              className="text-[20px] md:text-[40px] xld:text-[48px] font-poppins font-semibold tracking-[-0.96px] relative z-10"
            >
              Inkubate Launchpad
            </Typography>
            <Typography
              component="p"
              className="text-[14px] xld:text-[18px] leading-[20px] xld:leading-[28px] relative z-10 mt-4 xld:mt-8"
            >
              Deploy your own ERC-721 smart contract and manage collection
              settings, minting, metadata, and allowlist on Inkubate.
              <br />
              <span className="hidden md:block">
                <br />
              </span>
              Launchpad collections must use completely original artwork.
              Derivative collections will be delisted even after mint.
            </Typography>
            <button
              className="md:w-[236px] rounded-xl bg-light-100 text-[#000] hover:bg-[#aaa] font-poppins leading-[1.5] py-3 px-6 duration-300 relative z-10 mt-6 md:mt-8"
              type="submit"
            >
              Launchpad Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchpadModal;
