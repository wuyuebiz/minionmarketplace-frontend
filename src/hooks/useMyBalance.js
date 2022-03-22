import useMyNativeBalance from './query/useMyNativeBalance'
import { useMemo } from 'react'

const useMyBalance = () => {

  const { balances: nativeBalances, refetch: refetchNativeBalances } =
    useMyNativeBalance()

  const balance = useMemo(() => {
    return nativeBalances["uusd"]
  }, [nativeBalances])

  const refetch = () => {
    refetchNativeBalances()
  }

  return {
    balance,
    refetch,
  }
}

export default useMyBalance
