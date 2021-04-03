import { DataroomFile, FileGuide, FormArray } from 'types/dataroomFile'
import { IdentityType } from 'app/pages/identity/utils/shared'

const documents: {
  individual: FileGuide[]
  corporate: FileGuide[]
} = {
  individual: [
    {
      title: 'Identification Document',
      label: 'Identification Document',
      type: 'Identity/Individual'
    },
    {
      title: 'Evidence of Accreditation',
      label:
        'Evidence of Accreditation (e.g. bank statement, payslip, tax bill)',
      type: 'Identity/Individual'
    },
    {
      title: 'Proof of Address',
      label: 'Proof of Address (e.g. utility bill or tenancy agreement)',
      type: 'Identity/Individual'
    }
  ],
  corporate: [
    {
      title: 'Company Incorporation Document',
      label:
        'Company Incorporation Document (e.g. ACRA Bizfile, Certificate of Incorporation) ',
      type: 'Identity/Corporate'
    },
    {
      title: 'Articles of Association',
      label: 'Articles of Association',
      type: 'Identity/Corporate'
    },
    {
      title: 'Memorandum of association',
      label: 'Memorandum of association',
      type: 'Identity/Corporate'
    },
    {
      title: 'Evidence of Accreditation',
      label:
        'Evidence of Accreditation (e.g. audited financial statements, certified balance sheet)',
      type: 'Identity/Corporate'
    },
    {
      title: 'Proof of Company Address',
      label:
        'Proof of Company Address (e.g. utility bill or tenancy agreement)',
      type: 'Identity/Corporate'
    },
    {
      title: 'Identificaton Document (Directors)',
      label: 'Identificaton Document (Directors)',
      type: 'Identity/Corporate'
    },
    {
      title: 'Proof of Address (Directors)',
      label: 'Proof of Address (Directors)',
      type: 'Identity/Corporate'
    },
    {
      title: 'Identificaton Document (Beneficial Owners)',
      label: 'Identificaton Document (Beneficial Owners)',
      type: 'Identity/Corporate'
    },
    {
      title: 'Proof of Address (Beneficial Owners)',
      label: 'Proof of Address (Beneficial Owners)',
      type: 'Identity/Corporate'
    },
    {
      title: 'Identificaton Document (Authorized Representative)',
      label: 'Identificaton Document (Authorized Representative)',
      type: 'Identity/Corporate'
    },
    {
      title: 'Proof of Address (Authorized Representative)',
      label: 'Proof of Address (Authorized Representative)',
      type: 'Identity/Corporate'
    },
    {
      title: 'Ownership of Control Structure',
      label: 'Ownership of Control Structure',
      type: 'Identity/Corporate'
    }
  ]
}

export const formatDocuments = (
  items: DataroomFile[],
  type: IdentityType
): FormArray<DataroomFile> => {
  return documents[type].map(document => {
    const item = items.find(item => item.title === document.title)

    return {
      value: {
        ...(item ?? ({} as any)),
        ...document
      }
    }
  })
}

export default documents
