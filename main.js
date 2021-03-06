$(document).ready(function () {

    window.sizeOfSquare = 32;
    window.t = 500;
    window.canvas = document.getElementById('myCanvas');
    window.run = false;
    window.cellType = 'regular';
    window.period = 3;
    window.deathTime = 3;
    $("#status").html("Stopped!");
    window.arr = makeArr(window.canvas.height, window.canvas.width, 32);
    window.arrInit = makeArr(window.canvas.height, window.canvas.width, 32);
    window.arrStones = makeArr(window.canvas.height, window.canvas.width, 32);

    window.way = 'thor'
    prepareScene();
    drawGrid();

    $("#stop").click(function () {
        if (window.run === true) {
            $("#status").html("Stopped!");
            clearInterval(window.interval);
            window.run = false;
        }
    });

    document.getElementById('open').addEventListener('change', readSingleFile, false);

    $("#save").click(function () {
        window.open('data:text/csv;charset=utf-8,' + window.jsonFile);
    });
    
    $("#start").click(function () {
        if (window.run === false) {
            $("#status").html("Running!");
            window.interval = setInterval(draw, window.t);
            window.run = true;
            window.jsonFile = JSON.stringify(window.arr);
        }
    });
 
    $("#timeInterval").change(function (ev) {
        window.t = this.value;
    });
    
    $("#way").change(function (ev) {
        window.way = this.value;
    });

    $("#next").click(function () {
        window.interval = draw();
    });
    
    $("#cellType").change(function () {
        window.cellType = this.value;
    });
    $("#period").change(function () {
        window.period = this.value;
    });
    
    
    $("#deathTime").change(function () {
        window.deathTime = this.value;
    });
    $("#myCanvas").click(function (ev) {
        if (window.run === true) {
            return;
        }
        var canvas = window.canvas;
        var x = ev.pageX - canvas.offsetLeft;
        var y = ev.pageY - canvas.offsetTop;
        var size = window.sizeOfSquare;
        var ctx = canvas.getContext('2d');
        var xArr = (x - (x % size)) / size;
        var yArr = (y - (y % size)) / size;
        if (window.cellType === 'regular'){
            if (window.arr[yArr][xArr] === 0) {
                ctx.fillStyle = "black";
                ctx.fillRect(x - (x % size), y - (y % size), size, size);
                window.arr[yArr][xArr] = 1;
                window.arrInit[yArr][xArr] = 0;
                window.arrStones[yArr][xArr] = 0;
            } else {
                ctx.fillStyle = "white";
                ctx.fillRect(x - (x % size), y - (y % size), size, size);
                window.arr[yArr][xArr] = 0;
            }
        }else if (window.cellType === 'init'){
            if (window.arrInit[yArr][xArr] === 0) {
                ctx.fillStyle = "yellow";
                ctx.fillRect(x - (x % size), y - (y % size), size, size);
                window.arrInit[yArr][xArr] = 1;
                window.arr[yArr][xArr] = 0;
                window.arrStones[yArr][xArr] = 0;
            } else {
                ctx.fillStyle = "white";
                ctx.fillRect(x - (x % size), y - (y % size), size, size);
                window.arrInit[yArr][xArr] = 0;
            }
        }else if (window.cellType === 'stones'){
            if (window.arrStones[yArr][xArr] === 0) {
                ctx.fillStyle = "red";
                ctx.fillRect(x - (x % size), y - (y % size), size, size);
                window.arrStones[yArr][xArr] = 1;
                window.arr[yArr][xArr] = 0;
                window.arrInit[yArr][xArr] = 0;
            } else {
                ctx.fillStyle = "white";
                ctx.fillRect(x - (x % size), y - (y % size), size, size);
                window.arrStones[yArr][xArr] = 0;
            }
        }
        drawGrid();
    });
});

function readSingleFile(evt) {
    var f = evt.target.files[0];
    var size = window.sizeOfSquare;
    var canvas = window.canvas;
    var ctx = canvas.getContext('2d');
    if (f) {
        var r = new FileReader();
        r.onload = function (e) {
            window.arr = $.parseJSON(e.target.result);
            for (var i = 0; i < window.arr.length; i++) {
                for (var j = 0; j < window.arr[0].length; j++) {
                    if (window.arr[i][j] === 1) {
                        ctx.fillRect(j * size, i * size, size, size);
                        drawGrid();
                    }
                }
            }
        };
        r.readAsText(f);
    }
}

