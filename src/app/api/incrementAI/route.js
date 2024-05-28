import { NextResponse } from 'next/server';
import { incrementExampleCounterAI, measureDurationAI } from '../../metrics';

export function GET(req) {
    console.log('API /api/incrementAI called');
    incrementExampleCounterAI();
    const url = req.nextUrl.searchParams;
    const duration = Number(url.get('duration'));
    measureDurationAI(duration);
    return NextResponse.json({ message: 'Contador incrementado' });
}