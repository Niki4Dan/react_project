import cn from 'classnames'
import { type FormikProps } from 'formik'
import css from './index.module.scss'

export const Input = ({
  name,
  label,
  type,
  formik,
  maxWidth,
}: {
  name: string
  label: string
  type: string
  formik: FormikProps<any>
  maxWidth?: string | number /* ? - опционально */
}) => {
  const value = formik.values[name]
  const error = formik.errors[name] as string | undefined
  const touched = formik.touched[name]
  const disabled = formik.isSubmitting
  const invalid = !!touched && !!error

  return (
    <div className={cn({ [css.field]: true, [css.disabled]: disabled })}>
      {' '}
      {/* если свойства будут true, то они применятся */}
      <label className={css.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={cn({ [css.input]: true, [css.invalid]: invalid })}
        type={type}
        style={{ maxWidth: maxWidth + '%' }}
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
      {!!touched && !!error && <div className={css.error}>{error}</div>}
    </div>
  )
}
