"use client";

import Script from "next/script";
import { useEffect } from "react";

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = "G-P9RTMNQPGE";

// Microsoft Clarity Project ID
const CLARITY_PROJECT_ID = "v2k3ymtj3v";

export default function Analytics() {
    useEffect(() => {
        // Initialize Microsoft Clarity if project ID is set
        if (CLARITY_PROJECT_ID) {
            import("@microsoft/clarity").then((clarity) => {
                clarity.default.init(CLARITY_PROJECT_ID);
            });
        }
    }, []);

    return (
        <>
            {/* Google Analytics */}
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_MEASUREMENT_ID}');
                `}
            </Script>
        </>
    );
}
