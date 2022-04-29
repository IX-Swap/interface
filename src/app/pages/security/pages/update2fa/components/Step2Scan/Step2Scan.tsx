import React, { useEffect, useState } from 'react'
import { Typography, Grid } from '@mui/material'
import { StepWrapper } from 'app/pages/security/components/StepWrapper'
import { TwoFaData } from 'app/pages/security/types'
import { copyToClipboard } from 'helpers/clipboard'
import useStyles from './Step2Scan.styles'

export interface Step2ScanProps {
  twoFaData: TwoFaData | undefined
}

export const Step2Scan = ({ twoFaData }: Step2ScanProps) => {
  const [copied, setCopied] = useState(false)
  const classes = useStyles({ image: twoFaData?.image, copied })

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined
    if (copied) {
      timeout = setTimeout(() => setCopied(false), 3000)
    }
    return () => {
      if (timeout !== undefined) {
        clearTimeout(timeout)
      }
    }
  }, [copied])

  return (
    <StepWrapper
      title={
        <>
          Scan this QR Code on <br />
          new Authenticator App
        </>
      }
    >
      {twoFaData !== undefined && (
        <Grid container direction='column' alignItems='center'>
          <Grid
            container
            justifyContent='center'
            alignItems='center'
            direction={'column'}
            className={classes.wrapper}
          >
            <Grid item>
              <div data-testid='store-image' className={classes.image} />
            </Grid>

            <Grid item>
              <Typography align='center' className={classes.text}>
                Click the “add button“ on Authenticator App to scan the QR Code
                or use a Setup key bellow
              </Typography>
            </Grid>

            <Grid
              item
              container
              alignItems={'center'}
              className={classes.keyBlock}
              justifyContent={'space-between'}
            >
              <Grid item>
                <Typography className={classes.key}>{twoFaData.key}</Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant={'body1'}
                  className={classes.copyButton}
                  onClick={() => {
                    setCopied(true)
                    copyToClipboard(twoFaData.key)
                  }}
                >
                  {copied ? 'Copied' : 'Copy'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </StepWrapper>
  )
}
