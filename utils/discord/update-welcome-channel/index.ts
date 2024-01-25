import { Client, Guild, Message, TextChannel } from 'discord.js'

import messagesContents, { MessagesContent } from './messages-contents'

const channelsByLanguage = {
  'en': '1200132513121706105',
  'ua': '1200132515046903836',
  'ru': '1200132521736818768',
}

const handle = async (client: Client, language: 'en' | 'ua' | 'ru') => {
  const guild = client.guilds.cache.first() as Guild
  const channel = guild.channels.cache.get(channelsByLanguage[language]) as TextChannel

  const messages = (await channel.messages.fetch()).map((message) => message).reverse()

  const promises: Promise<Message<true>>[] = []

  messagesContents[language].forEach((messageContent: MessagesContent, index: number) => {
    const existingMessage   = messages[index]
    const newMessageContent = messageContent.content

    const isMessageExists = !!existingMessage
    const isMessageContentChanged = existingMessage?.content !== newMessageContent

    if (!isMessageExists) return promises.push(channel.send(newMessageContent))
    if (isMessageContentChanged) return promises.push(existingMessage.edit(newMessageContent))

    return
  })

  if (messagesContents[language].length < messages.length) {
    await channel.bulkDelete(messages.length - messagesContents[language].length)
  }

  return Promise.all(promises)
}

/**
 * Update messages in the welcome channel
 * @param {Client} client - Discord Client
 * @returns {Promise<void>}
 */
export default async function updateWelcomeChannel (client: Client) {
  await Promise.all([
    handle(client, 'en'),
    handle(client, 'ua'),
    handle(client, 'ru')
  ])
}
