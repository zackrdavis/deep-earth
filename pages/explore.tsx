import type { NextPage, GetStaticProps } from "next";
import { useState, useRef } from "react";
import { Footer } from "../components/Footer";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { colors, ContentWrap, dims } from "../components/shared";
import { Logo } from "../components/Logo";

export type Plant = {
  attributes: {
    title: string;
    image: string;
  };
  slug: string;
};

const MobileContentWrap = styled(ContentWrap)`
  @media screen and (max-width: 640px) {
    padding: ${dims.xPad + 75}px ${dims.xPad}px;
  }
`;

const PlantColumns = styled.div`
  column-count: 4;
  column-width: 200px;
  column-gap: ${dims.xPad}px;

  @media screen and (max-width: 640px) {
    column-count: 1;
  }
`;

const PlantLink = styled.div`
  margin-bottom: 24px;
`;

const PlantPic = styled.img`
  height: auto;
  position: fixed;
  z-index: 9;
  max-width: 300px;
  max-height: 300px;
`;

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
      <PlantLink
        ref={scrollToRef}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ color: hover ? colors.sienna : "" }}
      >
        <Link href={`/projects?plant=${slug}`}>{title}</Link>
      </PlantLink>
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
      <Logo />
      <MobileContentWrap
        style={{ paddingBottom: dims.footerHeight + dims.xPad - 24 }}
      >
        <PlantColumns>
          {plantsList.map((plant, i) => (
            <HoverPlant key={i} {...plant} />
          ))}
        </PlantColumns>
      </MobileContentWrap>
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
