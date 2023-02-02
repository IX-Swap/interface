import React from 'react'
import styled, { useTheme } from 'styled-components'

import { ReactComponent as VectorUpIcon } from 'assets/launchpad/svg/vector-up.svg'
import { ReactComponent as VectorDownIcon } from 'assets/launchpad/svg/vector-down.svg'


interface Props {
  type?: string | null
}

export const SortIcon: React.FC<Props> = (props) => {
  const theme = useTheme()

  return (
    <OrderIcons>
      <VectorUpIcon fill={ props.type === 'ASC' ? theme.launchpad.colors.text.title : theme.launchpad.colors.text.bodyAlt }/> 
      <VectorDownIcon fill={ props.type === 'DESC' ? theme.launchpad.colors.text.title : theme.launchpad.colors.text.bodyAlt }/>
    </OrderIcons>
  )
}

const OrderIcons = styled.div`
  min-width: 0.75rem;
  display: grid;

  place-content: center start;
`
