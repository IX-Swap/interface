import React from 'react'
import { Box, Typography } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import { addLeadingZeros } from 'helpers/numbers'
import { useTheme } from '@mui/material/styles'

export interface TimeUnitProps {
  time: number
  label: string
  isNewThemeOn?: boolean
}

export const TimeUnit: React.FC<TimeUnitProps> = ({
  time,
  label,
  isNewThemeOn = false
}: TimeUnitProps) => {
  const theme = useTheme()
  return (
    <Box
      flexDirection={'column'}
      alignItems={'center'}
      display={isNewThemeOn ? 'flex' : 'block'}
    >
      <Typography
        variant={isNewThemeOn ? 'h4' : 'h3'}
        align='center'
        style={{
          backgroundColor: isNewThemeOn ? theme.palette.grey[200] : 'initial',
          borderRadius: isNewThemeOn ? 4 : 0,
          display: isNewThemeOn ? 'flex' : 'block',
          alignItems: 'center',
          justifyContent: 'center',
          width: isNewThemeOn ? 40 : 'initial',
          height: isNewThemeOn ? 40 : 'initial',
          color:
            isNewThemeOn && theme.palette.mode === 'dark'
              ? theme.palette.getContrastText(theme.palette.grey[200])
              : theme.palette.text.primary
        }}
      >
        {addLeadingZeros(time, 2) ?? '00'}
      </Typography>
      <VSpacer size={isNewThemeOn ? 'extraSmall' : 'small'} />
      <Box width={isNewThemeOn ? 'initial' : 60}>
        <Typography
          align='center'
          style={{
            textTransform: 'uppercase',
            fontSize: isNewThemeOn ? 12 : 'initial'
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  )
}
