# Current Implementation Architecture

The app is a Vite/React/TypeScript frontend under `src/`. `src/src/App.tsx` owns route selection/rendering; `components/shell/AppShell.tsx` provides the application shell; page components live under `src/src/pages`; `src/src/services/mockData.ts` adapts `data/epfo_mock_package/epfo_mock_data.json`; types are in `services/types.ts`; styles and tokens are in `src/src/styles` and `docs/tokens.json`.

The current state is shallow-but-real. Do not represent mock-backed screens as production workflows. Deeper journey work follows the batches in `BATCH_STRATEGY.md`.
