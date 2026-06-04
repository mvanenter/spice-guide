import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SpiceGuide from './spice-guide.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SpiceGuide />
  </StrictMode>,
)