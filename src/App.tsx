import { useEffect } from 'react'
import './App.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ShowLoading, hideLoading, setPortfolioData, ReloadData } from './Redux/rootslice.ts';
import { RootState } from './Redux/store.ts';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './home.tsx'
import Loader from './components/loading.tsx';
import Admin from './Admin/index.tsx';
import Login from './Login/Login.tsx';
import ReactGA from 'react-ga'


ReactGA.initialize(import.meta.env.TRACKING_ID);


function App() {

  
  const {loading, portfolioData, reloadData} = useSelector((state: RootState) => state.root);
  const dispatch = useDispatch();


  const getPortfolioApi = async () => {
    try{
      dispatch(ShowLoading());
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/portfolio/get-portfolio-data`);
      dispatch(setPortfolioData(response.data));
      dispatch(ReloadData(false));
      dispatch(hideLoading());
    } catch(e){
      dispatch(hideLoading());
      console.log(e);
    }
  };

  useEffect(()=>{
    if(!portfolioData){
      getPortfolioApi();
    }
  },[portfolioData]);

  useEffect(() => {
    if(reloadData){
      getPortfolioApi();
    }
  }, [reloadData]);

  
  return (  
    <BrowserRouter>
      {loading ? <Loader/> :
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/admin-login' element={<Login/>}/>
      </Routes>
    }
    </BrowserRouter>
    
  )
}

export default App