import styled from 'styled-components/macro'
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ethers } from "ethers";
// import { Web3ReactProvider } from '@web3-react/core'
import { initializeConnector } from '@web3-react/core'
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

declare let window: any;
const provider = new ethers.providers.Web3Provider(window.ethereum)
console.log(provider);

// const metaMask = new MetaMask({ supportedChainIds: [1, 3] })
export const [metaMask, hooks] = initializeConnector<MetaMask>((actions) => new MetaMask(actions))


function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

export const Wallet = () => {
  const { chainId, account, activate, active } = useWeb3React<Web3Provider>()

  const onClick = () => {
    activate(metaMask)
  }

  return (
    <div>
      <div>ChainId: {chainId}</div>
      <div>Account: {account}</div>
      {active ? (<div></div>) : (
        <button type="button" onClick={onClick}>
          Connect
        </button>
      )}
    </div>
  )
}

export default function Header() {
  const [blockNumber, setBlockNumber] = useState<number>(0);

  useEffect(() => {
    setInterval(() => {
      async function getBlockNumber() {
        const bn = await provider.getBlockNumber();
        setBlockNumber(bn)
      }
      getBlockNumber();
    }, 12000)
  }, [blockNumber])

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
      <Web3ReactProvider getLibrary={getLibrary}>
        <Wallet/>
      </Web3ReactProvider>
    </HeaderFrame>
  )
}