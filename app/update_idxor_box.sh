#!/bin/bash -v


# for this folder.
#node ./../../../../bitbucket/wdingsoft/utis/index.nod.js




#back to this folder.
#node ./../../../bitbucket/wdingsoft/utis/index.nod.js



run_proj()
{
    # gen index for bitbucket. 
    TargetDir="../../$1/"
    ExeInTarget="../idxor/app/idxor_watch.nd.js"
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


run_proj "obilab"

run_proj "missionary"

run_proj "pubs"
