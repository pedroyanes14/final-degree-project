/** @type {import('next').NextConfig} */

module.exports = {
  experimental: {
    /* instrumentationHooks: true,
    serverComponentsExternalPackages: [
      '@opentelemetry/instrumentation',
    ],*/
    missingSuspenseWithCSRBailout: false,
  },
  /* async rewrites() {
    return [
      {
        source: '/metrics',
        destination: '/api/metrics',
      },
    ];
  }, */
};
