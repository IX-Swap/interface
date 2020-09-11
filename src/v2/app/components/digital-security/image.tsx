import React from 'react'
import storageHelper from '../../../helpers/storageHelper'
import { getImgUrl } from 'v2/helpers/httpRequests'
import ImageUploader from 'v2/components/form/ImageUploader'

const DsoImage = ({
  editMode = false,
  dsoId = ''
}: {
  dsoId: string
  editMode?: boolean
}) => {
  const guide = {
    title: 'DSO Logo',
    label: 'DSO Logo',
    type: 'dsoLogo'
  }

  const setPhoto = async ({ _id = '' }: { _id: string }) => {
    const x = await getImgUrl(
      editMode
        ? `/dataroom/raw/${storageHelper.getUserId()}/${_id ?? ''}`
        : `/issuance/dso/dataroom/logo/raw/${dsoId}`
    )

    return x
  }

  return (
    <ImageUploader
      editMode={editMode}
      hasDelete={false}
      variant='circle'
      name='logo'
      defaultValue={dsoId}
      getter={setPhoto}
      width={50}
      guide={guide}
    />
  )
}

export default DsoImage
