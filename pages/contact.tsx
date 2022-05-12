import type { NextPage, GetStaticProps } from "next";
import parse from "html-react-parser";
import { Footer } from "../components/Footer";
import { Logo } from "../components/Logo";
import { ContentWrap } from "../components/shared";
import { dims } from "../components/shared";
import styled from "styled-components";

const MobileContentWrap = styled(ContentWrap)`
  @media screen and (max-width: 640px) {
    padding: ${dims.xPad + 75}px ${dims.xPad}px;
  }
`;

interface Props {
  content: {
    attributes: {
      featured_image: string;
    };
    html: string;
  };
}

const Contact: NextPage<Props> = ({ content }) => {
  return (
    <>
      <Logo />
      <MobileContentWrap>{parse(content.html)}</MobileContentWrap>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = await import(`../content/pages/${"contact"}.md`);
  return { props: { content: content.default } };
};

export default Contact;
