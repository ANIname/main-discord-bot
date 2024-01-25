import path from 'path'
import { readFileSync } from 'fs'

const messagesContentsEn = [
  { content: readFileSync(path.join(__dirname, 'first-message-en.md'), 'utf-8') },
  { content: readFileSync(path.join(__dirname, 'second-message-en.md'), 'utf-8') },
  { content: readFileSync(path.join(__dirname, 'third-message-en.md'), 'utf-8') },
]

const messagesContentsUa = [
  { content: readFileSync(path.join(__dirname, 'first-message-ua.md'), 'utf-8') },
  { content: readFileSync(path.join(__dirname, 'second-message-ua.md'), 'utf-8') },
  { content: readFileSync(path.join(__dirname, 'third-message-ua.md'), 'utf-8') },
]

const messagesContentsRu = [
  { content: readFileSync(path.join(__dirname, 'first-message-ru.md'), 'utf-8') },
  { content: readFileSync(path.join(__dirname, 'second-message-ru.md'), 'utf-8') },
  { content: readFileSync(path.join(__dirname, 'third-message-ru.md'), 'utf-8') },
]

export default {
  en: messagesContentsEn,
  ua: messagesContentsUa,
  ru: messagesContentsRu,
}

export interface MessagesContent {
  content: string
}