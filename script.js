/* ==========================================================================
   MONEY HEIST THEMED PROFESSIONAL PORTFOLIO LOGIC
   Author: Albin Joseph Daniel Portfolio Design
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- DYNAMIC SYSTEM CLOCK ---
    const clockElement = document.getElementById('tactical-clock');
    function updateClock() {
        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        const secs = String(now.getSeconds()).padStart(2, '0');
        if (clockElement) {
            clockElement.textContent = `${hrs}:${mins}:${secs}`;
        }
    }
    setInterval(updateClock, 1000);
    updateClock();


    // --- SECTION NAVIGATION TABS ---
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('.viewer-section');

    function switchSection(targetId) {
        sections.forEach(sec => {
            sec.classList.remove('active');
            if (sec.id === targetId) {
                sec.classList.add('active');
            }
        });

        // Sync active nav links across desktop sidebar and mobile footer
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === targetId) {
                link.classList.add('active');
            }
        });

        // Reset scroll position of view panel on navigate
        const viewer = document.getElementById('tactical-viewer');
        if (viewer) {
            viewer.scrollTop = 0;
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            switchSection(targetId);
        });
    });


    // --- PASSWORD STRENGTH ANALYZER ---
    const analyzerInput = document.getElementById('analyzer-input');
    const togglePasswordVisibility = document.getElementById('toggle-password-visibility');
    const crackTimeVal = document.getElementById('crack-time');
    const entropyVal = document.getElementById('entropy-value');
    const strengthFill = document.getElementById('strength-fill');
    const securityBadge = document.getElementById('security-badge');

    if (togglePasswordVisibility && analyzerInput) {
        togglePasswordVisibility.addEventListener('click', () => {
            if (analyzerInput.type === 'password') {
                analyzerInput.type = 'text';
                togglePasswordVisibility.textContent = 'HIDE';
            } else {
                analyzerInput.type = 'password';
                togglePasswordVisibility.textContent = 'SHOW';
            }
        });
    }

    if (analyzerInput) {
        analyzerInput.addEventListener('input', () => {
            const password = analyzerInput.value;
            
            // Empty state reset
            if (!password) {
                crackTimeVal.textContent = 'INSTANT';
                entropyVal.textContent = '0 bits';
                strengthFill.style.width = '0%';
                strengthFill.style.backgroundColor = 'var(--primary)';
                securityBadge.textContent = 'WEAK';
                securityBadge.style.color = 'var(--primary)';
                securityBadge.style.borderColor = 'var(--primary-dark)';
                securityBadge.style.backgroundColor = 'rgba(191, 17, 32, 0.1)';
                return;
            }

            let score = 0;
            let poolSize = 0;

            const hasLower = /[a-z]/.test(password);
            const hasUpper = /[A-Z]/.test(password);
            const hasDigit = /[0-9]/.test(password);
            const hasSpecial = /[^A-Za-z0-9]/.test(password);

            if (hasLower) { score += 15; poolSize += 26; }
            if (hasUpper) { score += 20; poolSize += 26; }
            if (hasDigit) { score += 20; poolSize += 10; }
            if (hasSpecial) { score += 25; poolSize += 33; }

            // Length points additions
            if (password.length >= 8) score += 10;
            if (password.length >= 12) score += 10;
            
            score = Math.min(100, score);
            
            // Entropy bits calculation: L * log2(R)
            const entropy = Math.round(Math.log2(poolSize) * password.length);
            entropyVal.textContent = `${entropy} bits`;

            // Crack time text mapping
            let crackTimeText = "Instant";
            if (entropy > 80) {
                crackTimeText = "1.5 Octillion Years";
            } else if (entropy > 60) {
                crackTimeText = "500,000 Years";
            } else if (entropy > 45) {
                crackTimeText = "15 Years";
            } else if (entropy > 30) {
                crackTimeText = "18 Hours";
            } else if (entropy > 15) {
                crackTimeText = "20 Minutes";
            } else if (entropy > 0) {
                crackTimeText = "2 Seconds";
            }
            crackTimeVal.textContent = crackTimeText.toUpperCase();

            // Progress bar and labels update
            strengthFill.style.width = `${score}%`;

            if (score < 35) {
                strengthFill.style.backgroundColor = 'var(--primary)';
                securityBadge.textContent = 'WEAK';
                securityBadge.style.color = 'var(--primary)';
                securityBadge.style.borderColor = 'var(--primary-dark)';
                securityBadge.style.backgroundColor = 'rgba(191, 17, 32, 0.1)';
            } else if (score < 65) {
                strengthFill.style.backgroundColor = 'var(--cyber-yellow)';
                securityBadge.textContent = 'MODERATE';
                securityBadge.style.color = 'var(--cyber-yellow)';
                securityBadge.style.borderColor = '#8a800c';
                securityBadge.style.backgroundColor = 'rgba(241, 196, 15, 0.08)';
            } else if (score < 85) {
                strengthFill.style.backgroundColor = 'var(--gold)';
                securityBadge.textContent = 'STRONG';
                securityBadge.style.color = 'var(--gold)';
                securityBadge.style.borderColor = '#8a640f';
                securityBadge.style.backgroundColor = 'rgba(212, 175, 55, 0.08)';
            } else {
                strengthFill.style.backgroundColor = 'var(--cyber-green)';
                securityBadge.textContent = 'HIGHLY SECURE';
                securityBadge.style.color = 'var(--cyber-green)';
                securityBadge.style.borderColor = '#1e8a0c';
                securityBadge.style.backgroundColor = 'rgba(46, 204, 113, 0.08)';
            }
        });
    }


    // --- THE GOLD SKILLS VAULT (HOVER DETAILS BINDINGS) ---
    const goldBars = document.querySelectorAll('.gold-bar');
    const goldDecoderText = document.getElementById('gold-decoder-text');

    goldBars.forEach(bar => {
        const detailText = bar.getAttribute('data-skill-detail');
        const labelText = bar.querySelector('.gold-label').textContent;

        const updateDecoderText = () => {
            if (goldDecoderText) {
                goldDecoderText.innerHTML = `<span class="text-gold">[${labelText}]</span> ${detailText}`;
            }
        };

        bar.addEventListener('mouseenter', updateDecoderText);
        bar.addEventListener('click', updateDecoderText);
    });


    // --- CONTACT FORM TRANSMISSION ---
    const contactForm = document.getElementById('heist-contact-form');
    const formConsole = document.getElementById('form-console-body');
    const sendMsgBtn = document.getElementById('send-msg-btn');

    const transmissionSteps = [
        ">> INITIALIZING ROUTING GATEWAY RELAY...",
        ">> ESTABLISHING SECURE HANDSHAKE SYMMETRIC SESSION...",
        ">> ENCRYPTING PAYLOAD PACKETS WITH AES-256...",
        ">> DELIVERING TO REMOTE MAIL RELAY NODE..."
    ];

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Block repeat click
            sendMsgBtn.disabled = true;
            const originalBtnText = sendMsgBtn.textContent;
            sendMsgBtn.textContent = 'TRANSMITTING...';
            
            if (formConsole) {
                formConsole.innerHTML = "";
            }
            
            let stepIdx = 0;

            function printNextStep() {
                if (stepIdx < transmissionSteps.length) {
                    if (formConsole) {
                        const line = document.createElement('p');
                        line.className = 'console-line';
                        line.textContent = transmissionSteps[stepIdx];
                        formConsole.appendChild(line);
                        formConsole.scrollTop = formConsole.scrollHeight;
                    }
                    stepIdx++;
                    setTimeout(printNextStep, 350);
                } else {
                    // Trigger actual async Formspree post request
                    const formData = new FormData(contactForm);
                    const actionUrl = contactForm.getAttribute('action');

                    fetch(actionUrl, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    })
                    .then(response => {
                        if (response.ok) {
                            if (formConsole) {
                                const line = document.createElement('p');
                                line.className = 'console-line text-green';
                                line.textContent = ">> [SUCCESS] TRANSMISSION DELIVERED TO COURIER BOX.";
                                formConsole.appendChild(line);
                            }
                            contactForm.reset();
                            // Reset analyzer widget if reset
                            if (analyzerInput) {
                                analyzerInput.dispatchEvent(new Event('input'));
                            }
                        } else {
                            throw new Error("Relay response code error.");
                        }
                    })
                    .catch(error => {
                        if (formConsole) {
                            const line = document.createElement('p');
                            line.className = 'console-line text-red';
                            line.textContent = `>> [ERROR] TRANSMISSION CORRUPTED: ${error.message}`;
                            formConsole.appendChild(line);
                        }
                    })
                    .finally(() => {
                        sendMsgBtn.disabled = false;
                        sendMsgBtn.textContent = originalBtnText;
                        if (formConsole) {
                            formConsole.scrollTop = formConsole.scrollHeight;
                        }
                    });
                }
            }

            printNextStep();
        });
    }

});
