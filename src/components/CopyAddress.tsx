"use client";
import { FC, useEffect, useState } from "react";
import copy from "copy-to-clipboard";
import Typography from "./Typography";
import { CopiedIcon, CopyIcon } from "./SvgIcons";
import { successAlert } from "./ToastGroup";

interface Props {
  address: string;
}

const CopyAddress: FC<Props> = ({ address }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    copy(address);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  useEffect(() => {
    if (copied === true) {
      successAlert("Address copied successfully!")
    }
  }, [copied])
  return (
    <div
      className="bg-[#434343] rounded-lg p-[6px] flex items-center"
      onClick={handleCopy}
    >
      <Typography className="text-[12px] font-semibold">
        {address.slice(0, 6)}
      </Typography>
      <div className="ml-1 w-4 cursor-pointer h-3 grid place-content-center border-l border-light-100">
        {!copied ? <CopyIcon /> : <CopiedIcon />}
      </div>
    </div>
  );
};

export default CopyAddress;
