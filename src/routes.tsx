import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {HomeView, BrowseView, OtherView} from './views';
import Header from './components/Header/index'

export function AppRoutes() {
    return (
        <Router>
            <Header></Header>
            <Routes>
                <Route path='/' element = {<HomeView/>} />
                <Route path='/browse' element = {<BrowseView/>} />
                <Route path='/other' element = {<OtherView/>} />
            </Routes>
        </Router>
    );
}