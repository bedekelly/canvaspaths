/**
 * Draw a path on the given canvas context.
 * @param path A Path2D object to draw.
 * @param context A 2D canvas context on which to draw.
 */
function drawPath(path, context) {
    context.lineWidth = 5;
    context.strokeStyle = "blue";
    context.stroke(path._path2d);
}