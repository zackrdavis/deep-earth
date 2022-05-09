import styled from "styled-components";
import { colors } from "./shared";

const StyledMenuButton = styled.div`
  position: fixed;
  top: 25px;
  right: 25px;
  z-index: 999;
  width: 48px;
  height: 48px;
  cursor: pointer;

  @media screen and (min-width: 641px) {
    display: none;
  }
`;

const Hamburger = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-top: 6px solid ${colors.sienna};
  border-bottom: 6px solid ${colors.sienna};

  &:after {
    content: "";
    height: 6px;
    width: 100%;
    background-color: ${colors.sienna};
  }
`;

const Ex = styled.div`
  width: 100%;
  height: 100%;

  &:after,
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    height: 6px;
    width: 60px;
    background-color: ${colors.sienna};
  }

  &:before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
  &:after {
    transform: translate(-50%, -50%) rotate(45deg);
  }
`;

export const MenuButton = ({
  handleClick,
  showMenu,
}: {
  handleClick: () => void;
  showMenu: boolean;
}) => {
  return (
    <StyledMenuButton onClick={handleClick}>
      {showMenu ? <Ex /> : <Hamburger />}
    </StyledMenuButton>
  );
};
