import type { NextPage, GetStaticProps } from "next";
import styled from "styled-components";
import parse from "html-react-parser";
import { Footer } from "../components/Footer";
import { Logo } from "../components/Logo";
import {
  TwoColWrap,
  TextStack,
  MobileLogo,
  MobileFeaturedImg,
  dims,
} from "../components/shared";
import { VerticalRule } from "../components/VerticalRule";
import { HeadTags } from "../components/HeadTags";
import Image from "next/image";

interface Props {
  content: {
    attributes: {
      featured_image: string;
      caption?: string;
      meta?: string;
    };
    html: string;
  };
}

const InfoFeaturedImgWrap = styled.div`
  top: 0;
  position: sticky;
  width: 50%;
  height: calc(100vh - ${dims.footerHeight}px);

  @media (max-width: 640px) {
    display: none;
  }
`;

const Info: NextPage<Props> = ({ content }) => {
  const imageUrl = content.attributes.featured_image;

  return (
    <>
      <HeadTags
        title="Info"
        desc={content.attributes.meta}
        image={imageUrl}
        imageAlt={content.attributes.caption || "Joshua at work"}
      />

      <MobileLogo />
      <MobileFeaturedImg
        fill
        alt={content.attributes.caption || "Joshua at work"}
        src={"/" + imageUrl}
      />

      <VerticalRule />

      <TwoColWrap>
        <TextStack style={{ marginBottom: dims.footerHeight }}>
          <Logo />
          {parse(content.html)}
        </TextStack>

        <InfoFeaturedImgWrap>
          <Image
            fill
            alt={content.attributes.caption || "Joshua at work"}
            src={"/" + content.attributes.featured_image}
            style={{ objectFit: "cover" }}
          />
        </InfoFeaturedImgWrap>
      </TwoColWrap>

      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = await import(`../content/pages/${"contact"}.md`);
  return { props: { content: content.default } };
};

export default Info;
