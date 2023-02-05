import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSpring, animated, useSprings, useTrail } from "react-spring";
import { Plant } from "../pages/explore";
import styled from "styled-components";
import { colors, dims, HiddenSpan } from "./shared";

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
    img {
      transition: all 0.25s;
      width: 40px;
      height: 80px;
      border-top-left-radius: 666px;
      border-bottom-left-radius: 666px;
      box-shadow: 0 0 0 1px ${colors.black};
      object-fit: cover;

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
    display: none;
  }
`;

export const PlantStack = ({ plants }: { plants: Plant[] }) => {
  const lastScrollPos = useRef(0);
  const relaxedHeight = useRef(plants.length * 80 + (plants.length - 1) * 10);
  const [isMobile, setIsMobile] = useState(false);

  let isScrolling: NodeJS.Timeout;

  const [springStyles, api] = useSpring(() => ({
    top: 0,
    height: relaxedHeight.current,
    config: { frequency: 0.5, damping: 0.3 },
  }));

  const [multiSpringStyles, multiApi] = useTrail(plants.length, (i) => ({
    top: 0,
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
    setIsMobile(window.innerWidth < 641);

    // ideal height for PlantStack
    const unConstrainedHeight = plants.length * 80 + (plants.length - 1) * 10;
    // max height allowed by window size
    const maxHeight = window.innerHeight - 40 - dims.footerHeight * 2;

    relaxedHeight.current = Math.min(unConstrainedHeight, maxHeight);

    api.start({
      top: 0,
      height: relaxedHeight.current,
    });

    multiApi.start({
      top: 0,
    });
  };

  const handleScroll = () => {
    // block all if mobile
    if (isMobile) return false;

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

    multiApi.start({
      top: -clampedSpeed * 4,
    });
  };

  const handleScrollEnd = () => {
    // return to start position
    api.start({
      top: 0,
      height: relaxedHeight.current,
    });

    multiApi.start({
      top: 0,
    });
  };

  return !isMobile ? (
    <StyledPlantStack
      style={{ height: springStyles.height, top: springStyles.top }}
    >
      {plants &&
        plants.map((plant, i) => (
          <React.Fragment key={i}>
            <PlantButton className="plantButton" key={i}>
              <a href={`/explore?plant=${plant.slug}`}>
                <HiddenSpan>{plant.attributes.title}</HiddenSpan>
                <img
                  style={{ background: colors.green }}
                  alt={plant.attributes.title}
                  src={
                    "/" + plant.attributes.image + "?nf_resize=fit&w=180&h=180"
                  }
                />
              </a>
            </PlantButton>
          </React.Fragment>
        ))}
    </StyledPlantStack>
  ) : (
    <StyledPlantStackMobile>
      {plants &&
        multiSpringStyles.map((springStyle, i) => {
          const plant = plants[i];
          return (
            <animated.div
              key={i}
              style={{
                top: springStyle.top,
              }}
            >
              <Link href={`/explore?plant=${plant.slug}`}>
                <img
                  style={{ background: colors.green }}
                  alt={plant.attributes.title}
                  src={
                    "/" + plant.attributes.image + "?nf_resize=fit&w=180&h=180"
                  }
                  loading="lazy"
                />
              </Link>
            </animated.div>
          );
        })}
    </StyledPlantStackMobile>
  );
};

const StyledPlantStackMobile = styled.div`
  bottom: 180px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  padding: 0 var(--xPad) var(--xPad);
  z-index: 1;

  div {
    aspect-ratio: 1;
    position: relative;
  }

  img {
    width: 90%;
    height: 90%;
    border-radius: 666px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
    box-shadow: 0 0 0 1px ${colors.black};
  }

  @media screen and (min-width: 641px) {
    display: none;
  }
`;
