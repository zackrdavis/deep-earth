import { useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import { Plant } from "../pages/explore";
import styled from "styled-components";
import { dims } from "./shared";
import Link from "next/link";

const PlantButton = styled.div`
  flex: 0 1 auto;
  min-height: 0px;
  position: relative;
  cursor: pointer;

  a {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    top: -10px;
  }

  div {
    left: 0;
    transition: all 0.25s;
    width: 40px;
    height: 80px;
    border-top-left-radius: 666px;
    border-bottom-left-radius: 666px;
    background-size: cover;
    background-position: left;
    position: relative;
    top: calc(50%);
    transform: translateY(-50%);
    margin-top: 10px;
    margin-bottom: 10px;
  }

  &:hover {
    div {
      z-index: 9;
      width: 80px;
      border-radius: 666px;
    }
  }

  @media screen and (max-width: 640px) {
    transform: scalex(-1);

    &:hover div {
      left: -40px;
    }
  }
`;

const StyledPlantStack = styled.div`
  position: fixed;
  top: 0;
  left: calc(50% - 40px);
  z-index: 2;
  display: flex;
  height: 100%;
  width: 80px;
  flex-direction: column;
  justify-content: center;
  padding-top: ${dims.xPad + 40}px;
  padding-bottom: ${dims.footerHeight * 2 + dims.xPad + 40}px;

  @media screen and (max-width: 640px) {
    left: -40px;
  }
`;

export const PlantStack = ({ plants }: { plants: Plant[] }) => {
  const stackRef = useRef<HTMLDivElement>(null);
  const lastScrollPos = useRef(0);

  let isScrolling: NodeJS.Timeout;

  const [styles, api] = useSpring(() => ({
    top: 0,
    marginTop: 10,
    config: { frequency: 0.5, damping: 0.3 },
  }));

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = (e: Event) => {
    // Clear the timeout throughout the scroll
    clearTimeout(isScrolling);
    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(handleScrollEnd, 50);

    // determine the scrolling speed
    const speed = window.scrollY - lastScrollPos.current;
    lastScrollPos.current = window.scrollY;

    // stretch the springs according to the speed
    api.start({
      top: -speed * 3,
      marginTop: 10 + Math.abs(speed),
    });
  };

  const handleScrollEnd = () => {
    // return to start position
    api.start({
      top: 0,
      marginTop: 10,
    });
  };

  return (
    <StyledPlantStack ref={stackRef}>
      {plants &&
        plants.map((plant, i) => (
          <PlantButton className="plantButton" key={i}>
            <Link href={`/explore?plant=${plant.slug}`}>
              <animated.a style={{ top: styles.top }}>
                <animated.div
                  style={{
                    backgroundImage: `url(/${plant.attributes.image})`,
                    marginTop: styles.marginTop,
                    marginBottom: styles.marginTop,
                  }}
                />
              </animated.a>
            </Link>
          </PlantButton>
        ))}
    </StyledPlantStack>
  );
};
