"use client";
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import MainLayout from "@/layouts/MainLayout";
import Link from "next/link";

export default function BridgePage() {
  return (
    <MainLayout>
      <div className="flex items-center justify-center flex-col h-full py-[200px]">
        <Typography className="font-bold text-[160px] leading-[1]">
          404
        </Typography>
        <Typography className="font-bold text-[20px]">Not Found</Typography>
        <Typography className="font-semibold text-[16px]">
          Could not find requested resource
        </Typography>
        <Link href={"/"}>
          <Button className="mt-6">Return Home</Button>
        </Link>
      </div>
    </MainLayout>
  );
}
