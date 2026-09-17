document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggleButton = document.querySelector(".theme-toggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (prefersDark) {
    body.classList.add("dark-mode");
    toggleButton?.querySelector("i")?.classList.replace("fa-moon", "fa-sun");
  }

  toggleButton?.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const icon = toggleButton.querySelector("i");

    if (body.classList.contains("dark-mode")) {
      icon.classList.replace("fa-moon", "fa-sun");
    } else {
      icon.classList.replace("fa-sun", "fa-moon");
    }
  });

  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const button = form.querySelector("button[type='submit']");
      const originalText = button.textContent;
      button.textContent = "Mensaje enviado";
      button.disabled = true;

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        form.reset();
      }, 2000);
    });
  }

  const modal = document.getElementById("service-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalContent = document.getElementById("modal-content");
  const closeButton = document.querySelector(".modal-close");

  const serviceContent = {
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
  };

  const openModal = (serviceKey) => {
    if (!modal) return;
    const content = serviceContent[serviceKey];
    if (!content) return;

    modalTitle.textContent = content.title;
    modalContent.innerHTML = content.content;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("click", () => {
      const serviceKey = card.dataset.service;
      openModal(serviceKey);
    });
  });

  closeButton?.addEventListener("click", closeModal);

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal?.classList.contains("is-open")) {
      closeModal();
    }
  });
});
