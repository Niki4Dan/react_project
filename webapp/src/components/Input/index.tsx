import { type FormikProps } from 'formik'

export const Input = ({
  name,
  label,
  type,
  formik
}: {
  name: string
  label: string
  type: string
  formik: FormikProps<any>
}) => {
  const value = formik.values[name]
  const error = formik.errors[name] as string | undefined
  const touched = formik.touched[name]



  return (
   <div style={{ marginBottom: 10 }}>
          <label htmlFor={name}>{label}</label>
          <br />
          <input
            type={type}
            onChange={(e) => {
              void formik.setFieldValue(name, e.target.value)
            }}
            onBlur={() => {
              void formik.setFieldTouched(name)
            }}
            value={value}
            name={name}
            id={name}
          />
          {!!touched && !!error && <div style={{ color: 'red' }}>{error}</div>}            
        </div>
  )
}