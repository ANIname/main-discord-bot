import { Player, Weapon } from './types.d'
import weapons from './weapons.json'

/**
 * Get winner
 * @param {Player[]} players - Players array
 * @returns {void}
 */
export default function playGame(players: Player[]): void {
  const choices = players.map(({ choice }) => choice)

  const isAllChoicesSame = choices.every((choice) => choice === choices[0])
  const isAllWeaponsChosen = Object.keys(weapons).every((weaponKey) => choices.includes(weaponKey as Weapon))

  return (isAllChoicesSame || isAllWeaponsChosen)
    ? players.forEach((player) => player.status = 'draw') // Draw
    : players.forEach((player) => checkDoesUserWin(player, choices)) // Win or Lose
}

/**
 * Check is user win or lose
 * @param {Player} player - Player
 * @param {Weapon[]} choices - Choices
 * @returns {string} - Player status
 */
function checkDoesUserWin(player: Player, choices: Weapon[]): string {
  if (player.choice === 'rock') {
    return player.status = choices.includes('scissors') ? 'win' : 'lose'
  }

  if (player.choice === 'scissors') {
    return player.status = choices.includes('paper') ? 'win' : 'lose'
  }

  if (player.choice === 'paper') {
    return player.status = choices.includes('rock') ? 'win' : 'lose'
  }

  throw new Error(`Unknown choice: "${player.choice}"`)
}