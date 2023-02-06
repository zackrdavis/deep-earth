import Link from "next/link";
import styled, { css } from "styled-components";

export const colors = {
  black: "#4b4b4b",
  tan: "#E6E6DA",
  sienna: "#A86654",
  green: "#698165",
};

export const dims = {
  xPad: 80,
  footerHeight: 80,
  logoPad: 50,
  betweenLogoAndGrid: 80,
};

export const sluggify = (string: string) => {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

export const ContentWrap = styled.div`
  padding: ${dims.xPad}px ${dims.xPad}px ${dims.footerHeight + dims.xPad}px
    ${dims.xPad}px;

  p:first-child {
    margin-top: 0;
  }

  @media screen and (max-width: 640px) {
    padding: 0;
  }
`;

export const TwoColWrap = styled.div`
  display: flex;

  @media screen and (max-width: 640px) {
    flex-direction: column;
  }
`;

export const TextStack = styled.div<{ isProjectText?: boolean }>`
  ${({ isProjectText }) => {
    const realFooterHeight = dims.footerHeight * (isProjectText ? 2 : 1);

    return css`
      text-align: justify;
      position: sticky;
      align-self: flex-end;
      width: 50%;
      padding: var(--xPad);
      min-height: calc(100vh - ${realFooterHeight}px);
      bottom: ${realFooterHeight}px;
    `;
  }}

  // no margin above first <p>
  & > p:first-child, & > :not(p) ~ p {
    margin-top: 0;
  }

  // no margin below last <p>
  & > p:last-child {
    margin-bottom: 0;
  }

  @media screen and (max-width: 640px) {
    position: relative;
    width: 100%;
    bottom: auto;
    min-height: auto;
  }
`;

const StyledMobileLogo = styled(Link)`
  width: 100%;

  img {
    width: 100%;
    padding: 10% var(--xPad);
  }

  @media screen and (min-width: 641px) {
    display: none;
  }
`;

export const MobileLogo = () => {
  return (
    <StyledMobileLogo href={"/"}>
      <img src="/site_images/joshua-pavlacky.svg" alt="Joshua Pavlacky Logo" />
    </StyledMobileLogo>
  );
};

export const HiddenSpan = styled.span`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  width: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
`;

export const MobileFeaturedImg = styled.img`
  width: 100%;
  height: auto;
  box-shadow: 0 0 0 1px #4b4b4b;
  object-fit: cover;

  @media screen and (min-width: 641px) {
    display: none;
  }
`;
