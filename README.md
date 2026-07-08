# MordenTown React Learning System

A project-based React learning system that teaches React by guiding the user through building the MordenTown company website.

## What It Contains

- React + JavaScript as the main implementation path.
- Runtime JS / TS display toggle for code examples.
- A staged course flow based on building the MordenTown company website.
- Detailed explanations of how to use each React concept correctly and why it is used.
- A live website preview covering components, props, lists, state, derived state, and controlled forms.
- Later stages for effects, custom hooks, reducer, context, router, tests, and publishing.

## Commands

```bash
npm install --legacy-peer-deps
npm run dev:vite
npm run lint
npm run type-check
npm run build
```

## Local URL

The dev server usually runs at:

```text
http://localhost:5180/
```

If that port is busy, Vite can use another port.

## GitHub Pages

The production site URL is:

```text
https://noah-yang-x.github.io/React_/
```

Publishing flow:

1. Push `main`.
2. GitHub Actions builds the Vite app.
3. The generated `dist` output is published to the `gh-pages` branch.

In the repository's GitHub Pages settings, use:

```text
Source: Deploy from a branch
Branch: gh-pages
Folder: / (root)
```
