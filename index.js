document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LENIS
    ===================================================== */

    if (typeof Lenis !== "undefined") {

        const lenis = new Lenis({
            duration: 1.15,
            smoothWheel: true,
            touchMultiplier: 1
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        if (typeof ScrollTrigger !== "undefined") {
            lenis.on("scroll", ScrollTrigger.update);
        }
    }


    /* =====================================================
       GSAP
    ===================================================== */

    if (
        typeof gsap !== "undefined" &&
        typeof ScrollTrigger !== "undefined"
    ) {

        gsap.registerPlugin(ScrollTrigger);


        // HERO TOP

        gsap.from(".hero-top", {
            y: -20,
            opacity: 0,
            duration: .7,
            ease: "power3.out"
        });


        // EYEBROW

        gsap.from(".hero .eyebrow", {
            y: 25,
            opacity: 0,
            duration: .7,
            delay: .12,
            ease: "power3.out"
        });


        // TITLE

        gsap.from(".hero h1", {
            y: 60,
            opacity: 0,
            duration: 1,
            delay: .2,
            ease: "power3.out"
        });


        // DESCRIPTION

        gsap.from(".hero-description", {
            y: 25,
            opacity: 0,
            duration: .7,
            delay: .35,
            ease: "power3.out"
        });


        // BUTTON

        gsap.from(".hero-actions", {
            y: 20,
            opacity: 0,
            duration: .6,
            delay: .45,
            ease: "power3.out"
        });


        // HERO BOTTOM

        gsap.from(".hero-bottom", {
            y: 20,
            opacity: 0,
            duration: .7,
            delay: .55,
            ease: "power3.out"
        });


        /* =================================================
           SCROLL REVEAL
        ================================================= */

/* =================================================
   SCROLL REVEAL
================================================= */

gsap.utils.toArray(".reveal").forEach((element) => {

    gsap.fromTo(
        element,
        {
            opacity: 0,
            y: 28
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",

            scrollTrigger: {
                trigger: element,
                start: "top 86%",
                once: true
            }
        }
    );

});


        /* =================================================
           PROFILE IMAGE PARALLAX
        ================================================= */

        gsap.utils.toArray(".profile-photo img").forEach((image) => {

            gsap.to(image, {

                yPercent: 5,

                ease: "none",

                scrollTrigger: {
                    trigger: image,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }

            });

        });

    }
/* =====================================================
   HERO DAY / NIGHT — AUTO ROTATE
===================================================== */

const dayImage =
    document.querySelector(".hero-day");

const nightImage =
    document.querySelector(".hero-night");

const modeIcon =
    document.getElementById("modeIcon");

const modeText =
    document.getElementById("modeText");

const modeButton =
    document.getElementById("heroModeToggle");


/* =====================================================
   ABOUT TETAP PUTIH
===================================================== */

const aboutSection =
    document.querySelector(".about-section");

const ABOUT_COLOR =
    "#f5f4f0";

if (aboutSection) {
    aboutSection.style.backgroundColor =
        ABOUT_COLOR;
}



/* =====================================================
   AUTO MODE
===================================================== */

if (dayImage && nightImage) {

    let isNight = false;
    let switchTimer = null;


    /* -------------------------------------------------
       POSISI AWAL
    ------------------------------------------------- */
gsap.set(dayImage, {
    opacity: 1,
    scale: 1.04
});

gsap.set(nightImage, {
    opacity: 0,
    scale: 1.04
});

    /* =================================================
       GANTI SUASANA
    ================================================= */

    function changeHeroMode(nightMode) {

        isNight = nightMode;


        const currentHero =
            isNight
                ? dayImage
                : nightImage;

        const nextHero =
            isNight
                ? nightImage
                : dayImage;


        /* hentikan animasi lama */

        gsap.killTweensOf([
            dayImage,
            nightImage
        ]);


        /* pastikan hero berikutnya mulai dari posisi
           yang sedikit membesar */

        gsap.set(nextHero, {
            opacity: 0,
            scale: 1.075
        });


        /* =================================================
           CROSSFADE LAMA & SMOOTH
        ================================================= */

        const tl =
            gsap.timeline({
                defaults: {
                    ease: "power2.inOut"
                }
            });


        /* HERO LAMA KELUAR */

        tl.to(
            currentHero,
            {
                opacity: 0,
                scale: 1.085,
                duration: 3.2
            },
            0
        );


        /* HERO BARU MASUK */

        tl.to(
            nextHero,
            {
                opacity: 1,
                scale: 1.04,
                duration: 4.2,
                ease: "power2.out"
            },
            0.35
        );


        /* =================================================
           UPDATE TOMBOL KALAU MASIH ADA DI HTML
        ================================================= */

        if (modeButton) {

            modeButton.setAttribute(
                "aria-pressed",
                String(isNight)
            );

        }


        if (modeIcon) {

            modeIcon.innerHTML =
                isNight
                    ? '<i class="bi bi-sun"></i>'
                    : '<i class="bi bi-moon-stars"></i>';

        }


        if (modeText) {

            modeText.textContent =
                isNight
                    ? "PAGI"
                    : "MALAM";

        }


        /* =================================================
           ABOUT TETAP PUTIH
        ================================================= */

        if (aboutSection) {

            aboutSection.style.backgroundColor =
                ABOUT_COLOR;

        }


        /* =================================================
           WAVE TETAP PUTIH
        ================================================= */

        if (wave) {

            wave.style.fill =
                ABOUT_COLOR;

            wave.style.transition =
                "none";

        }

    }


    /* =================================================
       JADWAL OTOMATIS
    ================================================= */

    function scheduleNextMode() {

        clearTimeout(switchTimer);


        /*
         * Tunggu cukup lama supaya user menikmati
         * suasana hero sebelum berganti.
         */
        switchTimer =
            setTimeout(() => {

                changeHeroMode(!isNight);

                scheduleNextMode();

            }, 9000);

    }


    /* =================================================
       MULAI DARI PAGI
    ================================================= */

    changeHeroMode(false);


    /*
     * Setelah hero tampil,
     * tunggu 9 detik sebelum pergantian pertama.
     */

    scheduleNextMode();


    /* =================================================
       JEDA SAAT TAB TIDAK AKTIF
    ================================================= */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                clearTimeout(
                    switchTimer
                );

                return;

            }


            scheduleNextMode();

        }
    );

}
    /* =====================================================
       COUNT UP
    ===================================================== */

    const counters =
        document.querySelectorAll("[data-count]");


    if (counters.length > 0) {


        function countUp(element) {

            const target =
                Number(element.dataset.count);

            const duration = 1200;

            const start =
                performance.now();


            function animate(time) {

                const progress =
                    Math.min(
                        (time - start) / duration,
                        1
                    );


                const eased =
                    1 - Math.pow(
                        1 - progress,
                        3
                    );


                element.textContent =
                    Math.floor(
                        target * eased
                    ).toLocaleString("id-ID");


                if (progress < 1) {

                    requestAnimationFrame(
                        animate
                    );

                }

            }


            requestAnimationFrame(
                animate
            );

        }


        if ("IntersectionObserver" in window) {

            const observer =
                new IntersectionObserver(
                    (entries, observer) => {

                        entries.forEach(entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                countUp(
                                    entry.target
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        });

                    },
                    {
                        threshold: .4
                    }
                );


            counters.forEach(counter => {

                observer.observe(counter);

            });

        } else {

            counters.forEach(counter => {

                countUp(counter);

            });

        }

    }


    /* =====================================================
       ACTIVE NAVBAR
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        navLinks.forEach(link => {

                            link.classList.toggle(

                                "active",

                                link.getAttribute(
                                    "href"
                                ) ===
                                `#${entry.target.id}`

                            );

                        });

                    });

                },
                {
                    rootMargin:
                        "-40% 0px -50% 0px"
                }
            );


        sections.forEach(section => {

            sectionObserver.observe(
                section
            );

        });

    }


    /* =====================================================
       NAVBAR MOBILE AUTO CLOSE
    ===================================================== */

    const nav =
        document.getElementById("mainNav");

    const links =
        document.querySelectorAll(
            "#mainNav .nav-link"
        );


    if (nav && typeof bootstrap !== "undefined") {

        links.forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    const collapse =
                        bootstrap.Collapse
                            .getInstance(nav);

                    if (collapse) {

                        collapse.hide();

                    }

                }
            );

        });

    }

});

