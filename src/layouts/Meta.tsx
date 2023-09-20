import Head from "next/head";
import { FC } from "react";

type IMetaProps = {
  title: string;
  description: string;
  canonical?: string;
};

const Meta: FC<IMetaProps> = ({ title, description }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description}></meta>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <link
          rel="apple-touch-icon"
          href={`/apple-touch-icon.png`}
          key="apple"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`/favicon-32x32.png`}
          key="icon32"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`/favicon-16x16.png`}
          key="icon16"
        />
        <link rel="icon" href={`/favicon.ico`} key="favicon" />
      </Head>
    </>
  );
};

export { Meta };
