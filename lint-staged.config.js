module.exports = {
  '*.{ts,tsx}': ['tslint --fix', 'git add'],
  '*.md': ['prettier --write', 'git add'],
}
