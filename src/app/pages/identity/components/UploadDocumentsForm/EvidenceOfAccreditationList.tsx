import { Box, Card, Grid, Collapse, Typography, Link } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import React, { useState } from 'react'

const personalAssets = [
  'Copy of property title deed',
  'Copy of property valuation report (dated with 6 months)',
  'Latest statement from the Central Depository (Pte) Ltd. (CDP) showing personal assets.'
]

const income = [
  'Copy of most recent income tax notice assessment/ IR8A form',
  'Copy of last 12 month’s CPF contribution statement',
  'Copy of letter of employment stating position and income in the preceding 12 months'
]
export interface EvidenceListProps {
  title: string
  list: string[]
}

export const EvidenceList = ({ title, list }: EvidenceListProps) => (
  <>
    <Typography>
      <Box component='span' fontWeight='bold'>
        {title}
      </Box>
    </Typography>
    <ul style={{ paddingLeft: 15, marginTop: 15 }}>
      {list.map((item, i) => (
        <li key={i} style={{ marginBottom: 15 }}>
          <Typography>{item}</Typography>
        </li>
      ))}
    </ul>
  </>
)

export const EvidenceOfAccreditationList = () => {
  const [show, setShow] = useState(false)
  const toggleShow = () => {
    setShow(!show)
  }

  return (
    <>
      <Link onClick={toggleShow} variant='body1'>
        {show ? 'Show less' : 'View more'} &gt;
      </Link>
      <Collapse in={show}>
        <VSpacer size='small' />
        <Card variant='outlined'>
          <Box p={2}>
            <Grid container spacing={0}>
              <Grid item xs={12} md={6}>
                <EvidenceList
                  title='Net Personal Assets'
                  list={personalAssets}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <EvidenceList title='Income' list={income} />
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Collapse>
    </>
  )
}
