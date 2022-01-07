import styled from 'styled-components/macro'
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import { Web3ReactHooks } from '@web3-react/core'
import { initializeConnector } from '@web3-react/core'
import type { Connector } from '@web3-react/types'
import { Web3Provider } from '@ethersproject/providers'
// import { useWeb3React } from '@web3-react/core'
import { MetaMask } from '@web3-react/metamask'

const HeaderFrame = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr 120px;
  align-items: center;
  justify-content: center;
  align-items: center;
  flex-direction: row;
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

// declare let window: any;
// const provider = new ethers.providers.Web3Provider(window.ethereum as any)
// console.log(provider);

// function Status({connector, hooks: { useChainId, useAccounts, useError }}: {connector: Connector, hooks: Web3ReactHooks})

// const metaMask = new MetaMask({ supportedChainIds: [1, 3] })
export const [metaMask, hooks] = initializeConnector<MetaMask>((actions) => new MetaMask(actions))
console.log(hooks);

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


// export const Wallet = () => {
//   const { chainId, account, activate, active } = hooks

//   const onClick = () => {
//     activate(metaMask)
//   }

//   return (
//     <div>
//       <div>ChainId: {chainId}</div>
//       <div>Account: {account}</div>
//       {active ? (<div></div>) : (
//         <button type="button" onClick={onClick}>
//           Connect
//         </button>
//       )}
//     </div>
//   )
// }

export default function Header() {
  // const [blockNumber, setBlockNumber] = useState<number>(0);

  // useEffect(() => {
  //   setInterval(() => {
  //     async function getBlockNumber() {
  //       const bn = await provider.getBlockNumber();
  //       setBlockNumber(bn)
  //     }
  //     getBlockNumber();
  //   }, 12000)
  // }, [blockNumber])

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
      </div>
    </HeaderFrame>
  )
}