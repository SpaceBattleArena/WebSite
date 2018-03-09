var display_in_admin = [
    "news-list",
    "players-list",
    "create-news"
]

function admin_sidebar() {
    $(".sidebar").toggleClass("open");
    $(".chevron").toggleClass("open");
    $("#content-admin").toggleClass("large");
    $(".table-name").toggleClass("large");
    $(".dashboard__content").toggleClass("large");
    $(".dashboard__title").toggleClass("large");
}

function expand_list(value) {
    $("." + value).toggleClass("expanded");
    $("." + value + "-chevron").toggleClass("up");
}

function display_datas(value) {
    document.getElementById('content-dashboard').style.display = "none";
    document.getElementById('content-admin').style.display = "block";
    for (i = 0; i < display_in_admin.length; i++) {
        if (display_in_admin[i] == value) {
            document.getElementsByTagName(display_in_admin[i])[0].style.display = "block";
        } else {
            document.getElementsByTagName(display_in_admin[i])[0].style.display = "none";
        }
    }
}

function display_dashboard() {
    document.getElementById('content-dashboard').style.display = "block";
    document.getElementById('content-admin').style.display = "none";
}

function displayNavAdmin() {
    $('#nav-header').css('right', "0");
    var window_x = window.innerWidth;
    var id = setInterval(frame, 0.1);
    var value = 0;

    function frame() {
        if (value == 100) {
            clearInterval(id);
            $('#sidenav-overlay').css('display', 'block');
            $('#sidenav-overlay').css('opacity', '1');
        } else {
            value++;
            $('#slide-out').css('transform', "translateX(" + (value - 100).toString() + "%)");
        }
    }
}

function hiddeNavAdmin() {
    $('#nav-header').css('right', "0");
    var window_x = window.innerWidth - 240;
    var id = setInterval(frame, 0.1);
    var value = 0;

    function frame() {
        if (value == 100) {
            clearInterval(id);
            $('#sidenav-overlay').css('display', 'none');
            $('#sidenav-overlay').css('opacity', '0');
        } else {
            value++;
            $('#slide-out').css('transform', "translateX(-" + value.toString() + "%)");
        }
    }
}

function moveLabel(id) {
    console.log(id);
    var value = 0;
    document.getElementById(id).style.color = "#0062cc";
    var idInt = setInterval(frame, 0.1);

    function frame() {
        if (value == 10) {
            clearInterval(idInt);
        } else {
            value++;
            document.getElementById(id).style.transform = "translateY(-" + (value * 3.3) + "px)";
            document.getElementById(id).style.fontSize = (17 - (value * 0.4)) + "px";
        }
    }
}