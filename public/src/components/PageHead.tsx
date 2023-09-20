import Head from "next/head";
import { FC } from "react";

interface HeadProps {
  title: string;
  description: string;
}

const PageHead: FC<HeadProps> = ({ title, description }) => {
  return (
    <Head>
      <title>{title} | ETH NFT Marketplace</title>
      <meta name="description" content={description} />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/android-chrome-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="512x512"
        href="/android-chrome-512x512.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
    </Head>
  );
};

export default PageHead;
