import type { NextPage, GetStaticProps } from "next";
import { Footer } from "../components/Footer";

interface Props {
  content: { attributes: HomeAttributes };
}
interface HomeAttributes {
  landing_image: string;
}

const Home: NextPage<Props> = ({ content }) => {
  const { attributes } = content;
  return (
    <>
      <img src={attributes.landing_image} />
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content = await import(`../content/pages/${"home"}.md`);
  return { props: { content: content.default } };
};

export default Home;
