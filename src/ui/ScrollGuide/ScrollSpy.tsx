import React, { useState } from 'react'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import { ScrollGuideLink } from 'ui/ScrollGuide/ScrollGuideLink'
import { ScrollGuide } from 'ui/ScrollGuide/ScrollGuide'
import { VSpacer } from 'components/VSpacer'

export const ScrollSpy = ({ sections }: { sections: any }) => {
  const [hasActive, setHasActive] = useState(false)
  const firstSection = Object.values(sections)[0]

  return (
    <>
      <FormSectionHeader title='Contents' />
      <VSpacer size='small' />
      <ScrollGuide>
        {sections.map(([name, key]: [string, string]) => (
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
              if (key === firstSection) {
                setHasActive(false)
              }
            }}
            activeClass='active'
            className={
              hasActive
                ? undefined
                : key === firstSection
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
