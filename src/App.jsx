import React from 'react'
import { Routes,Route } from 'react-router-dom'
import FeaturedAdsDetails from './Pages/FeaturedAdsDetails'
import Home from './Pages/Home'
import Properties from './Pages/Properties'
import PostAd from './Pages/PostAd'
import PostAdDetails from './Pages/PostAdDetails'
import PropertiesAdForm from './Pages/AdForms/PropertiesAdForm'
import VehicleAdForm from './Pages/AdForms/VehicleAdForm'
import HospitalityAdForm from './Pages/AdForms/HospitalityAdForm'
import HealthAdForm from './Pages/AdForms/HealthAdForm'
import EducationAdForm from './Pages/AdForms/EducationAdForm'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Login from './Pages/Login'
import Layout from './Components/Layout/Layout'
import Protected from './Pages/Protected/Protected'
import Plans from './Pages/Plans'


const App = () => {
  return (
    <>
    
    <Routes> 
        <Route path='/login' element={<Login/>}/>
        <Route path="/" element={<Protected Component={Layout} />}>
            <Route path='/' element={<Home/>}/>
            <Route path='featuredads' element={<FeaturedAdsDetails/>}/>
            <Route path='properties' element={<Properties/>}/>
            <Route path='plans' element={<Plans/>}/>
            <Route path='postad' element={<PostAd/>}/>
            <Route path='propertiesadform' element={<PropertiesAdForm/>}/>
            <Route path='vehicleadform' element={<VehicleAdForm/>}/>
            <Route path='hospitalityadform' element={<HospitalityAdForm/>}/>
            <Route path='healthadform' element={<HealthAdForm/>}/>
            <Route path='educationadform' element={<EducationAdForm/>}/>
        </Route>
    </Routes>
    
    </>
  )
}

export default App