import styled from "styled-components";

export const VerticalRule = styled.div`
  position: fixed;
  z-index: 1;
  width: 1px;
  background: var(--black);
  height: 100%;
  top: 0;
  left: 50%;

  @media screen and (max-width: 640px) {
    display: none;
  }
`;
