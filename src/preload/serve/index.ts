import { ChildProcessWithoutNullStreams, spawn } from 'child_process'
let process: ChildProcessWithoutNullStreams | undefined
import { join } from 'path'

export const createServe = (
  config = {
    data: 1
  }
): void => {
  process = spawn('node', [join(__dirname, '../../static/server/index.js'), JSON.stringify(config)])

  process.stdout.on('data', (data) => {
    console.log(data.toString())
  })

  process.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`)
  })

  process.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
  })
}
export const stopServe = (): void => {
  if (process) {
    process.emit('disconnect')
  }
}
