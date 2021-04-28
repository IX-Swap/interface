import { Tabs } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

export const VirtualAccountTabs = withStyles({
  flexContainer: {
    borderBottom: 'none'
  },
  indicator: {
    display: 'none'
  }
})(Tabs)
