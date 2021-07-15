import { Tabs } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-flexContainer': {
    borderBottom: 'none'
  }
}))
