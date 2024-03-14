const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/external/dayConfig',
                destination: 'https://sss-timer-dashboard.khaz.workers.dev/dash'
            }
        ]
    }
}

module.exports = nextConfig
