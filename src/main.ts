import * as core from '@actions/core'
import {getOrCreateRunID} from './testrail'
import {getTouchedFiles} from './util'

async function run(): Promise<void> {
  try {
    const runID = await getOrCreateRunID()
    if (!runID) {
      throw new Error('Unable to create runID')
    }
    const features = await getTouchedFiles()
    let featuresStr = '*'
    if (features.length) {
      featuresStr = features.join(',')
    }
    core.setOutput('run_id', runID)
    core.setOutput('features_to_run', featuresStr)
    core.notice(`RUNID: ${runID}`)
    core.notice(JSON.stringify(features))
  } catch (error) {
    core.error('This is an error')
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
