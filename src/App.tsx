import { useState, useEffect } from 'react'
import Header from './components/Header'
import SearchControls from './components/SearchControls'
import DriverCard from './components/DriverCard'
import DriverTable from './components/DriverTable'
import InfoBox from './components/InfoBox'
import Footer from './components/Footer'
import { Driver, Points, ViewMode } from './utils/types'

import './App.css'

function App() {
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [viewMode, setViewMode] = useState<ViewMode>('cards')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [points, setPoints] = useState<Points>({})

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setLoading(true)
        setError(null)

        
        const response = await fetch('https://motorsport-tracker.onrender.com/api/drivers')
        if (!response.ok) {
          throw new Error('Failed to fetch drivers')
        }
        const data = await response.json()
        setDrivers(data)

        
        const pointsData: Points = {}
        const pointsFetchPromises = data.map(async (driver: Driver) => {
          try {
            const pointsResponse = await fetch(`https://motorsport-tracker.onrender.com/api/results/${driver._id}/points`)
            if (pointsResponse.ok) {
              const responseData = await pointsResponse.json()
              pointsData[driver._id] = responseData.totalPoints
            } else {
              pointsData[driver._id] = 0
            }
          } catch (pointError) {
            console.error(`Error fetching points for driver ${driver._id}:`, pointError)
            pointsData[driver._id] = 0
          }
        })

        // Wait for all point fetches to complete
        await Promise.all(pointsFetchPromises)
        setPoints(pointsData)

      } catch (fetchError) {
        console.error('Error in fetchDrivers:', fetchError)
        setError(fetchError instanceof Error ? fetchError.message : 'An unknown error occurred')
        setDrivers([])
        setPoints({})
      } finally {
        setLoading(false)
      }
    }

    fetchDrivers()
  }, [])

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

  // Render loading state
  if (loading) {
    return (
      <div className="app">
        <Header />
        <div className="app-container">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading drivers...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="app">
        <Header />
        <div className="app-container">
          <div className="error-container">
            <h2>Error</h2>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="retry-button"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
        
        {sortedDrivers.length === 0 ? (
          <div className="no-results-container">
            <p>No drivers found matching your search criteria.</p>
          </div>
        ) : viewMode === 'cards' ? (
          <div className="driver-grid">
            {sortedDrivers.map(driver => (
              <DriverCard 
                key={driver._id} 
                driver={{...driver, points: points[driver._id] || 0}} 
              />
            ))}
          </div>
        ) : (
          <DriverTable 
            drivers={sortedDrivers.map(driver => ({
              ...driver, 
              points: points[driver._id] || 0
            }))}  
          />
        )}
        
        <InfoBox />
      </div>
      <Footer />
    </div>
  );
}

export default App