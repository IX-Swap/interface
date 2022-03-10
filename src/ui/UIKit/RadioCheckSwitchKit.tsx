import {
  Box,
  Button,
  Grid,
  Radio,
  RadioGroup,
  Switch,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import { getThemeOverrides } from 'themes/new/overrides'
import { lightTheme } from 'themes/new/light'
import { darkTheme } from 'themes/new/dark'
import { typography } from 'themes/new/typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { UICheckbox } from 'ui/UICheckbox/UICheckbox'
import { VSpacer } from 'components/VSpacer'

export const RadioCheckSwitchKit = () => {
  const [isDarkThemeOn, setIsDarkThemeOn] = useState(false)

  const currentNewTheme = isDarkThemeOn ? darkTheme : lightTheme

  const theme = createTheme({
    ...currentNewTheme,
    typography
  })

  theme.components = {
    ...getThemeOverrides(theme),
    MuiSwitch: {
      ...getThemeOverrides(theme)?.MuiSwitch,
      defaultProps: {
        disableTouchRipple: true
      }
    },
    MuiRadio: {
      ...getThemeOverrides(theme)?.MuiRadio,
      defaultProps: {
        disableTouchRipple: true
      }
    },
    MuiCheckbox: {
      ...getThemeOverrides(theme)?.MuiCheckbox,
      defaultProps: {
        disableTouchRipple: true
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid
        style={{
          backgroundColor: isDarkThemeOn ? '#183061' : 'initial',
          padding: 12
        }}
      >
        <Grid item container md={6} spacing={6}>
          <Grid item>
            <Typography color='text.primary'>Radio:</Typography>
          </Grid>
        </Grid>
        <RadioGroup defaultValue={3}>
          <Grid item container md={6} spacing={6}>
            <Grid item>
              <Radio disabled value={1} />
            </Grid>
            <Grid item>
              <Radio value={2} />
            </Grid>
            <Grid item>
              <Radio value={3} />
            </Grid>
            <Grid item>
              <Radio checked disabled value={4} />
            </Grid>
          </Grid>
        </RadioGroup>

        <VSpacer size={'small'} />

        <Grid item container md={6} spacing={6}>
          <Grid item>
            <Typography color='text.primary'>Checkbox:</Typography>
          </Grid>
        </Grid>
        <Grid item container md={6} spacing={6}>
          <Grid item>
            <UICheckbox disabled />
          </Grid>
          <Grid item>
            <UICheckbox />
          </Grid>
          <Grid item>
            <UICheckbox checked />
          </Grid>
          <Grid item>
            <UICheckbox checked disabled />
          </Grid>
        </Grid>

        <VSpacer size={'small'} />

        <Grid item container md={6} spacing={6}>
          <Grid item>
            <Typography color='text.primary'>Switch:</Typography>
          </Grid>
        </Grid>
        <VSpacer size={'extraSmall'} />
        <Grid item container md={6} spacing={6}>
          <Grid item>
            <Switch disabled />
          </Grid>
          <Grid item>
            <Switch />
          </Grid>
          <Grid item>
            <Switch checked />
          </Grid>
          <Grid item>
            <Switch checked disabled />
          </Grid>
        </Grid>

        <Box marginTop={10}>
          <Button
            variant={'contained'}
            onClick={() => setIsDarkThemeOn(!isDarkThemeOn)}
          >
            {isDarkThemeOn ? 'Switch to Light theme' : 'Switch to Dark theme'}
          </Button>
        </Box>
      </Grid>
    </ThemeProvider>
  )
}
