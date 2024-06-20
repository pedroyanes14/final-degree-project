//import { Registry, Gauge, Counter } from 'prom-client';
const client = require('prom-client');

// Crea un nuevo Registro
//const register = new Registry();

// Crea un contador de ejemplo
const counter = new client.Counter({
  name: 'Peticion_API_WordPress',
  help: 'Este es un contador para contar las peticiones a la API de WordPress',
  // registers: [register],
});

const duration = new client.Gauge({
  name: 'Duracion_Peticion_API_WordPress',
  help: 'Este es un contador para medir la duracion de las peticiones a la API de WordPress',
  // registers: [register],
});

const counterAI = new client.Counter({
  name: 'Peticion_API_Vertex_AI',
  help: 'Este es un contador para contar las peticiones a la API de Vertex AI',
  // registers: [register],
});

const durationAI = new client.Gauge({
  name: 'Duracion_Peticion__API_Vertex_AI',
  help: 'Este es un contador para medir la duracion de las peticiones a la API de Vertex AI',
  // registers: [register],
});

// Exporta las métricas y el contador
module.exports = {
  // register,
  client,
  counter,
  duration,
  counterAI,
  durationAI,
};