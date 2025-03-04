import {useState, useEffect} from 'react'
import Header from './components/Header'
import SearchControls from './components/SearchControls'
import DriverCard from './components/DriverCard'
import DriverTable from './components/DriverTable'
import InfoBox from './components/InfoBox'
import { Driver, Points, ViewMode, } from './utils/types'
import Footer from './components/Footer'

import './App.css'

function App() {


  useEffect( () => {

    const fetchDrivers = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3000/api/drivers')

      if(!response.ok) {
        throw new Error('Failed to fetch drivers')
      }

      const data = await response.json()
      setDrivers(data)
      setError(null)

      const pointsData: Points = {}
      for (const driver of data) {
        try {
          const pointsResponse = await fetch(`http://localhost:3000/api/results/${driver._id}/points`)
          if (pointsResponse.ok) {
            const responseData = await pointsResponse.json()
            pointsData[driver._id] = responseData.totalPoints
          }
          else{
            pointsData[driver._id] = 0
          }
          
        } catch (error) {
          console.error(`Error fetching points for driver ${driver._id}:`, error)
          pointsData[driver._id] = 0
          
        }
      }
      setPoints(pointsData)
    } catch (error) {
      console.error(error)
      setError('Failed to load drivers. Please try again later.')
      
    }
    finally {
      setLoading(false)
    }
  }

  fetchDrivers()
  }, [])


  const [drivers, setDrivers] = useState<Driver[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [viewMode, setViewMode] = useState<ViewMode>('cards')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [points, setPoints] = useState<Points>({})

  const categories = ['All', ...Array.from(new Set(drivers.map(driver => driver.category)))];

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          driver.nationality.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          driver.developmentProgram.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || driver.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedDrivers = [...filteredDrivers].sort((a, b) => 
    (points[b._id] || 0) - (points[a._id] || 0)
  );
  

  return (
    <div className="app">
    <Header />
    
    <div className="app-container">
      <SearchControls 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        viewMode={viewMode}
        setViewMode={setViewMode}
        categories={categories}
      />

      <div className="results-count">
        Showing {sortedDrivers.length} drivers {selectedCategory !== 'All' ? `in ${selectedCategory}` : ''}
      </div>
      
      {viewMode === 'cards' ? (
        <div className="driver-grid">
          {sortedDrivers.map(driver => (
            <DriverCard key={driver._id} driver={{...driver, points: points[driver._id] || 0}} />
          ))}
        </div>
      ) : (
        <DriverTable drivers={sortedDrivers.map(driver => ({
          ...driver, 
          points: points[driver._id] || 0
        }))}  />
      )}
      
      <InfoBox />
    </div>
    <Footer></Footer>
  </div>
);
};


export default App
