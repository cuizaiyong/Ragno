const webpack = require('webpack');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');
const { platform } = require('./config');
const { extractArgv } = require('./args');
const { stat } = require('fs');
function build(buildConfig) {
  const spinner = ora('Generating packages...');
  spinner.start();
  webpack(buildConfig, (err, stats) => {
    if (err) {
      throw err;
    }
    spinner.stop();
    process.stdout.write(
      stats.toString({
        modules: false,
        colors: true,
        children: false,
        chunks: false,
        chunkModules: false,
        hash: false,
        version: false,
      }) + '\n\n'
    );
    if (stats.hasErrors()) {
      console.log(chalk(' Generate failed with errors.\n'));
      process.exit(1);
    }

    console.log(chalk.cyan(' Generate complete.\n'));

    console.log(chalk.green(' Provide:\n'));

    console.log(chalk.green('  umd, amd, commonjs versions \n'));

    if (extractArgv(process).includes('watch')) {
      console.log(chalk.whiteBright(` ${format(new Date())} Waiting for change...\n`));
    }
  });
}
function format(date) {
  return `[${date.getFullYear()}-${ensure(date.getMonth() + 1)}-${ensure(
    date.getDay()
  )} ${ensure(date.getHours())}-${ensure(date.getMinutes())}-${ensure(date.getSeconds())}]`;
  function ensure(n) {
    return Number(n) > 9 ? n : `0${n}`;
  }
}
const buildEntry = Object.keys(platform).map((output) => {
  return platform[output];
});

build(buildEntry);
