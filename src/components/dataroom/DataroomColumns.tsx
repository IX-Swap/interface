import React, { Fragment } from 'react'
import { Box, Hidden, Typography } from '@mui/material'
import { formatDateAndTime } from 'helpers/dates'
import { DataroomFile } from 'types/dataroomFile'
import { Maybe } from 'types/util'
import { documentIcons } from 'helpers/rendering'
import { ViewDocument } from 'app/components/DSO/components/ViewDocument'
import { useTheme } from '@mui/material/styles'

export interface DataroomColumnsProps {
  title: string
  document: Maybe<DataroomFile>
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

export const DataroomColumns: React.FC<DataroomColumnsProps> = props => {
  const { title, document } = props
  const imageStyle = {
    width: 41,
    height: 51,
    marginRight: 16,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    borderRadius: 4,
    overflow: 'hidden'
  }
  const theme = useTheme()

  if (document?._id === undefined || document?._id === '') {
    return (
      <Box flex='1 1 auto'>
        <Typography variant='subtitle1'>{title}</Typography>
      </Box>
    )
  }

  return (
    <Fragment>
      <Box flex='1 0 40%' display='flex' alignItems='center'>
        <Hidden mdDown>
          <ViewDocument documentId={document._id} ownerId={document.user}>
            {url =>
              isImage(document.originalFileName) ? (
                <div
                  style={{ ...imageStyle, backgroundImage: `url("${url}")` }}
                />
              ) : (
                <img
                  alt={document.originalFileName}
                  src={
                    documentIcons[getDocumentType(document.originalFileName)]
                  }
                  style={imageStyle}
                />
              )
            }
          </ViewDocument>
        </Hidden>
        <Typography
          style={{
            color: theme.palette.text.primary,
            opacity: theme.palette.mode === 'light' ? 1 : 0.6
          }}
        >
          {document.originalFileName}
        </Typography>
      </Box>
      <Box flex='1 0 20%'>
        <Typography>{document.type === '' ? '–' : document.type}</Typography>
      </Box>
      <Box flex='1 0 20%'>
        <Typography>{formatDateAndTime(document.createdAt, true)}</Typography>
      </Box>
    </Fragment>
  )
}
