import { Registry, Gauge, Counter } from 'prom-client';

// Crea un nuevo Registro
const register = new Registry();

// Crea un contador de ejemplo
const counter = new Counter({
  name: 'Peticion_API_WordPress',
  help: 'Este es un contador para contar las peticiones a la API de WordPress',
  registers: [register],
});

const duration = new Gauge({
  name: 'Duracion_Peticion_API_WordPress',
  help: 'Este es un contador para medir la duracion de las peticiones a la API de WordPress',
  registers: [register],
});

const counterAI = new Counter({
  name: 'Peticion_API_Vertex_AI',
  help: 'Este es un contador para contar las peticiones a la API de Vertex AI',
  registers: [register],
});

const durationAI = new Gauge({
  name: 'Duracion_Peticion__API_Vertex_AI',
  help: 'Este es un contador para medir la duracion de las peticiones a la API de Vertex AI',
  registers: [register],
});

// Exporta las métricas y el contador
module.exports = {
  register,
  counter,
  duration,
  counterAI,
  durationAI,
};