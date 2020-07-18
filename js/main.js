// //*****************loading******************//
loadprogress = function() {
    var div = $("div");
    div.each(function(i, dives) {
        $(".loader .text").html(" " + parseInt((i + 1) / div.length * 100) + "%");
        // Loading...
        // ---00%---

        div[i].onload = function() {
            // console.log("done");

            div[i].onload = null;
            if (div.length >= (i + 2)) {
                $("#loading").fadeOut();
            }

        };
        div[i].onload(dives);
    });
}
window.onload = function() {
    add_js_css(); //ship.js
    loadprogress();
    clearCanvas(); //skip.js
    pixel_draw(); //pixel.js
}