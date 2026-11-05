/**
 * MasterConstrói Materiais de Construção - Interações da Landing Page
 * Do Básico ao Acabamento: Cimento, Aço, Hidráulica, Pisos, Tintas e Ferramentas
 * JavaScript Vanilla Puro, Leve e de Alta Performance
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configuração Principal (WhatsApp Comercial)
  const WHATSAPP_PHONE = '5511999999999'; // DDI + DDD + Número sem espaços ou traços

  /* ==========================================================
     1. MODAL DE TRIAGEM RÁPIDA DE WHATSAPP (1-CLIQUE)
     ========================================================== */
  const triageModal = document.getElementById('triageModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const serviceOptionsContainer = document.getElementById('serviceOptions');
  const clientNameInput = document.getElementById('clientName');
  const clientLocationInput = document.getElementById('clientLocation');
  const submitWhatsappBtn = document.getElementById('submitWhatsappBtn');
  const openModalButtons = document.querySelectorAll('.open-triage-modal');

  let selectedService = 'Básico: Cimento, Areia, Tijolos & Ferragens';

  // Função para abrir o modal
  function openModal(defaultService = null) {
    if (defaultService) {
      selectedService = defaultService;
      const chips = serviceOptionsContainer ? serviceOptionsContainer.querySelectorAll('.chip') : [];
      let found = false;
      chips.forEach(chip => {
        if (chip.dataset.value.toLowerCase().includes(defaultService.toLowerCase()) || 
            defaultService.toLowerCase().includes(chip.dataset.value.toLowerCase())) {
          chip.classList.add('active');
          found = true;
        } else {
          chip.classList.remove('active');
        }
      });
      if (!found && chips.length > 0) {
        chips[0].classList.add('active');
        selectedService = chips[0].dataset.value;
      }
    }

    if (triageModal) {
      triageModal.classList.add('active');
      triageModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      setTimeout(() => clientNameInput && clientNameInput.focus(), 150);
    }
  }

  // Função para fechar o modal
  function closeModal() {
    if (triageModal) {
      triageModal.classList.remove('active');
      triageModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  // Event Listeners para botões que abrem o modal
  openModalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceTarget = btn.getAttribute('data-service') || null;
      openModal(serviceTarget);
    });
  });

  // Fechar no botão X
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  // Fechar clicando fora da caixa do modal
  if (triageModal) {
    triageModal.addEventListener('click', (e) => {
      if (e.target === triageModal) {
        closeModal();
      }
    });
  }

  // Fechar com tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && triageModal && triageModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Seleção de Chips dentro do Modal
  if (serviceOptionsContainer) {
    serviceOptionsContainer.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;

      const allChips = serviceOptionsContainer.querySelectorAll('.chip');
      allChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      selectedService = chip.dataset.value;
    });
  }

  // Envio para WhatsApp com Formatação Profissional
  if (submitWhatsappBtn) {
    submitWhatsappBtn.addEventListener('click', () => {
      const nome = clientNameInput ? clientNameInput.value.trim() : '';
      const localizacao = clientLocationInput ? clientLocationInput.value.trim() : '';

      let mensagem = `*SOLICITAÇÃO DE ORÇAMENTO - MASTERCONSTRÓI*\n\n`;
      mensagem += `🧱 *Departamento / Categoria:* ${selectedService}\n`;

      if (nome) {
        mensagem += `👤 *Cliente:* ${nome}\n`;
      }
      if (localizacao) {
        mensagem += `📍 *Endereço da Obra:* ${localizacao}\n`;
      }

      mensagem += `\nOlá, gostaria de cotação de materiais e prazo de entrega para minha obra. Pode me atender?`;

      const encodedMessage = encodeURIComponent(mensagem);
      const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      closeModal();
    });
  }

  /* ==========================================================
     2. MENU MOBILE RESPONSIVO COM DRAWER LATERAL
     ========================================================== */
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMobileMenu() {
    const isOpen = navMenu.classList.contains('active');
    if (isOpen) {
      navMenu.classList.remove('active');
      mobileNavOverlay.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      navMenu.classList.add('active');
      mobileNavOverlay.classList.add('active');
      mobileToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
  }

  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', toggleMobileMenu);
  }

  // Fechar menu mobile ao clicar em um link interno
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });

  /* ==========================================================
     3. HEADER COM SOMBRA DINÂMICA AO ROLAR
     ========================================================== */
  const mainHeader = document.getElementById('mainHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ==========================================================
     4. FAQ ACCORDION INTERATIVO
     ========================================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content');

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Fecha todos os outros
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherHeader = otherItem.querySelector('.faq-header');
          const otherContent = otherItem.querySelector('.faq-content');
          if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      // Alterna o clicado
      if (isActive) {
        item.classList.remove('active');
        header.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  /* ==========================================================
     5. ANIMAÇÃO DE CONTADORES NUMÉRICOS (STATS COUNTER)
     ========================================================== */
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  function runCounterAnimation() {
    statNumbers.forEach(stat => {
      const targetText = stat.getAttribute('data-target') || stat.textContent;
      // Extrai número e prefixos/sufixos
      const match = targetText.match(/^([^\d]*)(\d+)([^\d]*)$/);
      if (!match) return;

      const prefix = match[1] || '';
      const targetValue = parseInt(match[2], 10);
      const suffix = match[3] || '';

      const duration = 1800;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);
        const currentValue = Math.floor(easeOutQuad * targetValue);

        stat.textContent = `${prefix}${currentValue}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = targetText;
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  // Disparar animação quando os números entrarem na tela
  if ('IntersectionObserver' in window && statNumbers.length > 0) {
    const statsSection = document.querySelector('.stats-bar-section');
    if (statsSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !animated) {
            animated = true;
            runCounterAnimation();
          }
        });
      }, { threshold: 0.3 });

      observer.observe(statsSection);
    }
  } else {
    // Fallback caso IntersectionObserver não seja suportado
    runCounterAnimation();
  }
});

