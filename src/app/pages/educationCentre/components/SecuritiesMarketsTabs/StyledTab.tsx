import { Tab, Tabs } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-flexContainer': {
    borderBottom: 'none'
  }
}))

export const RightAlignedTabs = styled(StyledTabs)(({ theme }) => ({
  '& .MuiTabs-flexContainer': {
    justifyContent: 'flex-end'
  }
}))

export const SmallTab = styled(Tab)(() => ({
  minWidth: 120,
  '& .MuiTab-wrapper': {
    fontSize: 12
  }
}))
