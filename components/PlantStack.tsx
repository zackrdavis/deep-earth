import { useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import { Plant } from "../pages/explore";
import styled from "styled-components";
import { dims } from "./shared";
import Head from "next/head";

const PlantButton = styled.div`
  flex: 0 1 80px;
  min-height: 0px;
  position: relative;
  cursor: pointer;

  a {
    display: block;
    width: 100%;
    height: 100%;

    /* plant image as background */
    div {
      transition: all 0.25s;
      width: 40px;
      height: 80px;
      border-top-left-radius: 666px;
      border-bottom-left-radius: 666px;
      background-size: cover;
      background-position: left;

      /* Align image to bottom of links when vertically squished. */
      /* Otherwise lastPlantButton pops out from behind project name footer. */
      position: relative;
      top: 100%;
      transform: translateY(-100%);

      &:hover {
        z-index: 999;
        width: 80px;
        border-radius: 666px;
      }
    }
  }

  @media screen and (max-width: 640px) {
    transform: scalex(-1);

    &:hover div {
      left: -40px;
    }
  }
`;

const StyledPlantStack = styled(animated.div)`
  position: fixed;
  margin-top: calc((100vh - 160px) / 2);
  transform: translateY(-50%);
  left: calc(50% - 40px);
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 640px) {
    left: -40px;
  }
`;

export const PlantStack = ({ plants }: { plants: Plant[] }) => {
  const lastScrollPos = useRef(0);
  const relaxedHeight = useRef(plants.length * 80 + (plants.length - 1) * 10);

  let isScrolling: NodeJS.Timeout;

  const [springStyles, api] = useSpring(() => ({
    top: 0,
    height: relaxedHeight.current,
    config: { frequency: 0.5, damping: 0.3 },
  }));

  useEffect(() => {
    handleResize();
    lastScrollPos.current = window.scrollY;

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    // ideal height for PlantStack
    const unConstrainedHeight = plants.length * 80 + (plants.length - 1) * 10;
    // max height allowed by window size
    const maxHeight = window.innerHeight - dims.footerHeight * 2;

    relaxedHeight.current = Math.min(unConstrainedHeight, maxHeight);

    api.start({
      top: 0,
      height: relaxedHeight.current,
    });
  };

  const handleScroll = () => {
    // Clear the timeout throughout the scroll
    clearTimeout(isScrolling);
    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(handleScrollEnd, 50);

    // determine the scrolling speed
    const speed = window.scrollY - lastScrollPos.current;
    const clampedSpeed = Math.min(Math.max(speed, -100), 100);
    lastScrollPos.current = window.scrollY;

    // stretch the springs according to the speed
    api.start({
      top: -clampedSpeed * 4,
      height: relaxedHeight.current + Math.abs(clampedSpeed * 3),
    });
  };

  const handleScrollEnd = () => {
    // return to start position
    api.start({
      top: 0,
      height: relaxedHeight.current,
    });
  };

  return (
    <StyledPlantStack
      style={{ height: springStyles.height, top: springStyles.top }}
    >
      {plants &&
        plants.map((plant, i) => (
          <>
            <Head>
              <link rel="preload" href={plant.attributes.image} as="image" />
            </Head>
            <PlantButton className="plantButton" key={i}>
              <animated.a href={`/explore?plant=${plant.slug}`}>
                <animated.div
                  style={{
                    backgroundImage: `url(/${plant.attributes.image})`,
                  }}
                />
              </animated.a>
            </PlantButton>
          </>
        ))}
    </StyledPlantStack>
  );
};
