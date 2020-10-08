import { Grid, IconButton, Typography, Tooltip } from '@material-ui/core'
import React from 'react'
import { ViewDocument } from 'v2/app/components/DSO/components/ViewDocument'
import { DataroomFile } from 'v2/types/dataroomFile'
import { Maybe } from 'v2/types/util'
import { useStyles } from './AuthorizationDocument.styles'
import { documentIcons } from 'v2/helpers/rendering'
import { DownloadDocument } from 'v2/app/pages/identity/components/dataroom/DownloadDocument'
import { Visibility } from '@material-ui/icons'

export interface AuthorizationDocumentProps {
  document: Maybe<DataroomFile>
  title: string
  input: JSX.Element
}

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
  const { document, input } = props
  const classes = useStyles()

  if (document === null) {
    return null
  }

  return (
    <Grid item xs={3}>
      <Grid container direction='column' alignItems='center' spacing={1}>
        <Grid item>
          <ViewDocument documentId={document._id} ownerId=''>
            {url => (
              <img
                className={classes.image}
                src={
                  isImage(document.originalFileName)
                    ? url
                    : documentIcons[getDocumentType(document.originalFileName)]
                }
                alt='document'
              />
            )}
          </ViewDocument>
        </Grid>

        <Grid item xs zeroMinWidth>
          <Typography variant='body2' noWrap>
            {document.type}
          </Typography>
        </Grid>

        <Grid item xs zeroMinWidth>
          <Tooltip title={document.originalFileName}>
            <Typography noWrap>{document.originalFileName}</Typography>
          </Tooltip>
        </Grid>

        <Grid item>
          <Grid container alignItems='center'>
            <DownloadDocument documentId={document._id}>
              {download => (
                <IconButton onClick={download} size='small'>
                  <Visibility />
                </IconButton>
              )}
            </DownloadDocument>
            {input}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
