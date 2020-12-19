import { ToggleButtonClassKey } from '@material-ui/lab/ToggleButton'

declare module '@material-ui/core/styles/overrides' {
  export interface ComponentNameToClassKey {
    MuiToggleButton: ToggleButtonClassKey
  }
}
