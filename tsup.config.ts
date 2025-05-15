import { defineConfig } from 'tsup';

// export default defineConfig({
//   entry: ['src/index.ts'],
//   format: ['cjs', 'esm', 'iife'], // CJS, ESM, and UMD
//   outExtension: ({ format }) =>
//     format === 'cjs' ? { js: '.cjs' } : format === 'esm' ? { js: '.mjs' } : { js: '.js' },
//   dts: true, // Generates TypeScript declaration files
//   sourcemap: true,
//   splitting: false,
//   clean: true,
//   keepNames: true,
// });

export default defineConfig({
  entry: ['src/index.ts'],
  sourcemap: true,
  clean: true,
  format: ['cjs'],
  globalName: 'rosettanetstarknetjsimpl',
});
