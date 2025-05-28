import { Shield, Cookie, Globe, ExternalLink } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-zinc-950 text-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-teal-400" />
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-zinc-300 text-lg">
            Your privacy matters to us. Learn how we handle your data responsibly.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose max-w-none">
          {/* Introduction */}
          <div className="mb-12">
            <p className="text-lg text-zinc-700 leading-relaxed">
              This website respects your privacy. Here's how your data is handled with complete transparency.
            </p>
          </div>

          {/* Authentication Section */}
          <div className="mb-12 bg-white border border-zinc-200 rounded-lg p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Cookie className="w-6 h-6 text-emerald-500" />
              <h2 className="text-2xl font-bold text-zinc-950">Authentication Cookies</h2>
            </div>
            <div className="space-y-4 text-zinc-700">
              <p className="leading-relaxed">
                We use Supabase for user authentication. When you log in, Supabase sets cookies to maintain
                your session securely. These cookies are required for the app to function correctly and are
                not used for tracking or advertising purposes.
              </p>
              <div className="bg-emerald-50 border border-emerald-200 rounded-md p-4">
                <p className="text-emerald-800 font-medium">
                  ✓ Essential for app functionality only
                </p>
              </div>
            </div>
          </div>

          {/* Advertising Section */}
          <div className="mb-12 bg-white border border-zinc-200 rounded-lg p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-teal-400" />
              <h2 className="text-2xl font-bold text-zinc-950">Advertising (Google AdSense)</h2>
            </div>
            <div className="space-y-6 text-zinc-700">
              <p className="leading-relaxed">
                This website displays ads through Google AdSense. Google and its partners may use cookies
                to personalize ads based on your interests and previous browsing behavior.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-zinc-950 mb-2">Learn More About Google's Data Usage:</h3>
                  <a
                    href="https://policies.google.com/technologies/partner-sites"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-teal-400 hover:text-emerald-500 transition-colors font-medium"
                  >
                    Google's Privacy & Terms
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <div>
                  <h3 className="font-semibold text-zinc-950 mb-3">Opt Out of Personalized Ads:</h3>
                  <div className="space-y-2">
                    <a
                      href="https://adssettings.google.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-teal-400 hover:text-emerald-500 transition-colors font-medium block"
                    >
                      Google Ads Settings
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href="https://optout.aboutads.info/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-teal-400 hover:text-emerald-500 transition-colors font-medium block"
                    >
                      AboutAds.info Choices
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EU Users Section */}
          <div className="mb-12 bg-zinc-950 text-white rounded-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-teal-400" />
              <h2 className="text-2xl font-bold">EU Users</h2>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              If you are visiting from the European Union, you will be asked to consent to the use of
              cookies before any are stored in your browser, in accordance with GDPR requirements.
            </p>
            <div className="mt-4 bg-teal-400/10 border border-teal-400/20 rounded-md p-4">
              <p className="text-teal-400 font-medium">
                🇪🇺 GDPR Compliant Cookie Consent
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-8 border-t border-zinc-200">
            <p className="text-zinc-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
