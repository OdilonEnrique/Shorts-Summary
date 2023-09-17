import { pipeline } from "@xenova/transformers";
import { summaryExample } from "./utils/summary.js";

export async function summarize(text) {
  // return summaryExample;

  try {
    console.log("Realizando o resumo...");

    const generator = await pipeline(
      "summarization",
      "Xenova/bart-large-cnn"
    );

    const output = await generator(text);

    console.log("Resumo concluído com Sucesso");
    return output[0].summary_text;
  } catch (error) {
    console.log("Não foi possível realizar o resumo", error);
    throw new Error(error);
  }
}
