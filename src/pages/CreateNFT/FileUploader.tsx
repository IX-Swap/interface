import React, { FC, ReactChildren, useMemo } from 'react'
import { Box, Flex } from 'rebass'
import { FileWithPath } from 'react-dropzone'

import { TYPE } from 'theme'
import Upload, { Preview } from 'components/Upload'
import { AcceptFiles } from 'components/Upload/types'

import { ReactComponent as UploadLogo } from 'assets/images/upload.svg'
import { UploaderCard, StyledPreview } from './styleds'

export interface UploaderProps {
  file: FileWithPath | null
  onDrop: (file: any) => void
  title: string
  error?: any | ReactChildren
  accept?: AcceptFiles
  isLogo?: boolean
  description?: string
}

export const FileUploader = ({ title, file, onDrop, error, accept, isLogo = false, description }: UploaderProps) => {
  const filePath = useMemo(() => {
    if (!file) return ''

    return URL.createObjectURL(file)
  }, [file])

  const onDelete = (e: any) => {
    e?.stopPropagation()
    onDrop(null)
  }

  return (
    <Box>
      {title && (
        <Box display="flex" paddingTop="16px">
          <TYPE.body1>{title}</TYPE.body1>
          <TYPE.error error>*</TYPE.error>
        </Box>
      )}
      <Upload accept={accept} file={file} onDrop={onDrop}>
        <UploaderCard isLogo={isLogo} isAudio={file?.type?.includes('audio')}>
          {file ? (
            <>
              <StyledPreview isLogo={isLogo}>
                <Preview
                  isLogo={isLogo}
                  width={'100%'}
                  height={'100%'}
                  file={file}
                  onDelete={onDelete}
                  filePath={filePath}
                />
              </StyledPreview>
            </>
          ) : (
            <Flex flexDirection="column" justifyContent="center" alignItems="center" style={{ maxWidth: 212 }}>
              <UploadLogo />
              <TYPE.small textAlign="center" marginTop="8px" color={'rgba(237, 206, 255, 0.5)'}>
                {description || (
                  <>
                    {accept?.includes('image') ? 'PNG, JPG, SVG, GIF' : 'PNG, JPG, SVG, GIF, MP4, WEBM, MP3, WAv.'}
                    <div>Max size 100 MB</div>
                  </>
                )}
              </TYPE.small>
            </Flex>
          )}
        </UploaderCard>
      </Upload>
      {error && (
        <TYPE.small marginTop="4px" color={'red1'}>
          {error}
        </TYPE.small>
      )}
    </Box>
  )
}
