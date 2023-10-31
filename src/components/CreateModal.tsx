"use client";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useModal } from "@/contexts/ModalContext";
import { CloseCircleIcon, MinuPlusIcon, UploadIcon } from "./SvgIcons";
import Typography from "./Typography";
import { createLaunchpad, createPhoto } from "@/actions";
import { CoinButton } from "./CoinButton";
import { useUser } from "@/contexts/UserContext";
import { SetDuration } from "./SetDuratoin";
import { InputData } from "@/utils/types";
import { date2UTC, numToWei } from "@/utils/util";
import { LoadingPad } from "./LoadingPad";
import { errorAlert, successAlert } from "./ToastGroup";

const FIVE_MINS = 5 * 60 * 1000;

export const CreateModal: FC = () => {
  const { closeCreateModal, isOpenedCreateModal } = useModal();
  const { startDate, endDate, startTime, endTime } = useUser();
  const { register, handleSubmit } = useForm();
  const [selectedNftItemFile, setSelectedNftItemFile] = useState<File | null>(
    null
  );
  const [selectedCoverFile, setSelectedCoverFile] = useState<File | null>(null);
  const [nftItem, setNftItem] = useState<string | null>("" || null);
  const [covetImage, setCovetImage] = useState<string | null>("" || null);
  const [addressList, setAddressList] = useState<InputData[]>([]);
  const [ownerList, setOwnerList] = useState<InputData[]>([]);
  const [feeList, setFeeList] = useState<InputData[]>([]);
  const [isSpinLoading, setIsSpinLoading] = useState(false);

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

  const handleChangeNftItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (!file) return;
    setSelectedNftItemFile(file);
    setNftItem(URL.createObjectURL(file));
  };

  const handleChangeCoverImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (!file) return;
    setSelectedCoverFile(file);
    setCovetImage(URL.createObjectURL(file));
  };

  const onSubmit = async (data: any) => {
    const startDay = date2UTC(startDate, startTime);
    const endDay = date2UTC(endDate, endTime);
    console.log(new Date(startDay).getTime());
    console.log(Date.now());
    if (new Date(startDay).getTime() > Date.now() + FIVE_MINS) {
      if (new Date(endDay).getTime() > new Date(startDay).getTime()) {
        try {
          setIsSpinLoading(true);
          const values: Record<string, string> = {};
          for (const key in data) {
            const value = data[key];
            values[key] = value;
          }

          let nftItem = {
            id: "",
            url: "",
            fileEntityId: "",
          };
          let coverImage = {
            id: "",
            url: "",
            fileEntityId: "",
          };
          console.log("spin!!!!!!!!!!");

          if (selectedNftItemFile) {
            console.log("!!!!!!!!!!!!!!!saving!!!!!!!!!!");

            const createNftItem = await createPhoto(selectedNftItemFile);
            nftItem = createNftItem?.data;
          }
          if (selectedCoverFile) {
            const createCoverImage = await createPhoto(selectedCoverFile);
            coverImage = createCoverImage?.data;
          }
          if (
            values.name &&
            values.symbol &&
            values.description &&
            values.mintPrice &&
            values.totalSupply &&
            values.maxPerTx &&
            values.maxPerWallet &&
            values.collectionUri
          ) {
            const mintPrice = BigInt(numToWei(values.mintPrice));
            const supply = parseInt(values.totalSupply);
            const maxPerTx = parseInt(values.maxPerTx);
            const maxPerWallet = parseInt(values.maxPerWallet);

            await createLaunchpad({
              name: values.name,
              symbol: values.symbol,
              desc: values.description,
              logoId: nftItem.id,
              imageId: coverImage.id,
              mintPrice: mintPrice,
              supply: supply,
              owners: [],
              ownerRoyalties: [],
              maxPerTx: maxPerTx,
              maxPerWallet: maxPerWallet,
              wlEnabled: false,
              wlAddresses: [""],
              enableReserveTokens: false,
              startDate: startDay,
              endDate: endDay,
              network: "MAIN",
              twitter: values.twitter,
              discord: values.discord,
              facebook: values.facebook,
              reddit: values.reddit,
              collectionUri: values.collectionUri,
            });
          }
          successAlert("Created Launchpad successfully!");
          closeCreateModal();
        } catch (error) {
          errorAlert("Failed creating LaunchPad!");
          console.log("error", error);
        } finally {
          setIsSpinLoading(false);
        }
      } else {
        errorAlert("Wrong end time, It must be set to less than start time.");
      }
    } else {
      errorAlert(
        "Wrong start time, It must be set to 5 minutes later, at least less than now."
      );
    }
  };

  useEffect(() => {
    if (isSpinLoading === false) {
      closeCreateModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isOpenedCreateModal) return null;
  return (
    <div
      className={`fixed z-50 w-full h-full min-h-screen top-0  bg-black/90 transition-opacity`}
    >
      <div className="w-full h-full flex justify-center items-center overflow-auto">
        <div className="bg-[#161616] w-[1146px] rounded-[12px] max-sm:w-[331px] relative  bg-no-repeat bg-center bg-cover p-[17px] lg:p-9 mt-[700px] max-lg:mt-[2000px]">
          <button
            className="group md:rounded-xl absolute right-7 md:right-9 top-9 md:top-9 z-10"
            onClick={closeCreateModal}
          >
            <CloseCircleIcon className="group-hover:rotate-90 duration-300 w-[40px] h-[40px]" />
          </button>
          <div className="modal_body text-center">
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
              <div className="flex gap-7 xl:gap-[98px] lg:px-4 pt-11 xl:pt-14  flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:gap-7">
                  <div className="flex-col">
                    <Typography className="font-semibold leading-6 text-[16px] text-left">
                      NFT Item
                    </Typography>
                    <p className="flex text-[14px] font-normal text-[#666666]">
                      Supported File Formats: PNG, GIF, WEBP, MP4 or MP3. Max
                      100mb.
                    </p>
                    <div className="mt-[14px]">
                      <label
                        htmlFor="nftItem"
                        className="w-[209px] lg:w-[209px] h-[209px] lg:h-[209px] rounded-xl bg-dark-400 grid place-content-center border border-dashed border-transparent hover:border-white relative"
                      >
                        <UploadIcon />
                        {nftItem && (
                          <Image
                            src={nftItem}
                            width={209}
                            height={209}
                            className="w-[209px] lg:w-[209px] h-[209px] lg:h-[209px] rounded-xl absolute object-cover"
                            alt="Selected File Preview"
                          />
                        )}
                      </label>
                      <input
                        id="nftItem"
                        type="file"
                        className="hidden"
                        {...register("nftItem", { required: false })}
                        onChange={handleChangeNftItem}
                      />
                    </div>
                  </div>
                  <div className="flex-col">
                    <Typography className="font-semibold leading-6 text-[16px] text-left">
                      NFT Cover Image
                    </Typography>
                    <p className="flex text-[14px] font-normal text-[#666666]">
                      Recommended Size: 1400px x 350px. Max 100mb.
                    </p>
                    <div className="mt-[14px]">
                      <label
                        htmlFor="coverImage"
                        className="w-[285px] lg:w-[479px] h-[169px] lg:h-[169px] rounded-xl bg-dark-400 grid place-content-center border border-dashed border-transparent hover:border-white relative"
                      >
                        <UploadIcon />
                        {covetImage && (
                          <Image
                            src={covetImage}
                            width={209}
                            height={209}
                            className="w-[285px] lg:w-[479px] h-[169px] lg:h-[169px] rounded-xl absolute"
                            alt="Selected File Preview"
                          />
                        )}
                      </label>
                      <input
                        id="coverImage"
                        type="file"
                        className="hidden"
                        {...register("coverImage", { required: false })}
                        onChange={handleChangeCoverImage}
                      />
                    </div>
                  </div>
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
                      Description
                    </Typography>
                    <textarea
                      {...register("description", { required: false })}
                      className="bg-dark-400 text-[14px] text-[#B3B3B3]  w-full rounded-xl mt-2 p-[14px] min-h-[183px] placeholder:text-third"
                      placeholder="Enter Description"
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
                </div>
                <div className="w-full lg:w-1/2 flex flex-col gap-4 lg:gap-[20px] ">
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

                    <button
                      className="flex w-[158px] px-[4px] py-[10px] rounded-xl bg-dark-400 text-[14px] text-[#B3B3B3] font-semibold"
                      onClick={handleCreateAddressList}
                    >
                      <MinuPlusIcon />
                      Another Address
                    </button>
                  </div>
                  <div className="flex-col">
                    <SetDuration />
                  </div>
                  <div className="flex-col">
                    <Typography className="font-semibold leading-6 text-[16px] text-left">
                      Select Blockchain
                    </Typography>
                    <p className="font-normal leading-6 text-[14px] text-left text-[#666666]">
                      Select blockchain where you&#39;d like the collection to
                      live. Payment for mint will be in the chain&#39;s native
                      token.
                    </p>
                    <CoinButton
                      icon="/assets/icons/eth.png"
                      symbol="ETH"
                      className="flex w-[100px] space-x-2 items-center bg-dark-400 py-3 px-3 mt-[14px] rounded-[12px] "
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
                        />
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
                        <input
                          type="checkbox"
                          id="hs-tooltip-example"
                          className="hs-tooltip-toggle relative shrink-0 w-[35px] h-[20px] bg-black checked:bg-none checked:bg-secondary rounded-full cursor-pointer transition-colors ease-in-out duration-200 ring-1 ring-transparent  ring-offset-white focus:outline-none appearance-none dark:bg-black dark:checked:bg-secondary before:inline-block before:w-4 before:h-4 before:bg-white checked:before:bg-white before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-white dark:checked:before:bg-white"
                        />
                      </div>
                    </div>
                    <p className="font-normal leading-6 text-[14px] text-left text-[#666666]">
                      Allow the contract owner to mint a token reserve seperate
                      from the allowlist mint
                    </p>
                  </div>
                  <div className="flex-col">
                    <Typography className="font-semibold leading-6 text-[16px] text-left">
                      Twitter
                    </Typography>
                    <input
                      {...register("twitter", { required: false })}
                      className="bg-dark-400 text-[14px] text-[#B3B3B3]  w-full rounded-xl mt-2 p-[14px] placeholder:text-third"
                      placeholder="Enter your twitter link"
                    />
                  </div>
                  <div className="flex-col">
                    <Typography className="font-semibold leading-6 text-[16px] text-left">
                      Discord
                    </Typography>
                    <input
                      {...register("discord", { required: false })}
                      className="bg-dark-400 text-[14px] text-[#B3B3B3]  w-full rounded-xl mt-2 p-[14px] placeholder:text-third"
                      placeholder="Enter your discord link"
                    />
                  </div>
                  <div className="flex-col">
                    <Typography className="font-semibold leading-6 text-[16px] text-left">
                      Facebook
                    </Typography>
                    <input
                      {...register("facebook", { required: false })}
                      className="bg-dark-400 text-[14px] text-[#B3B3B3]  w-full rounded-xl mt-2 p-[14px] placeholder:text-third"
                      placeholder="Enter your facebook link"
                    />
                  </div>
                  <div className="flex-col">
                    <Typography className="font-semibold leading-6 text-[16px] text-left">
                      Website
                    </Typography>
                    <input
                      {...register("reddit", { required: false })}
                      className="bg-dark-400 text-[14px] text-[#B3B3B3]  w-full rounded-xl mt-2 p-[14px] placeholder:text-third"
                      placeholder="Enter your Website link"
                    />
                  </div>
                </div>
              </div>
              {isSpinLoading && (
                <div className="flex justify-center">
                  <LoadingPad
                    title="Processing"
                    description="Creating Launchpad for you"
                  />
                </div>
              )}
              <div className="flex flex-col gap-1 mt-6">
                <button className="w-full bg-white rounded-[12px] py-3 text-black text-[16px] font-semibold">
                  Deploy New Mintable Collection
                </button>
                <button
                  className="w-full bg-[#161616] rounded-[12px] py-3 text-[#666666] text-[16px] font-semibold"
                  onClick={closeCreateModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <CalendarModal /> */}
    </div>
  );
};
