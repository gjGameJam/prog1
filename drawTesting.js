// /* classes */
// // All vertex locations should be described in world coordinates,
// // meaning they do not require any transformation.

// const glMatrix = import("./gl-matrix-min");
// const vec3 = glMatrix.vec3;

// // Create a global map to store objects and the distance to the closest intersection
// const objectClosestIntersectionMap = new Map();


// let sceneObjects = [
//     { name: 'object1', type: 'mesh' },
//     { name: 'object2', type: 'light' },
//     { name: 'object3', type: 'camera' }
// ];


// class Vector3 {
//     constructor(x = 0.0, y = 0.0, z = 0.0) {
//         this.x = x;
//         this.y = y;
//         this.z = z;
//     }

//     // Method to add another vector to this one
//     add(vector) {
//         return new Vector3(this.x + vector.x, this.y + vector.y, this.z + vector.z);
//     }

//     // Method to subtract another vector from this one
//     subtract(vector) {
//         return new Vector3(this.x - vector.x, this.y - vector.y, this.z - vector.z);
//     }

//     // Method to scale this vector by a scalar
//     scale(scalar) {
//         return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
//     }

//     // Method to calculate the dot product with another vector
//     dotProd(vector) {
//         return this.x * vector.x + this.y * vector.y + this.z * vector.z;
//     }

//     // Method to calculate the cross product with another vector
//     crossProd(vector) {
//         return new Vector3(
//             this.y * vector.z - this.z * vector.y,
//             this.z * vector.x - this.x * vector.z,
//             this.x * vector.y - this.y * vector.x
//         );
//     }

//     // Method to calculate the magnitude (length) of the vector
//     magnitude() {
//         return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
//     }

//     // Method to normalize the vector (make it unit length)
//     normalize() {
//         const mag = this.magnitude();
//         if (mag === 0) return new Vector3(0, 0, 0);
//         return this.scale(1 / mag);
//     }
// }


// // Locate the window a distance of 0.5 from the eye, and make it a 1x1 square normal to the look at vector
// //  and centered at(0.5, 0.5, 0), and parallel to the view up vector.With this scheme,
// const windowCenter = new Vector3(0.5, 0.5, 0);
// const eyeVector = new Vector3(.5, .5, -0.5); // Locate the eye at(0.5, 0.5, -0.5)
// const lookUpVector = new Vector3(0, 1, 0); // with a view up vector of[0 1 0]
// // const lookUPVector = vec3.create(0, 1, 0); // with a view up vector of[0 1 0]
// // const lookAtVector = vec3.create(0, 0, 1); // and a look at vector of[0 0 1].
// const lookAtVector = new Vector3(0, 0, 1); // with a view up vector of[0 1 0]
// // const whiteLightLocation = vec3.create(-3, 1, -0.5); // Put a white(1, 1, 1)(for ambient, diffuse and specular) light at location(-3, 1, -0.5).
// const whiteLightLocation = new Vector3(-3, 1, -0.5);


// //you can assume that everything in the world is in view if it is located in a 1x1x1 box with one corner at the origin,
// // and another at(1, 1, 1).

// // Color constructor
// class Color {
//     constructor(r, g, b, a) {
//         try {
//             if ((typeof (r) !== "number") || (typeof (g) !== "number") || (typeof (b) !== "number") || (typeof (a) !== "number"))
//                 throw "color component not a number";
//             else if ((r < 0) || (g < 0) || (b < 0) || (a < 0))
//                 throw "color component less than 0";
//             else if ((r > 255) || (g > 255) || (b > 255) || (a > 255))
//                 throw "color component bigger than 255";
//             else {
//                 this.r = r; this.g = g; this.b = b; this.a = a;
//             }
//         } // end try

//         catch (e) {
//             console.log(e);
//         }
//     } // end Color constructor

//     // Color change method
//     change(r, g, b, a) {
//         try {
//             if ((typeof (r) !== "number") || (typeof (g) !== "number") || (typeof (b) !== "number") || (typeof (a) !== "number"))
//                 throw "color component not a number";
//             else if ((r < 0) || (g < 0) || (b < 0) || (a < 0))
//                 throw "color component less than 0";
//             else if ((r > 255) || (g > 255) || (b > 255) || (a > 255))
//                 throw "color component bigger than 255";
//             else {
//                 this.r = r; this.g = g; this.b = b; this.a = a;
//             }
//         } // end throw

//         catch (e) {
//             console.log(e);
//         }
//     } // end Color change method
// } // end color class


// /* utility functions */

// // draw a pixel at x,y using color
// function drawPixel(imagedata, x, y, color) {
//     try {
//         if ((typeof (x) !== "number") || (typeof (y) !== "number"))
//             throw "drawpixel location not a number";
//         else if ((x < 0) || (y < 0) || (x >= imagedata.width) || (y >= imagedata.height))
//             throw "drawpixel location outside of image";
//         else if (color instanceof Color) {
//             var pixelindex = (y * imagedata.width + x) * 4;
//             imagedata.data[pixelindex] = color.r;
//             imagedata.data[pixelindex + 1] = color.g;
//             imagedata.data[pixelindex + 2] = color.b;
//             imagedata.data[pixelindex + 3] = color.a;
//         } else
//             throw "drawpixel color is not a Color";
//     } // end try

//     catch (e) {
//         console.log(e);
//     }
// } // end drawPixel

// // draw random pixels
// function drawRandPixels(context) {
//     var c = new Color(0, 0, 0, 0); // the color at the pixel: black
//     var w = context.canvas.width;
//     var h = context.canvas.height;
//     var imagedata = context.createImageData(w, h);
//     const PIXEL_DENSITY = 0.01;
//     var numPixels = (w * h) * PIXEL_DENSITY;

//     // Loop over 1% of the pixels in the image
//     for (var x = 0; x < numPixels; x++) {
//         c.change(Math.random() * 255, Math.random() * 255,
//             Math.random() * 255, 255); // rand color
//         drawPixel(imagedata,
//             Math.floor(Math.random() * w),
//             Math.floor(Math.random() * h),
//             c);
//     } // end for x
//     context.putImageData(imagedata, 0, 0);
// } // end draw random pixels

