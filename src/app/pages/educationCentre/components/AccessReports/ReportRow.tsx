import { Box, Grid, Typography } from '@material-ui/core'
import { format } from 'date-fns'
import React from 'react'
import { getDocumentType, isImage } from 'components/dataroom/DataroomColumns'
import { documentIcons } from 'helpers/rendering'
import { ViewDocument } from 'app/components/DSO/components/ViewDocument'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { ReportLogo } from 'app/pages/educationCentre/components/AccessReports/ReportLogo'
import { ReportViewButton } from 'app/pages/educationCentre/components/AccessReports/ReportViewButton'

export interface PublicFile {
  publicUrl: string
}

export interface Report {
  _id: string
  user: string
  title: string
  type: string
  feature: string
  originalFileName: string
  checksum: string
  publicFile?: null | PublicFile
  createdAt: string
  url: string
  reportType: 'dataroom' | 'atlasone'
}

export interface ReportRowProps {
  item: Report
}

export const ReportRow = ({ item }: ReportRowProps) => {
  const { isTablet } = useAppBreakpoints()

  const isAtlasOne = item.reportType === 'atlasone'
  const file = isAtlasOne ? item.publicFile?.publicUrl : item.originalFileName

  const imageStyle = {
    width: 24,
    height: 24,
    marginRight: 8,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    borderRadius: 4,
    overflow: 'hidden'
  }

  return (
    <Grid container justify='space-between' spacing={3} alignItems='center'>
      <Grid item xs={12} md={4}>
        <Grid container spacing={1} alignItems='center' wrap='nowrap'>
          <Grid item>
            {(file !== undefined && (
              <>
                {isAtlasOne ? (
                  <img
                    alt={file}
                    src={documentIcons[getDocumentType(file)]}
                    style={imageStyle}
                  />
                ) : (
                  <ViewDocument documentId={item._id} ownerId={item.user}>
                    {url =>
                      isImage(file) ? (
                        <div
                          style={{
                            ...imageStyle,
                            backgroundImage: `url("${url}")`
                          }}
                        />
                      ) : (
                        <img
                          alt={file}
                          src={documentIcons[getDocumentType(file)]}
                          style={imageStyle}
                        />
                      )
                    }
                  </ViewDocument>
                )}
              </>
            )) || <Box style={imageStyle} />}
          </Grid>
          <Grid item>
            <Typography variant='subtitle1'>
              {isAtlasOne ? item.title : item.originalFileName}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={5}>
        <Grid
          container
          spacing={2}
          alignItems='center'
          justify='flex-end'
          wrap='nowrap'
        >
          <Grid item>
            <Typography variant='body1' color='textSecondary'>
              {isAtlasOne ? 'Atlas One Research' : 'InvestaX Access Report'}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='body1' color='textSecondary'>
              {format(new Date(item.createdAt), 'EEEE, MMMM dd yyyy')}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={3}>
        <Grid
          container
          spacing={2}
          alignItems='center'
          justify={isTablet ? 'center' : 'flex-end'}
          direction={isTablet ? 'column' : 'row'}
          wrap='nowrap'
        >
          <Grid item>
            <ReportViewButton item={item} isAtlasOne={isAtlasOne} />
          </Grid>
          <Grid item style={{ display: 'flex', alignItems: 'center' }}>
            <ReportLogo isAtlasOne={isAtlasOne} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
