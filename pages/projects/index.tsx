import type { NextPage, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Footer } from "../../components/Footer";

type Project = {
  attributes: {
    title: string;
    date: string;
    thumbnail: string;
    featured_image: string;
    plants: string[];
  };
  html: string;
};

interface Props {
  projectsList: Project[];
}

const sluggify = (string: string) => {
  return string.toLowerCase().replaceAll(" ", "-");
};

const Projects: NextPage<Props> = ({ projectsList }) => {
  const { query } = useRouter();
  const plantQuery = query.plant as string;

  // filter projectsList if there's a plant query
  if (plantQuery) {
    projectsList = projectsList.filter(
      (project) =>
        project.attributes.plants &&
        project.attributes.plants
          .map((plant) => sluggify(plant))
          .includes(plantQuery)
    );
  }

  return (
    <>
      {projectsList.map((project, i) => (
        <div key={i}>{project.attributes.title}</div>
      ))}
      <Footer />
    </>
  );
};

const importProjects = async () => {
  // https://webpack.js.org/guides/dependency-management/#requirecontext
  const markdownFiles = require
    .context("../../content/projects", false, /\.md$/)
    .keys()
    .map((relativePath) => relativePath.substring(2));

  return Promise.all(
    markdownFiles.map(async (path) => {
      const markdown = await import(`../../content/projects/${path}`);
      return { ...markdown, slug: path.substring(0, path.length - 3) };
    })
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const projectsList = await importProjects();

  return { props: { projectsList } };
};

export default Projects;
