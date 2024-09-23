/* classes */
// Vector class
class Vector {
    constructor(x, y, z) {
        this.set(x, y, z);
    } // end constructor

    // sets the components of a vector
    set(x, y, z) {
        try {
            if ((typeof (x) !== "number") || (typeof (y) !== "number") || (typeof (z) !== "number"))
                throw "vector component not a number";
            else
                this.x = x; this.y = y; this.z = z;
        } // end try

        catch (e) {
            console.log(e);
        }
    } // end vector set

    // copy the passed vector into this one
    copy(v) {
        try {
            if (!(v instanceof Vector))
                throw "Vector.copy: non-vector parameter";
            else
                this.x = v.x; this.y = v.y; this.z = v.z;
        } // end try

        catch (e) {
            console.log(e);
        }
    }

    static toThePower(v1, c) {
        try {
            if (!(v1 instanceof Vector))
                throw "Vector.toThePower: non-vector parameter";
            else {
                const newX = Math.pow(v1.x, c);
                const newY = Math.pow(v1.y, c);
                const newZ = Math.pow(v1.z, c);
                return new Vector(newX, newY, newZ);
            }
        } catch (e) {
            console.log(e);
            return new Vector(NaN, NaN, NaN);
        }
    }

    static magnitude(v1) {
        try {
            if (!(v1 instanceof Vector))
                throw "Vector.magnitude: non-vector parameter";
            else {
                return Math.sqrt(Math.pow(v1.x, 2) + Math.pow(v1.y, 2) + Math.pow(v1.z, 2));
            }
        } catch (e) {
            console.log(e);
            return 0;
        }
    }

    // Divide this vector by another vector to return a vector
    static divide(v1, v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.divide: non-vector parameter";
            else {
                if (v2.x !== 0 && v2.y !== 0 && v2.z !== 0) {
                    const newX = v1.x / v2.x;
                    const newY = v1.y / v2.y;
                    const newZ = v1.z / v2.z;
                    return new Vector(newX, newY, newZ);
                } else {
                    throw "Vector.divide: Cannot divide by a vector with zero components.";
                }
            }
        } catch (e) {
            console.log(e);
            return new Vector(NaN, NaN, NaN);
        }
    }

    // multiply this vector by another vector to return a vector
    static multiply(v1, v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.multiply: non-vector parameter";
            else {
                const newX = v1.x * v2.x;
                const newY = v1.y * v2.y;
                const newZ = v1.z * v2.z;
                return new Vector(newX, newY, newZ);
            }
        } catch (e) {
            console.log(e);
            return new Vector(NaN, NaN, NaN);
        }
    }

    toConsole(prefix = "") {
        console.log(prefix + "[" + this.x + "," + this.y + "," + this.z + "]");
    } // end to console

    // static dot method
    static dot(v1, v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.dot: non-vector parameter";
            else
                return (v1.x * v2.x + v1.y * v2.y + v1.z * v2.z);
        } // end try

        catch (e) {
            console.log(e);
            return (NaN);
        }
    } // end dot static method

    // static cross method
    static cross(v1, v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.cross: non-vector parameter";
            else {
                var crossX = v1.y * v2.z - v1.z * v2.y;
                var crossY = v1.z * v2.x - v1.x * v2.z;
                var crossZ = v1.x * v2.y - v1.y * v2.x;
                return (new Vector(crossX, crossY, crossZ));
            } // endif vector params
        } // end try

        catch (e) {
            console.log(e);
            return (NaN);
        }
    } // end dot static method

    // static add method
    static add(v1, v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.add: non-vector parameter";
            else
                return (new Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z));
        } // end try

        catch (e) {
            console.log(e);
            return (new Vector(NaN, NaN, NaN));
        }
    } // end add static method

    // static absolute add method || v1 + v2 ||
    static absoluteAdd(v1, v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.add: non-vector parameter";
            else
                return (new Vector(Math.abs(v1.x + v2.x), Math.abs(v1.y + v2.y), Math.abs(v1.z + v2.z)));
        } // end try

        catch (e) {
            console.log(e);
            return (new Vector(NaN, NaN, NaN));
        }
    } // end add static method

    // static subtract method, v1-v2
    static subtract(v1, v2) {
        try {
            if (!(v1 instanceof Vector) || !(v2 instanceof Vector))
                throw "Vector.subtract: non-vector parameter";
            else {
                var v = new Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
                return (v);
            }
        } // end try

        catch (e) {
            console.log(e);
            return (new Vector(NaN, NaN, NaN));
        }
    } // end subtract static method

    // static scale method
    static scale(c, v) {
        try {
            if (!(typeof (c) === "number") || !(v instanceof Vector))
                throw "Vector.scale: malformed parameter";
            else
                return (new Vector(c * v.x, c * v.y, c * v.z));
        } // end try

        catch (e) {
            console.log(e);
            return (new Vector(NaN, NaN, NaN));
        }
    } // end scale static method

    // static clamp  method
    static clamp(v, min, max) {
        try {
            if (!(typeof (min) === "number") || !(typeof (max) === "number") || !(v instanceof Vector))
                throw "Vector.scale: malformed parameter";
            else
                var clampedX = Math.max(min, Math.min(max, v.x));
            var clampedY = Math.max(min, Math.min(max, v.y));
            var clampedZ = Math.max(min, Math.min(max, v.z));

            return new Vector(clampedX, clampedY, clampedZ);
        } // end try

        catch (e) {
            console.log(e);
            return (new Vector(NaN, NaN, NaN));
        }
    } // end clamp static method

    // static normalize method
    static normalize(v) {
        try {
            if (!(v instanceof Vector))
                throw "Vector.normalize: parameter not a vector";
            else {
                var lenDenom = 1 / Math.sqrt(Vector.dot(v, v));
                return (Vector.scale(lenDenom, v));
            }
        } // end try

        catch (e) {
            console.log(e);
            return (new Vector(NaN, NaN, NaN));
        }
    } // end scale static method

} // end Vector class


