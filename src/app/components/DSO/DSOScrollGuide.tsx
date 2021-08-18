import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import { ScrollGuideLink } from 'ui/ScrollGuide/ScrollGuideLink'
import { ScrollGuide } from 'ui/ScrollGuide/ScrollGuide'
import { VSpacer } from 'components/VSpacer'

export enum DSOFormSection {
  'DSO Information' = 'dso-information',
  Pricing = 'dso-pricing',
  'Offering Terms' = 'dso-terms',
  'Information' = 'dso-profile',
  'Documents' = 'dso-documents',
  'Team Members' = 'dso-team',
  'FAQs' = 'dso-faq'
}

export const DSOScrollGuide = () => {
  const [hasActive, setHasActive] = useState(false)
  const firstLinkKey = Object.values(DSOFormSection)[0]

  return (
    <>
      <Typography variant='subtitle1'>Progress</Typography>
      <VSpacer size='small' />
      <ScrollGuide>
        {Object.entries(DSOFormSection).map(([name, key]) => (
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
