import * as fs from 'fs'
import * as path from 'path'
import { analyze } from './lib/analyze'

const content = fs.readFileSync(path.join(__dirname, '../waypoints.json'), {
  encoding: 'utf8',
})

const data = JSON.parse(content)
const ret = analyze(
  data.map((d: Record<string, unknown>) => {
    d.timestamp = new Date(d.timestamp as string)
    return d
  }),
)
console.log(ret)