// Color constructor
class Color {
    constructor(r, g, b, a) {
        try {
            if ((typeof (r) !== "number") || (typeof (g) !== "number") || (typeof (b) !== "number") || (typeof (a) !== "number"))
                throw "color component not a number";
            else if ((r < 0) || (g < 0) || (b < 0) || (a < 0))
                throw "color component less than 0";
            else if ((r > 255) || (g > 255) || (b > 255) || (a > 255))
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a;
            }
        } // end try

        catch (e) {
            console.log(e);
        }
    } // end Color constructor

    // Color change method
    change(r, g, b, a) {
        try {
            if ((typeof (r) !== "number") || (typeof (g) !== "number") || (typeof (b) !== "number") || (typeof (a) !== "number"))
                throw "color component not a number";
            else if ((r < 0) || (g < 0) || (b < 0) || (a < 0))
                throw "color component less than 0";
            else if ((r > 255) || (g > 255) || (b > 255) || (a > 255))
                throw "color component bigger than 255";
            else {
                this.r = r; this.g = g; this.b = b; this.a = a;
            }
        } // end throw

        catch (e) {
            console.log(e);
        }
    } // end Color change method

    add(red, green, blue) {
        try {
            if ((typeof (red) !== "number") || (typeof (green) !== "number") || (typeof (blue) !== "number"))
                throw "color component not a number";
            else if ((red < 0) || (green < 0) || (blue < 0))
                throw "color component less than 0";
            else if ((red > 255) || (green > 255) || (blue > 255))
                throw "color component bigger than 255";
            else {
                this.r += red; this.g += green; this.b += blue;
            }
        } // end throw

        catch (e) {
            console.log(e);
        }
    }
} // end color class

// Locate the window a distance of 0.5 from the eye, and make it a 1x1 square normal to the look at vector
//  and centered at(0.5, 0.5, 0), and parallel to the view up vector.With this scheme,
const windowCenter = new Vector(0.5, 0.5, 0);
const eyeVector = new Vector(.5, .5, -0.5); // Locate the eye at(0.5, 0.5, -0.5)
const lookUpVector = new Vector(0, 1, 0); // with a view up vector of[0 1 0]
// const lookUPVector = vec3.create(0, 1, 0); // with a view up vector of[0 1 0]
// const lookAtVector = vec3.create(0, 0, 1); // and a look at vector of[0 0 1].
const lookAtVector = new Vector(0, 0, 1); // with a view up vector of[0 1 0]
// const whiteLightLocation = vec3.create(-3, 1, -0.5); // Put a white(1, 1, 1)(for ambient, diffuse and specular) light at location(-3, 1, -0.5).
//const whiteLightLocation = new Vector(-3, 1, -0.5);
const black = new Color(0, 0, 0, 255);

/* utility functions */

// draw a pixel at x,y using color
function drawPixel(imagedata, x, y, color) {
    try {
        if ((typeof (x) !== "number") || (typeof (y) !== "number"))
            throw "drawpixel location not a number";
        else if ((x < 0) || (y < 0) || (x >= imagedata.width) || (y >= imagedata.height))
            throw "drawpixel location outside of image";
        else if (color instanceof Color) {
            var pixelindex = (y * imagedata.width + x) * 4;
            imagedata.data[pixelindex] = color.r;
            imagedata.data[pixelindex + 1] = color.g;
            imagedata.data[pixelindex + 2] = color.b;
            imagedata.data[pixelindex + 3] = color.a;
        } else
            throw "drawpixel color is not a Color";
    } // end try

    catch (e) {
        console.log(e);
    }
} // end drawPixel

// draw random pixels
function drawRandPixels(context) {
    var c = new Color(0, 0, 0, 0); // the color at the pixel: black
    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w, h);
    const PIXEL_DENSITY = 0.01;
    var numPixels = (w * h) * PIXEL_DENSITY;

    // Loop over 1% of the pixels in the image
    for (var x = 0; x < numPixels; x++) {
        c.change(Math.random() * 255, Math.random() * 255,
            Math.random() * 255, 255); // rand color
        drawPixel(imagedata,
            Math.floor(Math.random() * w),
            Math.floor(Math.random() * h),
            c);
    } // end for x
    context.putImageData(imagedata, 0, 0);
} // end draw random pixels

// get the input ellipsoids from the standard class URL
function getInputEllipsoids() {
    const INPUT_ELLIPSOIDS_URL =
        "https://ncsucgclass.github.io/prog1/ellipsoids.json";

    // load the ellipsoids file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET", INPUT_ELLIPSOIDS_URL, false); // init the request
    httpReq.send(null); // send the request
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now() - startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.log * ("Unable to open input ellipses file!");
        return String.null;
    } else
        return JSON.parse(httpReq.response);
} // end get input ellipsoids

// get the input ellipsoids from the standard class URL
function getInputLights() {
    const INPUT_LIGHTS_URL =
        "https://ncsucgclass.github.io/prog1/lights.json";

    // load the lights file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET", INPUT_LIGHTS_URL, false); // init the request
    httpReq.send(null); // send the request
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now() - startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.log * ("Unable to open input lights file!");
        return String.null;
    } else
        return JSON.parse(httpReq.response);
} // end get input lights

//get the input triangles from the standard class URL
function getInputTriangles() {
    const INPUT_TRIANGLES_URL =
        "https://ncsucgclass.github.io/prog1/triangles.json";

    // load the triangles file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET", INPUT_TRIANGLES_URL, false); // init the request
    httpReq.send(null); // send the request
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now() - startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.log * ("Unable to open input triangles file!");
        return String.null;
    } else
        return JSON.parse(httpReq.response);
} // end get input triangles

//get the input boxex from the standard class URL
function getInputBoxes() {
    const INPUT_BOXES_URL =
        "https://ncsucgclass.github.io/prog1/boxes.json";

    // load the boxes file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET", INPUT_BOXES_URL, false); // init the request
    httpReq.send(null); // send the request
    var startTime = Date.now();
    while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now() - startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.log * ("Unable to open input boxes file!");
        return String.null;
    } else
        return JSON.parse(httpReq.response);
} // end get input boxes

