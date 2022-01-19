import React, { RefAttributes, useState, useCallback } from "react";
import { Modal } from "react-bootstrap";
import { Modal as BootstrapModal } from "react-bootstrap";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import styled, { css } from 'styled-components/macro'

type IconProps = React.SVGAttributes<SVGElement>;

export const MetamaskIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 397 355" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g fill="none" fillRule="evenodd" transform="translate(-1 -1)">
      <path
        d="m114.622644 327.195472 52.004717 13.810198v-18.05949l4.245283-4.249292h29.716982v21.246459 14.872523h-31.839624l-39.268868-16.997169z"
        fill="#cdbdb2"
      />
      <path
        d="m199.528305 327.195472 50.943397 13.810198v-18.05949l4.245283-4.249292h29.716981v21.246459 14.872523h-31.839623l-39.268868-16.997169z"
        fill="#cdbdb2"
        transform="matrix(-1 0 0 1 483.96227 0)"
      />
      <path
        d="m170.872644 287.889523-4.245283 35.056657 5.306604-4.249292h55.18868l6.367925 4.249292-4.245284-35.056657-8.490565-5.311615-42.452832 1.062323z"
        fill="#393939"
      />
      <path
        d="m142.216984 50.9915022 25.471698 59.4900858 11.674528 173.158643h41.391511l12.735849-173.158643 23.349056-59.4900858z"
        fill="#f89c35"
      />
      <path
        d="m30.7783023 181.657226-29.71698153 86.048161 74.29245393-4.249293h47.7594343v-37.181303l-2.122641-76.487253-10.613208 8.498583z"
        fill="#f89d35"
      />
      <path
        d="m87.0283032 191.218134 87.0283028 2.124646-9.551886 44.617563-41.391511-10.623229z"
        fill="#d87c30"
      />
      <path
        d="m87.0283032 192.280457 36.0849058 33.994334v33.994334z"
        fill="#ea8d3a"
      />
      <path
        d="m123.113209 227.337114 42.452831 10.623229 13.79717 45.679888-9.551886 5.311615-46.698115-27.620398z"
        fill="#f89d35"
      />
      <path
        d="m123.113209 261.331448-8.490565 65.864024 56.25-39.305949z"
        fill="#eb8f35"
      />
      <path
        d="m174.056606 193.34278 5.306604 90.297451-15.919812-46.211049z"
        fill="#ea8e3a"
      />
      <path
        d="m74.2924539 262.393771 48.8207551-1.062323-8.490565 65.864024z"
        fill="#d87c30"
      />
      <path
        d="m24.4103777 355.878193 90.2122663-28.682721-40.3301901-64.801701-73.23113313 5.311616z"
        fill="#eb8f35"
      />
      <path
        d="m167.688682 110.481588-45.636793 38.243627-35.0235858 42.492919 87.0283028 3.186969z"
        fill="#e8821e"
      />
      <path
        d="m114.622644 327.195472 56.25-39.305949-4.245283 33.994334v19.121813l-38.207548-7.43626z"
        fill="#dfcec3"
      />
      <path
        d="m229.245286 327.195472 55.18868-39.305949-4.245283 33.994334v19.121813l-38.207548-7.43626z"
        fill="#dfcec3"
        transform="matrix(-1 0 0 1 513.679252 0)"
      />
      <path
        d="m132.665096 212.464593-11.674528 24.433427 41.39151-10.623229z"
        fill="#393939"
        transform="matrix(-1 0 0 1 283.372646 0)"
      />
      <path
        d="m23.349057 1.06232296 144.339625 109.41926504-24.410378-59.4900858z"
        fill="#e88f35"
      />
      <path
        d="m23.349057 1.06232296-19.10377392 58.42776294 10.61320772 63.7393781-7.42924541 4.249292 10.61320771 9.560906-8.49056617 7.436261 11.67452847 10.623229-7.4292454 6.373938 16.9811323 21.246459 79.5990577-24.433428c38.915096-31.161473 58.018869-47.096318 57.311322-47.804533-.707548-.708215-48.820756-37.1813036-144.339625-109.41926504z"
        fill="#8e5a30"
      />
      <g transform="matrix(-1 0 0 1 399.056611 0)">
        <path
          d="m30.7783023 181.657226-29.71698153 86.048161 74.29245393-4.249293h47.7594343v-37.181303l-2.122641-76.487253-10.613208 8.498583z"
          fill="#f89d35"
        />
        <path
          d="m87.0283032 191.218134 87.0283028 2.124646-9.551886 44.617563-41.391511-10.623229z"
          fill="#d87c30"
        />
        <path
          d="m87.0283032 192.280457 36.0849058 33.994334v33.994334z"
          fill="#ea8d3a"
        />
        <path
          d="m123.113209 227.337114 42.452831 10.623229 13.79717 45.679888-9.551886 5.311615-46.698115-27.620398z"
          fill="#f89d35"
        />
        <path
          d="m123.113209 261.331448-8.490565 65.864024 55.18868-38.243626z"
          fill="#eb8f35"
        />
        <path
          d="m174.056606 193.34278 5.306604 90.297451-15.919812-46.211049z"
          fill="#ea8e3a"
        />
        <path
          d="m74.2924539 262.393771 48.8207551-1.062323-8.490565 65.864024z"
          fill="#d87c30"
        />
        <path
          d="m24.4103777 355.878193 90.2122663-28.682721-40.3301901-64.801701-73.23113313 5.311616z"
          fill="#eb8f35"
        />
        <path
          d="m167.688682 110.481588-45.636793 38.243627-35.0235858 42.492919 87.0283028 3.186969z"
          fill="#e8821e"
        />
        <path
          d="m132.665096 212.464593-11.674528 24.433427 41.39151-10.623229z"
          fill="#393939"
          transform="matrix(-1 0 0 1 283.372646 0)"
        />
        <path
          d="m23.349057 1.06232296 144.339625 109.41926504-24.410378-59.4900858z"
          fill="#e88f35"
        />
        <path
          d="m23.349057 1.06232296-19.10377392 58.42776294 10.61320772 63.7393781-7.42924541 4.249292 10.61320771 9.560906-8.49056617 7.436261 11.67452847 10.623229-7.4292454 6.373938 16.9811323 21.246459 79.5990577-24.433428c38.915096-31.161473 58.018869-47.096318 57.311322-47.804533-.707548-.708215-48.820756-37.1813036-144.339625-109.41926504z"
          fill="#8e5a30"
        />
      </g>
    </g>
  </svg>
);


interface ConnectorButtonProps {
  status: "normal" | "initializing" | "neglected" | "connected";
}

export const BaseButton = styled.div`
  display: flex;
  border-radius: ${({ theme }) => theme.border.radius};
  padding: 12px 16px;
`;

export const ConnectorButton = styled(BaseButton)<ConnectorButtonProps>`
  background-color: ${({ theme }) => theme.colors.background.three};
  align-items: center;
  width: 75%;
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

export const ConnectorButtonText = styled(Title)`
  margin-left: 16px;
  color: grey;
`;

export const IndicatorContainer = styled.div`
  margin-left: auto;
`;

const Container = styled.div<{ connected: boolean }>`
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 4px;
  margin-right: 8px;
  overflow: hidden;
  ${({ connected }) => css`background-color: ${({ theme }) => connected ? theme.colors.green : theme.colors.red}`}
`;

interface IndicatorProps {
  connected: boolean;
}

export const Indicator = ({ connected }: IndicatorProps) => (
  <Container connected={connected} />
);


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
          <MenuButton isOpen onToggle={onClose} size={20} color="#000000A3" />
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