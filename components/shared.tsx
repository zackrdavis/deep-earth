import styled from "styled-components";

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
  align-self: flex-end;
  position: sticky;
  // we can pretty safely say that image stacks will always be taller than the available space
  // otherwise this will make the image stick to the bottom with growing space above
  bottom: 0px;

  & > img {
    width: 100%;
    height: auto;
    margin-top: ${dims.xPad}px;
    border-top: 1px solid ${colors.black};
    border-bottom: 1px solid ${colors.black};

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: ${dims.footerHeight - 1}px;
    }
  }

  @media screen and (max-width: 640px) {
    width: 100%;
    padding: 75px 0 ${dims.xPad}px;
    padding-bottom: 0;
  }
`;

export const TextStack = styled.div`
  position: sticky;
  align-self: flex-end;
  bottom: ${dims.footerHeight * 2 + dims.xPad}px;
  width: 50%;
  padding: 0 ${dims.xPad}px;
  margin-top: calc((100vh - ${dims.footerHeight * 2}px) / 1.2);

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
