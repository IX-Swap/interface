import makeStyles from '@mui/styles/makeStyles'
import { StepIconType } from 'ui/Stepper/StepIcon/StepIcon'

export interface Props {
  type: StepIconType
}

export const useStyles = makeStyles(theme => {
  // eslint-disable-next-line
  const stepItemPalette = theme.palette.stepItem!

  const getBg = (type: StepIconType) => {
    switch (type) {
      case 'active':
        return stepItemPalette.bgActive
      case 'completed':
        return stepItemPalette.bgCompleted
      case 'error':
        return stepItemPalette.bgError
      default:
        return stepItemPalette.bg
    }
  }

  const getColor = (type: StepIconType) => {
    switch (type) {
      case 'active':
        return stepItemPalette.colorActive
      case 'completed':
        return stepItemPalette.colorCompleted
      case 'error':
        return stepItemPalette.colorError
      default:
        return stepItemPalette.color
    }
  }

  const getBorderColor = (type: StepIconType) => {
    switch (type) {
      case 'active':
        return stepItemPalette.borderActive
      case 'completed':
        return stepItemPalette.borderCompleted
      case 'error':
        return stepItemPalette.borderError
      default:
        return stepItemPalette.border
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
        type === 'error' ? stepItemPalette.colorError : 'inherit'
    },
    text: {
      color: ({ type }: Props) => getColor(type),
      lineHeight: 1
    }
  }
})
