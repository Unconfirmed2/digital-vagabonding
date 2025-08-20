import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AnalyticsAndConsent } from "@/components/AnalyticsAndConsent";

const TerraformingMarsWiki = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      {/* Header */}
      <div className="w-full border-b border-[#e0def7] h-[56px] md:h-[64px] bg-[#fbf5f7] fixed top-0 left-0 z-40">
        <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/Logo-noBR.png" alt="Digital Vagabonding" className="h-8 w-8" />
            <span className="font-bold text-xl text-[#1D1818]">Digital Vagabonding</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" className="text-[#1D1818] hover:text-[#064e68]">
                Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-[72px] md:pt-[80px] pb-[72px] md:pb-[80px]">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            <div className="prose prose-lg max-w-none">
              <h1 className="text-4xl font-bold mb-8 text-[#1D1818]">Terraforming Mars Wiki</h1>
              
              <div className="mb-8">
                <p className="text-lg text-gray-700 mb-6">
                  Welcome to the Terraforming Mars community wiki! This resource is perfect for digital nomads 
                  and travelers who enjoy board games during their journeys. Whether you're in a co-working 
                  space in Bali or a café in Mexico City, you can reference game rules, strategies, and 
                  expansions right here.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-bold mb-4">The Game</h2>
                  <ul className="space-y-2">
                    <li><Link to="/wiki/rulebooks" className="text-[#064e68] hover:underline">Rulebooks</Link></li>
                    <li><Link to="/wiki/changelog" className="text-[#064e68] hover:underline">Changelog</Link></li>
                    <li><Link to="/wiki/variants" className="text-[#064e68] hover:underline">Variants</Link></li>
                    <li><Link to="/wiki/game-options" className="text-[#064e68] hover:underline">Game Options</Link></li>
                    <li><Link to="/wiki/maps" className="text-[#064e68] hover:underline">Maps</Link></li>
                    <li><Link to="/wiki/faq" className="text-[#064e68] hover:underline">FAQ</Link></li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-bold mb-4">Fan Expansions</h2>
                  <ul className="space-y-2">
                    <li><Link to="/wiki/ares" className="text-[#064e68] hover:underline">Ares</Link></li>
                    <li><Link to="/wiki/the-moon" className="text-[#064e68] hover:underline">The Moon</Link></li>
                    <li><Link to="/wiki/pathfinders" className="text-[#064e68] hover:underline">Pathfinders</Link></li>
                    <li><Link to="/wiki/alternative-venus-board" className="text-[#064e68] hover:underline">Alternative Venus Board</Link></li>
                    <li><Link to="/wiki/escape-velocity" className="text-[#064e68] hover:underline">Escape Velocity</Link></li>
                    <li><Link to="/wiki/ceos" className="text-[#064e68] hover:underline">CEOs</Link></li>
                    <li><Link to="/wiki/underworld" className="text-[#064e68] hover:underline">Underworld</Link></li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h2 className="text-2xl font-bold mb-4">For Digital Nomads</h2>
                <p className="text-gray-700 mb-4">
                  This wiki is especially curated for the digital nomad community. Whether you're playing 
                  with fellow travelers at a hostel, organizing game nights at co-working spaces, or 
                  introducing local friends to this amazing strategy game, you'll find everything you need here.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Quick reference guides for on-the-go gameplay</li>
                  <li>Mobile-friendly formatting for tablet and phone access</li>
                  <li>Community-contributed strategies and tips</li>
                  <li>Travel-friendly setup suggestions</li>
                </ul>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  This wiki content is based on the community-maintained Terraforming Mars wiki. 
                  All content is used with respect to the original creators and community contributors.
                </p>
                <Link to="/">
                  <Button className="bg-[#064e68] hover:bg-[#064e68]/90">
                    Back to Digital Vagabonding Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnalyticsAndConsent />
      
      {/* Footer */}
      <footer className="rounded-t-2xl w-full border-t border-[#e0def7] h-[56px] md:h-[64px] bg-[#fbf5f7] fixed bottom-0 left-0 z-40 text-xs md:text-base">
        <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link to="/privacy-policy" className="hover:text-gray-600 transition-colors">
              Privacy Policy
            </Link>
            <Separator orientation="vertical" className="h-3" />
            <Link to="/terms-of-service" className="hover:text-gray-600 transition-colors">
              Terms of Service
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

export default TerraformingMarsWiki;