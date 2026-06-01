/* ===== DOCHUB - SEARCH JAVASCRIPT ===== */
/* Live search system with real-time filtering */

'use strict';

// ===== INIT SEARCH =====
function initSearch() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results-grid');
  const searchResultsSection = document.getElementById('search-results-section');
  const searchCount = document.getElementById('search-count');

  if (!searchInput) return;

  let debounceTimer;

  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    const query = e.target.value.trim();
    window.DocHub.searchQuery = query;

    debounceTimer = setTimeout(() => {
      performSearch(query);
    }, 200);
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      clearTimeout(debounceTimer);
      performSearch(e.target.value.trim());
    }
    if (e.key === 'Escape') {
      searchInput.value = '';
      window.DocHub.searchQuery = '';
      performSearch('');
    }
  });

  // Also trigger filter update when search changes
  function performSearch(query) {
    window.DocHub.searchQuery = query;

    // Update main docs grid
    if (window.applyFilters) window.applyFilters();

    // Update dedicated search results
    if (!searchResults) return;

    if (!query) {
      if (searchResultsSection) searchResultsSection.style.display = 'none';
      return;
    }

    const results = window.DocHub.documents.filter(d =>
      d.title.toLowerCase().includes(query.toLowerCase()) ||
      d.owner.toLowerCase().includes(query.toLowerCase()) ||
      d.dept.toLowerCase().includes(query.toLowerCase()) ||
      d.category.toLowerCase().includes(query.toLowerCase())
    );

    if (searchResultsSection) {
      searchResultsSection.style.display = 'block';
      searchResultsSection.style.animation = 'slide-up 0.4s ease forwards';
    }

    if (searchCount) {
      searchCount.textContent = `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`;
    }

    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 40px;">
          <div class="no-results-icon" style="font-size: 3rem; margin-bottom: 15px; opacity: 0.5;">🔎</div>
          <p style="color: var(--text-muted); font-family: var(--font-ui); letter-spacing: 1px;">
            No documents match "<strong style="color: var(--neon-blue);">${escapeHtml(query)}</strong>"
          </p>
          <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 10px;">
            Try searching by title, owner, department, or category
          </p>
        </div>
      `;
      return;
    }

    renderSearchResults(results, query, searchResults);
  }
}

// ===== RENDER SEARCH RESULTS =====
function renderSearchResults(results, query, container) {
  container.innerHTML = results.map((doc, index) => {
    const highlightedTitle = highlightText(doc.title, query);
    const highlightedOwner = highlightText(doc.owner, query);
    const highlightedDept = highlightText(doc.dept, query);
    const highlightedCategory = highlightText(doc.category, query);

    const glow = hexToRgba(doc.color, 0.2);

    return `
      <div class="doc-card" 
           style="--doc-color: ${doc.color}; --doc-glow: ${glow}; animation: slide-up 0.4s ease ${index * 0.07}s forwards; opacity: 0;"
           onclick="openDocViewer(${doc.id})">
        <div class="doc-card-header">
          <span class="doc-type-badge" style="border-color: ${doc.color}33; color: ${doc.color}; background: ${doc.color}15;">
            ${highlightedCategory}
          </span>
          <span class="doc-icon-large">${doc.icon}</span>
        </div>
        <div class="doc-title">${highlightedTitle}</div>
        <div class="doc-meta">
          <div class="doc-meta-item">
            <span>👤</span>
            <span class="doc-meta-label">${highlightedOwner}</span>
          </div>
          <div class="doc-meta-item">
            <span>🏢</span>
            <span class="doc-meta-label">${highlightedDept}</span>
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
}

// ===== HIGHLIGHT TEXT =====
function highlightText(text, query) {
  if (!query) return escapeHtml(text);
  const escaped = escapeHtml(text);
  const escapedQuery = escapeHtml(query).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return escaped.replace(
    new RegExp(escapedQuery, 'gi'),
    match => `<mark>${match}</mark>`
  );
}

// ===== ESCAPE HTML =====
function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// ===== HEX TO RGBA =====
function hexToRgba(hex, alpha) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return `rgba(0,212,255,${alpha})`;
  return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`;
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  window.initSearch = initSearch;
});
