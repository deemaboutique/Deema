document.addEventListener('DOMContentLoaded', (event) => {
    // ----------------------------------------------------------------------
    // 1. Welcome Modal Functionality (نافذة الترحيب)
    // ----------------------------------------------------------------------
    const welcomeModal = document.getElementById("welcomeModal");
    const closeBtn = welcomeModal.querySelector(".close-btn");
    const enterBtn = document.getElementById("modal-close-btn");

    // Show the modal on page load
    welcomeModal.style.display = "block";

    // Close modal when user clicks on (x) or "Enter Site"
    closeBtn.onclick = function() {
        welcomeModal.style.display = "none";
    }
    enterBtn.onclick = function() {
        welcomeModal.style.display = "none";
    }
    // Close modal if user clicks outside of it
    window.onclick = function(event) {
        if (event.target == welcomeModal) {
            welcomeModal.style.display = "none";
        }
    }


    // ----------------------------------------------------------------------
    // 2. Product Details Modals & Gallery Functionality (النوافذ المنبثقة للمنتجات)
    // ----------------------------------------------------------------------
    
    const detailsButtons = document.querySelectorAll('.btn-details');
    const allDetailModals = document.querySelectorAll('.product-details-modal');

    // Function to handle image gallery navigation
    function setupGallery(modal) {
        let currentImageIndex = 0;
        // نستخدم querySelectorAll داخل نطاق الـ modal الحالي
        const images = modal.querySelectorAll('.gallery-image');
        const dots = modal.querySelectorAll('.dot');
        const totalImages = images.length;

        function showImage(n) {
            images.forEach(img => img.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Loop functionality
            if (n >= totalImages) {
                currentImageIndex = 0;
            } else if (n < 0) {
                currentImageIndex = totalImages - 1;
            } else {
                currentImageIndex = n;
            }

            images[currentImageIndex].classList.add('active');
            dots[currentImageIndex].classList.add('active');
        }

        // Add event listeners to dots for navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showImage(index);
            });
        });

        // Initialize the gallery to the first image
        if (images.length > 0) {
            showImage(0); 
        }
        
        return { showImage };
    }

    // Loop through all product detail modals to set up their galleries
    allDetailModals.forEach(modal => {
        // Run setupGallery for each modal
        modal.galleryController = setupGallery(modal);

        // Get the close button for this specific modal
        const closeDetailsBtn = modal.querySelector(".details-close-btn");

        // Close the details modal
        closeDetailsBtn.onclick = function() {
            modal.style.display = "none";
        }

        // Close modal if user clicks outside of it (for this specific modal only)
        window.addEventListener('click', function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    });

    // Event listeners for opening modals
    detailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            const targetModal = document.querySelector(`.product-details-modal[data-product-id="${productId}"]`);
            
            if (targetModal) {
                // Hide any currently open modal first (optional, but good practice)
                allDetailModals.forEach(modal => modal.style.display = "none");
                
                targetModal.style.display = "block";
                
                // Reset gallery to the first image when opened
                if (targetModal.galleryController) {
                    targetModal.galleryController.showImage(0);
                }
            }
        });
    });

});
