import { useExplorerName } from 'hooks/useExplorerName'
import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import useENS from '../../hooks/useENS'
import { useActiveWeb3React } from '../../hooks/web3'
import { ExternalLink, TYPE } from '../../theme'
import { ExplorerDataType, getExplorerLink } from '../../utils/getExplorerLink'
import { RowBetween } from '../Row'
import { AddressInput } from './AddressInput'

export default function AddressInputPanel({
  id,
  value,
  onChange,
}: {
  id?: string
  // the typed string value
  value: string
  // triggers whenever the typed value changes
  onChange: (value: string) => void
}) {
  const { chainId } = useActiveWeb3React()
  const theme = useContext(ThemeContext)
  const explorerName = useExplorerName()
  const { address, loading, name } = useENS(value)
  const error = Boolean(value.length > 0 && !loading && !address)

  return (
    <>
      <RowBetween>
        <TYPE.black color={theme.text2} fontWeight={500} fontSize={14}>
          Recipient
        </TYPE.black>
        {address && chainId && (
          <ExternalLink
            href={getExplorerLink(chainId, name ?? address, ExplorerDataType.ADDRESS)}
            style={{ fontSize: '14px' }}
          >
            (View on {explorerName})
          </ExternalLink>
        )}
      </RowBetween>
      <AddressInput {...{ id, value, error, onChange }} />
    </>
  )
}
