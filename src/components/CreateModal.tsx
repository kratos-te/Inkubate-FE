"use client";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useModal } from "@/contexts/ModalContext";
import ClickAwayComponent from "./ClickAwayComponent";
import { ArrowDownIcon, CloseCircleIcon } from "./SvgIcons";
import Typography from "./Typography";
import { DURATION_RANGE } from "@/config";
import { CalendarModal } from "./CalendarModal";
import { CoinButton } from "./CoinButton";
import { useUser } from "@/contexts/UserContext";

export const CreateModal: FC = () => {
    const { closeCreateModal, isOpenedCreateModal, openCalendarModal } = useModal()
    const { date } = useUser()
    const { register } = useForm();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [dateRange, setDateRange] = useState("")

    const handleSetDate = (item: string) => {
        setDateRange(item)
        if (item === "Custom") {
            openCalendarModal()
        }
    }


    if (!isOpenedCreateModal) return null;
    return (
        <div
            className={`fixed z-50 w-full h-full min-h-screen top-0  bg-black/90 transition-opacity`}
        >
            <div className="w-full h-full flex justify-center items-center overflow-auto">
                <div
                    className="bg-[#161616] w-[1146px] rounded-[12px] max-sm:w-[331px] relative  bg-no-repeat bg-center bg-cover p-9 mt-[500px] max-lg:mt-[1500px]"
                >
                    <button
                        className="group md:rounded-xl absolute right-7 md:right-9 top-9 md:top-9 z-10"
                        onClick={closeCreateModal}
                    >
                        <CloseCircleIcon className="group-hover:rotate-90 duration-300 w-[40px] h-[40px]" />
                    </button>
                    <div className="modal_body text-center">
                        <form>
                            <div className="flex gap-7 xl:gap-[98px] px-6 lg:px-[60px] xl:px-4 pt-11 xl:pt-14  flex-col lg:flex-row">
                                <div className="w-full lg:w-1/2 flex flex-col gap-7 xl:gap-7">
                                    <div className="flex-col">
                                        <Typography className="font-semibold leading-6 text-[16px] text-left">
                                            Name
                                        </Typography>
                                        <input
                                            {...register("name", { required: false })}
                                            className="bg-dark-400 text-[14px] text-[#B3B3B3]  w-full rounded-xl mt-2 p-[14px] placeholder:text-third"
                                            placeholder="Enter a name for the collection"
                                        />
                                    </div>
                                    <div className="flex-col">
                                        <Typography className="font-semibold leading-6 text-[16px] text-left">
                                            Symbol
                                        </Typography>
                                        <input
                                            {...register("symbol", { required: false })}
                                            className="bg-dark-400 text-[14px] text-[#B3B3B3]  w-full rounded-xl mt-2 p-[14px] placeholder:text-third"
                                            placeholder="Enter a symbol for the collection, e.g. OPNFT"
                                        />
                                    </div>
                                    <div className="flex-col">
                                        <Typography className="font-semibold leading-6 text-[16px] text-left">
                                            Total Supply
                                        </Typography>
                                        <input
                                            {...register("totalSupply", { required: false })}
                                            className="bg-dark-400 text-[14px] text-[#B3B3B3]  w-full rounded-xl mt-2 p-[14px] placeholder:text-third"
                                            placeholder="Set the max tokens for the collection"
                                        />
                                    </div>
                                    <div className="flex-col">
                                        <Typography className="font-semibold leading-6 text-[16px] text-left">
                                            Max Mint per Transaction
                                        </Typography>
                                        <input
                                            {...register("maxPerTx", { required: false })}
                                            className="bg-dark-400 text-[14px] text-[#B3B3B3]  w-full rounded-xl mt-2 p-[14px] placeholder:text-third"
                                            placeholder="Set the max tokens minitable per transaction"
                                        />
                                    </div>
                                    <div className="flex-col">
                                        <Typography className="font-semibold leading-6 text-[16px] text-left">
                                            Max Mintable for Wallet
                                        </Typography>
                                        <input
                                            {...register("maxPerWallet", { required: false })}
                                            className="bg-dark-400 text-[14px] text-[#B3B3B3]  w-full rounded-xl mt-2 p-[14px] placeholder:text-third"
                                            placeholder="Set the max tokens mintable for a wallet"
                                        />
                                    </div>
                                    <div className="flex-col">
                                        <Typography className="font-semibold leading-6 text-[16px] text-left">
                                            Whitelist Address
                                        </Typography>
                                        <textarea
                                            {...register("whitelistAddr", { required: false })}
                                            className="bg-dark-400 text-[14px] text-[#B3B3B3]  w-full rounded-xl mt-2 p-[14px] min-h-[183px] placeholder:text-third"
                                            placeholder="Enter wallet address in bulk (0x0abcdefg00, 0x0abcedfg01,.. )"
                                        />
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2 flex flex-col gap-[34px] xl:gap-[34px] ">
                                    <div className="flex-col">
                                        <Typography className="font-semibold leading-6 text-[16px] text-left">
                                            Collection URI
                                        </Typography>
                                        <input
                                            {...register("collectionUri", { required: false })}
                                            className="bg-dark-400 text-[14px] text-[#B3B3B3]  w-full rounded-xl mt-2 p-[14px] placeholder:text-third"
                                            placeholder="Enter the URI (ipfs://.....)"
                                        />
                                    </div>
                                    <div className="flex-col">
                                        <Typography className="font-semibold leading-6 text-[16px] text-left">
                                            Mint Price
                                        </Typography>
                                        <input
                                            {...register("mintPrice", { required: false })}
                                            className="bg-dark-400 text-[14px] text-[#B3B3B3]  w-full rounded-xl mt-2 p-[14px] placeholder:text-third"
                                            placeholder="Enter the price"
                                        />
                                    </div>
                                    <div className="flex-col">
                                        <Typography className="font-semibold leading-6 text-[16px] text-left">
                                            Assign Fee Distribution
                                        </Typography>
                                        <div className="flex gap-2 ">
                                            <input
                                                {...register("assignFee", { required: false })}
                                                className="bg-dark-400 text-[14px] text-[#B3B3B3] w-[85%] rounded-xl mt-2 p-[14px] placeholder:text-third"
                                                placeholder="Enter a name for the collection"
                                            />
                                            <input
                                                {...register("percentage", { required: false })}
                                                className="bg-dark-400 text-[14px] text-[#B3B3B3] w-[15%] rounded-xl mt-2 p-[14px] placeholder:text-third"
                                                placeholder="0.00%"
                                            />
                                        </div>
                                        <div className="flex gap-2 ">
                                            <input
                                                {...register("assignFee", { required: false })}
                                                className="bg-[#202020] text-[14px] text-[#3D3D3D] w-[85%] rounded-xl mt-2 p-[14px] placeholder:text-third"
                                                placeholder="Enter a name for the collection"
                                            />
                                            <input
                                                {...register("percentage", { required: false })}
                                                className="bg-[#202020] text-[14px] text-[#3D3D3D]  w-[15%] rounded-xl mt-2 p-[14px] placeholder:text-third"
                                                placeholder="0.00%"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-col">
                                        <Typography className="font-semibold leading-6 text-[16px] text-left">
                                            Set Duration
                                        </Typography>
                                        <div className="flex gap-[9px] mt-2 justify-between items-center w-[80%]">
                                            <div className="flex-col gap-2 w-1/2">
                                                <Typography className="text-left text-[14px] text-white font-normal max-sm:text-[16px]">
                                                    Starting
                                                </Typography>

                                                {/* <input type="text" className="text-white text-[14px] font-normal bg-[#616161]" value={startDay} /> */}
                                                <input
                                                    {...register("startTime", { required: false })}
                                                    className="bg-dark-400 text-[14px] text-[#B3B3B3] w-full rounded-xl mt-2 p-[14px] placeholder:text-third"
                                                    placeholder="01:00 "
                                                />

                                            </div>
                                            <div className="border-b border-[#666666] h-1/2 w-[15px] mt-8"></div>
                                            <div className="flex-col gap-2 w-1/2">
                                                <Typography className="text-left text-[14px] text-white w-1/2 font-normal  max-sm:text-[16px]">
                                                    Ending
                                                </Typography>
                                                <input
                                                    {...register("endTime", { required: false })}
                                                    className="bg-dark-400 text-[14px] text-[#B3B3B3] w-full rounded-xl mt-2 p-[14px] placeholder:text-third"
                                                    placeholder="23:59 "
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-col">
                                        <Typography className="text-left text-[16px] text-white font-semibold max-sm:text-[16px]">
                                            Starting Date
                                        </Typography>
                                        <Typography className="text-left text-[14px] text-white w-1/2 font-normal mt-2 max-sm:text-[16px]">
                                            Start Date
                                        </Typography>
                                        <div className="flex justify-between px-3 py-[14px] rounded-[8px] bg-dark-400 mt-2 cursor-pointer items-center relative" onClick={() => setIsCollapsed(!isCollapsed)}>
                                            <div className="text-white text-[14px] font-normal " >{dateRange ? dateRange : "Set duration"}</div>
                                            <ArrowDownIcon />
                                            {isCollapsed &&
                                                <div className="flex-col w-full -mt-[6px] px-[14px] bg-dark-400 text-[14px] rounded-b-[8px] absolute top-[50px] right-0">
                                                    {DURATION_RANGE.map((item) => (
                                                        <div className="flex py-[14px] text-white text-[14px] font-normal justify-start cursor-pointer" onClick={() => handleSetDate(item)}>{item}</div>
                                                    ))}
                                                </div>
                                            }
                                        </div>

                                    </div>
                                    <div className="flex-col">
                                        <Typography className="font-semibold leading-6 text-[16px] text-left">
                                            Select Blockchain
                                        </Typography>
                                        <p className="font-normal leading-6 text-[14px] text-left text-[#666666]">
                                            Select blockchain where you'd like the collection to live. Payment for mint will be in the chain's native token.
                                        </p>
                                        <CoinButton icon="/assets/icons/eth.png" symbol="ETH" className="flex w-[100px] space-x-2 items-center bg-dark-400 py-3 px-3 mt-[14px] rounded-[12px] " />
                                    </div>
                                    <div className="flex-col">
                                        <div className="flex justify-between">
                                            <Typography className="font-semibold leading-6 text-[16px] text-left">
                                                Whitelist
                                            </Typography>
                                            <div className="hs-tooltip flex items-center">
                                                <input type="checkbox" id="hs-tooltip-example" className="hs-tooltip-toggle relative shrink-0 w-[35px] h-[20px] bg-black checked:bg-none checked:bg-secondary rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent  ring-offset-white focus:outline-none appearance-none dark:bg-black dark:checked:bg-secondary before:inline-block before:w-4 before:h-4 before:bg-white checked:before:bg-white before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-white dark:checked:before:bg-white" />

                                            </div>
                                        </div>
                                        <p className="font-normal leading-6 text-[14px] text-left text-[#666666]">
                                            Identify if you want to turn on or off the whitelist
                                        </p>
                                    </div>
                                    <div className="flex-col">
                                        <div className="flex justify-between">
                                            <Typography className="font-semibold leading-6 text-[16px] text-left">
                                                Reserve tokens
                                            </Typography>
                                            <div className="hs-tooltip flex items-center">
                                                <input type="checkbox" id="hs-tooltip-example" className="hs-tooltip-toggle relative shrink-0 w-[35px] h-[20px] bg-black checked:bg-none checked:bg-secondary rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent  ring-offset-white focus:outline-none appearance-none dark:bg-black dark:checked:bg-secondary before:inline-block before:w-4 before:h-4 before:bg-white checked:before:bg-white before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-white dark:checked:before:bg-white" />

                                            </div>
                                        </div>
                                        <p className="font-normal leading-6 text-[14px] text-left text-[#666666]">
                                            Allow the contract owner to mint a token reserve seperate from the allowlist mint
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 mt-6">

                                <button className="w-full bg-white rounded-[12px] py-3 text-black text-[16px] font-semibold">Deploy New Mintable Collection</button>
                                <button className="w-full bg-[#161616] rounded-[12px] py-3 text-[#666666] text-[16px] font-semibold">Cancel</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <CalendarModal />
        </div>
    )
}