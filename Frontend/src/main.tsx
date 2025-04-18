import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './AppStore/store.tsx'
import { SignalRProvider } from './Providers/SignalRProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <SignalRProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SignalRProvider>
    </Provider>
  </StrictMode>,
)
