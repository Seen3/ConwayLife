function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}
let fps=30;
let grid;
let cols;
let rows;
let resolution = 10;

function setup() {
    createCanvas(windowWidth-2,windowHeight-4);
    frameRate(fps);
    cols = floor(width / resolution);
    rows = floor(height / resolution);
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
}
function count_neigh(grid, x, y) {
    let S = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let C = (x + i+cols) % cols;
            let R = (y + j+rows) % rows;
            S += grid[C][R];
        }
    }
    S -= grid[x][y];
    return S;
}
function draw() {
    background(0);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] == 1) {
                let r=map(j,0,rows,0,255);
                let g=map(random(1)?i:j,0,random(1)?rows:cols,255,0);
                let b=map(i,0,cols,0,255);
                fill(r,g,b);
                stroke(0);
                ellipse(x, y, resolution - 1, resolution - 1);
            }

        }
    }
    let next = make2DArray(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j];

            let neighbors = count_neigh(grid, i, j);

            if (state == 0 && neighbors == 3) {
                next[i][j] = 1;
            }
            else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                next[i][j] = 0;
            }
            else {
                next[i][j] = state;
            }


        }
    }
    grid = next;
}

function mousePressed()
{
    for(let i=0;i<5;i++)
    {
        grid[floor(random(rows))][floor(random(cols))]=1
    }
}