import {
  ClickAwayListener,
  Grid,
  Paper,
  Popper,
  Typography,
  Button,
  Tooltip
} from '@mui/material'
import { PairList } from 'app/pages/invest/components/PairList/PairList'
import useStyles from 'app/pages/invest/components/PairListDropdown/PairListDropdown.styles'
import { PairName } from 'app/pages/invest/components/PairListDropdown/PairName'
import { PairTableFilter } from 'app/pages/invest/components/PairTable/PairTableFilter/PairTableFilter'
import { useOTCMarket, useExchage } from 'app/pages/invest/hooks/useOTCMarket'
import { AppRouterLink } from 'components/AppRouterLink'
import React, { useEffect, useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { ReactComponent as LaunchIcon } from 'assets/icons/actions/view.svg'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Action } from 'app/pages/authorizer/components/Action'
export interface PairListDropdownProps {
  pairName: string
  hideDropdown?: boolean
  path: string
  params: any
}

export const PairListDropdown = ({
  pairName,
  path,
  params,
  hideDropdown = false
}: PairListDropdownProps) => {
  const popperRef = useRef(null)
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const { pairId } = useParams<{ pairId: string }>()
  const { data: marketData } = useOTCMarket(pairId)
  const { data: exchangeData } = useExchage(pairId)
  const { location } = useHistory()
  const paramsIsDefined =
    params.userId !== undefined || params.issuerId !== undefined
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl !== null ? null : event.currentTarget)
  }

  useEffect(() => {
    setAnchorEl(null)
  }, [pairId])
  const renderPopper = () => {
    return (
      <Popper
        id='pairList'
        open={anchorEl !== null}
        anchorEl={anchorEl}
        placement='bottom-start'
        modifiers={[{ name: 'flip', enabled: false }]}
      >
        <Paper ref={popperRef} elevation={3} className={classes.paper}>
          <Grid container spacing={2} direction='column'>
            <Grid item>
              <PairTableFilter />
            </Grid>
            <Grid item>
              <PairList />
            </Grid>
          </Grid>
        </Paper>
      </Popper>
    )
  }

  const renderPopperWithOutsideClickHandler = () => {
    return (
      <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
        {renderPopper()}
      </ClickAwayListener>
    )
  }

  return (
    <>
      {location?.pathname?.includes('exchange') ? (
        <Grid
          sx={{ border: 'solid #EDF2FA 1px', borderRadius: '10px' }}
          container
          spacing={1}
        >
          <Grid item>
            <Grid container direction='column' justifyContent='flex-start'>
              <Grid item>
                <Typography
                  sx={{ color: '#778194', marginBottom: '5px' }}
                ></Typography>
                <PairName
                  handleClick={handleClick}
                  hideDropdown={hideDropdown}
                  pairName={pairName}
                />
              </Grid>
              {!hideDropdown && (
                <Grid item>
                  {anchorEl === null
                    ? renderPopper()
                    : renderPopperWithOutsideClickHandler()}
                </Grid>
              )}
            </Grid>
          </Grid>

          {marketData !== undefined && paramsIsDefined ? (
            <Grid
              item
              sx={{
                paddingBottom: '3px',
                display: 'flex'
              }}
            >
              <Typography
                variant='body2'
                sx={{
                  paddingBottom: '3px',
                  display: 'flex'
                }}
              >
                <AppRouterLink to={path} params={params} variant='inherit'>
                  <Action
                    icon={LaunchIcon}
                    label={''}
                    onClick={function (): void {
                      throw new Error('')
                    }}
                  />
                </AppRouterLink>

                {exchangeData?.listing?.productType === 'exemptProduct' ? (
                  <>
                    <Button
                      sx={{
                        paddingBottom: '3px',
                        background: '#778194',
                        padding: '10px 24px',
                        borderRadius: '56px',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        fontSize: '14px',
                        letterSpacing: '0.02em',
                        lineHeight: '17px',
                        marginLeft: '5px ',
                        marginRight: '12px '
                      }}
                    >
                      Exempt
                    </Button>

                    <Tooltip
                      sx={{ cursor: 'pointer' }}
                      arrow
                      placement={'right-start'}
                      title={
                        <div>
                          <h1
                            style={{
                              color: '#343A47',
                              fontSize: '11px',
                              letterSpacing: '-0.01em',
                              fontWeight: 600
                            }}
                          >
                            Exempt Product Disclosure
                          </h1>
                          <p
                            style={{
                              color: '#778194',
                              fontSize: '11px',
                              letterSpacing: '-0.01em',
                              fontWeight: 500
                            }}
                          >
                            InvestaX Trading Platform is referred to as IX
                            Exchange and there are Exempt Products and Approved
                            Products Listed on IX Exchange. Exempt Products
                            trading on IX Exchange are marked with a grey tag
                          </p>
                          <p
                            style={{
                              color: '#778194',
                              fontSize: '11px',
                              letterSpacing: '-0.01em',
                              fontWeight: 500
                            }}
                          >
                            Exempt Products trading on IX Exchange are marked
                            with a grey tag{' '}
                            <Button
                              style={{
                                background: '#778194',
                                padding: '5px 5px',
                                width: '100px',
                                textAlign: 'center',
                                borderRadius: '56px',
                                fontWeight: 600,
                                color: '#FFFFFF',
                                fontSize: '11px',
                                letterSpacing: '0.01em'
                              }}
                            >
                              Exempt
                            </Button>
                          </p>
                          and these products are &nbsp;
                          <b>
                            not regulated under the Securities and Futures Act,
                            2001 ("SFA").
                          </b>
                          <p
                            style={{
                              color: '#778194',
                              fontSize: '11px',
                              letterSpacing: '-0.01em',
                              fontWeight: 500
                            }}
                          >
                            InvestaX is exempted from Section 7(1) of the SFA in
                            respect of operating an Organised Market for
                            Collective Investment Schemes the property of which
                            consists solely of Non-Capital Markets Products
                            under Section 7(7) of the SFA.
                          </p>
                        </div>
                      }
                      enterTouchDelay={0}
                    >
                      <InfoOutlinedIcon
                        style={{ marginTop: '8px' }}
                        color='disabled'
                      ></InfoOutlinedIcon>
                    </Tooltip>
                  </>
                ) : null}
              </Typography>
            </Grid>
          ) : null}
        </Grid>
      ) : (
        <Grid
          container
          spacing={1}
          justifyContent='flex-start'
          alignItems='end'
        >
          <Grid item>
            <Grid container direction='column' justifyContent='flex-start'>
              <Grid item>
                <Typography sx={{ color: '#778194', marginBottom: '5px' }}>
                  Pair
                </Typography>
                <PairName
                  handleClick={handleClick}
                  hideDropdown={hideDropdown}
                  pairName={pairName}
                />
              </Grid>
              {!hideDropdown && (
                <Grid item>
                  {anchorEl === null
                    ? renderPopper()
                    : renderPopperWithOutsideClickHandler()}
                </Grid>
              )}
            </Grid>
          </Grid>

          {marketData !== undefined && paramsIsDefined ? (
            <Grid
              item
              sx={{
                paddingBottom: '3px'
              }}
            >
              <Typography variant='body2'>
                <AppRouterLink to={path} params={params} variant='inherit'>
                  View Details
                </AppRouterLink>
              </Typography>
            </Grid>
          ) : null}
        </Grid>
      )}
    </>
  )
}
