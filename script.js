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
        const btn = event.currentTarget;
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => btn.style.transform = '', 150);
        console.log(`Social Login: ${provider}`);
        alert(`Redirecting to ${provider}...`);
    }
});
