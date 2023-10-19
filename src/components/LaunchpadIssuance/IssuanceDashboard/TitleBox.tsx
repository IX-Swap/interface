import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useRole } from 'state/user/hooks'
import { BaseCheckbox } from 'components/LaunchpadOffer/InvestDialog/utils/Checkbox'
import { text1, text53 } from 'components/LaunchpadMisc/typography'
import { SearchConfig } from './SearchFilter'

interface Props {
  title: string
  onlyMine: string
  setFilter: (filter: SearchConfig | ((prevState: SearchConfig) => SearchConfig)) => void
}

export const TitleBox = ({ title, onlyMine, setFilter }: Props) => {
  const { isAdmin } = useRole()

  const showMine = useMemo(() => onlyMine === 'true', [onlyMine])
  const toggle = () =>
    setFilter((state: SearchConfig) => ({
      ...state,
      onlyMine: onlyMine === 'true' ? 'false' : 'true',
    }))

  return (
    <Container>
      <TableTitle>{title}</TableTitle>
      {/* {isAdmin && (
        <CheckBoxContainer onClick={toggle}>
          <BaseCheckbox state={showMine} toggle={() => null} />
          <CheckBoxLabel>Show only mine</CheckBoxLabel>
        </CheckBoxContainer>
      )} */}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: auto;
  max-width: 1320px;
`

export const TableTitle = styled.div`
  ${text53}

  padding: 0 0 1.25rem;
  font-family: ${(props) => props.theme.launchpad.font};
  color: ${(props) => props.theme.launchpad.colors.text.title};
`

const CheckBoxContainer = styled.div`
  display: flex;
  gap: 6px;
  cursor: pointer;
`
const CheckBoxLabel = styled.div`
  ${text1}
  color: ${(props) => props.theme.launchpad.colors.primary};
`
