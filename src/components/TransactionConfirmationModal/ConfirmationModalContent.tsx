import React, { ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { Text } from 'rebass'
import { CloseIcon } from '../../theme/components'
import { RowBetween, RowCenter } from '../Row'
import { AutoColumn } from '../Column'
import { Box } from 'rebass'
import { ReactComponent as ArrowLeft } from '../../assets/images/backNew.svg'

const Wrapper = styled.div`
  width: 550px;
  border-radius: 4px;
  background: ${({ theme }) => theme.bg25};
  padding: 10px 30px 35px 30px;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      padding: 16px;
  `};
`

const Section = styled(AutoColumn)<{ inline?: boolean }>`
  padding: ${({ inline }) => (inline ? '0' : '0')};
`

const BottomSection = styled(Section)`
  // border-bottom-left-radius: 20px;
  // border-bottom-right-radius: 20px;
`

const TitleText = styled(Text)`
  color: #292933;
  text-align: center;
  font-weight: 600;
  font-size: 22px;
  line-height: 33px;
`

const TitleRow = styled(RowBetween)`
  margin-top: 2.25rem;
  margin-bottom: 1.25rem;
  // padding-left: 40px;
  // padding-right: 40px;
  text-align: center;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  margin-top: 0rem;
  margin-bottom: 0rem;
  `};
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
      <Box marginRight={'0.5rem'}>
        <ArrowLeft style={{ cursor: 'pointer' }} onClick={onDismiss} />
      </Box>
      <RowCenter>
        <TitleText>{title}</TitleText>
      </RowCenter>
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
