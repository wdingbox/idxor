#!/bin/bash -v


# for this folder.
#node ./../../../../bitbucket/wdingsoft/utis/index.nod.js


# gen index for bitbucket. 
Root_Name="nbsp21"
TargetDir="../../../${Root_Name}/"
TargetExe="../wdingbox/idxor/batch_git_cofig_update/configit.nd.js"

echo pat=$1  #
echo cmd=$2  # -w   :write. 

cd ${TargetDir}
ls -l
sudo node ${TargetExe}   ./ ${Root_Name}:$1 $2

cd -

#back to this folder.







