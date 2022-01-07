import styled from 'styled-components/macro'
import { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import { Web3ReactHooks } from '@web3-react/core'
import { initializeConnector } from '@web3-react/core'
import type { Connector } from '@web3-react/types'
import { Web3Provider } from '@ethersproject/providers'
import { MetaMask } from '@web3-react/metamask'

const HeaderFrame = styled.div`
  display: grid;
  grid-template-columns: 120px 0.5fr 150px;
  align-items: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  top: 0;
  position: center;
  padding: 1rem;
  z-index: 21;
  position: center;
`

const HeaderLinks = styled.div`
  justify-self: center;
  /*background-color: ${({ theme }) => theme.bg0};*/
  width: fit-content;
  padding: 4px;
  border-radius: 16px;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  overflow: auto;
  align-items: center;
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
  &:not(:first-child) {
      margin-left: 0.5em;
  }
`

const [metaMask, hooks] = initializeConnector<MetaMask>((actions) => new MetaMask(actions));

function Status({
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
      <b>{'MetaMask'}</b>
      <br />
      {error ? (
        <>
          🛑 {error.name ?? 'Error'}: {error.message}
        </>
      ) : connected ? (
        <>✅ Connected</>
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
      Accounts:
      {accounts === undefined ? ' -' : accounts.length === 0 ? ' None' : accounts?.map((account, i) => (
        <ul key={account} style={{ margin: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>
          <b>{ENSNames?.[i] ?? account}</b>
          {balances?.[i] ? ` (Ξ${formatEther(balances[i])})` : null}
        </ul>
      ))}
    </div>
  )
}

export default function Header() {
  return (
    <HeaderFrame>
      <HeaderLinks>
        <NavLink id={'home'} to={'/'}>Home</NavLink>
        <NavLink id={'login'} to={'/login'}>Login</NavLink>
      </HeaderLinks>

      <HeaderControls>
        <HeaderElement>
          {/*blockNumber*/}
        </HeaderElement>
      </HeaderControls>
      <div>
        <Status connector={metaMask} hooks={hooks}/>
        <br />
        <Accounts useAnyNetwork={true} hooks={hooks} />
      </div>
    </HeaderFrame>
  )
}