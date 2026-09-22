// ==================== MODO OSCURO ====================
(function () {
    var savedTheme = localStorage.getItem("bizentra-theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var shouldUseDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    document.documentElement.classList.toggle("dark-mode", shouldUseDark);
    document.body.classList.toggle("dark-mode", shouldUseDark);
})();

document.addEventListener("DOMContentLoaded", function () {
    var body = document.body;
    var toggleButton = document.querySelector(".theme-toggle");
    var icon = toggleButton ? toggleButton.querySelector("i") : null;
    var isDark = body.classList.contains("dark-mode") || document.documentElement.classList.contains("dark-mode");

    if (icon) {
        if (isDark) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        } else {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }
    }

    if (toggleButton) {
        toggleButton.addEventListener("click", function () {
            body.classList.toggle("dark-mode");
            document.documentElement.classList.toggle("dark-mode");
            var isDarkNow = body.classList.contains("dark-mode");
            localStorage.setItem("bizentra-theme", isDarkNow ? "dark" : "light");

            if (icon) {
                if (isDarkNow) {
                    icon.classList.remove("fa-moon");
                    icon.classList.add("fa-sun");
                } else {
                    icon.classList.remove("fa-sun");
                    icon.classList.add("fa-moon");
                }
            }
        });
    }

    // ==================== BARRA DE PROGRESO (VERSIÓN ROBUSTA) ====================
    (function initProgressBar() {
        // 1. Buscar o crear la barra
        var progressBar = document.querySelector(".scroll-progress");
        var progressBarFill = document.querySelector(".scroll-progress-bar");

        // Si no existe el contenedor, lo creamos
        if (!progressBar) {
            progressBar = document.createElement("div");
            progressBar.className = "scroll-progress";
            progressBar.setAttribute("aria-hidden", "true");
            document.body.insertBefore(progressBar, document.body.firstChild);
        }

        // Si no existe el relleno, lo creamos
        if (!progressBarFill) {
            progressBarFill = document.createElement("span");
            progressBarFill.className = "scroll-progress-bar";
            progressBar.innerHTML = "";
            progressBar.appendChild(progressBarFill);
        }

        // 2. Asegurarnos de que esté al principio del body
        if (progressBar.parentElement !== document.body) {
            document.body.insertBefore(progressBar, document.body.firstChild);
        }

        // 3. Forzar estilos inline con !important para que Elementor no los pise
        progressBar.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            height: 4px !important;
            background: rgba(148, 163, 184, 0.18) !important;
            overflow: hidden !important;
            z-index: 2147483647 !important;
            pointer-events: none !important;
            margin: 0 !important;
            padding: 0 !important;
            display: block !important;
            transform: none !important;
            filter: none !important;
        `;

        progressBarFill.style.cssText = `
            display: block !important;
            width: 0% !important;
            height: 100% !important;
            background: linear-gradient(90deg, #0d6bb8, #194dcf) !important;
            transition: width 0.08s linear !important;
            transform-origin: left center !important;
            border-radius: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
        `;

        // 4. Función de actualización
        var lastWidth = -1;

        function updateBar() {
            var scrollTop =
                window.pageYOffset !== undefined
                    ? window.pageYOffset
                    : (document.documentElement || document.body.parentNode || document.body).scrollTop;

            var docHeight = Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.offsetHeight,
                document.body.clientHeight,
                document.documentElement.clientHeight
            );

            var winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            var scrollable = docHeight - winHeight;
            var percent = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;
            percent = Math.min(Math.max(percent, 0), 100);

            var rounded = Math.round(percent * 10) / 10;
            if (rounded !== lastWidth) {
                lastWidth = rounded;
                progressBarFill.style.setProperty("width", rounded + "%", "important");
            }
        }

        // 5. Actualizar con requestAnimationFrame
        var ticking = false;
        function onScroll() {
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    updateBar();
                    ticking = false;
                });
                ticking = true;
            }
        }

        // 6. Registrar TODOS los listeners posibles
        window.addEventListener("scroll", onScroll, { passive: true });
        document.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        window.addEventListener("orientationchange", onScroll);
        window.addEventListener("load", updateBar);
        document.addEventListener("DOMContentLoaded", updateBar);

        // 7. Actualizar en un intervalo como fallback
        setInterval(updateBar, 250);

        // 8. Actualizar varias veces al inicio
        updateBar();
        setTimeout(updateBar, 100);
        setTimeout(updateBar, 500);
        setTimeout(updateBar, 1000);
        setTimeout(updateBar, 2000);

        // Exponer por si acaso
        window.__updateProgressBar = updateBar;
    })();

    // ==================== REVEAL ANIMATIONS ====================
    var revealElements = document.querySelectorAll(".reveal");
    var revealObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.01,
            rootMargin: "0px 0px 100px 0px",
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });

    // ==================== FORMULARIO ====================
    var form = document.querySelector(".contact-form");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            var button = form.querySelector("button[type='submit']");
            var originalText = button.textContent;
            button.textContent = "Mensaje enviado";
            button.disabled = true;

            setTimeout(function () {
                button.textContent = originalText;
                button.disabled = false;
                form.reset();
            }, 2000);
        });
    }

    // ==================== MODAL DE SERVICIOS ====================
    var modal = document.getElementById("service-modal");
    var modalTitle = document.getElementById("modal-title");
    var modalContent = document.getElementById("modal-content");
    var closeButton = document.querySelector(".modal-close");

    var serviceContent = {
        consultoria: {
            title: "Consultoría y asesoría",
            content: `
                <p>Brindamos consultoría, asesoría, planeación, dirección, administración, ejecución y fiscalización para apoyar a empresas, personas físicas y morales en la toma de decisiones estratégicas y la optimización de sus procesos.</p>
                <p>Este servicio permite fortalecer la operación empresarial, mejorar la administración financiera y diseñar soluciones prácticas para cada necesidad institucional.</p>
                <ul>
                    <li>Asesoría profesional en administración, planeación y ejecución.</li>
                    <li>Soporte para empresas nacionales y extranjeras en procesos comerciales.</li>
                    <li>Soluciones orientadas a la eficiencia, control y competitividad.</li>
                    <li>Análisis de necesidades para mejorar la gestión operativa y financiera.</li>
                </ul>
                <a href="index.html#contacto" class="modal-cta">Solicitar servicio</a>
            `,
        },
        "recursos-humanos": {
            title: "Recursos humanos",
            content: `
                <p>El reclutamiento, selección, contratación, entrenamiento y capacitación de personal se convierte en una herramienta clave para fortalecer cualquier organización, asegurando que cada talento cumpla con los objetivos del negocio.</p>
                <p>Desde la identificación de perfiles hasta la incorporación del personal, desarrollamos procesos orientados a la productividad, la calidad y la adaptación operativa.</p>
                <ul>
                    <li>Reclutamiento y selección de personal idóneo.</li>
                    <li>Entrenamiento y capacitación para mejorar desempeño.</li>
                    <li>Subcontratación y coordinación con terceros según la necesidad.</li>
                    <li>Estudios psicométricos para contratación y evaluación de perfiles.</li>
                </ul>
                <a href="index.html#contacto" class="modal-cta">Solicitar servicio</a>
            `,
        },
        mercadotecnia: {
            title: "Relaciones públicas y mercadotecnia",
            content: `
                <p>Desarrollamos estrategias de diseño, publicidad, mercadotecnia y medios de comunicación para fortalecer la presencia comercial de la empresa y mantener una comunicación efectiva con su público objetivo.</p>
                <p>Ayudamos a que cada iniciativa se traduzca en una mejor percepción de marca, mayor alcance y una estrategia comercial más alineada con los objetivos del negocio.</p>
                <ul>
                    <li>Diseño de campañas estratégicas y promocionales.</li>
                    <li>Relaciones públicas y posicionamiento de marca.</li>
                    <li>Investigación de mercado y análisis de oportunidades.</li>
                    <li>Gestión de comunicación en medios y plataformas relevantes.</li>
                </ul>
                <a href="index.html#contacto" class="modal-cta">Solicitar servicio</a>
            `,
        },
        finanzas: {
            title: "Finanzas y administración",
            content: `
                <p>Asesoría y consultoría técnica en materia industrial, administrativa, contable, mercantil, financiera y fiscal para apoyar la estabilidad operativa y el cumplimiento normativo de cualquier organización.</p>
                <p>Este servicio ofrece una visión integral del entorno financiero y administrativo, facilitando mejores decisiones y una gestión más sólida del negocio.</p>
                <ul>
                    <li>Asesoría administrativa, contable y fiscal.</li>
                    <li>Consultoría financiera orientada a resultados.</li>
                    <li>Supervisión técnica y administrativa.</li>
                    <li>Apoyo en control, organización y cumplimiento legal.</li>
                </ul>
                <a href="index.html#contacto" class="modal-cta">Solicitar servicio</a>
            `,
        },
        comercio: {
            title: "Comercio exterior y logística",
            content: `
                <p>Gestionamos procesos de comercio exterior y doméstico, tráfico de mercancías y mediación comercial para facilitar la operación de negocios en distintos escenarios de mercado.</p>
                <p>La estructura de este servicio permite ofrecer apoyo estratégico en actividades comerciales y de representación con mayor claridad, coordinación y alcance.</p>
                <ul>
                    <li>Comisiones y mediaciones comerciales.</li>
                    <li>Gestión en comercio exterior y tráfico de mercancías.</li>
                    <li>Representación y apoyo a negociaciones.</li>
                    <li>Coordinación de operaciones para asegurar continuidad comercial.</li>
                </ul>
                <a href="index.html#contacto" class="modal-cta">Solicitar servicio</a>
            `,
        },
        aplicaciones: {
            title: "Aplicaciones electrónicas",
            content: `
                <p>Realizamos investigaciones de mercado y desarrollamos estrategias para la creación, venta, difusión y administración de aplicaciones electrónicas para dispositivos móviles, tabletas y computadoras.</p>
                <p>La finalidad es apoyar la llegada de soluciones digitales con mayor valor para la operación, la promoción y la relación con clientes.</p>
                <ul>
                    <li>Investigación de mercado y análisis de tendencia.</li>
                    <li>Promoción y administración digital de aplicaciones.</li>
                    <li>Apoyo para la difusión en dispositivos móviles y computadoras.</li>
                    <li>Diseño de estrategias para mejorar la presencia digital.</li>
                </ul>
                <a href="index.html#contacto" class="modal-cta">Solicitar servicio</a>
            `,
        },
        representacion: {
            title: "Representación comercial",
            content: `
                <p>Apoyamos a las empresas en la gestión y coordinación de comisiones, mediaciones, representaciones y negociaciones comerciales para fortalecer su presencia en el mercado.</p>
                <p>Este servicio facilita el acercamiento con socios, clientes y proveedores para optimizar la operación y la relación comercial.</p>
                <ul>
                    <li>Gestión de comisiones y mediaciones comerciales.</li>
                    <li>Representación institucional y apoyo en negociaciones.</li>
                    <li>Coordinación con terceros para la operación comercial.</li>
                    <li>Fortalecimiento de relaciones estratégicas y de negocio.</li>
                </ul>
                <a href="index.html#contacto" class="modal-cta">Solicitar servicio</a>
            `,
        },
        fiscal: {
            title: "Asesoría fiscal y administrativa",
            content: `
                <p>Brindamos apoyo técnico y administrativo en materia contable, fiscal, mercantil y financiera para mejorar la estructura operativa y el cumplimiento normativo.</p>
                <p>La finalidad es fortalecer la toma de decisiones con información clara y una administración más eficiente para cada organización.</p>
                <ul>
                    <li>Supervisión técnica y administrativa de procesos.</li>
                    <li>Orientación en temas fiscales, contables y financieros.</li>
                    <li>Control y organización de la operación empresarial.</li>
                    <li>Apoyo para cumplir con obligaciones legales y administrativas.</li>
                </ul>
                <a href="index.html#contacto" class="modal-cta">Solicitar servicio</a>
            `,
        },
        documentacion: {
            title: "Gestión documental y operativa",
            content: `
                <p>Organizamos y coordinamos documentación, procesos internos y actividades operativas para mantener un flujo de trabajo eficiente y ordenado.</p>
                <p>Este servicio permite mejorar la trazabilidad, la atención institucional y la administración cotidiana de las organizaciones.</p>
                <ul>
                    <li>Coordinación de procesos administrativos y operativos.</li>
                    <li>Gestión documental y control de información.</li>
                    <li>Apoyo para la organización interna y la atención a clientes.</li>
                    <li>Supervisión operativa para optimizar tiempos y resultados.</li>
                </ul>
                <a href="index.html#contacto" class="modal-cta">Solicitar servicio</a>
            `,
        },
    };

    function openModal(serviceKey) {
        if (!modal) return;
        var content = serviceContent[serviceKey];
        if (!content) return;

        modalTitle.textContent = content.title;
        modalContent.innerHTML = content.content;
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    document.querySelectorAll(".service-card").forEach(function (card) {
        card.addEventListener("click", function () {
            var serviceKey = card.dataset.service;
            openModal(serviceKey);
        });
    });

    if (closeButton) closeButton.addEventListener("click", closeModal);

    if (modal) {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modal && modal.classList.contains("is-open")) {
            closeModal();
        }
    });

    // ==================== ANTI-RECORTE ELEMENTOR ====================
    var selectores = [
        ".elementor",
        ".elementor-page",
        ".elementor-section",
        ".elementor-container",
        ".elementor-column",
        ".elementor-column-wrap",
        ".elementor-widget-wrap",
        ".elementor-widget",
        ".elementor-widget-container",
        ".elementor-widget-html"
    ];

    selectores.forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (el) {
            el.style.removeProperty("height");
            el.style.removeProperty("max-height");
            el.style.removeProperty("overflow");
            el.style.removeProperty("min-height");

            var overflowY = window.getComputedStyle(el).overflowY;
            if (overflowY === "hidden") {
                el.style.setProperty("overflow-y", "visible", "important");
            }
        });
    });

    document.body.style.setProperty("height", "auto", "important");
    document.body.style.setProperty("min-height", "100vh", "important");
    document.body.style.setProperty("overflow-y", "auto", "important");
    document.documentElement.style.setProperty("height", "auto", "important");
    document.documentElement.style.setProperty("overflow-y", "auto", "important");
});

// ==================== REINICIALIZAR BARRA DE PROGRESO EN LOAD ====================
window.addEventListener("load", function () {
    setTimeout(function () {
        if (window.__updateProgressBar) {
            window.__updateProgressBar();
        }
    }, 300);
});