import styled, { CSSProperties } from "styled-components";
import Link from "next/link";
import { colors, dims } from "./shared";

const StyledLogo = styled.div`
  padding: 0 0 15px;
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
        <img onClick={onClick} src="/img/site/joshua-pavlacky.svg" />
      </Link>
    </StyledLogo>
  );
};
