import * as yup from 'yup'

export const schema = yup.object().shape({
  email: yup.string().required('Email required').email('Enter a valid email'),
  website: yup.string().required('Website URL required').url('Enter a valid URL'),
  whitepaper: yup.string().required('Whitepaper URL required').url('Enter a valid URL'),

  videos: yup.array(yup.object().shape({
    url: yup.string().url('Enter a valid URL'),
  })),

  social: yup.array(yup.object().shape({
    url: yup.string().url('Enter a valid URL')
  })),
})