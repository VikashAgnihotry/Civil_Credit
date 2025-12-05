// Professional Interaction Logic

document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginSlide = document.getElementById('loginSlide');
    const signupSlide = document.getElementById('signupSlide');

    // Buttons
    const goToSignupBtn = document.getElementById('goToSignup');
    const goToLoginBtn = document.getElementById('goToLogin');

    // --- Transitions ---
    if (goToSignupBtn && loginSlide && signupSlide) {
        goToSignupBtn.addEventListener('click', function (e) {
            e.preventDefault();
            // Add a slight delay for ripple effect if implemented, otherwise immediate
            loginSlide.classList.remove('active');
            signupSlide.classList.add('active');
        });
    }

    if (goToLoginBtn && loginSlide && signupSlide) {
        goToLoginBtn.addEventListener('click', function (e) {
            e.preventDefault();
            signupSlide.classList.remove('active');
            loginSlide.classList.add('active');
        });
    }

    // --- Form Handling ---

    function setLoading(button, isLoading) {
        if (isLoading) {
            button.dataset.originalText = button.innerHTML;
            button.disabled = true;
            button.innerHTML = `<span class="loader"></span> Processing...`; // Simple text loader for now
            button.style.cursor = 'wait';
            button.style.opacity = '0.7';
        } else {
            button.innerHTML = button.dataset.originalText;
            button.disabled = false;
            button.style.cursor = 'pointer';
            button.style.opacity = '1';
        }
    }

    // Login
    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const submitBtn = loginForm.querySelector('.submit-btn');

            try {
                setLoading(submitBtn, true);

                // Simulate API Network Request
                console.log('Logging in...', { email });
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Success
                // setInputSuccess(document.getElementById('email')); // Visual Cue
                alert('Login successful! Welcome back.');
                // window.location.href = 'dashboard.html';

            } catch (error) {
                console.error('Error:', error);
                alert('Login failed. Please try again.');
            } finally {
                setLoading(submitBtn, false);
            }
        });
    }

    // Signup
    if (signupForm) {
        signupForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('signup-email');
            const password = document.getElementById('signup-password');
            const confirmPassword = document.getElementById('confirmPassword');
            const submitBtn = signupForm.querySelector('.submit-btn');

            // Basic Client Validation
            let isValid = true;

            if (password.value !== confirmPassword.value) {
                alert('Passwords do not match');
                confirmPassword.parentElement.style.borderColor = 'var(--accent-error)';
                isValid = false;
            } else {
                confirmPassword.parentElement.style.borderColor = 'var(--border-color)';
            }

            if (!isValid) return;

            try {
                setLoading(submitBtn, true);

                // Simulate API
                console.log('Creating account...', { fullname });
                await new Promise(resolve => setTimeout(resolve, 1500));

                alert('Account created! Initializing onboarding...');
                window.location.href = 'Onboarding.html';

            } catch (error) {
                console.error('Error:', error);
                alert('Signup failed. Please try again.');
            } finally {
                setLoading(submitBtn, false);
            }
        });
    }

    // Input Focus Polish
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.zIndex = '2'; // Ensure ring shows above others
        });
        input.addEventListener('blur', () => {
            input.parentElement.style.zIndex = '1';
        });
    });

    // Social Login Stub
    window.handleSocialLogin = function (provider) {
        // ... (stub)
        console.log(`Social Login: ${provider}`);
    }

    /* =========================================
       Social Feed Logic
       ========================================= */
    const supportBtns = document.querySelectorAll('.btn-support');

    supportBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // "Pop" Animation & Toggle
            this.classList.toggle('pop-active');

            // Increment/Decrement Counter
            const countSpan = this.querySelector('.count');
            if (countSpan) {
                let count = parseInt(countSpan.textContent);

                if (this.classList.contains('pop-active')) {
                    count++;
                    this.classList.add('active-state'); // Permanent active state style
                } else {
                    count--;
                    this.classList.remove('active-state');
                }
                countSpan.textContent = count;
            }

            // Remove animation class after it plays so it can be re-triggered
            setTimeout(() => {
                this.classList.remove('pop-active');
            }, 300);
        });
    });

    const fab = document.getElementById('createPostBtn');
    if (fab) {
        fab.addEventListener('click', () => {
            // Rotate animation on click
            fab.style.transform = 'rotate(90deg) scale(0.9)';
            setTimeout(() => {
                fab.style.transform = 'rotate(0deg) scale(1)';
                window.location.href = 'CreatePost.html';
            }, 200);
        });
    }

    /* =========================================
       Theme Toggle Logic
       ========================================= */
    const themeBtn = document.getElementById('themeToggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');

    // Check local storage or system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        toggleIcons(true);
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDark = document.body.getAttribute('data-theme') === 'dark';

            if (isDark) {
                document.body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                toggleIcons(false);
            } else {
                document.body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                toggleIcons(true);
            }
        });
    }

    function toggleIcons(isDark) {
        if (!sunIcon || !moonIcon) return;
        if (isDark) {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }


    /* =========================================
       Create Post Logic
       ========================================= */
    const typeTabs = document.querySelectorAll('.type-tab');
    const cpToggle = document.querySelector('.post-type-toggle');
    const cpTitle = document.getElementById('cpTitle');
    const cpSubtitle = document.getElementById('cpSubtitle');
    const headerEmoji = document.querySelector('.header-emoji');
    const formCard = document.querySelector('.cp-form-card');
    const chipGrid = document.getElementById('chipGrid');

    // Config for Modes
    const modeConfig = {
        praise: {
            title: "Create a Praise Post",
            subtitle: "Highlight positive civic behavior",
            emoji: "👏",
            placeholder: "Who did something good?",
            chips: ["Helping", "Cleanliness", "Volunteering", "Public Safety", "Environment"]
        },
        report: {
            title: "Report a Civic Concern",
            subtitle: "Help improve your community",
            emoji: "⚠️",
            placeholder: "What civic issue did you notice?",
            chips: ["Civic Violation", "Traffic", "Waste", "Noise", "Infrastructure"]
        }
    };

    if (typeTabs.length > 0 && cpToggle) {
        typeTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // 1. Visual Tab Switch
                typeTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const type = tab.dataset.type;
                cpToggle.setAttribute('data-mode', type);
                document.body.setAttribute('data-mode', type); // For global styling if needed

                // 2. Update Content (Animate)
                const config = modeConfig[type];

                // Simple Fade Swap
                formCard.style.opacity = '0.5';
                setTimeout(() => {
                    cpTitle.textContent = config.title;
                    cpSubtitle.textContent = config.subtitle;
                    headerEmoji.textContent = config.emoji;
                    document.getElementById('postTitle').placeholder = config.placeholder;

                    // Update Chips
                    chipGrid.innerHTML = config.chips.map((chip, index) =>
                        `<button type="button" class="chip ${index === 0 ? 'active' : ''}">${chip}</button>`
                    ).join('');

                    // Re-bind chip listeners
                    bindChipListeners();

                    formCard.style.opacity = '1';
                }, 150);
            });
        });
    }

    // Chips Logic
    function bindChipListeners() {
        const chips = document.querySelectorAll('.chip');
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                chips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
            });
        });
    }
    // Initial Bind
    if (chipGrid) bindChipListeners();

    // Image Upload Preview
    const fileInput = document.getElementById('fileInput');
    const uploadZone = document.getElementById('uploadZone');
    const previewContainer = document.querySelector('.preview-container');
    const uploadContent = document.querySelector('.upload-content');
    const imagePreview = document.getElementById('imagePreview');
    const removeImgBtn = document.querySelector('.remove-img-btn');

    if (uploadZone && fileInput) {
        uploadZone.addEventListener('click', (e) => {
            if (e.target !== removeImgBtn && e.target !== removeImgBtn.firstElementChild) {
                fileInput.click();
            }
        });

        fileInput.addEventListener('change', function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    imagePreview.src = e.target.result;
                    uploadContent.style.display = 'none';
                    previewContainer.style.display = 'block';
                }
                reader.readAsDataURL(file);
            }
        });

        if (removeImgBtn) {
            removeImgBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent re-opening dialog
                fileInput.value = '';
                imagePreview.src = '';
                previewContainer.style.display = 'none';
                uploadContent.style.display = 'flex';
            });
        }
    }


    /* =========================================
       Post Details / Demo Toggle (For New Feed Structure)
       ========================================= */
    const viewToggle = document.getElementById('viewToggle');
    if (viewToggle) {
        let isPraiseMode = true;

        viewToggle.addEventListener('click', () => {
            const card = document.getElementById('mainPostCard');
            const tag = document.getElementById('postTag');
            const title = document.getElementById('postTitle');
            const badge = card.querySelector('.trust-badge');

            isPraiseMode = !isPraiseMode;

            if (isPraiseMode) {
                // Switch to Praise
                card.classList.remove('card-concern');
                card.classList.add('card-praise');

                tag.className = 'content-tag tag-praise';
                tag.innerHTML = '<span>👏 Civic Praise</span>';

                title.textContent = 'Helped an elderly man cross the busy MG Road intersection during rush hour.';
                badge.className = 'trust-badge badge-green';
            } else {
                // Switch to Report
                card.classList.remove('card-praise');
                card.classList.add('card-concern');

                tag.className = 'content-tag tag-concern';
                tag.innerHTML = '<span>⚠️ Civic Concern</span>';

                title.textContent = 'Garbage dumped illegally near the park entrance, causing bad odor.';
                badge.className = 'trust-badge badge-orange';
            }
        });
    }

    /* =========================================
       Profile Page Logic
       ========================================= */
    const xpFill = document.querySelector('.xp-bar-fill');
    if (xpFill) {
        // Parse width (e.g., "40%")
        const targetPercent = parseInt(xpFill.style.width) || 0;

        let color = '#ef4444'; // Default Red (< 10%)

        if (targetPercent >= 80) {
            color = '#22c55e'; // Green
        } else if (targetPercent >= 45) {
            color = '#3b82f6'; // Blue
        } else if (targetPercent >= 10) {
            color = '#eab308'; // Yellow
        }

        // Reset for animation
        xpFill.style.width = '0%';
        xpFill.style.backgroundColor = '#ef4444'; // Start Red

        setTimeout(() => {
            xpFill.style.width = `${targetPercent}%`;
            xpFill.style.backgroundColor = color;
        }, 300);
    }

    const logoutBtn = document.querySelector('.btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to log out?')) {
                window.location.href = 'Login.html';
            }
        });
    }

    /* =========================================
       Professional Trust Dashboard Logic
       ========================================= */
    const trustBarFill = document.querySelector('.trust-bar-fill');
    if (trustBarFill) {
        // Simple smooth fill animation
        const targetPercent = parseInt(trustBarFill.style.width) || 0;
        trustBarFill.style.width = '0%';

        setTimeout(() => {
            trustBarFill.style.width = `${targetPercent}%`;
        }, 500);
    }

    // Interaction for "Info" button
    const infoBtn = document.querySelector('.nav-info-btn');
    if (infoBtn) {
        infoBtn.addEventListener('click', () => {
            alert("Your Trust Score is calculated based on verified identity (50%), community endorsements (30%), and platform behavior (20%).");
        });
    }

    // Interaction for "Edit Profile" button
    const editProBtn = document.querySelector('.btn-edit-pro');
    if (editProBtn) {
        editProBtn.addEventListener('click', () => {
            alert("Edit Profile feature coming soon!\n\nYou will be able to update your bio, avatar, and social links here.");
        });
    }

});
