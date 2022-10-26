import * as core from '@actions/core'

export async function getTouchedFiles(): Promise<string[]> {
  const featureFilePattern = core.getInput('feature_pattern') || '.feature'
  const touchedfiles = core.getState('touched_files') || ''
  let listOfFiles: string[] = []
  if (touchedfiles) {
    listOfFiles = JSON.parse(touchedfiles)
  }
  return listOfFiles.filter(filepath => filepath.includes(featureFilePattern))
}
