import type { NextPage, GetStaticProps } from "next";
import { Footer } from "../components/Footer";

type Project = {
  attributes: {
    title: string;
    date: string;
    thumbnail: string;
    featured_image: string;
  };
  html: string;
};

interface Props {
  plantsList: Project[];
}

const Plants: NextPage<Props> = ({ plantsList }) => {
  return (
    <>
      {JSON.stringify(plantsList)}
      <Footer />
    </>
  );
};

const importPlants = async () => {
  // https://webpack.js.org/guides/dependency-management/#requirecontext
  const markdownFiles = require
    .context("../content/plants", false, /\.md$/)
    .keys()
    .map((relativePath) => relativePath.substring(2));

  return Promise.all(
    markdownFiles.map(async (path) => {
      const markdown = await import(`../content/plants/${path}`);
      return { ...markdown, slug: path.substring(0, path.length - 3) };
    })
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const plantsList = await importPlants();

  return { props: { plantsList } };
};

export default Plants;
