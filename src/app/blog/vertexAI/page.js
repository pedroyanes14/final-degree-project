"use client";

// import React, { useEffect } from 'react';
import { useSearchParams } from "next/navigation";
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

const Page = () => {
    const country = useSearchParams().get("country");
    const content = useSearchParams().get("content");

    /* useEffect(() => {
        window.history.replaceState(null, '', `?country=${country}`);
    }, []); */

	return (
		<div className="single-blog-page">
			<h2>{country.toUpperCase()} ROAD TRIP</h2>
			<div className="blog-post">
				<p>{content}</p>
			</div>
			<SpeedInsights />
			<Analytics />
		</div>
	);
};

export default Page;