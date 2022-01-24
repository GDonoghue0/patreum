import styled from 'styled-components/macro'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { initializeConnector } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'
import { useMatch } from "react-router-dom";
import HeaderLogo from "./HeaderLogo";
import AccountStatus from '../Wallet/'
import { Title } from '../Common'

const HeaderContainer = styled.div<{isMenuOpen: boolean}>`
  height: ${({theme}) => theme.header.height}px;
  position: sticky;
  top: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;

  @media (max-width: ${768}px) {
    padding: 16px 24px;
    border-bottom: none;
  }
  z-index: ${(props) => (props.isMenuOpen ? 50 : 10)};
  // The backdrop for the menu does not show up if we enable the backdrop-filter
  // for the header nav. To get around that, just set 'none'
  ${(props) => {
    if (props.isMenuOpen) {
      return null;
    }
    return `
      backdrop-filter: blur(40px);
      /**
       * Firefox desktop come with default flag to have backdrop-filter disabled
       * Firefox Android also currently has bug where backdrop-filter is not being applied
       * More info: https://bugzilla.mozilla.org/show_bug.cgi?id=1178765
       **/
      @-moz-document url-prefix() {
        background-color: rgba(0, 0, 0, 0.9);
      }
    `;
  }}
`;

const BaseLink = styled(NavLink)`
  &:hover {
    text-decoration: none;
  }
`;

// Change opacities to be read from theme.tsx?
const NavItem = styled.div<{isSelected: boolean}>`
  display: flex;
  align-items: center;
  padding: 0px 28px;
  height: 100%;
  opacity: ${(props) => (props.isSelected ? "1" : "0.48")};
  &:hover {
    opacity: ${(props) => (props.isSelected ? "0.7" : "1")}; // 0.7 --> theme.hover.opacity
  }
  @media (max-width: ${({ theme }) => theme.sizes.lg }px) {
    padding: 0px 24px 0px 24px;
  }
`;

const NavLinkText = styled(Title)`
  letter-spacing: 1.5px;
  font-size: 14px;
  line-height: 20px;
  color: black;
  @media (max-width: ${({ theme }) => theme.sizes.lg }px) {
    font-size: 14px;
  }
`;

const HeaderAbsoluteContainer = styled.div`
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  @media (max-width: ${({ theme }) => theme.sizes.md}px) {
    display: none;
  }
`;

const HeaderButtonContainer = styled.div`
  display: flex;
  margin-right: 8px;
  z-index: 1;
`;

const LinksContainer = styled.div`
  display: flex;
`;

const LogoContainer = styled.div`
  padding-left: 40px;
  margin-right: auto;
  z-index: 1000;
  @media (max-width: ${({ theme }) => theme.sizes.lg}px) {
    padding-left: 0;
  }
`;

const [metaMask, hooks] = initializeConnector<MetaMask>((actions) => new MetaMask(actions));

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const home = useMatch({ path: "/"});
  const browse = useMatch({ path: "/browse"});
  const other = useMatch({ path: "/other"});
  const active = hooks.useIsActive();

  const onToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // const theme = useTheme();

  const renderLinkItem = (
    title: string,
    to: string,
    isSelected: boolean,
  ) => {
    return (
      <BaseLink
        to={to}
        onClick={() => {setIsMenuOpen(false);}}
      >
        <NavItem isSelected={isSelected}>
          <NavLinkText>{title}</NavLinkText>
        </NavItem>
      </BaseLink>
    );
  };

  return (
    <HeaderContainer isMenuOpen={isMenuOpen} className="d-flex align-items-center">

      <LogoContainer>
        {/*<HeaderLogo />*/}
      </LogoContainer>

      <HeaderAbsoluteContainer>
        <LinksContainer>
          {renderLinkItem("Home", "/", Boolean(home))}
          {renderLinkItem("Browse", "/browse", Boolean(browse))}
          {renderLinkItem("Other", "/other", Boolean(other))}
        </LinksContainer>
      </HeaderAbsoluteContainer>

      {active && (
        <HeaderButtonContainer>
          {"Network Button"}
        </HeaderButtonContainer>
      )}

      {/*active && (
        <HeaderButtonContainer>
          {"Balance?"}
        </HeaderButtonContainer>
      )/*}

      {/*<Status connector={metaMask} hooks={hooks}/>*/}
      <AccountStatus connector={metaMask} hooks={hooks}/>

    </HeaderContainer>
  );
};