import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import LTPCalculatorPage from './pages/LTPCalculatorPage'
import DictionaryPage from './pages/DictionaryPage'
import DrivingTimePage from './pages/DrivingTimePage'
import DrivingTimeCalculatorPage from './pages/DrivingTimeCalculatorPage'
import VideosPage from './pages/VideosPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="ltp-kalkulator" element={<LTPCalculatorPage />} />
        <Route path="fagordbok" element={<DictionaryPage />} />
        <Route path="kjore-hviletid" element={<DrivingTimePage />} />
        <Route path="kjore-hviletid/kalkulator" element={<DrivingTimeCalculatorPage />} />
        <Route path="videoer" element={<VideosPage />} />
      </Route>
    </Routes>
  )
}
