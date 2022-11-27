module.exports = {
  '*.ts?(x)': [() => 'tsc -p tsconfig.json --pretty --noEmit', 'yarn lint:fix'],
  '*.{js,jsx,ts,tsx,json,css}': ['prettier --write'],
};
