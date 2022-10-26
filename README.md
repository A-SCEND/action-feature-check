<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# A-SCEN auto regretion action

This action create a regretion when main is merge agains stagin


## The process

* Checkout the auto testing repo using `action/checkout` (PENDING)
* Get the modified file list for this commit, this will be usefull if we have `.feature` inside the `ui_v2`
* Uses `ASCEND-feature-check` to Create a testRail runid if it does not exist or is closed 
* Set the `runId` as a step `output` variable
* Set the list of modified `.feature` file as output variable of the step
* Create a `run command` for the `auto_testing` repo to `run a report`
* Mark the runid as `completed` on testRail when the report ends (PENDING)
* Block the merge base on the report result (PENDING)

```sh
npm run report -- --spec ${{ steps.featurecheck.outputs.features_to_run }} --testrail_runId ${{ steps.featurecheck.outputs.run_id }}
```