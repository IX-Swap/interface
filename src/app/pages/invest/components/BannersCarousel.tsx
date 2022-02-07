import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useBannersList } from 'app/pages/admin/hooks/useBannersList'
import { Avatar } from 'components/Avatar'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { DataroomBanner } from 'types/dataroomBanner'

export const BannersCarousel = () => {
  const theme = useTheme()
  const { data, isLoading } = useBannersList()

  if (typeof data === 'undefined' || isLoading) {
    return null
  }

  return (
    <Grid
      style={{ paddingTop: theme.spacing(3), paddingBottom: theme.spacing(4) }}
    >
      <Carousel
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        interval={3000}
        infiniteLoop
        autoPlay
      >
        {data.map((item: DataroomBanner) => {
          const { title, _id } = item

          return (
            <div key={_id}>
              {title !== '' ? (
                <Typography
                  variant='h4'
                  style={{
                    marginBottom: theme.spacing(2.5),
                    textAlign: 'left'
                  }}
                >
                  {title}
                </Typography>
              ) : null}
              <Avatar
                size={['100%', 'auto']}
                documentId={_id}
                variant={'square'}
                type={'banner'}
                fallback={<Box />}
              />
            </div>
          )
        })}
      </Carousel>
    </Grid>
  )
}
