import React from 'react'
import { Card, Box, Grid, Typography, Button } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Link } from 'react-router-dom'

export interface CreateIdentityCardProps {
  title: string
  content: string
  cardColor: 'red' | 'green' | 'blue'
  active?: boolean
  contentIcon?: React.ReactElement
  isLink?: boolean
  linkLabel?: string
  linkPath?: string
}

export const CreateIdentityCard = ({
  title,
  content,
  contentIcon,
  cardColor,
  active = false,
  linkLabel = '',
  linkPath = '',
  isLink = false
}: CreateIdentityCardProps) => {
  const IdentitybuttonColorMap = {
    red: {
      primary: '#E65133',
      light: '#FADCD6'
    },
    green: {
      primary: '#90A30F',
      light: '#E5E9CB'
    },
    blue: {
      primary: '#4891FF',
      light: '#D1E4FF'
    }
  }

  const buttonColor = IdentitybuttonColorMap[cardColor]

  return (
    <Card
      elevation={0}
      style={{
        border: active ? '2px solid #0C469C' : '2px solid rgba(0,0,0,0)',
        textAlign: 'left',
        textTransform: 'none'
      }}
    >
      <Box p={3}>
        <Grid container direction='column' spacing={2}>
          <Grid item>
            <Typography variant='h5' style={{ color: buttonColor.primary }}>
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Box display='flex' justifyContent='space-between'>
              <Typography>{content}</Typography>
              {contentIcon !== undefined ? (
                <Box
                  style={{
                    backgroundColor: buttonColor.light,
                    color: buttonColor.primary,
                    position: 'relative',
                    marginTop: -20,
                    borderRadius: 28,
                    flexShrink: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 56,
                    height: 56
                  }}
                >
                  {contentIcon}
                </Box>
              ) : null}
            </Box>
          </Grid>
          {isLink ? (
            <Grid item>
              <Button
                component={Link}
                to={linkPath}
                disableRipple
                style={{
                  backgroundColor: buttonColor.light,
                  padding: 8,
                  paddingRight: 10
                }}
              >
                <AddCircleOutlineIcon
                  style={{
                    color: buttonColor.primary,
                    marginRight: 4
                  }}
                />
                <Typography
                  variant='subtitle2'
                  style={{
                    color: buttonColor.primary,
                    fontSize: 12,
                    lineHeight: '13px'
                  }}
                >
                  <Box fontWeight='bold'>{linkLabel}</Box>
                </Typography>
              </Button>
            </Grid>
          ) : (
            <Box py={1} />
          )}
        </Grid>
      </Box>
    </Card>
  )
}
