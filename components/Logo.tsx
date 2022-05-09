import styled, { CSSProperties } from "styled-components";
import Link from "next/link";
import { dims } from "./shared";

const StyledLogo = styled.img`
  position: fixed;
  z-index: 1;
  left: ${dims.xPad}px;
  top: 40px;
  cursor: pointer;
  width: 300px;

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
    <Link href="/">
      <a>
        <StyledLogo
          style={style}
          onClick={onClick}
          src="/img/site/deepearth_sienna.svg"
        />
      </a>
    </Link>
  );
};
