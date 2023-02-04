import type { NextPage, GetStaticProps } from "next";
import styled from "styled-components";
import parse from "html-react-parser";
import { Footer } from "../components/Footer";
import { Logo } from "../components/Logo";
import {
  TwoColWrap,
  TextStack,
  AboveTextSpacer,
  MobileLogo,
  MobileFeaturedImg,
  colors,
  dims,
} from "../components/shared";
import { ImageStack } from "../components/ImageStack";
import { VerticalRule } from "../components/VerticalRule";

interface Props {
  content: {
    attributes: {
      featured_image: string;
      caption?: string;
    };
    html: string;
  };
}

const InfoFeaturedImg = styled.div`
  top: 0;
  position: sticky;
  width: 50%;
  height: 100vh;

  & > img {
    width: 100%;
    height: calc(100% - ${dims.footerHeight}px);
    object-fit: cover;
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

const Info: NextPage<Props> = ({ content }) => {
  const imageUrl = content.attributes.featured_image;

  return (
    <>
      <MobileLogo />
      <MobileFeaturedImg src={imageUrl + "?nf_resize=fit&w=1200"} />

      <VerticalRule />

      <TwoColWrap>
        <TextStack style={{ marginBottom: dims.footerHeight }}>
          <Logo />
          <AboveTextSpacer />
          {parse(content.html)}
        </TextStack>

        <InfoFeaturedImg>
          <img
            style={{ background: colors.green }}
            alt={content.attributes.caption}
            src={content.attributes.featured_image + "?nf_resize=fit&w=1200"}
          />
        </InfoFeaturedImg>
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
