import type { NextPage, GetStaticProps } from "next";
import { useState, useEffect } from "react";
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
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0%;
  opacity: 1;
  transition: all 1s;
  cursor: pointer;

  &.touched {
    opacity: 0;
  }
`;

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
        className={touched ? "touched" : ""}
        src={attributes.landing_image}
      />
      <Footer />
      {attributes.sections.map((section) => (
        <div>
          {section.text}
          <img src={section.image} />
        </div>
      ))}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = await import(`../content/pages/${"home"}.md`);
  return { props: { content: content.default } };
};

export default Home;
