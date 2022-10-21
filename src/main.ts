import * as core from '@actions/core'
// import {wait} from './wait'

async function run(): Promise<void> {
  try {
    const touchedfiles = core.getState('touchedfiles')
    let listOfFiles: string[] = JSON.parse(touchedfiles)
    listOfFiles = listOfFiles.filter(filepath => filepath.includes('.feature'))
    const features: string = listOfFiles.join(',')
    core.saveState('featuresToRun', features)
    core.setOutput('featuresToRun', features)
    core.notice(JSON.stringify(features))
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
