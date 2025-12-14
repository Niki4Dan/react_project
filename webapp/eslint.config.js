import baseConfig from '../eslint.config.js'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...baseConfig,

  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: ['tsconfig.json', 'tsconfig.node.json', 'tsconfig.app.json'],
      },
    },
    rules: {
    
      '@typescript-eslint/no-restricted-imports': [
        
        'error',
        {
          // Запрещаем импорт всего из @ideanick/backend, кроме /input
          patterns: [
            {
              regex: "^@project/backend/(?!(.*/)?input$).+$",
              message: 'Импорт из бэкенда разрешен только для файлов input',
              allowTypeImports: true,
            }
          ]
        }
      ]
    },
  },

  {
    ignores: ['dist', 'node_modules', 'coverage', 'eslint.config.js'],
  },

  //   🔹 Специальные настройки для Vite-конфига
  {
    files: ['./vite.config.ts'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: ['tsconfig.json', 'tsconfig.node.json', 'tsconfig.app.json'],
      },
    },
  },
]
