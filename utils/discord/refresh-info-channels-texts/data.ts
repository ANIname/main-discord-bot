import { readFileSync } from 'node:fs'

import path from 'node:path'

import forEach   from 'lodash/forEach'
import split     from 'lodash/split'
import cloneDeep from 'lodash/cloneDeep'

import { data, rootFolderPath, staticFilesPath, defaultChannelData } from './constants'
import { ChannelsNames, ChannelName, Language }                      from './types.d'

forEach(staticFilesPath, (filePath) => {
  const [, , channelName, fileOrLanguage] = split(filePath, '/')
  const absoluteFilePath                  = path.join(rootFolderPath, filePath)

  const channelData = data[channelName as ChannelName] || (data[channelName as string] = cloneDeep(defaultChannelData))

  const isJsonFile      = filePath.endsWith('.json')
  const isGreatingsFile = filePath.endsWith('greatings-text.md')

  const fileData = (isJsonFile)
    ? JSON.parse(readFileSync(absoluteFilePath, 'utf8')) as ChannelsNames
    : readFileSync(absoluteFilePath, 'utf8')

  if (isJsonFile)      return channelData.names = fileData as ChannelsNames
  if (isGreatingsFile) return channelData.greatings = { content: fileData as string }

  const language = fileOrLanguage as Language

  if (!channelData.contents[language]) channelData.contents[language] = []

  return channelData.contents[language].push({ content: fileData as string })
})



export {data as default} from './constants'