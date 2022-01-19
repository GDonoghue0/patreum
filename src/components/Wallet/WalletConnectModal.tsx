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
import useConnectWalletModal from '../../hooks/useConnectWalletModal'
import { 
  MetamaskIcon,
  ConnectorButton,
  ConnectorButtonText,
  Indicator,
  IndicatorContainer,
  BasicModal,
  BaseModalContentColumn,
  Title
} from '../Common'

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

  const [showConnectModal, setShowConnectModal] = useConnectWalletModal();
  const [connectingConnector, setConnectingConnector] = useState<connectorType>();


  const onClose = useCallback(() => {
    setShowConnectModal(false);
  }, [setShowConnectModal]);

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

  const initializingText = "INITIALIZING ...";
  // useTextAnimation(Boolean(connectingConnector), {
  //   texts: [
  //     "INITIALIZING",
  //     "INITIALIZING .",
  //     "INITIALIZING ..",
  //     "INITIALIZING ...",
  //   ],
  //   interval: 250,
  // });

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

  const renderConnectorIcon = useCallback((type: connectorType) => {
    switch (type) {
      case "metamask":
        return <MetamaskIcon height={40} width={40} />;
      // case "walletConnect":
      //   return <WalletConnectIcon height={40} width={40} />;
      // case "walletLink":
      //   return <StyledWalletLinkIcon height={40} width={40} />;
    }
  }, []);

  const renderConnectorButton = useCallback(
    (type: connectorType, title: string) => (
      <ConnectorButton
        role="button"
        onClick={() => handleConnect(type)}
        status={getConnectorStatus(type)}
      >
        {renderConnectorIcon(type)}
        <ConnectorButtonText>
          {connectingConnector === type ? initializingText : title}
        </ConnectorButtonText>
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
    <BasicModal show={showConnectModal} onClose={onClose} height={354} maxWidth={500}>
      <>
        <BaseModalContentColumn marginTop={24}>
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