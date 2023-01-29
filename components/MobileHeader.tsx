import Link from "next/link";
import styled from "styled-components";
import { dims } from "./shared";

const StyledMobileHeader = styled.div`
  width: 100%;

  // logo
  a > img {
    padding: 10% ${dims.xPad}px;
  }

  // page featured image
  & > img {
    width: 100%;
    height: auto;
  }

  @media screen and (min-width: 641px) {
    display: none;
  }
`;

export const MobileHeader = ({ featuredImage }: { featuredImage: string }) => {
  return (
    <StyledMobileHeader>
      <Link href="/">
        <img src="/img/site/joshua-pavlacky.svg" />
      </Link>

      <img src={"/" + featuredImage} loading="lazy" />
    </StyledMobileHeader>
  );
};
