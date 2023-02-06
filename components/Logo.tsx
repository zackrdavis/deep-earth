import styled, { CSSProperties } from "styled-components";
import Link from "next/link";

const StyledLogo = styled.div`
  padding: 0 0 100px;
  cursor: pointer;

  img {
    max-width: 100%;
    width: 350px;
  }

  @media screen and (max-width: 640px) {
    display: none;
  }
`;

export const Logo = ({
  onClick,
  style,
}: {
  onClick?: () => void;
  style?: CSSProperties;
}) => {
  return (
    <StyledLogo style={style}>
      <Link href="/">
        <img
          onClick={onClick}
          src="/site_images/joshua-pavlacky.svg"
          alt="Joshua Pavlacky Logo"
        />
      </Link>
    </StyledLogo>
  );
};
