import express from 'express'
import {fileURLToPath} from 'url'
import path,{dirname} from 'path'

const _FILENAME=fileURLToPath(import.meta.url)
const _DIRNAME=dirname(_FILENAME)
const productsJSONPath=path.join(_DIRNAME,'/products.json')