import { DataroomFile } from './dataroomFile'

import { object, string } from 'yup'

export interface TenantFormValues {
  logoLight?: DataroomFile
  logoDark?: DataroomFile
  backgroundImage?: DataroomFile
  companyName?: string
  tenantCode?: string
  url?: string
  email?: string
  description?: string
}

export const createDSOInformationSchema = object()
  .shape<TenantFormValues>({
    // logoLight: string().required('Logo Light is required'),
    // logoDark: string().required('Logo Dark is required'),
    // backgroundImage: string().required('Background Image is required'),
    companyName: string().required('Company Name is required'),
    tenantCode: string().required('Tenant Code is required'),
    url: string().required('URL is required'),
    email: string().required('Email is required'),
    description: string().required('Description is required')
  })
  .required()