// put random points in the ellipsoids from the class github
function drawRandPixelsInInputEllipsoids(context) {
    var inputEllipsoids = getInputEllipsoids();
    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w, h);
    const PIXEL_DENSITY = 0.1;
    var numCanvasPixels = (w * h) * PIXEL_DENSITY;

    if (inputEllipsoids != String.null) {
        var x = 0; var y = 0; // pixel coord init
        var cx = 0; var cy = 0; // init center x and y coord
        var ellipsoidXRadius = 0; // init ellipsoid x radius
        var ellipsoidYRadius = 0; // init ellipsoid y radius
        var numEllipsoidPixels = 0; // init num pixels in ellipsoid
        var c = new Color(0, 0, 0, 0); // init the ellipsoid color
        var n = inputEllipsoids.length; // the number of input ellipsoids
        //console.log("number of ellipses: " + n);

        // Loop over the ellipsoids, draw rand pixels in each
        for (var e = 0; e < n; e++) {
            cx = w * inputEllipsoids[e].x; // ellipsoid center x
            cy = h * inputEllipsoids[e].y; // ellipsoid center y
            ellipsoidXRadius = Math.round(w * inputEllipsoids[e].a); // x radius
            ellipsoidYRadius = Math.round(h * inputEllipsoids[e].b); // y radius
            numEllipsoidPixels = ellipsoidXRadius * ellipsoidYRadius * Math.PI; // projected ellipsoid area
            numEllipsoidPixels *= PIXEL_DENSITY; // percentage of ellipsoid area to render to pixels
            numEllipsoidPixels = Math.round(numEllipsoidPixels);
            //console.log("ellipsoid x radius: "+ellipsoidXRadius);
            //console.log("ellipsoid y radius: "+ellipsoidYRadius);
            //console.log("num ellipsoid pixels: "+numEllipsoidPixels);
            c.change(
                inputEllipsoids[e].diffuse[0] * 255,
                inputEllipsoids[e].diffuse[1] * 255,
                inputEllipsoids[e].diffuse[2] * 255,
                255); // ellipsoid diffuse color
            for (var p = 0; p < numEllipsoidPixels; p++) {
                do {
                    x = Math.random() * 2 - 1; // in unit square 
                    y = Math.random() * 2 - 1; // in unit square
                } while (Math.sqrt(x * x + y * y) > 1) // a circle is also an ellipse
                drawPixel(imagedata,
                    cx + Math.round(x * ellipsoidXRadius),
                    cy + Math.round(y * ellipsoidYRadius), c);
                //console.log("color: ("+c.r+","+c.g+","+c.b+")");
                //console.log("x: "+Math.round(w*inputEllipsoids[e].x));
                //console.log("y: "+Math.round(h*inputEllipsoids[e].y));
            } // end for pixels in ellipsoid
        } // end for ellipsoids
        context.putImageData(imagedata, 0, 0);
    } // end if ellipsoids found
} // end draw rand pixels in input ellipsoids

// draw 2d projections read from the JSON file at class github
function drawInputEllipsoidsUsingArcs(context) {
    var inputEllipsoids = getInputEllipsoids();


    if (inputEllipsoids != String.null) {
        var c = new Color(0, 0, 0, 0); // the color at the pixel: black
        var w = context.canvas.width;
        var h = context.canvas.height;
        var n = inputEllipsoids.length;
        //console.log("number of ellipsoids: " + n);

        // Loop over the ellipsoids, draw each in 2d
        for (var e = 0; e < n; e++) {
            context.fillStyle =
                "rgb(" + Math.floor(inputEllipsoids[e].diffuse[0] * 255)
                + "," + Math.floor(inputEllipsoids[e].diffuse[1] * 255)
                + "," + Math.floor(inputEllipsoids[e].diffuse[2] * 255) + ")"; // diffuse color
            context.save(); // remember previous (non-) scale
            context.scale(1, inputEllipsoids[e].b / inputEllipsoids[e].a); // scale by ellipsoid ratio 
            context.beginPath();
            context.arc(
                Math.round(w * inputEllipsoids[e].x),
                Math.round(h * inputEllipsoids[e].y),
                Math.round(w * inputEllipsoids[e].a),
                0, 2 * Math.PI);
            context.restore(); // undo scale before fill so stroke width unscaled
            context.fill();
            //console.log(context.fillStyle);
            //console.log("x: "+Math.round(w*inputEllipsoids[e].x));
            //console.log("y: "+Math.round(h*inputEllipsoids[e].y));
            //console.log("a: "+Math.round(w*inputEllipsoids[e].a));
            //console.log("b: "+Math.round(h*inputEllipsoids[e].b));
        } // end for ellipsoids
    } // end if ellipsoids found
} // end draw input ellipsoids

