import { ActionRowBuilder, EmbedBuilder, Message, StringSelectMenuBuilder,StringSelectMenuInteraction } from 'discord.js'

import { updateGameData } from '../../../../../services/knex/base-queries/game-data'
import { getUserMainGameDataOrInsertNew } from '../../../../../services/knex/base-queries/user'
import playGame from '../play-game'
import { getUserPlayer } from '../player'
import { GameOptions, InteractionOptions, Player, Weapon } from '../types.d'
import { addPlayer, updateEmbedToGameFinished } from './embed'
import { replyThatPlayerAlreadyInGame, replyThatPlayerPlayerPointsNotEnough } from './reply'

/**
 *
 * @param {Message<true>} sentMessage - Message
 * @param {ActionRowBuilder<StringSelectMenuBuilder>} menu - Menu
 * @param {EmbedBuilder} embed - Embed
 * @param {Player[]} players - Players
 * @param {InteractionOptions} interactionOptions - Interaction options
 */
export default function useCollector (
  sentMessage: Message<true>,
  menu: ActionRowBuilder<StringSelectMenuBuilder>,
  embed: EmbedBuilder,
  players: Player[],
  interactionOptions: InteractionOptions
) {
  const gameOptions: GameOptions = {
    timer: interactionOptions.timer,
    bet: interactionOptions.bet
  }

  const collector = sentMessage.createMessageComponentCollector({ idle: 60 * 60 * 1000  })

  collector.on('collect', async (colectorInteraction: StringSelectMenuInteraction) => {
    await colectorInteraction.deferReply({ ephemeral: true })

    const existingPlayer = players.find(player => player.discordId === colectorInteraction.user.id)

    const newPlayer = await getUserPlayer(colectorInteraction, {
      ...gameOptions,
      weapon: colectorInteraction.values[0] as Weapon
    })

    if (existingPlayer) {
      await replyThatPlayerAlreadyInGame(colectorInteraction, existingPlayer)

      return
    }

    if (newPlayer.points < gameOptions.bet) {
      await replyThatPlayerPlayerPointsNotEnough(colectorInteraction, newPlayer)
      
      return
    }

    if (interactionOptions.timer) {
      addPlayer(embed, colectorInteraction.user.id)

      await sentMessage.edit({ embeds: [embed], components: [menu] })
    }

    players.push(newPlayer)

    colectorInteraction.deleteReply() 

    collector.resetTimer({ idle: interactionOptions.timer })
  })

  collector.on('end', () => {
    const playedPlayers = playGame(players)
    const isDraw        = playedPlayers[0]?.status === 'draw'
    
    updateEmbedToGameFinished(embed, interactionOptions, playedPlayers)
    
    if (!isDraw && gameOptions.bet) {
      updateUsersPoints(gameOptions, playedPlayers)
    }

    sentMessage.edit({ embeds: [embed], components: [] })
  })
}

/**
 *
 * @param {GameOptions} gameOptions - Game options
 * @param {Player[]} playedPlayers - Played players with updated status
 */
async function updateUsersPoints(gameOptions: GameOptions, playedPlayers: Player[]) {
  const winners = playedPlayers.filter(player => player.status === 'win')
  const losers  = playedPlayers.filter(player => player.status === 'lose')

  const pointsToWinners = Math.round(gameOptions.bet * losers.length / winners.length) || 1
  const pointsToLosers  = -gameOptions.bet
  
  const promises = playedPlayers.map(async (player) => {
    const gameData = await getUserMainGameDataOrInsertNew({ id: player.id }, 'rockPaperScissors')
    
    const event = {
      winnersIds: winners.map(player => player.id),
      losersIds: losers.map(player => player.id),
      points: player.status === 'win' ? pointsToWinners : pointsToLosers,
      choice: player.weapon,
      status: player.status
    }

    const result = await updateGameData(gameData, event)

    console.log(result)

    return result
  })

  await Promise.all(promises)
}