/* =========================================================
   ABOUT WALI KOTA - SMOOTH GSAP ANIMATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
        console.warn("GSAP / ScrollTrigger belum tersedia.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const aboutSection = document.querySelector(".about-section");

    if (!aboutSection) return;


    /* =====================================================
       ELEMENT ABOUT
    ===================================================== */

    const label = aboutSection.querySelector(".about-label");
    const title = aboutSection.querySelector(".about-title");
    const line = aboutSection.querySelector(".about-line");
    const descriptions = aboutSection.querySelectorAll(".about-description");
    const button = aboutSection.querySelector(".about-button");

    const leaders = aboutSection.querySelectorAll(".leader-card");
    const photos = aboutSection.querySelectorAll(".leader-photo");
    const infos = aboutSection.querySelectorAll(".leader-info");


    /* =====================================================
       SET INITIAL STATE
    ===================================================== */

    gsap.set(
        [
            label,
            title,
            line,
            ...descriptions,
            button
        ],
        {
            opacity: 0,
            y: 35
        }
    );


    gsap.set(leaders, {
        opacity: 0,
        y: 55,
        scale: 0.97
    });


    gsap.set(photos, {
        y: 20,
        scale: 0.98
    });


    gsap.set(infos, {
        opacity: 0,
        y: 18
    });


    /* =====================================================
       TIMELINE
    ===================================================== */

    const aboutTimeline = gsap.timeline({
        paused: true,
        defaults: {
            ease: "power4.out"
        }
    });


    /* LABEL */

    aboutTimeline.to(label, {
        opacity: 1,
        y: 0,
        duration: 1.1
    }, 0);


    /* TITLE */

    aboutTimeline.to(title, {
        opacity: 1,
        y: 0,
        duration: 1.25
    }, 0.15);


    /* GARIS */

    aboutTimeline.to(line, {
        opacity: 1,
        scaleX: 1,
        transformOrigin: "left center",
        duration: 1
    }, 0.38);


    /* PARAGRAF */

    aboutTimeline.to(descriptions, {
        opacity: 1,
        y: 0,
        duration: 1.15,
        stagger: 0.16
    }, 0.42);


    /* BUTTON */

    aboutTimeline.to(button, {
        opacity: 1,
        y: 0,
        duration: 1
    }, 0.78);


    /* =====================================================
       FOTO PEMIMPIN
    ===================================================== */

    aboutTimeline.to(leaders, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.35,
        stagger: 0.16,
        ease: "power4.out"
    }, 0.12);


    /* Gerakan kecil foto */

    aboutTimeline.to(photos, {
        y: 0,
        scale: 1,
        duration: 1.5,
        stagger: 0.14,
        ease: "power3.out"
    }, 0.18);


    /* Nama + jabatan */

    aboutTimeline.to(infos, {
        opacity: 1,
        y: 0,
        duration: 1.05,
        stagger: 0.16
    }, 0.72);


    /* =====================================================
       SCROLL TRIGGER
    ===================================================== */

    ScrollTrigger.create({
        trigger: aboutSection,
        start: "top 75%",
        once: true,

        onEnter: () => {
            aboutTimeline.play();
        }
    });

});

