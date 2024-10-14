document.getElementById('imageInput').addEventListener('change', handleFiles);
document.getElementById('clearBtn').addEventListener('click', clearQueue);
document.getElementById('downloadBtn').addEventListener('click', downloadImages);

let images = [];
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Load your icons
const icon1 = new Image();
icon1.src = 'icon1.png'; 

const icon2 = new Image();
icon2.src = 'icon2.png'; 

Promise.all([icon1.decode(), icon2.decode()]).then(() => {
  console.log("Icons loaded successfully");
});

function handleFiles(event) {
  const files = event.target.files;
  images = []; 
  document.getElementById('preview').innerHTML = ''; 

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
        addIconsToImage(img);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function addIconsToImage(img) {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw the uploaded image
  ctx.drawImage(img, 0, 0);
  
  // Resize and draw the first icon at a specific position
  const icon1Width = img.width * 0.3; // Adjust size as needed
  const icon1Height = (icon1.height / icon1.width) * icon1Width; // Maintain aspect ratio
  ctx.drawImage(icon1, img.width - icon1Width, -55, icon1Width, icon1Height); // Position (10, 10)

  // Resize and draw the second icon at a different position
  const icon2Width = img.width * 0.3; // Adjust size as needed
  const icon2Height = (icon2.height / icon2.width) * icon2Width; // Maintain aspect ratio
  ctx.drawImage(icon2, 0, img.height - icon2Height +55 , icon2Width, icon2Height); // Position (bottom-right)

  const finalImage = canvas.toDataURL('image/png');
  images.push(finalImage);

  const preview = document.getElementById('preview');
  const imgElement = document.createElement('img');
  imgElement.src = finalImage;
  preview.appendChild(imgElement);

  document.getElementById('downloadBtn').disabled = false;
}

function downloadImages() {
  images.forEach((imgData, index) => {
    const a = document.createElement('a');
    a.href = imgData;
    a.download = `image_with_icons_${index + 1}.png`;
    a.click();
  });
}

function clearQueue() {
  images = [];
  document.getElementById('imageInput').value = '';
  document.getElementById('preview').innerHTML = ''; // Clear previews
  document.getElementById('downloadBtn').disabled = true;
}

// Disable right-click
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
}, false);

// Disable F12 (DevTools) and other inspection shortcuts
document.addEventListener('keydown', function(e) {
  if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I") || (e.ctrlKey && e.key === "U")) {
    e.preventDefault();
  }
});
