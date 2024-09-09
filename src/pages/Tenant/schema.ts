import * as yup from 'yup'

export const validationSchema = yup.object({
  name: yup.string().required('Tenant name is required'),
  title: yup.string().required('Title is required'),
  domain: yup.string().required('Domain is required'),
  appUrl: yup.string().required('App URL is required'),
  description: yup.string().required('Description is required'),
  defaultUrl: yup.string().required('Default URL is required'),
  chartsUrl: yup.string().required('Charts URL is required'),
  supportEmail: yup.string().required('Support Email is required'),
  termLink: yup.string().required('Term Link is required'),
  policyLink: yup.string().required('Policy Link is required'),
  block1: yup.string().required('Block 1 is required'),
  logoUrl: yup.string().required('A logo URL is required').url('Invalid URL format'),
  faviconUrl: yup.string().required('A favicon URL is required').url('Invalid URL format'),
  bannerImageUrl: yup.string().required('A banner URL is required').url('Invalid URL format'),
})