import type { NextPage, GetStaticProps } from "next";
import styled from "styled-components";
import { Footer } from "../components/Footer";
import { Logo } from "../components/Logo";
import { ImageStack } from "../components/ImageStack";
import { TextStack, TwoColWrap, dims } from "../components/shared";
import parse from "html-react-parser";
import { VerticalRule } from "../components/VerticalRule";
import { BlurUpImg } from "../components/BlurUpImg";
import { HeadTags } from "../components/HeadTags";

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
  background-color: var(--tan);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0 0 var(--black);

  @media screen and (max-width: 640px) {
    height: auto;
  }
`;

const StyledLandingImage = styled(BlurUpImg)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: var(--green);

  @media screen and (max-width: 640px) {
    height: 66vw;
  }
`;

const BigLogo = styled.img`
  width: 800px;
  padding: 0 var(--xPad);
  max-width: 100vw;
  position: absolute;
  z-index: 1;
  filter: drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.5));
`;

const Home: NextPage<HomeProps> = ({ content }) => {
  const { attributes } = content;

  return (
    <>
      <HeadTags
        desc={attributes.meta}
        image={attributes.landing_image}
        imageAlt={
          attributes.caption || "A rock garden in the woods with a slate path"
        }
      />

      <VerticalRule />

      <SplashContainer>
        <StyledLandingImage
          alt={
            attributes.caption || "A rock garden in the woods with a slate path"
          }
          src={attributes.landing_image}
          lgQuery="?nf_resize=fit&w=2000"
        />
        <BigLogo
          src="/site_images/joshua-pavlacky-light.svg"
          alt="Joshua Pavlacky Logo"
        />
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
