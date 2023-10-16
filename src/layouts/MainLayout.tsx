/* eslint-disable @next/next/no-img-element */
import { FC, ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface Props {
  meta?: ReactNode;
  children?: ReactNode;
  className?: string;
  bgSrc?: string;
  bgClass?: string;
  pageLoading?: boolean;
}

const MainLayout: FC<Props> = ({
  children,
  className,
  bgSrc,
  bgClass,
  pageLoading,
}) => {
  return (
    <div className="relative overflow-hidden">
      <Header />
      <main
        className={`min-h-screen bg-dark-300 pb-[480px] ${
          className ? className : ""
        }`}
        style={{
          paddingBottom: 480,
        }}
      >
        {children}
      </main>
      <Footer />
      {bgSrc && !pageLoading && (
        <img src={bgSrc} className={bgClass} alt="nft image" />
      )}
    </div>
  );
};

export default MainLayout;
