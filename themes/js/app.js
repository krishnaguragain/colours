var elemArray = [];
var activeballcounter = 0;

function draw() {
    var canvas = document.getElementById('canvasPreview');

    var context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    var startingPointX = canvas.width / 2;
    var startingPointY = canvas.height / 2;

    var n = 1;

    var angle = 0.0;

    for (var i = 0; i < 15; i++) {
        if (i == 0) {
            var k = 1;
        } else {
            var k = i * 7;
        }

        var stepsize = Math.PI * 2 / k;

        for (var j = 0; j < k; j++) {
            if (n > elemArray.length) {
                n = 1;
            }

            var angleStep = angle;

            var x = startingPointX + 12.5 * i * Math.cos(angleStep);
            var y = startingPointY + 12.5 * i * Math.sin(angleStep);

            var elem = document.getElementById(elemArray[n - 1]),
                style = elem.currentStyle || window.getComputedStyle(elem, false),
                bi = style.backgroundImage.slice(4, -1);
                bi = stripEndQuotes(bi);

            var img = new Image();
            img.src = bi;
            context.drawImage(img, x, y, 15, 15);

            n += 1

            if (j!= k - 1) {
                angle += stepsize;
            } else {
                angle = Math.PI * k * 2.1;
            }
        }
    }

    document.getElementById('colorCodes').value = elemArray.toString();

    if(document.getElementById('colorCodes').value && document.getElementById('size_input').value) {
        document.getElementById('order-button').disabled = false;
    } else {
        document.getElementById('order-button').disabled = true;
    }

    appendBalls();

    var chosenRuggitball = document.getElementsByClassName("ruggit-chosen-ball");
    for(var i=0;i<chosenRuggitball.length;i++){

        chosenRuggitball[i].addEventListener('click', removeChosen, false);
    }

}

function clear() {
    var canvas = document.getElementById('canvasPreview');

    var context = canvas.getContext('2d');

    for(var i=0;i<rugball.length;i++){
        rugball[i].className = 'rug-ball';
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    elemArray = [];

    document.getElementById('colorCodes').value = '';

    document.getElementById('colorgroup').innerHTML = '';

    if(document.getElementById('colorCodes').value && document.getElementById('size_input').value) {
        document.getElementById('order-button').disabled = false;
    } else {
        document.getElementById('order-button').disabled = true;
    }
}

var rugball = document.getElementsByClassName("rug-ball");

var appendChosen = function(ball) {
    var string = "<div class=\"ruggit-chosen-ball\" data-chosenball=\"" + i + "\" style=\"float:left;\"><p style=\"color: #666;font-size:10px;\">" + balls[i] + "</p><div class=\"rug-ball\" data-code=\"" + balls[i] + "\" id=\"" + balls[i] + "\" style=\"background-repeat: no-repeat; background-image: url('media/designer/" + balls[i] + ".png');cursor:default;\"></div></div>";
    var elem = document.getElementById('colorgroup');

    elem.innerHTML = elem.innerHTML + string;

    activeballcounter += 1;
};

var appendBalls = function() {
    var balls = elemArray;
    var elem = document.getElementById('colorgroup');

    elem.innerHTML = '';

    for(i = 0; i < balls.length; i++) {
        var string = "<div class=\"ruggit-chosen-ball\" data-ball=\"" + balls[i] + "\" data-chosenball=\"" + i + "\" style=\"float:left;\"><p style=\"color: #666;font-size:10px;\">" + balls[i] + "</p><div class=\"rug-ball\" data-code=\"" + balls[i] + "\" id=\"" + balls[i] + "\" style=\"background-repeat: no-repeat; background-image: url('media/designer/" + balls[i] + ".png');cursor:default;\"></div></div>";

        elem.innerHTML = elem.innerHTML + string;
    }
}

var removeChosen = function() {
    elemArray.splice(this.getAttribute('data-chosenball'), 1);
    console.log('test');
    if(elemArray.indexOf(this.getAttribute('data-ball')) == -1) {
        console.log('a')
        document.getElementById(this.getAttribute('data-ball')).className = 'rug-ball';
    }
    this.parentNode.removeChild(this);
    draw();
};

var ballClickHelper = function() {
    this.className = 'rug-ball selected';
    elemArray.push(this.getAttribute('data-code'));
    //appendChosen(this.getAttribute('data-code'));
    draw();
};

for(var i=0;i<rugball.length;i++){
    rugball[i].addEventListener('click', ballClickHelper, false);
}

var sizesChoose = document.getElementsByClassName('rug-size');

var sizeClickHelper = function() {
    for(var i=0; i<sizesChoose.length;i++) {
        if(sizesChoose[i].classList.contains('chosen')) {
            sizesChoose[i].className = 'rug-size';
        }
    }
    this.className = 'rug-size chosen';

    document.getElementById('size_input').value = this.getAttribute('data-id');

    if(document.getElementById('colorCodes').value && document.getElementById('size_input').value) {
        document.getElementById('order-button').disabled = false;
    } else {
        document.getElementById('order-button').disabled = true;
    }
};

for(var i=0;i<sizesChoose.length;i++){
    sizesChoose[i].addEventListener('click', sizeClickHelper, false);
}

document.getElementById('clearCanvas').addEventListener('click', clear, false);

function stripEndQuotes(s){
    var t=s.length;
    if (s.charAt(0)=='"') s=s.substring(1,t--);
    if (s.charAt(--t)=='"') s=s.substring(0,t);
    return s;
}

