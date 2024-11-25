import React from 'react';

interface FilterComponentProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  genres: string[];
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  searchTerm,
  setSearchTerm,
  selectedGenres,
  setSelectedGenres,
  maxPrice,
  setMaxPrice,
  genres
}) => {
  const handleGenreChange = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  return (
    <div className="w-full p-4 bg-black shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-white">Filters</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-200 mb-1">
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
          <label className="block text-sm font-medium text-white mb-1">
            Genres
          </label>
          <div className="space-y-2">
            {genres.map((genre) => (
              <label key={genre} className="flex items-center text-gray-200">
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                  className="mr-2"
                />
                {genre}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-white mb-1">
            Max Price: ${maxPrice.toFixed(1)}
          </label>
          <input
            type="range"
            id="price"
            min={0}
            max={10}
            step={1}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;