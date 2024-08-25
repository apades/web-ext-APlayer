/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,tsx,jsx}'],
  plugins: [
    function ({ addUtilities, matchUtilities }) {
      addUtilities({
        '.f-center': {
          'display': 'flex',
          'justify-content': 'center',
          'align-items': 'center',
        },
        '.f-i-center': {
          'display': 'flex',
          'align-items': 'center',
        },
        '.custom-scrollbar': {
          '&::-webkit-scrollbar': {
            width: '10px',
            height: '10px',
          },
          '&::-webkit-scrollbar-corner': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            'background': '#fff7',
            'background-clip': 'content-box',
            'border': '2px solid transparent',
            'border-radius': '16px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#fffa',
          },
          '&::-webkit-scrollbar-track': {
            display: 'none',
          },
        },
        '.flex-col': {
          display: 'flex',
        },
        '.ab-center': {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
        '.ab-vertical-center': {
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
        },
      })
      matchUtilities({
        bor: (value) => {
          const [width, color, rounded] = value.split(',')
          const entries = [
            ['borderWidth', width],
            ['borderColor', color],
            ['borderRadius', rounded],
          ].filter(v => !!v[1])
          return Object.fromEntries(entries)
        },
        wh: (value) => {
          const [width, height] = value.split(',')
          const entries = [
            ['width', width],
            ['height', height || width],
          ]
          return Object.fromEntries(entries)
        },
        lgtext: (value) => {
          const [deg, from, to] = value.split(',')

          return {
            'background': `-webkit-linear-gradient(${deg}deg, ${from}, ${to})`,
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
          }
        },
      })
    },
  ],
  corePlugins: {
    preflight: false,
  },
}
