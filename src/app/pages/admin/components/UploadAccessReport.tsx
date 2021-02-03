import React from 'react'
import { DataroomUploader } from 'components/dataroom/DataroomUploader'
import { UploadButton } from 'components/dataroom/UploadButton'
import { Form } from 'components/form/Form'
import { documentsURL } from 'config/apiURL'
import { homeQueryKeys } from 'config/queryKeys'
import { useQueryCache } from 'react-query'

export const UploadAccessReport = () => {
  const queryCache = useQueryCache()

  return (
    <Form>
      <DataroomUploader
        name=''
        label=''
        documentInfo={{ title: '', type: '' }}
        value={null}
        onChange={() => {
          void queryCache.refetchQueries(homeQueryKeys.getAccessReports)
        }}
        uri={documentsURL.uploadAccessReport}
        render={renderProps => (
          <UploadButton
            onClick={renderProps.handleUpload}
            isLoading={renderProps.uploadState.isLoading}
            variant='outlined'
            color='primary'
          />
        )}
      />
    </Form>
  )
}
