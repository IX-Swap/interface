import { Tab, Tabs } from '@material-ui/core'
import React, { useState } from 'react'

export const DetailsTab = () => {
  const [tabValue, setTabValue] = useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <Tabs value={tabValue} onChange={handleChange}>
      <Tab label='Overview' />
      <Tab label='Information' />
    </Tabs>
  )
}
