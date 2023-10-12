import React from 'react'
import { Grid, Typography, Button } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'

export const Feedback = () => {
  return (
    <>
      <Grid container direction='column' style={{ display: 'table' }}>
        <Grid item>
          <PageHeader title={'Bug Report and Feedback Form'} />
        </Grid>
        <RootContainer>
          <FieldContainer>
            <Grid container direction='column' spacing={2}>
              <Grid item>
                <Typography variant={'h5'} fontWeight={500} lineHeight={2}>
                  We greatly appreciate your input to help us improve our
                  product! If you've encountered a bug or have any feedback to
                  share, please fill out one of the forms below. Your insights
                  are invaluable in making our product better.
                </Typography>
              </Grid>
              <Grid
                item
                display={'flex'}
                justifyContent={'center'}
                gap={3}
                mt={5}
              >
                <Button
                  onClick={() => window.showFeedbackForm()}
                  variant='contained'
                  disableElevation
                  size={'large'}
                >
                  Send feedback
                </Button>
                <Button
                  onClick={() => window.showBugReportForm()}
                  variant='contained'
                  disableElevation
                  size={'large'}
                >
                  Report a bug
                </Button>
              </Grid>
            </Grid>
          </FieldContainer>
        </RootContainer>
      </Grid>
    </>
  )
}