// // get the input ellipsoids from the standard class URL
// function getInputEllipsoids() {
//     const INPUT_ELLIPSOIDS_URL =
//         "https://ncsucgclass.github.io/prog1/ellipsoids.json";

//     // load the ellipsoids file
//     var httpReq = new XMLHttpRequest(); // a new http request
//     httpReq.open("GET", INPUT_ELLIPSOIDS_URL, false); // init the request
//     httpReq.send(null); // send the request
//     var startTime = Date.now();
//     while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
//         if ((Date.now() - startTime) > 3000)
//             break;
//     } // until its loaded or we time out after three seconds
//     if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
//         console.log * ("Unable to open input ellipses file!");
//         return String.null;
//     } else
//         return JSON.parse(httpReq.response);
// } // end get input ellipsoids

// //get the input triangles from the standard class URL
// function getInputTriangles() {
//     const INPUT_TRIANGLES_URL =
//         "https://ncsucgclass.github.io/prog1/triangles.json";

//     // load the triangles file
//     var httpReq = new XMLHttpRequest(); // a new http request
//     httpReq.open("GET", INPUT_TRIANGLES_URL, false); // init the request
//     httpReq.send(null); // send the request
//     var startTime = Date.now();
//     while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
//         if ((Date.now() - startTime) > 3000)
//             break;
//     } // until its loaded or we time out after three seconds
//     if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
//         console.log * ("Unable to open input triangles file!");
//         return String.null;
//     } else
//         return JSON.parse(httpReq.response);
// } // end get input triangles


// //get all the input triangles from the standard class URL
// function getAllInputTriangles() {
//     const INPUT_TRIANGLES_URL1 = "https://ncsucgclass.github.io/prog1/triangles.json";
//     const INPUT_TRIANGLES_URL2 = "https://ncsucgclass.github.io/prog1/triangles2.json";

//     // Function to load a file
//     function loadFile(url) {
//         var httpReq = new XMLHttpRequest(); // a new http request
//         httpReq.open("GET", url, false); // init the request
//         httpReq.send(null); // send the request
//         var startTime = Date.now();
//         while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
//             if ((Date.now() - startTime) > 3000)
//                 break;
//         } // until its loaded or we time out after three seconds
//         if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
//             console.log("Unable to open input triangles file!");
//             return null;
//         } else {
//             return JSON.parse(httpReq.response);
//         }
//     }

//     // Load both files
//     var triangles1 = loadFile(INPUT_TRIANGLES_URL1);
//     var triangles2 = loadFile(INPUT_TRIANGLES_URL2);

//     // Combine the contents of both files
//     if (triangles1 && triangles2) {
//         return triangles1.concat(triangles2);
//     } else {
//         return null;
//     }
// } // end getInputTriangles


// //get the input boxex from the standard class URL
// function getInputBoxes() {
//     const INPUT_BOXES_URL =
//         "https://ncsucgclass.github.io/prog1/boxes.json";

//     // load the boxes file
//     var httpReq = new XMLHttpRequest(); // a new http request
//     httpReq.open("GET", INPUT_BOXES_URL, false); // init the request
//     httpReq.send(null); // send the request
//     var startTime = Date.now();
//     while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
//         if ((Date.now() - startTime) > 3000)
//             break;
//     } // until its loaded or we time out after three seconds
//     if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
//         console.log * ("Unable to open input boxes file!");
//         return String.null;
//     } else
//         return JSON.parse(httpReq.response);
// } // end get input boxes

// // put random points in the ellipsoids from the class github
// function drawRandPixelsInInputEllipsoids(context) {
//     var inputEllipsoids = getInputEllipsoids();
//     var w = context.canvas.width;
//     var h = context.canvas.height;
//     var imagedata = context.createImageData(w, h);
//     const PIXEL_DENSITY = 0.1;
//     var numCanvasPixels = (w * h) * PIXEL_DENSITY;

//     if (inputEllipsoids != String.null) {
//         var x = 0; var y = 0; // pixel coord init
//         var cx = 0; var cy = 0; // init center x and y coord
//         var ellipsoidXRadius = 0; // init ellipsoid x radius
//         var ellipsoidYRadius = 0; // init ellipsoid y radius
//         var numEllipsoidPixels = 0; // init num pixels in ellipsoid
//         var c = new Color(0, 0, 0, 0); // init the ellipsoid color
//         var n = inputEllipsoids.length; // the number of input ellipsoids
//         //console.log("number of ellipses: " + n);

//         // Loop over the ellipsoids, draw rand pixels in each
//         for (var e = 0; e < n; e++) {
//             cx = w * inputEllipsoids[e].x; // ellipsoid center x
//             cy = h * inputEllipsoids[e].y; // ellipsoid center y
//             ellipsoidXRadius = Math.round(w * inputEllipsoids[e].a); // x radius
//             ellipsoidYRadius = Math.round(h * inputEllipsoids[e].b); // y radius
//             numEllipsoidPixels = ellipsoidXRadius * ellipsoidYRadius * Math.PI; // projected ellipsoid area
//             numEllipsoidPixels *= PIXEL_DENSITY; // percentage of ellipsoid area to render to pixels
//             numEllipsoidPixels = Math.round(numEllipsoidPixels);
//             //console.log("ellipsoid x radius: "+ellipsoidXRadius);
//             //console.log("ellipsoid y radius: "+ellipsoidYRadius);
//             //console.log("num ellipsoid pixels: "+numEllipsoidPixels);
//             c.change(
//                 inputEllipsoids[e].diffuse[0] * 255,
//                 inputEllipsoids[e].diffuse[1] * 255,
//                 inputEllipsoids[e].diffuse[2] * 255,
//                 255); // ellipsoid diffuse color
//             for (var p = 0; p < numEllipsoidPixels; p++) {
//                 do {
//                     x = Math.random() * 2 - 1; // in unit square
//                     y = Math.random() * 2 - 1; // in unit square
//                 } while (Math.sqrt(x * x + y * y) > 1) // a circle is also an ellipse
//                 drawPixel(imagedata,
//                     cx + Math.round(x * ellipsoidXRadius),
//                     cy + Math.round(y * ellipsoidYRadius), c);
//                 //console.log("color: ("+c.r+","+c.g+","+c.b+")");
//                 //console.log("x: "+Math.round(w*inputEllipsoids[e].x));
//                 //console.log("y: "+Math.round(h*inputEllipsoids[e].y));
//             } // end for pixels in ellipsoid
//         } // end for ellipsoids
//         context.putImageData(imagedata, 0, 0);
//     } // end if ellipsoids found
// } // end draw rand pixels in input ellipsoids

