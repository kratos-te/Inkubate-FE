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
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      {children}
    </ModalContext.Provider>
  );
}
