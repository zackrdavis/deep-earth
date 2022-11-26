import styled from "styled-components";

export const colors = {
  black: "#3A3935",
  tan: "#E6E6DA",
  sienna: "#A86654",
};

export const sluggify = (string: string) => {
  return string.toLowerCase().replaceAll(" ", "-");
};

export const dims = {
  xPad: 50,
  footerHeight: 80,
  logoPad: 240,
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

export const ImageStack = styled.div`
  width: 50%;
  /* padding: ${dims.xPad}px 0 ${dims.footerHeight}px; */

  & > img {
    width: 100%;
    height: auto;
    display: block;
    margin-bottom: ${dims.xPad}px;

    &:first-child {
      margin-top: ${dims.xPad}px;
    }
  }

  @media screen and (max-width: 640px) {
    width: 100%;
    padding: 75px 0 ${dims.xPad}px;
    padding-bottom: 0;
  }
`;
