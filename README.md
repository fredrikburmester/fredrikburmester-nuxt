# Portfolio website - made wuth Nuxt 3

| Build | Version | Link | SSR | Method |
|---|---|---|---|---|
| ![Cloudflare Pages Deployment](https://github.com/fredrikburmester/fredrikburmester-nuxt/actions/workflows/cloudflare.yaml/badge.svg) | Production | https://fredrikburmester-website.pages.dev/ | ❌ | Static |
| ![Cloudflare Pages Deployment](https://github.com/fredrikburmester/fredrikburmester-nuxt/actions/workflows/cloudflare-develop.yaml/badge.svg) | Development | https://develop.fredrikburmester-website.pages.dev/ | ❌ | Static |
| ![Cloudflare Pages Deployment](https://github.com/fredrikburmester/fredrikburmester-nuxt/actions/workflows/cloudflare-wrangler.yaml/badge.svg) |Production| https://fredrikburmester-nuxt-wrangler.fredrik-burmester7317.workers.dev/ | ✅ | CF Workers |



## Run

```bash
# yarn
yarn install
yarn dev
```

Build the application for production:

```bash
npx nuxi generate
```
