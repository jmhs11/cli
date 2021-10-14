import arg from 'arg';
import inquirer from 'inquirer';
import path from 'path';
import { createProject } from './main';

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--git': Boolean,
      '--yes': Boolean,
      '--install': Boolean,
      '--dir': String,
      '--g': '--git',
      '--y': '--yes',
      '--i': '--install',
      '--d': '--dir',
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    skipPrompt: args['--yes'] || false,
    git: args['--git'] || false,
    template: args._[0],
    runInstall: args['--install'] || false,
    dir: args['--dir'] || process.cwd(),
  };
}

async function promptForMissingOptions(options) {
  if (options.dir != process.cwd()) {
    options.dir = path.resolve(process.cwd(), options.dir);
  }

  const defaultTemplate = 'webpack';
  if (options.skipPrompt) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    };
  }

  const questions = [];
  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Please choose a project template to initialize',
      choices: ['webpack'],
      default: defaultTemplate,
    });
  }

  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Would you initialize a git repository?',
      default: false,
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await createProject(options);
}
