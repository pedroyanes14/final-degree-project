"use client";

import React, { useEffect } from 'react';
import { useSearchParams } from "next/navigation";
import { Suspense } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next';

const page = () => {
    const country = useSearchParams().get("country");
    const content = useSearchParams().get("content");

    useEffect(() => {
        window.history.replaceState(null, '', `?country=${country}`);
    }, []);

	return (
		<div className="single-blog-page">
			<Suspense fallback={<div>Loading...</div>} />
				<h2>{country.toUpperCase()} ROAD TRIP</h2>
				<div className="blog-post">
					<p>{content}</p>
				</div>
			<Suspense />
		</div>
	);
};

export default page;