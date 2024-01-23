import { SlashCommandNumberOption } from 'discord.js'


export const limitOption = new SlashCommandNumberOption()
  .setName('limit')
  .setNameLocalizations({ 'uk': 'ліміт', 'ru': 'лимит' })
  .setDescription('Limit of members')
  .setDescriptionLocalizations({
    'uk': 'Ліміт учасників',
    'ru': 'Лимит участников'
  })
  .setMaxValue(100)
  .setMinValue(1)