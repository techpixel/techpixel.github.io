// mouse script

var pointerX = 0;
var pointerY = 0;
document.onmousemove = function(event) {
	pointerX = event.pageX;
	pointerY = event.pageY;
}

// script from https://codepen.io/Tibixx/pen/xmOaWe
// slightly edited

var canvas = document.getElementById("canvas"); //get canvas element
var ctx = canvas.getContext("2d"); //get canvas context
var bgg = document.getElementById("bg_glow"); // get bg glow effect

/*

Handle window resizing

*/

w = ctx.canvas.width = window.innerWidth;
h = ctx.canvas.height = window.innerHeight;

window.onresize = function () { // function - update bg on resize
    w = ctx.canvas.width = window.innerWidth;
    h = ctx.canvas.height = window.innerHeight;
    maxHeight = h * .9
    minHeight = h * .5;
    dots = [];
    pushDots();
    ctx.globalCompositeOperation = "lighter";
};

/*

Settings

*/

md = 80;
maxWidth = 15;
minWidth = 2;
maxHeight = h * .9
minHeight = h * .5;
maxSpeed = 35;
minSpeed = 6;
hue = Math.floor(Math.random() * 255);
hueDif = 20; // Hue +/-
glow = 10; // Set to 0 for better performance
ctx.globalCompositeOperation = "lighter";

/*

Rendering

*/

// dot functions

dots = [{}];


function pushDots(num) { // add dots 
    for (var i = 1; i < md; i++) {
        dots.push({
            x: Math.random() * w,
            y: Math.random() * h / 2 - 50,
            h: Math.random() * (maxHeight - minHeight) + minHeight,
            w: Math.random() * (maxWidth - minWidth) + minWidth,
            c: Math.random() * ((hue + hueDif) - (hue - hueDif)) + (hue - hueDif),
            m: Math.random() * (maxSpeed - minSpeed) + minSpeed
        });
    };
} 
pushDots();

// render function

function render() { // render each dot to create an effect
    ctx.clearRect(0, 0, w, h);

    for (i = 1; i < dots.length; i++) {
        ctx.beginPath(); //start line draw

        //create gradient

        grd = ctx.createLinearGradient(dots[i].x, dots[i].y, dots[i].x + dots[i].w, dots[i].y + dots[i].h);

        grd.addColorStop(.0, "hsla(" + dots[i].c + ",50%,50%,.0)"); //end
        grd.addColorStop(.2, "hsla(" + dots[i].c + 20 + ",50%,50%,.5)");
        grd.addColorStop(.5, "hsla(" + dots[i].c + 50 + ",70%,60%,.8)"); //main
        grd.addColorStop(.8, "hsla(" + dots[i].c + 80 + ",50%,50%,.5)");
        grd.addColorStop(1., "hsla(" + (dots[i].c + 100) + ",50%,50%,.0)"); //end

        ctx.fillStyle = grd; //apply gradient

        // add shadows

        ctx.shadowBlur = glow;
        ctx.shadowColor = "hsla(" + (dots[i].c) + ",50%,50%,1)";

        // apply items

        ctx.fillRect(dots[i].x, dots[i].y, dots[i].w, dots[i].h); //create rect
        ctx.closePath(); //end line draw

        dots[i].x += (dots[i].m + ((w/2)-pointerX)/5) / 100

        //replace dots moving out of view

        if (dots[i].x > w + maxWidth) {
            dots.splice(i, 1);
            dots.push({
                x: 0,
                y: Math.random() * h,
                h: Math.random() * (maxHeight - minHeight) + minHeight,
                w: Math.random() * (maxWidth - minWidth) + minWidth,
                c: Math.random() * ((hue + hueDif) - (hue - hueDif)) + (hue - hueDif),
                m: Math.random() * (maxSpeed - minSpeed) + minSpeed
            });
        } else if (dots[i].x < 0) {
            dots.splice(i, 1);
            dots.push({
                x: (w + maxWidth - 1),
                y: Math.random() * h,
                h: Math.random() * (maxHeight - minHeight) + minHeight,
                w: Math.random() * (maxWidth - minWidth) + minWidth,
                c: Math.random() * ((hue + hueDif) - (hue - hueDif)) + (hue - hueDif),
                m: Math.random() * (maxSpeed - minSpeed) + minSpeed
            });
        };
    }; 

    window.requestAnimationFrame(render); //allow movement of dots
};

bgg.style.background = "radial-gradient(ellipse at center, hsla(" + hue + ",50%,50%,.8) 0%,rgba(0,0,0,0) 100%)";

render();


