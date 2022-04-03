import { useEffect } from "react";
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
  const handleScroll = (e: Event) => {
    console.log(e);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StyledPlantStack>
      {plants &&
        plants.map((plant) => (
          <PlantButton>
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
