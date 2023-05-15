import React from "react"
import styled from "styled-components"
import { TYPE } from "theme"
import { FormCard } from "./styleds"

interface KYCValidationErrorsProps {
  fields: string[]
}


const errorLabelMap = [
  { field: 'firstName', label: 'First Name' },
  { field: 'middleName', label: 'Middle Name' },
  { field: 'lastName', label: 'Last Name' },

  { field: 'dateOfBirth', label: 'Date of Birth' },
  { field: 'gender', label: 'Gender' },

  { field: 'nationality', label: 'Nationality' },
  { field: 'citizenship', label: 'citizenship' },
  { field: 'email', label: 'Email' },
  { field: 'phoneNumber', label: 'Phone Number' },

  { field: 'address', label: 'Address' },
  { field: 'postalCode', label: 'Postal Code' },
  { field: 'country', label: 'Country' },
  { field: 'city', label: 'City' },

  { field: 'idType', label: 'ID Type' },
  { field: 'idNumber', label: 'ID Number' },
  { field: 'idIssueDate', label: 'ID Issuance Date' },
  { field: 'idExpiryDate', label: 'ID ExpirationDate' },

  { field: 'proofOfIdentity', label: 'Proof of Identity' },
  { field: 'proofOfAddress', label: 'Proof of Address' },

  { field: 'occupation', label: 'Occupation' },
  { field: 'employmentStatus', label: 'Employment Status' },
  { field: 'employer', label: 'Employer' },
  { field: 'income', label: 'Income' },

  { field: 'taxDeclarations', label: 'Tax Declarations' },
  { field: 'country', label: 'Country of Tax Declaration' },
  { field: 'idNumber', label: 'Tax Identification Number (TIN)' },
  { field: 'reason', label: 'Reason' },

  { field: 'sourceOfFunds', label: 'Source of Funds' },
  { field: 'otherFunds', label: 'Other Funds' },

  { field: 'isUSTaxPayer', label: 'FATCA' },
  { field: 'usTin', label: 'US TIN' },

  { field: 'accredited', label: 'Investor Status Declaration' },
  { field: 'investorDeclarationIsFilled', label: 'Investor Declaration' },
  { field: 'acceptOfQualification', label: 'Qualification Confirmation' },
  { field: 'acceptRefusalRight', label: 'Opt-out Confirmation' },
  { field: 'evidenceOfAccreditation', label: 'Evidence of Accreditation' },
  { field: 'confirmStatusDeclaration', label: 'Investor Confirmation' },
]

const findFieldLabel = (key: string): string | undefined => {
  if (key.startsWith('taxDeclarations')) {
    return `Tax Declarations - ${findFieldLabel(key.split('.').pop() ?? '') ?? ''}`.trim()
  }

  return errorLabelMap.find(entry => entry.field === key)?.label
}

export const KYCValidationErrors = ({ fields }: KYCValidationErrorsProps) => {
  const labels = React.useMemo(() => fields.map(findFieldLabel).filter(label => !!label), [fields])

  if (fields.length === 0) {
    return null
  }

  return (
    <FormCard style={{ marginBottom: '1rem' }}>
      <TYPE.title6 color="error">REASON FOR REJECTION</TYPE.title6>
      <ReasonList>
        {labels.map(field => (
          <ReasonEntry key={field}>
            <TYPE.body color="text2">{field}</TYPE.body>
          </ReasonEntry>
        ))}
      </ReasonList>
    </FormCard>
  )
}

const ReasonList = styled.ul`
  margin-inline-start: -1.5rem;
  margin-block-end: 0;
`

const ReasonEntry = styled.li`
  margin-marker-start: -1rem;
  color: ${({ theme }) => theme.text2};
`