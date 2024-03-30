import { open } from 'node:fs/promises'

interface JsonLine {
    text: string
    cats: {
        responsibility: number,
        benefit: number,
        node: number,
        education: number,
        experience: number,
        soft: number,
        tech: number,
    }
}

const cleanSentence = (sentence: string) => sentence.toLowerCase()
    .match(/\b[a-z]{2,}\b/g);

const wordCount: Record<string, number> = {}

async function top100Words(): Promise<void> {
    console.log('Calculating top 100 words...')

    const fileHandle = await open(__dirname + '/../db/seeding/sentences.jsonl')

    for await (const rawLine of fileHandle.readLines()) {
        const { text }: JsonLine = JSON.parse(rawLine)

        const cleanedSentence = cleanSentence(text)

        if (!cleanedSentence) {
            continue;
        }

        cleanedSentence.forEach(word => {
            if (!wordCount[word]) {
                wordCount[word] = 1
            } else {
                wordCount[word]++
            }
        })
    }

    const sortedWords = Object.entries(wordCount)
        .sort(([, valueA], [, valueB]) => valueB - valueA);

    console.log(sortedWords.slice(0, 100))
}

void top100Words()

