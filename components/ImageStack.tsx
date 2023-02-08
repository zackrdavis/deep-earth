import styled, { css } from "styled-components";
import { BlurUpImg } from "./BlurUpImg";
import { dims } from "./shared";

export const StyledImageStack = styled.div<{ isProject?: boolean }>`
  width: 50%;
  align-self: flex-end;
  position: sticky;
  // Image stacks should always be taller than the available space
  // otherwise this will make the image stick to the bottom with growing space above
  bottom: 0px;

  & > div {
    width: 100%;
    height: auto;
    margin-top: ${dims.xPad}px;
    border-top: 1px solid var(--black);
    border-bottom: 1px solid var(--black);

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: ${dims.footerHeight - 1}px;
    }
  }

  @media screen and (max-width: 640px) {
    width: auto;
    position: relative;

    & > div {
      width: 100vw;
      height: 75vw;
    }

    ${({ isProject }) =>
      isProject
        ? css`
            margin-bottom: ${dims.footerHeight}px;

            & > div:first-child {
              display: none;
            }

            & > div:nth-child(2) {
              margin-top: 0;
            }
          `
        : ""}
  }
`;

export const ImageStack = ({
  images,
  lazyLoad,
  projectTitle,
}: {
  images: { image: string; caption?: string }[];
  lazyLoad?: boolean;
  projectTitle?: string;
}) => (
  <StyledImageStack isProject={projectTitle !== undefined}>
    {images?.map((image, i) => (
      <BlurUpImg
        key={i}
        alt={
          image.caption ||
          // fallback to project title as alt text
          `Documentation of ${projectTitle} project`
        }
        src={`/${image.image}`}
        lgQuery={"?nf_resize=fit&w=1200"}
        lazy={lazyLoad}
      />
    ))}
  </StyledImageStack>
);
