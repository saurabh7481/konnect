import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store'
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Landing from './components/Layout/Landing';
import Routes from './Routes/Routes';

function App() {
  return (
    <Provider store = {store}>
      <Router>
        <div className="App">
          <Navbar/>
          <Route path="/" exact component={Landing}/>
          <div className='container'>
            <Route component={Routes} />
          </div>
          <Footer/>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
