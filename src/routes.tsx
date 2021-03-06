import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {HomeView, BrowseView, OtherView} from './views';
import Header from './components/Header/index'
import WalletConnectModal from './components/Wallet/WalletConnectModal'
import { initializeConnector } from '@web3-react/core'
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
// Connecting wallet doesn't always activate
// Disconnecting wallet should revert to login state
// Disconnecting doesn't work for now, wait for web3-react update, or something?