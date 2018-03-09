$('.form').find('input, textarea').on('keyup blur focus', function(e) {

    var $this = $(this),
        label = $this.prev('label');

    if (e.type === 'keyup') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.removeClass('highlight');
        }
    } else if (e.type === 'focus') {

        if ($this.val() === '') {
            label.removeClass('highlight');
        } else if ($this.val() !== '') {
            label.addClass('highlight');
        }
    }

});

function display_logister() {
    $('.logister').addClass("show");
    $('.logister_close').addClass("show");
}

function hide_logister() {
    $('.logister').removeClass("show");
    $('.logister_close').removeClass("show");
}

function display_login() {
    $('.tab-content > div').not('#login').hide();
    $('#login').fadeIn(600);
    $('#login_link').addClass("active");
    $('#register_link').removeClass("active");
}

function display_register() {
    $('.tab-content > div').not('#signup').hide();
    $('#signup').fadeIn(600);
    $('#login_link').removeClass("active");
    $('#register_link').addClass("active");
}