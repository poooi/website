const lintScripts = ['eslint --fix']

module.exports = {
  '*.js': lintScripts,
  '*.ts': lintScripts,
  '*.es': lintScripts,
  '*.tsx': lintScripts,
  '*.md': ['prettier --write'],
}
