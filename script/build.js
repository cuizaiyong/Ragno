const webpack = require('webpack');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');
const { platform } = require('./config');
function build(buildConfig) {
  const spinner = ora('Generating packages...');
  spinner.start();
  webpack(buildConfig, (err, stats) => {
    if (err) {
      throw(err);
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
        version: false
      }) + '\n\n'
    );
    if (stats.hasErrors()) {
      console.log(chalk(' Generate failed with errors.\n'));
    }

    console.log(chalk.cyan(' Generate complete.\n'));

    console.log(chalk.green(' Provide:\n'))

    console.log(chalk.green('  umd, amd, commonjs versions'))
  })
}



const buildEntry = Object.keys(platform).map(output => {
  return platform[output];
});

build(buildEntry);