import styled, { CSSProperties } from "styled-components";
import Link from "next/link";
import { colors, dims } from "./shared";

const StyledLogo = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: ${colors.tan};
  z-index: 1;
  padding: 40px ${dims.xPad}px 15px;
  cursor: pointer;
  width: 50%;
  //border-bottom: 1px solid ${colors.black};

  @media screen and (max-width: 640px) {
    display: none;
  }

  img {
    width: 300px;
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
        <img onClick={onClick} src="/img/site/deepearth_sienna.svg" />
      </Link>
    </StyledLogo>
  );
};
