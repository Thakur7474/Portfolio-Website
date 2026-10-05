/* =========================================================
   SHIV SINGH PORTFOLIO
   COMPLETE SCRIPT.JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const navbar = document.getElementById("navbar");

    const menuToggle = document.getElementById("menuToggle");
    const navLinksContainer = document.getElementById("navLinks");

    const navLinks = document.querySelectorAll(
        ".nav-links a"
    );

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const themeToggle =
        document.getElementById("themeToggle");

    const themePanel =
        document.getElementById("themePanel");

    const themeButtons =
        document.querySelectorAll(".theme-btn");

    const projectModal =
        document.getElementById("projectModal");

    const modalClose =
        document.getElementById("modalClose");

    const modalTitle =
        document.getElementById("modalTitle");

    const modalText =
        document.getElementById("modalText");

    const projectLinks =
        document.querySelectorAll("[data-demo]");

    const contactForm =
        document.getElementById("contactForm");

    const formNote =
        document.getElementById("formNote");

    const yearElement =
        document.getElementById("year");


    /* =====================================================
       YEAR
    ===================================================== */

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       NAVBAR
       DESKTOP + MOBILE
    ===================================================== */

    function closeMobileMenu() {

        if (navLinksContainer) {
            navLinksContainer.classList.remove("open");
        }

        if (menuToggle) {
            menuToggle.classList.remove("active");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );
            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    }


    function openMobileMenu() {

        if (navLinksContainer) {
            navLinksContainer.classList.add("open");
        }

        if (menuToggle) {
            menuToggle.classList.add("active");
            menuToggle.setAttribute(
                "aria-label",
                "Close navigation"
            );
            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );
        }
    }


    if (menuToggle && navLinksContainer) {

        menuToggle.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            const isOpen =
                navLinksContainer.classList.contains("open");

            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }

        });

    }


    /* =====================================================
       NAVBAR ACTIVE LINK
    ===================================================== */

    function setActiveNav(sectionId) {

        if (!sectionId) return;

        navLinks.forEach((link) => {

            const linkTarget =
                link.getAttribute("href");

            if (
                linkTarget === `#${sectionId}`
            ) {

                link.classList.add("active");

            } else {

                link.classList.remove("active");

            }

        });

    }


    /* =====================================================
       GET NAVBAR HEIGHT
    ===================================================== */

    function getNavbarHeight() {

        if (!navbar) {
            return 0;
        }

        return navbar.offsetHeight;
    }


    /* =====================================================
       SCROLL TO SECTION
    ===================================================== */

    function scrollToSection(sectionId) {

        const section =
            document.getElementById(sectionId);

        if (!section) return;

        const navbarHeight =
            getNavbarHeight();

        const sectionTop =
            section.getBoundingClientRect().top +
            window.scrollY;

        const targetPosition =
            sectionTop - navbarHeight;

        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: "smooth"
        });

    }


    /* =====================================================
       NAVIGATION CLICK
    ===================================================== */

    navLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const href =
                link.getAttribute("href");

            if (
                !href ||
                !href.startsWith("#")
            ) {
                return;
            }

            const sectionId =
                href.substring(1);

            const section =
                document.getElementById(sectionId);

            if (!section) {
                return;
            }

            event.preventDefault();

            setActiveNav(sectionId);

            scrollToSection(sectionId);

            closeMobileMenu();

            /*
             * Update browser URL without jumping.
             */
            if (
                window.history &&
                window.history.pushState
            ) {

                window.history.pushState(
                    null,
                    "",
                    `#${sectionId}`
                );

            }

        });

    });


    /* =====================================================
       ACTIVE NAVBAR WHILE SCROLLING
       
       IMPORTANT:
       This does NOT depend on IntersectionObserver.
       It calculates the section currently visible.
    ===================================================== */

    let scrollTicking = false;

    function updateActiveSection() {

        if (!sections.length) {
            return;
        }

        const navbarHeight =
            getNavbarHeight();

        const scrollPosition =
            window.scrollY +
            navbarHeight +
            120;

        let currentSection =
            sections[0].id;

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop;

            if (
                scrollPosition >= sectionTop
            ) {

                currentSection =
                    section.id;

            }

        });

        setActiveNav(currentSection);

        scrollTicking = false;
    }


    window.addEventListener(
        "scroll",
        () => {

            if (!scrollTicking) {

                window.requestAnimationFrame(
                    updateActiveSection
                );

                scrollTicking = true;

            }

        },
        { passive: true }
    );


    /* =====================================================
       INITIAL NAVBAR STATE
    ===================================================== */

    function setInitialSection() {

        const hash =
            window.location.hash
                .replace("#", "")
                .trim();

        if (
            hash &&
            document.getElementById(hash)
        ) {

            setActiveNav(hash);

            /*
             * Wait until layout is completely ready.
             */
            setTimeout(() => {

                scrollToSection(hash);

            }, 100);

        } else {

            setActiveNav("home");

        }

    }


    setInitialSection();


    /* =====================================================
       HANDLE BROWSER BACK / FORWARD
    ===================================================== */

    window.addEventListener(
        "popstate",
        () => {

            const hash =
                window.location.hash
                    .replace("#", "")
                    .trim();

            if (
                hash &&
                document.getElementById(hash)
            ) {

                setActiveNav(hash);

                setTimeout(() => {

                    scrollToSection(hash);

                }, 50);

            } else {

                setActiveNav("home");

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }

        }
    );


    /* =====================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            if (
                !navLinksContainer ||
                !menuToggle
            ) {
                return;
            }

            const clickedInsideMenu =
                navLinksContainer.contains(
                    event.target
                );

            const clickedToggle =
                menuToggle.contains(
                    event.target
                );

            if (
                !clickedInsideMenu &&
                !clickedToggle
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       CLOSE MOBILE MENU ON RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 800) {
                closeMobileMenu();
            }

        }
    );


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 40) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

    updateNavbar();

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );


    /* =====================================================
       THEME SWITCHER
    ===================================================== */

    /*
     * Supports BOTH:
     *
     * Old theme names:
     * green
     * blue
     * orange
     * red
     * purple
     * cyan
     *
     * New theme names:
     * green-black
     * yellow-black
     * orange-black
     * cyan-black
     * red-black
     * purple-black
     * ice-blue-black
     */

    const validThemes = [
        "green",
        "blue",
        "orange",
        "red",
        "purple",
        "cyan",
        "red-black",

        "green-black",
        "yellow-black",
        "orange-black",
        "cyan-black",
        "purple-black",
        "ice-blue-black"
    ];


    function applyTheme(theme) {

        if (
            !validThemes.includes(theme)
        ) {

            theme = "green";

        }

        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

        localStorage.setItem(
            "portfolioTheme",
            theme
        );

    }


    function closeThemePanel() {

        if (!themePanel) return;

        themePanel.classList.remove(
            "active"
        );

    }


    function openThemePanel() {

        if (!themePanel) return;

        themePanel.classList.add(
            "active"
        );

    }


    /* Load saved theme */

    const savedTheme =
        localStorage.getItem(
            "portfolioTheme"
        );


    applyTheme(
        validThemes.includes(savedTheme)
            ? savedTheme
            : "green"
    );


    /* Theme toggle button */

    if (themeToggle && themePanel) {

        themeToggle.addEventListener(
            "click",
            (event) => {

                event.preventDefault();
                event.stopPropagation();

                const isOpen =
                    themePanel.classList.contains(
                        "active"
                    );

                if (isOpen) {

                    closeThemePanel();

                } else {

                    openThemePanel();

                }

            }
        );

    }


    /* Theme buttons */

    themeButtons.forEach((button) => {

        button.addEventListener(
            "click",
            (event) => {

                event.preventDefault();
                event.stopPropagation();

                const selectedTheme =
                    button.getAttribute(
                        "data-theme"
                    );

                if (!selectedTheme) {
                    return;
                }

                applyTheme(
                    selectedTheme
                );

                closeThemePanel();

            }
        );

    });


    /* Close theme panel outside */

    document.addEventListener(
        "click",
        (event) => {

            if (
                !themePanel ||
                !themeToggle
            ) {
                return;
            }

            const clickedPanel =
                themePanel.contains(
                    event.target
                );

            const clickedToggle =
                themeToggle.contains(
                    event.target
                );

            if (
                !clickedPanel &&
                !clickedToggle
            ) {

                closeThemePanel();

            }

        }
    );


    /* Escape closes theme panel */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                closeThemePanel();

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       PROJECT MODAL
    ===================================================== */

    const projectInformation = {

        "AI Resume Analyzer": {
            title: "AI Resume Analyzer",
            text:
                "An AI-powered resume analysis application that evaluates resumes and provides structured feedback, improvement suggestions and placement-focused insights."
        },

        "PocketBot": {
            title: "PocketBot",
            text:
                "An AI-powered personal assistant designed for productivity, planning, travel and everyday tasks."
        },

        "Melodia Music Player": {
            title: "Melodia Music Player",
            text:
                "A modern music platform focused on smooth playback, playlists, intuitive navigation and an engaging listening experience."
        },

        "WanderLust": {
            title: "WanderLust",
            text:
                "A full-stack travel listing application with listings, reviews, authentication, sessions and MongoDB integration."
        },

        "Quiz Game": {
            title: "Quiz Game",
            text:
                "An interactive quiz application featuring dynamic questions, score tracking and a user-friendly learning experience."
        }

    };


    function openProjectModal(projectName) {

        if (!projectModal) return;

        const information =
            projectInformation[
                projectName
            ] || {
                title: projectName,
                text:
                    "Project information will be available soon."
            };


        if (modalTitle) {

            modalTitle.textContent =
                information.title;

        }


        if (modalText) {

            modalText.textContent =
                information.text;

        }


        projectModal.classList.add(
            "active"
        );

        projectModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );

    }


    function closeProjectModal() {

        if (!projectModal) return;

        projectModal.classList.remove(
            "active"
        );

        projectModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

    }


    projectLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const projectName =
                    link.getAttribute(
                        "data-demo"
                    );

                const href =
                    link.getAttribute(
                        "href"
                    );

                /*
                 * Only open modal for "#"
                 * project links.
                 *
                 * Real external project URLs
                 * continue normally.
                 */

                if (
                    projectName &&
                    (
                        !href ||
                        href === "#"
                    )
                ) {

                    event.preventDefault();

                    openProjectModal(
                        projectName
                    );

                }

            }
        );

    });


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                closeProjectModal();

            }
        );

    }


    if (projectModal) {

        projectModal.addEventListener(
            "click",
            (event) => {

                if (
                    event.target ===
                    projectModal
                ) {

                    closeProjectModal();

                }

            }
        );

    }


    /* =====================================================
       CLOSE MODAL WITH ESCAPE
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                closeProjectModal();

            }

        }
    );


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                const nameInput =
                    document.getElementById(
                        "name"
                    );

                const emailInput =
                    document.getElementById(
                        "email"
                    );

                const messageInput =
                    document.getElementById(
                        "message"
                    );


                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";

                const email =
                    emailInput
                        ? emailInput.value.trim()
                        : "";

                const message =
                    messageInput
                        ? messageInput.value.trim()
                        : "";


                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    if (formNote) {

                        formNote.textContent =
                            "Please fill in all fields.";

                    }

                    return;

                }


                /*
                 * Portfolio is a static website.
                 * Prepare an email using the existing
                 * portfolio email address.
                 */

                const subject =
                    encodeURIComponent(
                        `Portfolio Contact - ${name}`
                    );

                const body =
                    encodeURIComponent(
                        `Name: ${name}\n\n` +
                        `Email: ${email}\n\n` +
                        `Message:\n${message}`
                    );


                if (formNote) {

                    formNote.textContent =
                        "Opening your email app...";

                }


                window.location.href =
                    `mailto:thakur1262007@gmail.com` +
                    `?subject=${subject}` +
                    `&body=${body}`;

            }
        );

    }


    /* =====================================================
       BUTTONS / HASH LINKS
       HERO + CTA + OTHER # LINKS
    ===================================================== */

    const allHashLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    allHashLinks.forEach((link) => {

        /*
         * Navbar links already have their
         * own handler above.
         */

        if (
            link.closest(".nav-links")
        ) {
            return;
        }


        link.addEventListener(
            "click",
            (event) => {

                const href =
                    link.getAttribute(
                        "href"
                    );

                if (
                    !href ||
                    href === "#"
                ) {
                    return;
                }


                const sectionId =
                    href.substring(1);

                const target =
                    document.getElementById(
                        sectionId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();

                /*
                 * If this is a main portfolio
                 * section, update navbar.
                 */

                if (
                    [
                        "home",
                        "about",
                        "services",
                        "portfolio",
                        "pages",
                        "contact"
                    ].includes(sectionId)
                ) {

                    setActiveNav(
                        sectionId
                    );

                }


                scrollToSection(
                    sectionId
                );


                if (
                    window.history &&
                    window.history.pushState
                ) {

                    window.history.pushState(
                        null,
                        "",
                        `#${sectionId}`
                    );

                }

            }
        );

    });


    /* =====================================================
       INITIAL SETUP
    ===================================================== */

    updateActiveSection();

    console.log(
        "Portfolio script loaded successfully."
    );

});
