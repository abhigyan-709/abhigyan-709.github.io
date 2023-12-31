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
let resizeReset = function() {
	w = canvasBody.width = window.innerWidth;
	h = canvasBody.height = window.innerHeight;
}

const opts = { 
	particleColor: "rgb(255, 0, 0)", // Use bright red
  lineColor: "rgb(265, 0, 0)",
	particleAmount: 30,
	defaultSpeed: 1,
	variantSpeed: 1,
	defaultRadius: 2,
	variantRadius: 2,
	linkRadius: 200,
};

window.addEventListener("resize", function(){
	deBouncer();
});

let deBouncer = function() {
    clearTimeout(tid);
    tid = setTimeout(function() {
        resizeReset();
    }, delay);
};

let checkDistance = function(x1, y1, x2, y2){ 
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

let linkPoints = function(point1, hubs){ 
	for (let i = 0; i < hubs.length; i++) {
		let distance = checkDistance(point1.x, point1.y, hubs[i].x, hubs[i].y);
		let opacity = 1 - distance / opts.linkRadius;
		if (opacity > 0) { 
			drawArea.lineWidth = 0.5;
			drawArea.strokeStyle = `rgba(${rgb[0]}, ${rgb[2]}, ${rgb[2]}, ${opacity})`;
			drawArea.beginPath();
			drawArea.moveTo(point1.x, point1.y);
			drawArea.lineTo(hubs[i].x, hubs[i].y);
			drawArea.closePath();
			drawArea.stroke();
		}
	}
}

Particle = function(xPos, yPos){ 
	this.x = Math.random() * w; 
	this.y = Math.random() * h;
	this.speed = opts.defaultSpeed + Math.random() * opts.variantSpeed; 
	this.directionAngle = Math.floor(Math.random() * 360); 
	this.color = opts.particleColor;
	this.radius = opts.defaultRadius + Math.random() * opts. variantRadius; 
	this.vector = {
		x: Math.cos(this.directionAngle) * this.speed,
		y: Math.sin(this.directionAngle) * this.speed
	};
	this.update = function(){ 
		this.border(); 
		this.x += this.vector.x; 
		this.y += this.vector.y; 
	};
	this.border = function(){ 
		if (this.x >= w || this.x <= 0) { 
			this.vector.x *= -1;
		}
		if (this.y >= h || this.y <= 0) {
			this.vector.y *= -1;
		}
		if (this.x > w) this.x = w;
		if (this.y > h) this.y = h;
		if (this.x < 0) this.x = 0;
		if (this.y < 0) this.y = 0;	
	};
	this.draw = function(){ 
		drawArea.beginPath();
		drawArea.arc(this.x, this.y, this.radius, 0, Math.PI*2);
		drawArea.closePath();
		drawArea.fillStyle = this.color;
		drawArea.fill();
	};
};

function setup(){ 
	particles = [];
	resizeReset();
	for (let i = 0; i < opts.particleAmount; i++){
		particles.push( new Particle() );
	}
	window.requestAnimationFrame(loop);
}

function loop(){ 
	window.requestAnimationFrame(loop);
	drawArea.clearRect(0,0,w,h);
	for (let i = 0; i < particles.length; i++){
		particles[i].update();
		particles[i].draw();
	}
	for (let i = 0; i < particles.length; i++){
		linkPoints(particles[i], particles);
	}
}

const canvasBody = document.getElementById("canvas"),
drawArea = canvasBody.getContext("2d");
let delay = 200, tid,
rgb = opts.lineColor.match(/\d+/g);
resizeReset();
setup();


// JavaScript to hide the preloader and trigger the slide-in animation when the page is fully loaded
window.addEventListener("load", function () {
	const preloader = document.getElementById("preloader");
	preloader.style.display = "none";

	const sections = document.querySelectorAll("section");
	sections.forEach((section) => {
		section.classList.add("show");
	});

	// Show project details modal when a project card is clicked
	const projectCards = document.querySelectorAll('.project-card');
	projectCards.forEach(card => {
		card.addEventListener('click', () => {
			const targetModal = card.dataset.bsTarget;
			const projectModal = new bootstrap.Modal(document.getElementById(targetModal));
			projectModal.show();
		});
	});

	// Close the modal when clicking the close button
	const closeButtons = document.querySelectorAll('.modal .btn-close');
	closeButtons.forEach(button => {
		button.addEventListener('click', () => {
			const modal = button.closest('.modal');
			const projectModal = bootstrap.Modal.getInstance(modal);
			projectModal.hide();
		});
	});

	// Close the modal when clicking outside of it
	const modals = document.querySelectorAll('.modal');
	modals.forEach(modal => {
		modal.addEventListener('hidden.bs.modal', () => {
			const projectModal = bootstrap.Modal.getInstance(modal);
			projectModal.hide();
		});
	});
});

// Smooth scroll effect for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		document.querySelector(this.getAttribute('href')).scrollIntoView({
			behavior: 'smooth'
		});
	});
});