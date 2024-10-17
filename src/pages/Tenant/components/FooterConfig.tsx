import React from 'react';
import { ErrorText, FormWrapper, InputWithLabel, Label, TwoColumnGrid } from './styleds';

interface FooterConfigProps {
  formik: any;
}

const FooterConfig: React.FC<FooterConfigProps> = ({ formik }) => {
  return (
    <>
      <h1 className="title">Footer Config</h1>

      <FormWrapper>
        <TwoColumnGrid>
          <div>
            <Label htmlFor="termLink">Terms Link</Label>
            <InputWithLabel
              id="termLink"
              placeholder="Terms Link"
              name="termLink"
              value={formik.values.termLink}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.termLink && Boolean(formik.errors.termLink)}
            />
            {formik.touched.termLink && formik.errors.termLink ? <ErrorText>{formik.errors.termLink}</ErrorText> : null}
          </div>

          <div>
            <Label htmlFor="policyLink">Policy Link</Label>
            <InputWithLabel
              id="policyLink"
              placeholder="Policy Link"
              name="policyLink"
              value={formik.values.policyLink}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.policyLink && Boolean(formik.errors.policyLink)}
            />
            {formik.touched.policyLink && formik.errors.policyLink ? <ErrorText>{formik.errors.policyLink}</ErrorText> : null}
          </div>
        </TwoColumnGrid>

        <div>
          <Label htmlFor="block1">
            Block 1 <br /> <span className="desc">Provide description. Min 100, Max 2000 characters.</span>
          </Label>
          <InputWithLabel
            id="block1"
            placeholder="Description"
            name="block1"
            multiline
            rows={3}
            value={formik.values.block1}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.block1 && Boolean(formik.errors.block1)}
          />
          {formik.touched.block1 && formik.errors.block1 ? <ErrorText>{formik.errors.block1}</ErrorText> : null}
        </div>
        <div>
          <Label htmlFor="block2">
            Block 2 <br /> <span className="desc">Provide description. Min 100, Max 2000 characters.</span>
          </Label>
          <InputWithLabel
            id="block2"
            placeholder="Description"
            name="block2"
            multiline
            rows={3}
            value={formik.values.block2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.block2 && Boolean(formik.errors.block2)}
          />
          {formik.touched.block2 && formik.errors.block2 ? <ErrorText>{formik.errors.block2}</ErrorText> : null}
        </div>
        <div>
          <Label htmlFor="block3">
            Block 3 <br /> <span className="desc">Provide description. Min 100, Max 2000 characters.</span>
          </Label>
          <InputWithLabel
            id="block3"
            multiline
            rows={3}
            placeholder="Description"
            name="block3"
            value={formik.values.block3}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.block3 && Boolean(formik.errors.block3)}
          />
          {formik.touched.block3 && formik.errors.block3 ? <ErrorText>{formik.errors.block3}</ErrorText> : null}
        </div>
      </FormWrapper>
    </>
  );
};

export default FooterConfig;