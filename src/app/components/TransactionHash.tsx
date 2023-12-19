import React from 'react'
import { IconButton, Box } from '@mui/material'
import { ContentCopy } from '@mui/icons-material'
import { copyToClipboard } from 'helpers/clipboard'
import { useSnackbar } from 'hooks/useSnackbar'
import { AppRouterLink } from 'components/AppRouterLink'

export interface TransactionHashProps {
  txHash: string
  txHashLink?: string
  long?: boolean
  enableCopy?: boolean
}

export const TransactionHash = ({
  txHash,
  txHashLink,
  long = false,
  enableCopy = true
}: TransactionHashProps) => {
  const { showSnackbar } = useSnackbar()
  const handleCopy = () => {
    copyToClipboard(txHash)
    showSnackbar('Copied!')
  }

  if (txHash === undefined) {
    return <>-</>
  }

  const textContent = long
    ? txHash
    : `${txHash.slice(0, 4)}...${txHash.slice(txHash.length - 4)}`

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      {txHashLink !== undefined ? (
        <AppRouterLink
          target='_blank'
          to={txHashLink.replace('%s', txHash)}
          underline='always'
          color='primary'
        >
          {textContent}
        </AppRouterLink>
      ) : (
        textContent
      )}
      {enableCopy && (
        <>
          {' '}
          <Box px={0.5} />
          <IconButton
            size='small'
            onClick={handleCopy}
            style={{ fontSize: '18px' }}
          >
            <ContentCopy fontSize='inherit' color='disabled' />
          </IconButton>
        </>
      )}
    </span>
  )
}