/* =========================================================
   ABOUT BORDER REVEAL
   ========================================================= */

const aboutBorders = document.querySelectorAll(
    ".about-leaders::before, .about-leaders::after"
);

// ANIMASI ANGKA STAT 0 -> NILAI AKHIR
document.addEventListener("DOMContentLoaded", () => {
    const stats = document.querySelectorAll(".howto-stat strong");

    stats.forEach((el) => {
        const target = parseInt(el.textContent.trim(), 10);

        if (isNaN(target)) return;

        el.textContent = "0";

        let start = 0;
        const duration = 1400; // 1.4 detik
        const startTime = performance.now();

        function animateNumber(currentTime) {
            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            // ease out
            const eased = 1 - Math.pow(1 - progress, 3);

            start = Math.floor(eased * target);
            el.textContent = start;

            if (progress < 1) {
                requestAnimationFrame(animateNumber);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(animateNumber);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const darkSection = document.querySelector(".howto-section");

    if (!header || !darkSection) return;

    function updateHeaderTheme() {
        const rect = darkSection.getBoundingClientRect();

        if (rect.top <= 90 && rect.bottom > 90) {
            header.classList.add("on-dark");
        } else {
            header.classList.remove("on-dark");
        }
    }

    window.addEventListener("scroll", updateHeaderTheme, { passive: true });
    window.addEventListener("resize", updateHeaderTheme);

    updateHeaderTheme();
});

const howtoSection = document.querySelector(".howto-section");
const howtoStatus = document.querySelector(".howto-status");

let howtoRAF = null;

function updateHowtoStatus() {

    if (!howtoSection || !howtoStatus) return;

    if (howtoRAF) return;

    howtoRAF = requestAnimationFrame(() => {

        const rect = howtoSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Belum masuk section
        if (rect.top >= viewportHeight) {
            howtoStatus.style.visibility = "hidden";
            howtoStatus.style.transform = "translateY(0)";
            howtoRAF = null;
            return;
        }

        // Sudah lewat section
        if (rect.bottom <= 0) {
            howtoStatus.style.visibility = "hidden";
            howtoStatus.style.transform = "translateY(0)";
            howtoRAF = null;
            return;
        }

        howtoStatus.style.visibility = "visible";

        // Masih di dalam section → tetap di bawah layar
        if (rect.bottom >= viewportHeight) {

            howtoStatus.style.transform = "translateY(0)";

        } else {

            // Naik mengikuti akhir section
            const offset = viewportHeight - rect.bottom;

            howtoStatus.style.transform =
                `translateY(-${offset}px)`;
        }

        howtoRAF = null;
    });
}

window.addEventListener("scroll", updateHowtoStatus, {
    passive: true
});

window.addEventListener("resize", updateHowtoStatus);

updateHowtoStatus();

/* =====================================================
   MEETING DETAIL → PREVIEW FOTO 16:9
===================================================== */

document.querySelectorAll(".meeting-detail-btn").forEach((button) => {

    button.addEventListener("click", function (e) {

        e.preventDefault();
        e.stopPropagation();

        const preview = document.getElementById("meetingPreview");
        const previewImg = document.getElementById("meetingPreviewImg");
        const previewTitle = document.getElementById("meetingPreviewTitle");
        const previewRoom = document.getElementById("meetingPreviewRoom");
        const previewMeta = document.getElementById("meetingPreviewMeta");

        if (!preview || !previewImg) return;

        /* FOTO ASLI */
        previewImg.src = this.dataset.image || "";

        /* JUDUL */
        if (previewTitle) {
            previewTitle.textContent = this.dataset.title || "";
        }

        /* RUANG */
        if (previewRoom) {
            previewRoom.textContent = this.dataset.room || "RUANG RAPAT";
        }

        /* INFO */
        if (previewMeta) {
            const capacity = this.dataset.capacity || "";
            const facility = this.dataset.facility || "";

            previewMeta.textContent =
                [capacity, facility]
                    .filter(Boolean)
                    .join(" • ");
        }

        /* BUKA MODAL */
        preview.classList.add("is-open");

        document.body.style.overflow = "hidden";

        if (typeof gsap !== "undefined") {
            gsap.fromTo(
                ".meeting-preview-box",
                {
                    opacity: 0,
                    y: 25,
                    scale: 0.96
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.45,
                    ease: "power3.out"
                }
            );
        }
    });

});


/* =====================================================
   CLOSE PREVIEW
===================================================== */

const meetingPreview =
    document.getElementById("meetingPreview");

const meetingPreviewClose =
    document.getElementById("meetingPreviewClose");


function closeMeetingPreview() {

    if (!meetingPreview) return;

    if (typeof gsap !== "undefined") {

        gsap.to(".meeting-preview-box", {
            opacity: 0,
            y: 20,
            scale: 0.97,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => {

                meetingPreview.classList.remove("is-open");

                document.body.style.overflow = "";
            }
        });

    } else {

        meetingPreview.classList.remove("is-open");

        document.body.style.overflow = "";
    }
}


/* tombol X */
meetingPreviewClose?.addEventListener(
    "click",
    closeMeetingPreview
);


/* klik area hitam */
meetingPreview?.addEventListener("click", function (e) {

    if (e.target === meetingPreview) {
        closeMeetingPreview();
    }

});


/* tombol ESC */
document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {
        closeMeetingPreview();
    }

});

document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const tallCard = document.querySelector(".leader-card-tall");

    if (!tallCard) return;

    gsap.set(tallCard, {
        y: 180
    });

    gsap.to(tallCard, {
        y: 0,
        ease: "none",
        scrollTrigger: {
            trigger: tallCard,
            start: "top 90%",
            end: "top 45%",
            scrub: 1.5,
            invalidateOnRefresh: true
        }
    });

    window.addEventListener("load", () => {
        ScrollTrigger.refresh();
    });
});

