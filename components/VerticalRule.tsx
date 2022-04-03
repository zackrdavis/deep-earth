import styled from "styled-components";
import { colors } from "./shared";

export const VerticalRule = styled.div`
  position: fixed;
  z-index: 1;
  width: 1px;
  background: ${colors.black};
  height: 100%;
  top: 0;
  left: 50%;
`;
