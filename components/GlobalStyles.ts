import { createGlobalStyle } from "styled-components";
import { colors } from "./shared";

export const GlobalStyles = createGlobalStyle`
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
