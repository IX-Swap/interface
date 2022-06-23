import React from 'react'
import { Grid, Typography } from '@mui/material'
import { DeclarationsListItem } from 'app/pages/identity/components/DeclarationsListItem/DeclarationsListItem'
import { FieldContainer } from 'app/pages/identity/components/FieldContainer/FieldContainer'
import { FormSectionHeader } from 'app/pages/identity/components/FormSectionHeader'

export interface CorporateDeclarationsListProps {
  title?: string
  subtitle: string
  data: Record<string, boolean>
  labelMap: Record<string, React.ReactNode>
}

export const CorporateDeclarationsList = ({
  title,
  subtitle,
  data,
  labelMap
}: CorporateDeclarationsListProps) => {
  const WrapperComponent = title !== undefined ? FieldContainer : React.Fragment
  return (
    <WrapperComponent>
      <Grid container spacing={5} direction={'column'}>
        {title !== undefined && (
          <Grid item>
            <FormSectionHeader title={title} />
          </Grid>
        )}

        <Grid item container spacing={3} direction={'column'}>
          <Grid item>
            <Typography variant={'subtitle1'}>{subtitle}</Typography>
          </Grid>
          <Grid item container spacing={2}>
            {Object.entries(data).map((item, index) => {
              const key = labelMap[item[0]]
              const value = item[1]
              if (value) {
                return (
                  <DeclarationsListItem key={index} label={key} value={value} />
                )
              }
              return null
            })}

            {Object.values(data).every(item => !item) &&
              Object.values(labelMap).map((label, i) => (
                <DeclarationsListItem key={i} label={label} value={false} />
              ))}
          </Grid>
        </Grid>
      </Grid>
    </WrapperComponent>
  )
}
