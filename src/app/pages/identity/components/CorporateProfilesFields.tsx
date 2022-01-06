import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { IndividualInfoFields } from 'app/pages/identity/components/IndividualInfoFields/IndividualInfoFields'
import { useFieldArray } from 'react-hook-form'
import { privateClassNames } from 'helpers/classnames'
import { Section } from 'app/pages/identity/components/Section/Section'

export interface CorporateProfilesFieldsProps {
  title: string
  type: 'representatives' | 'directors' | 'beneficialOwners'
}

export const CorporateProfilesFields: React.FC<
  CorporateProfilesFieldsProps
> = props => {
  const { title, type } = props
  const { fields, append } = useFieldArray({
    name: type
  })

  useEffect(() => {
    if (fields.length === 0) {
      append({})
    }
  }, [fields, append])

  return (
    <>
      {fields.map((field, index) => {
        return (
          <Grid item xs={12} key={index} className={privateClassNames()}>
            <Section title={title}>
              <IndividualInfoFields rootName={`${type}[${index}]`} />
            </Section>
          </Grid>
        )
      })}
    </>
  )
}
