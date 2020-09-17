import { Document, DocumentWithGuide } from 'v2/types/document'
import { IdentityType } from 'v2/app/pages/identity/utils'

const documents: {
  individual: DocumentWithGuide[]
  corporate: DocumentWithGuide[]
} = {
  individual: [
    {
      document: null,
      title: 'Identification Document',
      label: 'Identification Document',
      type: 'Identity/Individual'
    },
    {
      document: null,
      title: 'Evidence of Accreditation',
      label:
        'Evidence of Accreditation (e.g. bank statement, payslip, tax bill)',
      type: 'Identity/Individual'
    },
    {
      document: null,
      title: 'Proof of Address',
      label: 'Proof of Address (e.g. utility bill or tenancy agreement)',
      type: 'Identity/Individual'
    },
    {
      document: null,
      title: 'Marriage Certificate',
      label: 'Marriage Certificate',
      type: 'Identity/Individual'
    },
    {
      document: null,
      title: 'Other Supporting Documents',
      label: 'Other Supporting Documents',
      type: 'Identity/Individual'
    }
  ],
  corporate: [
    {
      document: null,
      title: 'Company Registration Document',
      label:
        'Company Registration Document (e.g. ACRA Bizfile, Certificate of Incorporation) ',
      type: 'Identity/Corporate'
    },
    {
      document: null,
      title: 'Articles of Association',
      label: 'Articles of Association',
      type: 'Identity/Corporate'
    },
    {
      document: null,
      title: 'Evidence of Accreditation',
      label:
        'Evidence of Accreditation (e.g. audited financial statements, certified balance sheet)',
      type: 'Identity/Corporate'
    },
    {
      document: null,
      title: 'Proof of Company Address',
      label:
        'Proof of Company Address (e.g. utility bill or tenancy agreement)',
      type: 'Identity/Corporate'
    },
    {
      document: null,
      title: 'Identificaton Document (Directors)',
      label: 'Identificaton Document (Directors)',
      type: 'Identity/Corporate'
    },
    {
      document: null,
      title: 'Proof of Address (Directors)',
      label: 'Proof of Address (Directors)',
      type: 'Identity/Corporate'
    },
    {
      document: null,
      title: 'Identificaton Document (Beneficial Owners)',
      label: 'Identificaton Document (Beneficial Owners)',
      type: 'Identity/Corporate'
    },
    {
      document: null,
      title: 'Proof of Address (Beneficial Owners)',
      label: 'Proof of Address (Beneficial Owners)',
      type: 'Identity/Corporate'
    },
    {
      document: null,
      title: 'Identificaton Document (Authorized Representative)',
      label: 'Identificaton Document (Authorized Representative)',
      type: 'Identity/Corporate'
    },
    {
      document: null,
      title: 'Proof of Address (Authorized Representative)',
      label: 'Proof of Address (Authorized Representative)',
      type: 'Identity/Corporate'
    },
    {
      document: null,
      title: 'Ownership of Control Structure',
      label: 'Ownership of Control Structure',
      type: 'Identity/Corporate'
    },
    {
      document: null,
      title: 'Other Supporting Documents',
      label: 'Other Supporting Documents',
      type: 'Identity/Corporate'
    }
  ]
}

export const formatDocuments = (
  items: Document[],
  type: IdentityType
): DocumentWithGuide[] => {
  return documents[type].map(document => {
    const item = items.find(item => item.title === document.title)

    return {
      ...document,
      document: item ?? null
    }
  })
}

export default documents
