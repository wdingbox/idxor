//for local users only.
function init_localhost_anchor() {
    if (!localStorage.localhostbase) {
        localStorage.localhostbase = /weidroot/;//"/weidroot/";
    }
    var curUrl = "" + window.location.href;
    var posi = curUrl.indexOf(localStorage.localhostbase);
    var localhost = "http://localhost/" + curUrl.substr(posi);
    $("#panel").prepend(`<input value='${localStorage.localhostbase}'></input><a onclick="localStorage.localhostbase=$(this).prev().val();">*</a><a href='${localhost}'>${localhost}</a><br>`);
};///////////////
function gen_table_indobj() {
    var trs = ""
    var idx = 0, totsize = 0, totfiles = 0

    Object.keys(idxobj).forEach(function (path) {
        var ar = idxobj[path]
        ar.forEach(function (ob) {
            for (const [f, s] of Object.entries(ob)) {
                totsize += s
                totfiles++
                var mat = f.match(/[\.](\w+)$/)
                var ext = ""
                if (mat) {
                    ext = mat[1]
                }
                var str = f
                //if (IMGFS.indexOf(ext) >= 0) {
                //str = `<img src='${path}/${f}'/>`
                //}
                trs += `<tr><td>${idx++}</td><td title=''><a href='${path}/${f}'>${str}</a></td><td>${ext}</td><td>${s}</td><td>${path}</td></tr>`
            }
        })
    })
    $("#totinfo").html(`totfiles:${totfiles}, totsize:${totsize}`)
    var tbs = `<table border=1><thead><tr><th>#</th><th>fname</th><th>ext</th><th>size</th><th>path</th></tr></thead>${trs}`
    $("#explorePanel").html(tbs).find("td").on("click", function () {
        $(this).toggleClass("hili")
    })
    table_sort()
}
function get_ext_of(fname) {
    var mat = fname.match(/[\.](\w+)$/)
    var ext = ""
    if (mat) {
        ext = mat[1].toLowerCase()
    }
    const IMGFS = ["jpg", "png", "jpeg", "gif", "tiff", "psd", "raw", "bmp", "heif", "indd", "jpeg 2000"]
    var typ = ""
    if (IMGFS.indexOf(ext) >= 0) {
        typ = 'img'
    }
    return { ext: ext, type: typ }
}
function gen_img_indobj() {
    var tbs = ""

    var idx = 0, totsize = 0, totfiles = 0
    Object.keys(idxobj).forEach(function (path) {
        var ar = idxobj[path]
        ar.forEach(function (ob) {
            for (const [f, s] of Object.entries(ob)) {
                var ext = get_ext_of(f)
                var str = f
                if (ext.type === "img") {
                    totfiles++
                    str = `<img src='${path}/${f}'/>`
                    tbs += `<div class='pic'><a href='${path}/${f}'>${str}</a><br>${f}</div>`
                }
            }
        })
    })
    $("#totinfo").html(`totImgsfiles:${totfiles}`)
    $("#explorePanel").html(tbs)
}
function gen_tree_indobj() {
    var nodes = Object.keys(idxobj)
    var tree = ""
    function get_divnode(path, clsname, fnum) {
        return `<div class='treenode ${clsname}' path='${path}'><a class='dary' path='${path}'>${path}</a> <a class='fary'>[f:${fnum}]</a></div><ol class='clapse'></ol><ol class='clapse'></ol>`
    }
    for (const [path, oar] of Object.entries(idxobj)) {
        var cls = ''
        if (path.indexOf("/") > 1) {
            cls = "calpseNode"
        }
        tree += get_divnode(path, cls, oar.length)
    }
    $("#explorePanel").html(tree).find(".fary").on("click", function () {
        $(this).parent().next().next().slideToggle()
        var path = $(this).parent().attr("path")
        var fnum = $(this).attr("fnum")
        if (fnum && fnum >= 0) return
        var fnum = $(this).attr("fnum", idxobj[path].length)
        var lis = ""
        idxobj[path].forEach(function (fobj) {
            for (const [fname, size] of Object.entries(fobj)) {
                lis += `<li><a href='${path}/${fname}'>${fname} </a> (${size})</li>`
            }
        })
        $(this).parent().next().next().html(lis).find("li").on("click", function () {
            $(this).toggleClass("hili")
        })
    })
    $("#explorePanel").find(".dary").on("click", function () {
        var obj = {}
        $(this).toggleClass("togleNode")
        $(".childrennodes").removeClass("childrennodes")
        var mypath = $(this).text() + "/"
        $(`.dary[path]`).each(function () {
            var spath = $(this).text()
            if (spath.indexOf(mypath) === 0) {
                var nxth = spath.replace(mypath, "")
                if (nxth.indexOf("/") < 0) {
                    $(this).parent().slideToggle()
                    $(this).addClass("childrennodes")
                }
            }
        })
    })
    $("#explorePanel").find(".treenode").on("click", function () {
        $(".hiliNode").removeClass("hiliNode")
        $(this).addClass("hiliNode")
    })
}



$(function () {
    init_localhost_anchor();

   


    $("#paneltoggler").click(function () {
        $("#panel").toggle();
    });

    $(".base").click(function () {
        var base = $(this).text();
        var sdir = $(this).prev().text();
        $(this).attr("href", sdir + base);
    })

    $(".dir").click(function () {
        var spath = $(this).find("a:eq(0)").attr("path");
        $("#hilipathfile").val(spath);
    });
    $(".dirNode").click(function () {
        $(this).parent().next().toggleClass("collapse");
        $(this).toggleClass("pathdir_expand");
        var totDir = $(this).parent().next().find("ol").length;
        var totFile = $(this).parent().next().find("li").length;
        var totSize = 0;
        $(this).parent().next().find(".fsize").each(function () {
            totSize += parseInt($(this).text());
        })
        $(this).parent().find(".totInfo").text(" dir:" + totDir.toLocaleString() + ", file:" + totFile.toLocaleString() + ", size:" + totSize.toLocaleString());
    })
    $(".NumFiles").click(function () {
        $(this).parent().next().children("li").toggleClass("collapse");
        $(this).toggleClass("RemeberClosed");
    });
    $(".NumDirs").click(function () {
        $(this).parent().next().children("span").toggleClass("collapse");
        $(this).toggleClass("RemeberClosed");
    });
    $(".file").click(function () {
        $(".file_open_Mark").removeClass("file_open_Mark");
        $(this).addClass("file_open_Mark");
    })
    $(".lifile").click(function () {
        $(this).toggleClass("toggleMarkFile");
    })

    $(".idx").click(function () {
        $(this).toggleClass("hili");
        var sdir0 = $(this).next().text();
        $(".dir").not(".hili").each(function (i) {
            if (0 === i) return;
            var sdir = $(this).text();
            if (sdir0 === sdir) {
                $(this).parent().toggleClass("HideItm");
            }
        })
    });
});

