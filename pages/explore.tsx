import type { NextPage, GetStaticProps } from "next";
import { useState } from "react";
import { Footer } from "../components/Footer";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { colors, dims, TwoColWrap, MobileLogo } from "../components/shared";
import { VerticalRule } from "../components/VerticalRule";
import { Logo } from "../components/Logo";
import { importProjects, Project } from "./projects";

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
}: {
  plant: Plant;
  onHoverPlant: (plant?: Plant) => void;
  hasProjects: boolean;
}) => {
  const {
    attributes: { title, image },
    slug,
  } = plant;

  return (
    <StyledPlantHoverTile
      as={hasProjects ? Link : "div"}
      href={`/projects?plant=${slug}`}
      onMouseEnter={() => onHoverPlant(plant)}
    >
      <img src={image + "?nf_resize=fit&w=180&h=180"} loading="lazy" />
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

const Plants: NextPage<Props> = ({ plantsList, projectsList }) => {
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
      <VerticalRule />

      <TwoColWrap>
        <MobileLogo />

        <PlantsGridWrap>
          <Logo />
          <PlantsGrid>
            {plantsList.map((plant, i) => (
              <PlantHoverTile
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
            <PlantPic src={currentPlant?.attributes.image} />
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

  return { props: { plantsList, projectsList } };
};

export default Plants;
