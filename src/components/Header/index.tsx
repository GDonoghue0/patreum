import styled from 'styled-components/macro'
import { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Web3ReactHooks } from '@web3-react/core'
import { initializeConnector } from '@web3-react/core'
import type { Connector } from '@web3-react/types'
import { MetaMask } from '@web3-react/metamask'
import useTheme from '../../hooks/useTheme'

import {ReactComponent as Logo} from "../logo.svg";

const HeaderContainer = styled.div<{isMenuOpen: boolean}>`
  height: ${({theme}) => theme.header.height}px;
  background-color: ${({ theme }) => theme.colors.bg5};
  position: sticky;
  display: grid;
  grid-template-columns: 120px 0.5fr 120px;
  align-items: center;
  justify-content: center;
  top: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
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

const HeaderFrame = styled.div<{ showBackground: boolean }>`
  display: grid;
  grid-template-columns: 120px 1fr 120px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  padding: 1rem;
  z-index: 21;
  position: relative;
  /* Background slide effect on scroll. */
  background-image: ${({ theme }) => `linear-gradient(to bottom, transparent 50%, ${theme.bg0} 50% )}}`};
  background-position: ${({ showBackground }) => (showBackground ? '0 -100%' : '0 0')};
  background-size: 100% 200%;
  box-shadow: 0px 0px 0px 1px ${({ theme, showBackground }) => (showBackground ? theme.bg2 : 'transparent;')};
  transition: background-position 0.1s, box-shadow 0.1s;
  background-blend-mode: hard-light;
`

const HeaderLinks = styled.div`
  justify-self: center;
  background-color: ${({ theme }) => theme.colors.bg4};
  border: 1px solid ${({ theme }) => theme.colors.bg0};
  width: fit-content;
  padding: 8px;
  border-radius: 16px;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  overflow: auto;
  align-items: center;
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
  &:not(:first-child) {
      margin-left: 0.5em;
  }
`

const StyledNavLink = styled(NavLink)` // Add CSS for hover and active
  display: flex;
  flex-flow: row nowrap;
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text1};
  font-size: 1rem;
  font-weight: 500;
  padding: 8px 12px;
  word-break: break-word;
  overflow: hidden;
  white-space: nowrap;
  width: fit-content;
  :hover {
    opacity: 0.5,
  },
  :focus {
    color: ${({ theme }) => theme.text1};
  }
`

const LogoIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
  position: relative;
`

const LogoContainer = styled.div`
  display: flex;
  border-radius: 48px;
`;

// const HeaderLogo = () => {
//   return (
//     <>
//       <LogoContainer>
//         <NavLink to="/">
//           <img src={logo} className="App-logo" alt="logo" height="40px" />
//         </NavLink>
//       </LogoContainer>
//     </>
//   );
// };

const [metaMask, hooks] = initializeConnector<MetaMask>((actions) => new MetaMask(actions));

function Status({
  connector,
  hooks: { useChainId, useAccounts, useError },
}: {
  connector: Connector
  hooks: Web3ReactHooks
}) {
  const chainId = useChainId()
  const accounts = useAccounts()
  const error = useError()

  const connected = Boolean(chainId && accounts)

  return (
    <div>
      <b>{'MetaMask'}</b>
      <br />
      {error ? (
        <>
          🛑 {error.name ?? 'Error'}: {error.message}
        </>
      ) : connected ? (
        <Accounts useAnyNetwork={true} hooks={hooks}/>
      ) : (
        <>⚠️ Disconnected</>
      )}
    </div>
  )
}

function useBalances(
  provider?: ReturnType<Web3ReactHooks['useProvider']>,
  accounts?: string[]
): BigNumber[] | undefined {
  const [balances, setBalances] = useState<BigNumber[] | undefined>()

  useEffect(() => {
    if (provider && accounts?.length) {
      let stale = false

      void Promise.all(accounts.map((account) => provider.getBalance(account))).then((balances) => {
        if (!stale) {
          setBalances(balances)
        }
      })

      return () => {
        stale = true
        setBalances(undefined)
      }
    }
  }, [provider, accounts])

  return balances
}

function Accounts({
  useAnyNetwork,
  hooks: { useAccounts, useProvider, useENSNames },
}: {
  useAnyNetwork: boolean
  hooks: Web3ReactHooks
}) {
  const provider = useProvider(useAnyNetwork ? 'any' : undefined)
  const accounts = useAccounts()
  const ENSNames = useENSNames(provider)

  const balances = useBalances(provider, accounts)

  return (
    <div>
      <b>{ENSNames?.[0] ?? accounts?.[0]}</b>
      <br/>
      {balances?.[0] ? ` (Ξ${formatEther(balances[0])})` : null}
    </div>
  )
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const theme = useTheme();
  console.log(theme);

  return (
    <HeaderContainer isMenuOpen={isMenuOpen}>
       {/*<LogoIcon>*/}
          {/*<Logo fill="#000" width="24px" height="100%" title="logo" />*/}
        {/*</LogoIcon>*/}
      <HeaderLinks>
        <StyledNavLink id={'home'} to={'/'}>Home</StyledNavLink>
        <StyledNavLink id={'browse'} to={'/browse'}>Browse</StyledNavLink>
      </HeaderLinks>

      <HeaderControls>
        <HeaderElement>
          {/*{"Hello"}*/}
        </HeaderElement>
      </HeaderControls>
      <div>
        <Status connector={metaMask} hooks={hooks}/>
      </div>
    </HeaderContainer>
  )
}