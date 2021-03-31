;$(document).ready(function(){
  $.ajax({
    url: 'data/dat.txt'  
  }).done(function(data) {
    db = data.split('\n').map(l => l.split(' '));
    $('#test-tests').hide('fast', function() {
      $('#test-result').hide('fast', function() {
	$('#test-start').show('fast', function() {
	  $('#test-mask').fadeOut(500);
	});
      });
    });
    $('#start').click(function() {
      startTest();
    });
    $('#po').click(function() {
      check(true);
    });
    $('#ne').click(function() {
      check(false);
    });
    $('#share').click(function() {
      
    });
    $('#restart').click(function() {
      startTest();
    });
  });
});

var pos;
var step;
var depth;
var wander;
var db;

function startTest() {
    pos = 3000 + Math.floor(Math.random() * 500);
    step = 10;
    depth = 0;
    wander = 0;
    $('#test-mask').fadeIn(150, function() {
	$('#test-result').hide('fast', function() {
	    $('#test-start').hide('fast', function() {
		$('#test-tests').show('fast', function() {
		    getQuestion(pos, function() {
			$('#test-mask').fadeOut(500, function() {
			    
			});
		    });
		});
	    });
	});
    });
}

function getQuestion(pos, callback) {
  $('#test-mask').fadeIn(150, function() {
    $('#test-content').text(db[pos][0]);
    $('#test-mask').fadeOut(150, function() {
    });
    callback();
  });
}

function check(right) {
    if(pos === 1 && right === false) {
	finish();
	return ;
    }
    if(pos === 100000 && right === true) {
	finish();
	return ;
    }
    if(right) {
	if(step <= 0) {
	    step = 13;
	    wander += 1;
	} else {
	    step = Math.floor(step * 1.7);
	}
    } else {
	if(step >= 0) {
	    step = -7;
	    wander += 1;
	} else {
	    step = Math.floor(step * 2.3);
	}
    }
    pos += step;
    if(pos > 100000) {
	pos = 100000;
    }
    if(pos < 1) {
	pos = 1;
    }
    if(depth > 50 || wander > 10) {
	finish();
	return ;
    }
    getQuestion(pos, function() {});
}

function finish() {
    $('#test-mask').fadeIn(500, function() {
	$('#test-tests').hide('fast', function() {
	    $('#test-start').hide('fast', function() {
		$('#test-result').show('fast', function() {
		    if(pos === 1) {
			$('#test-remark-inf').text('');
			$('#test-remark-op').text('<=');
			sup = 500;
			var opt = {
  			useEasing : true
  			    ,useGrouping : true
  			    ,separator : ','
  			    ,decimal : '.' 
			}
			var numAnim1 = new countUp("test-remark-sup", 0, sup, 0, 3, opt);
			numAnim1.start();
		    } else if(pos === 100000) {
			$('#test-remark-inf').text('');
			$('#test-remark-op').text('>=');
			sup = 100000;
			var opt = {
  			useEasing : true
  			    ,useGrouping : true
  			    ,separator : ','
  			    ,decimal : '.' 
			}
			var numAnim1 = new countUp("test-remark-sup", 0, sup, 0, 3, opt);
			numAnim1.start();
		    } else {
			$('#test-remark-op').text('~');
			var inf = Math.floor(pos / 500) * 500; 
			var sup = inf + 500;
			var opt = {
  			useEasing : true
  			    ,useGrouping : true
  			    ,separator : ','
  			    ,decimal : '.' 
			}
			var numAnim1 = new countUp("test-remark-inf", 0, inf, 0, 3, opt);
			var numAnim2 = new countUp("test-remark-sup", 0, sup, 0, 3, opt);
			numAnim2.start();
			numAnim1.start();
		    }
		    $('#test-mask').fadeOut(1000, function() {
		    });
		});
	    });
	});
    });
}
