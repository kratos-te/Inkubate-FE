import FeaturedProjects from "@/components/FeaturedProjets";
import HomeCta from "@/components/HomeCta";
import HomeSlider from "@/components/HomeSlider";
import MainLayout from "@/layouts/MainLayout";
import NotableCollections from "@/components/NotableCollections";
import TopCollections from "@/components/TopCollections";
import { Meta } from "@/layouts/Meta";
import { CreateModal } from "@/components/CreateModal";

export default function Home() {

  return (
    <>
      <MainLayout
        className="!bg-dark-300"
        bgSrc="/assets/images/bg-home.png"
        bgClass="absolute left-1/2 -translate-x-1/2 -top-400 lg:top-0 w-[2896px] h-[4541px] pointer-events-none object-cover opacity-40 lg:opacity-100"
        meta={
          <Meta title="Inkubate" description="Lorem ipsum dolor sit amet." />
        }
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