//put random points in the triangles from the class github
function drawRandPixelsInInputTriangles(context) {
    var inputTriangles = getInputTriangles();
    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w, h);
    const PIXEL_DENSITY = 0.1;
    var numCanvasPixels = (w * h) * PIXEL_DENSITY;

    if (inputTriangles != String.null) {
        var x = 0; var y = 0; // pixel coord init
        var cx = 0; var cy = 0; // init center x and y coord
        var numTrianglePixels = 0; // init num pixels in triangle
        var c = new Color(0, 0, 0, 0); // init the triangle color
        var n = inputTriangles.length; // the number of input files
        //console.log("number of files: " + n);

        // Loop over the triangles, draw rand pixels in each
        for (var f = 0; f < n; f++) {
            var tn = inputTriangles[f].triangles.length;
            //console.log("number of triangles in this files: " + tn);

            // Loop over the triangles, draw each in 2d
            for (var t = 0; t < tn; t++) {
                var vertex1 = inputTriangles[f].triangles[t][0];
                var vertex2 = inputTriangles[f].triangles[t][1];
                var vertex3 = inputTriangles[f].triangles[t][2];

                var vertexPos1 = inputTriangles[f].vertices[vertex1];
                var vertexPos2 = inputTriangles[f].vertices[vertex2];
                var vertexPos3 = inputTriangles[f].vertices[vertex3];
                //console.log("vertexPos1 " + vertexPos1);
                //console.log("vertexPos2 " + vertexPos2);
                //console.log("vertexPos3 " + vertexPos3);

                // triangle position on canvas

                var v1 = [w * vertexPos1[0], h * vertexPos1[1]];
                var v2 = [w * vertexPos2[0], h * vertexPos2[1]];
                var v3 = [w * vertexPos3[0], h * vertexPos3[1]];

                // calculate triangle area on canvas (shoelace formula)
                var triangleArea = 0.5 * Math.abs(v1[0] * v2[1] + v2[0] * v3[1] + v3[0] * v1[1] - v2[0] * v1[1] - v3[0] * v2[1] - v1[0] * v3[1]);
                var numTrianglePixels = triangleArea; // init num pixels in triangle
                //console.log("triangle area " + triangleArea);
                numTrianglePixels *= PIXEL_DENSITY; // percentage of triangle area to render to pixels
                numTrianglePixels = Math.round(numTrianglePixels);
                // console.log("numTrianglePixels " + numTrianglePixels);
                c.change(
                    inputTriangles[f].material.diffuse[0] * 255,
                    inputTriangles[f].material.diffuse[1] * 255,
                    inputTriangles[f].material.diffuse[2] * 255,
                    255); // triangle diffuse color
                for (var p = 0; p < numTrianglePixels; p++) {
                    var point; // on canvas plane
                    var triangleTest = 0;
                    while (triangleTest == 0) { //if the pixel outside the triangle

                        point = [Math.floor(Math.random() * w), Math.floor(Math.random() * h)];
                        // plane checking

                        var t1 = ((point[0] - v2[0]) * (v1[1] - v2[1]) - (v1[0] - v2[0]) * (point[1] - v2[1])) < 0.0;
                        var t2 = ((point[0] - v3[0]) * (v2[1] - v3[1]) - (v2[0] - v3[0]) * (point[1] - v3[1])) < 0.0;
                        var t3 = ((point[0] - v1[0]) * (v3[1] - v1[1]) - (v3[0] - v1[0]) * (point[1] - v1[1])) < 0.0;

                        if ((t1 == t2) && (t2 == t3)) // draw the pixel if inside the triangle
                            triangleTest = 1;
                    }
                    drawPixel(imagedata, point[0], point[1], c);
                    //console.log("color: ("+c.r+","+c.g+","+c.b+")");
                    //console.log("x: "+ x);
                    //console.log("y: "+ y);
                } // end for pixels in triangle
            } // end for triangles
        } // end for files
        context.putImageData(imagedata, 0, 0);
    } // end if triangle file found
} // end draw rand pixels in input triangles

//draw 2d projections traingle from the JSON file at class github
function drawInputTrainglesUsingPaths(context) {
    var inputTriangles = getInputTriangles();

    if (inputTriangles != String.null) {
        var c = new Color(0, 0, 0, 0); // the color at the pixel: black
        var w = context.canvas.width;
        var h = context.canvas.height;
        var n = inputTriangles.length;
        //console.log("number of files: " + n);

        // Loop over the input files
        for (var f = 0; f < n; f++) {
            var tn = inputTriangles[f].triangles.length;
            //console.log("number of triangles in this files: " + tn);

            // Loop over the triangles, draw each in 2d
            for (var t = 0; t < tn; t++) {
                var vertex1 = inputTriangles[f].triangles[t][0];
                var vertex2 = inputTriangles[f].triangles[t][1];
                var vertex3 = inputTriangles[f].triangles[t][2];

                var vertexPos1 = inputTriangles[f].vertices[vertex1];
                var vertexPos2 = inputTriangles[f].vertices[vertex2];
                var vertexPos3 = inputTriangles[f].vertices[vertex3];
                //console.log("vertexPos1 " + vertexPos1);
                //console.log("vertexPos2 " + vertexPos2);
                //console.log("vertexPos3 " + vertexPos3);

                context.fillStyle =
                    "rgb(" + Math.floor(inputTriangles[f].material.diffuse[0] * 255)
                    + "," + Math.floor(inputTriangles[f].material.diffuse[1] * 255)
                    + "," + Math.floor(inputTriangles[f].material.diffuse[2] * 255) + ")"; // diffuse color

                var path = new Path2D();
                path.moveTo(w * vertexPos1[0], h * vertexPos1[1]);
                path.lineTo(w * vertexPos2[0], h * vertexPos2[1]);
                path.lineTo(w * vertexPos3[0], h * vertexPos3[1]);
                path.closePath();
                context.fill(path);

            } // end for triangles
        } // end for files
    } // end if triangle files found
} // end draw input triangles

// put random points in the boxes from the class github
function drawRandPixelsInInputBoxes(context) {
    var inputBoxes = getInputBoxes();
    var w = context.canvas.width;
    var h = context.canvas.height;
    var imagedata = context.createImageData(w, h);
    const PIXEL_DENSITY = 0.1;
    var numCanvasPixels = (w * h) * PIXEL_DENSITY;

    if (inputBoxes != String.null) {
        var x = 0; var y = 0; // pixel coord init
        var lx = 0; var rx = 0; // input lx, rx from boxes.json
        var by = 0; var ty = 0; // input by, ty from boxes.json
        var fz = 0; var rz = 0; // input fz, rz from boxes.json
        var numBoxPixels = 0; // init num pixels in boxes
        var c = new Color(0, 0, 0, 0); // init the box color
        var n = inputBoxes.length; // the number of input boxes
        //console.log("number of ellipses: " + n);

        // Loop over the ellipsoids, draw rand pixels in each
        for (var b = 0; b < n; b++) {
            // input lx,rx,by,ty on canvas
            lx = w * inputBoxes[b].lx;
            rx = w * inputBoxes[b].rx;
            by = h * inputBoxes[b].by;
            ty = h * inputBoxes[b].ty;

            numBoxesPixels = (rx - lx) * (ty - by); // projected box area 
            numBoxesPixels *= PIXEL_DENSITY;  // percentage of box area to render to pixels
            numBoxesPixels = Math.round(numBoxesPixels);

            //console.log("num box pixels: "+numBoxesPixels);

            c.change(
                inputBoxes[b].diffuse[0] * 255,
                inputBoxes[b].diffuse[1] * 255,
                inputBoxes[b].diffuse[2] * 255,
                255); // box diffuse color
            for (var p = 0; p < numBoxesPixels; p++) {
                do {
                    x = Math.floor(Math.random() * w);
                    y = Math.floor(Math.random() * h);
                } while (x < lx || x > rx || y > ty || y < by) // inside the projection
                drawPixel(imagedata, x, y, c);
                //console.log("color: ("+c.r+","+c.g+","+c.b+")");
                //console.log("x: " + x);
                //console.log("y: " + y);
            } // end for pixels in box
        } // end for boxes
        context.putImageData(imagedata, 0, 0);
    } // end if boxes found
} // end draw rand pixels in input boxes

//draw 2d projections boxes from the JSON file at class github
function drawInputBoxesUsingPaths(context) {
    var inputBoxes = getInputBoxes();
    var n = inputBoxes.length; // the number of input boxes

    if (inputBoxes != String.null) {
        var w = context.canvas.width;
        var h = context.canvas.height;
        var c = new Color(0, 0, 0, 0); // the color at the pixel: black
        var x = 0; var y = 0; // pixel coord init
        var lx = 0; var rx = 0; // input lx, rx from boxes.json
        var by = 0; var ty = 0; // input by, ty from boxes.json
        var fz = 0; var rz = 0; // input fz, rz from boxes.json
        //console.log("number of files: " + n);

        // Loop over the input files
        for (var b = 0; b < n; b++) {

            // input lx,rx,by,ty on canvas
            lx = w * inputBoxes[b].lx;
            rx = w * inputBoxes[b].rx;
            by = h * inputBoxes[b].by;
            ty = h * inputBoxes[b].ty;

            context.fillStyle =
                "rgb(" + Math.floor(inputBoxes[b].diffuse[0] * 255)
                + "," + Math.floor(inputBoxes[b].diffuse[1] * 255)
                + "," + Math.floor(inputBoxes[b].diffuse[2] * 255) + ")"; // diffuse color

            var path = new Path2D();
            path.moveTo(lx, ty);
            path.lineTo(lx, by);
            path.lineTo(rx, by);
            path.lineTo(rx, ty);
            path.closePath();
            context.fill(path);

        } // end for files
    } // end if box files found
} // end draw input boxes

//get all the input triangles from the standard class URL
function getAllInputTriangles() {
    const INPUT_TRIANGLES_URL1 = "https://ncsucgclass.github.io/prog1/triangles.json";
    const INPUT_TRIANGLES_URL2 = "https://ncsucgclass.github.io/prog1/triangles2.json";

    // Function to load a file
    function loadFile(url) {
        var httpReq = new XMLHttpRequest(); // a new http request
        httpReq.open("GET", url, false); // init the request
        httpReq.send(null); // send the request
        var startTime = Date.now();
        while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
            if ((Date.now() - startTime) > 3000)
                break;
        } // until its loaded or we time out after three seconds
        if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
            console.log("Unable to open input triangles file!");
            return null;
        } else {
            return JSON.parse(httpReq.response);
        }
    }

    // Load both files
    var triangles1 = loadFile(INPUT_TRIANGLES_URL1);
    var triangles2 = loadFile(INPUT_TRIANGLES_URL2);

    // Combine the contents of both files
    if (triangles1 && triangles2) {
        return triangles1.concat(triangles2);
    } else {
        return null;
    }
} // end getInputTriangles



/**
 * translates a x and y pixel location to real world position
 * @param {number} xPix is the x location of the input pixel on the screen
 * @param {number} yPix is the y location of the input pixel on the screen
 * @param {number} lastXPixel is the x location of the last pixel position horizontally on the screen
 * @param {number} lastYPixel is the y location of the lst pixel position vertically on the screen
 * @returns {Vector} real world position of pixel as vector
 */
function translatePixelNumbersToLocation(xPix, yPix, lastXPixel, lastYPixel) {
    //window is centered at .5 .5 0 with edges of LL: 00, UL: 01, LR: 10, UR: 11
    //pixel location over distance
    let realPixelXVal = xPix / lastXPixel;

    let realPixelYVal = 1 - (yPix / lastYPixel);
    //let realPixelYVal = yPix / lastYPixel;

    //the z val will always be 0 because window square is centered at .5 .5 0
    //UL: 0,1,0
    //UR: 1,1,0
    //BL: 0,0,0
    //BR: 1,0,0



    return new Vector(realPixelXVal, realPixelYVal, 0);


    //return realPixelLocation;
}

// function crossProductXYZ(cross1, cross2) {
//     return {
//         x: cross1.y * cross2.z - cross1.z * cross2.y,
//         y: cross1.z * cross2.x - cross1.x * cross2.z,
//         z: cross1.x * cross2.y - cross1.y * cross2.x
//     };
// }

// function dotProduct(dot1, dot2) {
//     return dot1.x * dot2.x + dot1.y * dot2.y + dot1.z * dot2.z;
// }

function TriangleNormal(vertexA, vertexB, vertexC) {
    //triangle normal (N) = (B-A)X(C-A)
    //let cross1 = Vector.subtract(vertexB, vertexA);
    //let cross2 = Vector.subtract(vertexC, vertexA);
    //Vector.cross(Vector.subtract(vertexB, vertexA), Vector.subtract(vertexC, vertexA))
    return Vector.normalize(Vector.cross(Vector.subtract(vertexB, vertexA), Vector.subtract(vertexC, vertexA)));
}

// function checkIfIntersectionIsInTriangle(intersectionVector, A, B, C) {
//     //false for neg, true for pos sign
//     let sign1 = false;
//     let sign2 = false;
//     let sign3 = false;
//     if (Vector.dot(intersectionVector, Vector.cross(Vector.subtract(B, A), Vector.subtract(intersectionVector, A))) >= 0) {
//         sign1 = true;
//     }
//     if (Vector.dot(intersectionVector, Vector.cross(Vector.subtract(C, B), Vector.subtract(intersectionVector, B))) >= 0) {
//         sign2 = true;
//         //quick check if sign1 and sign2 are different then we know the intersection is not in the triangle
//         if (sign1 != sign2) {
//             return false;
//         }
//     }
//     if (Vector.dot(intersectionVector, Vector.cross(Vector.subtract(C, B), Vector.subtract(intersectionVector, B))) >= 0) {
//         sign3 = true;
//         //no need to quick check because final check is about to happen and computation has already occured
//     }


//     //returns true if all are same sign, false if else
//     return (sign1 && (sign1 == sign2) && (sign2 == sign3));

// }

function checkIfIntersectionIsInTriangle(intersectionVector, A, B, C) {
    // Helper function to calculate the cross product of two vectors

    // Vectors from the triangle vertices to the intersection point
    const v0 = Vector.subtract(B, A);
    const v1 = Vector.subtract(C, B);
    const v2 = Vector.subtract(A, C);

    const p0 = Vector.subtract(intersectionVector, A);
    const p1 = Vector.subtract(intersectionVector, B);
    const p2 = Vector.subtract(intersectionVector, C);

    // Calculate the cross products
    const cross0 = Vector.cross(v0, p0);
    const cross1 = Vector.cross(v1, p1);
    const cross2 = Vector.cross(v2, p2);

    // Calculate the dot products
    const dot0 = Vector.dot(cross0, cross1);
    const dot1 = Vector.dot(cross1, cross2);

    // Check if the signs of the dot products are the same
    return (dot0 >= 0) && (dot1 >= 0);
}

function getRayDistanceToTrianglePlane(vertexPos1, triangleNorm, rayDirectionVector) {


    //if N dot D != 0 there is a plane intersection
    if (Vector.dot(triangleNorm, rayDirectionVector) != 0) {
        //plane intersect!

        //triangle plane coefficient (d) = N dot A
        let planeCoefficientD = Vector.dot(triangleNorm, vertexPos1);

        //return Vector.scale((1 / dotProduct(triangleNorm, planeCoefficientD)), Vector.subtract(planeCoefficientD, Vector.dot(triangleNorm, eyeVector)))
        //calculate ray distance to intersection
        //t = (d - N dot E) / N dot D
        //return rayDistToIntersection = (planeCoefficientD - dotProduct(triangleNorm, eyeVector)) / dotProduct(triangleNorm, rayDirectionVector);
        return rayDistToIntersection = (planeCoefficientD - Vector.dot(triangleNorm, eyeVector)) / Vector.dot(triangleNorm, rayDirectionVector);

    }
    else {
        return -1;
    }
}

// /**
//  * like if there are 80 degrees between eye and light andle reflected on surface then H would be the vector at 40 degrees
//  * @param {Vector} lightPosition is the position of the light to get halfway vector from eye
//  */
// function getHalfwayVector(lightPosition) {
//     //v + l / abs( v + l )
//     let numerator = Vector.add(eyeVector, lightPosition);
//     let denominator = Vector.absoluteAdd(eyeVector, lightPosition);
//     //let denominator = new Vector(Math.abs(eyeVector.x + lightPosition.x), Math.abs(eyeVector.y + lightPosition.y), Math.abs(eyeVector.z + lightPosition.z))
//     return Vector.normalize(Vector.divide(numerator, denominator));
// }

/**
 * like if there are 80 degrees between eye and light andle reflected on surface then H would be the vector at 40 degrees
 */
// function getHalfwayVector(lightPosition, rayDirectionVector) {
//     //numerator = v + l
//     // sum of the light direction and view direction (will be ray instead of eye?)
//     const numerator = Vector.add(Vector.normalize(rayDirectionVector), Vector.normalize(lightPosition));

//     // normalize the resulting vector and return
//     const denominator = Vector.magnitude(numerator);
//     //return v + l / abs( v + l )
//     return Vector.normalize(Vector.scale(1 / denominator, numerator));
// }

function getHalfwayVector(lightPosition, rayDirectionVector) {
    //return Vector.normalize(Vector.add(rayDirectionVector, lightPosition));
    // Calculate the sum of light direction and view direction
    const numerator = Vector.add(Vector.normalize(rayDirectionVector), Vector.normalize(lightPosition));

    // // Calculate the magnitude (length) of the sum
    const denominator = Vector.magnitude(numerator);

    // // Normalize the resulting vector and return
    return Vector.scale(1 / denominator, numerator);
}


// /**
//  * calculates how a vector will bounce off of a surface's normal vector
//  * @param {Vector} surfaceNorm is the normal of the surface
//  * @param {*} lightVector is the vector of the incoming light to be reflected
//  */
// function getReflectedVectorOverNormal(surfaceNorm, lightVector) {

//     // R = 2 * (N dot L)N - L
//     // R = 2 * (N dot L) = 2 * Vector.dot(surfaceNorm, lightVector)
//     // R = 2 * (N dot L) * N = Vector.scale((2 * Vector.dot(surfaceNorm, lightVector)), surfaceNorm)
//     // R = 2 * (N dot L)N - L = Vector.subtract((Vector.scale((2 * Vector.dot(surfaceNorm, lightVector)), surfaceNorm)), lightVector);

//     return Vector.subtract((Vector.scale((2 * Vector.normalize(Vector.dot(surfaceNorm, lightVector))), surfaceNorm)), lightVector);
// }

function BlinnPhongEquation(shapeAmbient, shapeDiffuse, shapeSpecular, lightAmbient, lightDiffuse, lightSpecular, triangleNorm, pointToLightVector, reflectionExponent, halfwayVector) {
    //Ka*La + Kd*Ld (N•L) + Ks*Ls*(N•H)^n = color
    //Ambient: Ka*La
    let ambient = Vector.multiply(shapeAmbient, lightAmbient);
    //Diffuse: Kd*Ld* max((N•L), 0)
    //let diffuse = Vector.scale(Vector.scale(Vector.dot(triangleNorm, pointToLightVector), Vector.multiply(shapeDiffuse, lightDiffuse)), Math.max(Vector.dot(triangleNorm, pointToLightVector), 0));
    let diffuse = Vector.scale(Math.max(Vector.dot(triangleNorm, pointToLightVector), 0), Vector.multiply(shapeDiffuse, lightDiffuse));

    //specular: Ks*Ls * max((N•H), 0)^n
    //let specular = Vector.scale(Math.pow(Vector.dot(reflectedLightVector, vectorFromPointToEye), reflectionExponent), Vector.multiply(shapeSpecular, lightSpecular));
    //specular: Ks*Ls * max((N•H), 0)^n
    let specular = Vector.scale(Math.pow(Math.max(Vector.dot(triangleNorm, halfwayVector), 0), reflectionExponent), Vector.multiply(shapeSpecular, lightSpecular));
    //add them all together
    let totalVector = Vector.add(Vector.add(ambient, diffuse), specular);
    //vector will have components of values between 0 and 1, need to adjust for color max of 255
    totalVector = Vector.clamp(Vector.scale(255, totalVector), 0, 255);
    //no color val can be below 0 or above 255
    totalVector.toConsole("blinnPhongColorVec: ");
    //convert vector to color and set alpha to 255 (opaque)
    return new Color(totalVector.x, totalVector.y, totalVector.z, 255);
}

function newBlinnPhongEquation(shapeAmbient, shapeDiffuse, shapeSpecular, lightAmbient, lightDiffuse, lightSpecular, triangleNorm, pointToLightVector, reflectionExponent, halfwayVector) {
    //Ka*La + Kd*Ld (N•L) + Ks*Ls*(N•H)^n = color
    //Ambient: Ka*La
    let ambient = Vector.multiply(shapeAmbient, lightAmbient);
    //Diffuse: Kd*Ld* max((N•L), 0)
    //let diffuse = Vector.scale(Vector.scale(Vector.dot(triangleNorm, pointToLightVector), Vector.multiply(shapeDiffuse, lightDiffuse)), Math.max(Vector.dot(triangleNorm, pointToLightVector), 0));
    let diffuse = Vector.scale(Math.max(Vector.dot(triangleNorm, pointToLightVector), 0), Vector.multiply(shapeDiffuse, lightDiffuse));

    //specular: Ks*Ls * max((N•H), 0)^n
    let specular = Vector.scale(Math.pow(Math.max(Vector.dot(triangleNorm, halfwayVector), 0), reflectionExponent), Vector.multiply(shapeSpecular, lightSpecular));
    //add them all together
    let totalVector = Vector.add(Vector.add(ambient, diffuse), specular);
    //vector will have components of values between 0 and 1, need to adjust for color max of 255
    totalVector = Vector.scale(255, totalVector);

    totalVector = Vector.clamp(totalVector, 0, 255);
    //no color val can be below 0 or above 255
    totalVector.toConsole("blinnPhongColorVec: ");
    //convert vector to color and set alpha to 255 (opaque)
    return new Color(totalVector.x, totalVector.y, totalVector.z, 255);
}



/**
 * shoots raycasts to record intersections and colors of objects hit by rays
 * @param {CanvasRenderingContext2D} context 
 */
function shootRaycasts(context) {
    console.log("raycasting");
    //bottom left is 0,0
    //var maxX = context.canvas.getBoundingClientRect().width;
    //var maxY = context.canvas.getBoundingClientRect().height;

    // For each screen pixel
    // Find the ray from the eye through the pixel 
    // For each object in the scene 
    // If the ray intersects the object, and is closest yet 
    // Record intersection and object 
    // Find color for closest intersection  

    var inputTriangles = getAllInputTriangles();
    var maxX = context.canvas.width;
    var maxY = context.canvas.height;
    var closestIntersectionArray = Array.from({ length: maxY }, () => Array(maxX).fill(Infinity));
    var imagedata = context.createImageData(maxX, maxY);
    var c = new Color(0, 0, 0, 0); // init the triangle color (to be changed)
    var n = inputTriangles.length;
    // Loop over the input files
    //console.log("test0:");
    //console.log("number of files: " + n);

    //console.log("test2");
    //For each screen pixel
    for (let xPix = 0; xPix < maxX; xPix++) {
        //console.log("test3");
        for (let yPix = 0; yPix < maxY; yPix++) {
            // Find the ray from the eye through the pixel
            let pixelLocation = translatePixelNumbersToLocation(xPix, yPix, maxX, maxY);
            let rayDirectionVector = Vector.subtract(pixelLocation, eyeVector); //pixel - eye = ray direction
            // For each object in the scene 
            for (var f = 0; f < n; f++) {
                //console.log("test1");
                var tn = inputTriangles[f].triangles.length;
                // Loop over the triangles, draw each in 2d
                //console.log("number of triangles in this files: " + tn);
                for (var t = 0; t < tn; t++) {
                    //gets index for vertex
                    var vertex1 = inputTriangles[f].triangles[t][0];
                    var vertex2 = inputTriangles[f].triangles[t][1];
                    var vertex3 = inputTriangles[f].triangles[t][2];

                    //var vertexPos1pre = inputTriangles[f].vertices[vertex1];
                    //var vertexPos2pre = inputTriangles[f].vertices[vertex2];
                    //var vertexPos3pre = inputTriangles[f].vertices[vertex3];

                    var vertexPos1 = new Vector(inputTriangles[f].vertices[vertex1][0], inputTriangles[f].vertices[vertex1][1], inputTriangles[f].vertices[vertex1][2]);
                    var vertexPos2 = new Vector(inputTriangles[f].vertices[vertex2][0], inputTriangles[f].vertices[vertex2][1], inputTriangles[f].vertices[vertex2][2]);
                    var vertexPos3 = new Vector(inputTriangles[f].vertices[vertex3][0], inputTriangles[f].vertices[vertex3][1], inputTriangles[f].vertices[vertex3][2]);

                    let triangleNorm = TriangleNormal(vertexPos1, vertexPos2, vertexPos3);

                    // if ray can reach triangle plane
                    let rayDistToTrianglePlane = getRayDistanceToTrianglePlane(vertexPos1, triangleNorm, rayDirectionVector);
                    //** if t < 1 then in front of pixel and don't render **
                    if (rayDistToTrianglePlane >= 1) { //will only get negative one if doesnt reach plane
                        //get coordinates of intersection
                        //eyeVector.toConsole("eyeVector: ");

                        let intersectionVector = Vector.add(eyeVector, Vector.scale(rayDistToTrianglePlane, rayDirectionVector));
                        // If the ray intersects the object, and is closest yet 
                        if (checkIfIntersectionIsInTriangle(intersectionVector, vertexPos1, vertexPos2, vertexPos3) && closestIntersectionArray[xPix][yPix] > rayDistToTrianglePlane) { // If the ray intersects the object, and is closest so far
                            // Record intersection and object (whole object or location of intersection or what? make new class?)
                            closestIntersectionArray[xPix][yPix] = rayDistToTrianglePlane;
                            // Find color for closest intersection
                            //c.change(Math.floor(inputTriangles[f].material.diffuse[0] * 255), Math.floor(inputTriangles[f].material.diffuse[1] * 255), Math.floor(inputTriangles[f].material.diffuse[2] * 255), 255);

                            //perform Blinn Phong lighting math to get correct colors
                            //get light(s) first
                            var inputLights = getInputLights();
                            var finalColor = new Color(0, 0, 0, 255);
                            for (let i = 0; i < inputLights.length; i++) {
                                //get ambient, diffuse, and specular of light
                                var currLight = inputLights[i];
                                //get position
                                var lightPosition = new Vector(currLight.x, currLight.y, currLight.z);
                                //ambient (La)
                                var lightAmbient = new Vector(currLight.ambient[0], currLight.ambient[1], currLight.ambient[2]);
                                //diffuse (Ld)
                                var lightDiffuse = new Vector(currLight.diffuse[0], currLight.diffuse[1], currLight.diffuse[2]);
                                //specular (Ls)
                                var lightSpecular = new Vector(currLight.specular[0], currLight.specular[1], currLight.specular[2]);

                                //get ambient, diffuse, specular, and exponent of triangle
                                // Ka
                                var shapeAmbient = new Vector(inputTriangles[f].material.ambient[0], inputTriangles[f].material.ambient[1], inputTriangles[f].material.ambient[2]);
                                // Kd
                                var shapeDiffuse = new Vector(inputTriangles[f].material.diffuse[0], inputTriangles[f].material.diffuse[1], inputTriangles[f].material.diffuse[2]);
                                // Ks
                                var shapeSpecular = new Vector(inputTriangles[f].material.specular[0], inputTriangles[f].material.specular[1], inputTriangles[f].material.specular[2]);
                                // n
                                var reflectionExponent = inputTriangles[f].material.n;

                                //Old phong: Ka*La + Kd*Ld*(N•L) + Ks*Ls*(R•V)^n = color
                                //new binn phong: Ka*La + Kd*Ld (N•L) + Ks*Ls*(N•H)^n = color
                                // N is the surface normal at the point (triangleNorm will be the same at all points of the triangle)

                                // L is the normalized vector pointing from the surface point toward the light source.
                                //let pointToLightVector = Vector.normalize(Vector.subtract(lightPosition, intersectionVector));
                                let pointToLightVector = Vector.normalize(Vector.subtract(lightPosition, intersectionVector));

                                // R is the normalized vector representing the direction of the reflected light.
                                //let reflectedLightVector = getReflectedVectorOverNormal(triangleNorm, pointToLightVector);

                                // V is the normalized vector pointing from the surface point toward the viewer or camera.
                                //let vectorFromPointToEye = Vector.normalize(Vector.subtract(eyeVector, intersectionVector));
                                let vectorFromPointToEye = Vector.normalize(Vector.subtract(eyeVector, intersectionVector));

                                if (Vector.dot(triangleNorm, vectorFromPointToEye) < 0) {
                                    triangleNorm = Vector.scale(-1, triangleNorm)
                                }

                                // H is the halfway vector beteen light vec and eye ray vec
                                // H: Halfway vector (normalized)
                                //let halfwayVector = Vector.normalize(Vector.add(vectorFromPointToEye, pointToLightVector));
                                //var halfwayVector = getHalfwayVector(pointToLightVector, vectorFromPointToEye);
                                var halfwayVector = getHalfwayVector(pointToLightVector, vectorFromPointToEye); // Remove extra normalization if getHalfwayVector normalizes internally

                                // Perform the Blinn-Phong calculation without normalizing the color and light inputs
                                var shadeColor = BlinnPhongEquation(
                                    shapeAmbient,
                                    shapeDiffuse,
                                    shapeSpecular,
                                    lightAmbient,
                                    lightDiffuse,
                                    lightSpecular,
                                    Vector.normalize(triangleNorm),
                                    Vector.normalize(pointToLightVector),
                                    reflectionExponent,
                                    Vector.normalize(halfwayVector)
                                );
                                finalColor.add(shadeColor.r, shadeColor.g, shadeColor.b);
                            }



                            //draw pixel to imagedata (to be rendered after loops)
                            drawPixel(imagedata, xPix, yPix, finalColor);

                            //outputs the ray, distance to triangle plane, and the intersection location
                            //rayDirectionVector.toConsole("rayDirectionVector: ");
                            //console.log("rayDistToTrianglePlane: " + rayDistToTrianglePlane);
                            //print out intersection location
                            //intersectionVector.toConsole("Intersection at ");

                        }

                    }

                }
            }


        }
    }

    // After the loops, draw the image data
    context.putImageData(imagedata, 0, 0);
}

/* main -- here is where execution begins after window load */

function main() {

    // Get the canvas and context
    var canvas = document.getElementById("viewport");
    var context = canvas.getContext("2d");

    // Create the image
    //drawRandPixels(context);
    // shows how to draw pixels

    //drawRandPixelsInInputEllipsoids(context);
    // shows how to draw pixels and read input file

    //drawInputEllipsoidsUsingArcs(context);
    // shows how to read input file, but not how to draw pixels

    //drawRandPixelsInInputTriangles(context);
    // shows how to draw pixels and read input file

    //drawInputTrainglesUsingPaths(context);
    // shows how to read input file, but not how to draw pixels

    //drawRandPixelsInInputBoxes(context);
    // shows how to draw pixels and read input file

    //drawInputBoxesUsingPaths(context);
    // shows how to read input file, but not how to draw pixels

    shootRaycasts(context);
}