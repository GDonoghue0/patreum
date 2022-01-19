import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {HomeView, BrowseView, OtherView} from './views';
import Header from './components/Header/index'
import WalletConnectModal from './components/Wallet/WalletConnectModal'
import { Web3ReactHooks } from '@web3-react/core'
import { initializeConnector } from '@web3-react/core'
import type { Connector } from '@web3-react/types'
import { MetaMask } from '@web3-react/metamask'

const [metaMask, hooks] = initializeConnector<MetaMask>((actions) => new MetaMask(actions));


export function AppRoutes() {
  return (
    <div>
    <WalletConnectModal connector={metaMask} hooks={hooks} />

    <Router>
      <Header/>
      <Routes>
        <Route path='/' element = {<HomeView/>} />
        <Route path='/browse' element = {<BrowseView/>} />
        <Route path='/other' element = {<OtherView/>} />
      </Routes>
    </Router>
    </div>
  );
}

//TODO:
// Code is a mess
// Disconnecting wallet should revert to login state
// Model looks terrible