// // draw 2d projections read from the JSON file at class github
// function drawInputEllipsoidsUsingArcs(context) {
//     var inputEllipsoids = getInputEllipsoids();


//     if (inputEllipsoids != String.null) {
//         var c = new Color(0, 0, 0, 0); // the color at the pixel: black
//         var w = context.canvas.width;
//         var h = context.canvas.height;
//         var n = inputEllipsoids.length;
//         //console.log("number of ellipsoids: " + n);

//         // Loop over the ellipsoids, draw each in 2d
//         for (var e = 0; e < n; e++) {
//             context.fillStyle =
//                 "rgb(" + Math.floor(inputEllipsoids[e].diffuse[0] * 255)
//                 + "," + Math.floor(inputEllipsoids[e].diffuse[1] * 255)
//                 + "," + Math.floor(inputEllipsoids[e].diffuse[2] * 255) + ")"; // diffuse color
//             context.save(); // remember previous (non-) scale
//             context.scale(1, inputEllipsoids[e].b / inputEllipsoids[e].a); // scale by ellipsoid ratio
//             context.beginPath();
//             context.arc(
//                 Math.round(w * inputEllipsoids[e].x),
//                 Math.round(h * inputEllipsoids[e].y),
//                 Math.round(w * inputEllipsoids[e].a),
//                 0, 2 * Math.PI);
//             context.restore(); // undo scale before fill so stroke width unscaled
//             context.fill();
//             //console.log(context.fillStyle);
//             //console.log("x: "+Math.round(w*inputEllipsoids[e].x));
//             //console.log("y: "+Math.round(h*inputEllipsoids[e].y));
//             //console.log("a: "+Math.round(w*inputEllipsoids[e].a));
//             //console.log("b: "+Math.round(h*inputEllipsoids[e].b));
//         } // end for ellipsoids
//     } // end if ellipsoids found
// } // end draw input ellipsoids

// //put random points in the triangles from the class github
// function drawRandPixelsInInputTriangles(context) {
//     var inputTriangles = getInputTriangles();
//     var w = context.canvas.width;
//     var h = context.canvas.height;
//     var imagedata = context.createImageData(w, h);
//     const PIXEL_DENSITY = 0.1;
//     var numCanvasPixels = (w * h) * PIXEL_DENSITY;

//     if (inputTriangles != String.null) {
//         var x = 0; var y = 0; // pixel coord init
//         var cx = 0; var cy = 0; // init center x and y coord
//         var numTrianglePixels = 0; // init num pixels in triangle
//         var c = new Color(0, 0, 0, 0); // init the triangle color
//         var n = inputTriangles.length; // the number of input files
//         //console.log("number of files: " + n);

//         // Loop over the triangles, draw rand pixels in each
//         for (var f = 0; f < n; f++) {
//             var tn = inputTriangles[f].triangles.length;
//             //console.log("number of triangles in this files: " + tn);

//             // Loop over the triangles, draw each in 2d
//             for (var t = 0; t < tn; t++) {
//                 var vertex1 = inputTriangles[f].triangles[t][0];
//                 var vertex2 = inputTriangles[f].triangles[t][1];
//                 var vertex3 = inputTriangles[f].triangles[t][2];

//                 var vertexPos1 = inputTriangles[f].vertices[vertex1];
//                 var vertexPos2 = inputTriangles[f].vertices[vertex2];
//                 var vertexPos3 = inputTriangles[f].vertices[vertex3];
//                 //console.log("vertexPos1 " + vertexPos1);
//                 //console.log("vertexPos2 " + vertexPos2);
//                 //console.log("vertexPos3 " + vertexPos3);

//                 // triangle position on canvas

//                 var v1 = [w * vertexPos1[0], h * vertexPos1[1]];
//                 var v2 = [w * vertexPos2[0], h * vertexPos2[1]];
//                 var v3 = [w * vertexPos3[0], h * vertexPos3[1]];

//                 // calculate triangle area on canvas (shoelace formula)
//                 var triangleArea = 0.5 * Math.abs(v1[0] * v2[1] + v2[0] * v3[1] + v3[0] * v1[1] - v2[0] * v1[1] - v3[0] * v2[1] - v1[0] * v3[1]);
//                 var numTrianglePixels = triangleArea; // init num pixels in triangle
//                 //console.log("triangle area " + triangleArea);
//                 numTrianglePixels *= PIXEL_DENSITY; // percentage of triangle area to render to pixels
//                 numTrianglePixels = Math.round(numTrianglePixels);
//                 // console.log("numTrianglePixels " + numTrianglePixels);
//                 c.change(
//                     inputTriangles[f].material.diffuse[0] * 255,
//                     inputTriangles[f].material.diffuse[1] * 255,
//                     inputTriangles[f].material.diffuse[2] * 255,
//                     255); // triangle diffuse color
//                 for (var p = 0; p < numTrianglePixels; p++) {
//                     var point; // on canvas plane
//                     var triangleTest = 0;
//                     while (triangleTest == 0) { //if the pixel outside the triangle

//                         point = [Math.floor(Math.random() * w), Math.floor(Math.random() * h)];
//                         // plane checking

//                         var t1 = ((point[0] - v2[0]) * (v1[1] - v2[1]) - (v1[0] - v2[0]) * (point[1] - v2[1])) < 0.0;
//                         var t2 = ((point[0] - v3[0]) * (v2[1] - v3[1]) - (v2[0] - v3[0]) * (point[1] - v3[1])) < 0.0;
//                         var t3 = ((point[0] - v1[0]) * (v3[1] - v1[1]) - (v3[0] - v1[0]) * (point[1] - v1[1])) < 0.0;

