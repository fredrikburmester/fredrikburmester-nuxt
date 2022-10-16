# Portfolio website - made wuth Nuxt 3

| Status | Enviroment | Link | CF Workers |
|---|---|---|---|---|
| ![Wrangler Prod](https://github.com/fredrikburmester/fredrikburmester-nuxt/actions/workflows/cloudflare-wrangler.yaml/badge.svg) |Production| <https://fredrikburmester-nuxt-production.fredrik-burmester.workers.dev/> | ✅ |
| ![Wrangler Dev](https://github.com/fredrikburmester/fredrikburmester-nuxt/actions/workflows/cloudflare-wrangler.yaml/badge.svg) |Development| <https://fredrikburmester-nuxt-develop.fredrik-burmester.workers.dev/> | ✅ |

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
