TweenLite.lagSmoothing(100, 10);

var landAnimation = new TimelineLite();
landAnimation.progress(1).progress(0);
var navAnimation = new TimelineLite();
navAnimation.progress(1).progress(0);
var closeAnimation = new TimelineLite();
closeAnimation.progress(1).progress(0);
var pageAnimation = new TimelineLite();
pageAnimation.progress(1).progress(0);

var growCurve = BezierEasing(0.4, 0.0, 0.2, 1);
var easeIn = BezierEasing(0.0, 0.0, 0.2, 1);
var easeOut = BezierEasing(0.4, 0.0, 1, 1);

var descList = [
    "INNOVATING", "LEADING", "DEVELOPING", "LEARNING", "SIMPLIFYING",
    "BEING COMPETITIVE", "DESIGNING", "GAMING", "TECHNOLOGY", "OPEN SOURCE",
    "HAVING FUN", "CODE", "ESPORTS", "NETWORKING"
];

var container = $(".content-container");

function typeAnimate() {
    landAnimation.to("#i-am", 0.4, {
        scaleX: 1,
        scaleY: 1,
        ease: new Ease(growCurve),
        onComplete: function() {
            $(".adj-list").typed({
                strings: descList,
                showCursor: false,
                typeSpeed: 65,
                startDelay: 300,
                backDelay: 2500,
                loop: true
            });
        }
    });
}

function loadAnimation() {
    landAnimation.to("#logo", 0.8, {
        opacity: 0,
        ease: new Ease(growCurve)
    }, "+=0.75")

    .to(".bg-layer", 0.8, {
        css: {
            border: "0.75em solid white"
        },
        ease: new Ease(growCurve)
    })

    .to(".text-logo", 0.5, {
        scaleX: 1,
        scaleY: 1,
        ease: new Ease(growCurve)
    }, "+=0.25");

    if (!jQuery.browser.mobile) {
        landAnimation.to("#page-bar", 0.5, {
            css: {
                top: "89%",
                autoRound: false
            },
            ease: new Ease(easeIn),
            force3D: true
        }, "-=0.5");
    }

    typeAnimate();
}

function buttonDelay(button, page) {
    if ($("#page-bar div").hasClass("button-clicked z-depth-1")) {
        $("#page-bar div").removeClass("button-clicked z-depth-1");
        $(button).toggleClass("button-clicked z-depth-1");
    } else {
        $(button).addClass("button-clicked z-depth-1");
    }

    $("#stage").html($(page).html());

    if (page == "#my-work") {
        $("#stage").addClass("no-overflow");
        $("#stage").addClass("width-fix");
        $("#stage .container").addClass("width-fix-contain");
    } else {
        $("#stage").removeClass("no-overflow");
        $("#stage").removeClass("width-fix");
        $("#stage .container").removeClass("width-fix-contain");
    }
    if (page == "#contact-me")
        $("#stage").addClass("no-overflow");

    if (!container.hasClass("active")) {
        navAnimation.to(".content-container", 0.3, {
            yPercent: -120,
            z: 0.01,
            rotationZ: 0.01,
            force3D: true,
            ease: new Ease(easeOut),
            onComplete: function() {
                container.addClass("active");
            }
        });
    }
}

function closeViewOn() {
    closeAnimation.to(".close", 0.2, {
        yPercent: -150,
        rotationZ: 0.1,
        force3D: true,
        ease: new Ease(easeOut)
    });
}

function closeViewOff() {
    closeAnimation.to(".close", 0.1, {
        yPercent: 0,
        rotationZ: 0.1,
        force3D: true,
        ease: new Ease(easeIn),
        onComplete: function() {
            closeAnimation.clear();
        }
    });
}

function closePanel() {
    $("#page-bar div").removeClass("button-clicked z-depth-1");
    navAnimation.to(".content-container", 0.5, {
        xPercent: 150,
        rotationZ: 0.01,
        force3D: true,
        ease: new Ease(easeIn),
        onComplete: function() {
            container.removeClass("active");
        }
    })

    .to(".content-container", 0.01, {
        yPercent: 100
    })

    .to(".content-container", 0.01, {
        xPercent: 0,
        onComplete: function() {
            navAnimation.clear();
        }
    });
}

function clickDelay(URL) {
    setTimeout(function() {
        $("<a>").attr("href", URL).attr("target", "_blank")[0].click();
    }, 350);
}

$(document).ready(function() {
    loadAnimation();

    var browserWidth = 0;
    $(window).on("load", function() {
        browserWidth = $(window).width();
    });

    $(window).on("resize", function(e) {
        if ($(window).width() != browserWidth) {
            if (window.RT)
                clearTimeout(window.RT);
            window.RT = setTimeout(function() {
                this.location.reload(false);
            }, 100);
        }
    });

    $(".card-panel").mouseenter(function() {
            closeViewOn();
        })
        .mouseleave(function() {
            closeViewOff();
        });

    $(document).mouseup(function(e) {
        var pageButton = $(".page-button");
        $(".close").on("click", function() {
            setTimeout(closePanel, 365);
        });

        if ((!container.is(e.target) && container.has(e.target).length === 0) && (!pageButton.is(e.target) &&
                pageButton.has(e.target).length === 0) && (container.hasClass("active"))) {
            closePanel();
        }
    });
});