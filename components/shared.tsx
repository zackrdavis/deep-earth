import styled, { css } from "styled-components";

export const colors = {
  black: "#4b4b4b",
  tan: "#E6E6DA",
  sienna: "#A86654",
};

export const sluggify = (string: string) => {
  return string.toLowerCase().replaceAll(" ", "-");
};

export const dims = {
  xPad: 50,
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
    flex-direction: column-reverse;
  }
`;

export const TextStack = styled.div<{ isProjectText?: boolean }>`
  ${({ isProjectText }) => {
    const realFooterHeight = dims.footerHeight * (isProjectText ? 2 : 1);

    return css`
      position: sticky;
      align-self: flex-end;
      width: 50%;
      padding: ${dims.xPad}px;
      min-height: calc(100vh - ${realFooterHeight}px);
      bottom: ${realFooterHeight}px;
    `;
  }}

  & > p:first-child {
    margin-top: 0;
  }
  & > p:last-child {
    margin-bottom: 0;
  }

  @media screen and (max-width: 640px) {
    width: 100%;
    padding: ${dims.xPad}px;
  }
`;

export const AboveTextSpacer = styled.div<{ isProjectText?: boolean }>`
  ${({ isProjectText }) => {
    const subtractedHeight =
      dims.logoPad + 75 + 20 + dims.footerHeight + (isProjectText ? 60 : 0);

    return css`
      height: calc((100vh - ${subtractedHeight}px) / 2);
    `;
  }}
`;
