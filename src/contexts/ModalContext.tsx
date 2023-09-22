"use client";
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
  isOpenedOfferModal: boolean 
  //Accept Modal
  openAcceptModal: () => void;
  closeAcceptModal: () => void;
  isOpenedAcceptModal: boolean;
  //Mint Modal
  openMintModal: () => void;
  closeMintModal: () => void;
  isOpenedMintModal: boolean;
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
    setIsOpenedWalletModal(true);
    // document.body.classList.add("modal-open");
  };

  const closeWalletModal = () => {
    setIsOpenedWalletModal(false);
    // document.body.classList.remove("modal-open");
  };

  const [isOpenedOfferModal, setIsOpenedOfferModal] = useState<boolean>(false);
  const openOfferModal = () => {
    setIsOpenedOfferModal(true)
    document.body.classList.add("modal-open");
  }
  const closeOfferModal = () => {
    setIsOpenedOfferModal(false)
    document.body.classList.remove("modal-open");
  }

  const [isOpenedAcceptModal, setIsOpenedAcceptModal] = useState<boolean>(false);
  const openAcceptModal = () => {
    setIsOpenedAcceptModal(true)
    document.body.classList.add("modal-open");
  }
  const closeAcceptModal = () => {
    setIsOpenedAcceptModal(false)
    document.body.classList.remove("modal-open");
  }

  const [isOpenedMintModal, setIsOpenedMintModal] = useState<boolean>(false);
  const openMintModal = () => {
    setIsOpenedMintModal(true)
    document.body.classList.add("modal-open");
  }
  const closeMintModal = () => {
    setIsOpenedMintModal(false)
    document.body.classList.remove("modal-open");
  }

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
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      {children}
    </ModalContext.Provider>
  );
}
