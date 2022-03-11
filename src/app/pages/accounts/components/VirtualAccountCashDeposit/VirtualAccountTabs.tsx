import { Tabs } from '@mui/material'
import withStyles from '@mui/styles/withStyles'

export const VirtualAccountTabs = withStyles({
  flexContainer: {
    borderBottom: 'none'
  },
  indicator: {
    display: 'none'
  }
})(Tabs)
