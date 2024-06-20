import { NextResponse } from 'next/server';
import { counter, duration, counterAI, durationAI } from '../../metrics';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const duracion = parseFloat(searchParams.get('duration'));
    const action = searchParams.get('action');

    if (action === 'fetch') {
        counter.inc();
        duration.set(duracion);
        return NextResponse.json({ message: 'Contador incrementado' });
    } else if (action === 'fetchAI') {
        counterAI.inc();
        durationAI.set(duracion);
        return NextResponse.json({ message: 'ContadorAI incrementado' });
    } else {
        return NextResponse.json({ message: 'No se ha realizado nada' });
    }
}