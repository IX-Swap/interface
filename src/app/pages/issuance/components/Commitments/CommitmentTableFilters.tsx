import React, { useState } from 'react'
import { Button, Grid } from '@mui/material'
import { SearchFilter } from 'app/components/SearchFilter'
import { useTheme } from '@mui/material/styles'
import { FundStatusFilter } from 'app/pages/issuance/components/Commitments/FundStatusFilter'
import { CapitalCallDialog } from 'app/pages/issuance/components/Commitments/CapitalCallDialog/CapitalCallDialog'
import { VSpacer } from 'components/VSpacer'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export const CommitmentTableFilter = () => {
  const theme = useTheme()
  const { isTablet } = useAppBreakpoints()
  const [isEmailPopupVisible, setIsEmailPopupVisible] = useState<boolean>(false)

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item container justifyContent={'space-between'}>
        <Grid item xs={12} md={4}>
          <SearchFilter fullWidth placeholder='Search Name' />
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
            {isTablet && <VSpacer size={'small'} />}
            <FundStatusFilter />
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
                fontSize: 14,
                fontWeight: 400,
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
