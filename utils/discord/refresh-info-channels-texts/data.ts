import { readFileSync } from 'fs'
import forEach from 'lodash/forEach'
import split from 'lodash/split'
import cloneDeep from 'lodash/cloneDeep'

import path from 'path'

import { data, rootFolderPath, staticFilesPath, defaultChannelData } from './constants'
import { ChannelName, Language } from './types'

forEach(staticFilesPath, (filePath) => {
  const absoluteFilePath = path.join(rootFolderPath, filePath)
  const [, , channelName, fileOrLanguage] = split(filePath, '/')

  const channelData = data[channelName as ChannelName] || (data[channelName as string] = cloneDeep(defaultChannelData))

  const isJsonFile = filePath.endsWith('.json')
  const isGreatingsFile = filePath.endsWith('greatings-text.md')

  const fileData = (isJsonFile)
    ? JSON.parse(readFileSync(absoluteFilePath, 'utf-8'))
    : readFileSync(absoluteFilePath, 'utf-8')

  if (isJsonFile)      return channelData.names = fileData
  if (isGreatingsFile) return channelData.greatings = { content: fileData }

  const language = fileOrLanguage as Language

  if (!channelData.contents[language]) channelData.contents[language] = []

  return channelData.contents[language].push({ content: fileData })
})

export default data
