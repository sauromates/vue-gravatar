import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {},
  plugins: []
}
