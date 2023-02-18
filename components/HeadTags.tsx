import Head from "next/head";
import { useRouter } from "next/router";

const siteTitle = "Joshua Pavlacky Landscape Design";
const baseUrl = "https://joshuapavlacky.com";

export const HeadTags = ({
  title,
  desc,
  image,
  imageAlt,
}: {
  title?: string;
  desc?: string;
  image?: string;
  imageAlt?: string;
}) => {
  const { asPath } = useRouter();

  return (
    <Head>
      <title>{(title ? `${title} - ` : "") + siteTitle}</title>
      <meta
        property="og:title"
        content={(title ? `${title} - ` : "") + siteTitle}
      />

      <meta property="og:url" content={baseUrl + asPath} />

      {desc && (
        <>
          <meta name="description" content={desc} />
          <meta property="og:description" content={desc} />
        </>
      )}

      {image && (
        <meta
          property="og:image"
          content={`${baseUrl}/${image}?nf_resize=fit&w=1200&h=630`}
        />
      )}

      {imageAlt && <meta name="twitter:image:alt" content={imageAlt}></meta>}

      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:type" content="business" />
      <meta name="twitter:card" content="summary_large_image" />
      {/* <meta property="fb:app_id" content="your_app_id" /> */}
      {/* <meta name="twitter:site" content="@twitterhandle" /> */}
    </Head>
  );
};
