import { createGlobalStyle } from "styled-components";
import { colors } from "./shared";

export const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: "Prune";
  src: url("../public/fonts/Greenhouse-Prune.woff2") format("woff2"),
    url("../public/fonts/Greenhouse-Prune.woff") format("woff");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

html,
body {
  padding: 0;
  margin: 0;
  font-family: "Prune";
  font-size: 20px;
  background: ${colors.tan};
  color: ${colors.black};
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  display: block;
}

* {
  box-sizing: border-box;
}

`;
