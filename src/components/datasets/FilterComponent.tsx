import React from 'react'

interface FilterComponentProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  genre: string
  setGenre: (genre: string) => void
  maxPrice: number
  setMaxPrice: (price: number) => void
  genres: string[]
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  searchTerm,
  setSearchTerm,
  genre,
  setGenre,
  maxPrice,
  setMaxPrice,
  genres
}) => {
  return (
    <div className="w-64 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search songs..."
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
            Genre
          </label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">All Genres</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Max Price: ${maxPrice}
          </label>
          <input
            type="range"
            id="price"
            min={0}
            max={100}
            step={1}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}

export default FilterComponent