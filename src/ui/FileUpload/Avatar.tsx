import { Box, IconButton, Typography, InputLabel } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AvatarBox } from 'ui/FileUpload/AvatarBox'
import { CoverBox } from './CoverBox'
import { FileProps } from 'ui/FileUpload/File'
import { Icon } from 'ui/Icons/Icon'
import { Avatar as AvatarComponent } from 'components/Avatar'
import { getDataroomFileId } from 'helpers/dataroom'
import { useFormContext } from 'react-hook-form'
import classNames from 'classnames'
import { isString } from 'lodash'
import { SelfieGuide } from './SelfieGuide'

export const Avatar = ({
  hasError,
  isFileTooLarge,
  hasValue,
  label,
  placeHolder,
  name = '',
  rootProps,
  inputProps,
  disabled = false,
  value,
  readonly = false,
  isCover = false,
  isSelfie = false
}: FileProps) => {
  const { setValue } = useFormContext()

  const [currentValue, setCurrentValue] = useState(value)
  const isNotEmpty = currentValue !== undefined
  const [imageValue, setImageValue] = useState(false)

  useEffect(() => {
    if (inputProps?.ref?.current?.id === 'coverImg' || isCover) {
      setImageValue(true)
    }
    setCurrentValue(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const handleRemove = () => {
    setValue(name, undefined, { shouldDirty: true })
    setCurrentValue(undefined)
  }

  return (
    <Box>
      {label !== undefined && isString(label) && (
        <Box pb={0.5}>
          <InputLabel>{label}</InputLabel>
        </Box>
      )}
      {label !== undefined && !isString(label) && <Box pb={1}>{label}</Box>}
      {imageValue ? (
        <CoverBox
          className={classNames({
            hasError,
            isFileTooLarge,
            hasValue
          })}
          height={isCover ? '400px' : '150px'}
        >
          <Box
            {...rootProps}
            width='100%'
            height='100%'
            display='flex'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
            top={0}
            left={0}
            sx={{
              cursor: 'pointer'
            }}
          >
            {isNotEmpty ? (
              <AvatarComponent
                imageValue={imageValue}
                size={['100%', '100%']}
                documentId={getDataroomFileId(currentValue)}
              />
            ) : (
              <>
                <Icon name='file' />
                <Typography
                  className='label'
                  sx={{ ml: 1, lineHeight: '24px', textAlign: 'center' }}
                >
                  {placeHolder ?? label}
                </Typography>
              </>
            )}
            <input id={name} name={name} {...inputProps} disabled={disabled} />
          </Box>
          {isNotEmpty && !readonly ? (
            <Box position='absolute' right={2} bottom={2}>
              <IconButton onClick={handleRemove}>
                <Icon name='trash' />
              </IconButton>
            </Box>
          ) : null}
        </CoverBox>
      ) : (
        <AvatarBox
          className={classNames({
            hasError,
            isFileTooLarge,
            hasValue
          })}
          sx={{
            width: isSelfie ? (isNotEmpty ? '180px' : '100%') : '120px',
            height: isSelfie ? (isNotEmpty ? '255px' : 'auto') : '120px'
          }}
        >
          <Box
            {...rootProps}
            width='100%'
            height='100%'
            display='flex'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
            top={0}
            left={0}
            sx={{
              cursor: 'pointer'
            }}
          >
            {isNotEmpty ? (
              <AvatarComponent
                size={isSelfie ? [180, 255] : 120}
                documentId={getDataroomFileId(currentValue)}
                variant='square'
              />
            ) : isSelfie ? (
              <SelfieGuide />
            ) : (
              <>
                <Icon name='file' />
                <Typography
                  className='label'
                  sx={{ ml: 1, lineHeight: '24px', textAlign: 'center' }}
                >
                  {placeHolder ?? label}
                </Typography>
              </>
            )}
            <input id={name} name={name} {...inputProps} disabled={disabled} />
          </Box>
          {isNotEmpty && !readonly ? (
            <Box position='absolute' right={2} bottom={2}>
              <IconButton onClick={handleRemove}>
                <Icon name='trash' />
              </IconButton>
            </Box>
          ) : null}
        </AvatarBox>
      )}
    </Box>
  )
}
