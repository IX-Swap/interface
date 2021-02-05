import { Tooltip, IconButton } from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons'
import { DownloadAccessDocument } from 'app/pages/home/components/DownloadAccessDocument'
import { homeQueryKeys } from 'config/queryKeys'
import { useDeleteFile } from 'hooks/useDeleteFile'
import React, { Fragment } from 'react'
import { useQueryCache } from 'react-query'
import { DataroomFile } from 'types/dataroomFile'

export interface AccessReportActionsProps {
  document: DataroomFile
}

export const AccessReportActions = (props: AccessReportActionsProps) => {
  const { document } = props
  const queryCache = useQueryCache()
  const [deleteFile, { isLoading }] = useDeleteFile(document._id, {
    onSuccess: () => {
      void queryCache.invalidateQueries(homeQueryKeys.getAccessReports)
    }
  })

  return (
    <Fragment>
      <Tooltip title='Delete File'>
        <IconButton onClick={() => void deleteFile()} disabled={isLoading}>
          <DeleteOutline color='disabled' style={{ width: 24, height: 24 }} />
        </IconButton>
      </Tooltip>

      <DownloadAccessDocument documentId={document._id} />
    </Fragment>
  )
}
