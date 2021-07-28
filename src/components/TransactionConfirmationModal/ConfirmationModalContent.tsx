import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Text } from 'rebass'
import { CloseIcon } from '../../theme/components'
import { RowBetween } from '../Row'
import { AutoColumn } from '../Column'

const Wrapper = styled.div`
  width: 100%;
  border-radius: 24px;
  background: ${({ theme }) => theme.bgG4};
`
const Section = styled(AutoColumn)<{ inline?: boolean }>`
  padding: ${({ inline }) => (inline ? '0' : '0')};
`

const BottomSection = styled(Section)`
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`
const TitleRow = styled(RowBetween)`
  margin-top: 2.25rem;
  margin-bottom: 1.25rem;
  padding-left: 40px;
  padding-right: 40px;
`
export function ConfirmationModalContent({
  title,
  bottomContent,
  onDismiss,
  topContent,
}: {
  title: ReactNode
  onDismiss: () => void
  topContent: () => ReactNode
  bottomContent?: () => ReactNode | undefined
}) {
  const defaultTitle = () => (
    <TitleRow>
      <Text fontWeight={600} fontSize={22} lineHeight={'33px'} style={{ textTransform: 'uppercase' }}>
        {title}
      </Text>
      <CloseIcon onClick={onDismiss} />
    </TitleRow>
  )
  return (
    <Wrapper>
      <Section>
        {defaultTitle()}
        {topContent()}
      </Section>
      {bottomContent && <BottomSection gap="12px">{bottomContent()}</BottomSection>}
    </Wrapper>
  )
}
