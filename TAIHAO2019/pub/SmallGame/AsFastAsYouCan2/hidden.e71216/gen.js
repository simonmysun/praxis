const fs = require('fs');
const crypto = require('crypto');

for(let i = 0; i < 65536; i += 1) {
    fs.writeFile(`./${crypto.createHash('sha256').update('TH2019_' + (i + 0)).digest('hex')}.html`, `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>18 --> 19</title>
    <link href="./../../assets/style.css" rel="stylesheet">
  </head>
  <body>
    <h2>You have to be fast</h2>
    <a href="./${crypto.createHash('sha256').update('TH2019_' + (i + 1)).digest('hex')}.html">Teleport</a>
    <hr>
    <a href="./../../about.md">About</a> (Spoilers! )
    <script src="./../../assets/md5.js"></script>
    <script>
      window.currentLevel = 7;
    </script>
    <script src="./../../assets/script.js"></script>
  </body>
</html>`, function(err, data) {
    if (err) {
        console.log(err);
    }
    console.log(`Successfully Written to File ./${crypto.createHash('sha256').update('TH2019_' + (i + 0)).digest('hex')}.html.`);
});
    
}
