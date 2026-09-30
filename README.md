# Ant Laboratory: the website

A small, complete website for the app: a home page, **How it works**, **Support** and the **Privacy policy**. It's static: no server code, no build step, nothing to install, and it loads nothing from other websites.

| File | What it is |
| --- | --- |
| `index.html` | Home page: what the game is, screenshots, the App Store button |
| `about.html` | How it works: controls, species, the colony's life, the island, the Lab |
| `support.html` | Questions and answers, and how to contact you |
| `privacy.html` | Privacy policy for the app and the site ("Data Not Collected") |
| `site-config.js` | **Your details: fill this in** |
| `site.js` | Puts your details into the pages |
| `img/`, `og-image.jpg`, icons | Screenshots, the picture shown when someone shares a link, and the icons |
| `fonts/` | The game's fonts (SIL Open Font License) |

You can delete this README before uploading.

## 1. Fill in your details

Open `site-config.js` in a text editor and fill in:

- `supportEmail`: where players can write to you. Apple requires the support page to have a way to contact you, so don't leave this empty.
- `owner`: your name or your company's name. It appears in the privacy policy and at the foot of every page.
- `forum`: your forum, Discord server or subreddit, once you have one. Until then, the Community links stay hidden.
- `appStore`: once the app is live, its App Store link: `https://apps.apple.com/app/id6815513415`. Until then, the button says "Coming soon".

## 2. Put it online (free)

- **Netlify Drop**: go to <https://app.netlify.com/drop> and drag this folder onto the page. Sign up to keep the site, then check it is public.
- **Cloudflare Pages**: Workers & Pages → Create → Pages → upload this folder.
- **GitHub Pages**: upload these files to a public repository, then Settings → Pages → deploy from the `main` branch.

All three let you connect your own domain later (about $10–15 a year), which looks more trustworthy on an App Store listing.

## 3. The links App Store Connect asks for

- **Support URL**: `https://your-domain/support.html`
- **Privacy Policy URL**: `https://your-domain/privacy.html`
- **Marketing URL** (optional): `https://your-domain/`

Also put them into the app: `www/app-config.js` in the Xcode project folder, then `npx cap sync ios`.

## Good to know

- **Share picture**: some sites that show link previews need the picture's full address. Once you have your domain, change `og-image.jpg` in the `og:image` and `twitter:image` lines of `index.html` to `https://your-domain/og-image.jpg`.
- **The App Store badge**: the button here is plain text. Apple's official "Download on the App Store" badge, with the rules for using it, is at <https://developer.apple.com/app-store/marketing/guidelines/>. You can swap it in once the app is live.
- **Privacy policy**: the policy says the site uses no cookies or analytics. If you add any (or ads, or a sign-up form), update `privacy.html` to match.
