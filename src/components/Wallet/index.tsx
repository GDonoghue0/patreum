import styled from 'styled-components/macro'
import { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'
import { useState, useEffect } from 'react'
import { Web3ReactHooks } from '@web3-react/core'
import { initializeConnector } from '@web3-react/core'
import type { Connector } from '@web3-react/types'
import { MetaMask } from '@web3-react/metamask'

const [metaMask, hooks] = initializeConnector<MetaMask>((actions) => new MetaMask(actions));

export default function Status({
  connector,
  hooks: { useChainId, useAccounts, useError },
}: {
  connector: Connector
  hooks: Web3ReactHooks
}) {
  const chainId = useChainId()
  const accounts = useAccounts()
  const error = useError()

  const connected = Boolean(chainId && accounts)

  return (
    <div>
      {error ? (
        <>
          🛑 {error.name ?? 'Error'}: {error.message}
        </>
      ) : connected ? (
        <Accounts useAnyNetwork={true} hooks={hooks}/>
      ) : (
        <>⚠️ Disconnected</>
      )}
    </div>
  )
}

function useBalances(
  provider?: ReturnType<Web3ReactHooks['useProvider']>,
  accounts?: string[]
): BigNumber[] | undefined {
  const [balances, setBalances] = useState<BigNumber[] | undefined>()

  useEffect(() => {
    if (provider && accounts?.length) {
      let stale = false

      void Promise.all(accounts.map((account) => provider.getBalance(account))).then((balances) => {
        if (!stale) {
          setBalances(balances)
        }
      })

      return () => {
        stale = true
        setBalances(undefined)
      }
    }
  }, [provider, accounts])

  return balances
}

function Accounts({
  useAnyNetwork,
  hooks: { useAccounts, useProvider, useENSNames },
}: {
  useAnyNetwork: boolean
  hooks: Web3ReactHooks
}) {
  const provider = useProvider(useAnyNetwork ? 'any' : undefined)
  const accounts = useAccounts()
  const ENSNames = useENSNames(provider)

  const balances = useBalances(provider, accounts)

  return (
    <div>
      <b>{ENSNames?.[0] ?? accounts?.[0]}</b>
      <br/>
      {balances?.[0] ? ` (Ξ${formatEther(balances[0])})` : null}
    </div>
  )
}