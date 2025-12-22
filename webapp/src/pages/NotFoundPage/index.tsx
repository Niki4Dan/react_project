import err404 from '../../assets/images/404.png'
import { ErrorPageComponent } from '../../components/ErrorPageComponent'

export const NotFoundPage = ({
  title = 'Not Found',
  message = 'This page does not exist',
}: {
  title?: string
  message?: string
}) => <ErrorPageComponent title={title} message={message}>
  <img src={err404} alt='error' />
</ErrorPageComponent>