function makeArr(canvasH, canvasW, size) {
    var arr = [];
    for (var i = 0; i < canvasH / size; i++) {
        arr[i] = [];
        for (var j = 0; j < canvasW / size; j++) {
            arr[i][j] = 0;
        }
    }
    return arr;
}
function changeArrRegular(arrin, born_rule, live_rule) {
    console.log("regular");
    var s = 0;
    var left_down = 0;
    var right_down = 0;
    var right_up = 0;
    var left_up = 0;
    var up = 0;
    var left = 0;
    var right = 0;
    var down = 0;
    x = arrin.length;
    y = arrin[0].length;
    var arrout = makeArr(x, y, 1);
    for (var i = 0; i < x; i++) {
        for (var j = 0; j < y; j++) {
            s = 0;
            current = arrin[i][j]
            if (i == 0 || j == 0) {
                left_down = 0;
            } else {
                left_down = arrin[i - 1][j - 1];
            }
            if (i == 0 || j == y - 1) {
                left_up = 0;
            } else {
                left_up = arrin[i - 1][j + 1];
            }
            if (i == x - 1 || j == y - 1) {
                right_up = 0;
            } else {
                right_up = arrin[i + 1][j + 1];
            }
            if (i == x - 1 || j == 0) {
                right_down = 0;
            } else {
                right_down = arrin[i + 1][j - 1];
            }
            if (i == 0) {
                left = 0;
            } else {
                left = arrin[i - 1][j];
            }
            if (j == 0) {
                down = 0;
            } else {
                down = arrin[i][j - 1];
            }
            if (i == x - 1) {
                right = 0;
            } else {
                right = arrin[i + 1][j];
            }
            if (j == y - 1) {
                up = 0;
            } else {
                up = arrin[i][j + 1];
            }
            s += left;
            s += right;
            s += up;
            s += down;
            s += left_up;
            s += left_down;
            s += right_down;
            s += right_up;
            if (current == 0) {
                if (s <= born_rule[1] && s >= born_rule[0]) {
                    arrout[i][j] = 1;
                } else {
                    arrout[i][j] = 0;
                }
            } else {
                if (s <= live_rule[1] && s >= live_rule[0]) {
                    arrout[i][j] = 1;
                } else {
                    arrout[i][j] = 0;
                }
            }

        }
    }
    return arrout;
}

function normalize(z,l){
    if (l>=z) {
        return 0;
    } 
    if(l<0)
    {
        return z-1;
    }
    return l;
}

function changeArrThor(arrin, born_rule, live_rule,death_time,period,template,time,stones) {
    console.log("thor");
    var s = 0;
    var left_down = 0;
    var right_down = 0;
    var right_up = 0;
    var left_up = 0;
    var up = 0;
    var left = 0;
    var right = 0;
    var down = 0;
    x = arrin.length;
    y = arrin[0].length;
    var arrout = makeArr(x, y, 1);
    for (var i = 0; i < x; i++) {
        for (var j = 0; j < y; j++) {
            s = 0;
            current = arrin[i][j];
                left_down = arrin[normalize(x,i - 1)][normalize(y,j - 1)];
                if (left_down==0)
                {left_down = stones[normalize(x,i - 1)][normalize(y,j - 1)];}
            
                left_up = arrin[normalize(x,i - 1)][normalize(y,j + 1)];
            if (left_up==0)
                {left_up = stones[normalize(x,i - 1)][normalize(y,j - 1)];}
            
                right_up = arrin[normalize(x,i + 1)][normalize(y,j + 1)];
            if (right_up==0)
                {right_up = stones[normalize(x,i - 1)][normalize(y,j - 1)];}
            
                right_down = arrin[normalize(x,i + 1)][normalize(y,j - 1)];
            if (right_down==0)
                {right_down = stones[normalize(x,i - 1)][normalize(y,j - 1)];}
            
                left = arrin[normalize(x,i - 1)][j];
           
                down = arrin[i][normalize(y,j - 1)];
            
                right = arrin[normalize(x,i + 1)][j];
            
                up = arrin[i][normalize(y,j + 1)];
            /*
            s += left;
            s += right;
            s += up;
            s += down;
            s += left_up;
            s += left_down;
            s += right_down;
            s += right_up;
            */
            
            if (left==1)
            {s++;}
            if (right==1)
            {s++;}
            if (up==1)
            {s++;}
            if (down==1)
            {s++;}
            
            if (left_up==1)
            {s++;}
            if (right_up==1)
            {s++;}
            if (left_down==1)
            {s++;}
            if (right_down==1)
            {s++;}
            
            if (current == 0) {
                if (s <= born_rule[1] && s >= born_rule[0]) {
                    arrout[i][j] = 1;
                } else {
                    arrout[i][j] = 0;
                    
                    if (time%period==0)
                    {
                        if (template[i][j]==1)
                        {arrout[i][j] = 1;}
                    }
                }
            }
            else if(current<0)
            {current++;}
            else {
                if (s <= live_rule[1] && s >= live_rule[0]) {
                    arrout[i][j] = 1;
                } else {
                    arrout[i][j] = (-1)*death_time;
                }
            }
            
            //if (stones[i][j]==1)
            //{arrout[i][j] = 1;}

        }
    }
    return arrout;
}


