
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

interface SearchBarProps {
  compact?: boolean;
}

const SearchBar = ({ compact = false }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <form onSubmit={handleSearch} className={`flex ${compact ? 'my-2' : 'my-6'}`}>
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={compact ? "Search" : "Căutare"}
          className="input-field pl-10"
        />
      </div>
      <button 
        type="submit" 
        className="bg-primary text-white px-6 py-2.5 rounded-r-md hover:bg-blue-600 transition-colors"
      >
        {compact ? "Search" : "Caută"}
      </button>
    </form>
  );
};

export default SearchBar;
