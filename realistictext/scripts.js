$(document).ready(function() {
    var steps = 8;
    var blur = 1;
    var opacity = (1 / steps) + 0;
    var original = $('.original').css('opacity', opacity);
    var content = original.html();
    var usingCam = 0;
    
    for(var i = 0; i < steps; i ++ ) {
        $('<div/>')
            .addClass('realistic blur')
            .html(content)
            .css('opacity', opacity)
            .insertBefore(original);
    }
    var viewX = document.body.clientWidth / 2;
    var viewY = document.body.clientHeight / 2;
    function render(x, y) {
        viewX = x || viewX;
        viewY = y || viewY;
        $('.placeholder').height($('.realistic').outerHeight() + 150);
        $('.placeholder').width($('.realistic').outerWidth());
        var start = - blur;
        var step = (blur * 2) / steps;
        if(usingCam) {
            $('.realistic').each(function(i) {
                $(this).css({
                    transformOrigin: '50% ' + ($(document).scrollTop() - 100 + viewY / 150 * document.body.clientHeight) + 'px',
                    transform: 'translateY(' + (- $(document).scrollTop() - 100) + 'px) rotateX(' + (start + (step * i)) + 'deg)'
                });
            });
            $('.paper').css({
                transform: 'perspective(1200px) rotateX(' + (viewY / 150 - 0.5) * 30 + 'deg) rotateY(' + (viewX / 200 - 0.5) * 30 + 'deg)'
            });
        } else {
        $('.realistic').each(function(i) {
            $(this).css({
                transformOrigin: '50% ' + ($(document).scrollTop() - 100 + viewY) + 'px',
                transform: 'translateY(' + (- $(document).scrollTop() - 100) + 'px) rotateX(' + (start + (step * i)) + 'deg)'
            });
        });
        $('.paper').css({
            transform: 'perspective(1200px) rotateX(' + (viewY / document.body.clientHeight - 0.5) * 36 + 'deg) rotateY(' + (0.5 - viewX / document.body.clientWidth) * 64 + 'deg)'
        });
        }
    }
    $(document).mousemove(function(event) {
        var x = event.clientX;
        var y = event.clientY;
        if(!usingCam) {
            render(x, y);
        }
    }).scroll(function() {
        render();
    });
    $('.original').on('input',function(){
        $(".blur").html($(".original").html());
        render();
    });
    render();
    render();

    function startCam() {
        var vid = document.getElementById('videoel');
        var overlay = document.getElementById('overlay');
        var overlayCC = overlay.getContext('2d');
        var camAvailable = false;
        
        var ctrack = new clm.tracker({useWebGL : true});
        ctrack.init(pModel);
        
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        document.getElementById('cam-preview').appendChild( stats.domElement );
        
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;
        
        // check for camerasupport
        if (navigator.getUserMedia) {
	    // set up stream
	    
	    var videoSelector = {video : true};
	    if (window.navigator.appVersion.match(/Chrome\/(.*?) /)) {
	        var chromeVersion = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);
	        if (chromeVersion < 20) {
		    videoSelector = "video";
	        }
	    };
	    
	    navigator.getUserMedia(videoSelector, function( stream ) {
	        if (vid.mozCaptureStream) {
		    vid.mozSrcObject = stream;
	        } else {
		    vid.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
	        }
	        vid.play();
	    }, function() {
	        alert("There was some problem trying to fetch video from your webcam, using a fallback video instead.");
	    });
        } else {
	    alert("Your browser does not seem to support getUserMedia, using a fallback video instead.");
        }
        
        vid.addEventListener('canplay', function() {
            camAvailable = true;
        }, false);
        
        function startVideo() {
	    // start video
	    vid.play();
	    // start tracking
	    ctrack.start(vid);
	    // start loop to draw face
	    drawLoop();
        }
        
        function drawLoop() {
	    requestAnimFrame(drawLoop);
	    overlayCC.clearRect(0, 0, 200, 150);
	    //psrElement.innerHTML = "score :" + ctrack.getScore().toFixed(4);
            if(usingCam) {
                var pos = ctrack.getCurrentPosition()
	        if (pos) {
	            ctrack.draw(overlay);
                    render(pos[33][0], pos[33][1]);
                    if(pos[60][1] + pos[53][1] < 2 * pos[57][1]) {
                        $(document).scrollTop($(document).scrollTop() + 1);
                    }
	        } else {
                    render();
                }
            }
        }
    
        // update stats on every iteration
        document.addEventListener('clmtrackrIteration', function(event) {
	    stats.update();
        }, false);
        
        startVideo();
    }

    $('#toggle').click(function() {
        if(usingCam) {
            $('#cam-preview').hide();
            usingCam = 0;
        } else {
            $('#cam-preview').show();
            usingCam = 1;
            if(startCam) {
                startCam();
                startCam = false;
            }
        }
    });
});
