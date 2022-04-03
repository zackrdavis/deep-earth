import { useEffect, useState, useRef } from "react";
import { Plant } from "../pages/explore";
import styled from "styled-components";
import { dims } from "./shared";
import Link from "next/link";

const PlantButton = styled.div`
  flex: 0 1 auto;
  min-height: 0px;
  position: relative;

  a {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    top: -10px;
  }

  &:hover {
    div {
      z-index: 9;
      width: 80px;
      border-radius: 666px;
    }
  }

  div {
    width: 40px;
    height: 80px;
    border-top-left-radius: 666px;
    border-bottom-left-radius: 666px;
    background-size: cover;
    background-position: left;
    position: relative;
    top: calc(50%);
    transform: translateY(-50%);
    margin: 10px 0;
  }
`;

const StyledPlantStack = styled.div`
  transition-duration: 100ms;
  position: fixed;
  top: 0;
  left: calc(50% - 40px);
  z-index: 9;
  display: flex;
  height: 100%;
  width: 80px;
  flex-direction: column;
  justify-content: center;
  padding-top: ${dims.xPad + 40}px;
  padding-bottom: ${dims.footerHeight * 2 + dims.xPad + 40}px;
`;

export const PlantStack = ({ plants }: { plants: Plant[] }) => {
  const stackRef = useRef<HTMLDivElement>(null);
  const startScroll = useRef(0);
  const scrollDist = useRef(0);

  const lastScrollPos = useRef(0);
  const speedRef = useRef(0);
  let isScrolling: NodeJS.Timeout;

  useEffect(() => {
    handleScrollEnd();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = (e: Event) => {
    // console.log(
    //   "acceleration:",
    //   window.scrollY - lastScrollPos.current - speedRef.current
    // );
    speedRef.current = window.scrollY - lastScrollPos.current;
    lastScrollPos.current = window.scrollY;

    // Clear the timeout throughout the scroll
    clearTimeout(isScrolling);
    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(handleScrollEnd, 100);
    // set the distance scrolled since last scrollStop
    scrollDist.current = window.scrollY - startScroll.current;

    if (stackRef.current) {
      stackRef.current.style.top = `${
        (window.scrollY - lastScrollPos.current - speedRef.current) * 5
      }px`;
    }
  };

  const handleScrollEnd = () => {
    // console.log(
    //   "acceleration:",
    //   window.scrollY - lastScrollPos.current - speedRef.current
    // );
    if (stackRef.current) {
      stackRef.current.style.top = `${
        (window.scrollY - lastScrollPos.current - speedRef.current) * 5
      }px`;
    }
    // reset scrollDist
    scrollDist.current = 0;
    // set new scroll baseline
    startScroll.current = window.scrollY;
  };

  return (
    <StyledPlantStack ref={stackRef}>
      {plants &&
        plants.map((plant, i) => (
          <PlantButton className="plantButton" key={i}>
            <Link href={`/explore?plant=${plant.slug}`}>
              <a>
                <div
                  style={{
                    backgroundImage: `url(/${plant.attributes.image})`,
                  }}
                />
              </a>
            </Link>
          </PlantButton>
        ))}
    </StyledPlantStack>
  );
};
