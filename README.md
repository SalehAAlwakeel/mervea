# MERVÉA Body Rituals

Static storefront for 100% natural hibiscus body rituals. Ready to publish on Netlify.

## Deploy on Netlify

No build step. The site is HTML, CSS, and JavaScript.

### Option A — Drag and drop

1. Zip this folder, or keep it as-is
2. Go to [app.netlify.com](https://app.netlify.com)
3. Sites → **Add new site** → **Deploy manually**
4. Drop the project folder (the one that contains `index.html`)

### Option B — Git

1. Push this repo to GitHub
2. In Netlify: **Add new site** → **Import an existing project**
3. Choose the repo
4. Leave the build command empty
5. Set publish directory to `.` (or leave blank)
6. Deploy

`netlify.toml` already sets the publish folder and headers.

After the first deploy, open **Forms** in the Netlify dashboard. Contact notes and checkout orders will appear there.

## After deploy

1. Open `js/products.js`
2. Set `STORE.whatsapp` to your number with country code, no `+` or spaces — example: `"212612345678"`
3. Update prices if needed
4. Redeploy

Netlify will email you when someone uses Contact or Checkout. You can also confirm orders on WhatsApp.

## Local preview

```bash
npx --yes serve .
```

## Pages

- `index.html` — home
- `shop.html` — shop and filters
- `product.html` — product detail
- `about.html` — the ritual
- `contact.html` — contact form
- `checkout.html` — order form
