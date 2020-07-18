// function skip(target) {
//     clearCanvas();


// }

function skip_home() {
    clearCanvas();
    $.getScript('http://innofashion.github.io');
}

function clearCanvas() {
    if (stop) {
        window.cancelAnimationFrame(stop); //可以取消该次动画。

    }
    $("#main_div").empty();
    $("#main_div").append('<canvas id="main_page"></canvas>');
}

function add_js_css() {}