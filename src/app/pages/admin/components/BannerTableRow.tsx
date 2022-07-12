import React from 'react'
import { Grid, Typography, TableRow, IconButton, Box } from '@mui/material'
import { DeleteOutline } from '@mui/icons-material'
import { TableCell } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/TableCell'
import { formatDateAndTime } from 'helpers/dates'
import { DataroomBanner } from 'types/dataroomBanner'
import { ViewUploadedBanner } from 'app/pages/admin/components/ViewUploadedBanner'
import { useDeleteBanner } from 'app/pages/admin/hooks/useDeleteBanner'
import { Avatar } from 'components/Avatar'
import { useFormContext } from 'react-hook-form'

export interface BannerTableRowProps {
  banner: DataroomBanner
}

export const BannerTableRow = ({ banner }: BannerTableRowProps) => {
  const { watch, setValue } = useFormContext()
  const titleWatch = watch('title')
  const bannerWatch = watch('banner')

  const imageWidth = 245
  const imageHeight = 75
  const tableCellStyle = { paddingTop: 24, paddingBottom: 24 }

  const [deleteBanner] = useDeleteBanner(banner._id)
  const removeBanner = async () => {
    await deleteBanner()
    if (titleWatch === banner.title && bannerWatch === banner._id) {
      setValue('banner', undefined)
      setValue('title', 'Title')
    }
  }

  if (banner._id === undefined) {
    return null
  }

  return (
    <TableRow>
      <TableCell component='th' scope='row' style={tableCellStyle}>
        <Grid container spacing={5} alignItems='center'>
          <Grid
            item
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setValue('banner', banner._id)
              setValue('title', banner.title)
            }}
          >
            <Avatar
              size={[imageWidth, imageHeight]}
              documentId={banner._id}
              borderRadius={4}
              type={'banner'}
              border={'1px solid #AAAAAA'}
              variant='square'
              fallback={<Box width={imageWidth} height={imageHeight} />}
            />
          </Grid>
          <Grid item>
            <Typography>{banner.originalFileName}</Typography>
          </Grid>
        </Grid>
      </TableCell>
      <TableCell component='th' scope='row' style={tableCellStyle} />
      <TableCell
        component='th'
        scope='row'
        align={'left'}
        style={tableCellStyle}
      >
        <Typography>{banner.title}</Typography>
      </TableCell>
      <TableCell
        component='th'
        scope='row'
        style={{ minWidth: 40, ...tableCellStyle }}
      />
      <TableCell
        component='th'
        scope='row'
        align={'left'}
        style={tableCellStyle}
      >
        <Typography>
          {banner.createdAt !== undefined
            ? formatDateAndTime(banner.createdAt)
            : null}
        </Typography>
      </TableCell>
      <TableCell
        component='th'
        scope='row'
        align='right'
        style={tableCellStyle}
      >
        <ViewUploadedBanner
          bannerId={banner._id}
          name={banner.originalFileName}
        />
        <IconButton
          onClick={() => {
            void removeBanner()
          }}
          size='large'
        >
          <DeleteOutline color='disabled' />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
