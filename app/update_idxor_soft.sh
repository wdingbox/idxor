#!/bin/bash -v


# for this folder.
#node ./../../../../bitbucket/wdingsoft/utis/index.nod.js




#back to this folder.
#node ./../../../bitbucket/wdingsoft/utis/index.nod.js



run_proj()
{
    # gen index for bitbucket. 
    TargetDir="../../../wdingsoft/$1/"
    ExeInTarget="../../wdingbox/idxor/app/idxor_watch.nd.js"
    htmfile="idxor.html"
    WatchDir="./"

    cp -vf ${htmfile} ${TargetDir}
    cd ${TargetDir}
    ls -l 
    node ${ExeInTarget} 
    open ${htmfile}
    #node ${ExeInTarget} ${WatchDir}
    cd -
}


run_proj "pkg00"
run_proj "pkg01"
run_proj "pkg02"
run_proj "pkg03"
run_proj "pkg04"
run_proj "pkg05"
run_proj "pkg06"
run_proj "pkg07"
run_proj "pkg08"
run_proj "pkg09"
run_proj "pkg10"
run_proj "pkg11"
run_proj "pkg12"
run_proj "pkg13"
run_proj "pkg14"
run_proj "pkg15"
run_proj "pkg16"
run_proj "pkg17"
run_proj "pkg20"
