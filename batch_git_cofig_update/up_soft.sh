#!/bin/bash -v


# for this folder.
#node ./../../../../bitbucket/wdingsoft/utis/index.nod.js


# gen index for bitbucket. 
TargetDir="../../../"
TargetExe="./wdingbox/idxor/batch_git_cofig_update/configit.nd.js"

echo pat=$1
echo cmd=$2

cd ${TargetDir}
ls -l
node ${TargetExe}   ./ wdingsoft:$1 $2

cd -

#back to this folder.







