import React, { useCallback, useState } from 'react'
import { useDropzone, FileWithPath } from 'react-dropzone'
import { ImageContainer, PreviewParent, StyledClose, StyledLogo } from './styleds'
import { SvgIconWrapper } from 'theme'
import { getfileType } from './utils'
import { AcceptFiles, FileTypes } from './types'

interface Props {
  onDrop: (file: any) => void
  file: FileWithPath | null
  accept?: AcceptFiles
  isLogo?: boolean
  isBanner?: boolean
  width?: string
  height?: string
}
const Preview = ({
  file,
  filePath,
  onDelete,
  isLogo,
  width,
  height,
}: {
  file: FileWithPath | null
  filePath: string
  onDelete: (e: any) => void
  isLogo: boolean
  width: string
  height: string
}) => {
  const getPreviewElement = useCallback(() => {
    const fileType = getfileType(file)
    switch (fileType) {
      case FileTypes.AUDIO:
        return <audio src={filePath} controls />
      case FileTypes.VIDEO:
        return <video src={filePath} controls loop />
      case FileTypes.IMAGE:
        return <img src={filePath} />
      default:
        if (!filePath && !file) {
          return <StyledLogo />
        }
        return null
    }
  }, [file, filePath])
  return (
    <PreviewParent width={width} height={height} isLogo={isLogo}>
      {getPreviewElement()}
      {file && <StyledClose onClick={(e) => onDelete(e)} />}
    </PreviewParent>
  )
}

export default function Upload({
  onDrop,
  file,
  isLogo = false,
  isBanner = false,
  width = '100%',
  height = '100%',
  accept = AcceptFiles.ALL,
}: Props) {
  const [filePath, setFilePath] = useState<string>('')
  const onDropInput = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (filePath) {
        URL.revokeObjectURL(filePath)
      }
      const preview = URL.createObjectURL(file)
      setFilePath(preview)
      onDrop(file)
    },
    [onDrop, filePath]
  )
  const onDelete = useCallback(
    (e: any) => {
      e?.stopPropagation()
      onDrop(null)
      setFilePath('')
    },
    [onDrop, setFilePath]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropInput,
    accept,
  })
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} multiple={false} />
      {isDragActive ? <p>Drop the files here ...</p> : <p>Drag and drop some files here, or click to select files</p>}
      <ImageContainer isBanner={isBanner}>
        <Preview width={width} height={height} isLogo={isLogo} filePath={filePath} file={file} onDelete={onDelete} />
      </ImageContainer>
    </div>
  )
}
