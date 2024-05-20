"use client";

import { useState } from 'react';
import Link from 'next/link';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

const page = () => {
	const [country, setCountry] = useState('');

	return (
		<div className="hero">
			<h2>Travel Planning</h2>
			<p>
				Enter the country you want to visit and we will suggest the best route
			</p>
			<div className="submit">
				<input value={country} onChange={e => setCountry(e.target.value)} placeholder="Enter your country..." className="input"/>
				<Link href={{
					pathname: '/blog',
					query: {
						country: country.toLowerCase()
					}
				}} className="btn">
					Find out your next trip
				</Link>
			</div>
			<SpeedInsights />
			<Analytics />
		</div>
	);
};

export default page;