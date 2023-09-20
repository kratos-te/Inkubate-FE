import { FC, ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface Props {
  meta?: ReactNode;
  children?: ReactNode;
  className?: string;
}

const MainLayout: FC<Props> = ({ children, className }) => {
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
    </div>
  );
};

export default MainLayout;
