console.log('Environment Variables:')
console.log('VITE_CONTENTFUL_SPACE_ID:', import.meta.env.VITE_CONTENTFUL_SPACE_ID ? '✓ Set' : '✗ Missing')
console.log('VITE_CONTENTFUL_ACCESS_TOKEN:', import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN ? '✓ Set' : '✗ Missing')
console.log('VITE_CONTENTFUL_ENVIRONMENT:', import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master')