//                         if ((t1 == t2) && (t2 == t3)) // draw the pixel if inside the triangle
//                             triangleTest = 1;
//                     }
//                     drawPixel(imagedata, point[0], point[1], c);
//                     //console.log("color: ("+c.r+","+c.g+","+c.b+")");
//                     //console.log("x: "+ x);
//                     //console.log("y: "+ y);
//                 } // end for pixels in triangle
//             } // end for triangles
//         } // end for files
//         context.putImageData(imagedata, 0, 0);
//     } // end if triangle file found
// } // end draw rand pixels in input triangles

// //draw 2d projections traingle from the JSON file at class github
// function drawInputTrainglesUsingPaths(context) {
//     var inputTriangles = getInputTriangles();

//     if (inputTriangles != String.null) {
//         var c = new Color(0, 0, 0, 0); // the color at the pixel: black
//         var w = context.canvas.width;
//         var h = context.canvas.height;
//         var n = inputTriangles.length;
//         //console.log("number of files: " + n);

//         // Loop over the input files
//         for (var f = 0; f < n; f++) {
//             var tn = inputTriangles[f].triangles.length;
//             //console.log("number of triangles in this files: " + tn);

//             // Loop over the triangles, draw each in 2d
//             for (var t = 0; t < tn; t++) {
//                 var vertex1 = inputTriangles[f].triangles[t][0];
//                 var vertex2 = inputTriangles[f].triangles[t][1];
//                 var vertex3 = inputTriangles[f].triangles[t][2];

//                 var vertexPos1 = inputTriangles[f].vertices[vertex1];
//                 var vertexPos2 = inputTriangles[f].vertices[vertex2];
//                 var vertexPos3 = inputTriangles[f].vertices[vertex3];
//                 //console.log("vertexPos1 " + vertexPos1);
//                 //console.log("vertexPos2 " + vertexPos2);
//                 //console.log("vertexPos3 " + vertexPos3);

//                 context.fillStyle =
//                     "rgb(" + Math.floor(inputTriangles[f].material.diffuse[0] * 255)
//                     + "," + Math.floor(inputTriangles[f].material.diffuse[1] * 255)
//                     + "," + Math.floor(inputTriangles[f].material.diffuse[2] * 255) + ")"; // diffuse color

//                 var path = new Path2D();
//                 path.moveTo(w * vertexPos1[0], h * vertexPos1[1]);
//                 path.lineTo(w * vertexPos2[0], h * vertexPos2[1]);
//                 path.lineTo(w * vertexPos3[0], h * vertexPos3[1]);
//                 path.closePath();
//                 context.fill(path);

//             } // end for triangles
//         } // end for files
//     } // end if triangle files found
// } // end draw input triangles

// // put random points in the boxes from the class github
// function drawRandPixelsInInputBoxes(context) {
//     var inputBoxes = getInputBoxes();
//     var w = context.canvas.width;
//     var h = context.canvas.height;
//     var imagedata = context.createImageData(w, h);
//     const PIXEL_DENSITY = 0.1;
//     var numCanvasPixels = (w * h) * PIXEL_DENSITY;

//     if (inputBoxes != String.null) {
//         var x = 0; var y = 0; // pixel coord init
//         var lx = 0; var rx = 0; // input lx, rx from boxes.json
//         var by = 0; var ty = 0; // input by, ty from boxes.json
//         var fz = 0; var rz = 0; // input fz, rz from boxes.json
//         var numBoxPixels = 0; // init num pixels in boxes
//         var c = new Color(0, 0, 0, 0); // init the box color
//         var n = inputBoxes.length; // the number of input boxes
//         //console.log("number of ellipses: " + n);

//         // Loop over the ellipsoids, draw rand pixels in each
//         for (var b = 0; b < n; b++) {
//             // input lx,rx,by,ty on canvas
//             lx = w * inputBoxes[b].lx;
//             rx = w * inputBoxes[b].rx;
//             by = h * inputBoxes[b].by;
//             ty = h * inputBoxes[b].ty;

//             numBoxesPixels = (rx - lx) * (ty - by); // projected box area
//             numBoxesPixels *= PIXEL_DENSITY;  // percentage of box area to render to pixels
//             numBoxesPixels = Math.round(numBoxesPixels);

//             //console.log("num box pixels: "+numBoxesPixels);

//             c.change(
//                 inputBoxes[b].diffuse[0] * 255,
//                 inputBoxes[b].diffuse[1] * 255,
//                 inputBoxes[b].diffuse[2] * 255,
//                 255); // box diffuse color
//             for (var p = 0; p < numBoxesPixels; p++) {
//                 do {
//                     x = Math.floor(Math.random() * w);
//                     y = Math.floor(Math.random() * h);
//                 } while (x < lx || x > rx || y > ty || y < by) // inside the projection
//                 drawPixel(imagedata, x, y, c);
//                 //console.log("color: ("+c.r+","+c.g+","+c.b+")");
//                 //console.log("x: " + x);
//                 //console.log("y: " + y);
//             } // end for pixels in box
//         } // end for boxes
//         context.putImageData(imagedata, 0, 0);
//     } // end if boxes found
// } // end draw rand pixels in input boxes

// //draw 2d projections boxes from the JSON file at class github
// function drawInputBoxesUsingPaths(context) {
//     var inputBoxes = getInputBoxes();
//     var n = inputBoxes.length; // the number of input boxes

//     if (inputBoxes != String.null) {
//         var w = context.canvas.width;
//         var h = context.canvas.height;
//         var c = new Color(0, 0, 0, 0); // the color at the pixel: black
//         var x = 0; var y = 0; // pixel coord init
//         var lx = 0; var rx = 0; // input lx, rx from boxes.json
//         var by = 0; var ty = 0; // input by, ty from boxes.json
//         var fz = 0; var rz = 0; // input fz, rz from boxes.json
//         //console.log("number of files: " + n);

//         // Loop over the input files
//         for (var b = 0; b < n; b++) {

