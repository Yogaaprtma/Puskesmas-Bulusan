document.addEventListener('DOMContentLoaded', () => {
    // 1. Set Current Year
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // 3. Navbar Scroll Effect, Smooth Scrolling & Scrollspy
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');
    const navItems = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section, .hero');

    window.addEventListener('scroll', () => {
        // Navbar blur and shadow
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scrollspy
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (current && link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();

                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }

                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const headerOffset = 80; // Navbar height
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });


    // 5. Mitos & Fakta Data
    const mythsData = [
        {
            mitos: "Anak yang sehat tidak perlu imunisasi.",
            fakta: "Anak sehat justru membutuhkan imunisasi untuk mencegah dan melindungi mereka dari penyakit berbahaya di masa depan."
        },
        {
            mitos: "Imunisasi menyebabkan autisme.",
            fakta: "Berbagai penelitian ilmiah berskala besar telah membuktikan bahwa tidak ada kaitan antara imunisasi dengan autisme."
        },
        {
            mitos: "Imunisasi membuat anak sakit.",
            fakta: "Imunisasi memicu respons kekebalan, sehingga wajar jika anak sedikit demam atau rewel, namun tidak menyebabkan penyakit aslinya."
        },
        {
            mitos: "Demam setelah imunisasi berarti vaksinnya berbahaya.",
            fakta: "Demam ringan adalah reaksi normal tubuh yang sedang membangun antibodi dan pertahanan imun."
        },
        {
            mitos: "Anak yang mendapat ASI tidak perlu imunisasi.",
            fakta: "ASI memberikan antibodi alami, tetapi tidak spesifik dan cukup untuk melindungi dari semua penyakit yang dapat dicegah dengan vaksin."
        },
        {
            mitos: "Penyakit sudah jarang, jadi imunisasi tidak diperlukan.",
            fakta: "Penyakit tersebut jarang terjadi justru karena imunisasi. Jika cakupan imunisasi menurun, penyakit dapat muncul kembali."
        },
        {
            mitos: "Jika terlambat imunisasi, harus mengulang dari awal.",
            fakta: "Tidak perlu diulang dari awal. Anak dapat melanjutkan jadwal atau mengikuti imunisasi kejar (catch-up immunization)."
        }
    ];

    const mythsContainer = document.getElementById('mythsContainer');
    if (mythsContainer) {
        mythsData.forEach((item, index) => {
            const delay = index * 0.1;
            const cardHtml = `
                <div class="myth-card reveal" style="transition-delay: ${delay}s">
                    <div class="myth-inner">
                        <div class="myth-front">
                            <span class="myth-label">MITOS</span>
                            <p class="myth-text">"${item.mitos}"</p>
                            <button class="myth-btn">Lihat Faktanya</button>
                        </div>
                        <div class="myth-back">
                            <span class="myth-label">FAKTA</span>
                            <p class="myth-text">${item.fakta}</p>
                        </div>
                    </div>
                </div>
            `;
            mythsContainer.insertAdjacentHTML('beforeend', cardHtml);
        });

        // Add flip interaction
        const mythCards = document.querySelectorAll('.myth-card');
        mythCards.forEach(card => {
            card.addEventListener('click', function () {
                this.classList.toggle('flipped');
            });
        });
    }

    // 6. Jadwal Imunisasi (IDAI 2024 Reference)
    const scheduleData = [
        {
            ageId: "usia-0-bulan",
            ageLabel: "0 Bulan",
            vaccines: [
                { name: "Hepatitis B (HB-0)", desc: "Mencegah penularan Hepatitis B dari ibu ke bayi. Diberikan < 24 jam setelah lahir." },
                { name: "Polio 0 (Tetes)", desc: "Mencegah lumpuh layu (Polio). Diberikan sebelum pulang dari faskes." }
            ]
        },
        {
            ageId: "usia-1-bulan",
            ageLabel: "1 Bulan",
            vaccines: [
                { name: "BCG", desc: "Mencegah penyakit Tuberkulosis (TBC) berat." },
                { name: "Polio 1 (Tetes)", desc: "Dosis pertama untuk kekebalan terhadap Polio." }
            ]
        },
        {
            ageId: "usia-2-bulan",
            ageLabel: "2 Bulan",
            vaccines: [
                { name: "DPT-HB-Hib 1", desc: "Mencegah Difteri, Batuk Rejan (Pertusis), Tetanus, Hepatitis B, dan infeksi Hib." },
                { name: "Polio 2 (Tetes)", desc: "Dosis kedua Polio Tetes." },
                { name: "PCV 1", desc: "Mencegah radang paru (Pneumonia) dan radang selaput otak (Meningitis)." },
                { name: "Rotavirus (RV) 1", desc: "Mencegah diare berat akibat virus Rotavirus." }
            ]
        },
        {
            ageId: "usia-3-bulan",
            ageLabel: "3 Bulan",
            vaccines: [
                { name: "DPT-HB-Hib 2", desc: "Dosis kedua DPT-HB-Hib." },
                { name: "Polio 3 (Tetes)", desc: "Dosis ketiga Polio Tetes." },
                { name: "PCV 2", desc: "Dosis kedua PCV." },
                { name: "Rotavirus (RV) 2", desc: "Dosis kedua Rotavirus." }
            ]
        },
        {
            ageId: "usia-4-bulan",
            ageLabel: "4 Bulan",
            vaccines: [
                { name: "DPT-HB-Hib 3", desc: "Dosis ketiga DPT-HB-Hib." },
                { name: "Polio 4 (Tetes)", desc: "Dosis keempat Polio Tetes." },
                { name: "IPV 1 (Suntik)", desc: "Vaksin Polio Suntik untuk perlindungan lebih kuat." },
                { name: "Rotavirus (RV) 3", desc: "Dosis ketiga Rotavirus." }
            ]
        },
        {
            ageId: "usia-9-bulan",
            ageLabel: "9 Bulan",
            vaccines: [
                { name: "Campak Rubella (MR)", desc: "Mencegah penyakit Campak dan Rubella (campak jerman)." },
                { name: "IPV 2 (Suntik)", desc: "Dosis kedua Polio Suntik." }
            ]
        },
        {
            ageId: "usia-12-18-bulan",
            ageLabel: "12-18 Bulan",
            vaccines: [
                { name: "PCV 3", desc: "Dosis ketiga PCV (diberikan pada usia 12 bulan)." },
                { name: "DPT-HB-Hib Lanjutan", desc: "Dosis penguat/booster (diberikan pada usia 18 bulan)." },
                { name: "Campak Rubella (MR) Lanjutan", desc: "Dosis penguat/booster (diberikan pada usia 18 bulan)." }
            ]
        }
    ];

    const scheduleSelector = document.getElementById('scheduleSelector');
    const scheduleContent = document.getElementById('scheduleContent');

    if (scheduleSelector && scheduleContent) {
        // Render Selectors
        scheduleData.forEach((item, index) => {
            const btnHtml = `<button class="age-btn ${index === 0 ? 'active' : ''}" data-target="${item.ageId}">${item.ageLabel}</button>`;
            scheduleSelector.insertAdjacentHTML('beforeend', btnHtml);
        });

        // Function to render content
        const renderScheduleContent = (ageId) => {
            const data = scheduleData.find(d => d.ageId === ageId);
            if (!data) return;

            let vaccinesHtml = data.vaccines.map(v => `
                <div class="vaccine-item reveal active">
                    <h4>${v.name}</h4>
                    <p>${v.desc}</p>
                </div>
            `).join('');

            scheduleContent.innerHTML = `<div class="vaccine-list">${vaccinesHtml}</div>`;
        };

        // Initial render
        renderScheduleContent(scheduleData[0].ageId);

        // Add Event Listeners
        const ageBtns = document.querySelectorAll('.age-btn');
        ageBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                // Remove active class from all
                ageBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked
                this.classList.add('active');
                // Render content
                const targetId = this.getAttribute('data-target');
                renderScheduleContent(targetId);
            });
        });
    }

    // 7. Interactive Parent Checklist
    const checklistData = [
        "Datang sesuai jadwal Posyandu",
        "Membawa Buku KIA",
        "Bertanya bila ada yang tidak dimengerti",
        "Tidak mudah percaya hoaks",
        "Berkonsultasi dengan tenaga kesehatan"
    ];

    const parentChecklist = document.getElementById('parentChecklist');
    if (parentChecklist) {
        checklistData.forEach((item, index) => {
            const html = `
                <div class="pc-item">
                    <div class="pc-checkbox">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span class="pc-text">0${index + 1}. ${item}</span>
                </div>
            `;
            parentChecklist.insertAdjacentHTML('beforeend', html);
        });

        const pcItems = document.querySelectorAll('.pc-item');
        pcItems.forEach(item => {
            item.addEventListener('click', function () {
                this.classList.toggle('checked');
            });
        });
    }

    // 8. Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    // 10. Initialize Scroll Reveal (Moved to end to capture dynamic elements)
    const revealElements = document.querySelectorAll('.reveal');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        revealElements.forEach(el => {
            el.classList.add('active');
        });
    }
});
