/**
 * HEAVEN FURNITURE MART — BESPOKE QUOTE CONFIGURATOR
 * Interactive 3-Step Custom Commission Estimator with Instant WhatsApp Hook
 */

document.addEventListener('DOMContentLoaded', () => {
  initConfigurator();
});

function initConfigurator() {
  const roomButtons = document.querySelectorAll('[data-config-room]');
  const timberButtons = document.querySelectorAll('[data-config-timber]');
  const finishButtons = document.querySelectorAll('[data-config-finish]');
  
  const summarySpace = document.getElementById('configSummarySpace');
  const summaryTimber = document.getElementById('configSummaryTimber');
  const summaryTimeline = document.getElementById('configSummaryTimeline');
  const whatsappCta = document.getElementById('configWhatsAppCta');

  let selectedRoom = 'Living Room (Bespoke Lounge / Sofa)';
  let selectedTimber = 'Solid Burma Teak (A-Grade Heartwood)';
  let selectedFinish = 'Hand-Rubbed Natural Matte Oil';

  function updateWhatsAppLink() {
    if (!whatsappCta) return;

    const baseMessage = `Hello Abul Kalam Bhuiyan & Heaven Furniture Team, I am looking to commission a bespoke piece for my home in Chattogram.\n\n` +
      `📌 Room Type: ${selectedRoom}\n` +
      `🪵 Timber Choice: ${selectedTimber}\n` +
      `✨ Preferred Finish: ${selectedFinish}\n\n` +
      `Could we schedule a design consultation at your Agrabad showroom?`;

    const encoded = encodeURIComponent(baseMessage);
    whatsappCta.href = `https://wa.me/8801960481983?text=${encoded}`;
  }

  function handleSelection(buttons, callback) {
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        callback(btn);
        updateWhatsAppLink();
      });
    });
  }

  // Room Type Selection
  handleSelection(roomButtons, (btn) => {
    selectedRoom = btn.getAttribute('data-config-room');
    if (summarySpace) summarySpace.textContent = selectedRoom;
  });

  // Timber Type Selection
  handleSelection(timberButtons, (btn) => {
    selectedTimber = btn.getAttribute('data-config-timber');
    if (summaryTimber) summaryTimber.textContent = selectedTimber;
  });

  // Finish Selection
  handleSelection(finishButtons, (btn) => {
    selectedFinish = btn.getAttribute('data-config-finish');
    if (summaryTimeline) summaryTimeline.textContent = selectedFinish;
  });

  // Initial link preparation
  updateWhatsAppLink();
}
