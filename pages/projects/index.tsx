import type { NextPage, GetStaticProps } from "next";
import styled from "styled-components";
import Image from "next/image";
import { sluggify } from "../../components/shared";
import Link from "next/link";
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
  slug: string;
  html: string;
};

interface Props {
  projectsList: Project[];
}

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 3fr 3fr;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  padding: 270px 50px 0 50px;
`;

const Project = styled.div`
  width: 100%;
  cursor: pointer;
  position: relative;

  .project-image {
    width: 100%;
  }
`;

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
      <ProjectGrid>
        {projectsList.map((project, i) => (
          <Link href={`/projects/${project.slug}`} key={i}>
            <Project>
              <img
                className="project-image"
                src={`/${project.attributes.featured_image}`}
              />

              {project.attributes.title}
            </Project>
          </Link>
        ))}
      </ProjectGrid>
      <Footer />
    </>
  );
};

const importProjects = async () => {
  // https://webpack.js.org/guides/dependency-management/#requirecontext
  const markdownFiles = require
    .context("/content/projects", false, /\.md$/)
    .keys()
    .map((relativePath) => relativePath.substring(2));

  return Promise.all(
    markdownFiles.map(async (path) => {
      const markdown = await import(`/content/projects/${path}`);
      return { ...markdown, slug: path.substring(0, path.length - 3) };
    })
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const projectsList = await importProjects();

  return { props: { projectsList } };
};

export default Projects;
