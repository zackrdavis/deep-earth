import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { importPlants, Plant } from "../explore";
import fs from "fs";
import path from "path";
import parse from "html-react-parser";
import { Footer } from "../../components/Footer";
import { VerticalRule } from "../../components/VerticalRule";
import { Logo } from "../../components/Logo";
import { dims } from "../../components/shared";

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

const PlantButton = styled.div`
  flex: 0 1 auto;
  min-height: 0px;
  position: relative;

  a {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    top: -10px;
  }

  &:hover {
    div {
      z-index: 9;
      width: 80px;
      border-radius: 666px;
    }
  }

  div {
    width: 40px;
    height: 80px;
    border-top-left-radius: 666px;
    border-bottom-left-radius: 666px;
    background-size: cover;
    background-position: left;
    position: relative;
    top: calc(50%);
    transform: translateY(-50%);
    margin: 10px 0;
  }
`;

const StyledPlantStack = styled.div`
  position: fixed;
  top: 0;
  left: calc(50% - 40px);
  z-index: 9;
  display: flex;
  height: 100%;
  width: 80px;
  flex-direction: column;
  justify-content: center;
  padding-top: ${dims.xPad + 40}px;
  padding-bottom: ${dims.xPad + dims.footerHeight + 40}px;
`;

const PlantStack = ({ plants }: { plants: Plant[] }) => {
  const handleScroll = (e: Event) => {
    console.log(e);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StyledPlantStack>
      {plants &&
        plants.map((plant) => (
          <PlantButton>
            <Link href={`/explore?plant=${plant.slug}`}>
              <a>
                <div
                  style={{
                    backgroundImage: `url(/${plant.attributes.image})`,
                  }}
                />
              </a>
            </Link>
          </PlantButton>
        ))}
    </StyledPlantStack>
  );
};

const ProjectContent = styled.div`
  display: flex;
`;

const ProjectText = styled.div`
  width: 50%;
  padding: 250px ${dims.xPad}px ${dims.footerHeight + dims.xPad}px;

  p:first-child {
    margin-top: 0;
  }
`;

const ProjectImages = styled.div`
  width: 50%;
  padding: ${dims.xPad}px ${dims.xPad}px ${dims.footerHeight + dims.xPad}px;

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

const SingleProject: NextPage<ProjectProps> = ({ content, plantsList }) => {
  const linkedPlants = plantsList.filter((plant) =>
    content.attributes.plants.includes(plant.attributes.title)
  );

  return (
    <>
      <ProjectContent>
        <ProjectText>{parse(content.html)}</ProjectText>
        <ProjectImages>
          {content.attributes.images &&
            content.attributes.images.map((image) => (
              <img src={`/${image.image}`} />
            ))}
        </ProjectImages>
      </ProjectContent>

      <PlantStack plants={linkedPlants} />
      <Logo />
      <VerticalRule />
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
