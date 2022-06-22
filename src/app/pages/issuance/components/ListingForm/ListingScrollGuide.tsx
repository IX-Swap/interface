import React, { useState } from 'react'
import { Typography } from '@mui/material'
import { ScrollGuideLink } from 'ui/ScrollGuide/ScrollGuideLink'
import { ScrollGuide } from 'ui/ScrollGuide/ScrollGuide'
import { VSpacer } from 'components/VSpacer'

export enum ListingFormSection {
  'General Information' = 'listing-general-information',
  Market = 'listing-market',
  Pricing = 'listing-pricing',
  'Offering Terms' = 'listing-terms',
  'Upload Documents' = 'listing-documents',
  'Information Profile' = 'listing-profile',
  'Team Members' = 'listing-team'
}

export const ListingScrollGuide = () => {
  const [hasActive, setHasActive] = useState(false)
  const firstLinkKey = Object.values(ListingFormSection)[0]

  return (
    <>
      <Typography variant='subtitle1'>Progress</Typography>
      <VSpacer size='small' />
      <ScrollGuide>
        {Object.entries(ListingFormSection).map(([name, key]) => (
          <ScrollGuideLink
            key={key}
            to={key}
            spy
            smooth
            duration={300}
            offset={-20}
            onSetActive={() => {
              setHasActive(true)
            }}
            onSetInactive={() => {
              if (key === firstLinkKey) {
                setHasActive(false)
              }
            }}
            activeClass='active'
            className={
              hasActive
                ? undefined
                : key === firstLinkKey
                ? 'active'
                : undefined
            }
          >
            {name}
          </ScrollGuideLink>
        ))}
      </ScrollGuide>
    </>
  )
}
