import type { NextPage, GetStaticProps } from "next";
import styled from "styled-components";
import { useRouter } from "next/router";
import { sluggify } from "../components/shared";

const BiomeImage = styled.img`
  width: 100%;
`;

interface Biome {
  attributes: {
    title: string;
    images: { image: string }[];
  };
}

interface Props {
  biomesList: Biome[];
}

const Biomes: NextPage<Props> = ({ biomesList }) => {
  const { query } = useRouter();
  console.log(biomesList);

  return (
    <>
      {biomesList.map((biome, i) => (
        <div key={i} id={`${sluggify(biome.attributes.title)}`}>
          {biome.attributes.images.map(({ image }, j) => (
            <BiomeImage key={j} src={image} />
          ))}
        </div>
      ))}
    </>
  );
};

export const importBiomes = async () => {
  // https: //webpack.js.org/guides/dependency-management/#requirecontext
  const markdownFiles = require
    .context("/content/biome", true)
    .keys()
    .map((relativePath) => relativePath.substring(2));

  return Promise.all(
    markdownFiles.map(async (path) => {
      const markdown = await import(`../content/biome/${path}`);
      return { ...markdown, slug: path.substring(0, path.length - 3) };
    })
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const biomesList = await importBiomes();

  return {
    props: {
      biomesList: biomesList,
    },
  };
};

export default Biomes;
