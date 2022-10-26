import * as core from '@actions/core'
import {getOrCreateRunID} from './testrail'
import {getTouchedFiles} from './util'

async function run(): Promise<void> {
  try {
    const runInfo = await getOrCreateRunID()
    if (!runInfo) {
      throw new Error('Unable to create runID')
    }
    const features = await getTouchedFiles()
    let featuresStr = '*'
    if (features.length) {
      featuresStr = features.join(',')
    }
    core.setOutput('run_id', runInfo.id)
    core.setOutput('features_to_run', featuresStr)
    core.debug(`run_id: ${runInfo.id}`)
  } catch (error) {
    core.setFailed(error as string)
  }
}

run()
