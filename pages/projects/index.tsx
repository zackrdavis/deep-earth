import type { NextPage, GetStaticProps } from "next";
import styled from "styled-components";
import {
  colors,
  ContentWrap,
  dims,
  MobileLogo,
  sluggify,
} from "../../components/shared";
import Link from "next/link";
import { useRouter } from "next/router";
import { Footer } from "../../components/Footer";
import { Logo } from "../../components/Logo";
import Head from "next/head";

export type Project = {
  attributes: {
    title: string;
    date: string;
    thumbnail: string;
    featured_image: string;
    caption?: string;
    plants: string[];
  };
  slug: string;
  html: string;
};

interface Props {
  projectsList: Project[];
  content: {
    attributes: {
      meta?: string;
    };
  };
}

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 3fr 3fr;
  gap: 30px;
  margin-top: ${dims.betweenLogoAndGrid}px;

  @media screen and (max-width: 640px) {
    display: flex;
    flex-direction: column;
    margin-top: 0;
    margin-bottom: ${dims.footerHeight}px;
    gap: 0;
  }
`;

const Project = styled.div`
  cursor: pointer;

  &:hover {
    color: ${colors.sienna};
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  aspect-ratio: 3/2;
  object-fit: cover;
  box-shadow: 0 0 0 1px ${colors.black};

  @media screen and (max-width: 640px) {
    aspect-ratio: initial;
  }
`;

const ProjectTitle = styled.div`
  margin-top: 15px;

  @media screen and (max-width: 640px) {
    margin-top: 0;
    padding: 15px var(--xPad) 0;
    display: flex;
    justify-content: center;
    height: ${dims.footerHeight}px;
    text-align: center;
  }
`;

const Projects: NextPage<Props> = ({ projectsList, content }) => {
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
      <Head>
        <title>Joshua Pavlacky Landscape Design</title>
        <meta name="description" content={content.attributes.meta || ""} />
      </Head>

      <MobileLogo />
      <ContentWrap>
        <Logo />
        <ProjectGrid>
          {projectsList.map((project, i) => (
            <Link href={`/projects/${project.slug}`} key={i}>
              <Project>
                <ProjectImage
                  alt={project.attributes.caption}
                  src={
                    "/" +
                    project.attributes.featured_image +
                    "?nf_resize=fit&w=800"
                  }
                />
                <ProjectTitle>{project.attributes.title}</ProjectTitle>
              </Project>
            </Link>
          ))}
        </ProjectGrid>
        <Footer />
      </ContentWrap>
    </>
  );
};

export const importProjects = async () => {
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
  // const content = await import(`../content/pages/${"projects"}.md`);

  return {
    props: {
      content: { attributes: { meta: "" } }, //content.default,
      projectsList: projectsList.sort((b, a) =>
        a.attributes.date.localeCompare(b.attributes.date)
      ),
    },
  };
};

export default Projects;
