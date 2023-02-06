import type { NextPage, GetStaticProps } from "next";
import styled from "styled-components";
import { Footer } from "../components/Footer";
import { Logo } from "../components/Logo";
import { ImageStack } from "../components/ImageStack";
import { colors, TextStack, TwoColWrap, dims } from "../components/shared";
import parse from "html-react-parser";
import { VerticalRule } from "../components/VerticalRule";
import Head from "next/head";

interface HomeProps {
  content: {
    attributes: {
      landing_image: string;
      caption?: string;
      images: { image: string; caption?: string }[];
      meta?: string;
    };
    html: string;
  };
}

const SplashContainer = styled.div`
  width: 100%;
  height: calc(100vh - ${dims.footerHeight}px);
  left: 0;
  top: 0%;
  position: relative;
  z-index: 1;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: ${colors.tan};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0 0 ${colors.black};

  @media screen and (max-width: 640px) {
    height: auto;
  }
`;

const StyledLandingImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  @media screen and (max-width: 640px) {
    height: auto;
  }
`;

const BigLogo = styled.img`
  width: 800px;
  padding: 0 var(--xPad);
  max-width: 100vw;
  position: absolute;
  z-index: 1;
`;

const Home: NextPage<HomeProps> = ({ content }) => {
  const { attributes } = content;

  return (
    <>
      <Head>
        <title>Joshua Pavlacky Landscape Design</title>
        <meta name="description" content={attributes.meta || ""} />
      </Head>

      <VerticalRule />

      <SplashContainer>
        <StyledLandingImage
          alt={attributes.caption}
          src={attributes.landing_image + "?nf_resize=fit&w=2000"}
        />
        <BigLogo src="/site_images/joshua-pavlacky-light.svg" />
      </SplashContainer>

      <TwoColWrap id="home">
        <TextStack>
          <Logo />
          {parse(content.html)}
        </TextStack>

        <ImageStack images={content.attributes.images} lazyLoad />
      </TwoColWrap>

      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = await import(`../content/pages/${"home"}.md`);
  return { props: { content: content.default } };
};

export default Home;
