import { NextResponse } from 'next/server';
import { counter, duration, counterAI, durationAI } from '../../metrics';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const duracion = parseFloat(searchParams.get('duration'));
    const action = searchParams.get('action');
    console.log(duracion)
    console.log(action)

    if (action === 'fetch') {
        counter.inc();
        duration.observe(duracion);
        return NextResponse.json({ message: 'Contador incrementado' });
    } else if (action === 'fetchAI') {
        counterAI.inc();
        durationAI.observe(duracion);
        return NextResponse.json({ message: 'ContadorAI incrementado' });
    } else {
        return NextResponse.json({ message: 'No se ha realizado ninguna accion' });
    }
}