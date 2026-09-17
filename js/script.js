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
        <p>Brindamos consultoría, asesoría, planeación, dirección, administración, ejecución y fiscalización para apoyar a empresas, personas físicas y morales.</p>
        <ul>
          <li>Servicios profesionales, financieros y administrativos.</li>
          <li>Asesoría para empresas nacionales y extranjeras.</li>
          <li>Soluciones orientadas a la operación, control y competitividad.</li>
        </ul>
      `,
    },
    "recursos-humanos": {
      title: "Recursos humanos",
      content: `
        <p>El reclutamiento, selección, contratación, entrenamiento y capacitación de personal, ya sea por sí o a través de terceros.</p>
        <ul>
          <li>Selección y contratación de personal.</li>
          <li>Capacitación y entrenamiento.</li>
          <li>Subcontratación y estudios psicométricos.</li>
        </ul>
      `,
    },
    mercadotecnia: {
      title: "Relaciones públicas y mercadotecnia",
      content: `
        <p>Desarrollamos estrategias de diseño, publicidad, mercadotecnia y medios de comunicación para fortalecer la presencia y el posicionamiento comercial.</p>
        <ul>
          <li>Diseño y publicidad.</li>
          <li>Relaciones públicas y campañas promocionales.</li>
          <li>Investigación de mercado y comunicación.</li>
        </ul>
      `,
    },
    finanzas: {
      title: "Finanzas y administración",
      content: `
        <p>Asesoría y consultoría técnica en materia industrial, administrativa, contable, mercantil, financiera y fiscal.</p>
        <ul>
          <li>Asesoría administrativa y contable.</li>
          <li>Consultoría financiera y fiscal.</li>
          <li>Supervisión técnica y administrativa.</li>
        </ul>
      `,
    },
    comercio: {
      title: "Comercio exterior y logística",
      content: `
        <p>Gestión en comercio exterior y doméstico, tráfico de mercancías, mediación y representación comercial.</p>
        <ul>
          <li>Comisiones y mediaciones.</li>
          <li>Comercio exterior y tráfico de mercancías.</li>
          <li>Representación y gestión comercial.</li>
        </ul>
      `,
    },
    aplicaciones: {
      title: "Aplicaciones electrónicas",
      content: `
        <p>Realizamos investigaciones de mercado y desarrollamos campañas para la creación, venta, difusión y administración de aplicaciones electrónicas.</p>
        <ul>
          <li>Investigación de mercado.</li>
          <li>Promoción y administración digital.</li>
          <li>Aplicaciones para dispositivos móviles, tabletas y computadoras.</li>
        </ul>
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
