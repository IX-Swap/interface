import React from 'react'
import styled from 'styled-components'

import { ReactComponent as VectorUpIcon } from 'assets/launchpad/svg/vector-up.svg'
import { ReactComponent as VectorDownIcon } from 'assets/launchpad/svg/vector-down.svg'


interface Props {
  type?: string | null
}

export const SortIcon: React.FC<Props> = (props) => {

  return (
    <OrderIcons>
      <VectorUpIcon fill={ props.type === 'ASC' ? '#292933' : '#8F8FB2' }/> 
      <VectorDownIcon fill={ props.type === 'DESC' ? '#292933' : '#8F8FB2' }/>
    </OrderIcons>
  )
}

const OrderIcons = styled.div`
  min-width: 0.75rem;
  display: grid;

  place-content: center start;
`
