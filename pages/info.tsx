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
import { BlurUpImg } from "../components/BlurUpImg";

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

const InfoFeaturedImg = styled(BlurUpImg)`
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
        alt={content.attributes.caption || "Joshua at work"}
        src={imageUrl}
        lgQuery={"?nf_resize=fit&w=1200"}
      />

      <VerticalRule />

      <TwoColWrap>
        <TextStack style={{ marginBottom: dims.footerHeight }}>
          <Logo />
          {parse(content.html)}
        </TextStack>

        <InfoFeaturedImg
          alt={content.attributes.caption || "Joshua at work"}
          src={content.attributes.featured_image}
          lgQuery={"?nf_resize=fit&w=1200"}
        />
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
