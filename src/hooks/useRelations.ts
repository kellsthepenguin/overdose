import useSWR from 'swr'
import fetcher from '@/util/fetcher'

export default () => {
  const { data, error, isLoading } = useSWR('/api/relations', (url) =>
    fetcher(url, localStorage.getItem('token')!)
  )

  return { data, error, isLoading }
}
