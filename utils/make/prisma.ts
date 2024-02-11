import 'dotenv/config'

import { execSync } from 'node:child_process'

import inquirer from 'inquirer'

(async () => {
  const { command } = await inquirer.prompt([{
    type: 'list',
    name: 'command',
    message: 'Choose the command:',
    choices: [
      { name: 'Generate', value: `npx prisma generate --schema=./services/prisma/schema.prisma` }
    ]
  }]) as { command: string }
  
  execSync(command, { stdio: 'inherit' })
})()
