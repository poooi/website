module.exports = {
  'src/*.{ts,tsx}': ['eslint --fix', 'git add'],
  '*.md': ['prettier --write', 'git add'],
}
