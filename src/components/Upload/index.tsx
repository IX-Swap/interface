import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { ImageContainer, PreviewParent, StyledClose, StyledLogo } from './styleds'
import { SvgIconWrapper } from 'theme'

interface Props {
  onDrop: (file: any) => void
  file: any
}
const Preview = ({ file, filePath, onDelete }: { file: any; filePath: string; onDelete: (e: any) => void }) => {
  if (!(file && filePath)) {
    return (
      <PreviewParent>
        <StyledLogo />
      </PreviewParent>
    )
  }
  const fileType = String(file?.type)
  const extension = String(file?.name?.split('.')[1])
  if (fileType?.startsWith('image')) {
    return (
      <PreviewParent>
        <img src={filePath} />
        <StyledClose onClick={(e) => onDelete(e)} />
      </PreviewParent>
    )
  }
  if (fileType?.startsWith('video')) {
    return (
      <PreviewParent>
        <video src={filePath} controls loop />
        <StyledClose onClick={(e) => onDelete(e)} />
      </PreviewParent>
    )
  }
  if (fileType?.startsWith('audio')) {
    return (
      <PreviewParent>
        <audio src={filePath} controls />
        <StyledClose onClick={(e) => onDelete(e)} />
      </PreviewParent>
    )
  }

  return null
}

export default function Upload({ onDrop, file }: Props) {
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
  // useEffect(() => {
  //   if (!file && filePath) {
  //     URL.revokeObjectURL(filePath)
  //     setFilePath('')
  //   }
  // }, [file, filePath])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onDropInput })
  console.log({ file, filePath })
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} multiple={false} accept="image/*,video/*,audio/*,webgl/*,.glb,.gltf" />
      {isDragActive ? <p>Drop the files here ...</p> : <p>Drag and drop some files here, or click to select files</p>}
      <ImageContainer>
        <Preview filePath={filePath} file={file} onDelete={onDelete} />
        {/* <ImageOverlay /> */}
      </ImageContainer>
    </div>
  )
}
