import React, { useRef, useState, useEffect } from 'react'
import { Document, DocumentGuide } from '../../types/document'
import { useFormContext } from 'react-hook-form'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import { Grid, Button } from '@material-ui/core'
import { get } from 'lodash'
import { uploadFile } from '../../helpers/httpRequests'
import { snackbarService } from 'uno-material-ui'

type ValueOf<T> = T[keyof T];

interface UploaderProps {
  guide: DocumentGuide
  name: string
  download: (id: string, newUpload: boolean) => void
  docId?: string
  variant?: 'button' | 'row'
  editMode?: boolean
  override?: boolean
  delete?: () => void
  showTitle?: boolean
  onUpload?: (doc: Document) => void
}

interface UploaderState {
  guide: DocumentGuide,
  docId: string,
  uploaded: boolean
}

const Uploader = ({
  name,
  guide,
  download,
  onUpload,
  editMode = false,
  showTitle = false,
  override = false,
  docId = ''
}: UploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [state, setState] = useState<UploaderState>({
    guide,
    docId: docId,
    uploaded: false
  })
  const updateState = (key: keyof UploaderState, value: ValueOf<UploaderState>) => {
    setState({
      ...state,
      [key]: value
    })
  }
  const { setValue, getValues, register } = useFormContext() || {
    register: {},
    setValue: () => {},
    getValues: () => {}
  }

  const prepareDownload = () => {
    download(state.docId, state.uploaded)
  }

  const handleChange = async () => {
    if (inputRef.current) {
      if (!inputRef.current?.files?.length) return
      const res = await uploadFile(inputRef.current?.files?.[0], state.guide)
      if (res) {
        setValue(name, res._id)

        snackbarService.showSnackbar(
          `Successfully uploaded ${state.guide.title}`,
          'success'
        )

        if (onUpload) {
          onUpload(res)
          return
        }

        setState({
          docId: res._id,
          uploaded: true,
          guide: {
            ...state.guide,
            label: res.originalFileName
          }
        })
      }
    }
  }

  useEffect(() => {
    const val = get(getValues(), name) || docId
    updateState('docId', val)

    // TODO: fix this inifnite loop
    // eslint-disable-next-line
  }, []);

  const columns = (showTitle && state.guide.title !== state.guide.label) ? 4 : 6

  return (
    <>
      <Grid
        container
        direction='row'
        justify='space-between'
        alignItems='center'
      >
        {
          showTitle && (
            <Grid item xs={columns}>
              <span>{state.guide.title}</span>
            </Grid>
          )
        }
        {
          (state.guide.title !== state.guide.label) && (
            <Grid item xs={columns}>
              <span>{state.guide.title !== state.guide.label ? state.guide.label : ''}</span>
            </Grid>
          )
        }
        <Grid item container direction='row' xs={columns} justify='flex-end'>
          {editMode && (!state.docId || override) && (
            <Grid item>
              <input
                ref={inputRef}
                id={`${name}-file`}
                hidden
                type='file'
                onChange={handleChange}
              />
              <label htmlFor={`${name}-file`}>
                <Button component='span' variant='contained'>
                  Upload
                </Button>
              </label>
            </Grid>
          )}
          <Grid item>
            <Button
              onClick={() => {
                prepareDownload()
              }}
              disabled={!state.docId}
            >
              <CloudDownloadIcon />
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <input
        type='text'
        style={{ opacity: 0, width: 1, height: 1, position: 'absolute' }}
        name={name}
        ref={register}
      />
    </>
  )
}

export default Uploader
