import chalk from 'chalk';
import execa from 'execa';
import fs from 'fs';
import os from 'os';
import Listr from 'listr';
import ncp from 'ncp';
import path, { dirname } from 'path';
import { projectInstall } from 'pkg-install';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.dir, {
    clobber: false,
  });
}

async function initGit(options) {
  const result = await execa('git', ['init'], {
    cwd: options.dir,
  });
  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize Git'));
  }
  return;
}

export async function createProject(options) {
  const currentFileURL = dirname(fileURLToPath(import.meta.url));
  let templateDir = path.resolve(
    currentFileURL,
    '../templates',
    options.template.toLowerCase()
  );

  if (os.platform() == 'win32') {
    templateDir = templateDir.replace(/^(\w:\\)(\w:\\)/, '$2');
  }

  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  const tasks = new Listr([
    {
      title: 'Copy project files',
      task: () => copyTemplateFiles(options),
    },
    {
      title: 'Initialize git',
      task: () => initGit(options),
      enabled: () => options.git,
    },
    {
      title: 'Initialize dependencies',
      task: () =>
        projectInstall({
          cwd: options.dir,
        }),
      skip: () =>
        !options.runInstall
          ? 'Pass --install to automatically install all dependencies'
          : undefined,
    },
  ]);

  await tasks.run().then(() => {
    console.log(`Initialized ${options.template} project.`);
    copyTemplateFiles(options);
    console.log('%s Project ready', chalk.green.bold('DONE'));
  });
}
