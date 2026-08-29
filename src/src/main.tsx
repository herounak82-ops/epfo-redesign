import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// UX4G Design System — CSS + Runtime
import 'ux4g-web-components/styles.css'
import 'ux4g-web-components/runtime'

// Project styles (layered on top of UX4G)
import './styles/global.css'
import './styles/epfo-extensions.css'

import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
