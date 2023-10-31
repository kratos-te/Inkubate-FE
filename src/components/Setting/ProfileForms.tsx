import { FC, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  availableUsername,
  createPhoto,
  updatePhoto,
  updateProfile,
  updateUsername,
} from "@/actions";
import { useModal } from "@/contexts/ModalContext";
import { useUser } from "@/contexts/UserContext";
import { AddLargeIcon } from "../SvgIcons";
import Typography from "../Typography";
import { successAlert } from "../ToastGroup";

const ProfileForms: FC = () => {
  const { register, handleSubmit } = useForm();
  const { userData, profile, getUserData, setProfile, getProfileData } =
    useUser();
  const { closeSettingModal } = useModal();
  const [changedName, setChangeName] = useState(userData?.username);
  const [changedBio, setChangedBio] = useState(profile?.bio);
  const [changePfp, setChangePfp] = useState<string | null>(
    profile?.avatar?.url || null
  );
  const [changeBanner, setChangeBanner] = useState<string | null>(
    profile?.banner?.url || null
  );
  const [selectedPfpFile, setSelectedPfpFile] = useState<File | null>(null);
  const [selectedBannerFile, setSelectedBannerFile] = useState<File | null>(
    null
  );
  const [changedTwitter, setChangeTwitter] = useState(profile?.twitter);
  const [changedDiscord, setChangeDiscord] = useState(profile?.discord);
  const [changedReddit, setChangeReddit] = useState(profile?.reddit);
  const [changedFacebook, setChangeFacebook] = useState(profile?.facebook);

  const handleUsernameChange = (event: any) => {
    setChangeName(event.target.value);
  };

  const handleBioChange = (event: any) => {
    setChangedBio(event.target.value);
  };

  const handleChangePfp = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (!file) return;
    setSelectedPfpFile(file);
    setChangePfp(URL.createObjectURL(file));
  };

  const handleChangeBanner = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (!file) return;

    setSelectedBannerFile(file);
    setChangeBanner(URL.createObjectURL(file));
  };

  const handleTwitterChange = (event: any) => {
    setChangeTwitter(event.target.value);
  };
  const handleDiscordChange = (event: any) => {
    setChangeDiscord(event.target.value);
  };
  const handleRedditChange = (event: any) => {
    setChangeReddit(event.target.value);
  };
  const handleFacebookChange = (event: any) => {
    setChangeFacebook(event.target.value);
  };

  const onSubmit = async (data: any) => {
    try {
      const values: Record<string, string> = {};
      let avatar = {
        id: "",
        url: "",
        fileEntityId: "",
      };
      let banner = {
        id: "",
        url: "",
        fileEntityId: "",
      };
      for (const key in data) {
        const value = data[key];
        values[key] = value;
      }
      console.log("newPfp", selectedPfpFile);
      console.log("newBanner", selectedBannerFile);
      if (userData.username !== values.username && values.username) {
        const res = await availableUsername(
          values.username === "" ? userData.username : values.username
        );
        if (res) {
          await updateUsername(
            values.username === "" ? userData.username : values.username
          );
        }
      }
      if (selectedPfpFile) {
        if (profile?.avatarId) {
          const updatePfp = await updatePhoto(
            selectedPfpFile,
            profile.avatarId
          );
          avatar = updatePfp?.data;
        } else {
          const createPfp = await createPhoto(selectedPfpFile);
          avatar = createPfp?.data;
        }
      }
      if (selectedBannerFile) {
        if (profile?.bannerId) {
          const updateBanner = await updatePhoto(
            selectedBannerFile,
            profile.bannerId
          );
          banner = updateBanner?.data;
        } else {
          const createBanner = await createPhoto(selectedBannerFile);
          banner = createBanner?.data;
        }
      }

      setProfile({
        ...profile,
        avatar,
        banner,
        discord: changedDiscord,
        facebook: changedFacebook,
        twitter: changedTwitter,
        reddit: changedReddit,
      });

      await updateProfile({
        bio: changedBio,
        discord: changedDiscord,
        facebook: changedFacebook,
        twitter: changedTwitter,
        reddit: changedReddit,
        avatarId: avatar?.id || undefined,
        bannerId: banner?.id || undefined,
      });

      getUserData();
      getProfileData();
      closeSettingModal();
      successAlert("Updated succesfully!");
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
                value={changedName}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="lg:hidden">
              <Typography className="font-semibold leading-6">Bio</Typography>
              <textarea
                {...register("bio", { required: false })}
                className="bg-dark-400 w-full rounded-xl mt-2 p-[14px] text-light-100 placeholder:text-third min-h-[160px] lg:min-h-[180px]"
                placeholder="share your story"
                value={changedBio ? changedBio : profile?.bio}
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
                value={changedBio ? changedBio : profile?.bio}
                onChange={handleBioChange}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="mt-4 lg:mt-[45px] px-6 lg:px-[60px] xl:px-[137px] flex gap-8 xl:gap-[45px] flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 flex flex-col gap-8 xl:gap-[45px]">
            <Typography className="font-semibold leading-6">
              Profile Image
            </Typography>
            <Typography className="font-[400] leading-6 !text-third mt-[14px]">
              The suggested aspect ration is 1:1
            </Typography>
            <div className="mt-[22px]">
              <label
                htmlFor="pfp"
                className="w-[116px] lg:w-[168px] h-[116px] lg:h-[168px] rounded-full bg-dark-400 grid place-content-center border border-dashed border-transparent hover:border-white relative"
              >
                <AddLargeIcon className="z-30" />
                {changePfp && (
                  <Image
                    src={changePfp}
                    width={116}
                    height={116}
                    className="w-[116px] lg:w-[168px] h-[116px] lg:h-[168px] rounded-full absolute"
                    alt="Selected File Preview"
                  />
                )}
              </label>

              <input
                id="pfp"
                type="file"
                className="hidden"
                {...register("pfp", { required: false })}
                onChange={handleChangePfp}
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-8 xl:gap-[45px]">
            <div className="">
              <Typography className="font-semibold leading-6">
                Twitter
              </Typography>
              <input
                {...register("twitter", { required: false })}
                className="bg-dark-400 w-full rounded-xl mt-2 p-[14px] text-light-100 placeholder:text-third"
                placeholder="Enter a your twitter"
                value={changedTwitter}
                onChange={handleTwitterChange}
              />
            </div>
            <div className="">
              <Typography className="font-semibold leading-6">
                Discord
              </Typography>
              <input
                {...register("discord", { required: false })}
                className="bg-dark-400 w-full rounded-xl mt-2 p-[14px] text-light-100 placeholder:text-third"
                placeholder="Enter a your discord"
                value={changedDiscord}
                onChange={handleDiscordChange}
              />
            </div>
            <div className="">
              <Typography className="font-semibold leading-6">
                Reddit
              </Typography>
              <input
                {...register("reddit", { required: false })}
                className="bg-dark-400 w-full rounded-xl mt-2 p-[14px] text-light-100 placeholder:text-third"
                placeholder="Enter a your reddit"
                value={changedReddit}
                onChange={handleRedditChange}
              />
            </div>
            <div className="">
              <Typography className="font-semibold leading-6">
                Facebook
              </Typography>
              <input
                {...register("facebook", { required: false })}
                className="bg-dark-400 w-full rounded-xl mt-2 p-[14px] text-light-100 placeholder:text-third"
                placeholder="Enter a your facebook"
                value={changedFacebook}
                onChange={handleFacebookChange}
              />
            </div>
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
              className="w-full h-[168px] bg-dark-400 grid place-content-center rounded-xl border border-dashed border-transparent hover:border-white relative"
            >
              <Typography className="text-[14px] lg:text-[24px] !text-third font-poppins !font-[400]">
                Select an image
              </Typography>
              {changeBanner && (
                <Image
                  src={changeBanner}
                  width={116}
                  height={116}
                  className="w-full h-[168px]  absolute"
                  alt="Selected File Preview"
                />
              )}
            </label>
            <input
              id="cover"
              type="file"
              className="hidden"
              {...register("cover", { required: false })}
              onChange={handleChangeBanner}
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
