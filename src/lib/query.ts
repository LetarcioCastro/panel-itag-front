import { useQuery as useReactQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export const useQuery = ({ keys, deps = [], fetch, ...props }: { keys: (string | number)[], deps?: any[], fetch: () => any, default?:  any }) => {

  const restQuery = useReactQuery({
    queryKey: keys,
    queryFn: fetch,
    enabled: false,
    initialData: props.default
  })

  useEffect(() => {

    restQuery.refetch()

  }, [...keys, ...deps])

  return restQuery

} 