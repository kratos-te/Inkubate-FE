import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import Typography from "../Typography";
import { AddLargeIcon } from "../SvgIcons";
import { useUser } from "@/contexts/UserContext";
import { availableUsername, updateProfile, updateUsername } from "@/utils/api";

const ProfileForms: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { userData, profile, getUserData } = useUser();
  const [changedName, setChangeName] = useState(userData.username);
  const [changedBio, setChangedBio] = useState(profile.bio);

  const handleUsernameChange = (event: any) => {
    setChangeName(event.target.value);
    console.log("show============", profile.bio)
  };

  const handleBioChange = (event: any) => {
    setChangedBio(event.target.value);
  };

  const onSubmit = async (data: any) => {
    try {
      const values: Record<string, string> = {};

      for (const key in data) {
        const value = data[key];
        values[key] = value;
      }
      if (userData.username !== values.username && values.username) {
        const res = await availableUsername(values.username);
        if (res) {
          await updateUsername(values.username);
        }
      }

      const changedProfile = await updateProfile({
        bio: changedBio,
        twitter: "",
        discord: "",
        facebook: "",
        reddit: "",
      });
      console.log("profile", changedProfile);
      getUserData()
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="overflow-auto h-[calc(100vh-220px)] xl:h-[calc(100vh-340px)] custom-scroll m-1 min-h-[600px]">
        <div className="flex gap-8 xl:gap-[45px] px-6 lg:px-[60px] xl:px-[137px] pt-11 xl:pt-[76px] flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 flex flex-col gap-8 xl:gap-[45px]">
            <div className="">
              <Typography className="font-semibold leading-6">
                Username
              </Typography>
              <input
                {...register("username", { required: false })}
                className="bg-dark-400 w-full rounded-xl mt-2 p-[14px] text-light-100 placeholder:text-third"
                placeholder="Enter a your username"
                value={changedName ? changedName : userData.username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="lg:hidden">
              <Typography className="font-semibold leading-6">Bio</Typography>
              <textarea
                {...register("bio", { required: false })}
                className="bg-dark-400 w-full rounded-xl mt-2 p-[14px] text-light-100 placeholder:text-third min-h-[160px] lg:min-h-[180px]"
                placeholder="share your story"
                value={changedBio ? changedBio : profile.bio}
                onChange={handleBioChange}
              ></textarea>
            </div>
            <div className="">
              <Typography className="font-semibold leading-6">
                Wallet Address
              </Typography>
              <input
                {...register("wallet", { required: false })}
                className="bg-dark-400 w-full rounded-xl mt-2 p-[14px] text-light-100 placeholder:text-third"
                placeholder="Enter your wallet address"
                value={userData.walletAddress}
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-[45px]">
            <div className="hidden lg:block">
              <Typography className="font-semibold leading-6">Bio</Typography>
              <textarea
                {...register("bio", { required: false })}
                className="bg-dark-400 w-full rounded-xl mt-2 p-[14px] text-light-100 placeholder:text-third min-h-[180px]"
                placeholder="share your story"
                value={changedBio ? changedBio : profile.bio}
                onChange={handleBioChange}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="mt-4 lg:mt-[45px] px-6 lg:px-[60px] xl:px-[137px]">
          <Typography className="font-semibold leading-6">
            Profile Image
          </Typography>
          <Typography className="font-[400] leading-6 !text-third mt-[14px]">
            The suggested aspect ration is 1:1
          </Typography>
          <div className="mt-[22px]">
            <label
              htmlFor="pfp"
              className="w-[116px] lg:w-[168px] h-[116px] lg:h-[168px] rounded-full bg-dark-400 grid place-content-center border border-dashed border-transparent hover:border-white"
            >
              <AddLargeIcon />
            </label>
            <input
              id="pfp"
              type="file"
              className="hidden"
              {...register("pfp", { required: false })}
            />
          </div>
        </div>
        <div className="mt-[45px] px-6 lg:px-[60px] xl:px-[137px]">
          <Typography className="font-semibold leading-6">
            Cover Image
          </Typography>
          <Typography className="font-[400] leading-6 !text-third my-[19px]">
            The cover image has a fixed height of 250px. The width varies with
            page.
          </Typography>
          <div className="">
            <label
              htmlFor="cover"
              className="w-full h-[168px] bg-dark-400 grid place-content-center rounded-xl border border-dashed border-transparent hover:border-white"
            >
              <Typography className="text-[14px] lg:text-[24px] !text-third font-poppins !font-[400]">
                Select an image
              </Typography>
            </label>
            <input
              id="cover"
              type="file"
              className="hidden"
              {...register("cover", { required: false })}
            />
          </div>
          <div className="flex justify-start lg:justify-end mt-[39px] lg:mt-[65px] mb-20">
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

export default ProfileForms;
