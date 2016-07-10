var canvas = document.createElement('canvas');

renderer = new THREE.CanvasRenderer();

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight,
    0.1,
    100000
);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

document.addEventListener( 'mousedown', onDocumentMouseDown, false );
document.addEventListener( 'touchstart', onDocumentTouchStart, false );
document.addEventListener( 'touchmove', onDocumentTouchMove, false );

window.addEventListener( 'resize', onWindowResize, false );

var targetRotationX = 0;
var targetRotationOnMouseDownX = 0;
var targetRotationY = 0;
var targetRotationOnMouseDownY = 0;
var currRotationX = 0;
var currRotationY = 0;

var mouseX = 0;
var mouseY = 0;
var mouseXOnMouseDown = 0;
var mouseYOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseDown(event) {
    event.preventDefault();

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    document.addEventListener('mouseout', onDocumentMouseOut, false);

    mouseXOnMouseDown = event.clientX - windowHalfX;
    mouseYOnMouseDown = event.clientY - windowHalfY;
    targetRotationOnMouseDownY = targetRotationY;
    targetRotationOnMouseDownX = targetRotationX;
}

var accuracy = 3;

function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
    targetRotationX = targetRotationOnMouseDownX + (mouseX - mouseXOnMouseDown) * accuracy;
    targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * accuracy;
}

function onDocumentMouseUp(event) {
    document.removeEventListener('mousemove', onDocumentMouseMove, false);
    document.removeEventListener('mouseup', onDocumentMouseUp, false);
    document.removeEventListener('mouseout', onDocumentMouseOut, false);
}

function onDocumentMouseOut(event) {
    document.removeEventListener('mousemove', onDocumentMouseMove, false);
    document.removeEventListener('mouseup', onDocumentMouseUp, false);
    document.removeEventListener('mouseout', onDocumentMouseOut, false);
}

function onDocumentTouchStart(event) {
    if (event.touches.length === 1) {
        event.preventDefault();
        mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
        mouseYOnMouseDown = event.touches[ 0 ].pageY - windowHalfY;
        targetRotationOnMouseDownY = targetRotationY;
        targetRotationOnMouseDownX = targetRotationX;
    }
}

function onDocumentTouchMove(event) {
    if (event.touches.length === 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;
        targetRotationX = targetRotationOnMouseDownX + (mouseX - mouseXOnMouseDown) * accuracy;
        targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * accuracy;
    }
}

var originalGeometry = new THREE.Geometry();

var test = 0;
var steps = 256;//64;
var radius = Math.min(windowHalfX, windowHalfY) / 0.05;

for(var i = 0; i < steps; i += 1) {
    for(var j = 0; j < steps; j += 1) {
        originalGeometry.vertices.push(new THREE.Vector3( radius * 8 * ( - 1 / 2 + i / steps), radius * 8 * ( - 1 / 2 + j / steps), 0));
    }
}

var vis = [];
var s = function(i, j, r) {
    if(i >= steps / 2) {
        i -= steps / 2;
    }
    if(j >= steps / 2) {
        j -= steps / 2;
    }
    vis[j + i * steps] = 123;
    originalGeometry.vertices[j + i * steps].z = r;
    originalGeometry.vertices[j + steps / 2 + i * steps].z = r;
    originalGeometry.vertices[j + (i + steps / 2) * steps].z = r;
    originalGeometry.vertices[j + steps / 2 + (i + steps / 2) * steps].z = r;
}

var g = function(x, y, v) {
    if(x >= steps / 2) {
        x -= steps / 2;
    }
    if(y >= steps / 2) {
        y -= steps / 2;
    }
    if(v === 'vis') {
        return vis[y + x * steps] !== 123;
    }
    return originalGeometry.vertices[y + x * steps].z;
}

