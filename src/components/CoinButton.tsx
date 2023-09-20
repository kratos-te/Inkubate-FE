import { FC } from "react"
import Image from "next/image";
interface CoinButtonProps {
    icon: string;
    symbol: string;
    contract?: string
}

export const CoinButton: FC<CoinButtonProps> = ({ icon, symbol }) => {
    return (
        <div className="flex space-x-2 rounded-full py-1 px-[14px] bg-[#373C41] items-center my-auto">
            <Image width={18} height={18} src={icon} alt="coin image" />
            <p className="text-[16px] text-white">{symbol}</p>
        </div>
    )
}