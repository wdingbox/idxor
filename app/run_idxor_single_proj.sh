#!/bin/bash 



if [ $# -ne 2 ]
  then
    echo "need 2 arguments for target dir:  [wdingsoft|wdingbox] [projname pkg21 ]"
    exit 1
fi

echo $1 $2
# chech directory existance
INPUT_DIR="../../../$1/$2/"
if [ ! -d "${INPUT_DIR}" ]; then
    echo "Target directory does not exist: ${INPUT_DIR} "
    exit 1
fi


run_proj()
{
    # gen index for bitbucket. 
    TargetDir="../../../$1/$2/"
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

run_proj $1 $2 

exit 0