import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import styled from "styled-components";
import { importPlants, Plant } from "../explore";
import fs from "fs";
import path from "path";
import parse from "html-react-parser";
import { Footer } from "../../components/Footer";
import { VerticalRule } from "../../components/VerticalRule";
import { Logo } from "../../components/Logo";
import { PlantStack } from "../../components/PlantStack";
import { dims, colors, ContentWrap } from "../../components/shared";

interface ProjectProps {
  content: {
    attributes: {
      title: string;
      featured_image: string;
      // slugs of plants for this project
      plants: string[];
      images: { image: string }[];
    };
    html: string;
  };
  // all of the plants, to be filtered down
  plantsList: Plant[];
}

const ProjectContent = styled.div`
  display: flex;
`;

const ProjectText = styled.div`
  width: 50%;
  padding: calc((100vh - ${dims.footerHeight * 2}px) / 1.5) ${dims.xPad}px
    ${dims.footerHeight + dims.xPad}px;

  p:first-child {
    margin-top: 0;
  }
`;

const ProjectImages = styled.div`
  width: 50%;
  padding: ${dims.xPad}px ${dims.xPad}px ${dims.footerHeight * 2 + dims.xPad}px;

  // project text
  & > div {
    top: 0;
    left: 0;
    position: absolute;
  }

  // project image
  & > img {
    width: 100%;

    &:not(:last-child) {
      margin-bottom: ${dims.xPad}px;
    }
  }
`;

const ProjectFooter = styled.div`
  border-top: 1px solid ${colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: ${dims.footerHeight}px;
  width: 100%;
  height: ${dims.footerHeight}px;
  padding: 0 ${dims.xPad}px;
  background: ${colors.tan};
  z-index: 2;
`;

const SingleProject: NextPage<ProjectProps> = ({ content, plantsList }) => {
  const linkedPlants = plantsList.filter((plant) =>
    content.attributes.plants.includes(plant.attributes.title)
  );

  return (
    <>
      <Logo />
      <ProjectContent>
        <ProjectText>{parse(content.html)}</ProjectText>
        <ProjectImages>
          {content.attributes.images &&
            content.attributes.images.map((image, i) => (
              <img key={i} src={`/${image.image}`} />
            ))}
        </ProjectImages>
      </ProjectContent>
      <PlantStack plants={linkedPlants} />
      <VerticalRule />
      <ProjectFooter>{content.attributes.title}</ProjectFooter>
      <Footer />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = fs
    .readdirSync(path.join(process.cwd(), "content/projects"))
    .map((projectFile) => {
      const trimmedName = projectFile.substring(0, projectFile.length - 3);

      return {
        params: { slug: trimmedName },
      };
    });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const project = await import(
    `../../content/projects/${params?.slug}.md`
  ).catch(() => null);

  const plantsList = await importPlants();

  return { props: { content: project.default, plantsList } };
};

export default SingleProject;
