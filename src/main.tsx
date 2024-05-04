import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { store } from './Redux/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <React.StrictMode>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <Provider store={store}>
            <App />
          </Provider>
        </NextThemesProvider>
      </NextUIProvider>
    </React.StrictMode>
  ,
)