//             // input lx,rx,by,ty on canvas
//             lx = w * inputBoxes[b].lx;
//             rx = w * inputBoxes[b].rx;
//             by = h * inputBoxes[b].by;
//             ty = h * inputBoxes[b].ty;

//             context.fillStyle =
//                 "rgb(" + Math.floor(inputBoxes[b].diffuse[0] * 255)
//                 + "," + Math.floor(inputBoxes[b].diffuse[1] * 255)
//                 + "," + Math.floor(inputBoxes[b].diffuse[2] * 255) + ")"; // diffuse color

//             var path = new Path2D();
//             path.moveTo(lx, ty);
//             path.lineTo(lx, by);
//             path.lineTo(rx, by);
//             path.lineTo(rx, ty);
//             path.closePath();
//             context.fill(path);

//         } // end for files
//     } // end if box files found
// } // end draw input boxes

// //helper function(s)
// function degToRad(degrees) {
//     return (degrees * Math.PI) / 180;
// }

// function fillWithColor(context, r, g, b) {
//     let c = hexColor(r, g, b);
//     context.fillStyle = c;
//     context.fill();
// }

// //put random points in the triangles from the class github
// function drawAllPixelsInInputTriangles(context) {
//     var inputTriangles = getInputTriangles();
//     var w = context.canvas.width;
//     var h = context.canvas.height;
//     var imagedata = context.createImageData(w, h);
//     const PIXEL_DENSITY = 20;
//     var numCanvasPixels = (w * h) * PIXEL_DENSITY;

//     if (inputTriangles != String.null) {
//         var x = 0; var y = 0; // pixel coord init
//         var cx = 0; var cy = 0; // init center x and y coord
//         var numTrianglePixels = 0; // init num pixels in triangle
//         var c = new Color(0, 0, 0, 0); // init the triangle color
//         var n = inputTriangles.length; // the number of input files
//         //console.log("number of files: " + n);

//         // Loop over the triangles, draw rand pixels in each
//         for (var f = 0; f < n; f++) {
//             var tn = inputTriangles[f].triangles.length;
//             //console.log("number of triangles in this files: " + tn);

//             // Loop over the triangles, draw each in 2d
//             for (var t = 0; t < tn; t++) {
//                 var vertex1 = inputTriangles[f].triangles[t][0];
//                 var vertex2 = inputTriangles[f].triangles[t][1];
//                 var vertex3 = inputTriangles[f].triangles[t][2];

//                 var vertexPos1 = inputTriangles[f].vertices[vertex1];
//                 var vertexPos2 = inputTriangles[f].vertices[vertex2];
//                 var vertexPos3 = inputTriangles[f].vertices[vertex3];
//                 //console.log("vertexPos1 " + vertexPos1);
//                 //console.log("vertexPos2 " + vertexPos2);
//                 //console.log("vertexPos3 " + vertexPos3);



//                 // triangle position on canvas

//                 var v1 = [w * vertexPos1[0], h * vertexPos1[1]];
//                 var v2 = [w * vertexPos2[0], h * vertexPos2[1]];
//                 var v3 = [w * vertexPos3[0], h * vertexPos3[1]];

//                 // calculate triangle area on canvas (shoelace formula)
//                 var triangleArea = 0.5 * Math.abs(v1[0] * v2[1] + v2[0] * v3[1] + v3[0] * v1[1] - v2[0] * v1[1] - v3[0] * v2[1] - v1[0] * v3[1]);
//                 var numTrianglePixels = triangleArea; // init num pixels in triangle
//                 //console.log("triangle area " + triangleArea);
//                 numTrianglePixels *= PIXEL_DENSITY; // percentage of triangle area to render to pixels
//                 numTrianglePixels = Math.round(numTrianglePixels);
//                 // console.log("numTrianglePixels " + numTrianglePixels);
//                 c.change(
//                     inputTriangles[f].material.diffuse[0] * 255,
//                     inputTriangles[f].material.diffuse[1] * 255,
//                     inputTriangles[f].material.diffuse[2] * 255,
//                     255); // triangle diffuse color
//                 for (var p = 0; p < numTrianglePixels; p++) {
//                     var point; // on canvas plane
//                     var triangleTest = 0;
//                     while (triangleTest == 0) { //if the pixel outside the triangle

//                         point = [Math.floor(Math.random() * w), Math.floor(Math.random() * h)];
//                         // plane checking

//                         var t1 = ((point[0] - v2[0]) * (v1[1] - v2[1]) - (v1[0] - v2[0]) * (point[1] - v2[1])) < 0.0;
//                         var t2 = ((point[0] - v3[0]) * (v2[1] - v3[1]) - (v2[0] - v3[0]) * (point[1] - v3[1])) < 0.0;
//                         var t3 = ((point[0] - v1[0]) * (v3[1] - v1[1]) - (v3[0] - v1[0]) * (point[1] - v1[1])) < 0.0;

//                         if ((t1 == t2) && (t2 == t3)) // draw the pixel if inside the triangle
//                             triangleTest = 1;
//                     }

//                     c.change(
//                         255,
//                         0,
//                         0,
//                         255); // triangle diffuse color
//                     drawPixel(imagedata, point[0], point[1], c);
//                     //console.log("color: ("+c.r+","+c.g+","+c.b+")");
//                     //console.log("x: "+ x);
//                     //console.log("y: "+ y);
//                 } // end for pixels in triangle
//             } // end for triangles
//         } // end for files
//         context.putImageData(imagedata, 0, 0);
//     } // end if triangle file found
// } // end draw all pixels in input triangles



// //draw the triangles from the class github
// function drawAllTriangles(context) {
//     //const vertexBuffer = gl.createBuffer();
//     //gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
//     var inputTriangles = getInputTriangles();
//     var w = context.canvas.width;
//     var h = context.canvas.height;
//     var imagedata = context.createImageData(w, h);
//     const PIXEL_DENSITY = 0.1;
//     var numCanvasPixels = (w * h) * PIXEL_DENSITY;

