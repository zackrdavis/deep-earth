import styled, { css } from "styled-components";
import { dims, colors } from "./shared";

export const StyledImageStack = styled.div<{ isProject?: boolean }>`
  width: 50%;
  align-self: flex-end;
  position: sticky;
  // Image stacks should always be taller than the available space
  // otherwise this will make the image stick to the bottom with growing space above
  bottom: 0px;

  & > img {
    width: 100%;
    height: auto;
    margin-top: ${dims.xPad}px;
    border-top: 1px solid ${colors.black};
    border-bottom: 1px solid ${colors.black};

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

    ${({ isProject }) =>
      isProject
        ? css`
            margin-bottom: ${dims.footerHeight}px;

            img:first-child {
              display: none;
            }

            img:nth-child(2) {
              margin-top: 0;
            }
          `
        : ""}
  }
`;

export const ImageStack = ({
  images,
  lazyLoad,
  isProject,
}: {
  images: { image: string }[];
  lazyLoad?: boolean;
  isProject?: boolean;
}) => (
  <StyledImageStack isProject={isProject}>
    {images?.map((image, i) => (
      <img
        key={i}
        src={`/${image.image}?nf_resize=fit&w=1200`}
        loading={lazyLoad ? "lazy" : "eager"}
      />
    ))}
  </StyledImageStack>
);
