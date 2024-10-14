y<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Overlay_Tool</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h2><img src="header image location" alt="alt text"></h2>
        <div class="upload-box">
         
            <label for="imageInput" class="upload-button">Choose Images</label>
            <input type="file" id="imageInput" multiple accept="image/*" style="display:none;">
            <p>Drop Your Files Here</p>
            <button id="downloadBtn" disabled>Download All</button>
            <button id="clearBtn">Clear Queue</button>
        </div>
        <div id="preview"></div>
        <footer>
            <p>Developed by <a href="https://rownok.com" target="_blank">Rownok</a></p>
        </footer>
    </div>
    
    <canvas id="canvas" style="display: none;"></canvas> 
    <script src="script.js"></script>
</body>
</html>
