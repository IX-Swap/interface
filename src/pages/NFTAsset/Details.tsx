import React from 'react'
import styled from 'styled-components'

import { ReactComponent as BurgerMenu } from 'assets/images/burger-menu.svg'
import { ReactComponent as Star } from 'assets/images/star.svg'
import { ReactComponent as Poll } from 'assets/images/poll.svg'
import { TraitType } from 'state/nft/types'

import { NftAttributeSection } from './Attributes'
import { TraitsShow } from '../CreateNFT/TraitsShow'
import { SwitchRow } from './SwitchRow'

const Divider = styled.div`
  background-color: ${({ theme }) => theme.text9};
  height: 1px;
  margin: 28px 0;
`

const NftAttributesContainer = styled.div`
  padding: 24px 18px;
  background: ${({ theme }) => theme.bg21};
  border-radius: 12px;
  margin-top: 32px;
`

interface Props {
  stats: Array<any>
  levels: Array<any>
  rectangles: Array<any>
  isNSFW: boolean
  isFreeze: boolean
}

export const Details = ({ stats, levels, rectangles, isNSFW }: Props) => {
  return (
    <NftAttributesContainer>
      {rectangles?.length > 0 && (
        <NftAttributeSection
          title="Properties"
          description="Textual traits that show up as rectangles"
          icon={<BurgerMenu />}
          row
        >
          <TraitsShow type={TraitType.RECTANGLE} traitList={rectangles} />
        </NftAttributeSection>
      )}

      {levels?.length > 0 && (
        <>
          <Divider />

          <NftAttributeSection title="Levels" description="Numerical traits that just show as numbers" icon={<Star />}>
            <TraitsShow type={TraitType.PROGRESS} traitList={levels} />
          </NftAttributeSection>
        </>
      )}

      {stats.length > 0 && (
        <>
          <Divider />
          <NftAttributeSection
            row
            title="Stats"
            description="Numerical traits that show as a progress bar"
            icon={<Poll />}
          >
            <TraitsShow type={TraitType.NUMBER} traitList={levels} />
          </NftAttributeSection>
          <Divider />
        </>
      )}

      <SwitchRow
        data={isNSFW}
        title="Explict & Sensitive Content"
        info="Set this item as explicit and sensitive content"
      />
      {/* <Divider />
      <SwitchRow data={isFreeze} title="Freeze Matadata" /> */}
    </NftAttributesContainer>
  )
}
