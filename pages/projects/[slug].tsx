import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { importPlants, Plant } from "../explore";
import fs from "fs";
import path from "path";
import parse from "html-react-parser";
import { Footer } from "../../components/Footer";
import { VerticalRule } from "../../components/VerticalRule";

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

const SingleProject: NextPage<ProjectProps> = ({ content, plantsList }) => {
  const linkedPlants = plantsList.filter((plant) =>
    content.attributes.plants.includes(plant.attributes.title)
  );

  return (
    <>
      {parse(content.html)}
      {linkedPlants.map((plant, i) => (
        <img key={i} src={`/${plant.attributes.image}`} />
      ))}
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
