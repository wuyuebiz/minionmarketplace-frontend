import { useMemo } from 'react'
import { useWallet } from '@terra-money/wallet-provider'

import { UTIL, WHITELIST } from '../../constants'

const useNetwork = () => {
  const { network } = useWallet()
  const isMainnet = useMemo(
    () => /^columbus/.test(network.chainID),
    [network.chainID]
  )

  const mantleApi = useMemo(
    () =>
      isMainnet
        ? 'https://mantle.terra.dev'
        : 'https://bombay-mantle.terra.dev',
    [isMainnet]
  )

  const whitelist = useMemo(
    () => (isMainnet ? WHITELIST.mainnetTokenList : WHITELIST.testnetTokenList),
    [isMainnet]
  )

  const lpOfLpList = useMemo(
    () => (isMainnet ? WHITELIST.mainnetLpOfLpList : []),
    [isMainnet]
  )

  const lpStakingList = useMemo(
    () =>
      isMainnet
        ? WHITELIST.mainnetLpStakingList
        : WHITELIST.testnetLpStakingList,
    [isMainnet]
  )

  const limitOrder = useMemo(
    () =>
      isMainnet ? WHITELIST.mainnetLimitOrder : WHITELIST.testnetLimitOrder,
    [isMainnet]
  )

  const getSymbolByContractOrDenom = (
    contractOrDenom
  ) => {
    if (UTIL.isNativeDenom(contractOrDenom)) {
      return "UST"
    } else {
      return (
        whitelist.find((x) => x.contractOrDenom === contractOrDenom)?.symbol ||
        ''
      )
    }
  }

  const MINIONToken = whitelist.find((x) => x.symbol === 'Minion')

  return {
    isMainnet,
    whitelist,
    lpOfLpList,
    lpStakingList,
    limitOrder,
    chainId: network.chainID,
    getSymbolByContractOrDenom,
    MINIONToken,
    mantleApi,
  }
}

export default useNetwork
