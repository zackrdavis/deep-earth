import type { NextPage, GetStaticProps } from "next";
import { useRef, useState } from "react";
import { Footer } from "../components/Footer";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  colors,
  dims,
  TwoColWrap,
  MobileLogo,
  HiddenSpan,
} from "../components/shared";
import { VerticalRule } from "../components/VerticalRule";
import { Logo } from "../components/Logo";
import { importProjects, Project } from "./projects";
import Head from "next/head";

export type Plant = {
  attributes: {
    title: string;
    image: string;
  };
  slug: string;
};

const PlantsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  margin-bottom: ${dims.footerHeight}px;
  margin-top: ${dims.betweenLogoAndGrid}px;

  @media screen and (max-width: 640px) {
    grid-template-columns: 100%;
    margin-top: 0;
  }
`;

const StyledPlantHoverTile = styled.div`
  aspect-ratio: 1;
  min-width: 80px;
  min-height: 80px;
  position: relative;

  & > img {
    width: 90%;
    height: 90%;
    border-radius: 666px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
    box-shadow: 0 0 0 1px ${colors.black};
  }

  /* title for mobile only */
  & > div {
    display: none;
  }

  @media screen and (max-width: 640px) {
    aspect-ratio: initial;

    img {
      position: relative;
      top: 0;
      left: 0;
      transform: none;
      border-radius: 0;
      width: 100%;
      height: auto;
    }

    div {
      text-align: center;
      padding: 15px var(--xPad) 0;
      display: flex;
      justify-content: center;
      height: ${dims.footerHeight}px;
    }
  }
`;

const PlantHoverTile = ({
  plant,
  onHoverPlant,
  hasProjects,
  isQueried,
}: {
  plant: Plant;
  onHoverPlant: (plant?: Plant) => void;
  hasProjects: boolean;
  isQueried?: boolean;
}) => {
  const {
    attributes: { title, image },
    slug,
  } = plant;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isQueried) {
      ref.current?.scrollIntoView();
    }
  }, [isQueried]);

  return (
    <StyledPlantHoverTile
      ref={ref}
      as={hasProjects ? Link : "div"}
      href={`/projects?plant=${slug}`}
      onMouseEnter={() => onHoverPlant(plant)}
    >
      <HiddenSpan>{title}</HiddenSpan>
      <img
        style={{ background: colors.green }}
        alt={title}
        src={image + "?nf_resize=fit&w=180&h=180"}
        loading="lazy"
      />
      <div>{title}</div>
    </StyledPlantHoverTile>
  );
};

const PlantPic = styled.img`
  position: fixed;
  width: 50%;
  height: calc(100% - ${dims.footerHeight * 2}px);
  top: 0;
  right: 0;
  object-fit: cover;

  @media screen and (max-width: 640px) {
    display: none;
  }
`;

const PlantFooter = styled.div`
  border-top: 1px solid ${colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 0;
  bottom: ${dims.footerHeight}px;
  width: 50%;
  height: ${dims.footerHeight}px;
  padding: 0 ${dims.xPad}px;
  background: ${colors.tan};

  @media screen and (max-width: 640px) {
    bottom: 0;
  }
`;

interface Props {
  plantsList: Plant[];
  projectsList: Project[];
  content: {
    attributes: {
      meta?: string;
    };
  };
}

const PlantsGridWrap = styled.div`
  position: sticky;
  width: 50%;
  padding: var(--xPad);

  @media screen and (max-width: 640px) {
    position: relative;
    width: 100%;
    bottom: auto;
    min-height: auto;
    padding: 0;
  }
`;

const Plants: NextPage<Props> = ({ plantsList, projectsList, content }) => {
  // make list of plants which are attached to projects
  let usedPlants: string[] = [];
  projectsList.forEach((project) => {
    // skip project if no plants
    if (!project.attributes?.plants) return false;
    usedPlants = usedPlants.concat(project.attributes?.plants);
  });

  const { query } = useRouter();
  const plantQuery = query.plant as string;
  const queriedPlant = plantsList.find((plant) => plant.slug == plantQuery);

  const [currentPlant, setCurrentPlant] = useState<undefined | Plant>(
    queriedPlant
  );

  useEffect(() => {
    setCurrentPlant(queriedPlant);
  }, [queriedPlant]);

  return (
    <>
      <Head>
        <title>Joshua Pavlacky Landscape Design</title>
        <meta name="description" content={content.attributes.meta || ""} />
      </Head>

      <VerticalRule />

      <TwoColWrap>
        <MobileLogo />

        <PlantsGridWrap>
          <Logo />
          <PlantsGrid>
            {plantsList.map((plant, i) => (
              <PlantHoverTile
                isQueried={plant.slug == queriedPlant?.slug}
                hasProjects={usedPlants.includes(plant.attributes.title)}
                key={i}
                plant={plant}
                onHoverPlant={setCurrentPlant}
              />
            ))}
          </PlantsGrid>
        </PlantsGridWrap>

        {currentPlant && (
          <>
            <PlantPic
              alt={currentPlant?.attributes.title}
              src={currentPlant?.attributes.image + "?nf_resize=fit&w=1200"}
            />
            <PlantFooter>{currentPlant?.attributes.title}</PlantFooter>
          </>
        )}
      </TwoColWrap>

      <Footer />
    </>
  );
};

export const importPlants = async () => {
  // https://webpack.js.org/guides/dependency-management/#requirecontext
  const markdownFiles = require
    .context("/content/plants", false)
    .keys()
    .map((relativePath) => relativePath.substring(2));

  return Promise.all(
    markdownFiles.map(async (path) => {
      const markdown = await import(`../content/plants/${path}`);
      return { ...markdown, slug: path.substring(0, path.length - 3) };
    })
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const plantsList = await importPlants();
  const projectsList = await importProjects();
  // const content = await import(`../content/pages/${"explore"}.md`);

  return {
    props: {
      content: { attributes: { meta: "" } }, //content.default,
      plantsList,
      projectsList,
    },
  };
};

export default Plants;
