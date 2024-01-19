import { SlashCommandSubcommandBuilder } from '@discordjs/builders'

import { amountOption, memberOption, reasonOption, sendMessageOption } from './options'

export const addPointsSubcommand = new SlashCommandSubcommandBuilder()
  .setName('add')
  .setNameLocalizations({ 'uk': 'додати', 'ru': 'добавить' })
  .setDescription('Add points to a user')
  .setDescriptionLocalizations({
    'uk': 'Додає очки участнику',
    'ru': 'Добавляет очки участнику'
  })
  .addUserOption(
    memberOption()
      .setDescription('Member to add points to')
      .setDescriptionLocalizations({
        'uk': 'Учасник, якому додати очки',
        'ru': 'Участник, которому добавить очки'
      })
  )
  .addNumberOption(
    amountOption()
      .setDescription('Amount of points to add')
      .setDescriptionLocalizations({
        'uk': 'Кількість очок для додавання',
        'ru': 'Количество очков для добавления'
      })
  )
  .addStringOption(
    reasonOption()
      .setDescription('Reason for adding points')
      .setDescriptionLocalizations({
        'uk': 'Причина додавання очок',
        'ru': 'Причина добавления очков'
      })
  )
  .addBooleanOption(
    sendMessageOption()
      .setDescription('Send a message to the user about the points being added')
      .setDescriptionLocalizations({
        'uk': 'Надіслати повідомлення учаснику про додавання очок',
        'ru': 'Отправить сообщение участнику о добавлении очков'
      })
  )

export const removePointsSubcommand = new SlashCommandSubcommandBuilder()
  .setName('remove')
  .setNameLocalizations({ 'uk': 'забрати', 'ru': 'забрать' })
  .setDescription('Remove points from a user')
  .setDescriptionLocalizations({
    'uk': 'Забирає очки у учасника',
    'ru': 'Забирает очки у участника'
  })
  .addUserOption(
    memberOption()
      .setDescription('Member to remove points from')
      .setDescriptionLocalizations({
        'uk': 'Учасник, у якого забрати очки',
        'ru': 'Участник, у которого забрать очки'
      })
  )
  .addNumberOption(
    amountOption()
      .setDescription('Amount of points to remove')
      .setDescriptionLocalizations({
        'uk': 'Кількість очок для забирання',
        'ru': 'Количество очков для забирания'
      })
  )
  .addStringOption(
    reasonOption()
      .setDescription('Reason for removing points')
      .setDescriptionLocalizations({
        'uk': 'Причина забирання очок',
        'ru': 'Причина забирания очков'
      })
  )
  .addBooleanOption(
    sendMessageOption()
      .setDescription('Send a message to the user about the points being removed')
      .setDescriptionLocalizations({
        'uk': 'Надіслати повідомлення учаснику про забирання очок',
        'ru': 'Отправить сообщение участнику о забирании очков'
      })
  )

export const setPointsSubcommand = new SlashCommandSubcommandBuilder()
  .setName('set')
  .setNameLocalizations({ 'uk': 'встановити', 'ru': 'установить' })
  .setDescription('Set points for a user')
  .setDescriptionLocalizations({
    'uk': 'Встановлює очки у учасника',
    'ru': 'Устанавливает очки у участника'
  })
  .addUserOption(
    memberOption()
      .setDescription('Member to set points for')
      .setDescriptionLocalizations({
        'uk': 'Учасник, якому встановити очки',
        'ru': 'Участник, которому установить очки'
      })
  )
  .addNumberOption(
    amountOption()
      .setDescription('Amount of points to set')
      .setDescriptionLocalizations({
        'uk': 'Кількість очок для встановлення',
        'ru': 'Количество очков для установки'
      })
      .setMinValue(0)
  )
  .addStringOption(
    reasonOption()
      .setDescription('Reason for setting points')
      .setDescriptionLocalizations({
        'uk': 'Причина встановлення очок',
        'ru': 'Причина установки очков'
      })
  )
  .addBooleanOption(
    sendMessageOption()
      .setDescription('Send a message to the user about the points being set')
      .setDescriptionLocalizations({
        'uk': 'Надіслати повідомлення учаснику про встановлення очок',
        'ru': 'Отправить сообщение участнику о установке очков'
      })
  )
