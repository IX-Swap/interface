import makeStyles from '@mui/styles/makeStyles'
import { StepIconType } from 'ui/Stepper/StepIcon/StepIcon'

export interface Props {
  type: StepIconType
}

export const useStyles = makeStyles(theme => {
  // eslint-disable-next-line
  const stepIconPalette = theme.palette.stepIcon!

  const getBg = (type: StepIconType) => {
    switch (type) {
      case 'active':
        return stepIconPalette.bgActive
      case 'completed':
        return stepIconPalette.bgCompleted
      case 'error':
        return stepIconPalette.bgError
      default:
        return stepIconPalette.bg
    }
  }

  const getColor = (type: StepIconType) => {
    switch (type) {
      case 'active':
        return stepIconPalette.colorActive
      case 'completed':
        return stepIconPalette.colorCompleted
      case 'error':
        return stepIconPalette.colorError
      default:
        return stepIconPalette.color
    }
  }

  const getBorderColor = (type: StepIconType) => {
    switch (type) {
      case 'active':
        return stepIconPalette.borderActive
      case 'completed':
        return stepIconPalette.borderCompleted
      case 'error':
        return stepIconPalette.borderError
      default:
        return stepIconPalette.border
    }
  }

  return {
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 32,
      height: 32,
      borderRadius: '50%',
      boxSizing: 'border-box',
      backgroundColor: ({ type }: Props) => getBg(type),
      border: ({ type }: Props) => `1px solid ${getBorderColor(type)}`
    },
    label: {
      color: ({ type }: Props) =>
        type === 'error' ? stepIconPalette.colorError : 'inherit'
    },
    text: {
      color: ({ type }: Props) => getColor(type),
      lineHeight: 1
    }
  }
})
