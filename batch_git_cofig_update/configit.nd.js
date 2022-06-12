// Version 2021-10-19
//

//var Uti = require("../Uti.Module").Uti
const fs = require('fs');
var path = require('path');
const net = require('net');


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

    recursive_walk: function (srcPath, output) {
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
            this.recursive_walk(path.join(srcPath, spath), output);
        }
    }
}


//////////////////////////
//////////////////////////
function CurPathfiles() {

}
CurPathfiles.prototype.run = function () {
    if (false === this.take_argv()) return
    this.walk()
    this.get_gitconfig()
    this.up_gitconfig()
    console.log("\n\n\n\n")
}
CurPathfiles.prototype.take_argv = function () {
    this.m_argv = process.argv.slice(2);
    if (this.m_argv.length < 2) {
        console.log("missing params: [dir] [usrname:pat] [-w:write config]")
        return false
    }
    if (this.m_argv.length === 2) {
        console.log("This is trial test. To change config, please type cmd [pat] [-w]")
    }
    if (this.m_argv.length === 3 && '-w' === this.m_argv[2]) {
        console.log("config will changed.")
        this.m_bWrite = true
    }
    this.m_wd = this.m_argv[0]
    this.m_usrpat = this.m_argv[1]

    return true
}
CurPathfiles.prototype.walk = function () {
    this.m_PathfilesObj = {}
    var wdir = "./";
    if (this.m_wd) wdir = this.m_wd
    DirFileUti.recursive_walk(wdir, this.m_PathfilesObj)
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
        console.log("\n\n\n----------------", "\npat:", _this.m_usrpat, "\n -w:", _this.m_bWrite, "\ncfg=", cfg,  )
        var txt = fs.readFileSync(cfg, "utf8")
        console.log("Before changes:")
        console.log(txt)
        var mat = txt.match(/https[\:][\/]{2}(.{0,})github[\.]com[\/]/)
        if (mat) {
            console.log(mat)
            if (mat[1].length > 0) {
                var str = `${_this.m_usrpat}@`
                var ups = mat[0].replace(mat[1], str)
                txt = txt.replace(mat[0], ups)
            } else {
                var ups = `https://${_this.m_usrpat}@github.com/`
                txt = txt.replace(mat[0], ups)
            }
        }

        console.log("After changes:\n", txt)
        if (_this.m_bWrite) {
            fs.writeFileSync(cfg, txt, "utf8")
            console.log("confg is updated.", cfg)
        }
        else {
            console.log("*** This is a test. Please set 3rd param in cmdline to write: -w ")
        }
    })

    var str = JSON.stringify(this.m_gitar, null, 4)
    console.log("\n\n\n updated config files:\n", str)
}




var cpf = new CurPathfiles()
cpf.run()


// wdingbox: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
//DirFileUti.genJs_writefile();

console.log("v2021_11_12.")

