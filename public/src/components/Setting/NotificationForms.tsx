import { useForm } from "react-hook-form";
import { FC } from "react";
import Typography from "../Typography";
import CoinSelector from "./CoinSelector";

const NotificationForms: FC = () => {
  const { register } = useForm();
  return (
    <form>
      <div className="overflow-auto h-[calc(100vh-220px)] xl:h-[calc(100vh-340px)] custom-scroll m-1 min-h-[600px]">
        <div className="flex gap-8 xl:gap-[45px] px-6 lg:px-[60px] xl:px-[137px] pt-11 xl:pt-[68px] flex-col lg:flex-row">
          <div className="">
            <Typography className="font-semibold leading-6">Email</Typography>
            <Typography className="font-[400] leading-6 !text-third my-[19px]">
              Enter your email address to receive marketplace notifications
            </Typography>
            <input
              {...register("email", { required: false })}
              className="bg-dark-400 w-full rounded-xl p-[14px] text-light-100 placeholder:text-third"
              placeholder="Enter a your email address"
            />
          </div>
          <div className="">
            <Typography className="font-semibold leading-6">
              Minimum Offer Threshold
            </Typography>
            <Typography className="font-[400] leading-6 !text-third my-[19px]">
              You will only get notified of offers greater than or equal to this
              amount
            </Typography>
            <div className="relative">
              <CoinSelector className="absolute left-3 top-2.5" />
              <input
                className="bg-dark-400 w-full rounded-xl p-[14px] text-light-100 placeholder:text-third pl-[111px]"
                placeholder="e.g 0.01"
              />
            </div>
          </div>
          <div className="flex justify-start lg:justify-end mt-[20px] lg:mt-[65px] mb-20">
            <div className="flex items-center gap-2.5">
              <button className="py-[11px] px-8 shadow-card w-[116px] bg-dark-400 rounded-lg text-white font-bold font-readex">
                Cancel
              </button>
              <button
                className="py-[11px] px-8 shadow-card w-[116px] rounded-lg text-white font-bold font-readex"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #FF9CDA 0%, #EA4492 100%)",
                }}
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

export default NotificationForms;
