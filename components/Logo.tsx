import styled from "styled-components";
import Link from "next/link";
import { dims } from "./shared";

const StyledLogo = styled.img`
  position: fixed;
  z-index: 1;
  left: ${dims.xPad}px;
  top: 40px;
  cursor: pointer;
  width: 300px;
`;

export const Logo = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Link href="/">
      <a>
        <StyledLogo onClick={onClick} src="/img/deepearth_sienna.svg" />
      </a>
    </Link>
  );
};
