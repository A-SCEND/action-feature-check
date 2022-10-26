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

ssh 'ascend-devtools-875q0uzmdpc#1W6hxexaJNkixOrHd0Pp0VZ_C5fmgyOU@ascend-devtools-875q0uzmdpc.ssh.ws-us72.gitpod.io'

## Requirements
List of secrets required by this action
### GITPOD_SSH_HOST
* Should be set as a secret, is meant to be used for connect to a gitpod ssh running env should be the host of the gp env: example `ascend-devtools-875q0uzasfake.ssh.ws-us72.gitpod.io` can be obtained from the connect via ssh option on the workspace dashboard
### GITPOD_SSH_PASSWORD
* Should be set as a secret, is meant to be used connect to a gitpod ssh running env should be the host of the gp env: example `1W6hxexaJNkixOrHd0Pp0VZ_C5fmgyOUFake` can be obtained from the connect via ssh option on the workspace dashboard
### GITPOD_SSH_USERNAME
* Should be set as a secret, is meant to be used connect to a gitpod ssh running env should be the host of the gp env: example `ascend-devtools-875q0uzasfake` can be obtained from the connect via ssh option on the workspace dashboard
### TESTRAIL_HOST
* Should be set as a secret, is meant to be used for connect to test rail api if available example: `https://ascend2.testrail.io/index.php?/api/v2`
### TESTRAIL_PASSWORD
* Should be set as a secret, is meant to be used for connect to testrail api need to be generator from testrail, is the same as the api key.
### TESTRAIL_PROJECTID
* Should be set as a secret, is meant to be used for create the run inside the project
### TESTRAIL_SUITID
* Should be set as a secret, is meant to be used for connect to testrail in case the test rail account is using multiple projects.
### TESTRAIL_USERNAME
* Should be set as a secret, is meant to be used for connect to testrail api. All the report sent to test rail will be report with the user provided.