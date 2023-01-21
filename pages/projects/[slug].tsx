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
import { ImageStack } from "../../components/ImageStack";
import {
  dims,
  colors,
  TextStack,
  AboveTextSpacer,
  TwoColWrap,
} from "../../components/shared";

interface ProjectProps {
  content: {
    attributes: {
      title: string;
      featured_image: string;
      // slugs of plants for this project
      plants: string[];
      images: { image: string; caption?: string }[];
    };
    html: string;
  };
  // all of the plants, to be filtered down
  plantsList: Plant[];
}

const ProjectFooter = styled.div`
  border-top: 1px solid ${colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: ${dims.footerHeight}px;
  width: 50%;
  height: ${dims.footerHeight}px;
  padding: 0 ${dims.xPad}px;
  background: ${colors.tan};
  z-index: 2;

  @media screen and (max-width: 640px) {
    bottom: 0;
  }
`;

const SingleProject: NextPage<ProjectProps> = ({ content, plantsList }) => {
  const defaultImageCaption = `Photo of plantings at ${content.attributes.title}.`;

  const linkedPlants = content.attributes.plants
    ? plantsList.filter((plant) =>
        content.attributes.plants.includes(plant.attributes.title)
      )
    : [];

  return (
    <>
      <TwoColWrap>
        <TextStack isProjectText>
          <Logo />
          <AboveTextSpacer isProjectText />
          {parse(content.html)} {parse(content.html)}
        </TextStack>

        <ImageStack images={content.attributes.images} />
      </TwoColWrap>
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
