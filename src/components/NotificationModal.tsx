/* eslint-disable @next/next/no-img-element */
import { FC, useEffect, useState } from "react";
import { NotificationTypes } from "@/utils/types";
import { getNotification, readNotification } from "@/actions/notification";
import ClickAwayComponent from "./ClickAwayComponent";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifyData?: NotificationTypes[] | null;
  setNotifyData: Function;

}

interface NotificationProps {
  notify: NotificationTypes;
  setNotifyData: Function;
}

export const NotificationModal: FC<NotificationModalProps> = ({ isOpen, notifyData, setNotifyData, onClose }) => {


  const handleReadAll = async () => {
    const ids: string[] = [];
    const getIds = () => {
      notifyData?.map((item) => {
        ids.push(item.id)
      })
    }
    getIds();
    await readNotification(ids);
    const data = await getNotification();
    setNotifyData(data);
  }

  if (!isOpen) return null;
  return (
    <ClickAwayComponent onClickAway={onClose} className="absolute right-36 top-32 bg-dark-200  w-[500px] rounded-2xl overflow-hidden px-3 max-lg:w-[320px] max-lg:-right-4">

      <div className="modal_body text-center flex-col gap-4">
        <div className={`flex w-full place-content-end mt-2 ${notifyData && notifyData?.length > 0 ? "show" : "hidden"}`}>
          <button className="flex bg-secondary text-white text-[12px]  rounded-xl py-1 px-2" onClick={handleReadAll}>Read All</button>
        </div>

        {/* {NOTIFICATIONS.map((item, key) => (
          <div
            key={key}
            className="flex gap-3 items-center pb-[19px] pt-3 border-b-[1px] border-[#666666]"
          >
            <Image
              src={item.pfp}
              className=""
              width={57}
              height={57}
              alt="profile image on Notification"
            />
            <div className="flex flex-col gap-2 justify-start items-start">
              <div className="flex text-[14px] font-semibold text-white text-left">
                {item.title}
              </div>
              <div className="flex text-[10px] font-medium text-[#666666]">
                {item.time}
              </div>
            </div>
          </div>
        ))} */}
        {notifyData && notifyData?.length > 0 ? notifyData?.map((item, key) => (
          <Notification key={key} notify={item} setNotifyData={setNotifyData} />
        )) :
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-[14px] text-white">Empty Notification</p>
          </div>}
      </div>
    </ClickAwayComponent>
  );
};

export const Notification: FC<NotificationProps> = ({ notify, setNotifyData }) => {
  const [remainTime, setRemainTime] = useState<number>();

  const handleReadOne = async (id: string) => {
    await readNotification([id]);
    const data = await getNotification();
    setNotifyData(data);
  }

  useEffect(() => {
    if (notify) {
      const getTime = () => {
        const remainingTime = Math.floor(
          (Date.now() - new Date(notify?.createdAt).getTime()) / 1000
        );
        setRemainTime(remainingTime);
        setTimeout(getTime, 1000)
      }
      getTime()
    }
  }, [notify])

  return (
    <div
      className={`flex gap-3 items-center pb-[19px] pt-3 border-b-[1px] border-[#666666] cursor-pointer`} onClick={() => handleReadOne(notify.id)}>
      <img
        src={notify.activity.nft.image}
        className="w-[57px] h-[57px]"
        alt="profile image on Notification"
      />
      <div className="flex flex-col gap-2 justify-start items-start">
        <div className="flex text-[14px] font-semibold text-white text-left">
          {notify.type === "NEW_OFFER" && notify.activity.nft.name + "is offered!"}
          {notify.type === "SOLD" && notify.activity.nft.name + "is sold!"}
          {notify.type === "OFFER_ACCEPT" && notify.activity.nft.name + "offer is accepted!"}
          {notify.type === "OFFER_REJECTED" && notify.activity.nft.name + "offer is rejected!"}
        </div>
        <div className="flex text-[10px] font-medium text-[#666666]">
          {remainTime && remainTime > 0 && (
            <div className="w-full sm:w-[400px] text-light-100 mt-2 flex gap-1">
              {remainTime / 3600 >= 1 && (
                <span>
                  {Math.floor(remainTime / 3600)} hours
                </span>
              )}
              {remainTime % 3600 / 60 <= 59 && (
                <span>
                  {Math.floor(remainTime % 3600 / 60)} mins ago
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
