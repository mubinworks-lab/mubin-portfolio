// Shaikh Mubin — Application Controller (2026 Luxury Edition)

document.addEventListener('DOMContentLoaded', () => {
  initHeroParallax();
  initCompletedProjects();
  initGraphicDesignShowcase();
  initVideoEditingShowcase();
  initInteractiveWhiteboard();
  initResumeSkills();
  initContactActions();
  initModalKeyboardSupport();
});

// ============================================================
// 1. HERO PARALLAX & SPATIAL MAGAZINE DEPTH
// ============================================================
function initHeroParallax() {
  const stage = document.getElementById('heroStage');
  const bgText = document.getElementById('heroBgText');
  const portrait = document.getElementById('heroPortraitLayer');
  const cardFrame = document.getElementById('heroCardFrame');
  if (!stage || !portrait) return;

  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Multi-layer parallax shifts
    if (bgText) {
      bgText.style.transform = `translate3d(${(-x * 28).toFixed(1)}px, ${(-y * 18).toFixed(1)}px, 0)`;
    }
    portrait.style.transform = `perspective(1000px) rotateY(${(x * 12).toFixed(1)}deg) rotateX(${(-y * 12).toFixed(1)}deg) translate3d(${(x * 15).toFixed(1)}px, ${(y * 10).toFixed(1)}px, 30px)`;
    
    if (cardFrame) {
      cardFrame.style.boxShadow = `${(-x * 30).toFixed(0)}px ${(30 - y * 20).toFixed(0)}px 60px -15px rgba(0, 0, 0, 0.12)`;
    }
  });

  stage.addEventListener('mouseleave', () => {
    if (bgText) bgText.style.transform = `translate3d(0, 0, 0)`;
    portrait.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) translate3d(0, 0, 0)`;
    if (cardFrame) {
      cardFrame.style.boxShadow = `0 20px 50px -15px rgba(0, 0, 0, 0.08)`;
    }
  });
}

// ============================================================
// 2. COMPACT INTERACTIVE APP STUDIO (4 CRM & BUSINESS SYSTEMS)
// ============================================================
let activeProjectIndex = 0;

function initCompletedProjects() {
  const tabsContainer = document.getElementById('projectSwitcherTabs');
  const stageContainer = document.getElementById('activeProjectStage');
  if (!tabsContainer || !stageContainer || !window.PORTFOLIO_DATA) return;

  const projects = window.PORTFOLIO_DATA.completedProjects;

  function renderProjectStage(index) {
    activeProjectIndex = index;
    const p = projects[index];

    // Render 4 Switcher Tabs at Top
    tabsContainer.innerHTML = projects.map((proj, idx) => {
      const isActive = idx === index;
      return `
        <div class="project-tab-card p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer ${isActive ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-[1.01]' : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 shadow-xs'}" data-index="${idx}">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[10px] font-mono px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}">0${idx + 1} // LIVE</span>
            <span class="w-2 h-2 rounded-full ${isActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-300'}"></span>
          </div>
          <h4 class="text-xs sm:text-sm font-bold truncate leading-tight">${proj.title}</h4>
          <p class="text-[11px] ${isActive ? 'text-slate-300' : 'text-slate-500'} truncate mt-0.5">${proj.category}</p>
        </div>
      `;
    }).join('');

    // Attach click listeners to tabs
    tabsContainer.querySelectorAll('.project-tab-card').forEach(tab => {
      tab.addEventListener('click', () => {
        renderProjectStage(parseInt(tab.dataset.index));
      });
    });

    // Render Master Stage Card
    stageContainer.innerHTML = `
      <div class="artboard-card-fade">
        <!-- Top Browser Bar Header -->
        <div class="p-4 sm:p-5 border-b border-slate-200/80 bg-slate-50/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-1.5">
              <span class="w-3 h-3 rounded-full bg-red-400/80"></span>
              <span class="w-3 h-3 rounded-full bg-yellow-400/80"></span>
              <span class="w-3 h-3 rounded-full bg-emerald-400/80"></span>
            </div>
            <a href="${p.liveUrl}" target="_blank" rel="noopener" class="text-xs font-mono text-slate-600 hover:text-blue-600 bg-white border border-slate-200 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs transition-colors">
              <i class="fa-solid fa-lock text-[9px] text-emerald-600"></i>
              <span class="font-medium">${p.liveUrl.replace('https://', '').replace('/', '')}</span>
              <i class="fa-solid fa-arrow-up-right-from-square text-[9px] text-slate-400"></i>
            </a>
          </div>

          <div class="flex items-center gap-2">
            <span class="editorial-badge bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">
              <i class="fa-solid fa-circle text-[6px] mr-1 text-emerald-500"></i> Active Edge 2026
            </span>
            <a href="${p.liveUrl}" target="_blank" rel="noopener" class="px-4 py-1.5 rounded-full bg-slate-900 hover:bg-blue-600 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm">
              <span>Launch Live System</span>
              <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
            </a>
          </div>
        </div>

        <!-- Stage Body -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 items-center">
          
          <!-- Large High-Res Screenshot Preview -->
          <div class="lg:col-span-7">
            <div class="relative rounded-2xl overflow-hidden border border-slate-200/90 bg-slate-950 group/img shadow-md">
              <img src="${p.coverImage}" alt="${p.title}" class="w-full h-auto object-cover transition-transform duration-700 group-hover/img:scale-[1.02]">
              <div class="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200/90 flex items-center justify-between text-xs font-mono shadow-sm">
                <span class="text-slate-800 font-semibold truncate">${p.tagline}</span>
                <span class="text-blue-600 font-bold ml-2 flex-shrink-0">${p.year}</span>
              </div>
            </div>
          </div>

          <!-- Case Narrative & Specs -->
          <div class="lg:col-span-5 space-y-4">
            <div>
              <div class="flex items-center gap-2 mb-1.5">
                <span class="editorial-badge bg-blue-50 text-blue-700 border-blue-200">${p.category}</span>
                <span class="text-xs font-mono text-slate-400">${p.year}</span>
              </div>
              <h3 class="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">${p.title}</h3>
              <p class="text-xs font-mono text-slate-500 mt-0.5">${p.subtitle}</p>
            </div>

            <!-- Challenge -->
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <h4 class="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">The Business Challenge</h4>
              <p class="text-xs text-slate-600 leading-relaxed">${p.problem}</p>
            </div>

            <!-- Solution -->
            <div class="p-3 rounded-xl bg-blue-50/50 border border-blue-200/80">
              <h4 class="text-[10px] font-mono uppercase tracking-wider text-blue-700 font-bold mb-1">Vibe Coded Solution</h4>
              <p class="text-xs text-slate-800 leading-relaxed font-medium">${p.solution}</p>
            </div>

            <!-- Engineered Highlights -->
            <div>
              <h4 class="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1.5">Engineered Highlights</h4>
              <ul class="space-y-1">
                ${p.highlights.map(h => `
                  <li class="flex items-start text-xs text-slate-700">
                    <i class="fa-solid fa-check text-emerald-600 mr-2 mt-0.5 text-[11px]"></i>
                    <span>${h}</span>
                  </li>
                `).join('')}
              </ul>
            </div>

            <!-- Architecture Stack -->
            <div class="pt-2 border-t border-slate-100">
              <h4 class="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1.5">Architecture & Tools</h4>
              <div class="flex flex-wrap gap-1.5">
                ${p.techStack.map(t => `
                  <span class="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-100 text-slate-700 border border-slate-200">
                    ${t}
                  </span>
                `).join('')}
              </div>
            </div>

          </div>

        </div>
      </div>
    `;
  }

  renderProjectStage(0);
}

// ============================================================
// 3. BESPOKE SHOWCASE 1: GRAPHIC DESIGN ARTBOARDS (30 ITEMS)
// ============================================================
let activeGraphicCategory = 'all';
let graphicSearchTerm = '';

function initGraphicDesignShowcase() {
  const container = document.getElementById('graphicDesignGrid');
  const filtersContainer = document.getElementById('graphicCategoryFilters');
  const searchInput = document.getElementById('graphicSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const countEl = document.getElementById('galleryCount');

  if (!container || !window.PORTFOLIO_DATA) return;

  const allDesigns = window.PORTFOLIO_DATA.graphicDesigns;

  function renderGallery() {
    let filtered = allDesigns;

    if (activeGraphicCategory !== 'all') {
      filtered = filtered.filter(d => d.category.toLowerCase() === activeGraphicCategory.toLowerCase());
    }

    if (graphicSearchTerm.trim() !== '') {
      const term = graphicSearchTerm.toLowerCase();
      filtered = filtered.filter(d => 
        d.title.toLowerCase().includes(term) ||
        d.brand.toLowerCase().includes(term) ||
        d.category.toLowerCase().includes(term) ||
        d.brief.toLowerCase().includes(term) ||
        d.tools.toLowerCase().includes(term)
      );
    }

    if (countEl) {
      countEl.textContent = filtered.length;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full p-12 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-300">
          <i class="fa-solid fa-magnifying-glass text-slate-400 text-3xl mb-3"></i>
          <h4 class="text-base font-bold text-slate-800">No matching artboards found</h4>
          <p class="text-xs text-slate-500 mt-1">Try searching for "burger", "perfume", "watch", or clear your filter.</p>
          <button onclick="clearAllFilters()" class="mt-4 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-mono">
            Reset Filters
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(d => `
      <div class="luxury-card rounded-2xl overflow-hidden border border-slate-200 group bg-white cursor-pointer hover:border-slate-400 transition-all duration-300 flex flex-col artboard-card-fade" onclick="openDesignModal('${d.id}')">
        
        <!-- Image Frame -->
        <div class="relative aspect-[4/5] overflow-hidden bg-slate-950">
          <img src="${d.image}" alt="${d.title}" loading="lazy" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
          
          <!-- Top Badges -->
          <div class="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2">
            <span class="editorial-badge bg-white/95 text-slate-900 border-slate-200/80 shadow-sm truncate max-w-[160px]">${d.brand}</span>
            <span class="editorial-badge bg-black/70 text-white border-white/20 backdrop-blur-md text-[10px]">${d.aspect ? d.aspect.split(' ')[0] : '4:5'}</span>
          </div>

          <!-- Color Dots Preview (Hover) -->
          <div class="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 p-1.5 rounded-full bg-black/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
            ${(d.palette || []).map(hex => `
              <span class="w-3.5 h-3.5 rounded-full border border-white/30" style="background-color: ${hex};" title="${hex}"></span>
            `).join('')}
          </div>

          <!-- Expand Action Pill (Hover) -->
          <div class="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <span class="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center text-xs shadow-md">
              <i class="fa-solid fa-expand"></i>
            </span>
          </div>
        </div>

        <!-- Card Content Body -->
        <div class="p-4 sm:p-5 border-t border-slate-100 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
              <span>${d.category}</span>
              <span class="text-blue-600 font-semibold group-hover:underline">Inspect →</span>
            </div>
            <h4 class="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">${d.title}</h4>
            <p class="text-xs text-slate-500 line-clamp-1 mt-1 font-mono">${d.tagline}</p>
          </div>

          <div class="pt-3 mt-3 border-t border-slate-100/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span class="truncate max-w-[180px] font-medium">${d.softwareUsed ? d.softwareUsed.slice(0, 2).join(' + ') : 'Photoshop + AI'}</span>
            <span class="text-blue-600 font-semibold group-hover:underline flex items-center gap-1 text-[10px]">
              <i class="fa-solid fa-compass-drafting text-[10px]"></i> Process
            </span>
          </div>
        </div>

      </div>
    `).join('');
  }

  // Filter Buttons
  if (filtersContainer) {
    filtersContainer.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filtersContainer.querySelectorAll('.filter-btn').forEach(b => {
          b.className = 'filter-btn px-4 py-2 rounded-full text-xs font-mono font-semibold border border-slate-200 bg-white text-slate-700 hover:border-slate-400';
        });
        btn.className = 'filter-btn active px-4 py-2 rounded-full text-xs font-mono font-semibold border border-slate-900 bg-slate-900 text-white';
        activeGraphicCategory = btn.dataset.category;
        renderGallery();
      });
    });
  }

  // Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      graphicSearchTerm = e.target.value;
      if (clearSearchBtn) {
        if (graphicSearchTerm.length > 0) {
          clearSearchBtn.classList.remove('hidden');
        } else {
          clearSearchBtn.classList.add('hidden');
        }
      }
      renderGallery();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      graphicSearchTerm = '';
      clearSearchBtn.classList.add('hidden');
      renderGallery();
    });
  }

  window.clearAllFilters = function() {
    activeGraphicCategory = 'all';
    graphicSearchTerm = '';
    if (searchInput) searchInput.value = '';
    if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
    if (filtersContainer) {
      filtersContainer.querySelectorAll('.filter-btn').forEach((b, idx) => {
        if (idx === 0) {
          b.className = 'filter-btn active px-4 py-2 rounded-full text-xs font-mono font-semibold border border-slate-900 bg-slate-900 text-white';
        } else {
          b.className = 'filter-btn px-4 py-2 rounded-full text-xs font-mono font-semibold border border-slate-200 bg-white text-slate-700 hover:border-slate-400';
        }
      });
    }
    renderGallery();
  };

  renderGallery();
}

// Modal for Graphic Design Creative Direction & Execution Breakdown
window.openDesignModal = function(id) {
  const modal = document.getElementById('designModal');
  if (!modal || !window.PORTFOLIO_DATA) return;

  const d = window.PORTFOLIO_DATA.graphicDesigns.find(item => item.id === id);
  if (!d) return;

  // Image & Meta
  const imgEl = document.getElementById('designModalImage');
  if (imgEl) imgEl.src = d.image;

  const aspectEl = document.getElementById('designModalAspectBadge');
  if (aspectEl) aspectEl.textContent = d.aspect || 'High-Resolution Artboard';

  const fullResLink = document.getElementById('designModalFullResLink');
  if (fullResLink) fullResLink.href = d.image;

  const idPill = document.getElementById('designModalIdPill');
  if (idPill) idPill.textContent = `#${d.id}`;

  // Content
  document.getElementById('designModalBrand').textContent = d.brand;
  document.getElementById('designModalCategory').textContent = d.category;
  document.getElementById('designModalTitle').textContent = d.title;
  document.getElementById('designModalTagline').textContent = d.tagline;
  document.getElementById('designModalBrief').textContent = d.brief;

  // Creative Thinking
  const thinkingEl = document.getElementById('designModalThinking');
  if (thinkingEl) {
    thinkingEl.textContent = d.creativeThinking || d.brief;
  }

  // Software Used Badges
  const softwareEl = document.getElementById('designModalSoftware');
  if (softwareEl) {
    const tools = d.softwareUsed || ["Adobe Photoshop", "CorelDRAW", "MeiGen AI"];
    softwareEl.innerHTML = tools.map(tool => `
      <span class="px-3 py-1.5 rounded-xl text-xs font-mono font-semibold bg-slate-900 text-white flex items-center gap-1.5 shadow-xs">
        <i class="fa-solid fa-cube text-[10px] text-blue-400"></i>${tool}
      </span>
    `).join('');
  }

  // Execution Workflow Steps
  const workflowEl = document.getElementById('designModalWorkflow');
  if (workflowEl) {
    const steps = d.executionSteps || [];
    workflowEl.innerHTML = steps.map(s => `
      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
        <span class="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-xs font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
          ${s.step}
        </span>
        <div class="flex-1">
          <div class="text-xs font-bold text-slate-900">${s.title}</div>
          <div class="text-[11px] text-slate-600 mt-0.5 leading-relaxed">${s.detail}</div>
        </div>
      </div>
    `).join('');
  }

  // Extracted Palette Chips
  const paletteContainer = document.getElementById('designModalPalette');
  if (paletteContainer) {
    if (d.palette && d.palette.length > 0) {
      paletteContainer.innerHTML = d.palette.map(hex => `
        <div class="color-swatch-chip flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs cursor-pointer hover:border-slate-400 transition-colors" onclick="copyHexColor('${hex}')">
          <span class="w-4 h-4 rounded-full border border-black/10 shadow-xs" style="background-color: ${hex};"></span>
          <span class="text-xs font-mono text-slate-700 font-bold uppercase">${hex}</span>
          <i class="fa-solid fa-copy text-[9px] text-slate-400 ml-1"></i>
        </div>
      `).join('');
    } else {
      paletteContainer.innerHTML = '<span class="text-xs font-mono text-slate-400">Natural Dynamic Range</span>';
    }
  }

  // Deliverables Badges
  const deliverablesContainer = document.getElementById('designModalDeliverables');
  if (deliverablesContainer) {
    const list = d.deliverables || ["4K Master Visual", "Brand Guidelines Spec", "Social Cutdown"];
    deliverablesContainer.innerHTML = list.map(item => `
      <span class="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white text-slate-700 border border-slate-200">
        <i class="fa-solid fa-check text-[10px] text-emerald-600 mr-1"></i>${item}
      </span>
    `).join('');
  }

  // Display Modal with Smooth Fade
  modal.classList.remove('hidden');
  modal.style.opacity = '0';
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    modal.style.transition = 'opacity 0.25s ease';
    modal.style.opacity = '1';
  }, 10);
};

