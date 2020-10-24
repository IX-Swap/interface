import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { Section } from 'v2/app/pages/identity/components/Section'
import { PersonalInfoFields } from 'v2/app/pages/identity/components/PersonalInfoFields'
import { useFieldArray } from 'react-hook-form'

export interface CorporateProfilesProps {
  title: string
  type: 'representatives' | 'directors' | 'beneficialOwners'
  isEditing: boolean
}

export const CorporateProfiles: React.FC<CorporateProfilesProps> = props => {
  const { title, type, isEditing } = props
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
          <Grid item xs={12} key={index}>
            <Section title={title}>
              <PersonalInfoFields rootName={`${type}[${index}]`} />
            </Section>
          </Grid>
        )
      })}
    </>
  )
}
