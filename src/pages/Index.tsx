import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SearchFilters } from '@/components/SearchFilters';
import { GroupCard } from '@/components/GroupCard';
import { DonateButton } from '@/components/DonateButton';
import { Loader2, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { MenuHeader } from '@/components/MenuHeader';

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
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    filterGroups();
  }, [groups, searchTerm, selectedTag]);

  const fetchGroups = async () => {
    try {
      console.log('Fetching groups from Supabase...');
      
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
        group.Country?.toLowerCase().includes(term) ||
        group.City?.toLowerCase().includes(term) ||
        group.Continent?.toLowerCase().includes(term) ||
        (group.City && group.Country && `${group.City}, ${group.Country}`.toLowerCase().includes(term))
      );
    }

    if (selectedTag) {
      filtered = filtered.filter(group => group.Tag === selectedTag);
    }

    setFilteredGroups(filtered);
  };

  // Helper to get unique values from a list of groups
  const getUniqueValuesFromGroups = (groups: Group[], field: keyof Group): string[] => {
    return [...new Set(groups.map(group => group[field])
      .filter(Boolean)
      .map(value => String(value)))]
      .sort();
  };

  // Compute available tags based on filtered groups (search results)
  const availableTags = getUniqueValuesFromGroups(filteredGroups, 'Tag');
  const continentSuggestions = getUniqueValuesFromGroups(filteredGroups, 'Continent');
  const countrySuggestions = getUniqueValuesFromGroups(filteredGroups, 'Country');
  const cityCountrySuggestions = Array.from(new Set(
    filteredGroups
      .filter(g => g.City && g.Country)
      .map(g => `${g.City}, ${g.Country}`)
  ));
  // Prioritize country suggestions at the top
  const searchSuggestions = Array.from(new Set([
    ...countrySuggestions,
    ...continentSuggestions,
    ...cityCountrySuggestions,
  ])).sort((a, b) => {
    // If a is a country and b is not, a comes first
    if (countrySuggestions.includes(a) && !countrySuggestions.includes(b)) return -1;
    if (!countrySuggestions.includes(a) && countrySuggestions.includes(b)) return 1;
    return a.localeCompare(b);
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7FF]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading travel groups...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F8F7FF] flex flex-col">
      {/* Fixed header */}
      <header className="w-full fixed top-0 left-0 z-50 border-b border-[#e0def7] h-[64px] shadow-inner bg-[#fffef5]">
        <div className="w-full px-[5vw]">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <img
                src="/digital-vagabonding/Logo-noBR.png"
                alt="Digital Vagabonding Logo"
                className="h-10 w-10 mr-3"
                style={{ objectFit: 'contain' }}
              />
              <div className="flex flex-col justify-between h-10 py-0">
                <Link to="/" className="focus:outline-none h-full flex flex-col justify-between">
                  <span className="text-[2.5rem] text-brand leading-none flex items-center h-full font-sans tracking-tight" style={{ fontWeight: 'normal', letterSpacing: '-0.04em', fontFamily: 'Arial, sans-serif' }}>
                    Digital VagaBonding
                  </span>
                </Link>
              </div>
            </div>
            <MenuHeader />
          </div>
        </div>
      </header>
      {/* Spacer for fixed header */}
      <div className="flex-1 w-full px-[5vw]" style={{ paddingTop: '80px', paddingBottom: '90px' }}>
        <section className="w-full max-w-6xl mx-auto flex flex-col gap-10">
          {/* Combined Filters + Stats Card, no border, less vertical space */}
          <div className="rounded-2xl shadow-lg p-3 md:p-6 flex flex-col gap-1 items-start w-full">
            <div className="w-full flex flex-col items-start mb-0.5">
              <p className="text-base xs:text-lg sm:text-xl md:text-[1.5rem] font-semibold text-[#000000] leading-snug text-left">
                The largest collection of groups for travelers from around the world (wide web)
              </p>
              <p className="text-base xs:text-lg sm:text-xl md:text-[1.5rem] font-semibold text-[#000000] leading-snug text-left">
                Find your community...wherever you are
              </p>
            </div>
            <div className="flex flex-col md:flex-row w-full gap-1 md:gap-2 items-center justify-center md:justify-between md:items-center">
              {/* Filters/search and counts, all vertically centered and aligned */}
              <div className="flex-1 w-full flex items-center">
                <SearchFilters
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  selectedTag={selectedTag}
                  onTagChange={setSelectedTag}
                  tags={availableTags}
                  suggestions={searchSuggestions}
                />
              </div>
              <div className="flex flex-row gap-0 md:gap-2 min-w-[160px] md:min-w-[220px] justify-center md:justify-end items-center self-center h-full">
                <div className="flex flex-col items-center  min-w-[50px] md:min-w-[70px]">
                  <span className="text-base md:text-lg font-bold text-[#1D1818] leading-tight">{filteredGroups.length}</span>
                  <span className="text-s font-medium text-[#1D1818] mt-0">Groups</span>
                </div>
                <div className="flex flex-col items-center  min-w-[50px] md:min-w-[70px]">
                  <span className="text-base md:text-lg font-bold text-[#1D1818] leading-tight">{getUniqueValuesFromGroups(filteredGroups, 'Country').length}</span>
                  <span className="text-s font-medium text-[#1D1818] mt-0">Countries</span>
                </div>
                <div className="flex flex-col items-center  min-w-[50px] md:min-w-[70px]">
                  <span className="text-base md:text-lg font-bold text-[#1D1818] leading-tight">{getUniqueValuesFromGroups(filteredGroups, 'City').length}</span>
                  <span className="text-s font-medium text-[#1D1818] mt-0">Cities</span>
                </div>
              </div>
            </div>
          </div>

          {/* Groups Grid */}
          <div className="w-full">
            {groups.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Travel Groups Found</h3>
                <p className="text-gray-500 text-lg mb-4">
                  Your Groups table appears to be empty.
                </p>
                <p className="text-gray-400 text-sm">
                  Check the browser console for more details about the database connection.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {filteredGroups.map((group, index) => (
                    <GroupCard key={index} group={group} />
                  ))}
                </div>

                {filteredGroups.length === 0 && groups.length > 0 && (
                  <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                    <p className="text-gray-500 text-lg">No groups found matching your criteria.</p>
                    <p className="text-gray-400 mt-2">Try adjusting your search filters.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
      {/* Footer */}
      <footer className="rounded-t-2xl w-full border-t border-[#e0def7] h-[56px] md:h-[64px] bg-[#fffef5] fixed bottom-0 left-0 z-40 text-xs md:text-base">
        <div className="container mx-auto px-2 md:px-4 py-3 md:py-6 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 relative h-full">
          {/* Donate button on the left */}
          <div className="flex-shrink-0 flex items-center w-full md:w-auto justify-center md:justify-start mb-1 md:mb-0">
            <DonateButton />
          </div>
          {/* Center text */}
          <div className="flex-1 text-center text-gray-700 text-xs md:text-base font-medium">
            Connecting travelers worldwide through community groups
          </div>
          {/* Legal links on the right */}
          <div className="flex-shrink-0 flex items-center gap-2 md:gap-4 w-full md:w-auto justify-center md:justify-end mt-1 md:mt-0 text-xs text-gray-400">
            <Link to="/terms-of-service" className="hover:text-gray-600 transition-colors">
              Terms of Service
            </Link>
            <Separator orientation="vertical" className="h-3" />
            <Link to="/privacy-policy" className="hover:text-gray-600 transition-colors">
              Privacy Policy
            </Link>
            <Separator orientation="vertical" className="h-3" />
            <a href="/sitemap.xml" className="hover:text-gray-600 transition-colors" target="_blank" rel="noopener noreferrer">
              Sitemap
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