window.closeDesignModal = function() {
  const modal = document.getElementById('designModal');
  if (!modal) return;
  modal.style.opacity = '0';
  document.body.style.overflow = '';
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 200);
};

window.copyHexColor = function(hex) {
  navigator.clipboard.writeText(hex).then(() => {
    showToast(`Color ${hex.toUpperCase()} copied to clipboard!`);
  });
};

function initModalKeyboardSupport() {
  const modal = document.getElementById('designModal');
  if (!modal) return;

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeDesignModal();
    }
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeDesignModal();
    }
  });
}

// ============================================================
// 4. BESPOKE SHOWCASE 2: VIDEO EDITING CINEMA ROOM
// ============================================================
let activeVideoIndex = 0;
let isVideoMuted = true;

function initVideoEditingShowcase() {
  const videoPlayer = document.getElementById('screeningVideo');
  const playlist = document.getElementById('screeningPlaylist');
  const playBtn = document.getElementById('screeningPlayBtn');
  const muteBtn = document.getElementById('screeningMuteBtn');
  const titleEl = document.getElementById('screeningTitle');
  const subEl = document.getElementById('screeningSubtitle');
  const metricsEl = document.getElementById('screeningMetrics');
  const hookEl = document.getElementById('screeningHook');
  const noteEl = document.getElementById('screeningClientNote');
  const progressEl = document.getElementById('screeningProgressBar');
  const curTimeEl = document.getElementById('screeningTimeCur');
  const durTimeEl = document.getElementById('screeningTimeDur');

  if (!videoPlayer || !playlist || !window.PORTFOLIO_DATA) return;

  const videos = window.PORTFOLIO_DATA.videoEdits;

  // Render Playlist Cards
  playlist.innerHTML = videos.map((v, i) => {
    const metricLabel = typeof v.metrics === 'object' ? (v.metrics.views || 'Viral Reach') : (v.metrics || 'Viral Reach');
    const subLabel = v.subtitle || v.client || v.category || 'Screening Reel';
    return `
    <div class="screening-card p-3 sm:p-4 rounded-2xl border transition-all cursor-pointer ${i === 0 ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300'}" data-index="${i}">
      <div class="flex items-center gap-3">
        <div class="relative w-14 h-20 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0 border border-slate-200/40">
          <img src="${v.poster}" alt="${v.title}" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-black/25 flex items-center justify-center">
            <span class="w-6 h-6 rounded-full bg-white/90 text-slate-900 flex items-center justify-center text-[10px]">
              <i class="fa-solid fa-play ml-0.5"></i>
            </span>
          </div>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-1.5 mb-1">
            <span class="text-[10px] font-mono px-2 py-0.5 rounded-full ${i === 0 ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}">${v.category}</span>
            <span class="text-[10px] font-mono font-semibold ${i === 0 ? 'text-amber-400' : 'text-amber-600'}">${metricLabel}</span>
          </div>
          <h5 class="text-xs font-bold truncate leading-tight">${v.title}</h5>
          <p class="text-[11px] opacity-70 truncate mt-0.5">${subLabel}</p>
        </div>
      </div>
    </div>
  `;
  }).join('');

  function loadVideo(index) {
    activeVideoIndex = index;
    const v = videos[index];

    playlist.querySelectorAll('.screening-card').forEach((card, idx) => {
      if (idx === index) {
        card.className = 'screening-card p-3 sm:p-4 rounded-2xl border transition-all cursor-pointer bg-slate-900 text-white border-slate-900 shadow-md';
        const tag = card.querySelector('.font-mono.px-2');
        if (tag) tag.className = 'text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/20 text-white';
      } else {
        card.className = 'screening-card p-3 sm:p-4 rounded-2xl border transition-all cursor-pointer bg-white text-slate-900 border-slate-200 hover:border-slate-300';
        const tag = card.querySelector('.font-mono.px-2');
        if (tag) tag.className = 'text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600';
      }
    });

    const targetSrc = v.src || v.videoSrc;
    if (videoPlayer.getAttribute('src') !== targetSrc) {
      videoPlayer.src = targetSrc;
    }
    videoPlayer.poster = v.poster;
    videoPlayer.muted = isVideoMuted;
    videoPlayer.load();
    videoPlayer.play().catch(() => {});

    const metricText = typeof v.metrics === 'object' ? (v.metrics.views + ' Reach') : (v.metrics || 'Viral Reach');
    const subText = v.subtitle || v.client || v.category || 'Screening Reel';

    if (titleEl) titleEl.textContent = v.title;
    if (subEl) subEl.textContent = `${subText} • ${v.aspect || '9:16 Vertical Reel'}`;
    if (metricsEl) metricsEl.textContent = metricText;
    if (hookEl) hookEl.textContent = v.hookAnalysis || v.hook || 'High-retention visual hook and pacing.';
    if (noteEl) noteEl.textContent = v.clientNote || v.description || 'Production video edited for social engagement.';
  }

  playlist.querySelectorAll('.screening-card').forEach(c => {
    c.addEventListener('click', () => {
      loadVideo(parseInt(c.dataset.index));
    });
  });

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (videoPlayer.paused) {
        videoPlayer.play();
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      } else {
        videoPlayer.pause();
        playBtn.innerHTML = '<i class="fa-solid fa-play ml-0.5"></i>';
      }
    });
  }

  videoPlayer.addEventListener('click', () => {
    if (videoPlayer.paused) {
      videoPlayer.play();
      if (playBtn) playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
      videoPlayer.pause();
      if (playBtn) playBtn.innerHTML = '<i class="fa-solid fa-play ml-0.5"></i>';
    }
  });

  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      isVideoMuted = !isVideoMuted;
      videoPlayer.muted = isVideoMuted;
      muteBtn.innerHTML = isVideoMuted ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>';
      showToast(isVideoMuted ? 'Screening audio muted' : 'Screening audio unmuted');
    });
  }

  videoPlayer.addEventListener('timeupdate', () => {
    if (!progressEl || !videoPlayer.duration) return;
    const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    progressEl.style.width = `${progress}%`;

    if (curTimeEl) {
      const m = Math.floor(videoPlayer.currentTime / 60);
      const s = Math.floor(videoPlayer.currentTime % 60);
      curTimeEl.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
    }
    if (durTimeEl && videoPlayer.duration) {
      const m = Math.floor(videoPlayer.duration / 60);
      const s = Math.floor(videoPlayer.duration % 60);
      durTimeEl.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
    }
  });

  videoPlayer.addEventListener('ended', () => {
    const next = (activeVideoIndex + 1) % videos.length;
    loadVideo(next);
  });

  // Load first video (Sukoon Wellness)
  loadVideo(0);
}

