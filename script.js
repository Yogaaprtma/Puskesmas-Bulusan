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
            ageId: "kurang-24-jam",
            ageLabel: "< 24 Jam",
            vaccines: [
                { name: "Hepatitis B (HB0)", desc: "Diberikan segera setelah lahir sebelum 24 jam." }
            ]
        },
        {
            ageId: "kurang-1-bulan",
            ageLabel: "< 1 Bulan",
            vaccines: [
                { name: "BCG", desc: "Mencegah penyakit Tuberkulosis (TBC)." },
                { name: "OPV1", desc: "Vaksin Polio Tetes (Oral Polio Vaccine) dosis pertama." }
            ]
        },
        {
            ageId: "usia-2-bulan",
            ageLabel: "2 Bulan",
            vaccines: [
                { name: "DPT-HB-Hib1", desc: "Mencegah Difteri, Batuk Rejan, Tetanus, Hepatitis B, dan Hib." },
                { name: "OPV2", desc: "Vaksin Polio Tetes dosis kedua." },
                { name: "PCV1", desc: "Mencegah radang paru dan selaput otak (Pneumokokus) dosis pertama." },
                { name: "RV1", desc: "Mencegah diare berat (Rotavirus) dosis pertama." }
            ]
        },
        {
            ageId: "usia-3-bulan",
            ageLabel: "3 Bulan",
            vaccines: [
                { name: "DPT-HB-Hib2", desc: "Dosis kedua DPT-HB-Hib." },
                { name: "OPV3", desc: "Vaksin Polio Tetes dosis ketiga." },
                { name: "PCV2", desc: "Dosis kedua PCV." },
                { name: "RV2", desc: "Dosis kedua Rotavirus." }
            ]
        },
        {
            ageId: "usia-4-bulan",
            ageLabel: "4 Bulan",
            vaccines: [
                { name: "DPT-HB-Hib3", desc: "Dosis ketiga DPT-HB-Hib." },
                { name: "OPV4", desc: "Vaksin Polio Tetes dosis keempat." },
                { name: "IPV1", desc: "Vaksin Polio Suntik dosis pertama." },
                { name: "RV3", desc: "Dosis ketiga Rotavirus." }
            ]
        },
        {
            ageId: "usia-9-bulan",
            ageLabel: "9 Bulan",
            vaccines: [
                { name: "Campak-Rubela", desc: "Mencegah penyakit Campak dan Rubela." },
                { name: "IPV2", desc: "Vaksin Polio Suntik dosis kedua." }
            ]
        },
        {
            ageId: "usia-10-bulan",
            ageLabel: "10 Bulan",
            vaccines: [
                { name: "JE*", desc: "Vaksin Japanese Encephalitis (khusus area tertentu)." }
            ]
        },
        {
            ageId: "usia-12-bulan",
            ageLabel: "12 Bulan",
            vaccines: [
                { name: "PCV3", desc: "Dosis ketiga PCV (booster/lanjutan)." }
            ]
        },
        {
            ageId: "usia-18-bulan",
            ageLabel: "18 Bulan",
            vaccines: [
                { name: "Campak-Rubela", desc: "Dosis lanjutan untuk Campak-Rubela." },
                { name: "DPT-HB-Hib4", desc: "Dosis keempat/lanjutan DPT-HB-Hib." }
            ]
        },
        {
            ageId: "kelas-1",
            ageLabel: "Kelas 1",
            vaccines: [
                { name: "Campak-Rubela", desc: "Imunisasi anak sekolah (BIAS)." },
                { name: "DT", desc: "Vaksin Difteri dan Tetanus anak sekolah." }
            ]
        },
        {
            ageId: "kelas-2",
            ageLabel: "Kelas 2",
            vaccines: [
                { name: "Td", desc: "Vaksin Tetanus dan Difteri (booster anak lebih besar)." }
            ]
        },
        {
            ageId: "kelas-5",
            ageLabel: "Kelas 5",
            vaccines: [
                { name: "Td", desc: "Vaksin Tetanus dan Difteri lanjutan." },
                { name: "HPV**", desc: "Vaksin Human Papillomavirus dosis pertama (khusus anak perempuan)." }
            ]
        },
        {
            ageId: "kelas-6",
            ageLabel: "Kelas 6",
            vaccines: [
                { name: "HPV**", desc: "Vaksin HPV dosis kedua (khusus anak perempuan). Bagi yang belum mendapatkan dosis pertama di kelas 5, dapat diberikan di kelas 6." }
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


    // 9. Calendar Generation Logic
    const btnGenerateCalendar = document.getElementById('btnGenerateCalendar');
    const imunisasiDateInput = document.getElementById('imunisasiDate');

    if (btnGenerateCalendar && imunisasiDateInput) {
        btnGenerateCalendar.addEventListener('click', () => {
            const selectedDate = imunisasiDateInput.value;

            if (!selectedDate) {
                alert('Mohon pilih tanggal dan jam imunisasi terlebih dahulu!');
                return;
            }

            const dateObj = new Date(selectedDate);

            // Format YYYYMMDDTHHmmss (local time)
            const formatForGoogle = (d) => {
                return d.getFullYear() +
                    String(d.getMonth() + 1).padStart(2, '0') +
                    String(d.getDate()).padStart(2, '0') +
                    'T' +
                    String(d.getHours()).padStart(2, '0') +
                    String(d.getMinutes()).padStart(2, '0') +
                    '00';
            };

            // Start time is exactly what the user picked
            const startStr = formatForGoogle(dateObj);

            // Set waktu selesai ke 1 jam setelah jam yang dipilih
            dateObj.setHours(dateObj.getHours() + 1);
            const endStr = formatForGoogle(dateObj);

            const text = encodeURIComponent('Jadwal Imunisasi Anak Puskesmas Bulusan');
            const details = encodeURIComponent('Waktunya imunisasi anak. Jangan lupa bawa buku KIA!');
            const location = encodeURIComponent('Puskesmas Bulusan Semarang');

            const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${startStr}/${endStr}&details=${details}&location=${location}`;

            window.open(calendarUrl, '_blank');
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

    // 10. Visitor Counter (GoatCounter)
    // Isi dengan kode situs GoatCounter, contoh: 'si-imun' -> https://si-imun.goatcounter.com
    // Kosongkan ('') untuk menonaktifkan counter.
    const GOATCOUNTER_CODE = 'puskesmas-bulusan-smg';

    const counterBox = document.getElementById('visitorCounter');
    const counterNumber = document.getElementById('visitorCount');

    if (GOATCOUNTER_CODE && counterBox && counterNumber) {
        const baseUrl = `https://${GOATCOUNTER_CODE}.goatcounter.com`;

        // a) Catat kunjungan ini
        const tracker = document.createElement('script');
        tracker.async = true;
        tracker.src = 'https://gc.zgo.at/count.js';
        tracker.dataset.goatcounter = `${baseUrl}/count`;
        document.head.appendChild(tracker);

        // b) Ambil total pengunjung & tampilkan
        const animateCount = (target) => {
            if (prefersReducedMotion || target < 2) {
                counterNumber.textContent = target.toLocaleString('id-ID');
                return;
            }
            const duration = 1200;
            const start = performance.now();
            const tick = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                counterNumber.textContent = Math.round(target * eased).toLocaleString('id-ID');
                if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        };

        const loadCount = () => {
            // Halaman utama dicatat di path '/' (%2F) yang terupdate realtime
            fetch(`${baseUrl}/counter/%2F.json`, { cache: 'no-store' })
                .then(res => {
                    if (!res.ok) throw new Error('Counter path gagal');
                    return res.json();
                })
                .then(data => {
                    const raw = String(data.count ?? data.count_unique ?? '').replace(/\D/g, '');
                    if (raw === '') throw new Error('Data counter kosong');
                    counterBox.hidden = false;
                    animateCount(parseInt(raw, 10));
                })
                .catch(() => {
                    // Fallback ke TOTAL.json jika path tidak ditemukan
                    fetch(`${baseUrl}/counter/TOTAL.json`, { cache: 'no-store' })
                        .then(res => res.json())
                        .then(data => {
                            const raw = String(data.count ?? data.count_unique ?? '').replace(/\D/g, '');
                            if (raw !== '') {
                                counterBox.hidden = false;
                                animateCount(parseInt(raw, 10));
                            }
                        })
                        .catch(() => {
                            counterBox.hidden = true;
                        });
                });
        };

        // Beri jeda singkat agar kunjungan ini ikut tercatat sebelum angka dibaca
        setTimeout(loadCount, 1500);
    }

    // 11. Live Status Jam Layanan Puskesmas Bulusan
    const initServiceHoursStatus = () => {
        const statusPill = document.getElementById('serviceStatusPill');
        const todayRows = document.querySelectorAll('.hours-table tr[data-day]');
        if (!statusPill) return;

        // Hitung waktu dalam zona WIB (UTC+7)
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const wib = new Date(utc + (3600000 * 7));

        const day = wib.getDay(); // 0: Minggu, 1: Senin, ..., 6: Sabtu
        const hours = wib.getHours();
        const minutes = wib.getMinutes();
        const currentTimeVal = hours * 60 + minutes;

        // Highlight baris hari ini pada tabel jam operasional
        todayRows.forEach(row => {
            if (parseInt(row.getAttribute('data-day'), 10) === day) {
                row.classList.add('today-highlight');
            }
        });

        let isOpen = false;
        let closingTime = '';

        if (day >= 1 && day <= 4) {
            // Senin - Kamis: 07.00 - 16.30 (420 - 990 menit)
            if (currentTimeVal >= 420 && currentTimeVal < 990) {
                isOpen = true;
                closingTime = '16.30 WIB';
            }
        } else if (day === 5) {
            // Jumat: 07.00 - 14.30 (420 - 870 menit)
            if (currentTimeVal >= 420 && currentTimeVal < 870) {
                isOpen = true;
                closingTime = '14.30 WIB';
            }
        } else if (day === 6) {
            // Sabtu: 07.00 - 11.30 (420 - 690 menit)
            if (currentTimeVal >= 420 && currentTimeVal < 690) {
                isOpen = true;
                closingTime = '11.30 WIB';
            }
        }

        if (isOpen) {
            statusPill.className = 'live-status-pill status-open';
            statusPill.innerHTML = `<span class="live-status-dot"></span> Buka Sekarang • Tutup ${closingTime}`;
        } else {
            statusPill.className = 'live-status-pill status-closed';
            const nextOpen = (day === 6 && currentTimeVal >= 690) || day === 0 ? 'Senin 07.00 WIB' : 'Besok 07.00 WIB';
            statusPill.innerHTML = `<span class="live-status-dot"></span> Sedang Tutup • Buka ${nextOpen}`;
        }
    };

    initServiceHoursStatus();

    // =========================================================================
    // VIDEO SHOWCASE CONTROLLER (SI IMUN PUSKESMAS BULUSAN)
    // =========================================================================
    const initVideoShowcase = () => {
        const video = document.getElementById('imunisasiVideo');
        if (!video) return;

        const centerPlayBtn = document.getElementById('videoCenterPlayBtn');
        const triggerPlayBtn = document.getElementById('btnTriggerPlayVideo');
        const vPlayPauseBtn = document.getElementById('vPlayPauseBtn');
        const vMuteBtn = document.getElementById('vMuteBtn');
        const vFullscreenBtn = document.getElementById('vFullscreenBtn');
        const track = document.getElementById('videoProgressTrack');
        const fill = document.getElementById('videoProgressFill');
        const timeDisplay = document.getElementById('vTimeDisplay');

        const formatTime = (seconds) => {
            if (isNaN(seconds) || seconds < 0) return '00:00';
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
        };

        const updatePlayUI = (isPlaying) => {
            if (centerPlayBtn) {
                if (isPlaying) {
                    centerPlayBtn.classList.add('playing');
                } else {
                    centerPlayBtn.classList.remove('playing');
                }
            }

            if (vPlayPauseBtn) {
                const icPlay = vPlayPauseBtn.querySelector('.v-ic-play');
                const icPause = vPlayPauseBtn.querySelector('.v-ic-pause');
                if (icPlay && icPause) {
                    icPlay.style.display = isPlaying ? 'none' : 'block';
                    icPause.style.display = isPlaying ? 'block' : 'none';
                }
            }

            if (triggerPlayBtn) {
                const label = triggerPlayBtn.querySelector('span');
                if (label) {
                    label.textContent = isPlaying ? 'Jeda Video' : 'Putar Video';
                }
            }
        };

        const togglePlay = () => {
            if (video.paused || video.ended) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        };

        if (centerPlayBtn) centerPlayBtn.addEventListener('click', togglePlay);
        if (triggerPlayBtn) triggerPlayBtn.addEventListener('click', () => {
            if (video.paused || video.ended) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        });
        if (vPlayPauseBtn) vPlayPauseBtn.addEventListener('click', togglePlay);
        video.addEventListener('click', togglePlay);

        video.addEventListener('play', () => updatePlayUI(true));
        video.addEventListener('pause', () => updatePlayUI(false));
        video.addEventListener('ended', () => {
            updatePlayUI(false);
            if (fill) fill.style.width = '0%';
        });

        // Time and Progress Updates
        video.addEventListener('timeupdate', () => {
            if (video.duration && fill) {
                const pct = (video.currentTime / video.duration) * 100;
                fill.style.width = `${pct}%`;
            }
            if (timeDisplay) {
                const current = formatTime(video.currentTime);
                const total = formatTime(video.duration || 36);
                timeDisplay.textContent = `${current} / ${total}`;
            }
        });

        // Scrubbing on Progress Track
        if (track) {
            track.addEventListener('click', (e) => {
                const rect = track.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                if (video.duration) {
                    video.currentTime = Math.max(0, Math.min(pos * video.duration, video.duration));
                }
            });
        }

        // Mute / Unmute
        if (vMuteBtn) {
            vMuteBtn.addEventListener('click', () => {
                video.muted = !video.muted;
                const icSound = vMuteBtn.querySelector('.v-ic-sound');
                const icMute = vMuteBtn.querySelector('.v-ic-mute');
                if (icSound && icMute) {
                    icSound.style.display = video.muted ? 'none' : 'block';
                    icMute.style.display = video.muted ? 'block' : 'none';
                }
            });
        }

        // Fullscreen Toggle
        if (vFullscreenBtn) {
            vFullscreenBtn.addEventListener('click', () => {
                const frame = video.closest('.phone-mockup-frame') || video;
                if (!document.fullscreenElement) {
                    if (frame.requestFullscreen) {
                        frame.requestFullscreen();
                    } else if (video.webkitEnterFullscreen) {
                        video.webkitEnterFullscreen();
                    }
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    }
                }
            });
        }
    };

    initVideoShowcase();
});
