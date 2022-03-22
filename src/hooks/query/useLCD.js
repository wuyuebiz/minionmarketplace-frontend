import { useMemo } from 'react'
import axios from 'axios'

import { useWallet } from '@terra-money/wallet-provider'
import { LCDClient } from '@terra-money/terra.js'
import useReactQuery from '../common/useReactQuery'

const useLCD = ()=> {
  const wallet = useWallet()

  const {
    data: gasPrices = {
      uusd: '0.15',
    },
  } = useReactQuery(["GAS_PRICES"], async () => {
    const { data } = await axios.get('https://fcd.terra.dev/v1/txs/gas_prices')
    return data
  })

  const lcd = useMemo(
    () =>
      new LCDClient({
        chainID: wallet.network.chainID,
        URL: wallet.network.lcd,
        gasPrices,
      }),
    [wallet, gasPrices]
  )

  const lastSyncedHeightFetch = async () => {
    const block = await lcd.tendermint.blockInfo()
    return block.block.header.height
  }

  const txInfoFetch = ({ txHash }) =>
    lcd.tx.txInfo(txHash)

  const balanceFetch = ({
    address,
  }) => lcd.bank.balance(address)

  const wasmFetch = ({
    contract,
    msg,
  }) => lcd.wasm.contractQuery<Response>(contract, msg)

  return { lcd, lastSyncedHeightFetch, txInfoFetch, balanceFetch, wasmFetch }
}

export default useLCD
