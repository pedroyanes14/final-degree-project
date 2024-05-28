import { NextResponse } from 'next/server';
import { incrementExampleCounter, measureDuration } from '../../metrics';

export async function GET(req) {
    console.log('API /api/increment called');
    incrementExampleCounter();
    const url = req.nextUrl.searchParams;
    const duration = Number(url.get('duration'));
    measureDuration(duration);
    return NextResponse.json({ message: 'Contador incrementado' });
}