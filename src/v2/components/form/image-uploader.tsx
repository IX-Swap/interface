import React, { useState, useEffect, useRef } from 'react'
import { noop, get } from 'lodash'
import { useFormContext } from 'react-hook-form'

import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import CloseIcon from '@material-ui/icons/Close'
import UploadIcon from '@material-ui/icons/CloudUpload'
import { DocumentGuide } from '../../types/document'
import { uploadFile } from '../../helpers/httpRequests'
import { snackbarService } from 'uno-material-ui'

interface ImageUploaderProps {
  name: string
  getter: (doc: { _id: string }) => Promise<string>
  guide: DocumentGuide
  defaultValue?: string
  variant?: 'square' | 'circle'
  hasDelete?: boolean
  width?: number
  editMode?: boolean
  onUpload?: (doc: Document) => void
}

const ImageUploader = ({
  editMode = false,
  variant = 'circle',
  hasDelete = true,
  width = 75,
  onUpload = noop,
  defaultValue = '',
  getter,
  guide,
  name
}: ImageUploaderProps) => {
  const [imgSrc, setImgSrc] = useState('')
  const { setValue, getValues, register } = useFormContext() || {
    register: () => {},
    setValue: () => {},
    getValues: () => {}
  }
  const [imageKey, setImageKey] = useState(
    get(getValues(), name) ?? defaultValue
  )
  const calcWidth = width / 10
  const padding = 5
  const inputRef = useRef<HTMLInputElement>(null)

  const deletePhoto = () => {
    setValue(name, null)
    setImageKey('')
  }

  const handleChange = async () => {
    if (inputRef.current) {
      if (!inputRef.current?.files?.length) return
      const res = await uploadFile(inputRef.current?.files?.[0], guide)
      if (res) {
        setValue(name, res._id)
        setImageKey(res._id)

        snackbarService.showSnackbar(
          `Successfully uploaded ${guide.title}`,
          'success'
        )

        if (onUpload) {
          onUpload((res as unknown) as Document)
        }
      }
    }
  }

  const useStyles = makeStyles(() => ({
    photo: {
      height: width,
      width,
      borderRadius: variant === 'circle' ? '100%' : '5px',
      backgroundColor: '#f0f0f0',
      backgroundSize: 'cover',
      marginRight: '18px'
    },
    uploadButton: {
      display: 'none',
      position: 'absolute',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      zIndex: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.5)'
    },
    uploadContainer: {
      position: 'relative',
      '&:hover': editMode
        ? {
            '& $uploadButton': {
              display: 'flex'
            }
          }
        : undefined
    }
  }))

  const classes = useStyles()

  useEffect(() => {
    ;(async () => {
      const mSrc = await getter({ _id: imageKey })
      setImgSrc(mSrc.includes('application/json') ? '' : mSrc)
    })()
  }, [imageKey, getter])

  return (
    <div className={classes.uploadContainer}>
      <input
        type='text'
        style={{ opacity: 0, width: 1, height: 1, position: 'absolute' }}
        name={name}
        ref={register}
      />
      {editMode && hasDelete && (
        <IconButton
          onClick={deletePhoto}
          style={{
            position: 'absolute',
            top: `-${(calcWidth + padding) / 2}px`,
            right: `-${(calcWidth + padding) / 2}px`,
            padding: `${padding}px`,
            zIndex: 1
          }}
        >
          <CloseIcon style={{ width: calcWidth, height: calcWidth }} />
        </IconButton>
      )}
      <div
        className={classes.photo}
        style={{
          backgroundImage: `${imgSrc ? `url(${imgSrc})` : undefined}`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          margin: '0 auto'
        }}
      />
      <div className={classes.uploadButton}>
        <input
          ref={inputRef}
          id={`${name}-file`}
          multiple
          hidden
          type='file'
          onChange={handleChange}
        />
        <label htmlFor={`${name}-file`}>
          <IconButton component='span'>
            <UploadIcon style={{ fontSize: width / 3 }} />
          </IconButton>
        </label>
      </div>
    </div>
  )
}

export default ImageUploader
