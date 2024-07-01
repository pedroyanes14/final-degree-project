const client = require('prom-client');

const counter = new client.Counter({
  name: 'Peticion_API_WordPress',
  help: 'Este es un contador para contar las peticiones a la API de WordPress',
});

const duration = new client.Gauge({
  name: 'Duracion_Peticion_API_WordPress',
  help: 'Este es un contador para medir la duracion de las peticiones a la API de WordPress',
});

const counterAI = new client.Counter({
  name: 'Peticion_API_Vertex_AI',
  help: 'Este es un contador para contar las peticiones a la API de Vertex AI',
});

const durationAI = new client.Gauge({
  name: 'Duracion_Peticion__API_Vertex_AI',
  help: 'Este es un contador para medir la duracion de las peticiones a la API de Vertex AI',
});

module.exports = {
  client,
  counter,
  duration,
  counterAI,
  durationAI,
};