//     if (inputTriangles != String.null) {
//         var x = 0; var y = 0; // pixel coord init
//         var cx = 0; var cy = 0; // init center x and y coord
//         var numTrianglePixels = 0; // init num pixels in triangle
//         var c = new Color(0, 0, 0, 0); // init the triangle color
//         var n = inputTriangles.length; // the number of input files
//         //console.log("number of files: " + n);

//         // Loop over the triangles, draw rand pixels in each
//         for (var f = 0; f < n; f++) {
//             var tn = inputTriangles[f].triangles.length;
//             //console.log("number of triangles in this files: " + tn);

//             // Loop over the triangles, draw each in 2d
//             for (var t = 0; t < tn; t++) {
//                 var vertex1 = inputTriangles[f].triangles[t][0];
//                 var vertex2 = inputTriangles[f].triangles[t][1];
//                 var vertex3 = inputTriangles[f].triangles[t][2];

//                 var vertexPos1 = inputTriangles[f].vertices[vertex1];
//                 var vertexPos2 = inputTriangles[f].vertices[vertex2];
//                 var vertexPos3 = inputTriangles[f].vertices[vertex3];
//                 //console.log("vertexPos1 " + vertexPos1);
//                 //console.log("vertexPos2 " + vertexPos2);
//                 //console.log("vertexPos3 " + vertexPos3);

//                 // triangle position on canvas

//                 var v1 = [w * vertexPos1[0], h * vertexPos1[1]];
//                 var v2 = [w * vertexPos2[0], h * vertexPos2[1]];
//                 var v3 = [w * vertexPos3[0], h * vertexPos3[1]];


//                 // calculate triangle area on canvas (shoelace formula)
//                 var triangleArea = 0.5 * Math.abs(v1[0] * v2[1] + v2[0] * v3[1] + v3[0] * v1[1] - v2[0] * v1[1] - v3[0] * v2[1] - v1[0] * v3[1]);
//                 var numTrianglePixels = triangleArea; // init num pixels in triangle
//                 //console.log("triangle area " + triangleArea);
//                 numTrianglePixels *= PIXEL_DENSITY; // percentage of triangle area to render to pixels
//                 numTrianglePixels = Math.round(numTrianglePixels);
//                 // console.log("numTrianglePixels " + numTrianglePixels);
//                 c.change(
//                     inputTriangles[f].material.diffuse[0] * 255,
//                     inputTriangles[f].material.diffuse[1] * 255,
//                     inputTriangles[f].material.diffuse[2] * 255,
//                     255); // triangle diffuse color
//                 for (var p = 0; p < numTrianglePixels; p++) {
//                     var point; // on canvas plane
//                     var triangleTest = 0;
//                     while (triangleTest == 0) { //if the pixel outside the triangle

//                         point = [Math.floor(Math.random() * w), Math.floor(Math.random() * h)];
//                         // plane checking

//                         var t1 = ((point[0] - v2[0]) * (v1[1] - v2[1]) - (v1[0] - v2[0]) * (point[1] - v2[1])) < 0.0;
//                         var t2 = ((point[0] - v3[0]) * (v2[1] - v3[1]) - (v2[0] - v3[0]) * (point[1] - v3[1])) < 0.0;
//                         var t3 = ((point[0] - v1[0]) * (v3[1] - v1[1]) - (v3[0] - v1[0]) * (point[1] - v1[1])) < 0.0;

//                         if ((t1 == t2) && (t2 == t3)) // draw the pixel if inside the triangle
//                             triangleTest = 1;
//                     }
//                     drawPixel(imagedata, point[0], point[1], c);
//                     //console.log("color: ("+c.r+","+c.g+","+c.b+")");
//                     //console.log("x: "+ x);
//                     //console.log("y: "+ y);
//                 } // end for pixels in triangle
//             } // end for triangles
//         } // end for files
//         context.putImageData(imagedata, 0, 0);
//     } // end if triangle file found
// } // end draw rand pixels in input triangles



// //draws a small cube of pixels of a given color (c) with the middle at x,y
// function draw3X3PixelCube(imagedata, x, y, c) {
//     //middle row
//     drawPixel(imagedata, x - 1, y, c);
//     drawPixel(imagedata, x, y, c);
//     drawPixel(imagedata, x + 1, y, c);

//     drawPixel(imagedata, x - 1, y - 1, c);
//     drawPixel(imagedata, x, y - 1, c);
//     drawPixel(imagedata, x + 1 - 1, y, c);

//     drawPixel(imagedata, x - 1, y + 1, c);
//     drawPixel(imagedata, x, y + 1, c);
//     drawPixel(imagedata, x + 1 + 1, y, c);
// }

// //draws a small cube of pixels of a given color (c) with the middle at x,y
// function drawWidthXHeightPixelRectangle(imagedata, x, y, c, width, height) {
//     let widthEnd = x + width;
//     let heightEnd = y + height;
//     for (let i = x; i < widthEnd; i++) {
//         for (let j = y; j < heightEnd; j++) {
//             //middle row
//             drawPixel(imagedata, i, j, c);
//         }
//     }

// }

// //helper cross product function
// function crossProduct(a, b) {
//     const crossedProduct = vec3.create();
//     return vec3.cross(crossedProduct, a, b); //returns crossedProduct

// }

// //helper cross product function for self cross
// function crossProductWithSelf(a) {
//     const crossedProduct = vec3.create();
//     return vec3.cross(crossedProduct, a, a); //returns crossedProduct

// }


// //helper dot product function
// function dotProductV3(a, b) {
//     return vec3.dot(a, b);
// }

// //helper dot product function for self cross
// function dotProductWithSelfV3(a) {
//     const dotProduct = vec3.create();
//     return vec3.dot(dotProduct, a, a);
// }

// //helper dot product function for self cross
// function addVectorsV3(a, b) {
//     const addedProduct = vec3.create();
//     return vec3.dot(addedProduct, a, a);
// }

// // function pixelRealWorldXLocation(context, pixelLocation) {
// //     //get numbers of pixel on screen
// //     var maxX = context.width;

// //     return pixelLocation / numberOfPixels;
// // }