var smoothness = 1.5;
var roughness = 1;
var terr = function(x0, y0, x2, y2) {
    if(x2 - x0 > 1) {
        var scale = (x2 - x0) * radius / steps;
        var x1 = Math.floor((x0 + x2) / 2);
        var y1 = Math.floor((y0 + y2) / 2);
        var ran = (0.5 - Math.random());
        if(g(x1, y0, 'vis')) {
            s(x1, y0, (g(x0, y0) + g(x2, y0)) / 2 + scale * ran * smoothness);
        }
        if(g(x0, y1, 'vis')) {
            s(x0, y1, (g(x0, y0) + g(x0, y2)) / 2 + scale * ran * smoothness);
        }
        if(g(x1, y1, 'vis')) {
            s(x1, y1, (g(x0, y0) + g(x2, y0) + g(x0, y2) + g(x2, y2)) / 4 + scale * ran * smoothness);
        }
        if(g(x1, y2, 'vis')) {
            s(x1, y2, (g(x0, y2) + g(x2, y2)) / 2 + scale * ran * smoothness);
        }
        if(g(x2, y1, 'vis')) {
            s(x2, y1, (g(x2, y0) + g(x2, y2)) / 2 + scale * ran * smoothness);
        }
        terr(x0, y0, x1, y1);
        terr(x1, y0, x2, y1);
        terr(x0, y1, x1, y2);
        terr(x1, y1, x2, y2);
    }
}

terr(0, 0, steps / 2, steps / 2);

for(var i = 0; i < steps - 1; i += 1) {
    for(var j = 0; j < steps - 1; j += 1) {
        var c = j + i * steps;
        originalGeometry.faces.push(new THREE.Face3(c + 1, c, c + steps));
        originalGeometry.faces.push(new THREE.Face3(c + steps, c + steps + 1, c + 1));
    }
}

originalGeometry.computeBoundingSphere();

var material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
//var material = new THREE.MeshBasicMaterial({color: 0x999999});

//var material = new THREE.MeshLambertMaterial({color: 0xcccccc, overdraw: 0.5})//x, wireframe: true});
//FIXME: light model.. 

var obj = new THREE.Mesh(originalGeometry.clone(), material);
scene.add(obj);

function remesh() {
    for(var i = 0; i < steps; i += 1) {
        for(var j = 0; j < steps; j += 1) {
            var c = j + i * steps;
            var ox = originalGeometry.vertices[c].x + currRotationX;
            var oy = originalGeometry.vertices[c].y - currRotationY;
            var oz = originalGeometry.vertices[c].z * roughness;
            var d2 = ox * ox + oy * oy;
            var r2 = radius * radius;
            obj.geometry.vertices[c].x = ox + oz / radius * ox;
            obj.geometry.vertices[c].y = oy + oz / radius * oy;
            obj.geometry.vertices[c].z = oz;
            if(!test){
            if(d2 < r2) {
                obj.geometry.vertices[c].z = Math.sqrt(r2 - d2) + oz / radius * Math.sqrt(r2 - d2);
            } else if(d2 < 2 * r2){
                var d = Math.sqrt(d2);
                obj.geometry.vertices[c].x = (2 * radius / Math.sqrt(d2) - 1) * ox + oz / radius * ox;
                obj.geometry.vertices[c].y = (2 * radius / Math.sqrt(d2) - 1) * oy + oz / radius * oy;
                var d2p = obj.geometry.vertices[c].x * obj.geometry.vertices[c].x + obj.geometry.vertices[c].y * obj.geometry.vertices[c].y;
                obj.geometry.vertices[c].z = - Math.sqrt(r2 - d2p) + oz / radius * Math.sqrt(r2 - d2);
            } else {
                obj.geometry.vertices[c].x = 0;
                obj.geometry.vertices[c].y = 0;
                obj.geometry.vertices[c].z = 0;
            }}
        }
    }
}

//camera.position.z = windowHalfX + windowHalfY;
camera.position.z = radius * 1.5;

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
    //obj.rotation.y += (targetRotationX - obj.rotation.y) * 0.03;
    currRotationX += (targetRotationX - currRotationX) * 0.3;
    currRotationY += (targetRotationY - currRotationY) * 0.3;
    while(currRotationX > 2 * radius) {
        targetRotationOnMouseDownX -= 4 * radius;
        targetRotationX -= 4 * radius;
        currRotationX -= 4 * radius;
    }
    while(currRotationX < - 2 * radius) {
        targetRotationOnMouseDownX += 4 * radius;
        targetRotationX += 4 * radius;
        currRotationX += 4 * radius;
    }
    while(currRotationY > 2 * radius) {
        targetRotationOnMouseDownY -= 4 * radius;
        targetRotationY -= 4 * radius;
        currRotationY -= 4 * radius;
    }
    while(currRotationY < - 2 * radius) {
        targetRotationOnMouseDownY += 4 * radius;
        targetRotationY += 4 * radius;
        currRotationY += 4 * radius;
    }
    targetRotationX += 1.0;
    remesh();
    renderer.render(scene, camera);
}

animate();

camera.rotation.x += Math.PI / 4;


