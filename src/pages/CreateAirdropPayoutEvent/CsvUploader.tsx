import React, { FC, useState } from 'react'
import { isAddress } from '../../utils'
import { FormikErrors, FormikTouched } from 'formik'
import Big from 'big.js'
import Papa from 'papaparse'
import { AirdropTable, Body, Header } from 'pages/CreateAirdropPayoutEvent/AirdropTable'
import { Pagination } from 'components/Pagination'
import { Uploader } from 'components/Uploader'
import { FormValues } from './utils'
import { useShowError } from 'state/application/hooks'
import { adminOffset } from 'state/admin/constants'

type CsvUploaderProps = {
  values: FormValues
  handleDropImage: (f: any) => void
  handleImageDelete: (index: number) => void
  setTotalWallets: (index: number) => void
  onValueChange: (k: string, v: string | string[][]) => void
  touched: FormikTouched<FormValues>
  errors: FormikErrors<FormValues>
  availableForEditing: string[]
  setTotalAmount: (value: string) => void
  onCsvRowsChange: (value: string[][]) => void
}

export const CsvUploader: FC<CsvUploaderProps> = ({
  values,
  handleDropImage,
  handleImageDelete,
  touched,
  errors,
  availableForEditing,
  setTotalWallets,
  onValueChange,
  setTotalAmount,
  onCsvRowsChange,
}) => {
  const showError = useShowError()
  const [currentPage, setCurrentPage] = useState(1)
  const csvRows = values.csvRows

  const uploadCSVFile = (csvText: string) => {
    setCurrentPage(1)
    const parsed = Papa.parse<string[]>(csvText, { delimiter: ',', skipEmptyLines: true }).data
    let hasError = false

    if (parsed.length === 0) {
      showError('Invalid file: The file is empty.')
      return
    }

    const firstRow = parsed[0]
    if (firstRow[0].trim() !== 'walletAddress' || firstRow[1].trim() !== 'amount') {
      if (!isAddress(firstRow[0].trim()) || isNaN(+firstRow[1].trim())) {
        showError('Invalid file: The first column must be wallet address and the second column must be amount.')
        onCsvRowsChange?.([])
        setTotalWallets?.(0)
        setTotalAmount?.('0')
        return
      }
    } else {
      parsed.shift()
    }

    const validatedRows = parsed
      .map(([address, amount]) => {
        const trimmedAddress = address?.trim()
        const trimmedAmount = amount?.trim()?.replace(/,/g, '')

        if (!isAddress(trimmedAddress)) {
          console.error(`Invalid address: ${trimmedAddress}`)
          hasError = true
          return null
        }

        if (isNaN(Number(trimmedAmount))) {
          console.error(`Invalid amount: ${trimmedAmount}`)
          hasError = true
          return null
        }

        return [trimmedAddress, trimmedAmount]
      })
      .filter((row) => row !== null) as string[][]

    if (hasError) {
      showError('Invalid file: please ensure all addresses are valid and amounts are correctly formatted.')
      onCsvRowsChange?.([])
      setTotalWallets?.(0)
      setTotalAmount?.('0')
    } else {
      onCsvRowsChange?.(validatedRows)
      const totalWallets = validatedRows.length
      const totalAmount = validatedRows.reduce((sum, [, amount]) => sum.add(new Big(amount)), new Big(0))
      setTotalWallets?.(totalWallets)
      setTotalAmount?.(totalAmount.toString())
    }
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
    <>
      <Uploader
        isPayoutpage={true}
        acceptedFileTypes={['.csv']}
        title="Payout Attachments"
        files={values.files}
        required
        onDrop={handleDropImage}
        handleDeleteClick={handleImageDelete}
        error={touched.files ? errors.files : ''}
        tooltipText="Please attach any documentation relevant to the payout event (optional)."
        isDisabled={!availableForEditing.includes('files')}
        isUploadHide={csvRows.length > 0}
        onCsvRowsChange={(value) => onValueChange('csvRows', value)}
        onCsvFileUpload={uploadCSVFile}
      />
      {csvRows.length > 0 && (
        <>
          <AirdropTable
            header={<Header columns={['Wallet Address', 'Amount']} />}
            body={<Body rows={csvRows.slice((currentPage - 1) * adminOffset, currentPage * adminOffset)} />}
          />
          <Pagination
            totalPages={Math.ceil(csvRows.length / adminOffset)}
            page={currentPage}
            onPageChange={onPageChange}
            totalItems={csvRows.length}
          />
        </>
      )}
    </>
  )
}
