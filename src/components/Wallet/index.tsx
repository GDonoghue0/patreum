import styled from 'styled-components/macro'
import { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'
import { useState, useEffect, useCallback } from 'react'
import { Web3ReactHooks } from '@web3-react/core'
import { initializeConnector } from '@web3-react/core'
import type { Connector } from '@web3-react/types'
import { MetaMask } from '@web3-react/metamask'

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

const colors = {
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
  background-color: ${(props) => (props.connected ? colors.green : colors.red)};
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

const WalletButton = styled(BaseButton)<WalletButtonProps>`
  background-color: ${(props) => props.connected ? colors.background.two : `${colors.green}14`};
  align-items: center;
  height: fit-content;
  &:hover {
    opacity: ${({ theme }) => theme.hover.opacity};
  }
`;

const WalletButtonText = styled(Title)<WalletStatusProps>`
  font-size: 14px;
  line-height: 20px;
  @media (max-width: ${({ theme }) => theme.sizes.md}px) {
    font-size: 16px;
  }
  @media (max-width: 350px) {
    font-size: 13px;
  }
  ${(props) => {
    if (props.connected) return null;
    return `color: ${colors.green}`;
  }}
`;


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

  const onToggleMenu = useCallback(() => {
    setIsMenuOpen((open) => !open);
  }, []);

  const handleButtonClick = useCallback(async () => {
    if (active) {
      onToggleMenu();
      return;
    }

    //setShowConnectModal(true);
  }, [active, onToggleMenu]);//, setShowConnectModal]);

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


  return (
    <AccountStatusContainer>
      <WalletContainer>
         <WalletButton
          //variant={variant}
          //showInvestButton={vault !== undefined}
          connected={active}
          role="button"
          onClick={handleButtonClick}
        >
          {renderButtonContent()}
        </WalletButton>
      </WalletContainer>
    </AccountStatusContainer>
  );
};


