#!/bin/bash -v


# for this folder.
#node ./../../../../bitbucket/wdingsoft/utis/index.nod.js


# gen index for bitbucket. 
TargetDir="./"
TargetExe="./configit.nd.js"

echo pat=$1
echo cmd=$2

cd ${TargetDir}
ls -l
node ${TargetExe}   ../ wdingbox:$1 $2

cd -

#back to this folder.







