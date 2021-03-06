import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styled, { CSSProperties } from "styled-components";
import { colors } from "./shared";
import { dims } from "./shared";
import { MobileNavBar } from "./MobileNavBar";

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

  @media screen and (max-width: 640px) {
    display: none;
    top: 0px;
    height: 100%;
    padding: ${dims.xPad + 75}px ${dims.xPad}px ${dims.xPad}px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: start;

    & > a {
      margin-bottom: 50px;
    }

    &.mobile-show {
      display: flex;
    }
  }
`;

const StyledLink = styled.a<{ active: boolean }>`
  text-transform: uppercase;
  color: ${({ active }) => (active ? colors.sienna : colors.black)};
`;

export const Footer = ({ className }: { className?: string }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { route } = useRouter();

  return (
    <>
      <MobileNavBar
        handleClick={() => setShowMenu(!showMenu)}
        showMenu={showMenu}
      />
      <StyledFooter
        className={showMenu ? `mobile-show ${className}` : className}
      >
        <Link href="/#about" passHref>
          <StyledLink
            active={route == "/"}
            onClick={() => (route == "/" ? setShowMenu(false) : null)}
          >
            About
          </StyledLink>
        </Link>
        <Link href="/contact" passHref>
          <StyledLink
            active={route == "/contact"}
            onClick={() => (route == "/contact" ? setShowMenu(false) : null)}
          >
            Contact
          </StyledLink>
        </Link>
        <Link href="/projects" passHref>
          <StyledLink
            active={route == "/projects"}
            onClick={() => (route == "/projects" ? setShowMenu(false) : null)}
          >
            Projects
          </StyledLink>
        </Link>
        <Link href="/explore" passHref>
          <StyledLink
            active={route == "/explore"}
            onClick={() => (route == "/explore" ? setShowMenu(false) : null)}
          >
            Explore
          </StyledLink>
        </Link>
      </StyledFooter>
    </>
  );
};
