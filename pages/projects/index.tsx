import type { NextPage, GetStaticProps } from "next";
import styled from "styled-components";
import useIntersectionObserver from "@react-hook/intersection-observer";
import { ContentWrap, sluggify } from "../../components/shared";
import Link from "next/link";
import { useRouter } from "next/router";
import { Footer } from "../../components/Footer";
import { useRef } from "react";
import { Logo } from "../../components/Logo";

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

  @media screen and (max-width: 640px) {
    display: flex;
    flex-direction: column;
  }
`;

const Project = styled.div`
  width: 100%;
  cursor: pointer;
  position: relative;
`;

const BackgroundImage = styled.div`
  width: 100%;
  height: 0;
  padding-top: 64%; // todo: get real ratio
  position: relative;
  background-size: cover;
`;

const ProjectTitle = styled.div`
  margin-top: 15px;

  @media screen and (max-width: 640px) {
    padding-left: 15px;
  }
`;

const ProjectImage = ({ src }: { src: string }) => {
  const observerRef = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useIntersectionObserver(observerRef);

  return (
    <BackgroundImage
      ref={observerRef}
      style={{ backgroundImage: isIntersecting ? `url(/${src})` : "" }}
    />
  );
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
    <ContentWrap>
      <ProjectGrid>
        {projectsList.map((project, i) => (
          <Link href={`/projects/${project.slug}`} key={i}>
            <Project>
              <ProjectImage src={project.attributes.featured_image} />
              <ProjectTitle>{project.attributes.title}</ProjectTitle>
            </Project>
          </Link>
        ))}
      </ProjectGrid>
    </ContentWrap>
  );
};

const importProjects = async () => {
  // https://webpack.js.org/guides/dependency-management/#requirecontext
  const markdownFiles = require
    .context("/content/projects", true)
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
