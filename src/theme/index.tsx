import React, {useMemo} from 'react';
import styled, {DefaultTheme, ThemeProvider as StyledComponentsThemeProvider} from 'styled-components/macro';

function colorsOriginal(darkMode: boolean) {
  return {
    background: {
      one: "#030309",
      two: "#121218",
      three: "#1C1C22",
      four: "#26262B",
    },
    borderDark: "#1F1F1F",
    border: "#1C1C22",
    borderLight: "#2E2C2B",
    text: "#ACACAB",
    primaryText: "#FFFFFF",
    quaternaryText: "#3F3F44",
    green: "#16CEB9",
    red: "#fc0a54",
    pillBackground: "#151413",
    tagBackground: "#1D222D",
    products: {
      yield: "#FF385C",
      volatility: "#FF9000",
      principalProtection: "#79FFCB",
      capitalAccumulation: "#729DED",
    },
    buttons: {
      primary: "#fc0a54",
      error: "rgba(252, 10, 84, 0.16)",
      secondaryBackground: "rgba(22, 206, 185, 0.08)",
      secondaryText: "#16ceb9",
    },
    vaultActivity: {
      sales: "#16ceb9",
      minting: "#729ded",
    },
    brands: {
      opyn: "#6FC0A2",
      hegic: "#45FFF4",
      charm: "#5A67D8",
      discord: "#5A65EA",
      primitive: "#FFFFFF",
    },
    asset: {
      WETH: "#627EEA",
      WBTC: "#E39652",
      USDC: "#3E73C4",
      yvUSDC: "#3E73C4",
      stETH: "#00A3FF",
      AAVE: "#2EBAC6",
      WAVAX: "#E84142",
      PERP: "#00BC9A",
    },
  };
}

function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colorsOriginal(darkMode),
    colors: {
      background: {
        one: "#030309",
        two: "#121218",
        three: "#1C1C22",
        four: "#26262B",
      },

      bg0: darkMode ? '#191B1F' : '#FFF',
      bg1: darkMode ? '#212429' : '#F7F8FA',
      bg2: darkMode ? '#2C2F36' : '#EDEEF2',
      bg3: darkMode ? '#40444F' : '#CED0D9',
      bg4: darkMode ? '#565A69' : '#888D9B',
      bg5: darkMode ? '#6C7284' : '#888D9B',
      bg6: darkMode ? '#1A2028' : '#6C7284',

      text1: darkMode ? '#FFFFFF' : '#000000',
      text2: darkMode ? '#C3C5CB' : '#565A69',
      text3: darkMode ? '#8F96AC' : '#6E727D',
      text4: darkMode ? '#B2B9D2' : '#C3C5CB',
      text5: darkMode ? '#2C2F36' : '#EDEEF2',

      borderDark: "#1F1F1F",
      border: "#1C1C22",
      borderLight: "#2E2C2B",
      text: "#ACACAB",
      primaryText: "#FFFFFF",
      quaternaryText: "#3F3F44",
      green: "#16CEB9",
      red: "#fc0a54",
      grey: "#808080",
      black: "#FFFFFF",
      white: "#000000",
      pillBackground: "#151413",
      tagBackground: "#1D222D",
      products: {
        yield: "#FF385C",
        volatility: "#FF9000",
        principalProtection: "#79FFCB",
        capitalAccumulation: "#729DED",
      },
      buttons: {
        primary: "#fc0a54",
        error: "rgba(252, 10, 84, 0.16)",
        secondaryBackground: "rgba(22, 206, 185, 0.08)",
        secondaryText: "#16ceb9",
      },
    },

    sizes: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    },

    hover: {
      opacity: 0.7,
    },
    border: {
      radius: "8px",
      width: "1px",
      style: "solid",
    },
    header: {
      height: 72,
    },
    footer: {
      desktop: {
        height: 52,
      },
      mobile: {
        height: 104,
      },
    },
  };
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = true;//useIsDarkMode()

  const themeObject = useMemo(() => theme(darkMode), [darkMode])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}