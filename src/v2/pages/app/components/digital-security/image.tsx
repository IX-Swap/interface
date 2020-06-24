import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles } from '@material-ui/styles'
import storageHelper from '../../../../helpers/storageHelper'
import { getImgUrl } from '../../../../helpers/httpRequests'
import { noop } from 'lodash'

const useStyles = makeStyles(() => ({
  logo: {
    width: '50px',
    height: '50px',
    borderRadius: '50px',
    backgroundColor: '#f0f0f0'
  }
}))

const DsoImage = ({
  logo,
  editMode = false,
  dsoId = ''
}: {
  dsoId: string
  editMode?: boolean
  logo?: string
}) => {
  const classes = useStyles()
  const [imgUrl, setImgUrl] = useState('')

  const setPhoto = useCallback((id: string) => {
    (async (mId) => {
      const x = await getImgUrl(
        editMode
          ? `/dataroom/raw/${storageHelper.getUserId()}/${id || ''}`
          : `/issuance/dso/dataroom/logo/raw/${id}`
      )

      setImgUrl(x)
    })(id).then(noop).catch(noop)
  }, [editMode])

  useEffect(() => {
    if (editMode) {
      if (logo) {
        setPhoto(logo)
      }

      return
    }

    if (dsoId) {
      setPhoto(dsoId)
    }
  }, [editMode, dsoId, logo, setPhoto])

  return (
    <div
      className={classes.logo}
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        margin: '0 auto'
      }}
    />
  )
}

export default DsoImage
