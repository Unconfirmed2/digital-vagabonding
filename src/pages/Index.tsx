import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SearchFilters } from '@/components/SearchFilters';
import { GroupCard } from '@/components/GroupCard';
import { DonateButton } from '@/components/DonateButton';
import { Loader2, Globe, Users, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface Group {
  Order: number | null;
  Continent: string | null;
  Country: string | null;
  City: string | null;
  'Link Type': string | null;
  Tag: string | null;
  URL2: string | null;
  Name: string | null;
  CityCountry: string | null;
  IsFree: string | null;
  URL: string | null;
}

const Index = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const [displayedGroups, setDisplayedGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [showAll, setShowAll] = useState(false);
  const { toast } = useToast();

  const CARDS_PER_PAGE = 9; // 3 rows × 3 cards

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    filterGroups();
  }, [groups, searchTerm, selectedContinent, selectedCountry, selectedTag]);

  useEffect(() => {
    updateDisplayedGroups();
  }, [filteredGroups, showAll]);

  const fetchGroups = async () => {
    try {
      console.log('Fetching groups from Supabase...');
      
      // First try to get all groups without any ordering to see if data exists
      const { data, error, count } = await supabase
        .from('Groups')
        .select('*', { count: 'exact' });

      console.log('Supabase response:', { data, error, count });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      if (!data || data.length === 0) {
        console.log('No groups found in database');
        toast({
          title: "No Data",
          description: "No travel groups found in the database. The database might be empty or there might be access restrictions.",
          variant: "destructive",
        });
      } else {
        console.log(`Found ${data.length} groups`);
        // Sort by Order if it exists, otherwise keep original order
        const sortedData = data.sort((a, b) => {
          if (a.Order && b.Order) return a.Order - b.Order;
          if (a.Order && !b.Order) return -1;
          if (!a.Order && b.Order) return 1;
          return 0;
        });
        setGroups(sortedData);
      }
    } catch (error) {
      console.error('Error fetching groups:', error);
      toast({
        title: "Error",
        description: "Failed to load groups. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterGroups = () => {
    let filtered = groups.filter(group => group.Name && group.URL);

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(group => 
        group.Name?.toLowerCase().includes(term) ||
        group.Country?.toLowerCase().includes(term) ||
        group.City?.toLowerCase().includes(term) ||
        group.Tag?.toLowerCase().includes(term)
      );
    }

    if (selectedContinent) {
      filtered = filtered.filter(group => group.Continent === selectedContinent);
    }

    if (selectedCountry) {
      filtered = filtered.filter(group => group.Country === selectedCountry);
    }

    if (selectedTag) {
      filtered = filtered.filter(group => group.Tag === selectedTag);
    }

    setFilteredGroups(filtered);
    setShowAll(false); // Reset pagination when filters change
  };

  const updateDisplayedGroups = () => {
    if (showAll) {
      setDisplayedGroups(filteredGroups);
    } else {
      setDisplayedGroups(filteredGroups.slice(0, CARDS_PER_PAGE));
    }
  };

  const handleLoadMore = () => {
    setShowAll(true);
  };

  const getUniqueValues = (field: keyof Group): string[] => {
    return [...new Set(groups.map(group => group[field])
      .filter(Boolean)
      .map(value => String(value)))]
      .sort();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading travel groups...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left flex items-center gap-4">
              <img 
                src="/lovable-uploads/fce57509-02bb-42dd-899d-370063455a63.png" 
                alt="Digital Vagabonding Logo" 
                className="h-16 w-16"
              />
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Digital Vagabonding
                </h1>
                <p className="text-lg text-gray-600 flex items-center gap-2 justify-center md:justify-start">
                  <Globe className="h-5 w-5" />
                  The largest collection of groups for travelers around the world (wide web)
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm text-center">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">{filteredGroups.length}</h3>
            <p className="text-gray-600">Travel Groups</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm text-center">
            <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">{getUniqueValues('Country').length}</h3>
            <p className="text-gray-600">Countries</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm text-center">
            <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-gray-900">{getUniqueValues('City').length}</h3>
            <p className="text-gray-600">Cities</p>
          </div>
        </div>

        {/* Search and Filters */}
        <SearchFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedContinent={selectedContinent}
          onContinentChange={setSelectedContinent}
          selectedCountry={selectedCountry}
          onCountryChange={setSelectedCountry}
          selectedTag={selectedTag}
          onTagChange={setSelectedTag}
          continents={getUniqueValues('Continent')}
          countries={getUniqueValues('Country')}
          tags={getUniqueValues('Tag')}
        />

        {/* Groups Grid */}
        {groups.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Travel Groups Found</h3>
            <p className="text-gray-500 text-lg mb-4">
              Your Groups table appears to be empty.
            </p>
            <p className="text-gray-400 text-sm">
              Check the browser console for more details about the database connection.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {displayedGroups.map((group, index) => (
                <GroupCard key={index} group={group} />
              ))}
            </div>

            {/* Load More Button */}
            {!showAll && filteredGroups.length > CARDS_PER_PAGE && (
              <div className="text-center mb-8">
                <Button
                  onClick={handleLoadMore}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                >
                  Load More Groups ({filteredGroups.length - CARDS_PER_PAGE} remaining)
                </Button>
              </div>
            )}

            {filteredGroups.length === 0 && groups.length > 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No groups found matching your criteria.</p>
                <p className="text-gray-400 mt-2">Try adjusting your search filters.</p>
              </div>
            )}
          </>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Connecting travelers worldwide through community groups
            </p>
            <DonateButton />
            <p className="text-sm text-gray-400 mt-4">
              Digital Vagabonding - Curated travel communities across platforms
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

</edits_to_apply>
