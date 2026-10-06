# Sairamya — Full Stack Developer Portfolio

React and Vite portfolio. Amazon Web Clone and RecipeGuide are not used as showcase projects.

## Run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Edit

- Links, email, and hero media flags: `src/data/siteConfig.js`
- Projects: `src/data/projects.js` (`github` and `live` stay empty until you add real URLs)
- Skills: `src/data/skills.js`

## Hero portrait

The hero uses the real headshot at `public/profile.jpg`. It walks in from the right and floats beside the headline. That photo is head and shoulders, so it is not a full-body walk.

To replace it with a real walking clip, add `public/walking-girl.mp4` and set `enableWalkingVideo` to `true` in `src/data/siteConfig.js`.

Add `public/resume.pdf` to enable the resume download later.
