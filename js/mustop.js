// **************music***setting***********//
function mstop() {
    // body...
    // document.getElementById("music").onclick = function() { mstart(); };
    document.getElementById("music").onclick = mstart;

    var ad = document.getElementById("adplay");
    ad.pause();
    // console.log("mstop");
    $("#music span:first-child").css("height", "2")
}

function mstart() {
    document.getElementById("music").onclick = mstop;

    var ad = document.getElementById("adplay");
    ad.play();
    // console.log("mstarp");
    $("#music span:first-child").css("height", "10")

}