import styled, { css } from 'styled-components/macro'
import { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'
import { useState, useEffect, useCallback } from 'react'
import { Web3ReactHooks } from '@web3-react/core'
import { initializeConnector } from '@web3-react/core'
import type { Connector } from '@web3-react/types'
import { MetaMask } from '@web3-react/metamask'
import { AnimatePresence, motion } from "framer";
import useConnectWalletModal from "../../hooks/useConnectWalletModal"
import { Indicator, Title } from '../Common'

const [metaMask, hooks] = initializeConnector<MetaMask>((actions) => new MetaMask(actions));

interface AccountStatusVariantProps {
  showInvestButton?: boolean;
}

interface WalletStatusProps {
  connected: boolean;
}

type WalletButtonProps = AccountStatusVariantProps & WalletStatusProps;

const Container = styled.div<{ connected: boolean }>`
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 4px;
  margin-right: 8px;
  overflow: hidden;
  ${({ connected }) => css`${({ theme }) => connected ? theme.colors.green : theme.colors.red}`}
`;

const AccountStatusContainer = styled.div<AccountStatusVariantProps>`
  flex-wrap: wrap;
  flex-direction: column;
  display: flex;
`;

const WalletContainer = styled.div<AccountStatusVariantProps>`
  justify-content: center;
  align-items: center;
  display: flex;
  padding-right: 40px;
  z-index: 1000;
  position: relative;
  @media (max-width: ${({ theme }) => theme.sizes.md}px) {
    display: none;
  }
`;

const WalletButton = styled.div<{ connected: boolean }>`
  display: flex;
  border-radius: ${({ theme }) => theme.border.radius};
  padding: 12px 16px;
  ${({ connected }) =>
    css`
      background-color: ${({ theme }) => connected ? theme.background.two : `${theme.colors.green}14`};
  `}
  align-items: center;
  height: fit-content;
  &:hover {
    opacity: ${({ theme }) => theme.hover.opacity};
  }
`;

const WalletButtonText = styled(Title)<{ connected: boolean }>`
  font-size: 14px;
  line-height: 20px;
  @media (max-width: ${({ theme }) => theme.sizes.md}px) {
    font-size: 16px;
  }
  @media (max-width: 350px) {
    font-size: 13px;
  }
  ${({ connected }) =>
    css`
      color: ${({ theme }) => connected ? theme.colors.grey : theme.colors.black};
  `}
`;

interface MenuStateProps {
  isMenuOpen: boolean;
}

const WalletMenu = styled(motion.div)<MenuStateProps>`
  ${(props) =>
    props.isMenuOpen
      ? css`
          position: absolute;
          right: 40px;
          top: 64px;
          width: fit-content;
          background-color: ${({ theme }) => theme.colors.background.two};
          border-radius: ${8}px;
        `
      : `
          display: none;
        `}
  @media (max-width: ${({ theme }) => theme.sizes.md}px) {
    display: none;
  }
`;

const MenuItem = styled.div`
  padding: 8px 16px;
  padding-right: 38px;
  opacity: 1;
  display: flex;
  align-items: center;
  &:first-child {
    padding-top: 16px;
  }
  &:last-child {
    padding-bottom: 16px;
  }
  &:hover {
    span {
      color: ${({ theme }) => theme.colors.primaryText};
    }
  }
  @media (max-width: ${({ theme }) => theme.sizes.md}px) {
    margin: unset;
    && {
      padding: 28px;
    }
  }
`;

const MenuItemText = styled(Title)`
  color: ${({ theme }) => theme.colors.primaryText}A3;
  white-space: nowrap;
  font-size: 14px;
  line-height: 20px;
  @media (max-width: ${({ theme }) => theme.sizes.md}px) {
    font-size: 24px;
  }
`;

// function Web3Status({
//   connector,
//   hooks: { useChainId, useAccounts, useENSNames, useError, useIsActive, useProvider },
// }: {
//   connector: Connector
//   hooks: Web3ReactHooks
// }) {
//   const accounts = useAccounts();
//   const error = useError();
//   const ENSNames = useENSNames();

//   if (accounts) {
//     return (

//     )
//   }

// }

export default function AccountStatus({
  connector,
  hooks: { useChainId, useAccounts, useENSNames, useError, useIsActive, useProvider, useIsActivating },
}: {
  connector: Connector
  hooks: Web3ReactHooks
}) {
  const provider = useProvider(true ? 'any' : undefined);
  const active = useIsActive();
  const accounts = useAccounts();
  const ENSNames = useENSNames(provider);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const account = accounts?.[0];
  const ensData = ENSNames?.[0];
  const [, setShowConnectModal] = useConnectWalletModal();

  const chainId = useChainId()
  const activating = useIsActivating()
  const error = useError()

  const onToggleMenu = () => {
    setIsMenuOpen((open) => !open);
  };

  const handleButtonClick = useCallback(async () => {
    if (active) {
      onToggleMenu();
      return;
    }

    setShowConnectModal(true);
  }, [active, onToggleMenu, setShowConnectModal]);

  const renderButtonContent = () => 
    active && account ? (
      <>
        <Indicator connected={active} />
        <WalletButtonText connected={active}>
          {ensData || (account)}{" "}
        </WalletButtonText>
      </>
    ) : (
      <WalletButtonText connected={active}>CONNECT WALLET</WalletButtonText>
    );

  const renderMenuItem = (
    title: string,
    onClick?: () => void,
    extra?: React.ReactNode
  ) => {
    return (
      <MenuItem onClick={onClick} role="button">
        <MenuItemText>{title}</MenuItemText>
        {extra}
      </MenuItem>
    );
  };

  const exampleFunction = () => {
    console.log('hello')
  }


  return (
    <AccountStatusContainer>
      <WalletContainer>
         <WalletButton connected={active} role="button" onClick={handleButtonClick}>
          {renderButtonContent()}
        </WalletButton>
        <AnimatePresence>
          <WalletMenu
            key={isMenuOpen.toString()}
            isMenuOpen={isMenuOpen}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 20,
            }}
            transition={{
              type: "keyframes",
              duration: 0.2,
            }}
          >
            {/*renderMenuItem(
              copyState === "hidden" ? "COPY ADDRESS" : "ADDRESS COPIED",
              handleCopyAddress,
              renderCopiedButton()
            )*/}
            {renderMenuItem("Menu Item One", exampleFunction)}
            {renderMenuItem("Menu Item Two")}
          </WalletMenu>
        </AnimatePresence>
      </WalletContainer>
    </AccountStatusContainer>
  );
};


