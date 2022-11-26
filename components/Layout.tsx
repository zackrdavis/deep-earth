import React from "react";
import styled from "styled-components";
import { Footer } from "./Footer";
import { Logo } from "./Logo";

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <PageWrap>
      <Logo />
      <main>{children}</main>
      <Footer />
    </PageWrap>
  );
};
