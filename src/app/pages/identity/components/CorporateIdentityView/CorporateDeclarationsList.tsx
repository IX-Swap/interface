import React from 'react'
import { Grid, Typography } from '@mui/material'
import { DeclarationsListItem } from 'app/pages/identity/components/DeclarationsListItem/DeclarationsListItem'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'

export interface CorporateDeclarationsListProps {
  title?: string
  subtitle: string
  data: Record<string, boolean | undefined>
  labelMap: Record<string, React.ReactNode>
  type?: 'checkbox' | 'radio'
}

export const CorporateDeclarationsList = ({
  title,
  subtitle,
  data,
  labelMap,
  type = 'checkbox'
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
            {type === 'checkbox' ? (
              <>
                {Object.entries(data).map((item, index) => {
                  const key = labelMap[item[0]]
                  const value = item[1]
                  if (value === true) {
                    return (
                      <DeclarationsListItem
                        key={index}
                        label={key}
                        value={value}
                      />
                    )
                  }
                  return null
                })}

                {Object.values(data).every(item => item !== true) &&
                  Object.values(labelMap).map((label, i) => (
                    <DeclarationsListItem key={i} label={label} value={false} />
                  ))}
              </>
            ) : (
              <DeclarationsListItem
                key={0}
                label={labelMap[Object.values(data)[0]]}
                value={true}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </WrapperComponent>
  )
}
