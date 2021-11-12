// Version 2021-10-19
//

//var Uti = require("../Uti.Module").Uti
const fs = require('fs');
var path = require('path');
const net = require('net');

function ProcArgv(cbf) {
    this.m_argv = process.argv.slice(2);
    if (this.m_argv.length === 0) {
        console.log("missing params:\nusrname pat")
    }
    var obj = {};
    this.m_argv.forEach(function (str) {
    });
}

var DirFileUti = {
    getDirectories: function (srcpath) {
        return fs.readdirSync(srcpath).filter(function (file) {
            //if ("." === file[0]) return false;
            return fs.statSync(path.join(srcpath, file)).isDirectory();
        });
    },
    getPathfiles: function (srcpath) {
        return fs.readdirSync(srcpath).filter(function (file) {
            //if ("." === file[0]) return false;
            return fs.statSync(srcpath + '/' + file).isFile();
        });
    },

    genJs: function (srcPath, output) {
        var fary = this.getPathfiles(srcPath);
        var dary = this.getDirectories(srcPath);

        output[srcPath] = []
        for (var k = 0; k < fary.length; k++) {
            var sfl = fary[k];
            var pathfile = path.join(srcPath, sfl);
            var stats = fs.statSync(pathfile);
            var ob = {}
            ob[sfl] = stats.size
            output[srcPath].push(ob);// += stats.size;
        }
        for (var i = 0; i < dary.length; i++) {
            var spath = dary[i];
            this.genJs(path.join(srcPath, spath), output);
        }
    },
    genJs_writefile: function () {
        var output = {}
        this.genJs("./", output)
        var str = "var idxobj = " + JSON.stringify(output, null, 4)
        //console.log(output)
        fs.writeFileSync("idxobj.json.js", str, "utf8")
    }
}


//////////////////////////
//////////////////////////
function CurPathfiles() {

}
CurPathfiles.prototype.run = function () {
    if (false === this.take_argv()) return
    this.work()
    this.get_gitconfig()
    this.up_gitconfig()
}
CurPathfiles.prototype.take_argv = function () {
    this.m_argv = process.argv.slice(2);
    if (this.m_argv.length < 2) {
        console.log("missing params: [dir] [usrname:pat] [-w:write config]")
        return false
    }
    if (this.m_argv.length === 2) {
        console.log("This is trial test. config will not changed.")
    }
    if (this.m_argv.length === 3 && '-w' === this.m_argv[2]) {
        console.log("config will changed.")
        this.m_bWrite =true
    }
    this.m_wd = this.m_argv[0]
    this.m_usrpat = this.m_argv[1]

    return true
}
CurPathfiles.prototype.work = function () {
    this.m_PathfilesObj = {}
    var wdir = "./";
    if (this.m_wd) wdir = this.m_wd
    DirFileUti.genJs(wdir, this.m_PathfilesObj)
    //this.str = "var idxobj = " + JSON.stringify(this.m_PathfilesObj, null, 4)
}
CurPathfiles.prototype.get_gitconfig = function (cbf) {
    this.m_gitar = []
    for (const [dir, fory] of Object.entries(this.m_PathfilesObj)) {
        if (dir.match(/[\.]git$/)) {
            this.m_gitar.push(dir)
        }
    }
    this.str = JSON.stringify(this.m_gitar, null, 4)
}
CurPathfiles.prototype.up_gitconfig = function () {
    var _this = this
    this.m_gitar.forEach(function (dir) {
        var cfg = `${dir}/config`
        console.log("cfg=", cfg)
        var txt = fs.readFileSync(cfg, "utf8")
        console.log(txt)
        var mat = txt.match(/https[\:][\/]{2}(.{0,})github[\.]com[\/]/)
        if (mat) {
            console.log(mat)
            if (mat[1].length > 0) {
                var str = `${_this.m_usrpat}@`
                var ups = mat[0].replace(mat[1], str)
                txt = txt.replace(mat[0], ups)
            }else{
                var ups = `https://${_this.m_usrpat}@github.com/`
                txt = txt.replace(mat[0], ups)
            }
        }

        console.log("after:\n", txt)
        if(_this.m_bWrite){
            fs.writeFileSync(cfg, txt, "utf8")
            console.log("confg is updated.")
        }
        else{
            console.log("*** This is a test. Please set 3rd param in cmdline to write: -w ")
        }
    })

    this.str = JSON.stringify(this.m_gitar, null, 4)
}




var cpf = new CurPathfiles()

cpf.m_wd = "../"
cpf.m_usrname =
    cpf.run()


    // wdingbox:ghp_3zy1GsE6uWXHtrQJxxKO0W1========1LeWlfa4QlX7Y
//DirFileUti.genJs_writefile();

console.log("v2021_10_25 watchDir.")