// ============================================================
// 5. BESPOKE SHOWCASE 3: INTERACTIVE WHITEBOARD (Miro/Figma Canvas)
// ============================================================
function initInteractiveWhiteboard() {
  const viewport = document.getElementById('whiteboardViewport');
  const canvas = document.getElementById('whiteboardCanvas');
  const zoomInBtn = document.getElementById('wbZoomIn');
  const zoomOutBtn = document.getElementById('wbZoomOut');
  const resetBtn = document.getElementById('wbReset');
  if (!viewport || !canvas || !window.PORTFOLIO_DATA) return;

  const nodes = window.PORTFOLIO_DATA.whiteboardNodes;

  canvas.innerHTML = nodes.map(n => `
    <div id="${n.id}" class="sticky-note ${n.color}" style="left: ${n.x}px; top: ${n.y}px;">
      <div class="flex items-center justify-between pb-2 mb-2 border-b border-black/10">
        <span class="text-[10px] font-mono font-bold uppercase tracking-wider">${n.type}</span>
        <i class="fa-solid fa-thumbtack text-xs opacity-50"></i>
      </div>
      <h5 class="text-xs font-bold mb-2 uppercase tracking-wide">${n.title}</h5>
      <ul class="space-y-1.5 text-xs opacity-90">
        ${n.items.map(it => `<li>• ${it}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  let panX = 40;
  let panY = 20;
  let scale = 1;
  let isPanning = false;
  let startX = 0;
  let startY = 0;

  function updateTransform() {
    canvas.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
  }

  viewport.addEventListener('mousedown', (e) => {
    if (e.target.closest('.sticky-note')) return;
    isPanning = true;
    startX = e.clientX - panX;
    startY = e.clientY - panY;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isPanning) return;
    panX = e.clientX - startX;
    panY = e.clientY - startY;
    updateTransform();
  });

  window.addEventListener('mouseup', () => {
    isPanning = false;
  });

  // Dragging individual sticky notes
  canvas.querySelectorAll('.sticky-note').forEach(note => {
    let isDraggingNote = false;
    let noteStartX = 0;
    let noteStartY = 0;

    note.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      isDraggingNote = true;
      noteStartX = e.clientX - note.offsetLeft;
      noteStartY = e.clientY - note.offsetTop;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDraggingNote) return;
      note.style.left = `${(e.clientX - noteStartX)}px`;
      note.style.top = `${(e.clientY - noteStartY)}px`;
    });

    window.addEventListener('mouseup', () => {
      isDraggingNote = false;
    });
  });

  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', () => {
      scale = Math.min(1.5, scale + 0.15);
      updateTransform();
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', () => {
      scale = Math.max(0.6, scale - 0.15);
      updateTransform();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      panX = 40;
      panY = 20;
      scale = 1;
      updateTransform();
    });
  }

  updateTransform();
}

