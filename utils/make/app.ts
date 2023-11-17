import 'dotenv/config'

import { execSync } from 'node:child_process'

import inquirer from 'inquirer'

(async () => {
  const { command } = await inquirer.prompt([{
    type: 'list',
    name: 'command',
    message: 'Choose the command:',
    choices: [
      { name: 'Build application', value: 'npx tsc' },
      { name: 'Run application', value: 'npx ts-node src/index' },
      { name: 'Run and watch application', value: 'npx ts-node-dev --respawn --transpile-only src/index' }
    ]
  }]) as { command: string }
  
  execSync(command, { stdio: 'inherit' })
})()
