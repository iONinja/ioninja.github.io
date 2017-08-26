var board = document.getElementById ("board");
var hands = document.getElementsByClassName ("hand");
var myHand = document.getElementById ("my-hand");
var deck = document.getElementById ("deck");

var scale = 1;
var zIndexHighest = 1;

var resize = function () {
    board.style.transform = "translate(-50%,-50%) scale(1)";
    scale = (window.innerHeight - 170) / board.offsetHeight;
    board.style.transform = "translate(-50%,-50%) scale(" + scale + ")";
    for (var i = 0; i < hands.length; i++) {
        hands[i].style.transform = "translate(-50%,50%) scale(" + scale + ")";
    }
    // deck.style.transform = "scale(" + scale + ")";
}
window.onresize = resize;
resize ();

window.onload = function () {
    document.getElementsByTagName("body")[0].style.opacity = "1";
}

myHand.onmouseenter = function () {
    myHand.style.transform = "translate(-50%,-50%) scale(" + (scale * 1.6) + ")";
}

myHand.onmouseleave = function () {
    myHand.style.transform = "translate(-50%,50%) scale(" + scale + ")";
}

for (var i = 0; i < hands.length; i++) {
    for (var j = 0; j < hands[i].childNodes.length; j++) {
        hands[i].childNodes[j].onmouseenter = function (e) {
            e.target.style["z-index"] = ++zIndexHighest;
            e.target.style.transform = "scale(1.5)";
        }
        hands[i].childNodes[j].onmouseleave = function (e) {
            e.target.style.transform = "scale(1)";
        }
    }
}
