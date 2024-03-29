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
  TextStack,
  TwoColWrap,
  MobileLogo,
  MobileFeaturedImg,
  HiddenSpan,
} from "../../components/shared";
import Link from "next/link";
import { HeadTags } from "../../components/HeadTags";

interface ProjectProps {
  content: {
    attributes: {
      title: string;
      featured_image: string;
      caption?: string;
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
  border-top: 1px solid var(--black);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: ${dims.footerHeight}px;
  width: 50%;
  height: ${dims.footerHeight}px;
  padding: 0 var(--xPad);
  background: var(--tan);
  z-index: 2;

  @media screen and (max-width: 640px) {
    bottom: ${dims.footerHeight}px;
    width: 100%;
  }
`;

const LeftArrow = styled(Link)`
  position: relative;
  width: 70px;
  height: 20px;
  margin-right: 10px;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    background-color: var(--black);
  }

  &:after {
    content: "";
    position: absolute;
    left: 5%;
    top: 50%;
    height: 80%;
    aspect-ratio: 1;
    transform: translateY(-50%) rotate(-45deg);
    /* transform: rotate(-45deg); */
    /* border: 1px solid var(--black); */

    box-shadow: -1px -1px 0 0 var(--black);
  }
`;

const SingleProject: NextPage<ProjectProps> = ({ content, plantsList }) => {
  const linkedPlants = content.attributes.plants
    ? plantsList.filter((plant) =>
        content.attributes.plants.includes(plant.attributes.title)
      )
    : [];

  return (
    <>
      <HeadTags
        title={content.attributes.title}
        desc={`${content.attributes.title}: a landscape designed by Joshua Pavlacky.`}
        image={content.attributes.images[0].image}
        imageAlt={
          content.attributes.images[0].caption ||
          // fallback to project title
          `Documentation of ${content.attributes.title} project`
        }
      />

      <MobileLogo />

      <MobileFeaturedImg
        alt={
          content.attributes.images[0].caption ||
          // fallback to project title
          `Documentation of ${content.attributes.title} project`
        }
        src={`/${content.attributes.images[0].image}`}
        lgQuery={"?nf_resize=fit&w=1200"}
      />

      <VerticalRule />

      <TwoColWrap>
        <TextStack isProjectText>
          <Logo />
          {parse(content.html)}
        </TextStack>

        <PlantStack plants={linkedPlants} />

        <ImageStack
          projectTitle={content.attributes.title}
          images={content.attributes.images}
          lazyLoad
        />
      </TwoColWrap>

      <ProjectFooter>
        <LeftArrow href="/projects">
          <HiddenSpan>Return to Projects</HiddenSpan>
        </LeftArrow>
        {content.attributes.title}
      </ProjectFooter>

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
