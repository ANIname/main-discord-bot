import { UserMention } from 'discord.js'

import prepareExamples from './prepare-events-examples'

/**
 * Prepare prompt for chat-gpt
 * Generates a random event and gives or takes away points
 * @param {UserMention} mention - Discord user mention
 * @returns {string} - Prompt for chat-gpt
 */
export default function getPrompt (mention: UserMention) {
  const examples = prepareExamples(mention)

  return 'Мы играем в игру: "gonna be lucky".' +
    '\n Суть игры проста. Ты генерируешь случайное событие и даёшь или отнимаешь очки.' +
    '\n Coбытие должно быть забавное, смешное, или нелепое' +
    `\n Например: ${JSON.stringify(examples[0])}.` +
    `\n Или: ${JSON.stringify(examples[1])}.` +
    `\n Или: ${JSON.stringify(examples[2])}.` +
    `\n Или: ${JSON.stringify(examples[3])}.` +
    `\n Или: ${JSON.stringify(examples[4])}.` +
    `\n Где: ${mention} - никнейм игрока.` +
    '\n Я буду считать очки и вести таблицу лидеров.' +
    '\n От тебя я хочу только событие в формате JSON объекта. Не больше, не меньше.' +
    '\n Формат JSON объект. Где data - это событие, points - это очки, declination - указываешь склонение (очко, очка, очков).' +
    '\n Важно чтобы формат был именно такой, иначе я не смогу правильно посчитать очки.' +
    '\n Мне нужно только одно событие.' +
    '\n Старайся реже использовать слово: "случайно".' +
    '\n Шанс на то добавишь ли ты очки, или отнимешь их должен быть 50/50.' +
    '\n Минимум очков, которые можно отнять или добавить - 50.' +
    '\n Максимум очков, которые можно отнять или добавить - 500.'
}