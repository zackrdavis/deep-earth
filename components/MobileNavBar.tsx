import styled from "styled-components";
import { dims } from "./shared";

const Ex = styled.div`
  height: 20px;
  width: 20px;
  position: relative;

  &:after,
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    height: 2px;
    width: 137%;
    background-color: var(--sienna);
  }

  &:before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
  &:after {
    transform: translate(-50%, -50%) rotate(45deg);
  }
`;

const StyledMenuButton = styled.div`
  position: fixed;
  z-index: 3;
  bottom: 0;
  width: 100%;
  height: ${dims.footerHeight}px;
  background: var(--tan);
  border-top: 1px solid var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${dims.xPad}px;
  cursor: pointer;

  text-transform: uppercase;

  &:hover {
    color: var(--sienna);
  }

  @media screen and (min-width: 641px) {
    display: none;
  }
`;

export const MobileNavBar = ({
  handleClick,
  showMenu,
}: {
  handleClick: () => void;
  showMenu: boolean;
}) => {
  return (
    <StyledMenuButton onClick={handleClick}>
      {showMenu ? <Ex /> : "Menu"}
    </StyledMenuButton>
  );
};
