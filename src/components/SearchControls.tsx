import React from 'react'
import { ViewMode } from '../utils/types'

import '../styles/SearchControls.css'

interface SearchControlsProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    viewMode: ViewMode;
    setViewMode: (mode: ViewMode) => void;
    categories: string[];
}

const SearchControls: React.FC<SearchControlsProps> = ({searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, viewMode, setViewMode, categories}) => {
    return(
        <div className="search-controls-container">
      <div className="search-controls-inner">
        <div className="search-controls-row">
          <div className="search-input-container">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search drivers, development program, nationality..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="search-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="category-select-container">
            <select
              className="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories
            .slice() // Create a copy to avoid mutating the original array
            .sort((a, b) => {
        // Push 'Other' to the end
            if (a === 'Other') return 1;
            if (b === 'Other') return -1;
        // Regular alphabetical sort for other items
        return a.localeCompare(b);
      })
      .map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
            </select>
          </div>
          
          <div className="view-mode-container">
            <div className="view-mode-toggle">
              <button
                className={`view-mode-button ${viewMode === 'cards' ? 'active' : ''}`}
                onClick={() => setViewMode('cards')}
              >
                Cards
              </button>
              <button
                className={`view-mode-button ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
              >
                Table
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchControls
