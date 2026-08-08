// object Point (color is a string)
function Point(x, y, color) {
    this.position = new Vector2d(x, y);
    this.color = color;
}

// object Vector2d
function Vector2d(x, y) {
    this.x = x;
    this.y = y;
}

function main() {
    const canvas = document.getElementById("world");
    const points = [];
    points.push(makeRandomPoint(canvas.width, canvas.height));
    render(canvas, points);
    canvas.addEventListener("click", function() {
        points.push(makeRandomPoint(canvas.width, canvas.height));
        render(canvas, points);
    })
}

// returns int
function getRandomNum(max) {
    return Math.floor(Math.random() * max);
}

// returns string
function getRandomColor() {
    let color = ""
    for (i = 0; i < 6; i++) {
        const nextNum = getRandomNum(16);
        let nextChar;
        switch (nextNum) {
            case 10:
                nextChar = "a";
                break;
            case 11:
                nextChar = "b";
                break;
            case 12:
                nextChar = "c";
                break;
            case 13:
                nextChar = "d";
                break;
            case 14:
                nextChar = "e";
                break;
            case 15:
                nextChar = "f";
                break;
            default:
                nextChar = String(nextNum);
        }
        color += nextChar;
    }
    return color;
}

// returns Point (maxX and maxY are exclusive)
function makeRandomPoint(maxX, maxY) {
    const x = getRandomNum(maxX);
    const y = getRandomNum(maxY);
    const color = getRandomColor();
    return new Point(x, y, color);
}

function render(canvas, points) {
    // for every pixel (this is O(whp) time complexity, with w
    // being width, h being height, and p being the number of points)
    const ctx = canvas.getContext("2d");
    for (x = 0; x < canvas.width; x++) {
        for (y = 0; y < canvas.height; y++) {
            // find the closest point
            let closestPoint = points[0];
            for (i = 1; i < points.length; i++) {
                if (findDistance(x, y, points[i].position.x, points[i].position.y) < 
                findDistance(x, y, closestPoint.position.x, closestPoint.position.y)) {
                    closestPoint = points[i];
                }
            }
            ctx.fillStyle = "#" + closestPoint.color;
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

function findDistance(x1, y1, x2, y2) {
    return Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2))
}


main();