import type { NextPage, GetStaticProps } from "next";

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
  projectsList: Project[];
}

const Projects: NextPage<Props> = ({ projectsList }) => {
  return <>{projectsList.map((p) => p.attributes.title)}</>;
};

const importProjects = async () => {
  // https://webpack.js.org/guides/dependency-management/#requirecontext
  const markdownFiles = require
    .context("../content/projects", false, /\.md$/)
    .keys()
    .map((relativePath) => relativePath.substring(2));

  return Promise.all(
    markdownFiles.map(async (path) => {
      const markdown = await import(`../content/projects/${path}`);
      return { ...markdown, slug: path.substring(0, path.length - 3) };
    })
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const projectsList = await importProjects();

  return { props: { projectsList } };
};

export default Projects;
