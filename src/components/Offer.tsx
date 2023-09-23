import { FC } from "react"
import Image from "next/image";
import { DEMO_NFTS } from "@/config";
import Typography from "./Typography";
import { useModal } from "@/contexts/ModalContext";


export const Offer: FC = () => {
    const { openAcceptModal } = useModal()
    const nftLists = Array(40).fill(DEMO_NFTS[0]);

    return (
        <table className="w-full">
            <thead >
                <tr className="text-[24px] text-white font-semibold justify-between">
                    <th align="left" className="w-1/3 max-[970px]:w-1/2">
                        Item
                    </th>
                    <th align="left">
                        Price
                    </th>
                    <th align="left" className="max-md:hidden">
                        Floor
                    </th>
                    <th align="left" className="max-[970px]:hidden">
                        Quantity
                    </th>
                    <th align="left" className="max-lg:hidden">
                        Expiration
                    </th>
                    <th align="left" className="max-xl:hidden">
                        Received
                    </th>
                </tr>
            </thead>
            <tbody>
                {nftLists.map((item) => (
                    <tr className="cursor-pointer group border-t-[0.5px] border-[#687681]">
                        <td className="py-[38px]">
                            <div className="flex items-center relative z-10">
                                <div className="w-[70px] h-[70px] sm:w-[70px] sm:h-[70px] relative">
                                    <Image
                                        src={item.image}
                                        width={70}
                                        height={70}
                                        className="rounded-[10px] mr-[11px] w-[70px] h-[70px]"
                                        alt=""
                                    />
                                </div>
                                <div className="flex-col gap-[2px]">
                                    <Typography className="flex items-center gap-2  ml-2 text-[30px] font-semibold max-[640px]:text-[20px] max-sm:text-[16px]">
                                        {item.name}
                                    </Typography>
                                    <p className="flex items-center gap-2  ml-2 text-[30px] font-semibold text-[#555555] max-[640px]:text-[20px] max-sm:text-[16px]">
                                        OG Dread zero
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="flex items-center">
                                <p className="text-[24px] font-semibold text-white max-[640px]:text-[16px] max-sm:text-[12px]">{item.price}ETH</p>
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
                                <p className="text-[24px] font-semibold text-white">In 30 days</p>
                            </div>
                        </td>
                        <td className="max-xl:hidden">
                            <div className="flex items-center ">
                                <p className="text-[24px] font-semibold text-white">1 hour ago</p>
                            </div>
                        </td>
                        <td className="">
                            <div className="flex items-center justify-end">
                                <button className=" bg-secondary rounded-xl text-white text-[20px] font-semibold px-6 py-3 max-[640px]:text-[12px] max-sm:text-[8px]" onClick={openAcceptModal}>Accept</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}