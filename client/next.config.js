module.exports = {
  reactStrictMode: true,
  // Redirect from index straight to create poll, todo REMOVE AFTER INDEX CREATION
  async redirects() {
    return [
      {
        source: '/',
        destination: '/create',
        permanent: true,
      },
    ]
  },
}
