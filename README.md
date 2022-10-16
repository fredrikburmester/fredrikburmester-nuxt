# Portfolio website - made wuth Nuxt 3

| Status | Enviroment | Link | CF Workers |
|---|---|---|---|
| ![Wrangler Prod](https://github.com/fredrikburmester/fredrikburmester-nuxt/actions/workflows/cloudflare-production.yaml/badge.svg) |Production| <https://fb-nuxt-production.fredrik-burmester.workers.dev/> | ✅ |
| ![Wrangler Dev](https://github.com/fredrikburmester/fredrikburmester-nuxt/actions/workflows/cloudflare-develop.yaml/badge.svg) |Development| <https://fb-nuxt-develop.fredrik-burmester.workers.dev/> | ✅ |

## Run

```bash
# yarn
yarn install
yarn dev
```

or

```bash
yarn build
wrangler dev
```

Build the application for production:

```bash
yarn build
```

# CI

The website is deployed when pushed to the main branch. The deployment is done with Cloudflare Pages and Cloudflare Workers with a Github action.
