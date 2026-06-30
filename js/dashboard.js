/**
 * Nexus Procurement — Dashboard interactions
 * Handles: responsive sidebar toggle, Chart.js initialization (spend trend + order status donut).
 * All chart data below is static demo data for presentation purposes only.
 */
(function () {
  'use strict';

  /* ---------------- Sidebar toggle (mobile) ---------------- */
  var sidebar = document.getElementById('dashSidebar');
  var overlay = document.getElementById('sidebarOverlay');
  var openBtn = document.getElementById('sidebarOpen');
  var closeBtn = document.getElementById('sidebarClose');

  function openSidebar() {
    if (!sidebar || !overlay) return;
    sidebar.classList.add('is-open');
    overlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (!sidebar || !overlay) return;
    sidebar.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  if (openBtn) openBtn.addEventListener('click', openSidebar);
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);

  // Close sidebar automatically if viewport is resized back to desktop.
  window.addEventListener('resize', function () {
    if (window.innerWidth > 991.98) closeSidebar();
  });

  /* ---------------- Footer year ---------------- */
  var yearEl = document.getElementById('dashYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Chart.js theming ---------------- */
  if (typeof Chart === 'undefined') return;

  var rootStyles = getComputedStyle(document.documentElement);
  var colorAccent = rootStyles.getPropertyValue('--accent').trim() || '#06B6D4';
  var colorSuccess = rootStyles.getPropertyValue('--success').trim() || '#10B981';
  var colorWarning = rootStyles.getPropertyValue('--warning').trim() || '#F59E0B';
  var colorDanger = rootStyles.getPropertyValue('--danger').trim() || '#EF4444';
  var colorMuted = rootStyles.getPropertyValue('--muted').trim() || '#CBD5E1';
  var colorBorder = 'rgba(248,250,252,0.08)';

  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.color = colorMuted;

  /* ---- Spend trend (line/area chart) ---- */
  var spendCanvas = document.getElementById('spendChart');
  if (spendCanvas) {
    var spendCtx = spendCanvas.getContext('2d');
    var spendGradient = spendCtx.createLinearGradient(0, 0, 0, 260);
    spendGradient.addColorStop(0, 'rgba(6,182,212,0.35)');
    spendGradient.addColorStop(1, 'rgba(6,182,212,0)');

    new Chart(spendCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Procurement Spend (₹ Lakhs)',
          data: [38, 45, 41, 53, 49, 61],
          borderColor: colorAccent,
          backgroundColor: spendGradient,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: colorAccent,
          pointBorderColor: '#0F172A',
          pointBorderWidth: 2,
          borderWidth: 2.5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1E293B',
            borderColor: colorBorder,
            borderWidth: 1,
            titleColor: '#F8FAFC',
            bodyColor: '#CBD5E1',
            padding: 10,
            displayColors: false,
            callbacks: {
              label: function (ctx) { return '₹' + ctx.parsed.y + 'L'; }
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            border: { color: colorBorder }
          },
          y: {
            grid: { color: colorBorder },
            border: { display: false },
            ticks: { callback: function (val) { return '₹' + val + 'L'; } }
          }
        }
      }
    });
  }

  /* ---- Order status (donut chart) ---- */
  var statusCanvas = document.getElementById('statusChart');
  if (statusCanvas) {
    new Chart(statusCanvas.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Delivered', 'In Transit', 'Processing', 'Delayed'],
        datasets: [{
          data: [62, 23, 11, 4],
          backgroundColor: [colorAccent, colorSuccess, colorWarning, colorDanger],
          borderColor: '#1E293B',
          borderWidth: 3,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1E293B',
            borderColor: colorBorder,
            borderWidth: 1,
            titleColor: '#F8FAFC',
            bodyColor: '#CBD5E1',
            padding: 10,
            callbacks: {
              label: function (ctx) { return ctx.label + ': ' + ctx.parsed + '%'; }
            }
          }
        }
      }
    });
  }
})();
