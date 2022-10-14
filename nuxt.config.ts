// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["nuxt-directus",'@nuxtjs/tailwindcss','@nuxt/content', '@pinia/nuxt',],
  directus: {
    url: process.env.NUXT_API_URL
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },
  app: {
    head: {
      viewport: 'initial-scale=1',
      title: 'FB',
      meta: [
        // <meta name="description" content="My amazing site">
        { name: 'Portfolio', content: 'My portfolio' }
      ],
    }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_API_URL || 'http://localhost:8055/',
      baseUrl: process.env.NUXT_BASE_URL || 'http://localhost:3000',
    }
  }
})
