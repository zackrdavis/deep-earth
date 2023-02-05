import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { colors, HiddenSpan } from "./shared";
import { dims } from "./shared";
import { MobileNavBar } from "./MobileNavBar";

const StyledFooter = styled.div`
  border-top: 1px solid ${colors.black};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${dims.footerHeight}px;
  padding: 0 ${dims.xPad}px;
  background: ${colors.tan};
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
      border-bottom: 1px solid ${colors.black};
    }

    &.mobile-show {
      display: flex;
    }
  }
`;

const StyledLink = styled(Link)`
  text-transform: uppercase;
  color: ${colors.black};

  &.active,
  &:hover {
    color: ${colors.sienna};
  }
`;

const MobileContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${colors.black};
  gap: 5px;
  /* font-size: 18px; */

  & > div {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  img {
    height: 24px;
  }

  @media screen and (max-width: 640px) {
    flex-grow: 1;
    gap: 20px;
    font-size: inherit;

    img {
      height: 30px;
    }
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
          href="/projects"
          className={isProjects ? "active" : ""}
          onClick={() => (route == "/projects" ? setShowMenu(false) : null)}
        >
          Projects
        </StyledLink>

        <StyledLink
          href="/explore"
          className={isExplore ? "active" : ""}
          onClick={() => (route == "/explore" ? setShowMenu(false) : null)}
        >
          Explore
        </StyledLink>

        <StyledLink
          href="/info"
          className={isInfo ? "active" : ""}
          onClick={() => (route == "/info" ? setShowMenu(false) : null)}
        >
          Info
        </StyledLink>
        <MobileContactInfo>
          <div>info@joshuapavlacky.com</div>
          <div>
            971-204-8921{" "}
            <Link href="https://g.page/r/CdFkqIYiubztEBM/">
              <HiddenSpan>Google Business</HiddenSpan>
              <img src="/site_images/pin.svg" />
            </Link>
            <Link href="https://www.instagram.com/jpavlacky/">
              <HiddenSpan>Instagram</HiddenSpan>
              <img src="/site_images/instagram.svg" />
            </Link>
            <Link href="https://www.facebook.com/josh.michael.pavlacky/">
              <HiddenSpan>Facebook</HiddenSpan>
              <img src="/site_images/facebook.svg" />
            </Link>
          </div>
        </MobileContactInfo>
      </StyledFooter>
    </>
  );
};
