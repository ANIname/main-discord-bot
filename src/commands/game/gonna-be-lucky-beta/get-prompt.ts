import type { UserMention } from 'discord.js'

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
    '\n' + 'Суть игры проста. Тебе нужно сгенерировать случайное событие и указать сколько очков ты добавил или отнял.' +
    '\n' + 'Например: ' + examples[0] +
    '\n' + 'Или: '      + examples[1] +
    '\n' + 'Или: '      + examples[2] +
    '\n' + 'Или: '      + examples[3] +
    '\n' + 'Или: '      + examples[4] +
    '\n' + 'Первая строка - это текст события. Обязательно в тексте события также указывай количество очков которые ты дал, или забрал' +
    '\n' + 'Вторая строка - это количество очков, которые ты дал, или забрал. Отрицательное число - это отнять очки, положительное - добавить.' +
    '\n' + 'Третья строка - это склонение слова "очко". Например: "очко", "очка", "очков".' +
    '\n' + 'Где: ' + mention + ' - никнейм игрока.' +
    '\n' + 'Я буду считать очки и вести таблицу лидеров.' +
    '\n' + 'От тебя я хочу только событие в точно таком формате как в примерах.' +
    '\n' + 'Мне не нужно от тебя каких-либо объяснений или чего-то подобного' +
    '\n' + 'Обязательно должен быть перенос строки чтобы я мог разпарсить твой ответ.' +
    '\n' + 'Обязательно ты должен в конце текста указать количество очков которые ты добавил, или отнял. Прямо как в моём примере.' +
    '\n' + 'Не добавляй лишние переносы строки. событие, 1 перенос, очки, 1 перенос, склонение. Всё!' +
    '\n' + 'Не добавляй кавычки. Даже в начале и в конце своего сообщения.' +
    '\n' + 'Не добавляй никаких других специальных символов.' +
    '\n' + 'Проверяй свои события на ошибки. Я не могу их исправить.' +
    '\n' + 'Просто скопируй одно из примеров и замени текст события, количество очков и склонение.' +
    '\n' + 'Мне нужно только одно событие.' +
    '\n' + 'Событие должно быть забавное, смешное, или нелепое.' +
    '\n' + 'Старайся реже использовать слово: "случайно".' +
    '\n' + 'Шанс на то добавишь ли ты очки, или отнимешь их должен быть 50/50.' +
    '\n' + 'Минимум символов для текста события - 20 символов.' +
    '\n' + 'Максимум символов для текста события - 1800 символов.' +
    '\n' + 'Количество очков не может быть меньше чем размер текста события и не может быть больше чем размер текста + 200 символов.' +
    '\n' + 'Тоесть если размер текста события 100 символов - то количество очков которое ты может дать, или отнять находится в диапазоне 100 - 300 очков.' +
    '\n' + 'Или если размер текста события 151 символ - то количество очков которое ты может дать, или отнять находится в диапазоне 151 - 351 очков.' +
    '\n' + 'Или если размер текста события 213 символов - то количество очков которое ты может дать, или отнять находится в диапазоне 213 - 413 очков.' +
    '\n' + 'И так далее.' +
    '\n' + 'Если ты что-то сделаешь не так - приложение сломается, поэтому будь внимателен.'
}