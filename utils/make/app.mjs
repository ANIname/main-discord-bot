import 'dotenv/config'
import { execSync } from 'node:child_process'

import inquirer from 'inquirer'

const questions = [{
  type: 'list',
  name: 'command',
  message: 'Choose the command:',
  choices: [
    { name: 'Build application', value: 'npx tsc' },
    { name: 'Run application', value: 'npx ts-node src/index' },
    { name: 'Run and watch application', value: 'npx ts-node-dev --respawn --transpile-only src/index' }
  ]
}]

const { command } = await inquirer.prompt(questions)

execSync(command, { stdio: 'inherit' })