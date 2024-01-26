import { Guild, ThreadChannel, TextChannel } from 'discord.js'
import Promise from 'bluebird'

import data from './data'
import { ChannelData, Language } from './types'

export default function refreshInfoChannelsTexts (guild: Guild) {
  return Promise.each(Object.keys(data), async (channelName) => {
    const channelData = data[channelName] as ChannelData

    const mainChannel = await guild.channels.cache.find(({ name }) => name === channelData.names.main) as TextChannel
    const threads = (await mainChannel.threads.fetch()).threads.map((thread) => thread)

    if (threads.length !== Object.keys(channelData.names).length - 1) {
      await Promise.each(threads, (thread) => thread.delete())

      await mainChannel.bulkDelete(100)

      await mainChannel.send(channelData.greatings.content)
    }

    return Promise.each(Object.keys(channelData.contents) as Language[], async (language: Language) => {
      if (language === 'main') return

      const messagesContents = channelData.contents[language]

      let thread = await mainChannel.threads.cache.find(({ name }) => name === channelData.names[language]) as ThreadChannel

      if (!thread) thread = await mainChannel.threads.create({ name: channelData.names[language] })

      const messages = (await thread.messages.fetch()).map((message) => message).reverse()

      if (messages.length > messagesContents.length) {
        await thread.bulkDelete(messages.length - messagesContents.length)
      }

      await Promise.each(messagesContents.reverse(), async (messageContent, messageContentIndex: number) => {
        const existingMessage = messages[messageContentIndex]
        const newMessageContent = messageContent.content

        const isMessageExists = !!existingMessage
        const isMessageContentChanged = existingMessage?.content !== newMessageContent

        if (!isMessageExists) await thread.send(newMessageContent)
        if (isMessageContentChanged) await existingMessage?.edit(newMessageContent)
      })
    })
  })
}