const leaderCopy = document.querySelector(".leader-copy");

if (leaderCopy) {
    gsap.set(leaderCopy, {
        x: -120,
        opacity: 0
    });

    gsap.to(leaderCopy, {
        x: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
            trigger: leaderCopy,
            start: "top 90%",
            end: "top 45%",
            scrub: 1.5,
            invalidateOnRefresh: true
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {

    if (typeof gsap === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const heroTitle = document.querySelector(".hero-editorial-title");
    const heroDescription = document.querySelector(".hero-editorial-description");
    const heroNote = document.querySelector(".hero-editorial-note");

    if (!heroTitle) return;

    gsap.set(
        [heroTitle, heroDescription, heroNote],
        {
            opacity: 0,
            y: 35
        }
    );

    const heroReveal = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            once: true
        }
    });

    heroReveal
        .to(heroTitle, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out"
        })
        .to(heroDescription, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out"
        }, "-=0.35")
        .to(heroNote, {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out"
        }, "-=0.25");

});

/* =====================================================
   AUTH OVERLAY
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const authOverlay =
        document.getElementById("authOverlay");

    const openAuth =
        document.getElementById("openAuth");

    const closeAuth =
        document.getElementById("closeAuth");

    const loginBox =
        document.getElementById("indexLoginBox");

    const registerBox =
        document.getElementById("indexRegisterBox");

    const showRegister =
        document.getElementById("showIndexRegister");

    const showLogin =
        document.getElementById("showIndexLogin");


    if (
        !authOverlay ||
        !openAuth ||
        !closeAuth ||
        !loginBox ||
        !registerBox
    ) {
        return;
    }


    /* ================================================
       OPEN
    ================================================= */

    openAuth.addEventListener("click", () => {

        authOverlay.classList.add("active");

        document.body.classList.add("auth-open");

        gsap.fromTo(
            authOverlay,
            {
                opacity: 0
            },
            {
                opacity: 1,
                duration: .35,
                ease: "power2.out"
            }
        );

        gsap.fromTo(
            ".auth-modal",
            {
                y: 35,
                scale: .97,
                opacity: 0
            },
            {
                y: 0,
                scale: 1,
                opacity: 1,
                duration: .55,
                ease: "power4.out"
            }
        );

    });


    /* ================================================
       CLOSE
    ================================================= */

    function closeAuthModal() {

        gsap.to(
            ".auth-modal",
            {
                y: 25,
                scale: .98,
                opacity: 0,
                duration: .3,
                ease: "power2.in"
            }
        );

        gsap.to(
            authOverlay,
            {
                opacity: 0,
                duration: .25,
                onComplete: () => {

                    authOverlay.classList.remove("active");

                    document.body.classList.remove("auth-open");

                    loginBox.style.display = "flex";

                    registerBox.style.display = "none";

                }
            }
        );

    }


    closeAuth.addEventListener(
        "click",
        closeAuthModal
    );


    /* ================================================
       CLICK OUTSIDE
    ================================================= */

    authOverlay.addEventListener("click", (event) => {

        if (event.target === authOverlay) {
            closeAuthModal();
        }

    });


    /* ================================================
       REGISTER
    ================================================= */

    showRegister?.addEventListener("click", () => {

        gsap.to(
            loginBox,
            {
                x: -35,
                opacity: 0,
                duration: .25,
                ease: "power2.in",
                onComplete: () => {

                    loginBox.style.display = "none";

                    registerBox.style.display = "flex";

                    gsap.fromTo(
                        registerBox,
                        {
                            x: 35,
                            opacity: 0
                        },
                        {
                            x: 0,
                            opacity: 1,
                            duration: .45,
                            ease: "power4.out"
                        }
                    );

                }
            }
        );

    });


    /* ================================================
       LOGIN
    ================================================= */

    showLogin?.addEventListener("click", () => {

        gsap.to(
            registerBox,
            {
                x: 35,
                opacity: 0,
                duration: .25,
                ease: "power2.in",
                onComplete: () => {

                    registerBox.style.display = "none";

                    loginBox.style.display = "flex";

                    gsap.fromTo(
                        loginBox,
                        {
                            x: -35,
                            opacity: 0
                        },
                        {
                            x: 0,
                            opacity: 1,
                            duration: .45,
                            ease: "power4.out"
                        }
                    );

                }
            }
        );

    });


    /* ================================================
       ESC
    ================================================= */

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            authOverlay.classList.contains("active")
        ) {
            closeAuthModal();
        }

    });


    /* ================================================
       PASSWORD TOGGLE
    ================================================= */

    document
        .querySelectorAll(
            "#authOverlay .password-toggle"
        )
        .forEach((button) => {

            button.addEventListener("click", () => {

                const targetId =
                    button.dataset.target;

                const input =
                    document.getElementById(targetId);

                const icon =
                    button.querySelector("i");

                if (!input) return;


                if (input.type === "password") {

                    input.type = "text";

                    icon.classList.remove(
                        "bi-eye"
                    );

                    icon.classList.add(
                        "bi-eye-slash"
                    );

                } else {

                    input.type = "password";

                    icon.classList.remove(
                        "bi-eye-slash"
                    );

                    icon.classList.add(
                        "bi-eye"
                    );

                }

            });

        });

});


