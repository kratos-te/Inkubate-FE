import { OfferTypes } from "@/utils/types"
import { FC } from "react"
import Typography from "./Typography";
import { weiToNum } from "@/utils/util";
import { getDayOfYear } from "date-fns";
import { useModal } from "@/contexts/ModalContext";

interface OfferProps {
    offer: OfferTypes;
}

export const Offer: FC<OfferProps> = ({ offer }) => {
    const { openAcceptModal } = useModal();
    const { expiresAt } = offer
    const duraion = getDayOfYear(new Date(expiresAt)) - getDayOfYear(new Date())
    // const received = 24 * (getDayOfYear(new Date()) - getDayOfYear(new Date(createdAt))) + (getHours(new Date(createdAt)) - getHours(new Date()))
    return (
        <>
            <tr
                className="cursor-pointer group border-t-[0.5px] border-[#687681]"
            >
                <td className="py-[38px]">
                    <div className="flex items-center relative z-10">
                        <div className="w-[70px] h-[70px] sm:w-[70px] sm:h-[70px] relative">
                            <image
                                xlinkHref={offer.nft.imgUrl}
                                className="rounded-[10px] mr-[11px] w-[70px] h-[70px]"
                            />
                        </div>
                        <div className="flex-col gap-[2px]">
                            <Typography className="flex items-center gap-2  ml-2 text-[30px] font-semibold max-[640px]:text-[20px] max-sm:text-[16px]">
                                {`${offer.nft.name}#${offer.nft.nftId}`}
                            </Typography>
                            <p className="flex items-center gap-2  ml-2 text-[30px] font-semibold text-[#555555] max-[640px]:text-[20px] max-sm:text-[16px]">
                                {offer.nft.name}
                            </p>
                        </div>
                    </div>
                </td>
                <td>
                    <div className="flex items-center">
                        <p className="text-[24px] font-semibold text-white max-[640px]:text-[16px] max-sm:text-[12px]">
                            {weiToNum(offer.offerPrice)}ETH
                        </p>
                    </div>
                </td>
                <td className="max-md:hidden">
                    <div className="flex items-center">
                        <p className="text-[24px] font-semibold text-white">+10%</p>
                    </div>
                </td>
                <td className="max-[970px]:hidden">
                    <div className="flex items-center">
                        <p className="text-[24px] font-semibold text-white">1</p>
                    </div>
                </td>
                <td className="max-lg:hidden">
                    <div className="flex items-center">
                        <p className="text-[24px] font-semibold text-white">
                            {`in ${duraion} days`}
                        </p>
                    </div>
                </td>
                {/* <td className="max-xl:hidden">
                    <Link
                        href={`https://Goerli.etherscan.io/tx/${txHash}`}
                        target="_blank"
                    >
                        <div className="flex items-center">
                            <p className="text-[24px] font-semibold text-white">
                                {received} hour ago
                            </p>
                            <LinkIcon />
                        </div>
                    </Link>
                </td> */}
                <td className="">
                    <div className="flex items-center justify-end">
                        <button
                            className="bg-secondary rounded-xl text-white text-[20px] font-semibold px-6 py-3 max-[640px]:text-[12px] max-sm:text-[8px]"
                            onClick={openAcceptModal}
                        >
                            Accept
                        </button>
                    </div>
                </td>
            </tr>
        </>
    )
}