import type { NextPage, GetStaticProps } from "next";
import { useState, useRef } from "react";
import { Footer } from "../components/Footer";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const PlantColumns = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 238px 50px 80px 50px;
`;

const PlantPic = styled.img`
  width: 200px;
  height: auto;
  position: fixed;
`;

export type Plant = {
  attributes: {
    title: string;
    image: string;
  };
  slug: string;
};

const HoverPlant = (plant: Plant) => {
  const { query } = useRouter();
  const plantQuery = query.plant as string;
  const isQueried = plantQuery === plant.slug;
  const { title, image } = plant.attributes;
  const slug = plant.slug;
  const scrollToRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(isQueried);

  useEffect(() => {
    if (isQueried) {
      scrollToRef.current?.scrollIntoView();
    }
  }, []);

  const randLeft = Math.random() * 100;
  const randTop = Math.random() * 100;
  const randPosStyle = {
    top: `${randTop}%`,
    left: `${randLeft}%`,
    transform: `translate(${-randLeft}%, ${-randTop}%)`,
  };

  return (
    <>
      <div
        ref={scrollToRef}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ color: hover ? "red" : "" }}
      >
        <Link href={`/projects?plant=${slug}`}>{title}</Link>
      </div>
      {hover && <PlantPic style={randPosStyle} src={`/${image}`} />}
    </>
  );
};

interface Props {
  plantsList: Plant[];
}

const Plants: NextPage<Props> = ({ plantsList }) => {
  return (
    <>
      <PlantColumns>
        {plantsList.map((plant, i) => (
          <HoverPlant key={i} {...plant} />
        ))}
      </PlantColumns>
      <Footer />
    </>
  );
};

export const importPlants = async () => {
  // https://webpack.js.org/guides/dependency-management/#requirecontext
  const markdownFiles = require
    .context("/content/plants", false, /\.md$/)
    .keys()
    .map((relativePath) => relativePath.substring(2));

  return Promise.all(
    markdownFiles.map(async (path) => {
      const markdown = await import(`/content/plants/${path}`);
      return { ...markdown, slug: path.substring(0, path.length - 3) };
    })
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const plantsList = await importPlants();

  return { props: { plantsList } };
};

export default Plants;
