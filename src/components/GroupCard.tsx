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
  listMode?: boolean;
  hideMeta?: boolean;
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

  // Card with no shadow by default, border, and custom hover shadow
  return (
    <div
      className="flex flex-row items-center justify-between w-full max-w-[600px] md:max-w-[700px] lg:max-w-[480px] xl:max-w-[600px] py-2 px-2 bg-white rounded-md border-2 border-grey:400 hover:shadow-[0_4px_8px_0_rgba(0,0,0,0.16),0_0_16px_0_rgba(0,0,0,0.14)] transition-shadow duration-200 cursor-pointer mb-1 min-h-[44px] group"
      
    >
      <div className="flex flex-row items-center flex-1 min-w-0 gap-2">
        <a
          href={group.URL || undefined}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-base text-blue-700 underline underline-offset-2 hover:text-blue-900 truncate min-w-0 flex items-center gap-1 transition-colors duration-150"
          style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: group.URL ? 'pointer' : 'default', maxWidth: '100%' }}
          title={group.Name || ''}
        >
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'inline-block', maxWidth: '100%' }}>
            {group.Name || 'Unnamed Group'}
          </span>
        </a>
      </div>
      <div className="flex flex-row items-center min-w-[28px] ml-2 gap-2">
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
            className="focus:outline-none transition-transform transition-colors duration-150 hover:scale-110 hover:text-red-500 relative"
            style={{ background: 'none', border: 'none', padding: 0, top: '2px' }}
          >
            <Heart className={`h-5 w-5 ${liked ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} fill={liked ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>
    </div>
  );
};
