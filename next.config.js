/** @type {import('next').NextConfig} */

module.exports = {
  experimental: {
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
