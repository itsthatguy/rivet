#!/usr/bin/env node
const yargs = require('yargs');

import {
  linkHandler,
  publishHandler,
  versionHandler,
  watchHandler,
  compileHandler,
} from '../lib'

const versionOptions = {
  command: 'version <version|major|minor|patch>',
  aliases: ['version', 'v'],
  desc: 'Bump the package version',
  handler: versionHandler,
};

const publishOptions = {
  command: 'publish [version|major|minor|patch]',
  aliases: ['publish', 'pub', 'p'],
  desc: 'Publish the package with an optional version bump',
  handler: publishHandler,
};

const linkOptions = {
  command: 'link [pkg]',
  aliases: ['link', 'l'],
  desc: 'Link the package in the global node_modules',
  handler: linkHandler,
};

const compileOptions = {
  command: 'compile [src]',
  aliases: ['compile', 'c'],
  desc: 'Compile contracts from the [src] to JSON',
  builder: {
    clean: { default: false },
    src: {
      default: false,
      aliases: ['input', 'inputDir', 'in'],
    },
    ignore: {
      default: false,
      type: 'array'
    },
    out: {
      aliases: ['outputDir', 'output'],
      default: '__contracts__/contracts/',
    }
  },
  handler: compileHandler,
};

const watchOptions = {
  command: 'watch',
  aliases: ['w'],
  builder: {
    src: {
      default: '__contracts__/**/*.contract.js',
      aliases: ['input', 'inputDir', 'in'],
    },
  },
  desc: 'Watch and compile changes to contracts',
  handler: watchHandler,
};

const pkgVersion = require('../package.json').version;
yargs
.command(versionOptions)
.command(publishOptions)
.command(linkOptions)
.command(compileOptions)
.command(watchOptions)
.help()
.check((argv) => {
  if (argv._.length === 0) yargs.showHelp();
  return true
})
.usage('Usage:\n  jss <publish|version> [version|major|minor|patch]')
.epilogue(`Version: v${pkgVersion}`)
.version(() => pkgVersion)
.argv
