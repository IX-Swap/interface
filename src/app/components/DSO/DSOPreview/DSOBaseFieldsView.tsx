import React from 'react'
import { Grid, Paper, Typography } from '@mui/material'
import { DigitalSecurityOffering } from 'types/dso'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { useStyles } from 'app/components/DSO/components/DSOInvestorViewHeader.styles'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { stoClassifications } from 'components/form/STOClassificationSelect'
import { productTypes } from 'components/form/ProductTypeSelect'
import { FieldGrid } from 'ui/FieldGrid/FieldGrid'
import { Status } from 'ui/Status/Status'

export interface DSOBaseFieldsViewProps {
  dso: DigitalSecurityOffering
}

export const DSOBaseFieldsView = ({ dso }: DSOBaseFieldsViewProps) => {
  const { isMobile, theme } = useAppBreakpoints()
  const { container, grid, logo, details } = useStyles()

  const classification = dso.classification ?? ''
  const classificationObj = stoClassifications.find(
    v => v.value === classification
  )
  const stoClassification =
    typeof classificationObj !== 'undefined'
      ? classificationObj?.label
      : classification

  const productType = dso.productType ?? ''
  const productTypeObj = productTypes.find(v => v.value === productType)
  const stoProductType =
    typeof productTypeObj !== 'undefined' ? productTypeObj?.label : productType

  const items = [
    {
      label: 'Token Name',
      value: dso?.tokenName
    },
    {
      label: 'Symbol',
      value: dso?.tokenSymbol
    },
    {
      label: 'Corporate',
      value: dso?.corporate?.companyLegalName
    },
    {
      label: 'Network',
      value: dso?.network?.name
    },
    {
      label: 'Capital Structure',
      value: dso?.capitalStructure
    },
    {
      label: 'Decimal',
      value: dso?.decimalPlaces ?? dso?.decimals
    },
    {
      label: 'Currency',
      value: dso?.currency?.symbol
    },
    {
      label: 'Classification',
      value: stoClassification
    },
    {
      label: 'Product Type',
      value: stoProductType
    },
    {
      label: 'Launch Date',
      value: dso?.launchDate
    },
    {
      label: 'Completion Date',
      value: dso?.completionDate
    },
    {
      label: 'Release Date',
      value: dso?.releaseDate
    },
    {
      label: 'Unique Identifier Code',
      value: dso?.uniqueIdentifierCode
    }
  ]

  return (
    <Paper className={container}>
      <Grid container className={grid} spacing={isMobile ? 3 : 6}>
        <Grid item xs={12} md={3} className={logo}>
          <DSOLogo
            dsoId={dso._id}
            size={isMobile ? 48 : 124}
            variant='circular'
          />
        </Grid>
        <Grid item xs={12} md={9} container className={details} gap={5}>
          <Grid
            item
            container
            sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
            pb={5}
          >
            <Grid
              item
              xs={12}
              md={9}
              sx={{ textAlign: { xs: 'center', md: 'left' } }}
            >
              <Typography variant='h3' mb={1}>
                {dso.tokenName} ({dso.tokenSymbol})
              </Typography>
              <Typography variant='h5' color={theme.palette.primary.main}>
                {dso.corporate.companyLegalName}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              display={'flex'}
              sx={{
                justifyContent: { xs: 'center', md: 'end' },
                marginTop: { xs: '20px', md: 0 }
              }}
            >
              <Status label={dso.status} type={dso.status} />
            </Grid>
          </Grid>
          <Grid xs={12} item>
            <FieldGrid title={''} items={items} gridOnly />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}
