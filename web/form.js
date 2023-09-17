import { server } from "./server";

const form = document.querySelector("#form");
const input = document.querySelector("#url");
const content = document.querySelector("#content");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  content.classList.add("placeholder");

  const videoURL = input.value;

  if (!videoURL.includes("shorts")) {
    return (content.textContent = "Este vídeo não parece ser um short.");
  }

  const [_, params] = videoURL.split("/shorts/");
  const [videoID] = params.split("?si");

  content.textContent = "Obtendo o texto do áudio...";

  const transcription = await server.get("/summary/" + videoID);

  content.textContent = "Realizando o resumo...";

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  });
  // Se vc comentar a constante summary e colocar abaixo o valor da constante transcription, você terá em texto tudo oq foi falado no short
  content.textContent = summary.data.result;
  content.classList.remove("placeholder");
});
