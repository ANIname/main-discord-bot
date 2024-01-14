import { Locale, UserMention } from 'discord.js'

import prepareExamples from './prepare-events-examples'

/**
 * Prepare prompt for chat-gpt
 * Generates a random event and gives or takes away points
 * @param {Locale} locale - Locale
 * @param {UserMention} mention - Discord user mention
 * @returns {string} - Prompt for chat-gpt
 */
export default function getPrompt (locale: Locale, mention: UserMention) {
  const examples = prepareExamples(mention)

  let prompt = 'Мы играем в игру: "gonna be lucky".' +
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
    '\n Шанс на то что ты добавишь очков должен составлять 60%' +
    '\n Шанс на то что ты отнимешь очков должен составлять 40%' +
    '\n Минимум очков, которые можно отнять или добавить - 50.' +
    '\n Максимум очков, которые можно отнять или добавить - 500.'

    if (locale === 'uk') prompt += '\n Сгенерируй событие на украинском языке.'
    else if (locale === 'ru') prompt += '\n Сгенерируй событие на русском языке.'
    else prompt += '\n Сгенерируй событие на английском языке.'

    prompt += '\n Не забывай что ключи в объекте в любом случае должны быть на английском, иначе я не смогу их распарсить.'

    return prompt
}