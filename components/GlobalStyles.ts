import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

  :root {
    --xPad: 80px;
    --footerHeight: 80px;
    --logoPad: 50px;
    --betweenLogoAndGrid: 80px;

    --black: #4b4b4b;
    --tan: #E6E6DA;
    --sienna: #A86654;
    --green: #698165;
  }

  @media (max-width: 640px) {
    :root {
     --xPad: 40px;
    }
  }


html,
body {
  padding: 0;
  margin: 0;
  font-family: "Prune";
  font-size: 20px;
  background: var(--tan);
  color: var(--black);

  @media (max-width: 640px) {
    font-size: 18px;
  }
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  display: block;
  // hide alt-text while image loads
  color: transparent;
}

* {
  box-sizing: border-box;
}

`;
