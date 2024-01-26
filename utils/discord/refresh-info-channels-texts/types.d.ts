export interface Data {
  [channelName: string]: {
    names: {
      main: string
      en: string
      ua: string
      ru: string
    }
    greatings: {
      content: string
    }
    contents: {
      [lang in Language]: { content: string }[]
    }
  }
}

export type ChannelData = Data[ChannelName]
export type ChannelName = keyof Data
export type Language = keyof Data[ChannelName]['names'] | 'main'
