# La Belle Edit

Static affiliate roundup site. Pinterest pin → landing page with N products →
tap through to Amazon.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## Publishing a new edit

1. Create `src/content/roundups/<url-slug>.md`
2. Drop your images in `src/content/roundups/images/`
3. Fill the frontmatter — title, description, category, pinImage, products[]
4. `git push`

The post page, the category archive, the homepage card, the sitemap entry and
the structured data all generate from that one file. You never edit an index
page by hand.

### Image specs

| Purpose | Ratio | Upload size |
|---|---|---|
| `pinImage` (the Pinterest flyer) | 2:3 | 1000 × 1500 |
| `products[].image` | 3:4 | 900 × 1200 |

Upload full-size JPEGs. The build generates AVIF, WebP and JPEG at four widths
each and serves whichever the browser supports — don't pre-compress.

## Configuration

Everything non-content lives in `src/config.js`: domain, brand name, Amazon
tracking ID, disclosure text.

## Deploy (Cloudflare Pages)

1. Push this repo to GitHub
2. Cloudflare dashboard → Workers & Pages → Create → Pages → connect the repo
3. Build command `npm run build`, output directory `dist`
4. Add your custom domain in the Pages project settings

`public/_headers` sets the cache policy: hashed assets for a year, HTML always
revalidated.
