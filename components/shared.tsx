import styled, { css } from "styled-components";

export const colors = {
  black: "#4b4b4b",
  tan: "#E6E6DA",
  sienna: "#A86654",
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

export const dims = {
  xPad: 80,
  footerHeight: 80,
  logoPad: 50,
  betweenLogoAndGrid: 80,
};

export const ContentWrap = styled.div`
  padding: ${dims.logoPad}px ${dims.xPad}px ${dims.footerHeight + dims.xPad}px
    ${dims.xPad}px;

  p:first-child {
    margin-top: 0;
  }

  @media screen and (max-width: 640px) {
    padding: 75px 0 ${dims.xPad}px;
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
      padding-top: ${dims.xPad}px;
      padding-bottom: ${dims.xPad}px;
      padding-left: ${dims.xPad}px;
      padding-right: ${dims.xPad}px;
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
    padding: ${dims.xPad}px;
    bottom: auto;
  }
`;

export const AboveTextSpacer = styled.div<{ isProjectText?: boolean }>`
  ${({ isProjectText }) => {
    const subtractedHeight =
      dims.logoPad + 75 + 20 + dims.footerHeight + (isProjectText ? 60 : 0);

    return css`
      height: calc((100vh - ${subtractedHeight}px) / 2);

      @media screen and (max-width: 640px) {
        display: none;
      }
    `;
  }}
`;
