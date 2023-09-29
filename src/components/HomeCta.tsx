/* eslint-disable @next/next/no-img-element */
"use client";
import { useModal } from "@/contexts/ModalContext";
import Button from "./Button";
import Typography from "./Typography";

const HomeCta = () => {
  const { openCreateModal } = useModal();
  return (
    <section
      className="max-w-[1664px] mx-8 2xld:mx-auto px-5 md:px-8 xl:px-[72px] py-5 md:py-12 lg:py-20 rounded-xl xl:mt-[50px] relative overflow-hidden z-10"
      style={{
        backgroundImage: "linear-gradient(180deg, #411BAE 0%, #6E3CFF 100%)",
      }}
    >
      <div className="absolute top-0 right-0 h-full lg:h-auto">
        <img
          src="/assets/images/home-cta.png"
          className="object-cover w-full h-full max-h-[720px]"
          alt=""
        />
      </div>
      <div className="max-w-[360px] lg:max-w-[480px] xl:max-w-[600px] relative z-10">
        <Typography
          component="h1"
          className="font-semibold leading-[1.2] tracking-[-1.2px] text-[20px] md:!text-[36px] lg:!text-[48px]"
        >
          Get started and create your own NFT
        </Typography>
        <Typography
          component="p"
          className="text-[12px] leading-[18px] lg:text-[18px] lg:laeding-[28px] mt-1 lg:mt-2.5"
        >
          Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.
        </Typography>
        <Button className="mt-[14px] xl:mt-9" onClick={openCreateModal}>
          Create Now
        </Button>
      </div>
    </section>
  );
};

export default HomeCta;
