import { Client, Message } from 'discord.js'

/**
 * MessageCreate event
 * @param {Client} _ - Discord Client
 * @param {Message} message - Discord Message
 */
export default function messageCreate(_: Client, message: Message) {
  // Log text message
  console.log('message', message.content)
}