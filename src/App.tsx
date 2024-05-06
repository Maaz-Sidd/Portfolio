import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ShowLoading, hideLoading, setPortfolioData } from './Redux/rootslice.ts';
import { RootState } from './Redux/store.ts';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/home.tsx'
import Loader from './components/loading.tsx';
import Admin from './pages/Admin/index.tsx';
import Login from './pages/Admin/Login.tsx';





function App() {

  
  const {loading, portfolioData} = useSelector((state: RootState) => state.root);
  const dispatch = useDispatch();
  const getPortfolioApi = async () => {
    try{
      dispatch(ShowLoading());
      const response = await axios.get('http://192.168.2.199:8000/api/portfolio/get-portfolio-data');
      dispatch(setPortfolioData(response.data));
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

  if (!portfolioData) {
    return null;
  }

  
  console.log(portfolioData);
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
