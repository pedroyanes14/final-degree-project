import { NextResponse } from 'next/server';
import { counter, duration, counterAI, durationAI } from '../../metrics';

export async function GET(request) {
    counter.resets();
    duration.resets();
    counterAI.resets();
    durationAI.resets();
    return NextResponse.json({ message: 'Métricas reiniciadas' });
}