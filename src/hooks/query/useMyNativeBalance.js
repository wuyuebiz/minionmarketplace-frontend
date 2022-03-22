import { useMemo } from 'react'

import useLCD from './useLCD'
import useReactQuery from '../common/useReactQuery'
import { useConnectedWallet } from '@terra-money/wallet-provider'

const useMyNativeBalance = () => {
  const { balanceFetch } = useLCD()
  const connectedWallet = useConnectedWallet()
  const myAddress = (connectedWallet?.walletAddress || '')

  const { data, refetch } = useReactQuery(
    ["USER_BALANCE_ADDRESS", myAddress],
    () => balanceFetch({ address: myAddress }),
    {
      enabled: !!myAddress,
    }
  )

  const balances = useMemo(() => {
    const uusd = data?.[0]?.get('uusd')?.amount.toString()
    const uluna = data?.[0]?.get('uluna')?.amount.toString()

    return {
      "uusd": (uusd || '0'),
      "uluna": (uluna || '0'),
    }
  }, [data])

  return { refetch, balances }
}

export default useMyNativeBalance
