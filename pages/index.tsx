import type { NextPage, GetStaticProps } from "next";
import { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Footer } from "../components/Footer";

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
`;

const StyledFooter = styled(Footer)`
  transition: all 1s;

  &.unTouched {
    border-top: none;
    background: transparent;

    a {
      color: white !important;
    }
  }
`;

const StyledHomeSection = styled.div`
  padding: 0 100px;
  margin-top: 100px;
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
    width: calc(50% - 116px);
    left: calc(50% + 58px);
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
          top: `calc(100vh - ${textHeight + 100}px)`,
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
    return () => {
      window.removeEventListener("click", () => setTouched(true));
      window.removeEventListener("mousewheel", () => setTouched(true));
    };
  }, []);

  return (
    <>
      <StyledLandingImage
        className={!touched ? "unTouched" : ""}
        src={attributes.landing_image}
      />

      {attributes.sections.map((section) => (
        <HomeSection text={section.text} imgUrl={section.image} />
      ))}

      <StyledFooter className={!touched ? "unTouched" : ""} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = await import(`../content/pages/${"home"}.md`);
  return { props: { content: content.default } };
};

export default Home;
