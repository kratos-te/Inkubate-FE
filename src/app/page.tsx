import FeaturedProjects from "@/components/FeaturedProjets";
import HomeCta from "@/components/HomeCta";
import HomeSlider from "@/components/HomeSlider";
import MainLayout from "@/layouts/MainLayout";
import NotableCollections from "@/components/NotableCollections";
import TopCollections from "@/components/TopCollections";
import { CreateModal } from "@/components/CreateModal";
import { metaFaviconData, pageMetadata } from "@/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: pageMetadata.home.title,
  description: pageMetadata.home.description,
  icons: metaFaviconData,
};

export default function Home() {
  return (
    <>
      <MainLayout
        className="!bg-dark-300"
        bgSrc="/assets/images/bg-home.png"
        bgClass="absolute left-1/2 -translate-x-1/2 -top-400 lg:top-0 w-[2896px] h-[4541px] pointer-events-none object-cover opacity-40 lg:opacity-100"
      >
        <HomeSlider />
        <TopCollections />
        <NotableCollections />
        <HomeCta />
        <FeaturedProjects />
      </MainLayout>
      <CreateModal />
    </>
  );
}
