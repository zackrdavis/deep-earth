import type { NextPage, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Footer } from "../components/Footer";
import { Logo } from "../components/Logo";
import { dims } from "../components/shared";

type HomeSection = {
  text: string;
  image: string;
};

interface HomeProps {
  content: {
    attributes: {
      landing_image: string;
      sections: HomeSection[];
    };
  };
}

const StyledLandingImage = styled.img`
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0%;
  transition: all 1s;
  position: relative;
  z-index: 1;
`;

const StyledFooter = styled(Footer)`
  transition: 1s;
  z-index: 2;

  &.unTouched {
    transition: 0s;
    border-top: none;
    background: transparent;

    a {
      color: white !important;
    }
  }
`;

const StyledHomeSection = styled.div`
  padding: 0 ${dims.xPad}px;
  margin-top: ${dims.xPad}px;
  margin-bottom: ${dims.footerHeight + dims.xPad}px;
  position: relative;

  &:not(:last-child) {
    margin-bottom: 500px;
  }

  // project text
  & > div {
    width: 50%;
    position: sticky;
  }

  // project image
  & > img {
    position: absolute;
    width: calc(50% - ${dims.xPad * 2}px);
    left: calc(50% + ${dims.xPad}px);
    top: 0;
  }
`;

const HomeSection = ({ imgUrl, text }: { imgUrl: string; text: string }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const [textHeight, setTextHeight] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setTextHeight(textRef.current?.getBoundingClientRect().height || 0);
      setImgHeight(imgRef.current?.getBoundingClientRect().height || 0);
    }, 50);
  }, []);

  return (
    <StyledHomeSection style={{ height: imgHeight }}>
      <div
        ref={textRef}
        style={{
          top: `calc(100vh - ${textHeight + 80 + 50}px)`,
        }}
      >
        {text}
      </div>
      <img ref={imgRef} src={imgUrl} />
    </StyledHomeSection>
  );
};

const Home: NextPage<HomeProps> = ({ content }) => {
  const { attributes } = content;

  const [touched, setTouched] = useState(false);

  useEffect(() => {
    window.addEventListener("click", () => setTouched(true));
    window.addEventListener("mousewheel", () => setTouched(true));
    console.log(touched);
    return () => {
      window.removeEventListener("click", () => setTouched(true));
      window.removeEventListener("mousewheel", () => setTouched(true));
    };
  }, [touched]);

  return (
    <>
      <Logo onClick={() => setTimeout(() => setTouched(false))} />
      <StyledLandingImage
        className={!touched ? "unTouched" : ""}
        src={attributes.landing_image}
      />
      <StyledFooter className={!touched ? "unTouched" : ""} />
      <div id="about" />
      {attributes.sections.map((section, i) => (
        <HomeSection key={i} text={section.text} imgUrl={section.image} />
      ))}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = await import(`../content/pages/${"home"}.md`);
  return { props: { content: content.default } };
};

export default Home;
