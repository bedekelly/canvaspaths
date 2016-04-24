/**
 * A Path here is a restricted version of a Path2D with only methods for
 * lines and arcs available. This is because I don't know how to generate
 * points on quadratic or cubic bezier curves, ellipses etc.
 * @constructor
 */
var Path = function() {
    this.segments = [];
    this._path2d = new Path2D();
};


Path.prototype = {
    arc: function(x, y, radius, startAngle, endAngle, anticlockwise) {
        this.segments.push(new PathSegment({
            type: "arc",
            args: {x: x, y: y, radius: radius, startAngle: startAngle, endAngle: endAngle, anticlockwise: anticlockwise}
        }));
        this._path2d.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    },

    lineTo: function(x, y) {
        var lastSeg = this.segments[this.segments.length-1];
        this.segments.push(new PathSegment({
            type: "lineTo",
            args: {startX: lastSeg.endX, startY: lastSeg.endY, endX: x, endY: y}
        }));
        this._path2d.lineTo(x, y);
    },

    moveTo: function(x, y) {
        this.segments.push(new PathSegment({
            type: "moveTo",
            args: {x: x, y: y}
        }));
        this._path2d.moveTo(x, y);
    },

    /**
     * Delegate to the relevant segment in our path to find info like angle and
     * X, Y coords at a given point.
     * @param length The length along the path our point should be.
     * @param reverse Whether we're traversing this path in reverse.
     * @returns {*} x, y, angle: coords and the angle of the point at the given distance.
     */
    getInfoAtLength: function(length, reverse) {
        var lengthSoFar = 0;

        // If we're traversing the path in reverse, the segments should be in
        // reverse order accordingly.
        var segments = Array.from(this.segments);
        if (reverse) segments.reverse();

        for (var i = 0; i < segments.length; i++) {
            var segment = this.segments[i];
            if (segment.length + lengthSoFar > length) break;
            else {
                lengthSoFar += segment.length;
            }
        }

        return segment.getInfoAtLength(length - lengthSoFar, reverse);
    },

    /**
     * Draw this path on the given context. We just do this by drawing each
     * component segment of this path.
     * @param context A Canvas 2D context to draw our path on.
     */
    draw: function(context) {
        context.stroke(this._path2d);
    },

    /**
     * Returns this path's total length by summing its component segments.
     */
    getLength: function() {
        var length = 0;
        for (var i=0; i<this.segments.length; i++) {
            length += this.segments[i].length;
        }
    }
};