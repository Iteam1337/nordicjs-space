let gainValue = 1
const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
const gainNode = audioCtx.createGain()

export const start = async () => {
  const convolver = audioCtx.createConvolver()
  const resp = await fetch(
    'https://mdn.github.io/voice-change-o-matic/audio/concert-crowd.ogg'
  )
  const result = await resp.arrayBuffer()

  audioCtx.decodeAudioData(result, buffer => {
    convolver.buffer = buffer
  })

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  const source = audioCtx.createMediaStreamSource(stream)

  source.connect(convolver)
  convolver.connect(gainNode)
  gainNode.connect(audioCtx.destination)
}

export const mute = () => {
  gainValue = gainValue > 0 ? 0 : 1

  gainNode.gain.setTargetAtTime(gainValue, audioCtx.currentTime, 0)
}
