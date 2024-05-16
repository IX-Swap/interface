import React, { useMemo } from 'react'
import styled, { useTheme } from 'styled-components'

import { ReactComponent as NoIssuancesIcon } from 'assets/launchpad/svg/no-issuances.svg'

import { Column } from 'components/LaunchpadMisc/styled'
import { text3, text50 } from 'components/LaunchpadMisc/typography'
import { LbpCreateButton } from '../LbpCreateButton'

interface Props {
  isSearch: boolean
}

export const EmptyTable = ({ isSearch }: Props) => {
  const theme = useTheme()

  const title = useMemo(() => (isSearch ? 'No search results' : 'No LBP yet'), [isSearch])
  return (
    <Container>
      <NoIssuancesIcon />

      <Column>
        <NoItemsTitle>{title}</NoItemsTitle>
        {!isSearch && <NoItemsSubtitle>Please add new LBP.</NoItemsSubtitle>}
      </Column>

      {!isSearch && (
        <LbpCreateButton background={theme.launchpad.colors.primary} color={theme.launchpad.colors.text.light} />
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 1180px;
  height: 460px;
  margin: auto;
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 8px;
`

const NoItemsTitle = styled.div`
  ${text50}

  text-align: center;
  color: ${(props) => props.theme.launchpad.colors.text.title};
`

const NoItemsSubtitle = styled.div`
  ${text3}

  text-align: center;
  color: ${(props) => props.theme.launchpad.colors.text.body};
`
