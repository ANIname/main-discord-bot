import checkDoesUserWin from './check-does-user-win'
import { updatePlayerStatus } from './player'
import { Player } from './types.d'
import weapons from './weapons.json'

/**
 * Play game
 * @param {Player[]} players - Players in the game
 * @returns {Player[]} - Players with updated status
 */
export default function playGame(players: Player[]): Player[] {
  const choices       = players.map(player => player.weapon)
  const uniqueChoices = new Set(choices)

  const isAllChoicesEqual  = uniqueChoices.size === 1
  const isAllWeaponsChosen = uniqueChoices.size === Object.keys(weapons).length

  return (isAllChoicesEqual || isAllWeaponsChosen)
    ? players.map(player => updatePlayerStatus(player, 'draw'))
    : players.map(player => checkDoesUserWin(player, uniqueChoices))
}
