/* ===== DOCHUB - DOCUMENTS JAVASCRIPT ===== */
/* Renders document cards and folder system */

'use strict';

// ===== RENDER CATEGORIES/FOLDERS =====
function renderFolders(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const categories = window.DocHub.categories;

  container.innerHTML = categories.map((cat, index) => {
    const count = window.DocHub.documents.filter(d => d.category === cat.name).length;
    const delay = index * 0.1;
    return `
      <div class="folder-card reveal delay-${index + 1}" 
           onclick="filterByCategory('${cat.name}')"
           style="cursor:pointer;">
        <div class="folder-inner holo-card"
             style="--folder-color: ${cat.color}; --folder-glow: ${cat.shadow.replace(')', ', 0.1)')}; --folder-shadow: ${cat.shadow};">
          <span class="folder-icon">${cat.icon}</span>
          <div class="folder-name">${cat.name}</div>
          <div class="folder-count"><span>${count}</span> Documents</div>
        </div>
      </div>
    `;
  }).join('');

  // Re-run scroll reveal for new elements
  if (window.initScrollReveal) {
    setTimeout(initScrollReveal, 100);
  }
}

// ===== RENDER DOCUMENT CARDS =====
function renderDocuments(docs, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (docs.length === 0) {
    container.innerHTML = `
      <div class="no-results" style="grid-column: 1/-1;">
        <div class="no-results-icon">🔍</div>
        <p>No documents found</p>
      </div>
    `;
    return;
  }

  container.innerHTML = docs.map((doc, index) => {
    const floatDur = (8 + (index % 5)) + 's';
    const floatDelay = -(index * 0.7) + 's';
    const glow = doc.color.replace('#', 'rgba(').replace(/([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i, (m, r, g, b) => {
      return parseInt(r,16) + ',' + parseInt(g,16) + ',' + parseInt(b,16);
    }) + ', 0.2)';

    return `
      <div class="doc-card reveal"
           style="--doc-color: ${doc.color}; --doc-glow: ${glow}; --float-dur: ${floatDur}; --float-delay: ${floatDelay};"
           onclick="openDocViewer(${doc.id})"
           data-id="${doc.id}"
           data-category="${doc.category}"
           data-owner="${doc.owner}"
           data-dept="${doc.dept}"
           data-title="${doc.title}">
        <div class="doc-card-header">
          <span class="doc-type-badge" style="border-color: ${doc.color}33; color: ${doc.color}; background: ${doc.color}15;">
            ${doc.category}
          </span>
          <span class="doc-icon-large">${doc.icon}</span>
        </div>
        <div class="doc-title">${doc.title}</div>
        <div class="doc-meta">
          <div class="doc-meta-item">
            <span>👤</span>
            <span class="doc-meta-label">${doc.owner}</span>
          </div>
          <div class="doc-meta-item">
            <span>🏢</span>
            <span class="doc-meta-label">${doc.dept}</span>
          </div>
        </div>
        <div class="doc-card-footer">
          <span class="doc-date">📅 ${new Date(doc.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <div class="doc-actions" onclick="event.stopPropagation()">
            <button class="doc-action-btn" title="View" onclick="openDocViewer(${doc.id})">👁️</button>
            <button class="doc-action-btn" title="Download" onclick="window._activeDoc=DocHub.documents.find(d=>d.id===${doc.id}); downloadDocument()">⬇️</button>
            <button class="doc-action-btn" title="Share" onclick="window._activeDoc=DocHub.documents.find(d=>d.id===${doc.id}); shareDocument()">🔗</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Re-run scroll reveal for new elements
  setTimeout(() => {
    document.querySelectorAll('.doc-card.reveal:not(.visible)').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 80);
    });
  }, 50);
}

// ===== FILTER BY CATEGORY =====
function filterByCategory(category) {
  window.DocHub.currentFilter = category;

  // Update filter tabs
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.classList.remove('active');
    if (tab.dataset.filter === category) tab.classList.add('active');
  });

  // Scroll to documents
  const docsSection = document.getElementById('documents');
  if (docsSection) {
    docsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  applyFilters();
  showToast(`Showing ${category} documents`, 'info', DocHub.categories.find(c => c.name === category)?.icon || '📁');
}

// ===== APPLY FILTERS + SEARCH =====
function applyFilters() {
  const docs = window.DocHub.documents;
  const filter = window.DocHub.currentFilter;
  const query = window.DocHub.searchQuery.toLowerCase();

  let filtered = docs;

  if (filter !== 'All') {
    filtered = filtered.filter(d => d.category === filter);
  }

  if (query) {
    filtered = filtered.filter(d =>
      d.title.toLowerCase().includes(query) ||
      d.owner.toLowerCase().includes(query) ||
      d.dept.toLowerCase().includes(query) ||
      d.category.toLowerCase().includes(query)
    );
  }

  // Update main docs grid
  const mainGrid = document.getElementById('docs-grid');
  if (mainGrid) renderDocuments(filtered, 'docs-grid');

  // Update results count
  const countEl = document.getElementById('docs-count');
  if (countEl) {
    countEl.textContent = `${filtered.length} document${filtered.length !== 1 ? 's' : ''}`;
  }
}

// ===== INIT FILTER TABS =====
function initFilterTabs() {
  const tabsContainer = document.getElementById('filter-tabs');
  if (!tabsContainer) return;

  const filters = ['All', ...window.DocHub.categories.map(c => c.name)];

  tabsContainer.innerHTML = filters.map(f => `
    <button class="filter-tab ${f === 'All' ? 'active' : ''}" 
            data-filter="${f}"
            onclick="setFilter('${f}')">
      ${f === 'All' ? '🌐 All' : f}
    </button>
  `).join('');
}

// ===== SET FILTER =====
function setFilter(filter) {
  window.DocHub.currentFilter = filter;

  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.classList.remove('active');
    if (tab.dataset.filter === filter) tab.classList.add('active');
  });

  applyFilters();
}

// ===== INIT DOCUMENTS PAGE =====
document.addEventListener('DOMContentLoaded', () => {
  // Render folders on index page
  renderFolders('folders-grid');

  // Render documents
  renderDocuments(window.DocHub.documents, 'docs-grid');

  // Init filter tabs
  initFilterTabs();

  // Expose globals
  window.filterByCategory = filterByCategory;
  window.setFilter = setFilter;
  window.applyFilters = applyFilters;
  window.renderDocuments = renderDocuments;
  window.renderFolders = renderFolders;
});
