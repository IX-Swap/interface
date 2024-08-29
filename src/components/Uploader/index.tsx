import React, { ChangeEvent, FC, useState } from 'react'
import { Box, Flex } from 'rebass'
import { FileWithPath } from 'react-dropzone'
import { TYPE } from 'theme'
import { Label } from 'components/Label'
import Upload from 'components/Upload'
import { FilePreview, FilePreviewPayout } from 'components/FilePreview'
import { AcceptFiles } from 'components/Upload/types'
import { ReactComponent as InfoLogo } from 'assets/images/info-filled.svg'
import { ReactComponent as UploadLogo } from 'assets/images/NewDownloads.svg'
import { Text } from 'rebass'
import styled, { css } from 'styled-components'
import { UploaderCard } from 'pages/KYC/styleds'
import { AirdropTable, Body, Header } from 'pages/CreateAirdropPayoutEvent/AirdropTable'
import { Pagination } from 'components/Pagination'
import { adminOffset } from 'state/admin/constants'
import Papa from 'papaparse'
import { ethers } from 'ethers'
import { useShowError } from 'state/application/hooks'

export interface UploaderProps {
  files: FileWithPath[]
  onDrop: (file: any) => void
  title: string
  subtitle?: string | JSX.Element
  optional?: boolean
  error?: any | JSX.Element
  handleDeleteClick: (index: number) => void
  required?: boolean
  tooltipText?: string | JSX.Element
  isDisabled?: boolean
  id?: any
  name?: string
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  isPayoutpage?: boolean
  acceptedFileTypes?: string[]
  setTotalWallets?: (value: number) => void
  setTotalAmount?: (value: number) => void
  onCsvRowsChange?: (value: string[][]) => void
}