// /**
//  * translates a x and y pixel location to real world position
//  * @param {number} xPix is the x location of the input pixel on the screen
//  * @param {number} yPix is the y location of the input pixel on the screen
//  * @param {number} lastXPixel is the x location of the last pixel position horizontally on the screen
//  * @param {number} lastYPixel is the y location of the lst pixel position vertically on the screen
//  * @returns {Vector3} real world position of pixel as vector3
//  */
// function translatePixelNumbersToLocation(xPix, yPix, lastXPixel, lastYPixel) {
//     //window is centered at .5 .5 0 with edges of LL: 00, UL: 01, LR: 10, UR: 11
//     //pixel location over distance
//     const realPixelXVal = xPix / lastXPixel;

//     //const realPixelYVal = 1 - (yPix / lastYPixel);
//     const realPixelYVal = yPix / lastYPixel;

//     //the z val will always be 0 because window square is centered at .5 .5 0
//     //UL: 0,1,0
//     //UR: 1,1,0
//     //BL: 0,0,0
//     //BR: 1,0,0



//     let realPixelLocation = new Vector3(realPixelXVal, realPixelYVal, 0);


//     return realPixelLocation;
// }

// /**
//  * checks for intersection of object and returns distance between them
//  * @param {Vector3} rayDirectionVector direction vector from eye through pixel to cast
//  * @param {*} object to be potentially hit with ray
//  */
// function rayIntersectObjectDist(rayDirectionVector, object) {
//     //if no intersection is found then return infinity
//     let returnDist = Infinity;

//     //MATH TIME!!!


//     //return distance that ray intersects object
//     return returnDist;
// }

// function closestIntersection(object) {
//     let retDist = objectClosestIntersectionMap.get(object)
//     if (retDist == undefined) {
//         //if never intersected before then closest previous is infinity
//         return Infinity;
//     }
//     //otherwise return the distance of the closest previous intersection
//     return retDist;

// }

// // //helper function to get direction vector via vector subtract call
// // function getDirectionVector(eye, pixel) {
// //     //just subtract vectors
// //     return THREE.subVectors(pixel, eye);
// // }

// /**
//  * shoots raycasts to record intersections and colors of objects hit by rays
//  * @param {CanvasRenderingContext2D} context
//  */
// function shootRaycasts(context) {

//     //bottom left is 0,0
//     //var maxX = context.canvas.getBoundingClientRect().width;
//     //var maxY = context.canvas.getBoundingClientRect().height;

//     var inputTriangles = getInputTriangles();
//     var w = context.canvas.width;
//     var h = context.canvas.height;
//     var imagedata = context.createImageData(w, h);
//     // For each screen pixel
//     // for (let xPix = 0; xPix < maxX; xPix++) {
//     //     for (let yPix = 0; yPix < maxY; yPix++) {
//     //         console.log("testOutput");
//     //         // Find the ray from the eye through the pixel
//     //         let pixelLocation = translatePixelNumbersToLocation(xPix, yPix, maxX, maxY);
//     //         let rayDirectionVector = pixelLocation.subtract(eyeVector); //pixel - eye = ray direction
//     //         // For each object in the scene
//     //         for (let object of sceneObjects) {
//     //             //gets dist to intersection
//     //             let intersectionDist = rayIntersectObjectDist(rayDirectionVector, object);
//     //             if (intersectionDist != Infinity && intersectionDist < closestIntersection(object)) { // If the ray intersects the object, and is closest so far
//     //                 // Record intersection and object (whole object or location of intersection or what? make new class?)
//     //                 // Find color (and draw maybe?) for closest intersection
//     //             }
//     //             else {
//     //                 //draw black for the miss?
//     //             }

//     //         }

//     //     }
//     // }



//     //** if t < 1 then in front of pixel and don't render **

// }


// //helper function to update shader color
// function updateColor(gl, shaderProgram, colorUniformLocation, r, g, b, a) {
//     gl.useProgram(shaderProgram);
//     gl.uniform4f(colorUniformLocation, r, g, b, a);
// }

// //draw 2d projections traingle via gl from the JSON file at class github
// function drawInputTrainglesUsingPathsGL(gl) {
//     var c = new Color(0, 0, 0, 0); // init the triangle color
//     var inputTriangles = getAllInputTriangles();
//     if (!gl) {
//         console.error('WebGL not supported, falling back on experimental-webgl');
//         gl = canvas.getContext('experimental-webgl');
//     }

//     if (!gl) {
//         alert('Your browser does not support WebGL');
//         return;
//     }

//     // Define the vertex shader
//     const vertexShaderSource = `
//         attribute vec4 coordinates;
//         void main(void) {
//             gl_Position = coordinates;
//         }
//     `;
//     const vertexShader = gl.createShader(gl.VERTEX_SHADER);
//     gl.shaderSource(vertexShader, vertexShaderSource);
//     gl.compileShader(vertexShader);
//     if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
//         console.error('An error occurred compiling the vertex shader:', gl.getShaderInfoLog(vertexShader));
//         return;
//     }

//     // Define the fragment shader
//     const fragmentShaderSource = `
//             precision mediump float;
//             uniform vec4 uColor;
//             void main(void) {
//                 gl_FragColor = uColor;
//             }
//         `;
//     const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
//     gl.shaderSource(fragmentShader, fragmentShaderSource);
//     gl.compileShader(fragmentShader);
//     if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
//         console.error('An error occurred compiling the fragment shader:', gl.getShaderInfoLog(fragmentShader));
//         return;
//     }

//     // Create and link the shader program
//     const shaderProgram = gl.createProgram();
//     gl.attachShader(shaderProgram, vertexShader);
//     gl.attachShader(shaderProgram, fragmentShader);
//     gl.linkProgram(shaderProgram);
//     if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
//         console.error('Unable to initialize the shader program:', gl.getProgramInfoLog(shaderProgram));
//         return;
//     }
//     gl.useProgram(shaderProgram);

//     // Create a buffer and put the vertices in it
//     const vertexBuffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

//     // Bind the vertex buffer and set the attribute pointers
//     const coord = gl.getAttribLocation(shaderProgram, 'coordinates');
//     gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
//     gl.enableVertexAttribArray(coord);

