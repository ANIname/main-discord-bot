import { UserMention } from 'discord.js'

export default (mention: UserMention) => [
  {
    data: `${mention} решил прогуляться и потерял кошелёк.`,
    points: -10,
    declination: 'очков',
  },
  {
    data: `${mention} пошел в казино и выбил джекпот.`,
    points: 100,
    declination: 'очков',
  },
  {
    data: `${mention} не смог найти работу.`,
    points: -50,
    declination: 'очков'
  },
  {
    data: `${mention} решил расколоть грецкий орех кирпичем, но орех был крепче.`,
    points: -21,
    declination: 'очко'
  },
  {
    data: `${mention} закатил скандал капитану корабля из-за невкусного кофе, который оказался чаем.`,
    points: -32,
    declination: 'очка'
  }
]