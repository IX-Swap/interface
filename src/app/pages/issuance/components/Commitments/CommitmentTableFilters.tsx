import { Box, Button, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { TextInputSearchFilter } from 'app/components/TextInputSearchFilter'
import { CapitalCallDialog } from 'app/pages/issuance/components/Commitments/CapitalCallDialog/CapitalCallDialog'
import { FundStatusFilter } from 'app/pages/issuance/components/Commitments/FundStatusFilter'
import { VSpacer } from 'components/VSpacer'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React, { useState } from 'react'

export const CommitmentTableFilter = () => {
  const theme = useTheme()
  const { isTablet } = useAppBreakpoints()
  const [isEmailPopupVisible, setIsEmailPopupVisible] = useState<boolean>(false)

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item container justifyContent={'space-between'}>
        <Grid item xs={12} md={4}>
          <TextInputSearchFilter fullWidth placeholder='Search Name' />
        </Grid>

        <Grid
          item
          container
          xs={12}
          md={3}
          lg={3}
          justifyContent={'space-between'}
        >
          <Grid item xs={12} md={5} lg={6}>
            <Box mt='-28px'>
              {isTablet && <VSpacer size={'small'} />}
              <FundStatusFilter />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={7}
            lg={6}
            container
            justifyContent={'flex-end'}
          >
            <Button
              variant={'contained'}
              color={'primary'}
              style={{
                fontSize: 12,
                fontWeight: 400,
                height: 49,
                marginTop: isTablet ? theme.spacing(2) : 0
              }}
              onClick={() => setIsEmailPopupVisible(true)}
            >
              Capital Call
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <CapitalCallDialog
        open={isEmailPopupVisible}
        toggleOpen={() => setIsEmailPopupVisible(!isEmailPopupVisible)}
      />
    </Grid>
  )
}