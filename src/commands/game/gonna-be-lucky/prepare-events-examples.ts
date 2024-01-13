import { UserMention } from 'discord.js'

export default (mention: UserMention) => [
  {
    data: `${mention} решил прогуляться и потерял кошелёк.`,
    points: -150,
    declination: 'очков',
  },
  {
    data: `${mention} пошел в казино и выбил джекпот.`,
    points: 500,
    declination: 'очков',
  },
  {
    data: `${mention} не смог найти работу.`,
    points: -50,
    declination: 'очков'
  },
  {
    data: `${mention} решил расколоть грецкий орех кирпичем, но орех был крепче.`,
    points: -101,
    declination: 'очко'
  },
  {
    data: `${mention} вызвал духа лампы, который оказался ценителем оперы. После двух часов прослушивания арий, дух подарил ему билет на оперу в Вене и мешок золота.`,
    points: 243,
    declination: 'очка'
  }
]