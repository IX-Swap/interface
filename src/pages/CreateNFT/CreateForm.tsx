import React, { useState } from 'react'
import { Box, Flex } from 'rebass'
import { Label, Input, Select, Textarea, Radio, Checkbox } from '@rebass/forms'
import { ButtonGradient } from 'components/Button'
import Upload from 'components/Upload'
import { ExternalLink, TYPE } from 'theme'
import { t, Trans } from '@lingui/macro'

export const CreateForm = () => {
  const [file, setFile] = useState(null)
  const [name, setName] = useState('')
  const [link, setLink] = useState('')
  const [description, setDescription] = useState('')
  const [properties, setProperties] = useState<Array<{ name: string; value: string }>>([])
  const onDrop = (file: any) => {
    setFile(file)
  }

  return (
    <Box as="form" onSubmit={(e) => e.preventDefault()} py={3}>
      <Flex mx={-2} mb={4}>
        <Box width={1} px={2}>
          <Label htmlFor="file" flexDirection="column" mb={1}>
            <Box display="flex">
              <TYPE.body>Image, Video, Audio, or 3D Model.</TYPE.body>
              <TYPE.error error>*</TYPE.error>
            </Box>
            <TYPE.descriptionThin>
              File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB
            </TYPE.descriptionThin>
          </Label>
          <Upload onDrop={onDrop} file={file} />
        </Box>
      </Flex>
      <Flex mx={-2} mb={4}>
        <Box width={1} px={2}>
          <Label htmlFor="name" flexDirection="column" mb={1}>
            <Box mb={1}>
              <Box display="flex">
                <TYPE.body>
                  <Trans>Name</Trans>
                </TYPE.body>
                <TYPE.error error>*</TYPE.error>
              </Box>
            </Box>
          </Label>
          <Input onChange={(e) => setName(e?.target?.value)} placeholder={t`Item name`} />
        </Box>
      </Flex>
      <Flex mx={-2} mb={4}>
        <Box width={1} px={2}>
          <Label htmlFor="link" flexDirection="column" mb={1}>
            <Box mb={1}>
              <TYPE.body>
                <Trans>External Link</Trans>
              </TYPE.body>
            </Box>
            <TYPE.descriptionThin>
              We will include a link to this URL on this item&apos;s detail page, so that users can click to learn more
              about it. You are welcome to link to your own webpage with more details.
            </TYPE.descriptionThin>
          </Label>
          <Input onChange={(e) => setLink(e?.target?.value)} placeholder={t`https://yoursite.io/item/123`} />
        </Box>
      </Flex>
      <Flex mx={-2} mb={4}>
        <Box width={1} px={2}>
          <Label htmlFor="description" flexDirection="column" mb={1}>
            <Box mb={1}>
              <TYPE.body>
                <Trans>Description</Trans>
              </TYPE.body>
            </Box>
            <TYPE.descriptionThin>
              The description will be included on the item&apos;s detail page underneath its image.{' '}
              <ExternalLink href={'https://www.markdownguide.org/cheat-sheet/'} style={{ fontWeight: 600 }}>
                Markdown
              </ExternalLink>{' '}
              syntax is supported
            </TYPE.descriptionThin>
          </Label>
          <Textarea
            onChange={(e) => setDescription(e?.target?.value)}
            placeholder={t`Provide a detailed description of your item`}
          />
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
