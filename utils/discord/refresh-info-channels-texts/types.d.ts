export interface Data {
  [channelName: string]: {
    names: ChannelsNames
    greatings: {
      content: string
    }
    contents: {
      [lang in Language]: { content: string }[]
    }
  }
}

export interface ChannelsNames {
  main: string
  en: string
  ua: string
  ru: string
}

export type ChannelData = Data[ChannelName]
export type ChannelName = keyof Data
export type Language = keyof Data[ChannelName]['names'] | 'main'
