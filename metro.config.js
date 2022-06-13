module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    // sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs'],
    sourceExts: [
      'jsx',
      'js',
      'ts',
      'tsx',
      'cjs',
      '.native',
      '.ios.jsx',
      '.native.jsx',
      '.ios.js',
      '.native.js',
      '.ios.ts',
      '.native.ts',
      '.ios.tsx',
      '.native.tsx',
      '.ios.cjs',
      '.native.cjs',
      '.cjs',
      '.ios.json',
      '.native.json',
      '.json',
    ],
  },
};
