import fs from 'fs'
import shell from 'shelljs'
import path from 'path'
let fsAdapter = {}


fsAdapter.touch = (key) => {
  try {
    stats = fs.lstatSync(key)
    if (!stats.isFile()) {
      shell.rm(key)
      shell.touch(key)
    }
  } catch(e) {
    shell.touch(key)
  }
}

fsAdapter.setItem = (key, val, cb) => {
  key = path.resolve(key)
  fsAdapter.touch(key)
  fs.writeFile(key, val, cb)
}

fsAdapter.getItem = (key, cb) => {
  key = path.resolve(key)
  fsAdapter.touch(key)
  fs.readFile(key, `utf8`, cb)
}

export default fsAdapter
