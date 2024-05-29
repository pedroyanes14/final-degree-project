import { Registry, Histogram, Counter } from 'prom-client';

// Crea un nuevo Registro
const register = new Registry();

// Crea un contador de ejemplo
const counter = new Counter({
  name: 'Peticion_API_WordPress',
  help: 'Este es un contador para contar las peticiones a la API de WordPress',
  registers: [register],
});

const duration = new Histogram({
  name: 'Duracion_Peticion_WordPress',
  help: 'Este es un histograma para medir la duracion de las peticiones a la API de WordPress',
  registers: [register],
  buckets: [5, 50, 500, 2500],
});

const counterAI = new Counter({
  name: 'Peticion_API_Vertex_AI',
  help: 'Este es un contador para contar las peticiones a la API de Vertex AI',
  registers: [register],
});

const durationAI = new Histogram({
  name: 'Duracion_Peticion_Vertex_AI',
  help: 'Este es un histograma para medir la duracion de las peticiones a la API de Vertex AI',
  registers: [register],
  buckets: [5, 50, 500, 2500],
});

// Incrementa el contador cada vez que se llama
/* function incrementExampleCounter() {
  counter.inc();
}

function measureDuration(value) {
  duration.observe(value);
}

function incrementExampleCounterAI() {
  counterAI.inc();
}

function measureDurationAI(value) {
  durationAI.observe(value);
} */

// Exporta las métricas y el contador
module.exports = {
  /* register,
  incrementExampleCounter,
  measureDuration,
  incrementExampleCounterAI,
  measureDurationAI */
  register,
  counter,
  duration,
  counterAI,
  durationAI,
};