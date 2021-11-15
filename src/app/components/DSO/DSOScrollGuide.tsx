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
  'Team Members' = 'dso-team',
  'Documents' = 'dso-documents',
  'Videos' = 'dso-videos',
  'FAQs' = 'dso-faqs'
}

export const isSectionVisible = (
  name: string,
  showVideos: boolean,
  showFAQs: boolean
) => {
  if (!showVideos && !showFAQs) {
    return name !== 'Videos' && name !== 'FAQs'
  }

  if (!showVideos) {
    return name !== 'Videos'
  }
  if (!showFAQs) {
    return name !== 'FAQs'
  }

  return true
}

export interface DSOScrollGuideProps {
  hasVideo: boolean
  hasFAQ: boolean
}

export const DSOScrollGuide = ({
  hasVideo = true,
  hasFAQ = true
}: DSOScrollGuideProps) => {
  const [hasActive, setHasActive] = useState(false)
  let actualDSOFromSection = Object.entries(DSOFormSection)

  if (!hasVideo || !hasFAQ) {
    actualDSOFromSection = actualDSOFromSection.filter(([name, _]) =>
      isSectionVisible(name, hasVideo, hasFAQ)
    )
  }

  const firstLinkKey = Object.values(DSOFormSection)[0]

  return (
    <>
      <Typography variant='subtitle1'>Progress</Typography>
      <VSpacer size='small' />
      <ScrollGuide>
        {actualDSOFromSection.map(([name, key]) => {
          return (
            <ScrollGuideLink
              data-testid={'link'}
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
          )
        })}
      </ScrollGuide>
    </>
  )
}
