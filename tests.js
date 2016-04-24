/**
 * Test code for the PathFollower class.
 */


var canvas = document.getElementById("pathFollowerCanvas");
var ctx = canvas.getContext("2d");

var myPath = new Path();
myPath.arc(150, 100, 50, 0, Math.PI/2, false);
myPath.lineTo(100, 150);
myPath.arc(100, 100, 50, Math.PI/2, 3*Math.PI/2, false);

var myFollower = new PathFollower(myPath);
//run();

function run() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    myPath.draw(ctx);
    myFollower.advance(5);
    var info = myFollower.getInfo();
    ctx.save();
    ctx.moveTo(info.x, info.y);
    ctx.rotate(info.angle);
    ctx.beginPath();
    ctx.rect(info.x-10, info.y-5, 20, 10);
    ctx.stroke();
    ctx.restore();
    //requestAnimationFrame(run);
}

//setInterval(run, 16);
run();
//run();