
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link to="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
            
            <div className="prose max-w-none text-gray-700 space-y-6">
              <p className="text-sm text-gray-500 mb-6">
                Last updated: {new Date().toLocaleDateString()}
              </p>
              
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using Digital Vagabonding, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description of Service</h2>
                <p>
                  Digital Vagabonding provides a curated collection of travel groups and communities from around the world. We aggregate and display information about various travel-related groups across different platforms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Use License</h2>
                <p>
                  Permission is granted to temporarily access the materials on Digital Vagabonding for personal, non-commercial transitory viewing only.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Disclaimer</h2>
                <p>
                  The materials on Digital Vagabonding are provided on an 'as is' basis. Digital Vagabonding makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">5. External Links</h2>
                <p>
                  Digital Vagabonding has not reviewed all of the sites linked to our platform and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Digital Vagabonding of the site.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Contact Information</h2>
                <p>
                  If you have any questions about these Terms of Service, please contact us through our website.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
