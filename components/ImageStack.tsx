import styled from "styled-components";
import { dims } from "./shared";

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
