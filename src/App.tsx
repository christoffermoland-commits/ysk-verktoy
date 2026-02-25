import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import LTPCalculatorPage from './pages/LTPCalculatorPage'
import NyttelastCalculatorPage from './pages/NyttelastCalculatorPage'
import DictionaryPage from './pages/DictionaryPage'
import DrivingTimePage from './pages/DrivingTimePage'
import DrivingTimeCalculatorPage from './pages/DrivingTimeCalculatorPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="ltp-kalkulator" element={<LTPCalculatorPage />} />
        <Route path="nyttelast-kalkulator" element={<NyttelastCalculatorPage />} />
        <Route path="fagordbok" element={<DictionaryPage />} />
        <Route path="kjore-hviletid" element={<DrivingTimePage />} />
        <Route path="kjore-hviletid/kalkulator" element={<DrivingTimeCalculatorPage />} />
      </Route>
    </Routes>
  )
}
