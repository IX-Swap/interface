import { Box, Button, Grid, Typography, useTheme } from '@material-ui/core'
import { format } from 'date-fns'
import React from 'react'
import { getDocumentType, isImage } from 'components/dataroom/DataroomColumns'
import { documentIcons } from 'helpers/rendering'
import { ViewDocument } from 'app/components/DSO/components/ViewDocument'
import { useDownloadRawDocument } from 'hooks/useDownloadRawDocument'
import { convertBlobToFile, openFileInNewTab } from 'hooks/utils'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton
} from 'react-share'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'
import LinkedInIcon from '@material-ui/icons/LinkedIn'

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

export interface AtlasOneReportRowProps {
  item: Report
}

export const AtlasOneReportRow = ({ item }: AtlasOneReportRowProps) => {
  const theme = useTheme()

  const [downloadDocument, { isLoading }] = useDownloadRawDocument(
    { documentId: item._id, ownerId: item.user },
    {
      onSuccess: ({ data }) => {
        const file = convertBlobToFile(data, '') // TODO: fix name
        openFileInNewTab(file)
      }
    }
  )
  const handleClick = async () => await downloadDocument()

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
      <Grid item xs={12} md={4}>
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
      <Grid item xs={12} md={4}>
        <Grid
          container
          spacing={2}
          alignItems='center'
          justify='flex-end'
          wrap='nowrap'
        >
          <Grid item style={{ display: 'flex', alignItems: 'center' }}>
            {isAtlasOne && (
              <>
                <FacebookShareButton
                  url={item.publicFile?.publicUrl ?? item.url}
                >
                  <FacebookIcon
                    fontSize='default'
                    style={{
                      color: '#0C469C',
                      marginRight: 8,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  />
                </FacebookShareButton>
                <TwitterShareButton
                  url={item.publicFile?.publicUrl ?? item.url}
                >
                  <TwitterIcon
                    fontSize='default'
                    style={{
                      color: '#0C469C',
                      marginRight: 8,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  />
                </TwitterShareButton>
                <LinkedinShareButton
                  url={item.publicFile?.publicUrl ?? item.url}
                >
                  <LinkedInIcon
                    fontSize='default'
                    style={{
                      color: '#0C469C',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  />
                </LinkedinShareButton>
              </>
            )}
          </Grid>
          <Grid item>
            {isAtlasOne ? (
              <Button
                color='primary'
                variant='outlined'
                href={item.publicFile?.publicUrl ?? item.url}
                target='_blank'
                style={{
                  minWidth: 110
                }}
              >
                {`View ${file !== undefined ? 'PDF' : 'Report'}`}
              </Button>
            ) : (
              <Button
                variant='outlined'
                color='primary'
                onClick={handleClick}
                disabled={isLoading}
                style={{
                  minWidth: 110
                }}
              >
                {`View ${
                  file !== undefined && isImage(file)
                    ? 'Image'
                    : getDocumentType(file ?? '.pdf')
                }`}
              </Button>
            )}
          </Grid>
          <Grid item style={{ display: 'flex', alignItems: 'center' }}>
            {isAtlasOne ? (
              <img
                width={70}
                height='auto'
                src={require(theme.palette.type === 'light'
                  ? 'assets/icons/atlas_logo.png'
                  : 'assets/icons/atlas_logo_white.png')}
                alt={'Atlas One'}
              />
            ) : (
              <img
                width={70}
                height='auto'
                src={require('assets/icons/logo-color.svg')}
                alt={'InvestaX'}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
