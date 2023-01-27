import styled from "styled-components";
import { dims, colors } from "./shared";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const StyledImageStack = styled.div`
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
  }
`;

export const ImageStack = ({
  images,
  lazyLoad,
}: {
  images: { image: string }[];
  lazyLoad?: boolean;
}) => (
  <StyledImageStack>
    {images?.map((image, i) => (
      <img
        key={i}
        src={`/${image.image}`}
        style={{ width: "100%" }}
        loading={lazyLoad ? "lazy" : "eager"}
      />
    ))}
  </StyledImageStack>
);
