import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {HomeView, LoginView} from './views';
import Header from './components/Header/index'

export function AppRoutes() {
    return (
        <Router>
            <Header></Header>
            <Routes>
                <Route path='/' element = {<HomeView/>} />
                <Route path='/login' element = {<LoginView/>} />
            </Routes>
        </Router>
    );
}