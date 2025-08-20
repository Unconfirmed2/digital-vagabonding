import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AnalyticsAndConsent } from "@/components/AnalyticsAndConsent";

interface WikiPageProps {
  title: string;
  children: React.ReactNode;
}

const WikiPage = ({ title, children }: WikiPageProps) => {
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
            <Link to="/wiki">
              <Button variant="ghost" className="text-[#1D1818] hover:text-[#064e68]">
                Wiki Home
              </Button>
            </Link>
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
              <div className="mb-6">
                <Link to="/wiki" className="text-[#064e68] hover:underline text-sm">
                  ← Back to Wiki Home
                </Link>
              </div>
              
              <h1 className="text-4xl font-bold mb-8 text-[#1D1818]">{title}</h1>
              
              <div className="wiki-content">
                {children}
              </div>

              <div className="mt-8 pt-6 border-t">
                <Link to="/wiki">
                  <Button variant="outline" className="mr-4">
                    Back to Wiki Home
                  </Button>
                </Link>
                <Link to="/">
                  <Button className="bg-[#064e68] hover:bg-[#064e68]/90">
                    Back to Digital Vagabonding
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

export default WikiPage;