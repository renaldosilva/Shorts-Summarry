import { pipeline } from "@xenova/transformers"
import { summaryExample } from "./utils/summary.js"

export async function summarize(text) {
  // return summaryExample
  try {
    console.log("Realizando o resumo...")

    const generator = await pipeline(
      "summarization",
      "Xenova/distilbart-cnn-12-6"
    )

    const outPut = await generator(text)

    console.log("Resumo concluído com sucesso!")
    return outPut[0].summary_text
  } catch (error) {
    console.log("Não foi possível realizar o resumo", error)
    throw new Error(error)
  }
}