export const Uploader: FC<UploaderProps> = ({
  id,
  title,
  subtitle,
  files,
  required,
  error,
  handleDeleteClick,
  onDrop,
  optional = false,
  tooltipText,
  isDisabled = false,
  isPayoutpage,
  acceptedFileTypes,
  setTotalWallets,
  setTotalAmount,
  onCsvRowsChange,
}: UploaderProps) => {
  const [csvRows, setCsvRows] = useState<string[][]>([])
  const defaultAcceptedFiles = `${AcceptFiles.PDF},image/jpeg,image/png`
  const accept = acceptedFileTypes?.join(',') || defaultAcceptedFiles
  const [currentPage, setCurrentPage] = useState(1)
  const showError = useShowError()
  // const [hasError, setHasError] = useState(false)

  const handleFileUpload = (file: FileWithPath) => {
    if (file.type === 'text/csv') {
      const reader = new FileReader()
      reader.onload = (event) => {
        const text = event.target?.result as string
        uploadCSVFile(text)
      }
      reader.readAsText(file)
    }
  }

  const uploadCSVFile = (csvText: string) => {
    const parsed = Papa.parse<string[]>(csvText, { delimiter: ',', skipEmptyLines: true }).data
    let hasError = false

    if (parsed.length === 0) {
      showError('Invalid file: The file is empty.')
      return
    }

    const [headers, ...rows] = parsed

    if (headers[0].trim() !== 'walletAddress' || headers[1].trim() !== 'amount') {
      showError('Invalid file: The file headers must be "WalletAddress" and "amount".')
      setCsvRows([])
      onCsvRowsChange?.([])
      setTotalWallets?.(0)
      setTotalAmount?.(0)
      return
    }

    const validatedRows = rows
      .map(([address, amount]) => {
        const trimmedAddress = address?.trim()
        const trimmedAmount = amount?.trim()?.replace(/,/g, '')

        if (!ethers.utils.isAddress(trimmedAddress)) {
          console.error(`Invalid address: ${trimmedAddress}`)
          hasError = true
          return null
        }

        const parsedAmount = parseFloat(trimmedAmount)
        if (isNaN(parsedAmount)) {
          console.error(`Invalid amount: ${trimmedAmount}`)
          hasError = true
          return null
        }

        return [trimmedAddress, parsedAmount]
      })
      .filter((row) => row !== null) as string[][]

    if (hasError) {
      showError('Invalid file: please ensure all addresses are valid and amounts are correctly formatted.')
      setCsvRows([])
      onCsvRowsChange?.([])
      setTotalWallets?.(0)
      setTotalAmount?.(0)
    } else {
      setCsvRows(validatedRows)
      onCsvRowsChange?.(validatedRows)
      const totalWallets = validatedRows.length
      const totalAmount = validatedRows.reduce((sum, row) => sum + parseFloat(row[1]), 0)
      setTotalWallets?.(totalWallets)
      setTotalAmount?.(totalAmount)
    }
  }

  const handleDrop = (acceptedFiles: FileWithPath | FileWithPath[]) => {
    const filesArray = Array.isArray(acceptedFiles) ? acceptedFiles : [acceptedFiles]

    filesArray.forEach((file) => {
      handleFileUpload(file)
      onDrop(file)
    })
  }

  const handleFileDelete = (index: number) => {
    handleDeleteClick(index)
    setCsvRows([])
    onCsvRowsChange?.([])
  }

  const onPageChange = (page: number) => {
    event?.preventDefault()
    const totalPages = Math.ceil(csvRows.length / adminOffset)

    if (page > 0 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <Box>
      <Flex>
        <Label label={title} required={required} tooltipText={tooltipText} />
        {optional && (
          <>
            <TYPE.body1 marginLeft="4px" marginRight="8px" color={`text9`}>
              (optional)
            </TYPE.body1>
            <InfoLogo />
          </>
        )}
      </Flex>
      {subtitle && <StyledDescription marginBottom="10px">{subtitle}</StyledDescription>}

      {files && files.length > 0 && (
        <Flex flexWrap="wrap">
          {isPayoutpage ? (
            <>
              {files.map((file: any, index) => (
                <FilePreviewPayout
                  key={`file-${index}-${file.name}`}
                  file={file?.asset ? file.asset : file}
                  index={1}
                  handleDeleteClick={() => handleFileDelete(index)}
                  isDisabled={isDisabled}
                />
              ))}
            </>
          ) : (
            <>
              {files.map((file: any, index) => (
                <FilePreview
                  key={`file-${index}-${file.name}`}
                  file={file?.asset ? file.asset : file}
                  index={1}
                  handleDeleteClick={() => handleFileDelete(index)}
                  isDisabled={isDisabled}
                />
              ))}
            </>
          )}
        </Flex>
      )}

      {!isDisabled && csvRows.length === 0 && (
        <Upload isDisabled={isDisabled} accept={accept as AcceptFiles} data-testid={id} file={null} onDrop={handleDrop}>
          <UploaderCard>
            <Flex flexDirection="column" justifyContent="center" alignItems="center" style={{ maxWidth: 100 }}>
              <StyledUploadLogo />
              <TYPE.small textAlign="center" marginTop="8px" color={'#666680'}>
                Drag and Drop
              </TYPE.small>
              <TYPE.small display="flex" textAlign="center" color={'#666680'}>
                or <Text style={{ marginLeft: 2, color: '#6666FF' }}>Upload</Text>
              </TYPE.small>
            </Flex>
          </UploaderCard>
        </Upload>
      )}

      {csvRows.length > 0 && (
        <>
          <AirdropTable
            header={<Header columns={['Wallet Address', 'Amount']} />}
            body={<Body rows={csvRows.slice((currentPage - 1) * adminOffset, currentPage * adminOffset)} />}
          />
          <Pagination
            totalPages={csvRows.length / adminOffset}
            page={currentPage}
            onPageChange={onPageChange}
            totalItems={csvRows.length}
          />
        </>
      )}

      {error && (
        <TYPE.small marginTop="4px" color={'red1'}>
          {error}
        </TYPE.small>
      )}
    </Box>
  )
}

const StyledDescription = styled(TYPE.description3)`
  color: ${({ theme: { text2 } }) => `${text2}50`};
  ul {
    margin: 0;
    padding-left: 20px;
    font-size: 12px;
    > li:not(:last-child) {
      margin-bottom: 8px;
    }
  }
  li {
    line-height: 18px;
  }
`

const StyledUploadLogo = styled(UploadLogo)`
  ${({ theme }) =>
    theme.config.elements?.main &&
    css`
      path {
        stroke: ${theme.config.elements?.main};
        fill: none;
      }
    `}
`
