import type { NextPage, GetStaticProps } from "next";
import { useRef, useState } from "react";
import { Footer } from "../components/Footer";
import styled, { keyframes } from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { colors, dims, TwoColWrap, HiddenSpan } from "../components/shared";
import { VerticalRule } from "../components/VerticalRule";
import { Logo } from "../components/Logo";
import { importProjects, Project } from "./projects";
import Head from "next/head";

const shake = keyframes`
  10% {
    transform: translate3d(-1px, 4px, 0) scale(1.1, 0.9);
  }
  
  20% {
    transform: translate3d(0px, 0px, 0) scale(1, 1);
  } 
`;

export type Plant = {
  attributes: {
    title: string;
    image: string;
  };
  slug: string;
  projects?: {
    slug: string;
    title: string;
  }[];
};

const PlantsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  margin-bottom: ${dims.footerHeight}px;

  @media screen and (max-width: 640px) {
    padding: var(--xPad);
  }
`;

const StyledPlantHoverTile = styled.div`
  aspect-ratio: 1;
  min-width: 80px;
  min-height: 80px;
  position: relative;
  cursor: pointer;
  transition: transform 0.25s;

  &:hover {
    transition: transform 0.25s;
    animation: ${shake} 2s ease-out;
  }

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
`;

const PlantHoverTile = ({
  plant,
  onClickPlant,
}: {
  plant: Plant;
  onClickPlant: (plant?: Plant) => void;
}) => {
  const {
    attributes: { title, image },
    slug,
  } = plant;

  return (
    <StyledPlantHoverTile onClick={() => onClickPlant(plant)}>
      <HiddenSpan>{title}</HiddenSpan>
      <img
        style={{ background: colors.green }}
        alt={title}
        src={image + "?nf_resize=fit&w=100"}
        loading="lazy"
      />
      <div>{title}</div>
    </StyledPlantHoverTile>
  );
};

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

const ActivePlantWrap = styled.div`
  position: fixed;
  width: 50%;
  left: 50vw;
  height: calc(100vh - ${dims.footerHeight}px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  div:not(.plantPic) {
    padding: 10px var(--xPad);
    border-top: 1px solid ${colors.black};
    min-height: ${dims.footerHeight}px;
    display: flex;
    align-items: center;
    position: relative;
    text-align: center;
    justify-content: center;

    a {
      color: ${colors.sienna};
    }
  }

  @media screen and (max-width: 640px) {
    height: 50%;
    position: relative;
    width: 100vw;
    left: auto;
    border-bottom: 1px solid ${colors.black};

    img {
      width: 100vw;
      max-height: calc(100vh - ${dims.footerHeight * 3}px);
    }
  }
`;

const StyledActivePlantPic = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;

  img {
    background-color: ${colors.green};
    filter: none;
    transition: 0.1s filter linear;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const ActivePlantPic = ({ imgUrl, alt }: { imgUrl: string; alt: string }) => {
  const loadedFullSize = useRef(false);
  const [src, setSrc] = useState(imgUrl + "?nf_resize=fit&w=100");
  const [blur, setBlur] = useState(true);

  const handleLoadSrc = () => {
    if (!loadedFullSize.current) {
      // if we just loaded the lo-rez image, switch to hi-rez
      // and flip the switch so we don't do it again
      setSrc(imgUrl + "?nf_resize=fit&w=1200");
      loadedFullSize.current = true;
    } else {
      // if we've loaded the hi-rez image, remove the blur
      setBlur(false);
    }
  };

  return (
    <StyledActivePlantPic className="plantPic">
      <img
        alt={alt}
        src={src}
        onLoad={handleLoadSrc}
        style={blur ? { filter: "blur(5px)" } : {}}
      />
    </StyledActivePlantPic>
  );
};

const Plants: NextPage<Props> = ({ plantsList, content }) => {
  const { query } = useRouter();
  const plantQuery = query.plant as string;
  const queriedPlant = plantsList.find((plant) => plant.slug == plantQuery);

  const [currentPlant, setCurrentPlant] = useState<undefined | Plant>(
    queriedPlant
  );

  useEffect(() => {
    setCurrentPlant(queriedPlant);
  }, [queriedPlant]);

  useEffect(() => {
    if (window.innerWidth <= 640) {
      window.scrollTo(0, 0);
    }
  }, [currentPlant]);

  const featuredProjectLinks = currentPlant?.projects?.map((p, i) => (
    <span key={i}>
      &nbsp;<Link href={"/projects/" + p.slug}>{p.title}</Link>
      {i + 1 == currentPlant?.projects?.length ? "." : ","}
    </span>
  ));

  const currentProject = currentPlant?.projects?.length ? (
    <div>
      <span>Featured in{featuredProjectLinks}</span>
    </div>
  ) : null;

  return (
    <>
      <Head>
        <title>Joshua Pavlacky Landscape Design</title>
        <meta name="description" content={content.attributes.meta || ""} />
      </Head>

      <VerticalRule />

      <TwoColWrap>
        {currentPlant && (
          <ActivePlantWrap>
            <ActivePlantPic
              key={currentPlant.attributes.image}
              imgUrl={currentPlant.attributes.image}
              alt={currentPlant?.attributes.title}
            />

            <div>{currentPlant?.attributes.title}</div>
            {currentProject}
          </ActivePlantWrap>
        )}

        <PlantsGridWrap>
          <Logo />
          <PlantsGrid>
            {plantsList.map((plant, i) => (
              <PlantHoverTile
                key={i}
                plant={plant}
                onClickPlant={setCurrentPlant}
              />
            ))}
          </PlantsGrid>
        </PlantsGridWrap>
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
  const content = await import(`../content/pages/${"explore"}.md`);

  // associate projects with plants that use them
  const plantsWithProjects = plantsList.map((plant) => {
    const usedInProjects = projectsList
      .map((project) => ({
        slug: project.slug,
        title: project.attributes.title,
        plants: project.attributes?.plants,
      }))
      .filter((pp) => pp.plants.includes(plant.attributes.title));

    return { ...plant, projects: usedInProjects };
  });

  return {
    props: {
      content: content.default,
      plantsList: plantsWithProjects,
    },
  };
};

export default Plants;
