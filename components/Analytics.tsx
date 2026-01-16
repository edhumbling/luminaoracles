import Script from "next/script";

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = "G-P9RTMNQPGE";

// Microsoft Clarity Project ID
const CLARITY_PROJECT_ID = "v2k3ymtj3v";

export default function Analytics() {
    return (
        <>
            {/* Google Analytics - loads in head as recommended by Google */}
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="beforeInteractive"
            />
            <Script id="google-analytics" strategy="beforeInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_MEASUREMENT_ID}');
                `}
            </Script>

            {/* Microsoft Clarity - official script */}
            <Script id="microsoft-clarity" strategy="beforeInteractive">
                {`
                    (function(c,l,a,r,i,t,y){
                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                    })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
                `}
            </Script>
        </>
    );
}
