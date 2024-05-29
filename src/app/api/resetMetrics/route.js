import { NextResponse } from 'next/server';
import { counter, duration, counterAI, durationAI } from '../../metrics';
import { cache } from '../route';

export async function GET(request) {
    cache.clear();
    counter.reset();
    duration.reset();
    counterAI.reset();
    durationAI.reset();
    return NextResponse.json({ message: 'Métricas reiniciadas' });
}