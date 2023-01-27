import styled from "styled-components";
import { colors } from "./shared";
import { Logo } from "./Logo";

const FixedBanner = styled.div`
  position: fixed;
  z-index: 3;
  bottom: 0;
  width: 100%;
  height: 75px;
  background: ${colors.tan};
  border-bottom: 1px solid ${colors.black};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 25px;

  @media screen and (min-width: 641px) {
    display: none;
  }
`;

const StyledMenuButton = styled.div`
  position: relative;
  z-index: 999;
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

const Hamburger = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-top: 5px solid ${colors.sienna};
  border-bottom: 5px solid ${colors.sienna};

  &:after {
    content: "";
    height: 5px;
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
    height: 5px;
    width: 137%;
    background-color: ${colors.sienna};
  }

  &:before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
  &:after {
    transform: translate(-50%, -50%) rotate(45deg);
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
    <FixedBanner>
      <Logo
        style={{
          display: "block",
          top: 0,
          width: 250,
          position: "relative",
        }}
      />
      <StyledMenuButton onClick={handleClick}>
        {showMenu ? <Ex /> : <Hamburger />}
      </StyledMenuButton>
    </FixedBanner>
  );
};
