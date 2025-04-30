
// Hide overlay on click
const overlay = document.getElementById('instruction-overlay');
overlay.addEventListener('click', () => {
  overlay.style.display = 'none';
});

const animateDragDrop = () => {
  const imgs = document.querySelectorAll('.photo-container img');
  if (imgs.length >= 2) {
    const img1 = imgs[0];
    const img2 = imgs[1];

    setTimeout(() => {
      const tempSrc = img1.src;
      img1.src = img2.src;
      img2.src = tempSrc;
    }, 1500);

    setTimeout(() => {
      const tempSrc = img1.src;
      img1.src = img2.src;
      img2.src = tempSrc;
    }, 3000);
  }
};
animateDragDrop();



// upload pics 
const pictureGrid = document.querySelector('.picture-grid');

// Create an invisible upload input
const uploadInput = document.createElement('input');
uploadInput.type = 'file';
uploadInput.accept = 'image/*';
uploadInput.style.display = 'none';
document.body.appendChild(uploadInput);

let replacingImage = null;

pictureGrid.addEventListener('click', (event) => {
  if (event.target.tagName === 'IMG') {
    replacingImage = event.target;
    uploadInput.click();
  }
});

uploadInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file && replacingImage) {
    const reader = new FileReader();
    reader.onload = function (e) {
      replacingImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
    uploadInput.value = ''; // Clear input after
  }
});


// <!-- drag and drop -->
const containers = document.querySelectorAll('.photo-container');
let draggedItem = null;

containers.forEach(container => {
  container.setAttribute('draggable', true);

  container.addEventListener('dragstart', (e) => {
    draggedItem = container;
    setTimeout(() => {
      container.style.visibility = 'hidden';
    }, 0);
  });

  container.addEventListener('dragend', (e) => {
    setTimeout(() => {
      container.style.visibility = 'visible';
    }, 0);
  });

  container.addEventListener('dragover', (e) => {
    e.preventDefault(); // Allow dropping
  });

  container.addEventListener('drop', (e) => {
    e.preventDefault();
    if (draggedItem !== container) {
      // Swap images
      const draggedImg = draggedItem.querySelector('img');
      const targetImg = container.querySelector('img');

      const tempSrc = draggedImg.src;
      draggedImg.src = targetImg.src;
      targetImg.src = tempSrc;
    }
  });
});
