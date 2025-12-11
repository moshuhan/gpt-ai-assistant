import config from '../config/index.js';
import { MOCK_TEXT_OK } from '../constants/mock.js';
import { createAssistantResponse, FINISH_REASON_STOP } from '../services/openai.js'; //有修改

class Completion {
  text;

  finishReason;

  constructor({
    text,
    finishReason,
  }) {
    this.text = text;
    this.finishReason = finishReason;
  }

  get isFinishReasonStop() {
    return this.finishReason === FINISH_REASON_STOP;
  }
}

/**
 * @param {Object} param
 * @param {Prompt} param.prompt
 * @returns {Promise<Completion>}
 */

/*const generateCompletion = async ({
  prompt,
}) => {
  if (config.APP_ENV !== 'production') return new Completion({ text: MOCK_TEXT_OK });
  const { data } = await createChatCompletion({ messages: prompt.messages });
  const [choice] = data.choices;
  return new Completion({
    text: choice.message.content.trim(),
    finishReason: choice.finish_reason,
  });
};
*/
const generateCompletion = async ({
  prompt,
}) => {
  if (config.APP_ENV !== 'production') {
    return new Completion({ text: MOCK_TEXT_OK });
  }

  // 這裡先直接把整個 messages 丟給 assistant
  const input = prompt.messages;

  const text = await createAssistantResponse({ input });

  return new Completion({
    text: text.trim(),
    finishReason: FINISH_REASON_STOP, // 自己給個固定的結束理由
  });
};

export default generateCompletion;


export default generateCompletion;
