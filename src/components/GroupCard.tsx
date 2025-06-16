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
    <Card className="flex flex-col h-full w-full bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-200 border-0 relative p-5">
      {/* Top row: Group name and platform icon */}
      <div className="flex items-center justify-between mb-1">
        <h3
          className="font-semibold text-lg text-gray-900 truncate flex-1 min-w-0 pr-2"
          style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer' }}
          title={group.Name || ''}
        >
          {group.Name || 'Unnamed Group'}
        </h3>
        <div className="flex flex-col items-center gap-1">
          {platformImg && (
            <img src={platformImg} alt={group['Link Type'] || 'Platform'} className="h-7 w-7 flex-shrink-0" />
          )}
          {/* Heart icon for like */}
          {onToggleLike && (
            <button
              aria-label={liked ? 'Unlike group' : 'Like group'}
              onClick={() => onToggleLike(group)}
              className="mt-1 focus:outline-none"
              style={{ background: 'none', border: 'none', padding: 0 }}
            >
              <Heart className={`h-5 w-5 ${liked ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} fill={liked ? 'currentColor' : 'none'} />
            </button>
          )}
        </div>
      </div>
      {/* Location */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
        <MapPin className="h-4 w-4" />
        <span className="truncate">
          {group.City && group.Country
            ? `${group.City}, ${group.Country}`
            : group.Country || group.City || 'Location not specified'}
        </span>
      </div>
      {/* Tag Badge */}
      {group.Tag && (
        <div className="flex flex-wrap mb-1">
          <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">
            <Tag className="h-3 w-3 mr-1" />
            {group.Tag}
          </span>
        </div>
      )}
      {/* Spacer to push button to bottom */}
      <div className="flex-1" />
      {/* Action Button */}
      <Button
        onClick={handleJoinGroup}
        className="w-full bg-brand hover:bg-brand/90 text-white mt-0"
        style={{ marginBottom: 0 }}
        disabled={!group.URL}
      >
        <ExternalLink className="h-4 w-4 mr-2" />
        Join Group
      </Button>
    </Card>
  );
};
