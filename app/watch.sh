#!/bin/bash -v


# for this folder.
#node ./../../../../bitbucket/wdingsoft/utis/index.nod.js


# gen index for bitbucket. 
TargetDir="../"
TargetExe="./app/watch_idx.nod.js"
WatchDir="./"

cp *.html ${TargetDir}.
cd ${TargetDir}
ls -ls ${TargetExe}
node ${TargetExe}    #update only
open idxor.html
node ${TargetExe} ${WatchDir}   #keep watching..
cd -

#back to this folder.
#node ./../../../bitbucket/wdingsoft/utis/index.nod.js






