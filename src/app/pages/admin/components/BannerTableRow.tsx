import React from 'react'
import { Grid, Typography, TableRow, IconButton } from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons'
import { TableCell } from 'app/pages/identity/components/UploadDocumentsForm/UploadDocumentField/TableCell'
import { formatDateAndTime } from 'helpers/dates'
import { DataroomBanner } from 'types/dataroomBanner'
import { ViewUploadedBanner } from 'app/pages/admin/components/ViewUploadedBanner'
import { useDeleteBanner } from 'app/pages/admin/hooks/useDeleteBanner'
import { queryCache } from 'react-query'
import { bannersQueryKeys } from 'config/queryKeys'
import { Avatar } from 'components/Avatar'
import { useFormContext } from 'react-hook-form'

export interface DocumentTableRowProps {
  banner: DataroomBanner
}

export const BannerTableRow = ({ banner }: DocumentTableRowProps) => {
  const { watch, setValue } = useFormContext()

  const titleWatch = watch('title')
  const bannerWatch = watch('banner')

  const [deleteBanner, { status }] = useDeleteBanner(banner._id, {
    onSuccess: () => {
      void queryCache.invalidateQueries(bannersQueryKeys.getBannersList)
    }
  })

  if (banner._id === undefined) {
    return null
  }

  const removeBanner = async () => {
    await deleteBanner()
  }

  return (
    <TableRow>
      <TableCell
        component='th'
        scope='row'
        style={{ paddingTop: 24, paddingBottom: 24 }}
      >
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
              size={[245, 75]}
              documentId={banner._id}
              variant='square'
              ownerId={'1'}
              isNewThemeOn
              isSmallPreview
            />
          </Grid>
          <Grid item>
            <Typography>{banner.originalFileName}</Typography>
          </Grid>
        </Grid>
      </TableCell>
      <TableCell
        component='th'
        scope='row'
        style={{ minWidth: 40, paddingTop: 24, paddingBottom: 24 }}
      />
      <TableCell
        component='th'
        scope='row'
        align={'left'}
        style={{ paddingTop: 24, paddingBottom: 24 }}
      >
        <Typography>{banner.title}</Typography>
      </TableCell>
      <TableCell
        component='th'
        scope='row'
        style={{ minWidth: 40, paddingTop: 24, paddingBottom: 24 }}
      />
      <TableCell
        component='th'
        scope='row'
        align={'left'}
        style={{ paddingTop: 24, paddingBottom: 24 }}
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
        style={{ paddingTop: 24, paddingBottom: 24 }}
      >
        <ViewUploadedBanner bannerId={banner._id} />
        <IconButton
          onClick={() => {
            void removeBanner()
            if (
              titleWatch === banner.title &&
              bannerWatch === banner._id &&
              status === 'success'
            ) {
              setValue('banner', undefined)
              setValue('title', 'Title')
            }
          }}
        >
          <DeleteOutline color='disabled' />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
