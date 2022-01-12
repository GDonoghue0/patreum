import React, { RefAttributes, useState, useCallback } from "react";
import styled, { css } from 'styled-components/macro'
import { Modal } from "react-bootstrap";
import { Web3ReactHooks } from '@web3-react/core'
import { initializeConnector } from '@web3-react/core'
import type { Connector } from '@web3-react/types'
import { MetaMask } from '@web3-react/metamask'
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import { Modal as BootstrapModal } from "react-bootstrap";
import { createGlobalState } from "react-hooks-global-state";

interface ConnectorButtonProps {
  status: "normal" | "initializing" | "neglected" | "connected";
}

export const BaseButton = styled.div`
  display: flex;
  border-radius: ${({ theme }) => theme.border.radius};
  padding: 12px 16px;
`;

const ConnectorButton = styled(BaseButton)<ConnectorButtonProps>`
  background-color: ${({ theme }) => theme.colors.background.three};
  align-items: center;
  width: 100%;
  &:hover {
    opacity: ${({ theme }) => theme.hover.opacity};
  }
  ${(props) => {
    switch (props.status) {
      case "connected":
        return css`
          border: ${({ theme }) => theme.border.width} ${({ theme }) => theme.border.style} ${({ theme }) => theme.colors.green};
        `;
      case "neglected":
        return `
          opacity: 0.24;
          &:hover {
            opacity: 0.24;
          }
        `;
      case "initializing":
        return css`
          border: ${({ theme }) => theme.border.width} ${({ theme }) => theme.border.style} ${({ theme }) => theme.colors.green};
          &:hover {
            opacity: 1;
          }
        `;
      default:
        return ``;
    }
  }}
`;


const MenuButtonContainer = styled.div<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  z-index: 100;
`;

const Line = styled.div<{ size: number; isOpen: boolean; color: string }>`
  height: ${(props) => `calc(${props.size}px * 0.1)`};
  width: ${(props) => props.size}px;
  background-color: ${(props) => props.color};
  transition: 0.2s all ease-in;
`;

const LineTop = styled(Line)`
  ${(props) => `
    margin-top: calc(${props.size}px * (0.8/3));
    transform: ${
      props.isOpen
        ? `
      translateY(calc(${props.size}px * (0.5 - 0.05 - (0.8/3)))) rotate(-45deg)
    `
        : `
      none
    `
    };
  `}
`;
const LineBottom = styled(Line)`
  ${(props) => `
    margin-top: calc(${props.size}px * (0.8/3));
    transform: ${
      props.isOpen
        ? `
      translateY(calc(${props.size}px * (0.5 - 0.05 - (0.8/3)) * -1)) rotate(45deg)
    `
        : `
      none
    `
    };
  `}
`;

interface MenuButtonProps {
  size?: number;
  color?: string;
  isOpen: boolean;
  onToggle: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  size = 24,
  color = "white",
  isOpen,
  onToggle,
}) => (
  <MenuButtonContainer onClick={onToggle} size={size}>
    <LineTop size={size} isOpen={isOpen} color={color} />
    <LineBottom size={size} isOpen={isOpen} color={color} />
  </MenuButtonContainer>
);

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

export const BaseModal = styled(BootstrapModal)<{ backgroundColor?: string }>`
  backdrop-filter: blur(80px);
  /**
   * Firefox desktop come with default flag to have backdrop-filter disabled
   * Firefox Android also currently has bug where backdrop-filter is not being applied
   * More info: https://bugzilla.mozilla.org/show_bug.cgi?id=1178765
   **/
  @-moz-document url-prefix() {
    background-color: rgba(0, 0, 0, 0.9);
  }
  .modal-content {
     ${({ theme }) => theme.colors.background.two};
    border: none;
    border-radius: ${({ theme }) => theme.border.radius};
    button.close {
      color: white;
      opacity: 1;
      &:hover {
        opacity: ${({ theme }) => theme.hover.opacity};
      }
    }
  }
`;

export const BaseModalHeader = styled(BootstrapModal.Header)`
  border-bottom: unset;
`;

const StyledModal = styled(BaseModal)<{
  height: number;
  maxWidth: number;
  theme?: string;
}>`
  .modal-dialog {
    width: 95vw;
    max-width: ${(props) => props.maxWidth}px;
    margin-left: auto;
    margin-right: auto;
  }
  .modal-content {
    transition: min-height 0.25s;
    min-height: ${(props) => props.height}px;
    overflow: hidden;
    ${(props) =>
      props.theme
        ? `
            background-color: ${props.theme}0A;
          `
        : ``}}
  }
`;

const BackButton = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 48px;
  z-index: 2;
  & > i {
    color: #ffffff;
  }
`;

const CloseButton = styled.div<{ theme?: string }>`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: ${({theme}) => theme.border.width} ${({theme}) =>theme.border.style}
    ${(props) => (props.theme ? css`${({theme}) => theme.colors.primaryText}0A` : css`${({ theme }) => theme.colors.border}`)};
  border-radius: 48px;
  color: ${({theme}) => theme.colors.text};
  z-index: 2;
`;

const ModalContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: -32px;
  left: 0;
  height: calc(100% + 32px);
  width: 100%;
  padding: 16px;
`;

const ModalHeaderBackground = styled.div`
  background: ${({ theme }) => theme.colors.background.two};
  height: 72px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

