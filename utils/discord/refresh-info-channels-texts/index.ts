import { Guild, ThreadChannel, TextChannel } from 'discord.js'
import Promise                               from 'bluebird'

import data                      from './data'
import { ChannelData, Language } from './types.d'

/**
 * Refreshes info channels texts
 * @param {Guild} guild - Discord Guild
 * @returns {Promise<void>}
 */
export default async function refreshInfoChannelsTexts (guild: Guild) {
  console.time('refreshInfoChannelsTexts')

  const result = await Promise.each(Object.keys(data), async (channelName) => {
    const channelData = data[channelName] as ChannelData

    const mainChannel = await guild.channels.cache.find(({ name }) => name === channelData.names.main) as TextChannel

    const fetchedArchivedThreads = await mainChannel.threads.fetchArchived()
    const archievedThreads       = fetchedArchivedThreads.threads.map((thread) => thread)

    await Promise.each(archievedThreads, (thread) => thread.setArchived(false))
    
    const fetchedActiveThreads = await mainChannel.threads.fetch()
    const activeThreads        = fetchedActiveThreads.threads.map((thread) => thread)

    const fetchedMessages = await mainChannel.messages.fetch()
    const messages        = fetchedMessages.map((message) => message)

    if (activeThreads.length !== Object.keys(channelData.names).length - 1) {
      await Promise.each(activeThreads, (thread) => thread.delete())

      await Promise.each(messages, (message) => message.delete())

      await mainChannel.send(channelData.greatings.content)
    }

    return Promise.each(Object.keys(channelData.contents) as Language[], async (language: Language) => {
      if (language === 'main') return

      const messagesContents = channelData.contents[language]

      let thread = await mainChannel.threads.cache.find(({ name }) => name === channelData.names[language]) as ThreadChannel

      if (!thread) thread = await mainChannel.threads.create({ name: channelData.names[language] })

      const fetchedMessages = await thread.messages.fetch()

      const messages = fetchedMessages.map((message) => message).reverse()

      if (messages.length > messagesContents.length) {
        await thread.bulkDelete(messages.length - messagesContents.length)
      }

      await Promise.each(messagesContents.reverse(), async (messageContent, messageContentIndex: number) => {
        const existingMessage   = messages[messageContentIndex]
        const newMessageContent = messageContent.content

        const isMessageExists         = !!existingMessage
        const isMessageContentChanged = existingMessage?.content !== newMessageContent

        if (!isMessageExists) await thread.send(newMessageContent)
        if (isMessageContentChanged) await existingMessage?.edit(newMessageContent)
      })
    })
  })

  console.timeEnd('refreshInfoChannelsTexts')

  return result
}