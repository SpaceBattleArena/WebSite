function display_games() {
    $("#games-hystory").addClass("show");
    $("#cards-list").removeClass("show");
    $("#skins-list").removeClass("show");
    $("#decks-list").removeClass("show");
}

function display_cards() {
    $("#games-hystory").removeClass("show");
    $("#cards-list").addClass("show");
    $("#skins-list").removeClass("show");
    $("#decks-list").removeClass("show");
}

function display_items() {
    $("#games-hystory").removeClass("show");
    $("#cards-list").removeClass("show");
    $("#skins-list").addClass("show");
    $("#decks-list").removeClass("show");
}

function display_decks() {
    $("#games-hystory").removeClass("show");
    $("#cards-list").removeClass("show");
    $("#skins-list").removeClass("show");
    $("#decks-list").addClass("show");
}