import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { HiddenSpan } from "./shared";
import { dims } from "./shared";
import { MobileNavBar } from "./MobileNavBar";

const StyledFooter = styled.div`
  border-top: 1px solid var(--black);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${dims.footerHeight}px;
  padding: 0 ${dims.xPad}px;
  background: var(--tan);
  z-index: 2;

  @media screen and (max-width: 640px) {
    display: none;
    top: 0;
    height: calc(100% - ${dims.xPad - 1}px);
    padding: 0;
    flex-direction: column;
    justify-content: start;

    & > a {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
      width: 100%;
      border-bottom: 1px solid var(--black);
    }

    &.mobile-show {
      display: flex;
    }
  }
`;

const StyledLink = styled(Link)`
  text-transform: uppercase;
  color: var(--black);

  &.active,
  &:hover {
    color: var(--sienna);
  }
`;

const MobileContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    height: 25px;
  }

  @media screen and (max-width: 640px) {
    flex-grow: 1;
    font-size: inherit;
  }
`;

export const Footer = ({ className }: { className?: string }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { route } = useRouter();

  const isAbout = route == "/" || false;

  const isInfo = route == "/info" || false;

  const isProjects = route == "/projects" || false;

  const isExplore = route == "/explore" || false;

  return (
    <>
      <MobileNavBar
        handleClick={() => setShowMenu(!showMenu)}
        showMenu={showMenu}
      />
      <StyledFooter
        className={showMenu ? `mobile-show ${className}` : className}
      >
        <StyledLink
          className={isAbout ? "active" : ""}
          href="/#home"
          onClick={() => (route == "/" ? setShowMenu(false) : null)}
        >
          Home
        </StyledLink>

        <StyledLink
          prefetch
          href="/projects"
          className={isProjects ? "active" : ""}
          onClick={() => (route == "/projects" ? setShowMenu(false) : null)}
        >
          Projects
        </StyledLink>

        <StyledLink
          prefetch
          href="/info"
          className={isInfo ? "active" : ""}
          onClick={() => (route == "/info" ? setShowMenu(false) : null)}
        >
          Info
        </StyledLink>

        <StyledLink
          prefetch
          href="/explore"
          className={isExplore ? "active" : ""}
          onClick={() => (route == "/explore" ? setShowMenu(false) : null)}
        >
          Explore
        </StyledLink>

        <MobileContactInfo>
          <Link href="https://www.instagram.com/jpavlacky/">
            <HiddenSpan>Instagram</HiddenSpan>
            <img src="/site_images/instagram.svg" alt="Instagram icon" />
          </Link>
          <Link href="https://g.page/r/CdFkqIYiubztEBM/">
            <HiddenSpan>Google Business</HiddenSpan>
            <img src="/site_images/google.svg" alt="Google icon" />
          </Link>
          <Link href="https://www.facebook.com/josh.michael.pavlacky/">
            <HiddenSpan>Facebook</HiddenSpan>
            <img src="/site_images/facebook.svg" alt="Facebook icon" />
          </Link>
        </MobileContactInfo>
      </StyledFooter>
    </>
  );
};
