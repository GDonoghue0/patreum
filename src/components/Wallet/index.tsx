import styled, { css } from 'styled-components/macro'
import { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'
import { useState, useEffect, useCallback } from 'react'
import { Web3ReactHooks } from '@web3-react/core'
import { initializeConnector } from '@web3-react/core'
import type { Connector } from '@web3-react/types'
import { MetaMask } from '@web3-react/metamask'
import { AnimatePresence, motion } from "framer";

import { createGlobalState } from "react-hooks-global-state";


const [metaMask, hooks] = initializeConnector<MetaMask>((actions) => new MetaMask(actions));

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
      {balances?.[0] ? `(Ξ${formatEther(balances[0]).slice(0,6)})` : null}
    </div>
  )
}

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

interface AccountStatusVariantProps {
  showInvestButton?: boolean;
}

interface WalletStatusProps {
  connected: boolean;
}

type WalletButtonProps = AccountStatusVariantProps & WalletStatusProps;

export const Title = styled.span<{
  color?: string;
  fontSize?: number;
  lineHeight?: number;
  letterSpacing?: number;
}>`
  color: ${(props) => (props.color)};
  font-family: VCR, sans-serif;
  font-style: normal;
  font-weight: normal;
  text-transform: uppercase;
  ${(props) => (props.fontSize ? `font-size: ${props.fontSize}px;` : ``)}
  ${(props) => (props.lineHeight ? `line-height: ${props.lineHeight}px;` : ``)}
  ${(props) => props.letterSpacing ? `letter-spacing: ${props.letterSpacing}px;` : ""}
`;

const BaseButton = styled.div`
  display: flex;
  border-radius: ${({ theme }) => theme.border.radius};
  padding: 12px 16px;
`;

const Container = styled.div<{ connected: boolean }>`
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 4px;
  margin-right: 8px;
  overflow: hidden;
  ${({ connected }) => css`${({ theme }) => connected ? theme.colors.green : theme.colors.red}`}
`;

interface IndicatorProps {
  connected: boolean;
}

const Indicator = ({ connected }: IndicatorProps) => (
  <Container connected={connected} />
);

export interface ButtonArrowIProps {
  isOpen: boolean;
  color?: string;
  fontSize?: number;
}

const ButtonArrowI = styled.i<ButtonArrowIProps>`
  transition: 0.2s all ease-out;
  transform: ${(props) => (props.isOpen ? "rotate(-180deg)" : "none")};
  ${(props) => (props.color ? `color: ${props.color};` : "")}
  ${(props) => (props.fontSize ? `font-size: ${props.fontSize}px` : "")};
`;

type ButtonArrowProps = React.HTMLAttributes<HTMLImageElement> &
  ButtonArrowIProps;

const ButtonArrow: React.FC<ButtonArrowProps> = ({ className, ...props }) => (
  <ButtonArrowI className={`fas fa-chevron-down ${className}`} {...props} />
);

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

const WalletButton = styled(BaseButton)<{ connected: boolean }>`
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
  ${(connected) => {
    if (connected) return null;
    return css`color: ${({ theme }) => theme.colors.green}`;
  }}
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

interface GlobalStore {
  // pendingTransactions: PendingTransaction[];
  showConnectWallet: boolean;

  gasPrice: string;
  // desktopView: DesktopViewType;
  // airdropInfo: AirdropInfoData | undefined;
  // vaultPositionModal: {
  //   show: boolean;
  //   vaultOption?: VaultOptions;
  //   vaultVersion: VaultVersion;
  // };
  notificationLastReadTimestamp?: number;
}

export const initialState: GlobalStore = {
  // pendingTransactions: [],
  showConnectWallet: false,
  gasPrice: "",
  // desktopView: "grid",
  // airdropInfo: undefined,
  // vaultPositionModal: {
  //   show: false,
  //   vaultVersion: "v1" as VaultVersion,
  // },
  notificationLastReadTimestamp: undefined,
};

const useConnectWalletModal: () => [
  boolean,
  (u: React.SetStateAction<boolean>) => void
] = () => {
  const [showConnectWallet, setShowConnectWallet] = useGlobalState(
    "showConnectWallet"
  );
  return [showConnectWallet, setShowConnectWallet];
};

export const { useGlobalState } = createGlobalState(initialState);


export default function AccountStatus({
  connector,
  hooks: { useChainId, useAccounts, useENSNames, useError, useIsActive, useProvider },
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


  const onToggleMenu = () => {
    setIsMenuOpen((open) => !open);
  };

  const handleButtonClick = useCallback(async () => {
    if (active) {
      onToggleMenu();
      return;
    }
    console.log('HERE')

    setShowConnectModal(true);
  }, [active, onToggleMenu, setShowConnectModal]);

  const renderButtonContent = () => 
    active && account ? (
      <>
        <Indicator connected={active} />
        <WalletButtonText connected={active}>
          {ensData || (account)}{" "}
          <ButtonArrow isOpen={isMenuOpen} />
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
            {renderMenuItem("Menu Item One")}
            {renderMenuItem("Menu Item Two")}
          </WalletMenu>
        </AnimatePresence>
      </WalletContainer>
    </AccountStatusContainer>
  );
};