// ============================================================
// 6. RESUME EXPERIENCE, EDUCATION & 26 SKILLS (From Latest CV)
// ============================================================
function initResumeSkills() {
  if (!window.PORTFOLIO_DATA) return;

  // 1. Work Experience Timeline (Necovision, MINS Designs, BhayaJi, FM Educom)
  const expContainer = document.getElementById('resumeExperienceTimeline');
  if (expContainer && window.PORTFOLIO_DATA.experience) {
    expContainer.innerHTML = window.PORTFOLIO_DATA.experience.map(exp => `
      <div class="luxury-card rounded-2xl p-5 sm:p-6 border border-slate-200 bg-white shadow-xs transition-all hover:border-slate-300">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-100">
          <div>
            <div class="flex items-center gap-2">
              <h4 class="text-sm sm:text-base font-bold text-slate-900">${exp.company}</h4>
              ${exp.website ? `<a href="${exp.website}" target="_blank" rel="noopener" class="text-blue-600 text-xs hover:underline flex items-center gap-1 font-mono"><i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i></a>` : ''}
            </div>
            <div class="text-xs font-semibold text-blue-700 mt-0.5">${exp.role}</div>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <span class="editorial-badge ${exp.badge.includes('Latest') ? 'bg-emerald-50 text-emerald-800 border-emerald-200 font-bold' : 'bg-slate-100 text-slate-700 border-slate-200'} text-[10px]">
              ${exp.badge}
            </span>
            <span class="text-[11px] font-mono text-slate-500">${exp.period}</span>
          </div>
        </div>
        <div class="text-[11px] font-mono text-slate-400 mb-2.5">
          <i class="fa-solid fa-location-dot mr-1 text-slate-400"></i>${exp.location}
        </div>
        <ul class="space-y-1.5 text-xs text-slate-600">
          ${exp.highlights.map(h => `
            <li class="flex items-start gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
              <span class="leading-relaxed">${h}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `).join('');
  }

  // 2. Education Cards (BCA at ISBA Institute & 12th Commerce)
  const eduContainer = document.getElementById('resumeEducation');
  if (eduContainer && window.PORTFOLIO_DATA.education) {
    eduContainer.innerHTML = window.PORTFOLIO_DATA.education.map(edu => `
      <div class="luxury-card rounded-2xl p-5 border border-slate-200 bg-white shadow-xs">
        <div class="flex items-center justify-between mb-2">
          <span class="editorial-badge ${edu.status.includes('Enrolled') ? 'bg-blue-50 text-blue-700 border-blue-200 font-semibold' : 'bg-slate-100 text-slate-600 border-slate-200'} text-[10px]">${edu.status}</span>
          <span class="text-[11px] font-mono text-slate-400">${edu.period}</span>
        </div>
        <h4 class="text-sm font-bold text-slate-900 leading-snug">${edu.degree}</h4>
        <div class="text-xs text-slate-600 font-mono mt-0.5">${edu.institution}</div>
        <p class="text-[11px] text-slate-500 mt-2.5 leading-relaxed pt-2.5 border-t border-slate-100">${edu.focus}</p>
      </div>
    `).join('');
  }

  // 3. 26 Categorized Skills Matrix (Design, Video, Web Dev, AI & IT Operations)
  const skillsGrid = document.getElementById('resumeSkillsGrid');
  if (skillsGrid && window.PORTFOLIO_DATA.skillsData && window.PORTFOLIO_DATA.skillsData.categories) {
    skillsGrid.innerHTML = window.PORTFOLIO_DATA.skillsData.categories.map(cat => `
      <div class="luxury-card rounded-3xl p-5 sm:p-6 border border-slate-200 bg-white shadow-xs flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100">
            <div class="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center text-xs">
              <i class="fa-solid ${cat.icon}"></i>
            </div>
            <div>
              <h4 class="text-sm font-bold text-slate-900 font-display">${cat.name}</h4>
              <span class="text-[10px] font-mono text-slate-400">${cat.skills.length} Competencies</span>
            </div>
          </div>
          <div class="space-y-2.5">
            ${cat.skills.map(s => `
              <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <div class="flex items-center justify-between gap-1 mb-0.5">
                  <span class="text-xs font-bold text-slate-900">${s.name}</span>
                  <span class="text-[9px] font-mono text-blue-600 font-semibold px-1.5 py-0.5 bg-blue-50 rounded">${s.level}</span>
                </div>
                <p class="text-[11px] text-slate-500 leading-relaxed">${s.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  // 4. Selected Results Grid
  const resultsEl = document.getElementById('resumeSelectedResults');
  if (resultsEl && window.PORTFOLIO_DATA.skillsData && window.PORTFOLIO_DATA.skillsData.selectedResults) {
    resultsEl.innerHTML = window.PORTFOLIO_DATA.skillsData.selectedResults.map(r => `
      <div class="luxury-card rounded-2xl p-6 bg-white border border-slate-200 shadow-xs">
        <span class="editorial-badge bg-amber-50 text-amber-800 border-amber-200">${r.result}</span>
        <h4 class="text-base font-bold text-slate-900 mt-3 mb-1.5">${r.title}</h4>
        <p class="text-xs text-slate-600 leading-relaxed">${r.detail}</p>
      </div>
    `).join('');
  }
}

// ============================================================
// 7. CONTACT & TOAST ENGINE
// ============================================================
function initContactActions() {
  document.querySelectorAll('.action-copy-phone').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText('+91 6266473530').then(() => {
        showToast('Phone copied: +91 6266473530');
      });
    });
  });

  document.querySelectorAll('.action-copy-email').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText('mubin.works@gmail.com').then(() => {
        showToast('Email copied: mubin.works@gmail.com');
      });
    });
  });
}

function showToast(text) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast-notice px-5 py-3 rounded-2xl flex items-center gap-3 border border-slate-300 shadow-2xl bg-white text-slate-900';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <div class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">
      <i class="fa-solid fa-check"></i>
    </div>
    <span class="text-xs font-semibold text-slate-900 font-mono">${text}</span>
  `;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
