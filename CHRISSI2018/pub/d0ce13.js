alert('Success. ');
localStorage.solved = localStorage.solved.split('\x1C').concat('FLAG{ced6aa}').filter((x, i, a) => x.length > 0 && a.indexOf(x) === i).join('\x1C');
window.location.href = './ueckwu/';
