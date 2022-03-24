import type { NextPage, GetStaticProps } from "next";
import parse from "html-react-parser";
import { Footer } from "../components/Footer";

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
      {parse(content.html)}
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = await import(`../content/pages/${"contact"}.md`);
  return { props: { content: content.default } };
};

export default Contact;
