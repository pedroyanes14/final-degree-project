"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function SubmitForm() {
    const [country, setCountry] = useState('');

    const handleClick = (e) => {
        if (!country) {
            e.preventDefault();
            alert('Please enter a country');
        }
    };
    
    return (
        <div className="submit">
            <input value={country} onChange={e => setCountry(e.target.value)} placeholder="Enter your country..." className="input"/>
            <Link href={{
                pathname: '/blog',
                query: {
                    country: country.toLowerCase()
                }
            }} className="btn" onClick={handleClick}>
                Find out your next trip
            </Link>
        </div>
    );
}