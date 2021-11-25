import React, { useState } from 'react'
import { Box, Flex } from 'rebass'
import { Label, Input, Select, Textarea, Radio, Checkbox } from '@rebass/forms'
import { ButtonGradient } from 'components/Button'
import Upload from 'components/Upload'

export const CreateForm = () => {
  const [file, setFile] = useState(null)
  const onDrop = (file: any) => {
    setFile(file)
  }

  return (
    <Box as="form" onSubmit={(e) => e.preventDefault()} py={3}>
      <Flex mx={-2} mb={3}>
        <Box width={1} px={2}>
          <Label htmlFor="name">Image, Video, Audio, or 3D Model</Label>
          <Upload onDrop={onDrop} file={file} />
        </Box>
      </Flex>
      <Flex mx={-2} flexWrap="wrap">
        <Box px={2} mr="auto">
          <ButtonGradient width="140px">Create</ButtonGradient>
        </Box>
      </Flex>
    </Box>
  )
}
