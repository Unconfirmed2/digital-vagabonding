import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { GroupCard } from '@/components/GroupCard';

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

interface ExpandableListViewProps {
  groupedByCountry: Record<string, Group[]>;
  allGroupedByCountry: Record<string, Group[]>;
  sortedCountries: string[];
  likedGroups: string[];
  handleToggleLike: (group: Group) => void;
  ALLOW_VIEW_ALL_CITIES: boolean;
}

const ExpandableListView: React.FC<ExpandableListViewProps> = ({
  groupedByCountry,
  allGroupedByCountry,
  sortedCountries,
  likedGroups,
  handleToggleLike,
  ALLOW_VIEW_ALL_CITIES,
}) => {
  // Helper to group by interest/tag within a group array
  const groupByTag = (groups: Group[]) => {
    const byTag: Record<string, Group[]> = {};
    groups.forEach(group => {
      const tag = group.Tag || 'Other';
      if (!byTag[tag]) byTag[tag] = [];
      byTag[tag].push(group);
    });
    return byTag;
  };

  return (
    <Accordion type="multiple" className="w-full">
      {sortedCountries.map(country => {
        const lockedCount = (allGroupedByCountry[country] || []).filter(g => {
          const isFreeValue = g.IsFree ?? g.isFree;
          return typeof isFreeValue === 'string' && isFreeValue.trim().toLowerCase() !== 'yes';
        }).length;
        const groupsByCity = (groupedByCountry[country] || []).reduce((acc, group) => {
          const city = group.City || 'Other';
          if (!acc[city]) acc[city] = [];
          acc[city].push(group);
          return acc;
        }, {} as Record<string, Group[]>);
        const cityKeys = Object.keys(groupsByCity);
        const countrywideKey = cityKeys.find(c => c.trim().toLowerCase() === 'countrywide');
        const otherCities = cityKeys.filter(c => c.trim().toLowerCase() !== 'countrywide').sort();
        return (
          <AccordionItem key={country} value={country}>
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <span className="inline-block w-6 h-6 rounded-full bg-[hsl(var(--brand))] text-white flex items-center justify-center font-bold text-base uppercase">{country[0]}</span>
                <span className="text-xl font-bold text-[#064e68]">{country}</span>
                {ALLOW_VIEW_ALL_CITIES === false && lockedCount > 0 && (
                  <span className="ml-2 text-xs text-red-500 font-semibold">Unlock {lockedCount} more groups</span>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {countrywideKey && (
                <AccordionItem value={`${country}-countrywide`}>
                  <AccordionTrigger>
                    <span className="text-lg font-semibold text-[#064e68]">Countrywide</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    {/* Tag/Interest grouping for countrywide */}
                    {Object.entries(groupByTag(groupsByCity[countrywideKey])).map(([tag, tagGroups]) => (
                      <AccordionItem key={tag} value={`${country}-countrywide-${tag}`}>
                        <AccordionTrigger>
                          <span className="text-base font-semibold text-[#064e68]">{tag}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul>
                            {tagGroups.map((group, index) => (
                              <li key={group.Name + group.URL + index} className="border-b last:border-b-0">
                                <GroupCard
                                  group={group}
                                  liked={likedGroups.includes(group.Name + group.URL)}
                                  onToggleLike={handleToggleLike}
                                  listMode
                                  hideMeta
                                />
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              )}
              {otherCities.map(city => (
                <AccordionItem key={city} value={`${country}-${city}`}>
                  <AccordionTrigger>
                    <span className="text-lg font-semibold text-[#064e68]">{city}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    {/* Tag/Interest grouping for city */}
                    {Object.entries(groupByTag(groupsByCity[city])).map(([tag, tagGroups]) => (
                      <AccordionItem key={tag} value={`${country}-${city}-${tag}`}>
                        <AccordionTrigger>
                          <span className="text-base font-semibold text-[#064e68]">{tag}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul>
                            {tagGroups.map((group, index) => (
                              <li key={group.Name + group.URL + index} className="border-b last:border-b-0">
                                <GroupCard
                                  group={group}
                                  liked={likedGroups.includes(group.Name + group.URL)}
                                  onToggleLike={handleToggleLike}
                                  listMode
                                  hideMeta
                                />
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default ExpandableListView;
