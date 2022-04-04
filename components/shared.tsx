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
`;
