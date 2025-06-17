// script.js

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// --- Gallery Filtering Logic ---

document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('#gallery-grid-container .gallery-item');
    const eventPhotoSlots = document.querySelectorAll('#events .event-photo-slot');
    const filterButtons = document.querySelectorAll('#gallery-filter-buttons .filter-btn');

    // Function to filter gallery items
    function filterGallery(filterTag) {
        galleryItems.forEach(item => {
            const tags = item.dataset.eventTags ? item.dataset.eventTags.split(',').map(tag => tag.trim()) : [];
            const isAddCard = item.classList.contains('add-photo-card');

            if (filterTag === 'all') {
                item.classList.remove('hidden');
            } else if (isAddCard) {
                item.classList.remove('hidden'); // Always show the 'More Photos' card
            }
            else if (tags.includes(filterTag)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });

        // Scroll to gallery after filtering
        document.getElementById('gallery').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Click listener for event photos (to filter gallery)
    eventPhotoSlots.forEach(slot => {
        slot.addEventListener('click', function() {
            const eventName = this.dataset.eventName;
            if (eventName) {
                filterGallery(eventName);

                // Update active state of filter buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                const targetBtn = document.querySelector(`.filter-btn[data-filter="${eventName}"]`);
                if (targetBtn) {
                    targetBtn.classList.add('active');
                }
            }
        });
    });

    // Click listeners for filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            filterGallery(filter);

            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Ensure images start visible
    filterGallery('all');
});

// Placeholder image URL updates with specific text (no upload/delete JS needed)
// This script block is intentionally empty as the previous upload/delete JS is removed.
// All photo references are now static in the HTML.