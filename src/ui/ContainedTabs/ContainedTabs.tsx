import React, { useState } from 'react'
import { styled } from '@mui/system'
import { Tabs as MuiTabs, Grid } from '@mui/material'
import { TabPanel } from 'components/TabPanel'
import Tab from '@mui/material/Tab'

const CTab = styled(Tab)`
  margin-left: -1px;
  border: 1px solid ${(props: any) => props.theme.palette?.tab.contained.border};
  color: ${(props: any) => props.theme.palette?.tab.contained.color};
  :first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    margin-left: 0;
  }
  :last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  &[aria-selected='true'] {
    color: ${(props: any) => props.theme.palette.primary.contrastText};
    background-color: ${(props: any) => props.theme.palette.primary.main};
    border-color: ${(props: any) => props.theme.palette.primary.main};
    position: relative;
    z-index: 1;
  }
`

const Tabs = styled(MuiTabs)(({ theme }) => ({
  '.MuiTabs-indicator': {
    display: 'none'
  }
}))

export interface ContainedTabsProps {
  labels: string[]
  panels?: React.ReactNode[]
}

export const ContainedTabs = ({ labels, panels }: ContainedTabsProps) => {
  const [active, setActive] = useState(0)
  const handleChange = (_: any, value: any) => {
    setActive(value)
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Tabs value={active} onChange={handleChange}>
          {labels.map((label: string) => (
            <CTab label={label} />
          ))}
        </Tabs>
      </Grid>
      <Grid item xs={12}>
        {panels?.map((panel: React.ReactNode, index: number) => (
          <TabPanel index={index} value={active}>
            {panel}
          </TabPanel>
        ))}
      </Grid>
    </Grid>
  )
}