/* =====================================================
   PROFILE DROPDOWN
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const profileMenu =
        document.getElementById("profileMenu");

    const profileTrigger =
        document.getElementById("profileTrigger");

    const profileUpload =
        document.getElementById("profileUpload");

    const profilePreview =
        document.getElementById("profilePreview");

    const profileMainAvatar =
        profileMenu?.querySelector(
            ".profile-avatar img"
        );

    const avatarOptions =
        document.querySelectorAll(
            ".avatar-option"
        );


    if (!profileMenu || !profileTrigger) {
        return;
    }


    /* =================================================
       OPEN / CLOSE
    ================================================= */

    profileTrigger.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            profileMenu.classList.toggle(
                "is-open"
            );

        }
    );


    document.addEventListener(
        "click",
        (event) => {

            if (
                !profileMenu.contains(event.target)
            ) {

                profileMenu.classList.remove(
                    "is-open"
                );

            }

        }
    );


    /* =================================================
       UPLOAD FOTO SENDIRI
    ================================================= */

    profileUpload?.addEventListener(
        "click",
        () => {

            profileUpload
                .parentElement
                ?.querySelector("#profileUpload")
                ?.click();

        }
    );


    profileUpload?.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                document
                    .getElementById("profileUpload")
                    ?.click();

            }

        }
    );


    profileUpload?.closest(
        ".profile-dropdown"
    )?.querySelector(
        "#profileUpload"
    )?.addEventListener(
        "change",
        function () {

            const file =
                this.files?.[0];

            if (!file) {
                return;
            }


            const allowedTypes = [
                "image/jpeg",
                "image/png",
                "image/webp"
            ];


            if (
                !allowedTypes.includes(
                    file.type
                )
            ) {

                alert(
                    "Format foto harus JPG, PNG, atau WEBP."
                );

                this.value = "";

                return;

            }


            const maxSize =
                3 * 1024 * 1024;


            if (file.size > maxSize) {

                alert(
                    "Ukuran foto maksimal 3 MB."
                );

                this.value = "";

                return;

            }


            const reader =
                new FileReader();


            reader.onload = function () {

                const imageSrc =
                    reader.result;


                if (profilePreview) {
                    profilePreview.src =
                        imageSrc;
                }


                if (profileMainAvatar) {
                    profileMainAvatar.src =
                        imageSrc;
                }


                /*
                 * Preview langsung.
                 * File akan disimpan permanen
                 * melalui profile_update.php.
                 */

                const formData =
                    new FormData();

                formData.append(
                    "foto",
                    file
                );


                fetch(
                    "profile_update.php",
                    {
                        method: "POST",
                        body: formData
                    }
                )
                .then(
                    response =>
                        response.json()
                )
                .then(
                    data => {

                        if (
                            !data.success
                        ) {

                            alert(
                                data.message ||
                                "Foto gagal disimpan."
                            );

                        }

                    }
                )
                .catch(
                    () => {

                        alert(
                            "Terjadi kesalahan saat mengupload foto."
                        );

                    }
                );

            };


            reader.readAsDataURL(file);

        }
    );


    /* =================================================
       PILIH AVATAR BAWAAN
    ================================================= */

    avatarOptions.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const avatar =
                        button.dataset.avatar;

                    if (!avatar) {
                        return;
                    }


                    if (profilePreview) {
                        profilePreview.src =
                            avatar;
                    }


                    if (profileMainAvatar) {
                        profileMainAvatar.src =
                            avatar;
                    }


                    avatarOptions.forEach(
                        item => {
                            item.classList.remove(
                                "active"
                            );
                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    const formData =
                        new FormData();

                    formData.append(
                        "avatar",
                        avatar
                    );


                    fetch(
                        "profile_update.php",
                        {
                            method: "POST",
                            body: formData
                        }
                    )
                    .then(
                        response =>
                            response.json()
                    )
                    .then(
                        data => {

                            if (
                                !data.success
                            ) {

                                alert(
                                    data.message ||
                                    "Avatar gagal disimpan."
                                );

                            }

                        }
                    )
.catch(
    (error) => {
        console.error("Avatar gagal disimpan:", error);

        alert(
            "Avatar gagal disimpan: " +
            (error.message || "Terjadi kesalahan.")
        );
    }
);
                }
            );

        }
    );

});

/* =====================================================
   PROFILE EDIT FOTO
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const profileMenu =
        document.getElementById("profileMenu");

    const profileEditPhoto =
        document.getElementById("profileEditPhoto");

    const profileEditBack =
        document.getElementById("profileEditBack");


    if (!profileMenu) {
        return;
    }


    /* BUKA EDIT FOTO */

    profileEditPhoto?.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            profileMenu.classList.add(
                "is-editing"
            );

        }
    );


    /* KEMBALI KE PROFILE */

    profileEditBack?.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            profileMenu.classList.remove(
                "is-editing"
            );

        }
    );

});