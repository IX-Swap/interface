import { createTheme, ThemeProvider } from '@mui/material/styles'
import React from 'react'
import { lightTheme } from 'themes/new/light'
import { getThemeOverrides } from 'themes/new/overrides'
import { typography } from 'themes/new/typography'
import { Slider, Paper, Grid, Typography, Box } from '@mui/material'

const theme = createTheme({ ...lightTheme, typography })
theme.components = getThemeOverrides(theme)

const marks = Array.from(Array(11).keys()).map(number => ({
  value: number * 10,
  label: number === 0 || number === 10 ? number * 10 : ''
}))
export const SliderKit = () => {
  return (
    <ThemeProvider theme={theme}>
      <Grid direction='row' container spacing={1}>
        <Grid item md={6}>
          <Paper sx={{ padding: 2 }} elevation={0}>
            <Typography sx={{ color: '#000000' }}>Continuous</Typography>
            <Box mb={6}>
              <Slider size='small' defaultValue={50} />
            </Box>
            <Box mb={5}>
              <Slider defaultValue={50} />
            </Box>
            <Box mb={0}>
              <Slider size='small' disabled defaultValue={0} />
            </Box>
          </Paper>
        </Grid>
        <Grid item md={6}>
          <Paper sx={{ padding: 2 }} elevation={0}>
            <Typography sx={{ color: '#000000' }}>Discrete</Typography>
            <Box mb={3}>
              <Slider
                size='small'
                defaultValue={50}
                step={10}
                marks={marks}
                min={0}
                max={100}
              />
            </Box>
            <Box mb={3}>
              <Slider
                defaultValue={50}
                step={10}
                marks={marks}
                min={0}
                max={100}
              />
            </Box>
            <Box mb={3}>
              <Slider
                size='small'
                disabled
                defaultValue={0}
                step={10}
                marks={marks}
                min={0}
                max={100}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