//     // Create and bind the index buffer
//     const indexBuffer = gl.createBuffer();
//     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

//     // Get the location of the color uniform
//     const colorUniformLocation = gl.getUniformLocation(shaderProgram, "uColor");

//     //empty background before render/draw
//     gl.clearColor(0.0, 0.0, 0.0, 1.0); // black background
//     gl.clear(gl.COLOR_BUFFER_BIT);
//     // Initialize empty arrays for vertices and indices
//     //let vertices = [];
//     //let indices = [];
//     let indexOffset = 0;

//     if (inputTriangles != null) {
//         var n = inputTriangles.length;// Loop over the triangles, draw each in 2D


//         // Loop over the triangles, draw each in 2D
//         for (var f = 0; f < n; f++) {
//             var tn = inputTriangles[f].triangles.length;

//             for (var t = 0; t < tn; t++) {
//                 var vertex1 = inputTriangles[f].triangles[t][0];
//                 var vertex2 = inputTriangles[f].triangles[t][1];
//                 var vertex3 = inputTriangles[f].triangles[t][2];

//                 var vertexPos1 = inputTriangles[f].vertices[vertex1];
//                 var vertexPos2 = inputTriangles[f].vertices[vertex2];
//                 var vertexPos3 = inputTriangles[f].vertices[vertex3];

//                 // Push vertices to the array
//                 // vertices.push(vertexPos1[0], vertexPos1[1], vertexPos1[2]);
//                 // vertices.push(vertexPos2[0], vertexPos2[1], vertexPos2[2]);
//                 // vertices.push(vertexPos3[0], vertexPos3[1], vertexPos3[2]);

//                 //updates the color drawn before uploaded to gpu
//                 updateColor(gl, shaderProgram, colorUniformLocation, inputTriangles[f].material.diffuse[0] * 255,
//                     inputTriangles[f].material.diffuse[1] * 255,
//                     inputTriangles[f].material.diffuse[2] * 255,
//                     255); // triangle diffuse color

//                 // Define vertices and indices for the current triangle
//                 const vertices = new Float32Array([
//                     vertexPos1[0], vertexPos1[1], vertexPos1[2],
//                     vertexPos2[0], vertexPos2[1], vertexPos2[2],
//                     vertexPos3[0], vertexPos3[1], vertexPos3[2]
//                 ]);

//                 //TODO: fix/update this?
//                 const indices = new Uint16Array([0, 1, 2]);
//                 //upload and render vertex and index buffer
//                 try {
//                     // Convert the array to a Float32Array and upload it to the GPU
//                     const verticesFloat32Array = new Float32Array(vertices);
//                     console.log('Float32Array:', verticesFloat32Array);
//                     gl.bufferData(gl.ARRAY_BUFFER, verticesFloat32Array, gl.STATIC_DRAW);

//                     // Upload the index data
//                     gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

//                     // Draw the triangles
//                     //gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 3);
//                     // Draw the current triangle
//                     gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
//                 } catch (e) {
//                     console.error('Error converting vertices to Float32Array:', e);
//                 }
//             }
//         }

//         //currently drawing each loop
//         // try {
//         //     // Convert the array to a Float32Array and upload it to the GPU
//         //     const verticesFloat32Array = new Float32Array(vertices);
//         //     console.log('Float32Array:', verticesFloat32Array);

//         //     // Upload the index data
//         //     gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

//         //     // Draw the triangles
//         //     gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 3);
//         // } catch (e) {
//         //     console.error('Error converting vertices to Float32Array:', e);
//         // }

//         //should I buffer everything then render or render each loop?
//     }




//     // Check for errors
//     const error = gl.getError();
//     if (error !== gl.NO_ERROR) {
//         console.error('WebGL error:', error);
//     }
// } // end of draw triangles via webgl vertex buffer

// //function to create dynamic canvas resize
// function resizeCanvasToDisplaySize(canvas) {
//     const displayWidth = canvas.clientWidth;
//     const displayHeight = canvas.clientHeight;

//     if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
//         canvas.width = displayWidth;
//         canvas.height = displayHeight;
//     }
// }


// /* main -- here is where execution begins after window load */

// function main() {

//     // Get the canvas and context
//     var canvas = document.getElementById("viewport");
//     const gl = canvas.getContext('webgl');
//     var context = canvas.getContext("2d");


//     // Handle window resize (rerender stuff)
//     // window.addEventListener('resize', () => {
//     //     var canvas = document.getElementById("viewport");
//     //     resizeCanvasToDisplaySize(canvas);
//     //     var gl = canvas.getContext("webgl");
//     //     gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
//     //     drawAllTrianglesGL(gl);
//     // });


//     //     // Create the image
//     //     //drawRandPixels(context);
//     //     // shows how to draw pixels

//     //     //drawRandPixelsInInputEllipsoids(context);
//     //     // shows how to draw pixels and read input file

//     //     //drawInputEllipsoidsUsingArcs(context);
//     //     // shows how to read input file, but not how to draw pixels

//     drawRandPixelsInInputTrianglesWith3x3(context);
//     //     //drawRandPixelsInInputTriangles(context);
//     //     // shows how to draw pixels and read input file

//     //     //drawInputTrainglesUsingPaths(context);
//     //     // shows how to read input file, but not how to draw pixels

//     //     //drawRandPixelsInInputBoxes(context);
//     //     // shows how to draw pixels and read input file

//     //     //drawInputBoxesUsingPaths(context);
//     //     // shows how to read input file, but not how to draw pixels

//     //     //fill in all pixels in context
//     //     //drawAllPixelsInInputTriangles(context);

//     //     //drawAllTriangles(context);

//     //     const gl = canvas.getContext("webgl");
//     //     //drawAllTrianglesGL(gl);

//     //     drawInputTrainglesUsingPathsGL(context, gl);

//     //shootRaycasts(context);
//     // Get the canvas element and initialize WebGL context
//     //const canvas = document.getElementById('viewport');

//     //drawInputTrainglesUsingPathsGL(gl);


// }

// // Call the main function to execute the WebGL code
// //main();
