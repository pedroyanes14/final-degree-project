import { NextResponse } from 'next/server';
import { counter, duration, counterAI, durationAI } from '../../metrics';

export async function GET(request) {
    counter.reset();
    duration.reset();
    counterAI.reset();
    durationAI.reset();
    return NextResponse.json({ message: 'Métricas reiniciadas' });
}