import Spinner from '../components/loadingStatus/Spinner/Spinner'
import Error from '../components/loadingStatus/Error/Error'
import Skeleton from '../components/Skeleton/Skeleton'

const setContent = (process, Component, props) => {
  switch (process) {
    case 'waiting':
      return <Skeleton />
    case 'loading':
      return <Spinner />
    case 'error':
      return <Error />
    case 'success':
      return <Component {...props} />
    default:
      throw new Error('Error when creating content')
  }
}

const setContentWithList = (process, Component, props) => {
  switch (process) {
    case 'waiting':
      return <Spinner />
    case 'loading':
      return <Component {...props} />
    case 'error':
      console.log('err')
      return <Error />
    case 'success':
      return <Component {...props} />
    default:
      throw new Error('Error when creating content')
  }
}

export { setContent, setContentWithList }
