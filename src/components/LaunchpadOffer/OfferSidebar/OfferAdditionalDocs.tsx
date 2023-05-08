import React from 'react'
import styled, { useTheme } from 'styled-components'
import { File, Download } from 'react-feather'
import { EyeIcon } from 'assets/launchpad/svg/components/EyeIcon'

import { OfferFile, OfferFileType } from 'state/launchpad/types'
import { InfoList } from '../util/InfoList'
import { isDownload, isPreview } from '../util/files'

interface Props {
  files: OfferFile[]
}

const crop = (value?: string) => ((value?.length ?? 0) > 20 ? value?.substring(0, 20) + '...' : value)

export const OfferAdditionalDocs: React.FC<Props> = (props) => {
  const theme = useTheme()

  const entries = React.useMemo(
    () =>
      props.files
        .filter((file) => file.type === OfferFileType.document)
        .map(({ file }) => {
          const isPreviewing = isPreview(file.name)
          const isDownloading = !isPreviewing && isDownload(file.name)
          return {
            label: (
              <FileName>
                <File size="18" /> {crop(file.name)}
              </FileName>
            ),
            value: (
              <span style={{ cursor: 'pointer' }}>
                {isPreviewing ? (
                  <EyeIcon stroke={theme.launchpad.colors.text.caption} />
                ) : (
                  <Download size="14" stroke={theme.launchpad.colors.text.caption} />
                )}
              </span>
            ),
            file: file,
            isPreviewing,
            isDownloading,
          }
        }),
    [props.files, theme]
  )

  return <InfoList title="Additional Documents" entries={entries} placeholderText="There are no Documents to display" />
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
