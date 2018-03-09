function vr_click() {
    $('#vr').addClass("w--tab-active");
    $('#card').removeClass("w--tab-active");
    $('#e-sport').removeClass("w--tab-active");
    $('#war').removeClass("w--tab-active");
    $('#vr_link').addClass("w--current");
    $('#card_link').removeClass("w--current");
    $('#esport_link').removeClass("w--current");
    $('#war_link').removeClass("w--current");
}

function card_click() {
    $('#vr').removeClass("w--tab-active");
    $('#card').addClass("w--tab-active");
    $('#e-sport').removeClass("w--tab-active");
    $('#war').removeClass("w--tab-active");
    $('#vr_link').removeClass("w--current");
    $('#card_link').addClass("w--current");
    $('#esport_link').removeClass("w--current");
    $('#war_link').removeClass("w--current");
}

function war_click() {
    $('#vr').removeClass("w--tab-active");
    $('#card').removeClass("w--tab-active");
    $('#e-sport').removeClass("w--tab-active");
    $('#war').addClass("w--tab-active");
    $('#vr_link').removeClass("w--current");
    $('#card_link').removeClass("w--current");
    $('#esport_link').removeClass("w--current");
    $('#war_link').addClass("w--current");
}

function esport_click() {
    $('#vr').removeClass("w--tab-active");
    $('#card').removeClass("w--tab-active");
    $('#e-sport').addClass("w--tab-active");
    $('#war').removeClass("w--tab-active");
    $('#vr_link').removeClass("w--current");
    $('#card_link').removeClass("w--current");
    $('#esport_link').addClass("w--current");
    $('#war_link').removeClass("w--current");
}