export const BaseModalContentColumn = styled.div<{
  marginTop?: number | "auto";
}>`
  display: flex;
  justify-content: center;
  z-index: 1;
  margin-top: ${(props) =>
    props.marginTop === "auto"
      ? props.marginTop
      : `${props.marginTop === undefined ? 24 : props.marginTop}px`};
`;

// ? props.color : theme.colors.primaryText)};
export const Title = styled.span<{
  color?: string;
  fontSize?: number;
  lineHeight?: number;
}>`
  color: ${(props) => (props.color)};
  font-family: VCR, sans-serif;
  font-style: normal;
  font-weight: normal;
  text-transform: uppercase;
  ${(props) => (props.fontSize ? `font-size: ${props.fontSize}px;` : ``)}
  ${(props) => (props.lineHeight ? `line-height: ${props.lineHeight}px;` : ``)}
`;

const ConnectorButtonText = styled(Title)`
  margin-left: 16px;
`;

const IndicatorContainer = styled.div`
  margin-left: auto;
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



interface BasicModalProps {
  show: boolean;
  height: number;
  maxWidth?: number;
  onClose: () => void;
  closeButton?: boolean;
  backButton?: {
    onClick: () => void;
  };
  children: JSX.Element;
  animationProps?: HTMLMotionProps<"div"> & RefAttributes<HTMLDivElement>;
  headerBackground?: boolean;
  backgroundColor?: string;
  theme?: string;
}

export const BasicModal: React.FC<BasicModalProps> = ({
  show,
  height,
  maxWidth = 343,
  onClose,
  closeButton = true,
  backButton,
  children,
  animationProps = {},
  headerBackground = false,
  backgroundColor,
  theme,
}) => (
  <StyledModal
    show={show}
    centered
    height={height}
    maxWidth={maxWidth}
    onHide={onClose}
    backdrop
    theme={theme}
    backgroundColor={backgroundColor}
  >
    <BaseModalHeader>
      {/* Back button */}
      {backButton && (
        <BackButton role="button" onClick={backButton.onClick}>
          <i className="fas fa-arrow-left" />
        </BackButton>
      )}

      {/* Close Button */}
      {closeButton && (
        <CloseButton role="button" onClick={onClose}>
          <MenuButton isOpen onToggle={onClose} size={20} color="#FFFFFFA3" />
        </CloseButton>
      )}
    </BaseModalHeader>

    <Modal.Body>
      <AnimatePresence initial={false}>
        <ModalContent {...animationProps}>
          {children}
          {headerBackground && <ModalHeaderBackground />}
        </ModalContent>
      </AnimatePresence>
    </Modal.Body>
  </StyledModal>
);

export type connectorType = "metamask" | "walletConnect" | "walletLink";

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

  const [show, setShow] = useConnectWalletModal();
  const [connectingConnector, setConnectingConnector] = useState<connectorType>();


  const onClose = useCallback(() => {
    setShow(false);
  }, [setShow]);

  const getConnectorStatus = useCallback(
    (connectorType: connectorType) => {
      // If connected, check if current button is connected
      if (active) {
        if (connector instanceof MetaMask) return "connected";
      }

      // Check initializing status
      switch (connectingConnector) {
        case undefined:
          return "normal";
        case connectorType:
          return "initializing";
      }
      return "neglected";
    },
    [active, connector, connectingConnector]
  );

  const handleConnect = useCallback(
    async (type: connectorType) => {
      setConnectingConnector(type);

      // // Disconnect wallet if currently connected already
      // if (active && connector instanceof WalletConnectConnector)
      //   await connector.close();

      // await activateWeb3(MetaMask);
      connector.activate();
      setConnectingConnector(undefined);
    },
    [connector, active]
  );

  const renderConnectorButton = useCallback(
    (type: connectorType, title: string) => (
      <ConnectorButton
        role="button"
        onClick={() => handleConnect(type)}
        status={getConnectorStatus(type)}
      >
        {/*{renderConnectorIcon(type)}*/}
        {/*<ConnectorButtonText>*/}
          {/*{connectingConnector === type ? initializingText : title}*/}
        {/*</ConnectorButtonText>*/}
        {getConnectorStatus(type) === "connected" && (
          <IndicatorContainer>
            <Indicator connected={active} />
          </IndicatorContainer>
        )}
      </ConnectorButton>
    ),
    [
      active,
      connectingConnector,
      getConnectorStatus,
      // initializingText,
      // renderConnectorIcon,
      handleConnect,
    ]
  );

  return (
    <BasicModal show={show} onClose={onClose} height={354} maxWidth={500}>
      <>
        <BaseModalContentColumn marginTop={8}>
          <Title>CONNECT WALLET</Title>
        </BaseModalContentColumn>
        <BaseModalContentColumn>
          {renderConnectorButton("metamask", "METAMASK")}
        </BaseModalContentColumn>
       {/* <BaseModalContentColumn marginTop={16}>
          {renderConnectorButton("walletConnect", "WALLET CONNECT")}
        </BaseModalContentColumn>
        <BaseModalContentColumn marginTop={16}>
          {renderConnectorButton("walletLink", "COINBASE WALLET")}
        </BaseModalContentColumn>
        <BaseModalContentColumn marginTop={16}>
          <LearnMoreLink
            to="https://ethereum.org/en/wallets/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-100"
          >
            <LearnMoreText>Learn more about wallets</LearnMoreText>
            <LearnMoreArrow>&#8594;</LearnMoreArrow>
          </LearnMoreLink>
        </BaseModalContentColumn>*/}
      </>
    </BasicModal>
  )


}