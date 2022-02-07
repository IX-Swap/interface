import { ToggleButtonClassKey } from '@mui/material/ToggleButton'

declare module '@mui/material/styles/overrides' {
  export interface ComponentNameToClassKey {
    MuiToggleButton: ToggleButtonClassKey
  }
}
