import {
    useQuery,
  } from 'react-query'
  import useNetwork from './useNetwork'
  
  const useReactQuery = (
    queryKey,
    queryFn,
    options
  ) => {
    const { isMainnet } = useNetwork()
  
    return useQuery(queryKey.concat(isMainnet), queryFn, options)
  }
  
  export default useReactQuery
  