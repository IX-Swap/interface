import { useTheme, Box, Typography, Button } from '@mui/material'
import React from 'react'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'
import SelfieExample from 'assets/images/selfie-example.png'

export const SelfieGuide = () => {
  const theme = useTheme()

  const steps = [
    {
      title: 'Good lighting',
      description: 'Make sure you are in a well-lit environment.'
    },
    {
      title: 'Look straight',
      description:
        'Make sure your face is angled such that your features are clearly visible.'
    },
    {
      title: 'Hold up handwritten verification text and ID',
      description: (
        <>
          Write down “
          <span style={{ color: theme.palette.text.primary }}>
            For IXP Verification
          </span>
          ” and the{' '}
          <span style={{ color: theme.palette.text.primary }}>
            current date
          </span>{' '}
          on a piece of paper and hold it up together with your valid ID.
        </>
      )
    }
  ]

  return (
    <Box
      display={'flex'}
      gap={5}
      sx={{
        flexDirection: { xs: 'column', lg: 'row' },
        alignItems: 'center',
        paddingX: { xs: 5, lg: 12 },
        paddingY: 5
      }}
    >
      <Box>
        <img
          src={SelfieExample}
          alt='Selfie Example'
          width={'235px'}
          height={'333px'}
        />
      </Box>
      <Box>
        <FormSectionHeader title={'How to Take Your Selfie'} />
        <Box display={'flex'} flexDirection={'column'} gap={1} my={1.5}>
          {steps.map((step, i) => {
            const { title, description } = step
            return (
              <Box display={'flex'} flexDirection={'column'} gap={1} my={1}>
                <Box display={'flex'} gap={1}>
                  <Box
                    sx={{
                      width: '18px',
                      height: '18px',
                      padding: '3px 5px',
                      backgroundColor: theme.palette.stepIcon.bgActive,
                      border: `1px solid ${theme.palette.primary.main}`,
                      borderRadius: '100%',
                      fontSize: '9px',
                      color: theme.palette.primary.main,
                      textAlign: 'center'
                    }}
                  >
                    {++i}
                  </Box>
                  <Typography>{title}</Typography>
                </Box>
                <Typography color={theme.palette.text.secondary}>
                  {description}
                </Typography>
              </Box>
            )
          })}
        </Box>

        <Button
          variant='contained'
          fullWidth
          disableElevation
          sx={{ paddingY: 2 }}
        >
          Upload
        </Button>
      </Box>
    </Box>
  )
}
