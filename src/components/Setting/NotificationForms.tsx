import { useForm } from "react-hook-form";
import { FC, useState } from "react";

import { updateProfile } from "@/actions";
import { useModal } from "@/contexts/ModalContext";
import { useUser } from "@/contexts/UserContext";
import Typography from "../Typography";
import { successAlert } from "../ToastGroup";

const NotificationForms: FC = () => {
  const { register, handleSubmit, reset } = useForm();
  const { closeSettingModal } = useModal();
  const { profile, setProfile, getUserData, getProfileData } = useUser();

  const [changedEmail, setChangeEmail] = useState(profile?.email || "");

  const handleEmailChange = (event: any) => {
    setChangeEmail(event.target.value);
  };

  const onSubmit = async (_data: any) => {
    try {
      setProfile({
        ...profile,
        email: changedEmail,
      });

      await updateProfile({
        email: changedEmail,
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
            <Typography className="font-semibold leading-6">Email</Typography>
            <Typography className="font-[400] leading-6 !text-third my-[19px]">
              Enter your email address to receive marketplace notifications
            </Typography>
            <input
              {...register("email", { required: false })}
              className="bg-dark-400 w-full rounded-xl p-[14px] text-light-100 placeholder:text-third"
              placeholder="Enter a your email address"
              value={changedEmail}
              onChange={handleEmailChange}
            />
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

export default NotificationForms;
