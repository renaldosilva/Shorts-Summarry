import fs from "fs"
import wav from "node-wav"
import ffmpeg from "fluent-ffmpeg"
import ffmpegStatic from "ffmpeg-static"

const filePath = "./tmp/audio.mp4"
const outPutPath = filePath.replace(".mp4", ".wav")

export const convert = () =>
  new Promise((resolve, result) => {
    console.log("Covertendo o vídeo...")

    ffmpeg.setFfmpegPath(ffmpegStatic)
    ffmpeg()
      .input(filePath)
      .audioFrequency(16000)
      .audioChannels(1)
      .format("wav")
      .on("end", () => {
        const file = fs.readFileSync(outPutPath)
        const fileDecoded = wav.decode(file)

        const audioData = fileDecoded.channelData[0]
        const floatArray = new Float32Array(audioData)

        console.log("Vídeo convertido com sucesso!")

        resolve(floatArray)
        fs.unlinkSync(outPutPath)
      })
      .on("error", (error) => {
        console.log("Erro ao converter o vídeo!", error)
        rejects(error)
      })
      .save(outPutPath)
  })
