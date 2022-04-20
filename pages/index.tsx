import type { NextPage, GetStaticProps } from "next";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Footer } from "../components/Footer";
import { Logo } from "../components/Logo";
import { colors, dims } from "../components/shared";
import parse from "html-react-parser";
import { VerticalRule } from "../components/VerticalRule";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface HomeProps {
  content: {
    attributes: {
      landing_image: string;
      images: { image: string }[];
    };
    html: string;
  };
}

const StyledLandingImage = styled.div`
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

  span {
    position: absolute;

    width: 100%;
    height: 100%;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
`;

const Splash = styled.img``;

const BigLogo = styled.img`
  width: 590px;
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

const ProjectContent = styled.div`
  display: flex;
`;

const ProjectText = styled.div`
  width: 50%;
  padding: calc((100vh - ${dims.footerHeight * 2}px) / 1.1) ${dims.xPad}px
    ${dims.footerHeight + dims.xPad}px;

  p:first-child {
    margin-top: 0;
  }
`;

const ProjectImages = styled.div`
  width: 50%;
  padding: ${dims.xPad}px ${dims.xPad}px ${dims.footerHeight + dims.xPad}px;

  & > img {
    width: 100%;

    &:not(:last-child) {
      margin-bottom: ${dims.xPad}px;
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

      <Logo onClick={() => setTimeout(() => setTouched(false))} />

      <StyledLandingImage
        className={!touched ? "unTouched" : ""}
        //style={{ backgroundImage: `url(${attributes.landing_image})` }}
      >
        <LazyLoadImage src={attributes.landing_image} effect="opacity" />
        <BigLogo src="/img/site/deepearth_tan.svg" />
      </StyledLandingImage>

      <ProjectContent id="about">
        <ProjectText>{parse(content.html)}</ProjectText>
        <ProjectImages>
          {content.attributes.images &&
            content.attributes.images.map((image, i) => (
              <LazyLoadImage
                threshold={0}
                key={i}
                src={`/${image.image}`}
                style={{ width: "100%", minHeight: 200 }}
              />
            ))}
        </ProjectImages>
      </ProjectContent>

      <StyledFooter className={!touched ? "unTouched" : ""} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = await import(`../content/pages/${"home"}.md`);
  return { props: { content: content.default } };
};

export default Home;
