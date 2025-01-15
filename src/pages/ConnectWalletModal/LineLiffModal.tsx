import React from 'react'
import styled from 'styled-components'
import { X, MessageCircle } from 'react-feather'
import { useLiff } from 'pages/LiffProvider'
import { LineLiffConnectButton } from './LineLiffConnectButton'
import LineNextLogo from 'assets/images/linenext-green-logo.png'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #666;

  &:hover {
    color: #333;
  }
`

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
`

const Subtitle = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 2rem;
  text-align: center;
`

export const LineButton = styled.button`
  background-color: #00b900;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px;
  min-width: 280px;
  width: 100%;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 1rem;

  &:hover {
    background-color: #00a000;
  }

  &:disabled {
    background-color: #e2e2f1;
    cursor: not-allowed;
  }
`

const OKXButton = styled.button`
  background-color: #f5f5f5;
  color: #333;
  border: none;
  border-radius: 6px;
  padding: 12px;
  width: 100%;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #e8e8e8;
  }
`

export const LineLiffModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null
  const { isLiffBrowser } = useLiff()

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <X size={20} />
        </CloseButton>
        <img src={LineNextLogo} alt="line-next-logo" />

        <Title>Connect Wallet</Title>
        {isLiffBrowser ? (
          <Subtitle>Connect Mini Dapp to LINE</Subtitle>
        ) : (
          <Subtitle>Connect Mini Dapp to Dapp Portal Wallet</Subtitle>
        )}

        <LineLiffConnectButton onClose={onClose}></LineLiffConnectButton>
      </ModalContent>
    </ModalOverlay>
  )
}
