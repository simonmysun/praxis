alert('Success. ');
localStorage.solved = localStorage.solved.split('\x1C').concat('FLAG{4aba4c}').filter((x, i, a) => x.length > 0 && a.indexOf(x) === i).join('\x1C');
window.location.href = './7bd037.success.html';