function changeArrLent(arrin, born_rule, live_rule) {
    console.log("Lent");
    var s = 0;
    var left_down = 0;
    var right_down = 0;
    var right_up = 0;
    var left_up = 0;
    var up = 0;
    var left = 0;
    var right = 0;
    var down = 0;
    x = arrin.length;
    y = arrin[0].length;
    var arrout = makeArr(x, y, 1);
    for (var i = 0; i < x; i++) {
        for (var j = 0; j < y; j++) {
            s = 0;
            current = arrin[i][j];
                if (i == 0 ) {
                left_down = 0;
                left_up = 0;
            } else {
                left_down = arrin[normalize(x,i - 1)][normalize(y,j - 1)];
                left_up = arrin[normalize(x,i - 1)][normalize(y,j + 1)];
            }
            if (i == x - 1 ) {
                right_up = 0;
                right_down = 0;
            }  else {
                right_down = arrin[normalize(x,i + 1)][normalize(y,j - 1)];
                right_up = arrin[normalize(x,i + 1)][normalize(y,j + 1)];
            }
            
                if (i == 0) {
                left = 0;
                } else {
                left = arrin[normalize(x,i - 1)][j];
                }
           
                down = arrin[i][normalize(y,j - 1)];
            
                if (i == x - 1) {
                right = 0;
                } else {
                right = arrin[normalize(x,i + 1)][j];
                }
            
                up = arrin[i][normalize(y,j + 1)];
            
            s += left;
            s += right;
            s += up;
            s += down;
            s += left_up;
            s += left_down;
            s += right_down;
            s += right_up;
            if (current == 0) {
                if (s <= born_rule[1] && s >= born_rule[0]) {
                    arrout[i][j] = 1;
                } else {
                    arrout[i][j] = 0;
                }
            } else {
                if (s <= live_rule[1] && s >= live_rule[0]) {
                    arrout[i][j] = 1;
                } else {
                    arrout[i][j] = 0;
                }
            }

        }
    }
    return arrout;
}


function normalize(z,l){
    if (l>=z) {
        return 0;
    } 
    if(l<0){
        return z-1;
    }
    return l;
}

function copyArr(arrA, arrB) {
    for (var i = 0; i < arrA.length; i++) {
        for (var j = 0; i < arrA[i].length; j++) {
            arrA[i][j] = arrB[i][j];
        }
    }
}

function randomInitArr(n, m) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        arr[i] = [];
        for (var j = 0; j < m; j++) {
            if (Math.floor(Math.random() * 100) === 0) {
                arr[i][j] = true;
            } else {
                arr[i][j] = false;
            }
        }
    }
    return arr;
}

function prepareScene() {
    drawGrid();
    var image = new Image();
    image.src = window.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    window.canvasBg = image;
}

function drawGrid() {
    var size = window.sizeOfSquare;
    var canvas = window.canvas;
    var ctx = canvas.getContext('2d');
    for (var i = 0; i < canvas.width; i += size) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.strokeStyle = 'green';
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
        ctx.closePath();
    }
}

function draw() {
    var size = window.sizeOfSquare;
    var canvas = window.canvas;
    var ctx = canvas.getContext('2d');
    window.time = 0
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(window.canvasBg, 0, 0);

    if (window.way === 'regular'){
        window.arr = changeArrRegular(window.arr, [3, 3], [2, 3]);
    }else if(window.way === 'thor'){
        window.arr = changeArrThor(window.arr, [1, 3], [2, 4],window.deathTime,window.period,window.arrInit,time,arrStones);
        //(arrin, born_rule, live_rule,death_time,period,template,time,stones)
        window.time++;
    }else if(window.way === 'lent'){
        window.arr = changeArrLent(window.arr, [3, 3], [2, 3]);
    }
    var tidy = true;
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === 1) {
                tidy = false;
                ctx.fillStyle = "black";
                ctx.fillRect(j * size, i * size, size, size);
            }
            if (window.arrInit[i][j] === 1) {
                tidy = false;
                ctx.fillStyle = "yellow";
                ctx.fillRect(j * size, i * size, size, size);
            }
            if (window.arrStones[i][j] === 1) {
                tidy = false;
                ctx.fillStyle = "red";
                ctx.fillRect(j * size, i * size, size, size);
            }
            drawGrid();
        }
    }
    if (tidy == true) {
        $("#stop").click();
    }
}