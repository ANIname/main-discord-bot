import { updatePlayerStatus } from './player'
import { Player, Weapon } from './types.d'

/**
 * Check does user win
 * @param {Player} player - Player
 * @param {Set<Weapon>} uniqueChoices - Unique choices
 * @returns {Player} - Player with updated status
 */
export default function checkDoesUserWin(player: Player, uniqueChoices: Set<Weapon>): Player {
  switch (player.weapon) {
    case 'rock': {
      return uniqueChoices.has('scissors')
        ? updatePlayerStatus(player, 'win')
        : updatePlayerStatus(player, 'lose')
    }

    case 'paper': {
      return uniqueChoices.has('rock')
        ? updatePlayerStatus(player, 'win')
        : updatePlayerStatus(player, 'lose')
    }

    case 'scissors': {
      return uniqueChoices.has('paper')
        ? updatePlayerStatus(player, 'win')
        : updatePlayerStatus(player, 'lose')
    }

    default: {
      throw new Error(`Invalid weapon: "${player.weapon}"!`)
    }
  }
}