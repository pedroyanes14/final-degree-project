import { NextResponse } from 'next/server';
import { incrementExampleCounterAI, measureDurationAI } from '../../metrics';

export async function GET(req) {
    console.log('API /api/incrementAI called');
    await incrementExampleCounterAI();
    const url = req.nextUrl.searchParams;
    const duration = Number(url.get('duration'));
    await measureDurationAI(duration);
    return NextResponse.json({ message: 'Contador incrementado' });
}