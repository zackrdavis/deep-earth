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
import {
  dims,
  colors,
  ContentWrap,
  ImageStack,
  TextStack,
  AboveTextSpacer,
} from "../../components/shared";
import Image from "next/image";

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

const ProjectContent = styled.div`
  display: flex;

  @media screen and (max-width: 640px) {
    flex-direction: column-reverse;
  }
`;

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
      <ProjectContent>
        <TextStack isProjectText>
          <Logo />
          <AboveTextSpacer isProjectText />
          {parse(content.html)} {parse(content.html)}
        </TextStack>
        <ImageStack>
          {content.attributes.images &&
            content.attributes.images.map((image, i) => (
              <Image
                alt={image.caption || defaultImageCaption}
                key={i}
                src={`/${image.image}`}
                width={500}
                height={500}
              />
            ))}
        </ImageStack>
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
