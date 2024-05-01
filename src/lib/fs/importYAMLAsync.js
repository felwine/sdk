import fs from "fs"
import checkFileExists from "./checkFileExists.js"
import YAML from 'yaml'

export default async _url => {
  if (!(await checkFileExists(_url))) {
    return null
  }
  const fileUrl = new URL(_url, import.meta.url)
  const file = fs.readFileSync(fileUrl, 'utf8')

  const parsed = YAML.parse(file)
  return parsed
}
