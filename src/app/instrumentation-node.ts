// instrumentation-node.ts
/* import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { HostMetrics } from '@opentelemetry/host-metrics';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { RuntimeNodeInstrumentation } from '@opentelemetry/instrumentation-runtime-node';
import {
    Resource,
    detectResourcesSync,
    envDetector,
    hostDetector,
    processDetector,
} from '@opentelemetry/resources';
import { MeterProvider } from '@opentelemetry/sdk-metrics';
import {
    SEMRESATTRS_SERVICE_NAME,
    SEMRESATTRS_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';

const exporter = new PrometheusExporter({
    port: 9464,
});
const detectedResources = detectResourcesSync({
    detectors: [envDetector, processDetector, hostDetector],
});

const customResources = new Resource({
    [SEMRESATTRS_SERVICE_NAME]: 'my-app',
    [SEMRESATTRS_SERVICE_VERSION]: '0.1.0',
});

const resources = detectedResources.merge(customResources);

const meterProvider = new MeterProvider({
    readers: [exporter],
    resource: resources,
});
const hostMetrics = new HostMetrics({
    name: `my-app-metrics`,
    meterProvider,
});

registerInstrumentations({
    meterProvider,
    instrumentations: [
        new HttpInstrumentation(),
        new RuntimeNodeInstrumentation(),
    ],
});

hostMetrics.start();
*/