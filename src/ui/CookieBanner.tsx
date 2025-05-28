import { useState, useEffect } from 'react';
import { Cookie, AlertTriangle, ExternalLink } from 'lucide-react';

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Simple cookie functions (since js-cookie isn't available in this environment)
  const setCookie = (name: string, value: string, days = 365) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  const getCookie = (name: string) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = getCookie('cookieConsent');

    if (!cookieConsent || cookieConsent == "declined") {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    setCookie('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    setCookie('cookieConsent', 'declined');
    setIsRedirecting(true);

    // Show redirect message for 3 seconds, then redirect
    setTimeout(() => {
      window.location.href = 'https://www.google.com';
    }, 3000);
  };

  if (isRedirecting) {
    return (
      <div className="fixed inset-0 bg-zinc-950/90 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center shadow-2xl">
          <AlertTriangle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-zinc-950 mb-4">Redirecting...</h2>
          <p className="text-zinc-700 mb-4">
            Since you declined cookies and ads, you're being redirected away from this site.
          </p>
          <div className="w-full bg-zinc-200 rounded-full h-2">
            <div className="bg-teal-400 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
          </div>
          <p className="text-sm text-zinc-500 mt-2">You'll be redirected in a few seconds...</p>
        </div>
      </div>
    );
  }

  if (!showBanner) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-zinc-950/50 backdrop-blur-sm z-40"></div>

      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl border border-zinc-200">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Cookie className="w-6 h-6 text-teal-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-zinc-950">Cookie Consent Required</h3>
                  <p className="text-sm text-zinc-600">This site requires ads to operate</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="mb-6 space-y-3">
              <p className="text-zinc-700 leading-relaxed">
                This website uses cookies for authentication and displays ads through Google AdSense to keep the service free.
                <strong className="text-zinc-950"> Accepting ads is required to use this site.</strong>
              </p>

              <div className="bg-emerald-50 border border-emerald-200 rounded-md p-3">
                <p className="text-emerald-800 text-sm font-medium">
                  ⚠️ If you decline, you'll be redirected away from this site
                </p>
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-teal-400 hover:text-emerald-500 transition-colors"
                >
                  Google's Data Usage
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-teal-400 hover:text-emerald-500 transition-colors"
                >
                  Ad Settings
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAccept}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
              >
                Accept Cookies & Ads
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 bg-zinc-950 hover:bg-zinc-800 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200"
              >
                Decline & Leave Site
              </button>
            </div>

            <p className="text-xs text-zinc-500 mt-3 text-center">
              By accepting, you agree to our use of cookies for authentication and advertising purposes.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
