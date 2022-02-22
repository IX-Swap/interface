import Row from 'components/Row'
import React from 'react'
import { Box } from 'rebass'
import { TYPE } from 'theme'
import { DescriptionTitle } from './styleds'

interface Props {
  title: React.ReactElement | string
  content: React.ReactElement | string
}
export const DetailsElement = ({ title, content }: Props) => {
  return (
    <Row>
      <DescriptionTitle>{title}</DescriptionTitle>
      <TYPE.titleSmall color={'text2'}>
        <Box marginLeft="14px" display="flex">
          {content}
        </Box>
      </TYPE.titleSmall>
    </Row>
  )
}
