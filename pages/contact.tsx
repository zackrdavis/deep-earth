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
    };
    html: string;
  };
}

const ContactFeaturedImg = styled.div`
  width: 50%;
  position: sticky;

  & > img {
    width: 100%;
    height: auto;
    border-bottom: 1px solid ${colors.black};
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

const Contact: NextPage<Props> = ({ content }) => {
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

        <ContactFeaturedImg>
          <img src={imageUrl + "?nf_resize=fit&w=1200"} />
        </ContactFeaturedImg>
      </TwoColWrap>

      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = await import(`../content/pages/${"contact"}.md`);
  return { props: { content: content.default } };
};

export default Contact;
