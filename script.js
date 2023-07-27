// Function to fetch images from the "gallery_images" folder and display them in the gallery
function fetchImages() {
    const galleryImages = document.getElementById('galleryImages');

    // List of image file names in the "gallery_images" folder
    const imageFiles = [
        'img1.jpg',
        'img2.jpg',
        'img3.jpg',
        'img4.jpg',
        'img5.jpg',
        'img6.jpg',
        'img7.jpg',
        'img8.jpg',
        'img9.jpg',
        'img10.jpg',
        'img11.jpg',
        'img12.jpg',
        'img13.jpg',
        'img14.jpg',
        'img15.jpg',
        'img16.jpg',
        'img17.jpg',
        'img18.jpg',
        'img19.jpg',

        // Add more image file names as needed
    ];

    imageFiles.forEach((imageName) => {
        const imageCard = document.createElement('div');
        imageCard.classList.add('col');
        imageCard.innerHTML = `
            <div class="card">
                <img src="gallery_images/${imageName}" class="card-img-top" alt="${imageName}" onclick="openModal('gallery_images/${imageName}')">
                <div class="card-body">
                    <h5 class="card-title">${imageName}</h5>
                </div>
            </div>
        `;
        galleryImages.appendChild(imageCard);
    });
}

// Call the fetchImages function when the page is loaded
window.addEventListener("load", function () {
    fetchImages();
});

// Function to handle click event and open the modal with the clicked image
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');

    modal.style.display = 'block';
    modalImage.src = imageSrc;

    const closeModal = () => {
        modal.style.display = 'none';
    };

    // Close the modal when clicking on the close button or outside the modal
    modal.onclick = closeModal;
    window.onclick = (event) => {
        if (event.target === modal) {
            closeModal();
        }
    };
}

// Add the same 'authenticate' function (if needed) and any other required functions
