import * as deepl from 'deepl-node'

const DEEPL_API_KEY = process.env.DEEPL_API_KEY

export const translate = async (text: string): Promise<string> => {
    if (DEEPL_API_KEY == null) {
        throw new Error('Missing deepl api key.')
    }
    const translator = new deepl.Translator(DEEPL_API_KEY)

    const translationResult = await translator.translateText(
        text,
        null,
        'en-GB'
    )

    return translationResult.text
}
