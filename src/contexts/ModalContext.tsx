"use client";
// import { getProfile } from "@/actions";
import { createContext, useContext, ReactNode, useState } from "react";

interface ModalContextType {
  openLaunchpadModal: () => void;
  closeLaunchpadModal: () => void;
  isOpenedLaunchpad: boolean;
  // setting modal
  openSettingModal: () => void;
  closeSettingModal: () => void;
  isOpenedSetting: boolean;
  //Wallet Modal
  openWalletModal: () => void;
  closeWalletModal: () => void;
  isOpenedWalletModal: boolean;
  //Offer Modal
  openOfferModal: () => void;
  closeOfferModal: () => void;
  isOpenedOfferModal: boolean;
  //Accept Modal
  openAcceptModal: () => void;
  closeAcceptModal: () => void;
  isOpenedAcceptModal: boolean;
  //Mint Modal
  openMintModal: () => void;
  closeMintModal: () => void;
  isOpenedMintModal: boolean;
  //Buy Modal
  openBuyModal: () => void;
  closeBuyModal: () => void;
  isOpenedBuyModal: boolean;
  //CreateModal
  openCreateModal: () => void;
  closeCreateModal: () => void;
  isOpenedCreateModal: boolean;
  //Calendar Modal
  openCalendarModal: () => void;
  closeCalendarModal: () => void;
  isOpenedCalendarModal: boolean;
  //List Modal
  openListModal: () => void;
  closeListModal: () => void;
  isOpenedListModal: boolean;
  //Notification Modal
  openNotificationModal: () => void;
  closeNotificationModal: () => void;
  isOpenedNotificationModal: boolean;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [isOpenedLaunchpad, setLaunchpadModal] = useState<boolean>(false);

  const openLaunchpadModal = () => {
    setLaunchpadModal(true);
    document.body.classList.add("modal-open");
  };

  const closeLaunchpadModal = () => {
    setLaunchpadModal(false);
    document.body.classList.remove("modal-open");
  };

  const [isOpenedSetting, setSettingModal] = useState<boolean>(false);

  const openSettingModal = () => {
    // getProfile()
    setSettingModal(true);
    document.body.classList.add("modal-open");
  };

  const closeSettingModal = () => {
    setSettingModal(false);
    document.body.classList.remove("modal-open");
  };

  const [isOpenedWalletModal, setIsOpenedWalletModal] =
    useState<boolean>(false);

  const openWalletModal = () => {
    console.log("open wallet modal");
    setIsOpenedWalletModal(true);
    // document.body.classList.add("modal-open");
  };

  const closeWalletModal = () => {
    setIsOpenedWalletModal(false);
    // document.body.classList.remove("modal-open");
  };

  const [isOpenedOfferModal, setIsOpenedOfferModal] = useState<boolean>(false);
  const openOfferModal = () => {
    setIsOpenedOfferModal(true);
    document.body.classList.add("modal-open");
  };
  const closeOfferModal = () => {
    setIsOpenedOfferModal(false);
    document.body.classList.remove("modal-open");
  };

  const [isOpenedAcceptModal, setIsOpenedAcceptModal] =
    useState<boolean>(false);
  const openAcceptModal = () => {
    setIsOpenedAcceptModal(true);
    document.body.classList.add("modal-open");
  };
  const closeAcceptModal = () => {
    setIsOpenedAcceptModal(false);
    document.body.classList.remove("modal-open");
  };

  const [isOpenedMintModal, setIsOpenedMintModal] = useState<boolean>(false);
  const openMintModal = () => {
    setIsOpenedMintModal(true);
    document.body.classList.add("modal-open");
  };
  const closeMintModal = () => {
    setIsOpenedMintModal(false);
    document.body.classList.remove("modal-open");
  };

  const [isOpenedBuyModal, setIsOpenedBuyModal] = useState<boolean>(false);
  const openBuyModal = () => {
    setIsOpenedBuyModal(true);
    document.body.classList.add("modal-open");
  };
  const closeBuyModal = () => {
    setIsOpenedBuyModal(false);
    document.body.classList.remove("modal-open");
  };

  const [isOpenedCreateModal, setIsOpenedCreateModal] =
    useState<boolean>(false);
  const openCreateModal = () => {
    setIsOpenedCreateModal(true);
    document.body.classList.add("modal-open");
  };
  const closeCreateModal = () => {
    setIsOpenedCreateModal(false);
    document.body.classList.remove("modal-open");
  };

  const [isOpenedCalendarModal, setIsOpenedCalendarModal] =
    useState<boolean>(false);
  const openCalendarModal = () => {
    setIsOpenedCalendarModal(true);
    document.body.classList.add("modal-open");
  };
  const closeCalendarModal = () => {
    setIsOpenedCalendarModal(false);
    document.body.classList.remove("modal-open");
  };

  const [isOpenedListModal, setIsOpenedListModal] = useState<boolean>(false);
  const openListModal = () => {
    setIsOpenedListModal(true);
    document.body.classList.add("modal-open");
  };
  const closeListModal = () => {
    setIsOpenedListModal(false);
    document.body.classList.remove("modal-open");
  };

  const [isOpenedNotificationModal, setIsOpenedNotificationModal] =
    useState<boolean>(false);
  const openNotificationModal = () => {
    setIsOpenedNotificationModal(true);
    document.body.classList.add("modal-open");
  };
  const closeNotificationModal = () => {
    setIsOpenedNotificationModal(false);
    document.body.classList.remove("modal-open");
  };

  const modalContextValue: ModalContextType = {
    openLaunchpadModal,
    closeLaunchpadModal,
    isOpenedLaunchpad,
    openSettingModal,
    closeSettingModal,
    isOpenedSetting,
    openWalletModal,
    closeWalletModal,
    isOpenedWalletModal,
    openOfferModal,
    closeOfferModal,
    isOpenedOfferModal,
    openAcceptModal,
    closeAcceptModal,
    isOpenedAcceptModal,
    openMintModal,
    closeMintModal,
    isOpenedMintModal,
    openBuyModal,
    closeBuyModal,
    isOpenedBuyModal,
    openCreateModal,
    closeCreateModal,
    isOpenedCreateModal,
    openCalendarModal,
    closeCalendarModal,
    isOpenedCalendarModal,
    openListModal,
    closeListModal,
    isOpenedListModal,
    openNotificationModal,
    closeNotificationModal,
    isOpenedNotificationModal,
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      {children}
    </ModalContext.Provider>
  );
}
