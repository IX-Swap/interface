import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useRole } from 'state/user/hooks'
import { BaseCheckbox } from 'components/LaunchpadOffer/InvestDialog/utils/Checkbox'
import { text1, text53 } from 'components/LaunchpadMisc/typography'
import { SearchConfig } from './SearchFilter'

interface Props {
  title: string
  setFilter: (filter: SearchConfig | ((prevState: SearchConfig | undefined) => SearchConfig)) => void
}

export const TitleBox = ({ title, setFilter }: Props) => {
  const { isAdmin } = useRole()
  const [showMine, setShowMine] = React.useState<boolean>(false)

  const toggle = () => setShowMine((state) => !state)

  useEffect(() => {
    setFilter((state: SearchConfig | undefined) => ({
      search: state?.search || '',
      onlyMine: showMine.toString(),
    }))
  }, [showMine])

  return (
    <Container>
      <TableTitle>{title}</TableTitle>
      {isAdmin && (
        <CheckBoxContainer onClick={toggle}>
          <BaseCheckbox state={showMine} toggle={() => null} />
          <CheckBoxLabel>Show only mine</CheckBoxLabel>
        </CheckBoxContainer>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: auto;
  max-width: 1180px;
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
