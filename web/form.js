import {server} from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")

  const videoURL = input.value
  isValidShort(videoURL)

  const shortID = getShortID(videoURL)
  content.textContent = "Obtendo texto do áudio..."

  const transcription = await server.get("/summary/" + shortID)
  content.textContent = "Realizando o resumo..."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})

function isValidShort(videoURL) {
  if (!videoURL.includes("shorts")) {
    return (content.textContent = "Esse vídeo não parece ser um Short!")
  }
}

function getShortID(videoURL) {
  const [_, params] = videoURL.split("/shorts/")
  const [shortID] = params.split("?si")
  return shortID
}
