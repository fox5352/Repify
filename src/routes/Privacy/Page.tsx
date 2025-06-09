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
              <h2 className="text-2xl font-bold text-zinc-950">Authentication & Local Data</h2>
            </div>
            <div className="space-y-4 text-zinc-700">
              <p className="leading-relaxed">
                We use a local database to store user information and basic cookies to manage authentication. These cookies are essential for keeping you logged in and ensuring the app works correctly. We do not use your data for tracking or advertising.
              </p>
              <div className="bg-emerald-50 border border-emerald-200 rounded-md p-4">
                <p className="text-emerald-800 font-medium">
                  ✓ Minimal and essential data storage only
                </p>
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
