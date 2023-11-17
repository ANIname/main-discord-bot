import { execSync } from 'node:child_process'

import inquirer from 'inquirer'

(async () => {
  const { command } = await inquirer.prompt([{
    type: 'list',
    name: 'command',
    message: 'Choose the command:',
    choices: [
      { name: '⬇️  Install dependencies', value: 'npm install' },
      { name: '🔄 Update dependencies', value: 'make npm-update' }
    ]
  }]) as { command: string }
  
  execSync(command, { stdio: 'inherit' })
})()

