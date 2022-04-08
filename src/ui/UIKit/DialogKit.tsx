import { Grid, Button } from '@mui/material'
import React, { useState } from 'react'
import { UIDialog } from 'ui/UIDialog/UIDialog'
import { UIKitThemeWrapper } from 'ui/UIKit/UIKitThemeWrapper'

export const DialogKit = () => {
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  const test = (
    <div>
      Foreign Account Tax Compliance Act aims to collect information on United
      States (US) Tax residents using foreign accounts. It requires Financial
      Institutions outside the US to report customers who are US tax residents
      to the US tax authorities. <br /> <br />
      InvestaX is collecting information regarding tax residency status of each
      Account holder in order to comply with Income Tax Act and Singapore Income
      Tax (International Tax Compliance Agreements)(Common Reporting Standard)
      Regulations 2016.
    </div>
  )

  const test2 = (
    <ol>
      <li>You were born in US, Puerto Rico, Guam or the US Virgin Islands;</li>
      <li>Your parent is a US citizen;</li>
      <li>You have been naturalized as a US citizen.</li>
    </ol>
  )
  return (
    <UIKitThemeWrapper>
      <Grid container spacing={1}>
        <Grid item>
          <Button variant='outlined' onClick={() => setOpen1(!open1)}>
            Example 1
          </Button>
        </Grid>

        <Grid item>
          <Button variant='outlined' onClick={() => setOpen2(!open2)}>
            Example 2
          </Button>
        </Grid>

        <Grid item>
          <Button variant='outlined' onClick={() => setOpen3(!open3)}>
            Example 3
          </Button>
        </Grid>
      </Grid>

      <UIDialog
        onClose={() => setOpen1(false)}
        open={open1}
        title='Why We Need Your Tax Declaration?'
        body={test}
        actions={[{ text: 'OK', type: 'contained' }]}
      />

      <UIDialog
        onClose={() => setOpen2(false)}
        open={open2}
        title='Under FATCA, You are Citizen Of The United States Of America if:'
        body={test2}
        actions={[{ text: 'OK', type: 'contained' }]}
      />

      <UIDialog
        onClose={() => setOpen3(false)}
        open={open3}
        title='Would you like to save draft and complete later?'
        body='Would you like to save draft and complete later?'
        actions={[
          { text: 'Save draft', type: 'contained' },
          { text: 'Finish now', type: 'alternate' }
        ]}
        actionsDirection='column'
      />
    </UIKitThemeWrapper>
  )
}
