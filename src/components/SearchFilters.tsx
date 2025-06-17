import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, Filter, X, ChevronDown } from 'lucide-react';

interface SearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedTag: string;
  onTagChange: (value: string) => void;
  tags: string[];
  suggestions: string[]; // new prop for autocomplete
  favoritesButton?: React.ReactNode; // new prop for favorites
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedTag,
  onTagChange,
  tags,
  suggestions,
  favoritesButton,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchTerm) {
      setFilteredSuggestions(
        suggestions.filter((s) =>
          s.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredSuggestions([]);
    }
  }, [searchTerm, suggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSearchChange(suggestion);
    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    onSearchChange('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="p-3 md:p-6 mb-0 bg-transparent shadow-none rounded-none">
      <div className="flex flex-row gap-2 justify-between items-center w-full">
        <div className="relative flex-1 w-full">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              ref={inputRef}
              placeholder={
                typeof window !== 'undefined' && window.innerWidth < 768
                  ? 'Cities, countries...'
                  : 'Search cities, countries...'
              }
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
              className="pl-10 pr-8 text-[#1D1818] placeholder:text-[#1D1818] border border-gray-400 focus:border-gray-600 hover:border-gray-600 hover:text-[#064e68] text-sm md:text-base"
              autoComplete="off"
            />
            {searchTerm && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={handleClear}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 focus:outline-none"
                tabIndex={-1}
              >
                <X className="h-4 w-4" />
              </button>
            )}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <ul className="absolute z-10 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-y-auto text-sm">
                {filteredSuggestions.map((suggestion, idx) => (
                  <li
                    key={idx}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onMouseDown={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="relative flex-1 w-full">
          <select
            id="tag"
            value={selectedTag}
            onChange={(e) => onTagChange(e.target.value)}
            className="sm:text-center w-full h-10 px-3 py-2 border border-gray-400 focus:border-gray-600 hover:border-gray-600 bg-background text-sm md:text-base ring-offset-background rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-[#1D1818] placeholder:text-[#1D1818] appearance-none"
          >
            <option value="">All interests</option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          {/* Custom icon logic */}
          {selectedTag ? (
            <button
              type="button"
              aria-label="Clear filter"
              onClick={() => onTagChange('')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 focus:outline-none"
              tabIndex={-1}
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          )}
        </div>
        {favoritesButton && (
          <div className="flex-1 flex w-full justify-start items-center hidden md:flex">
            {favoritesButton}
          </div>
        )}
      </div>
    </div>
  );
};
