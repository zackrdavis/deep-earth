import { NextPageContext } from "next";
import { readdirSync, statSync } from "fs";

type PageInfo = { cleanName: string; cleanTime: string };

function generateSiteMap(pages: PageInfo[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       
       ${pages
         .map(({ cleanName, cleanTime }) => {
           return `
         <url>
             <loc>https://joshuapavlacky.com${cleanName}}</loc>
             <lastmod>${cleanTime}</lastmod>
         </url>
       `;
         })
         .join("")}
     </urlset>
   `;
}

export async function getServerSideProps({ res }: NextPageContext) {
  const allPages: PageInfo[] = [];

  const walkSync = (dir: string) => {
    const files = readdirSync(dir);
    return files.map((fileName) => handleFilePath(dir + fileName));
  };

  const handleFilePath = (filePath: string, replaceUrl?: string) => {
    const { mtime } = statSync(filePath);
    const cleanTime = mtime.toISOString().slice(0, 10);

    let cleanName = filePath.slice(
      filePath.lastIndexOf("/"),
      filePath.lastIndexOf(".")
    );

    return { cleanName: replaceUrl || cleanName, cleanTime };
  };

  // add the other pages
  allPages.push(handleFilePath("./content/pages/home.md", "/"));
  allPages.push(handleFilePath("./content/pages/explore.md"));
  allPages.push(handleFilePath("./content/pages/contact.md", "/info"));

  const projects = walkSync("./content/projects/").map((p) => ({
    cleanName: `/projects${p.cleanName}`,
    cleanTime: p.cleanTime,
  }));

  const projectsPageInfo = handleFilePath("./content/pages/explore.md");

  const mostRecentProjectDate = [...projects, projectsPageInfo]
    .map((p: { cleanName: string; cleanTime: string }) => p.cleanTime)
    .sort()[projects.length]; // get the last item. We added one entry (the main projects page) so don't subtract 1

  // add individual project pages
  allPages.push(...projects);

  // construct entry for projects page using mdate of latest project of the main page, whichever is more recent
  allPages.push({ cleanName: "/projects", cleanTime: mostRecentProjectDate });

  const sitemap: string = generateSiteMap(allPages);

  res?.setHeader("Content-Type", "text/xml");
  res?.write(sitemap);
  res?.end();

  return {
    props: {},
  };
}

// not using this since we are writing the response directly
function SiteMap({ data }: any) {}

export default SiteMap;
