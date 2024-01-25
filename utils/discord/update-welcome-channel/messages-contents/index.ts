import path from 'path'
import { readFileSync } from 'fs'

const messagesContentsEn = [
  { content: readFileSync(path.join(__dirname, '../../../../utils/discord/update-welcome-channel/messages-contents', 'first-message-en.md'), 'utf-8') },
  { content: readFileSync(path.join(__dirname, '../../../../utils/discord/update-welcome-channel/messages-contents', 'second-message-en.md'), 'utf-8') },
  { content: readFileSync(path.join(__dirname, '../../../../utils/discord/update-welcome-channel/messages-contents', 'third-message-en.md'), 'utf-8') },
]

const messagesContentsUa = [
  { content: readFileSync(path.join(__dirname, '../../../../utils/discord/update-welcome-channel/messages-contents', 'first-message-ua.md'), 'utf-8') },
  { content: readFileSync(path.join(__dirname, '../../../../utils/discord/update-welcome-channel/messages-contents', 'second-message-ua.md'), 'utf-8') },
  { content: readFileSync(path.join(__dirname, '../../../../utils/discord/update-welcome-channel/messages-contents', 'third-message-ua.md'), 'utf-8') },
]

const messagesContentsRu = [
  { content: readFileSync(path.join(__dirname, '../../../../utils/discord/update-welcome-channel/messages-contents', 'first-message-ru.md'), 'utf-8') },
  { content: readFileSync(path.join(__dirname, '../../../../utils/discord/update-welcome-channel/messages-contents', 'second-message-ru.md'), 'utf-8') },
  { content: readFileSync(path.join(__dirname, '../../../../utils/discord/update-welcome-channel/messages-contents', 'third-message-ru.md'), 'utf-8') },
]

export default {
  en: messagesContentsEn,
  ua: messagesContentsUa,
  ru: messagesContentsRu,
}

export interface MessagesContent {
  content: string
}