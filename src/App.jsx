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
import Education from './Pages/Education'
import Vehicles from './Pages/Vehicles'
import Hospitality from './Pages/Hospitality'
import PropertiesDetails from './Pages/AdDetails/PropertiesDetails'
import VehicleDetails from './Pages/AdDetails/VehicleDetails'
import EducationDetails from './Pages/AdDetails/EducationDetails'
import HospitalityDetails from './Pages/AdDetails/HospitalityDetails'
import Profile from './Pages/Profile'
import Doctors from './Pages/Doctors'
import Hospitals from './Pages/Hospitals'
import DoctorDetails from './Pages/AdDetails/DoctorDetails'
import HospitalDetails from './Pages/AdDetails/HospitalDetails'


const App = () => {
  return (
    <>
    
    <Routes> 
        <Route path='/login' element={<Login/>}/>
        <Route path="/" element={<Protected Component={Layout} />}>
            <Route path='/' element={<Home/>}/>
            <Route path='featuredads/:category/:id' element={<FeaturedAdsDetails/>}/>
            <Route path='profile' element={<Profile/>}/>
            <Route path='properties' element={<Properties/>}/>
            <Route path='education' element={<Education/>}/>
            <Route path='vehicles' element={<Vehicles/>}/>
            <Route path='hospitality' element={<Hospitality/>}/>
            <Route path='doctors' element={<Doctors/>}/>
            <Route path='hospitals' element={<Hospitals/>}/>
            <Route path='propertiesdetails/:id' element={<PropertiesDetails/>}/>
            <Route path='vehicledetails/:id' element={<VehicleDetails/>}/>
            <Route path='educationdetails/:id' element={<EducationDetails/>}/>
            <Route path='hospitalitydetails/:id' element={<HospitalityDetails/>}/>
            <Route path='doctordetails/:id' element={<DoctorDetails/>}/>
            <Route path='hospitaldetails/:id' element={<HospitalDetails/>}/>
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