import { globSync } from 'glob'
import path from 'path'

import { Data } from './types'

export const rootFolderPath  = path.join(__dirname, '../../../')
export const staticFilesPath = globSync(path.join('static/channels-info/', '**', '*.{md,json}'))

export const defaultNames = { main: '', en: '', ua: '', ru: '' }
export const defauldContents = { main: [], en: [], ua: [], ru: [] }
export const defaultChannelData = { names: defaultNames, contents: defauldContents, greatings: { content: '' } }

export const data: Data = {}
