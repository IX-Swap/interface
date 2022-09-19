import React from "react"
import { TYPE } from "theme"
import { FormCard } from "./styleds"

interface KYCValidationErrorsProps {
    fields: string[]
}

export const KYCValidationErrors = ({ fields }: KYCValidationErrorsProps) => {
    return (
        <FormCard>
            <TYPE.title6>REASON FOR REJECTION</TYPE.title6>

            <ul>
                {fields.map(field => (<TYPE.body>{field}</TYPE.body>))}
            </ul>
        </FormCard>
    )
}
