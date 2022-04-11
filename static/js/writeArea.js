var canvas = $('canvas');
var context = canvas[0].getContext('2d');
var imageObj = new Image();

imageObj.onload = function () {
    $(canvas).attr({
        width: 920,
        height: 540
    });
    context.drawImage(imageObj, 0, 0, 920, 540);
};

imageObj.src = 'human_counter_video_feed';

var clicks = [];

function drawPolygon() {
    context.fillStyle = 'rgba(100,100,100,0.5)';
    context.strokeStyle = '#df4b26';
    context.lineWidth = 1;

    context.beginPath();
    if (clicks.length > 0) {
        context.moveTo(clicks[0].x, clicks[0].y);
    }
    for (var i = 1; i < clicks.length; i++) {
        context.lineTo(clicks[i].x, clicks[i].y);
    }
    context.closePath();
    context.fill();
    context.stroke();
}

function drawPoints() {
    context.strokeStyle = '#df4b26';
    context.lineJoin = 'round';
    context.lineWidth = 5;

    for (var i = 0; i < clicks.length; i++) {
        context.beginPath();
        context.arc(clicks[i].x, clicks[i].y, 3, 0, 2 * Math.PI, false);
        context.fillStyle = '#ffffff';
        context.fill();
        context.lineWidth = 5;
        context.stroke();
    }
}

function redraw() {
    canvas.width = canvas.width; // Clears the canvas
    context.drawImage(imageObj, 0, 0, 920, 540);
    drawPolygon();
    drawPoints();
}

canvas.mouseup(function (e) {
    clicks.push({
        x: e.offsetX,
        y: e.offsetY
    });
    console.log(clicks);
    redraw();
});

function converClicks2Polygon(clicks) {
    let polygon = {};
    for (let i = 0; i < clicks.length; i++) {
        let point = clicks[i];
        polygon[`x${i + 1}`] = point.x;
        polygon[`y${i + 1}`] = point.y;
    }
    polygon = JSON.stringify(polygon);
    return polygon;
}

function resetTheArea() {
    clicks = [];
    redraw();
}

async function saveTheArea() {
    console.log('HiHi, Save the Area');
    console.log(clicks);
    let polygon = converClicks2Polygon(clicks);
    console.log(polygon);
    await updateArea(polygon);
    $.get('/area/update', {}).done(function (data) {
        if (data == 'Success') {
            setInterval(() => {
                document.location.href = '/';
            }, 1000);
        }
    }, 'text');
}
