import { FC, useState } from "react";
import { CloseCircleIcon, MinuPlusIcon } from "./SvgIcons";
import { useModal } from "@/contexts/ModalContext";
import Typography from "./Typography";
import { InputData, LaunchpadParam } from "@/utils/types";
import { SetDuration } from "./SetDuratoin";
import { LoadingPad } from "./LoadingPad";
import { weiToNum } from "@/utils/util";
import { updateLaunchpad } from "@/actions";
import { useErc721a } from "../hooks/useErc721a";
import { successAlert, warningAlert } from "./ToastGroup";


interface EditModalProps {
    launchpad: LaunchpadParam;
}

export const LaunchpadEditModal: FC<EditModalProps> = ({ launchpad }) => {
    const { closeLaunchpadEditModal, isOpenedLaunchpadEdit } = useModal();
    const { endMinting, changeWhiteListMode } = useErc721a();

    const [addressList, setAddressList] = useState<InputData[]>([]);
    const [ownerList, setOwnerList] = useState<InputData[]>([]);
    const [feeList, setFeeList] = useState<InputData[]>([]);
    const [isSpinLoading, setIsSpinLoading] = useState(false);

    const [supply, setSupply] = useState<number>(launchpad.supply);
    const [mintPrice, setMintPrice] = useState<bigint>(launchpad.mintPrice);
    const [collectionUri, setCollectionUri] = useState<string>(
        launchpad.collectionUri
    );
    const [maxPerTx, setMaxPerTx] = useState<number>(launchpad.maxPerTx);
    const [maxPerWallet, setMaxPerWallet] = useState<number>(
        launchpad.maxPerWallet
    );
    const [changeWlAddr, setChangeWlAddr] = useState<string[]>(
        launchpad.wlAddresses
    );
    const [changeWl, setChangeWl] = useState<boolean>(launchpad.wlEnabled);
    const [prefix, setPrefix] = useState<string>(launchpad.prefix);

    const handleInputChange = (
        event: any,
        index: number,
        reactHookGetter: any,
        reactHookSetter: any
    ) => {
        const value = event.target.value;
        const newInputList = [...reactHookGetter];
        newInputList[index].input = value;
        newInputList[index].input_rank = index + 1;
        reactHookSetter(newInputList);
    };

    const handleCreateAddressList = () => {
        setAddressList([
            ...addressList,
            {
                input: "",
                input_rank: addressList.length + 1,
            },
        ]);
        setOwnerList([
            ...ownerList,
            {
                input: "",
                input_rank: ownerList.length + 1,
            },
        ]);
        setFeeList([
            ...feeList,
            {
                input: "",
                input_rank: feeList.length + 1,
            },
        ]);
    };

    const handleChangeSupply = (event: any) => {
        setSupply(Number(event.target.value));
    };

    const handleChangeCollecetionUri = (event: any) => {
        setCollectionUri(event.target.value);
    };

    const handleChangeMaxPerTx = (event: any) => {
        setMaxPerTx(Number(event.target.value));
    };

    const handleChangeMaxPerWallet = (event: any) => {
        setMaxPerWallet(Number(event.target.value));
    };

    const handleChangeWlAddr = (event: any) => {
        setChangeWlAddr(event.target.value);
    };
    const handleChangeWl = async (event: any) => {
        setChangeWl(event.target.value);
        const res = await changeWhiteListMode(launchpad.collection.address, changeWl)
        if (res === null) {
            warningAlert("Canceled")
        } else {
            successAlert("Set WhiteList Mode!")
        }
    };
    const handleChangeMintPrice = (event: any) => {
        setMintPrice(BigInt(event.target.value));
    };
    const handleChangePrefix = (event: any) => {
        setPrefix(event.target.value);
    };
    const handleEndMint = async () => {
        const res = await endMinting(launchpad.collection.address)
        if (res === null) {
            warningAlert("Canceled End Mint")
        } else {
            successAlert("Ended Mint!")
        }
    };

    const handleEdit = async (launchpad: LaunchpadParam) => {
        setIsSpinLoading(true)
        await updateLaunchpad(launchpad.id, {
            mintPrice,
            supply,
            owners: [],
            ownerRoyalties: [],
            maxPerTx,
            maxPerWallet,
            wlEnabled: false,
            wlAddresses: [""],
            startDate: launchpad.startDate,
            endDate: launchpad.endDate,
            prefix: launchpad.prefix,
            collectionUri,
        });

        successAlert("Edited Successfully!")
        setIsSpinLoading(false)
    };

    if (!isOpenedLaunchpadEdit) return null;

    return (
        <div
            className={`fixed z-50 w-full h-full min-h-screen top-0 bg-black/90 transition-opacity`}
        >
            <div className="w-full h-full flex justify-center items-center overflow-auto">
                <div className="bg-[#161616] w-[1146px] rounded-[12px] max-sm:w-[331px] relative  bg-no-repeat bg-center bg-cover p-[17px] lg:p-9 mt-[300px] max-lg:mt-[900px]">
                    <button
                        className="group md:rounded-xl absolute right-7 md:right-9 top-9 md:top-9 z-10"
                        onClick={closeLaunchpadEditModal}
                    >
                        <CloseCircleIcon className="group-hover:rotate-90 duration-300 w-[40px] h-[40px]" />
                    </button>
                    <div className="modal_body text-center">
                        <div className="flex gap-7 xl:gap-[98px] lg:px-4 pt-11 xl:pt-14  flex-col lg:flex-row">
                            <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:gap-7">
                                <div className="flex-col">
                                    <Typography className="font-semibold leading-6 text-[16px] text-left">
                                        Increase Total Supply
                                    </Typography>
                                    <div className="flex gap-2">
                                        <input
                                            className="bg-dark-400 text-[14px] text-[#B3B3B3]  w-full rounded-xl mt-2 p-[14px] placeholder:text-third"
                                            placeholder="1000000"
                                            value={supply}
                                            onChange={handleChangeSupply}
                                        />
                                    </div>
                                </div>
                                <div className="flex-col">
                                    <Typography className="font-semibold leading-6 text-[16px] text-left">
                                        Collection URI
                                    </Typography>
                                    <div className="flex gap-2">
                                        <input
                                            className="bg-dark-400 text-[14px] text-[#B3B3B3]  w-full rounded-xl mt-2 p-[14px] placeholder:text-third"
                                            placeholder="ipfs://..."
                                            value={collectionUri}
                                            onChange={handleChangeCollecetionUri}
                                        />
                                    </div>
                                </div>
                                <div className="flex-col">
                                    <Typography className="font-semibold leading-6 text-[16px] text-left">
                                        Max Mint per Transaction
                                    </Typography>
                                    <div className="flex gap-2">
                                        <input
                                            className="bg-dark-400 text-[14px] text-[#B3B3B3]  w-full rounded-xl mt-2 p-[14px] placeholder:text-third"
                                            placeholder="Set the max tokens minitable per transaction"
                                            type="number"
                                            value={maxPerTx}
                                            onChange={handleChangeMaxPerTx}
                                        />
                                    </div>
                                </div>
                                <div className="flex-col">
                                    <Typography className="font-semibold leading-6 text-[16px] text-left">
                                        Max Mintable for Wallet
                                    </Typography>
                                    <div className="flex gap-2">
                                        <input
                                            className="bg-dark-400 text-[14px] text-[#B3B3B3]  w-full rounded-xl mt-2 p-[14px] placeholder:text-third"
                                            placeholder="Set the max tokens mintable for a wallet"
                                            type="number"
                                            value={maxPerWallet}
                                            onChange={handleChangeMaxPerWallet}
                                        />
                                    </div>
                                </div>
                                <div className="flex-col">
                                    <Typography className="font-semibold leading-6 text-[16px] text-left">
                                        Whitelist Address
                                    </Typography>
                                    <textarea
                                        className="bg-dark-400 text-[14px] text-[#B3B3B3]  w-full rounded-xl mt-2 p-[14px] min-h-[183px] placeholder:text-third"
                                        placeholder="Enter wallet address in bulk (0x0abcdefg00, 0x0abcedfg01,.. )"
                                        value={changeWlAddr}
                                        onChange={handleChangeWlAddr}
                                    />
                                </div>
                                <div className="flex-col">
                                    <div className="flex justify-between">
                                        <Typography className="font-semibold leading-6 text-[16px] text-left">
                                            Whitelist
                                        </Typography>
                                        <div className="hs-tooltip flex items-center">
                                            <input
                                                type="checkbox"
                                                id="hs-tooltip-example"
                                                className="hs-tooltip-toggle relative shrink-0 w-[35px] h-[20px] bg-black checked:bg-none checked:bg-secondary rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent  ring-offset-white focus:outline-none appearance-none dark:bg-black dark:checked:bg-secondary before:inline-block before:w-4 before:h-4 before:bg-white checked:before:bg-white before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-white dark:checked:before:bg-white"
                                                checked={changeWl}
                                                onChange={handleChangeWl}
                                            />
                                        </div>
                                    </div>
                                    <p className="font-normal leading-6 text-[14px] text-left text-[#666666]">
                                        Identify if you want to turn on or off the whitelist
                                    </p>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 flex flex-col gap-4 lg:gap-[20px] ">
                                <div className="flex-col">
                                    <Typography className="font-semibold leading-6 text-[16px] text-left">
                                        Prefix
                                    </Typography>
                                    <div className="flex gap-2">
                                        <input
                                            className="bg-dark-400 text-[14px] text-[#B3B3B3]  w-full rounded-xl mt-2 p-[14px] placeholder:text-third"
                                            placeholder="Enter the prefix. e.x: json"
                                            value={prefix}
                                            onChange={handleChangePrefix}
                                        />
                                    </div>
                                </div>
                                <div className="flex-col">
                                    <Typography className="font-semibold leading-6 text-[16px] text-left">
                                        Mint Price
                                    </Typography>
                                    <div className="flex gap-2">
                                        <input
                                            className="bg-dark-400 text-[14px] text-[#B3B3B3]  w-full rounded-xl mt-2 p-[14px] placeholder:text-third"
                                            placeholder="Enter the price"
                                            value={weiToNum(mintPrice)}
                                            onChange={handleChangeMintPrice}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Typography className="font-semibold leading-6 text-[16px] text-left">
                                        Assign Fee Distribution
                                    </Typography>
                                    {addressList.length > 0
                                        ? addressList.map((_, index) => (
                                            <>
                                                <div key={index} className="flex gap-2 ">
                                                    <input
                                                        className="bg-dark-400 text-[14px] text-[#B3B3B3] w-[85%] rounded-xl mt-2 p-[14px] placeholder:text-third"
                                                        placeholder="Enter a name for the collection"
                                                        onChange={(event) =>
                                                            handleInputChange(
                                                                event,
                                                                index,
                                                                ownerList,
                                                                setOwnerList
                                                            )
                                                        }
                                                    />
                                                    <input
                                                        className="bg-dark-400 text-[14px] text-[#B3B3B3] w-[15%] rounded-xl mt-2 p-[14px] placeholder:text-third"
                                                        placeholder="0.00%"
                                                        onChange={(event) =>
                                                            handleInputChange(
                                                                event,
                                                                index,
                                                                feeList,
                                                                setFeeList
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </>
                                        ))
                                        : ""}

                                    <div
                                        className="flex w-[158px] px-[4px] py-[10px] rounded-xl bg-dark-400 text-[14px] text-[#B3B3B3] font-semibold"
                                        onClick={handleCreateAddressList}
                                    >
                                        <MinuPlusIcon />
                                        Another Address
                                    </div>
                                </div>
                                <div className="flex-col">
                                    <SetDuration />
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full mt-6 lg:px-4">
                            <div
                                className="flex text-white bg-secondary text-[14px] font-semibold rounded-xl px-4 py-3 cursor-pointer"
                                onClick={() => handleEndMint()}
                            >
                                End Minting Early?
                            </div>
                        </div>
                        {isSpinLoading && (
                            <div className="flex justify-center">
                                <LoadingPad
                                    title="Processing"
                                    description="Editing Launchpad for you"
                                />
                            </div>
                        )}
                        <div className="flex flex-col gap-1 mt-9">
                            <button
                                className="w-full bg-white rounded-[12px] py-3 text-black text-[16px] font-semibold"
                                onClick={() => handleEdit(launchpad)}
                            >
                                Done
                            </button>
                            <button
                                className="w-full bg-[#161616] rounded-[12px] py-3 text-[#666666] text-[16px] font-semibold"
                                onClick={closeLaunchpadEditModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
