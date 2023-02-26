module.exports = {
  '*.ts?(x)': [
    () => 'yarn typecheck',
    'yarn lint:fix',
    'yarn test --bail --passWithNoTests --findRelatedTests',
  ],
  '*.{js,jsx,ts,tsx,json,css}': ['prettier --write'],
};
