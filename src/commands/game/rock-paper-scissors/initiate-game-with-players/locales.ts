import declineWorl from 'decline-word'

export const playerAlreadyInGame = {
  uk: (choice: string) => `🥳 Ви вже в грі! Ваш вибір: ${choice}. Дочекайтеся результатів.`,
  ru: (choice: string) => `🥳 Вы уже в игре! Ваш выбор: ${choice}. Дождитесь результатов.`,
  'en-US': (choice: string) => `🥳 You are already in the game! Your choice: ${choice}. Wait for the results.`
}

export const playerPointsNotEnough = {
  uk: (points: number) => `🤔 Ви не можете грати з цією ставкою, у вас недостатньо балів. Ваш баланс: ${points} ${declineWorl(points, 'оч', 'ко', 'ка', 'ок')}!`,
  ru: (points: number) => `🤔 Вы не можете играть с этой ставкой, у вас недостаточно баллов. Ваш баланс: ${points} ${declineWorl(points, 'очк', 'о', 'а', 'ов')}!`,
  'en-US': (points: number) => `🤔 You cannot play with this bet, you do not have enough points. Your balance: ${points} ${declineWorl(points, 'point', 's', 's', 's')}!`
}
