
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Search, Filter } from 'lucide-react';

interface SearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedContinent: string;
  onContinentChange: (value: string) => void;
  selectedCountry: string;
  onCountryChange: (value: string) => void;
  selectedPlatform: string;
  onPlatformChange: (value: string) => void;
  continents: string[];
  countries: string[];
  platforms: string[];
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedContinent,
  onContinentChange,
  selectedCountry,
  onCountryChange,
  selectedPlatform,
  onPlatformChange,
  continents,
  countries,
  platforms,
}) => {
  return (
    <Card className="p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-900">Find Your Community</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Search groups, cities, countries..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="continent">Continent</Label>
          <select
            id="continent"
            value={selectedContinent}
            onChange={(e) => onContinentChange(e.target.value)}
            className="w-full h-10 px-3 py-2 border border-input bg-background text-sm ring-offset-background rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">All Continents</option>
            {continents.map((continent) => (
              <option key={continent} value={continent}>
                {continent}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <select
            id="country"
            value={selectedCountry}
            onChange={(e) => onCountryChange(e.target.value)}
            className="w-full h-10 px-3 py-2 border border-input bg-background text-sm ring-offset-background rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">All Countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="platform">Platform</Label>
          <select
            id="platform"
            value={selectedPlatform}
            onChange={(e) => onPlatformChange(e.target.value)}
            className="w-full h-10 px-3 py-2 border border-input bg-background text-sm ring-offset-background rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">All Platforms</option>
            {platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Card>
  );
};
