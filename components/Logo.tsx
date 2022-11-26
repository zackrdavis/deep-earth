import styled, { CSSProperties } from "styled-components";
import Link from "next/link";
import { colors, dims } from "./shared";

const StyledLogo = styled.div`
  position: fixed;
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
    display: block;
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
    <StyledLogo>
      <Link href="/">
        <img
          style={style}
          onClick={onClick}
          src="/img/site/deepearth_sienna.svg"
        />
      </Link>
    </StyledLogo>
  );
};
