function handleSocialLogin(provider) {
    console.log(`Login with ${provider}`);
    alert(`Login with ${provider} clicked`);
}


document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password, rememberMe })
                });

                const data = await response.json();

                if (data.success) {
                    alert('Login successful! Welcome ' + data.user.name);
                    console.log('Login success:', data);
                    // Redirect or update UI here
                } else {
                    alert('Login failed: ' + data.message);
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            try {
                const response = await fetch('/api/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ fullname, email, password })
                });

                const data = await response.json();

                if (data.success) {
                    alert('Account created successfully! Starting onboarding...');
                    window.location.href = 'Onboarding.html';
                } else {
                    alert('Signup failed: ' + data.message);
                }
            } catch (error) {
                console.error('Error during signup:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }

    const signinBtn = document.getElementById('signinBtn');
    if (signinBtn) {
        signinBtn.addEventListener('click', function () {
            window.location.href = 'Login.html';
        });
    }

    // Onboarding Page Logic
    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) {
        continueBtn.addEventListener('click', function () {
            alert('Moving to Phone Verification (Demo: Redirecting to Login)');
            window.location.href = 'Login.html';
        });
    }

    const skipLink = document.getElementById('skipLink');
    if (skipLink) {
        skipLink.addEventListener('click', function (e) {
            e.preventDefault();
            alert('Skipping onboarding (Demo: Redirecting to Login)');
            window.location.href = 'Login.html';
        });
    }
});
