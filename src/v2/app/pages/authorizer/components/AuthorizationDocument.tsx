import React from 'react'
import { Grid, Typography, Tooltip } from '@material-ui/core'
import { ViewDocument } from 'v2/app/components/DSO/components/ViewDocument'
import { useStyles } from './AuthorizationDocument.styles'
import { documentIcons } from 'v2/helpers/rendering'
import { DownloadDocument } from 'v2/components/dataroom/DownloadDocument'
import { DataroomUploaderRenderProps } from 'v2/components/dataroom/DataroomUploader'

export interface AuthorizationDocumentProps
  extends Pick<DataroomUploaderRenderProps, 'value'> {}

export const isImage = (filename: string) => {
  return (
    filename.endsWith('.png') ||
    filename.endsWith('.jpg') ||
    filename.endsWith('.jpeg')
  )
}

export const getDocumentType = (
  filename: string
): keyof typeof documentIcons => {
  const splitted = filename.split('.')
  const extension = splitted[splitted.length - 1]
  const types = {
    pdf: 'pdf' as const,
    txt: 'txt' as const,
    docx: 'docx' as const,
    unknown: 'unknown' as const
  }

  return types[extension as keyof typeof types] ?? types.unknown
}

export const AuthorizationDocument = (props: AuthorizationDocumentProps) => {
  const { value: document } = props
  const classes = useStyles()

  if (document === null) {
    return null
  }

  return (
    <Grid item className={classes.container}>
      <DownloadDocument documentId={document._id} ownerId={document.user}>
        {download => (
          <Grid
            className={classes.inner}
            container
            direction='column'
            alignItems='center'
          >
            <Grid
              item
              container
              direction='column'
              alignItems='center'
              justify='center'
              className={classes.imageWrapper}
            >
              <ViewDocument documentId={document._id} ownerId=''>
                {url => (
                  <img
                    className={classes.image}
                    alt={document.originalFileName}
                    src={
                      isImage(document.originalFileName)
                        ? url
                        : documentIcons[
                            getDocumentType(document.originalFileName)
                          ]
                    }
                  />
                )}
              </ViewDocument>
            </Grid>

            <Grid item xs zeroMinWidth className={classes.type}>
              <Tooltip title={document.type}>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  noWrap
                  onClick={download}
                >
                  {document.type}
                </Typography>
              </Tooltip>
            </Grid>

            <Grid item xs zeroMinWidth>
              <Tooltip title={document.originalFileName}>
                <Typography noWrap data-text-popup={document?.originalFileName}>
                  {document.originalFileName}
                </Typography>
              </Tooltip>
            </Grid>
          </Grid>
        )}
      </DownloadDocument>
    </Grid>
  )
}
