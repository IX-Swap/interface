import React from 'react'
import styled, { useTheme } from 'styled-components'

import { File, Eye } from 'react-feather'

import { OfferFile, OfferFileType } from 'state/launchpad/types'

import { InfoList } from '../util/InfoList'

interface Props {
  files: OfferFile[]
}

const crop = (value?: string) => ((value?.length ?? 0) > 20 ? value?.substring(0, 20) + '...' : value)

export const OfferAdditionalDocs: React.FC<Props> = (props) => {
  const theme = useTheme()

  const entries = React.useMemo(() => {
    return props.files
      .filter((file) => file.type === OfferFileType.document)
      .map((file) => ({
        label: (
          <FileName>
            <File size="18" /> {crop(file.file.name)}
          </FileName>
        ),
        value: (
          <span style={{ cursor: 'pointer' }}>
            <Eye size="14" stroke={theme.launchpad.colors.text.body} />
          </span>
        ),
        file: file.file,
      }))
  }, [])

  return <InfoList title="Additional Document" entries={entries} placeholderText="There are no Documents to display" />
}

const FileName = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  max-width: 200px;
`
