import React, { useEffect, useState } from 'react';
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
import { filterGroupsByAccess, countLockedCities, countLockedGroups } from '@/lib/subscriptionAccess';
import { hasActiveSubscription } from '@/lib/subscriptionAccess';
import { ALLOW_VIEW_ALL_CITIES, STRIPE_TEST_MODE, STRIPE_TEST_SUBSCRIPTION_LINK, STRIPE_LIVE_SUBSCRIPTION_LINK } from '@/config/subscriptionConfig';
import { AnalyticsAndConsent } from '@/components/AnalyticsAndConsent';
import ExpandableListView from '@/components/ExpandableListView';
import { Switch } from '@/components/ui/switch';

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
  const [likedGroups, setLikedGroups] = useState<string[]>(() => {
    // Use localStorage for persistence
    const stored = localStorage.getItem('likedGroups');
    return stored ? JSON.parse(stored) : [];
  });
  const [showLikedOnly, setShowLikedOnly] = useState(false);
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const [lockedCities, setLockedCities] = useState(0);
  const [lockedGroups, setLockedGroups] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [isListView, setIsListView] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchGroups();
    checkSubscription();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  useEffect(() => {
    filterGroups();
  }, [groups, searchTerm, selectedTag, showLikedOnly, likedGroups, subscriptionActive]);

  useEffect(() => {
    localStorage.setItem('likedGroups', JSON.stringify(likedGroups));
  }, [likedGroups]);

  useEffect(() => {
    // Inject Google AdSense script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4720939090989878';
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
    
  }, []);

  const checkSubscription = async () => {
    const { data } = await supabase.auth.getUser();
    const user = data.user;
    const active = await hasActiveSubscription(user?.id);
    setSubscriptionActive(active);
  };

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
        setLockedCities(countLockedCities(sortedData));
        setLockedGroups(countLockedGroups(sortedData));
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

  const handleToggleLike = (group) => {
    setLikedGroups((prev) => {
      const id = group.Name + group.URL; // Use a unique identifier
      if (prev.includes(id)) {
        return prev.filter((gid) => gid !== id);
      } else {
        return [...prev, id];
      }
    });
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
    if (showLikedOnly) {
      filtered = filtered.filter(group => likedGroups.includes(group.Name + group.URL));
    }
    setFilteredGroups(filterGroupsByAccess(filtered, subscriptionActive));
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

  // Group groups by country, then sort by city, then name (for display)
  const groupedByCountry = filteredGroups.reduce((acc, group) => {
    const country = group.Country || 'Other';
    if (!acc[country]) acc[country] = [];
    acc[country].push(group);
    return acc;
  }, {} as Record<string, Group[]>);

  // Group ALL groups by country for locked count logic (before filtering by access)
  const allGroupedByCountry = groups.reduce((acc, group) => {
    const country = group.Country || 'Other';
    if (!acc[country]) acc[country] = [];
    acc[country].push(group);
    return acc;
  }, {} as Record<string, Group[]>);

  // Sort countries alphabetically
  const sortedCountries = Object.keys(groupedByCountry).sort();
  // For each country, sort groups by city, then name
  sortedCountries.forEach(country => {
    groupedByCountry[country].sort((a, b) => {
      const cityA = a.City || '';
      const cityB = b.City || '';
      if (cityA.toLowerCase() < cityB.toLowerCase()) return -1;
      if (cityA.toLowerCase() > cityB.toLowerCase()) return 1;
      const nameA = a.Name || '';
      const nameB = b.Name || '';
      return nameA.localeCompare(nameB);
    });
  });

  // Helper: Get top 5 cities by group count, excluding countrywide
  const getTopCities = (groups: Group[]) => {
    const cityCounts: Record<string, { count: number; country: string | null }> = {};
    groups.forEach(g => {
      if (g.City && g.City.toLowerCase() !== 'countrywide') {
        const key = g.City.trim().toLowerCase();
        if (!cityCounts[key]) cityCounts[key] = { count: 0, country: g.Country };
        cityCounts[key].count++;
      }
    });
    return Object.entries(cityCounts)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5)
      .map(([city, data]) => ({ city, count: data.count, country: data.country }));
  };

  const topCities = getTopCities(groups);

  // Map city names to hero images (normalize for matching)
  const cityImageMap: Record<string, string> = {
    'bali': '/bali.jpeg',
    'medellin': '/Medellin.jpeg',
    'mexico city': '/Mexico City.jpeg',
    'rio de janeiro': '/Rio do Janiero.jpeg',
    'tulum': '/Playa del Carmen Tulum.jpg', // fallback to this for Tulum/Playa
  };

  const [cityFilter, setCityFilter] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7FF]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#1D1818} mx-auto mb-4" />
          <p className="text-gray-600">Loading travel groups...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F8F7FF] flex flex-col">
      {/* Fixed header */}
      <header className="w-full fixed top-0 left-0 z-50 border-b border-[#e0def7] h-[32px] md:h-[64px] shadow-inner bg-[#fbf5f7]">
        <div className="w-full px-[5vw]">
          <div className="flex items-center justify-between h-[32px] md:h-[64px]">
            <div className="flex items-center">
              <img
                src="/Logo-noBR.png"
                alt="Digital Vagabonding Logo"
                className="h-5 w-5 md:h-10 md:w-10 mr-1 md:mr-3"
                style={{ objectFit: 'contain' }}
              />
              <div className="flex flex-col justify-between h:5 md:h-10 py-0">
                <Link to="/" className="focus:outline-none h-full flex flex-col justify-between">
                  <span className="text-[1.5rem] md:text-[2.5rem] text-brand leading-none flex items-center h-[32x] md:h-[64px] font-sans tracking-tight" style={{ fontWeight: 'normal', letterSpacing: '-0.04em', fontFamily: 'Arial, sans-serif' }}>
                    Digital VagaBonding
                  </span>
                </Link>
              </div>
            </div>
            {/* Subscribe button if needed */}
            {ALLOW_VIEW_ALL_CITIES === false && !subscriptionActive && (
              <a
                href={STRIPE_TEST_MODE ? STRIPE_TEST_SUBSCRIPTION_LINK : STRIPE_LIVE_SUBSCRIPTION_LINK}
                className="mr-2 md:mr-4 bg-brand hover:bg-brand/90 text-white font-semibold px-3 py-1.5 rounded-md shadow transition-colors text-xs md:text-base"
                style={{ textDecoration: 'none' }}
                target="_blank" rel="noopener noreferrer"
              >
                Subscribe
              </a>
            )}
            <MenuHeader />
          </div>
        </div>
      </header>
      {/* Spacer for fixed header */}
      <div className="flex-1 w-full px-[5vw]" style={{ paddingTop: '48px', paddingBottom: '90px' }}>
        <section className="w-full max-w-6xl mx-auto flex flex-col gap-10">
          <div className="relative w-full mt-0 md:mt-5">
            {/* Tab notification for locked groups, only if ALLOW_VIEW_ALL_CITIES is false */}
            {/* Removed unlock x groups notification */}
            <div className="rounded-2xl shadow-[0_4px_16px_0_rgba(0,0,0,0.12),0_0_8px_0_rgba(0,0,0,0.10)] p-3 md:p-6 flex flex-col gap-1 items-start w-full transition-shadow duration-200">
              <div className="w-full flex flex-col items-start mb-0.5">
                <p className="text-base xs:text-lg sm:text-xl md:text-[1.5rem] font-semibold text-[#1D1818] leading-snug text-left">
                  The largest collection of groups for travelers from around the world (wide web)
                </p>
                <p className="text-base xs:text-lg sm:text-xl md:text-[1.5rem] font-semibold text-[#1D1818] leading-snug text-left">
                  Find your community...wherever you are
                </p>
              </div>
              <div className="flex flex-col md:flex-row w-full gap-1 md:gap-2  ">
                {/* Filters/search and counts, all vertically centered and aligned */}
                <div className="flex-1 w-full flex-row justify gap-2">
                  <SearchFilters
                    searchTerm={searchTerm}
                    onSearchChange={val => {
                      setSearchTerm(val);
                      if (!val) setCityFilter(null);
                    }}
                    selectedTag={selectedTag}
                    onTagChange={setSelectedTag}
                    tags={availableTags}
                    suggestions={searchSuggestions}
                    favoritesButton={
                      <div className="flex flex-row items-center gap-2">
                        <div
                          role="button"
                          tabIndex={0}
                          aria-pressed={showLikedOnly}
                          onClick={() => setShowLikedOnly((v) => !v)}
                          onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') setShowLikedOnly((v) => !v); }}
                          className="flex justify-start items-center gap-1 border border-gray-400 focus:border-gray-600 hover:border-gray-600 hover:text-[#064e68] bg-background rounded-md h-10 px-3 py-2 cursor-pointer select-none transition-colors duration-150 text-sm text-[#1D1818] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          <span className="text-[#1D1818] text-sm">Favorites</span>
                          <svg xmlns="http://www.w3.org/2000/svg" fill={showLikedOnly ? 'red' : 'none'} viewBox="0 0 24 24" stroke="currentColor" className={`h-5 w-5 ${showLikedOnly ? 'text-red-500' : 'text-gray-400'}`}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.682l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
                        </div>
                        <div className="flex flex-row items-center gap-1 ml-2">
                          <Switch checked={isListView} onCheckedChange={setIsListView} id="list-view-switch" />
                          <label htmlFor="list-view-switch" className="text-sm font-medium text-[#1D1818]">List View</label>
                        </div>
                      </div>
                    }
                  />
                </div>
                <div className="flex flex-row gap-0 gap-3 min-w-[160px] md:min-w-[220px] justify-center md:justify-end items-center self-center h-full">
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
          </div>

          {/* Most Popular Cities Section */}
          {(!searchTerm && !selectedTag && !showLikedOnly) && (
            <div className="w-full mb-2 flex flex-col items-center">
              <h2 className="text-2xl font-bold text-[#064e68] mb-4">Most Popular Cities</h2>
              <div className="w-full flex flex-col md:flex-row gap-[2px] mb-8 justify-center">
                {topCities.map((city, idx) => {
                  // Normalize city name for matching
                  const cityKey = city.city.toLowerCase();
                  let heroImg = cityImageMap['bali'];
                  if (cityKey.includes('bali')) heroImg = cityImageMap['bali'];
                  else if (cityKey.includes('medellin')) heroImg = cityImageMap['medellin'];
                  else if (cityKey.includes('mexico')) heroImg = cityImageMap['mexico city'];
                  else if (cityKey.includes('rio')) heroImg = cityImageMap['rio de janeiro'];
                  else if (cityKey.includes('tulum') || cityKey.includes('playa')) heroImg = cityImageMap['tulum'];
                  // Capitalize city name, special case for PDC/Tulum
                  let displayCity = city.city.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                  if (cityKey.includes('tulum') || cityKey.includes('playa')) displayCity = 'PDC/Tulum';
                  return (
                    <div
                      key={city.city}
                      className={
                        `relative w-full md:flex-1 min-w-0 max-w-none bg-white rounded-2xl shadow-[0_4px_16px_0_rgba(0,0,0,0.12),0_0_8px_0_rgba(0,0,0,0.10)] hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.16),0_0_16px_0_rgba(0,0,0,0.14)] transition-shadow duration-200 cursor-pointer border-2 p-0 ${cityFilter === city.city ? 'border-[hsl(var(--brand))]' : 'border-transparent'} ${idx !== topCities.length - 1 ? 'mb-[2px] md:mb-0' : ''} md:max-w-[200px] overflow-hidden`
                      }
                      onClick={() => {
                        setCityFilter(cityFilter === city.city ? null : city.city);
                        let searchValue = city.city.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                        if (cityKey.includes('tulum') || cityKey.includes('playa')) searchValue = 'Tulum';
                        setSearchTerm(searchValue);
                      }}
                      title={`Show groups in ${displayCity}`}
                      style={{ position: 'relative' }}
                    >
                      <img
                        src={heroImg}
                        alt={displayCity}
                        className="w-full h-24 sm:h-20 object-cover object-center"
                        onError={e => (e.currentTarget.src = '/placeholder.svg')}
                      />
                      {/* Overlay and text for all screens */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center px-2 py-1 bg-black/60 rounded-2xl">
                        <span className="relative z-10 font-bold text-base text-white text-center drop-shadow-md">{displayCity}</span>
                        <span className="relative z-10 text-xs text-gray-200 text-center">{city.country}</span>
                        <span className="relative z-10 text-xs font-medium text-gray-100 mt-1 text-center">{city.count} groups</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

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
              isListView ? (
                <ExpandableListView
                  groupedByCountry={groupedByCountry}
                  allGroupedByCountry={allGroupedByCountry}
                  sortedCountries={sortedCountries}
                  likedGroups={likedGroups}
                  handleToggleLike={handleToggleLike}
                  ALLOW_VIEW_ALL_CITIES={ALLOW_VIEW_ALL_CITIES}
                />
              ) : (
                <>
                  {sortedCountries.map(country => {
                    // Count locked groups for this country from ALL groups, not just filtered
                    const lockedCount = (allGroupedByCountry[country] || []).filter(g => {
                      const isFreeValue = g.IsFree ?? g.isFree;
                      return typeof isFreeValue === 'string' && isFreeValue.trim().toLowerCase() !== 'yes';
                    }).length;
                    // Group by city within this country
                    const groupsByCity = (groupedByCountry[country] || []).reduce((acc, group) => {
                      const city = group.City || 'Other';
                      if (!acc[city]) acc[city] = [];
                      acc[city].push(group);
                      return acc;
                    }, {} as Record<string, Group[]>);
                    // Move 'countrywide' groups to the top, do not render a city header for them
                    const cityKeys = Object.keys(groupsByCity);
                    const countrywideKey = cityKeys.find(
                      c => c.trim().toLowerCase() === 'countrywide'
                    );
                    const otherCities = cityKeys.filter(
                      c => c.trim().toLowerCase() !== 'countrywide'
                    ).sort();
                    return (
                      <div key={country} className="mb-10">
                        <div className="flex items-center gap-2 mb-4 justify-between w-full">
                          <div className="flex items-center gap-2">
                            <span className="inline-block w-6 h-6 rounded-full bg-[hsl(var(--brand))] text-white flex items-center justify-center font-bold text-base uppercase">{country[0]}</span>
                            <h2 className="text-xl font-bold text-[#064e68]">{country}</h2>
                          </div>
                          {/* Show unlock indicator on far right if ALLOW_VIEW_ALL_CITIES is false and there are locked groups */}
                          {ALLOW_VIEW_ALL_CITIES === false && lockedCount > 0 && (
                            <Button
                              asChild
                              className="ml-2 bg-brand hover:bg-brand/90 text-white font-semibold px-4 py-2 rounded-md shadow transition-colors"
                              style={{ minWidth: 0, whiteSpace: 'nowrap' }}
                            >
                              <Link to="/register">
                                Unlock {lockedCount} more groups
                              </Link>
                            </Button>
                          )}
                        </div>
                        {/* Render countrywide groups first, no city header */}
                        {countrywideKey && (
                          <div className="mb-6">
                            {/* Tag/Interest grouping for countrywide */}
                            {Object.entries((groupsByCity[countrywideKey] || []).reduce((acc, group) => {
                              const tag = group.Tag || 'Other';
                              if (!acc[tag]) acc[tag] = [];
                              acc[tag].push(group);
                              return acc;
                            }, {} as Record<string, Group[]>)).map(([tag, tagGroups]) => (
                              <div key={tag} className="mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="inline-block w-4 h-4 rounded-full bg-[#e0def7] text-[#064e68] flex items-center justify-center font-bold text-xs uppercase">{tag[0]}</span>
                                  <h4 className="text-md font-semibold text-[#064e68]">{tag}</h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-6 xl:gap-8 w-full">
                                  {tagGroups.map((group, index) => (
                                    <GroupCard
                                      key={group.Name + group.URL + index}
                                      group={group}
                                      liked={likedGroups.includes(group.Name + group.URL)}
                                      onToggleLike={handleToggleLike}
                                    />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        {/* Render other cities with city header */}
                        {otherCities.map(city => (
                          <div key={city} className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-block w-5 h-5 rounded-full bg-[#e0def7] text-[#064e68] flex items-center justify-center font-bold text-xs uppercase">{city[0]}</span>
                              <h3 className="text-lg font-semibold text-[#064e68]">{city}</h3>
                            </div>
                            {/* Tag/Interest grouping for city */}
                            {Object.entries((groupsByCity[city] || []).reduce((acc, group) => {
                              const tag = group.Tag || 'Other';
                              if (!acc[tag]) acc[tag] = [];
                              acc[tag].push(group);
                              return acc;
                            }, {} as Record<string, Group[]>)).map(([tag, tagGroups]) => (
                              <div key={tag} className="mb-2">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="inline-block w-4 h-4 rounded-full bg-[#e0def7] text-[#064e68] flex items-center justify-center font-bold text-xs uppercase">{tag[0]}</span>
                                  <h5 className="text-sm font-semibold text-[#064e68]">{tag}</h5>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-6 xl:gap-8 w-full">
                                  {tagGroups.map((group, index) => (
                                    <GroupCard
                                      key={group.Name + group.URL + index}
                                      group={group}
                                      liked={likedGroups.includes(group.Name + group.URL)}
                                      onToggleLike={handleToggleLike}
                                    />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    );
                  })}

                  {filteredGroups.length === 0 && groups.length > 0 && (
                    <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                      <p className="text-gray-500 text-lg">No groups found matching your criteria.</p>
                      <p className="text-gray-400 mt-2">Try adjusting your search filters.</p>
                    </div>
                  )}
                </>
              )
            )}
          </div>
        </section>
      </div>
      {/* Footer */}
      <footer className="rounded-t-2xl w-full border-t border-[#e0def7] h-[56px] md:h-[64px] bg-[#fbf5f7] fixed bottom-0 left-0 z-40 text-xs md:text-base">
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
            <a href="sitemap.xml" className="hover:text-gray-600 transition-colors" target="_blank" rel="noopener noreferrer">
              Sitemap
            </a>
          </div>
        </div>
      </footer>
      <AnalyticsAndConsent />
    </div>
  );
};

export default Index;
