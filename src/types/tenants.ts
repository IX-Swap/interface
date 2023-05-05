// import { DataroomFile } from './dataroomFile'
import { ObjectSchema, Shape, object, string } from 'yup'

export interface TenantFormValues {
  companyName: string
  tenantCode: string
  url: string
  email: string
  description: string
  status: string
  theme: string
  logoLight: string | undefined
  logoDark: string | undefined
  backgroundImage: string | undefined
  //   logoLight: DataroomFile | string | undefined
  //   logoDark: DataroomFile | string | undefined
  //   backgroundImage: DataroomFile | string | undefined
}

export const initialTenantFormValues: TenantFormValues = {
  logoLight: undefined,
  logoDark: undefined,
  backgroundImage: undefined,
  companyName: '',
  tenantCode: '',
  status: '',
  theme: '',
  url: '',
  email: '',
  description: ''
}

export const createTenantSchema = object()
  .shape<TenantFormValues>({
    companyName: string().required('Company Name is required'),
    tenantCode: string().required('Client Code is required'),
    url: string().url('This must be a valid URL').required('URL is required'),
    email: string()
      .email('This must be a valid email format')
      .required('Email is required'),
    description: string().required('Description is required'),
    status: string().required('Status is required'),
    theme: string().required('Theme is required'),
    logoLight: string().required('Logo Light is required'),
    logoDark: string().required('Logo Dark is required'),
    backgroundImage: string().required(
      'Background Image is required'
      // logoLight: object<DataroomFile>().required('Logo Light is required'),
      // logoDark: object<DataroomFile>().required('Logo Dark is required'),
      // backgroundImage: object<DataroomFile>().required(
      //   'Background Image is required'
    )
  })
  .required()

export interface TenantFormActionsProps {
  tenant: TenantFormValues | undefined
  schema: ObjectSchema<Shape<object | undefined, TenantFormValues>, object>
}
