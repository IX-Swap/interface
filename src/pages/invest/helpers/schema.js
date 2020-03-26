export const editDsoSchema = () =>
  yup.object().shape({
    title: yup.string(),
    status: yup.string(),
    summary: yup.string(),
    highlights: yup.string(),
    businessModel: yup.string(),
    milestone: yup.string(),
    roadmap: yup.string(),
    existingClients: yup.string(),
    fundingCurrency: yup.string(),
    miniumumInvestment: yup.string(),
    investmentTerms: yup.string(),
    fundingGoal: yup.string(),
    dealStructure: yup.string(),
    capitalStructure: yup.string(),
    holdingStructure: yup.string(),
    smartContractAddress: yup.string(),
    team: yup.string(),
    logo: yup.string()
  })
