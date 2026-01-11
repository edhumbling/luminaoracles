---
description: How to deploy the Next.js app to Cloudflare Pages
---

# Deploy to Cloudflare Pages

## Prerequisites
- `next.config.ts` must have `output: 'export'` and `images: { unoptimized: true }`
- Cloudflare API token with Pages permissions set in environment

## Build Settings (Cloudflare Dashboard)

| Setting | Value |
|---------|-------|
| Build command | `bun run build` |
| Build output directory | `out` |

## Deploy Command

For first-time deployment (creates project + deploys):
```bash
npx wrangler pages project create luminaoracles --production-branch=main && npx wrangler pages deploy out --project-name=luminaoracles
```

For subsequent deployments:
```bash
npx wrangler pages deploy out --project-name=luminaoracles
```

## Live URLs
- **Production:** https://luminaoracles.pages.dev
