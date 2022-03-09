import React, { useState, useCallback, ReactElement } from 'react'
import styled, { css } from 'styled-components'

import { TYPE } from 'theme'
import { ReactComponent as ChevronIcon } from 'assets/images/chevron.svg'

interface NftAttributeSectionProps {
  title: string
  description: string
  icon: ReactElement<React.SVGProps<SVGSVGElement>>
  row?: boolean
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr 12px;
  column-gap: 10px;
  align-items: center;
  cursor: pointer;
`

const StyledChevronIcon = styled(ChevronIcon)<{ isOpen: boolean }>`
  transform: rotate(90deg);
  transition: transform 250ms ease-in-out;
  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: rotate(270deg);
    `}
`

const NftSectionContent = styled.div<{ hide?: boolean; row?: boolean }>`
  display: ${({ hide }) => (hide ? 'none' : 'flex')};
  row-gap: 12px;
  column-gap: 8px;
  flex-wrap: wrap;
  ${({ row }) =>
    !row &&
    css`
      flex-direction: column;
    `}
`

export const NftAttributeSection: React.FC<NftAttributeSectionProps> = (
  props: React.PropsWithChildren<NftAttributeSectionProps>
) => {
  const [hide, setHide] = useState(true)

  const toggleSection = useCallback(() => {
    setHide(!hide)
  }, [hide, setHide])

  return (
    <div onClick={toggleSection}>
      <Container>
        {props.icon}

        <TYPE.body fontWeight={600}>{props.title}</TYPE.body>

        <StyledChevronIcon isOpen={!hide} />
      </Container>

      <NftSectionContent hide={hide} row={props.row}>
        {props.children}
      </NftSectionContent>
    </div>
  )
}
