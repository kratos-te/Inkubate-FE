import { FC, useState, useRef } from "react"
import { BnbIcon, CloseCircleIcon, EthIcon, SwapIcon } from "./SvgIcons"

interface ConvertModalProps {
    isOpen: boolean;
    onClose: () => void;
}
export const ConvertModal: FC<ConvertModalProps> = ({ isOpen, onClose }) => {


    const [isEther, setIsEther] = useState(true)
    const [isBnb, setIsBnb] = useState(false)
    const [isConvert, setIsConvert] = useState(false)

    const modalRef = useRef<HTMLDivElement>(null);

    const handelSetEther = () => {
        setIsEther(true);
        setIsBnb(false);
    }

    const handleSetBnb = () => {
        setIsEther(false);
        setIsBnb(true);
    }

    const handleSwap = () => {

    }

    const handleConvert = () => {
        setIsConvert(!isConvert)
    }


    if (!isOpen) return null;
    return (

        <div
            ref={modalRef}
            className="absolute right-2 top-20 bg-black  w-[500px] rounded-2xl max-w-[440px] overflow-hidden p-5"
        >
            <button
                className="group md:rounded-x l absolute right-0 md:right-4 top-2 md:top-4 z-10"
                onClick={onClose}
            >
                <CloseCircleIcon className="group-hover:rotate-90 duration-300" />
            </button>
            <div className="modal_header">
                <div className="text-white text-[24px] mb-[26px] max-w-[280px] text-left leading-7  font-bold">
                    Convert Tokens
                </div>
            </div>
            <div className="modal_body text-center flex-col space-y-8">
                <div className="flex justify-between border-2 border-white rounded-full my-14">
                    <div className={`flex space-x-2 justify-center border-white py-2 w-1/2 rounded-full items-center cursor-pointer ${isEther ? "bg-white text-black" : "bg-black text-white"}`} onClick={handelSetEther}>
                        <EthIcon color={`${isEther ? "black" : "white"}`} />
                        <p className="text-[24px] font-bold"> ETH</p>
                    </div>
                    <div className={`flex space-x-2 justify-center w-1/2 border-white py-2 px-4 rounded-full items-center cursor-pointer ${isBnb ? "bg-white text-black" : "bg-black text-white"}`} onClick={handleSetBnb}>
                        <BnbIcon color={`${isBnb ? "black" : "white"}`} />
                        <p className="text-[24px]  font-bold"> BNB</p>
                    </div>
                </div>
                <div className="flex-col">
                    <div className="flex text-[16px] text-[#B3B3B3]">Max amount is 0 wETH</div>
                    <div className="flex-col mt-2 relative">
                        <div className="flex justify-between p-2 rounded-xl bg-[#333333]">
                            <div className="flex-col space-y-4">
                                <p className="text-[14px] text-[#666666]">You Pay</p>
                                <p className="text-[24px] text-[#666666]">0.00</p>
                            </div>
                            <div className="flex space-x-2 rounded-full px-4 py-2 bg-[#373C41] items-center my-auto">
                                <EthIcon />
                                <p className="text-[16px] text-white">ETH</p>
                            </div>
                        </div>
                        <div className="flex justify-between p-2 rounded-xl bg-[#333333] mt-2">
                            <div className="flex-col space-y-4">
                                <p className="text-[14px] text-[#666666]">You Received</p>
                                <p className="text-[24px] text-[#666666] text-left">0.00</p>
                            </div>
                            <div className="flex space-x-2 rounded-full px-4 py-2 bg-[#373C41] items-center my-auto">
                                <EthIcon className="bg-blue-500 rounded-full pt-1" color="blue" />
                                <p className="text-[16px] text-white">WETH</p>
                            </div>
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full p-2 w-10 h-10" onClick={handleSwap}>
                            <SwapIcon />
                        </div>
                    </div>
                </div>
                {isConvert && (
                    <div className="flex space-x-4">
                        <button type="button" className="" disabled>
                            <svg className="animate-spin h-20 w-20 mr-3  text-gray-200  dark:text-[#041B2D] fill-[#EA4492]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </button>
                        <div className="flex-col space-y-2 text-left">
                            <div className="text-[24px] text-white">Converting</div>
                            <div className="text-[16px] text-[#B3B3B3]">Wrapping your ETH to WETH for ERC-20 compatibility. Please be patient.</div>
                        </div>
                    </div>
                )}
                <div className="flex justify-center py-3 bg-white text-black text-[16px] rounded-2xl cursor-pointer" onClick={handleConvert}>
                    Convert
                </div>
            </div>
        </div>

    )
}