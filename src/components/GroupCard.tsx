
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, MapPin, Tag, Users } from 'lucide-react';

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
}

export const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  const handleJoinGroup = () => {
    if (group.URL) {
      window.open(group.URL, '_blank', 'noopener,noreferrer');
    }
  };

  const getPlatformColor = (platform: string | null) => {
    if (!platform) return 'bg-gray-100 text-gray-800';
    
    switch (platform.toLowerCase()) {
      case 'whatsapp':
        return 'bg-green-100 text-green-800';
      case 'telegram':
        return 'bg-blue-100 text-blue-800';
      case 'facebook':
        return 'bg-blue-100 text-blue-800';
      case 'meetup':
        return 'bg-red-100 text-red-800';
      case 'reddit':
        return 'bg-orange-100 text-orange-800';
      case 'discord':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-200 border-0 bg-white">
      <div className="space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
            {group.Name || 'Unnamed Group'}
          </h3>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>
              {group.City && group.Country 
                ? `${group.City}, ${group.Country}`
                : group.Country || group.City || 'Location not specified'
              }
            </span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {group['Link Type'] && (
            <Badge variant="secondary" className={getPlatformColor(group['Link Type'])}>
              {group['Link Type']}
            </Badge>
          )}
          
          {group.IsFree === 'Yes' && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Free
            </Badge>
          )}
          
          {group.Tag && (
            <Badge variant="outline" className="text-xs">
              <Tag className="h-3 w-3 mr-1" />
              {group.Tag}
            </Badge>
          )}
        </div>

        {/* Continent */}
        {group.Continent && (
          <div className="text-sm text-gray-500">
            {group.Continent}
          </div>
        )}

        {/* Action Button */}
        <Button 
          onClick={handleJoinGroup}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={!group.URL}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Join Group
        </Button>

        {/* Secondary URL */}
        {group.URL2 && (
          <Button
            variant="outline"
            onClick={() => window.open(group.URL2!, '_blank', 'noopener,noreferrer')}
            className="w-full text-sm"
          >
            <ExternalLink className="h-3 w-3 mr-2" />
            Alternative Link
          </Button>
        )}
      </div>
    </Card>
  );
};
