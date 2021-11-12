#!/bin/bash -v


# for this folder.
#node ./../../../../bitbucket/wdingsoft/utis/index.nod.js


# gen index for bitbucket. 
TargetDir="../"
TargetExe="./batch_git_config_update/configit.nd.js"
WatchDir="./"


ls -l

cd ${TargetDir}
ls -ls ${TargetExe}
node ${TargetExe}   $1 $2 $3

cd -

#back to this folder.
#node ./../../../bitbucket/wdingsoft/utis/index.nod.js






