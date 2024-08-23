import React from 'react'
import styled from 'styled-components'
import { FormControlLabel, Switch } from '@mui/material'

interface LaunchpadBannerProps {}

const LaunchpadBanner: React.FC<LaunchpadBannerProps> = () => {
  return (
    <>
      <FormControlLabel control={<Switch defaultChecked={false} />} label={<Label>Launchpad Banner</Label>} />
    </>
  )
}

export default LaunchpadBanner

const Label = styled.label`
  color: #292933;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%; /* 26px */
  letter-spacing: -0.6px;
`
