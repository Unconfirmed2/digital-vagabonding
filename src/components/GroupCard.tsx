import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin, Tag, Heart } from 'lucide-react';

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

interface GroupCardProps {
  group: Group;
  liked?: boolean;
  onToggleLike?: (group: Group) => void;
}

const platformImageMap: Record<string, string> = {
  whatsapp: 'Whatsapp.png',
  telegram: 'Telegram.png',
  facebook: 'Facebook.png',
  meetup: 'Meetup.png',
  reddit: 'Reddit.png',
  internet: 'Website.png',
};

export const GroupCard: React.FC<GroupCardProps> = ({ group, liked, onToggleLike }) => {
  const handleJoinGroup = () => {
    if (group.URL) {
      window.open(group.URL, '_blank', 'noopener,noreferrer');
    }
  };

  const platform = group['Link Type']?.toLowerCase() || '';
  const platformImg = platformImageMap[platform];

  return (
    <Card className="flex flex-col h-20 w-full sm:min-w-0 sm:max-w-none md:min-w-[180px] md:max-w-[260px] bg-white rounded-lg shadow-[0_2px_8px_0_rgba(0,0,0,0.10),0_0_4px_0_rgba(0,0,0,0.08)] transition-all duration-200 border-0 relative p-2 pt-2 pb-2">
      {/* Top row: Group info and icons */}
      <div className="flex items-start justify-between mb-1 w-full">
        {/* Name, city, country container */}
        <div className="flex flex-col flex-1 min-w-0 pr-1">
          <a
            href={group.URL || undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-base text-gray-900 truncate min-w-0 hover:underline flex items-center gap-1 mb-0.5"
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: group.URL ? 'pointer' : 'default' }}
            title={group.Name || ''}
          >
            {group.Name || 'Unnamed Group'}
          </a>
          <div className="flex items-center gap-1 text-xs text-gray-600 mb-0 mt-0.5">
            <MapPin className="h-3 w-3" />
            <span className="truncate">
              {group.City && group.Country
                ? `${group.City}, ${group.Country}`
                : group.Country || group.City || 'Location not specified'}
            </span>
          </div>
          {/* Tag Badge */}
          {group.Tag && (
            <div className="flex flex-wrap mb-0.5">
              <span className="inline-flex items-center px-1.5 py-0 bg-gray-100 text-gray-700 text-[10px] font-medium rounded">
                <Tag className="h-2.5 w-2.5 mr-1" />
                {group.Tag}
              </span>
            </div>
          )}
        </div>
        {/* Icon container: platform icon and like button */}
        <div className="flex flex-col items-center justify-center min-w-[28px] ml-1 gap-1">
          {platformImg && (
            <a
              href={group.URL || undefined}
              target="_blank"
              rel="noopener noreferrer"
              title={group['Link Type'] || 'Platform'}
            >
              <img
                src={platformImg}
                alt={group['Link Type'] || 'Platform'}
                className="h-5 w-5 flex-shrink-0 inline-block align-middle"
              />
            </a>
          )}
          {onToggleLike && (
            <button
              aria-label={liked ? 'Unlike group' : 'Like group'}
              onClick={() => onToggleLike(group)}
              className="focus:outline-none transition-transform transition-colors duration-150 hover:scale-110 hover:text-red-500 mt-1"
              style={{ background: 'none', border: 'none', padding: 0 }}
            >
              <Heart className={`h-5 w-5 ${liked ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} fill={liked ? 'currentColor' : 'none'} />
            </button>
          )}
        </div>
      </div>
      {/* Spacer to push content to bottom */}
      <div className="flex-1" />
    </Card>
  );
};
