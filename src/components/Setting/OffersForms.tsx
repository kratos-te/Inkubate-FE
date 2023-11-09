import { FC, useState } from "react";
import { useForm } from "react-hook-form";

import { updateProfile } from "@/actions";
import { useModal } from "@/contexts/ModalContext";
import { useUser } from "@/contexts/UserContext";
import { successAlert } from "../ToastGroup";
import Typography from "../Typography";
import CoinSelector from "./CoinSelector";
import { numToWei, weiToNum } from "@/utils/util";

const OffersForms: FC = () => {
  const { register, handleSubmit, reset } = useForm();
  const { closeSettingModal } = useModal();
  const { profile, setProfile, getUserData, getProfileData } = useUser();
  const [changedOfferToken, setChangeOfferToken] = useState(
    profile?.offerToken || ""
  );
  const [changedOfferThreshold, setChangeOfferThreshold] = useState(
    profile?.minOfferThreshold ? weiToNum(profile.minOfferThreshold) : ""
  );

  const handleOfferTokenChange = (token: any) => {
    setChangeOfferToken(token);
  };

  const handleOfferThresholdChange = (event: any) => {
    let value = event.target.value;

    if (value.length > 0 && value[0] === ".") value = "0" + value;
    if (value.length > 0 && value[value.length - 1] === ".")
      value = value + "0";

    if (isNaN(parseFloat(value))) return;

    setChangeOfferThreshold(value);
  };

  const onSubmit = async (_data: any) => {
    try {
      setProfile({
        ...profile,
        offerToken: changedOfferToken,
        minOfferThreshold: BigInt(numToWei(changedOfferThreshold)),
      });

      await updateProfile({
        offerToken: changedOfferToken,
        minOfferThreshold: BigInt(numToWei(changedOfferThreshold)),
      });

      getUserData();
      getProfileData();
      closeSettingModal();
      successAlert("Updated succesfully!");
    } catch (error) {
      console.log("error", error);
    }
  };

  const onAbort = () => {
    reset();
    closeSettingModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="overflow-auto h-[calc(100vh-220px)] xl:h-[calc(100vh-340px)] custom-scroll m-1 min-h-[600px]">
        <div className="flex gap-8 xl:gap-[45px] px-6 lg:px-[60px] xl:px-[137px] pt-11 xl:pt-[68px] flex-col lg:flex-row">
          <div className="">
            <Typography className="font-semibold leading-6">
              Minimum Offer Threshold
            </Typography>
            <Typography className="font-[400] leading-6 !text-third my-[19px]">
              You will only get notified of offers greater than or equal to this
              amount
            </Typography>
            <div className="relative">
              <CoinSelector
                className="absolute left-3 top-2.5"
                token={changedOfferToken}
                setToken={handleOfferTokenChange}
              />
              <input
                {...register("offerThreshold", { required: false })}
                className="bg-dark-400 w-full rounded-xl p-[14px] text-light-100 placeholder:text-third pl-[111px]"
                placeholder="e.g 0.01"
                value={changedOfferThreshold}
                onChange={handleOfferThresholdChange}
              />
            </div>
          </div>
          <div className="flex justify-start lg:justify-end mt-[20px] lg:mt-[65px] mb-20">
            <div className="flex items-center gap-2.5">
              <button
                className="py-[11px] px-8 shadow-card w-[116px] bg-dark-400 rounded-lg text-white font-bold font-readex"
                type="button"
                onClick={onAbort}
              >
                Cancel
              </button>
              <button
                className="py-[11px] px-8 shadow-card w-[116px] rounded-lg text-white font-bold font-readex"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #FF9CDA 0%, #EA4492 100%)",
                }}
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default OffersForms;
