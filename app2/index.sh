#!/bin/bash -v


# for this folder.
#node ./../../../../bitbucket/wdingsoft/utis/index.nod.js


# gen index for bitbucket. 
TargetDir="../"
TargetExe="./app/watch_idx.nod.js"

cp *.html ${TargetDir}.
cd ${TargetDir}
ls -ls ${TargetExe}
node ${TargetExe} 
open idxor.html
node ${TargetExe} "./"
cd -

#back to this folder.
#node ./../../../bitbucket/wdingsoft/utis/index.nod.js






