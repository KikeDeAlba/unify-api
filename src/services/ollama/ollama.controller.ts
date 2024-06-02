import OpenAI from 'openai'

export const ollama = new OpenAI({
    baseURL: 'http://localhost:11434/v1',
    apiKey: 'ollama', // required but unused
})

export const createChatCompletion = async (messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
) => {
    const res = await ollama.chat.completions.create({
        model: 'llama3',
        messages
    })

    return res.choices[0].message.content ?? ''
}

