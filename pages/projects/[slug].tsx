import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
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
  width: 40px;
  height: 80px;
  border-top-left-radius: 666px;
  border-bottom-left-radius: 666px;
  background-size: cover;
  background-position: left;

  &:hover {
    width: 80px;
    border-radius: 666px;
  }
`;

const StyledPlantStack = styled.div`
  position: fixed;
  left: calc(50vw - 40px);
  z-index: 9;
  top: calc(50vh - ${dims.footerHeight}px);
  transform: translateY(-50%);
`;

const PlantStack = ({ plants }: { plants: Plant[] }) => {
  return (
    <StyledPlantStack>
      {plants.map((plant) => (
        <Link href={`/explore?plant=${plant.slug}`}>
          <a>
            <PlantButton
              style={{ backgroundImage: `url(/${plant.attributes.image})` }}
            />
          </a>
        </Link>
      ))}
    </StyledPlantStack>
  );
};

const ProjectContent = styled.div`
  width: 50vw;
  margin-left: 50vw;
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
        <div>{parse(content.html)}</div>
        {content.attributes.images.map((image) => (
          <img src={`/${image.image}`} />
        ))}
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
