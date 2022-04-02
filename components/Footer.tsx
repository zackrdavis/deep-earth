import Link from "next/link";
import { useRouter } from "next/router";
import styled, { CSSProperties } from "styled-components";
import { colors } from "./shared";
import { dims } from "./shared";

const StyledFooter = styled.div`
  border-top: 1px solid ${colors.black};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: ${dims.footerHeight}px;
  padding: 0 ${dims.xPad}px;
  background: ${colors.tan};
  z-index: 2;
`;

const StyledLink = styled.a<{ active: boolean }>`
  text-transform: uppercase;
  color: ${({ active }) => (active ? colors.sienna : colors.black)};
`;

export const Footer = ({ className }: { className?: string }) => {
  const { route } = useRouter();

  return (
    <StyledFooter className={className}>
      <Link href="/#about" passHref>
        <StyledLink active={route == "/"}>About</StyledLink>
      </Link>
      <Link href="/contact" passHref>
        <StyledLink active={route == "/contact"}>Contact</StyledLink>
      </Link>
      <Link href="/projects" passHref>
        <StyledLink active={route == "/projects"}>Projects</StyledLink>
      </Link>
      <Link href="/explore" passHref>
        <StyledLink active={route == "/explore"}>Explore</StyledLink>
      </Link>
    </StyledFooter>
  );
};
