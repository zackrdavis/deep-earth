import type { NextPage, GetStaticProps } from "next";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Footer } from "../components/Footer";
import { Logo } from "../components/Logo";
import { ImageStack } from "../components/ImageStack";
import {
  colors,
  AboveTextSpacer,
  TextStack,
  TwoColWrap,
  dims,
} from "../components/shared";
import parse from "html-react-parser";
import { VerticalRule } from "../components/VerticalRule";

interface HomeProps {
  content: {
    attributes: {
      landing_image: string;
      images: { image: string }[];
    };
    html: string;
  };
}

const SplashContainer = styled.div`
  width: 100%;
  height: 100vh;
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
  padding: 0 ${dims.xPad}px;
  max-width: 100vw;
  position: absolute;
  z-index: 1;
`;

const StyledFooter = styled(Footer)`
  transition: 1s;

  &.unTouched {
    transition: 0s;
    border-top: none;
    background: transparent;

    a {
      color: white !important;
    }
  }
`;

const Home: NextPage<HomeProps> = ({ content }) => {
  const { attributes } = content;
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    window.addEventListener("click", () => setTouched(true));
    window.addEventListener("scroll", () => setTouched(true));
    return () => {
      window.removeEventListener("click", () => setTouched(true));
      window.removeEventListener("scroll", () => setTouched(true));
    };
  }, [touched]);

  return (
    <>
      <VerticalRule />

      <SplashContainer>
        <StyledLandingImage src={attributes.landing_image} />
        <BigLogo src="/img/site/joshua-pavlacky-light.svg" />
      </SplashContainer>

      <TwoColWrap id="about">
        <TextStack>
          <Logo onClick={() => setTimeout(() => setTouched(false))} />
          <AboveTextSpacer />
          {parse(content.html)}
        </TextStack>

        <ImageStack images={content.attributes.images} lazyLoad />
      </TwoColWrap>

      <StyledFooter className={!touched ? "unTouched" : ""} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = await import(`../content/pages/${"home"}.md`);
  return { props: { content: content.default } };
};

export default Home;
