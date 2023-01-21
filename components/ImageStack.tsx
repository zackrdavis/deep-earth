import styled from "styled-components";
import { dims, colors } from "./shared";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const StyledImageStack = styled.div`
  width: 50%;
  align-self: flex-end;
  position: sticky;
  // we can pretty safely say that image stacks will always be taller than the available space
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
    width: 100%;
    padding: 75px 0 ${dims.xPad}px;
    padding-bottom: 0;
  }
`;

export const ImageStack = ({ images }: { images: { image: string }[] }) => (
  <StyledImageStack>
    {images?.map((image, i) => (
      <LazyLoadImage
        threshold={0}
        key={i}
        src={`/${image.image}`}
        style={{ width: "100%", minHeight: 200 }}
      />
    ))}
  </StyledImageStack>
);
