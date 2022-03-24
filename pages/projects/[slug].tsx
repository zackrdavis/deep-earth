import type { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { importPlants, Plant } from "../explore";
import { sluggify } from "../../components/shared";
import fs from "fs";
import path from "path";
import parse from "html-react-parser";
import { Footer } from "../../components/Footer";

interface Props {
  content: {
    attributes: {
      title: string;
      featured_image: string;
      plants: string[];
    };
    html: string;
  };
  plantsList: Plant[];
}

const SingleProject: NextPage<Props> = ({ content, plantsList }) => {
  const linkedPlants = plantsList.filter((plant) =>
    content.attributes.plants.includes(plant.attributes.title)
  );

  console.log(linkedPlants);

  return (
    <>
      {parse(content.html)}
      {linkedPlants.map((plant) => (
        <img src={`/${plant.attributes.image}`} />
      ))}
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
