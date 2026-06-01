/* ===== DOCHUB - ADMIN JAVASCRIPT ===== */
/* Full CRUD — Add, Edit, Delete permanently, Category Management */

'use strict';

// ===== ADMIN STATE =====
const AdminHub = {
  isLoggedIn: false,
  credentials: { username: 'admin', password: 'dochub2025' },
  editingId: null,
  currentCatFilter: 'All',
};

// ===== INJECT ADMIN STYLES =====
const adminStyles = document.createElement('style');
adminStyles.textContent = `
  @keyframes shake {
    0%,100%{transform:translateX(0)}
    20%{transform:translateX(-10px)}
    40%{transform:translateX(10px)}
    60%{transform:translateX(-8px)}
    80%{transform:translateX(8px)}
  }
  @keyframes confirm-pop {
    0%{transform:scale(0.85) translateY(20px);opacity:0}
    100%{transform:scale(1) translateY(0);opacity:1}
  }
  .confirm-overlay {
    position:fixed;inset:0;z-index:999999;
    display:flex;align-items:center;justify-content:center;padding:20px;
    background:rgba(0,0,10,0.82);backdrop-filter:blur(12px);
    animation:fade-in 0.2s ease forwards;
  }
  .confirm-box {
    width:100%;max-width:420px;
    background:rgba(3,8,40,0.98);
    border:1px solid rgba(255,80,80,0.4);
    border-radius:20px;overflow:hidden;
    box-shadow:0 0 60px rgba(255,50,50,0.15),0 30px 80px rgba(0,0,0,0.6);
    animation:confirm-pop 0.35s cubic-bezier(0.23,1,0.32,1) forwards;
  }
  .confirm-header {
    padding:22px 24px 14px;
    background:rgba(255,50,50,0.06);
    border-bottom:1px solid rgba(255,80,80,0.15);
    text-align:center;
  }
  .confirm-icon { font-size:3rem;display:block;margin-bottom:10px; }
  .confirm-title {
    font-family:var(--font-display);font-size:1rem;font-weight:800;
    letter-spacing:2px;text-transform:uppercase;color:#ff6464;
  }
  .confirm-body { padding:20px 24px; }
  .confirm-doc-name {
    font-family:var(--font-body);font-size:0.9rem;font-weight:600;
    color:var(--text-primary);text-align:center;
    padding:12px 16px;margin:0 0 16px;
    background:rgba(255,80,80,0.05);
    border:1px solid rgba(255,80,80,0.15);border-radius:10px;
  }
  .confirm-warning {
    font-family:var(--font-ui);font-size:0.78rem;
    color:var(--text-muted);text-align:center;letter-spacing:1px;
    margin-bottom:22px;line-height:1.6;
  }
  .confirm-warning strong { color:#ff6464; }
  .confirm-btns { display:flex;gap:10px; }
  .confirm-btn-cancel {
    flex:1;padding:13px;font-family:var(--font-ui);font-size:0.85rem;font-weight:600;
    letter-spacing:1.5px;text-transform:uppercase;
    color:var(--text-muted);background:transparent;
    border:1px solid rgba(255,255,255,0.12);border-radius:10px;
    cursor:pointer;transition:all 0.2s ease;
  }
  .confirm-btn-cancel:hover { border-color:rgba(255,255,255,0.3);color:var(--text-primary); }
  .confirm-btn-delete {
    flex:1;padding:13px;font-family:var(--font-ui);font-size:0.85rem;font-weight:700;
    letter-spacing:1.5px;text-transform:uppercase;
    color:#fff;background:linear-gradient(135deg,#ff2020,#b00000);
    border:none;border-radius:10px;cursor:pointer;
    box-shadow:0 0 25px rgba(255,50,50,0.4);transition:all 0.2s ease;
  }
  .confirm-btn-delete:hover { box-shadow:0 0 40px rgba(255,50,50,0.7);transform:translateY(-2px); }
`;
document.head.appendChild(adminStyles);

// ===== LOGIN =====
function initAdminLogin() {
  const loginForm = document.getElementById('admin-login-form');
  if (sessionStorage.getItem('dochub_admin') === 'authenticated') {
    showAdminPanel(); return;
  }
  if (!loginForm) return;

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const u = document.getElementById('admin-username').value;
    const p = document.getElementById('admin-password').value;

    if (u === AdminHub.credentials.username && p === AdminHub.credentials.password) {
      sessionStorage.setItem('dochub_admin', 'authenticated');
      AdminHub.isLoggedIn = true;
      showAdminPanel();
      showToastAdmin('Welcome back, Administrator! 🔐', 'success', '✅');
    } else {
      const err = document.getElementById('login-error');
      if (err) { err.style.display = 'block'; err.textContent = '⚠️ Invalid credentials. Try admin / dochub2025'; }
      loginForm.style.animation = 'shake 0.4s ease';
      setTimeout(() => { loginForm.style.animation = ''; if (err) err.style.display = 'none'; }, 3000);
    }
  });
}

function showAdminPanel() {
  AdminHub.isLoggedIn = true;
  const loginSection = document.getElementById('login-section');
  const adminPanel = document.getElementById('admin-panel');
  if (loginSection) loginSection.style.display = 'none';
  if (adminPanel) {
    adminPanel.style.display = 'block';
    adminPanel.style.animation = 'slide-up 0.5s ease forwards';
    renderAdminDocuments();
    updateAdminStats();
    initCategoryManager();
    updateCategoryDropdown();
  }
}

function adminLogout() {
  sessionStorage.removeItem('dochub_admin');
  AdminHub.isLoggedIn = false;
  document.getElementById('login-section').style.display = 'flex';
  document.getElementById('admin-panel').style.display = 'none';
  showToastAdmin('Logged out successfully', 'info', '👋');
}

// ===== STATS =====
function updateAdminStats() {
  const d = document.getElementById('admin-total-docs');
  const c = document.getElementById('admin-total-cats');
  const f = document.getElementById('admin-total-folders');
  if (d) d.textContent = window.DocHub.documents.length;
  if (c) c.textContent = window.DocHub.categories.length;
  if (f) f.textContent = window.DocHub.categories.length;
}

// ===== SYNC PUBLIC SITE + SAVE PERMANENTLY =====
function syncPublicSite() {
  // ✅ Save to localStorage FIRST — makes changes permanent across reloads
  if (window.saveDocHubData) window.saveDocHubData();

  if (window.applyFilters) window.applyFilters();
  if (window.renderFolders) window.renderFolders('folders-grid');
  if (window.renderDocuments) window.renderDocuments(window.DocHub.documents, 'docs-grid');
  updateAdminStats();
  renderAdminDocuments(AdminHub.currentCatFilter);
  renderCategoryList();
}

// ===== RENDER ADMIN DOCUMENTS =====
function renderAdminDocuments(filterCat = 'All') {
  AdminHub.currentCatFilter = filterCat;
  const container = document.getElementById('admin-docs-list');
  if (!container) return;

  let docs = [...window.DocHub.documents];

  if (filterCat !== 'All') {
    docs = docs.filter(d => d.category === filterCat);
  }

  const searchVal = document.getElementById('admin-search')?.value?.toLowerCase() || '';
  if (searchVal) {
    docs = docs.filter(d =>
      d.title.toLowerCase().includes(searchVal) ||
      d.owner.toLowerCase().includes(searchVal) ||
      d.dept.toLowerCase().includes(searchVal) ||
      d.category.toLowerCase().includes(searchVal)
    );
  }

  if (docs.length === 0) {
    container.innerHTML = `
      <tr><td colspan="6" style="text-align:center;padding:50px;color:var(--text-muted);font-family:var(--font-ui);letter-spacing:1px;">
        📭 No documents found
      </td></tr>`;
    return;
  }

  container.innerHTML = docs.map(doc => `
    <tr class="admin-doc-row" id="admin-row-${doc.id}">
      <td>
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="font-size:1.4rem;">${doc.icon}</span>
          <div>
            <div style="font-weight:600;color:var(--text-primary);font-size:0.88rem;max-width:240px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${doc.title}</div>
            <div style="font-size:0.72rem;color:var(--text-muted);margin-top:2px;">#${doc.id} ${doc.file ? '• 📎 PDF' : ''}</div>
          </div>
        </div>
      </td>
      <td><span style="font-family:var(--font-ui);font-size:0.82rem;padding:3px 10px;border-radius:50px;background:${doc.color}18;color:${doc.color};border:1px solid ${doc.color}33;">${doc.category}</span></td>
      <td style="font-size:0.85rem;color:var(--text-secondary);">${doc.owner}</td>
      <td style="font-size:0.82rem;color:var(--text-muted);">${doc.dept}</td>
      <td style="font-size:0.8rem;color:var(--text-muted);font-family:var(--font-ui);">${new Date(doc.date).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</td>
      <td>
        <div style="display:flex;gap:8px;justify-content:flex-end;">
          <button class="admin-action-btn edit-btn" onclick="openEditModal(${doc.id})" title="Edit Document">✏️</button>
          <button class="admin-action-btn delete-btn" onclick="confirmDeleteDocument(${doc.id})" title="Delete Permanently">🗑️</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// ===== ADD DOCUMENT MODAL =====
function openAddModal() {
  AdminHub.editingId = null;
  const modal = document.getElementById('doc-form-modal');
  const title = document.getElementById('form-modal-title');
  if (title) title.textContent = '➕ ADD NEW DOCUMENT';
  clearDocForm();
  if (modal) { modal.style.display = 'flex'; }
}

function openEditModal(id) {
  const doc = window.DocHub.documents.find(d => d.id === id);
  if (!doc) return;

  AdminHub.editingId = id;
  const modal = document.getElementById('doc-form-modal');
  const title = document.getElementById('form-modal-title');
  if (title) title.textContent = '✏️ EDIT DOCUMENT';

  document.getElementById('form-doc-title').value = doc.title;
  document.getElementById('form-doc-owner').value = doc.owner;
  document.getElementById('form-doc-dept').value = doc.dept;
  document.getElementById('form-doc-category').value = doc.category;
  document.getElementById('form-doc-date').value = doc.date;
  document.getElementById('form-doc-icon').value = doc.icon;

  if (modal) modal.style.display = 'flex';
}

function closeDocFormModal() {
  const modal = document.getElementById('doc-form-modal');
  if (modal) modal.style.display = 'none';
  AdminHub.editingId = null;
  clearDocForm();
}

function clearDocForm() {
  ['form-doc-title','form-doc-owner','form-doc-dept','form-doc-icon'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const dateEl = document.getElementById('form-doc-date');
  if (dateEl) dateEl.value = new Date().toISOString().split('T')[0];
  const catEl = document.getElementById('form-doc-category');
  if (catEl && window.DocHub.categories.length > 0) catEl.value = window.DocHub.categories[0].name;
}

// ===== SAVE DOCUMENT (Add / Edit) =====
function saveDocument() {
  const title    = document.getElementById('form-doc-title')?.value?.trim();
  const owner    = document.getElementById('form-doc-owner')?.value?.trim();
  const dept     = document.getElementById('form-doc-dept')?.value?.trim();
  const category = document.getElementById('form-doc-category')?.value;
  const date     = document.getElementById('form-doc-date')?.value;
  const icon     = document.getElementById('form-doc-icon')?.value?.trim() || '📄';

  // Validation
  if (!title)    { highlightField('form-doc-title',    'Please enter a title');    return; }
  if (!owner)    { highlightField('form-doc-owner',    'Please enter an owner');   return; }
  if (!dept)     { highlightField('form-doc-dept',     'Please enter department'); return; }
  if (!date)     { highlightField('form-doc-date',     'Please select a date');    return; }

  const categoryData = window.DocHub.categories.find(c => c.name === category);
  const color = categoryData?.color || '#00d4ff';

  if (AdminHub.editingId !== null) {
    // ===== EDIT EXISTING =====
    const idx = window.DocHub.documents.findIndex(d => d.id === AdminHub.editingId);
    if (idx !== -1) {
      const existing = window.DocHub.documents[idx];
      window.DocHub.documents[idx] = { ...existing, title, owner, dept, category, date, icon, color };
      showToastAdmin(`"${title}" updated successfully!`, 'success', '✅');
    }
  } else {
    // ===== ADD NEW =====
    const newId = window.DocHub.documents.length > 0
      ? Math.max(...window.DocHub.documents.map(d => d.id)) + 1
      : 1;
    window.DocHub.documents.push({ id: newId, title, owner, dept, category, date, icon, color });
    showToastAdmin(`"${title}" added successfully!`, 'success', '➕');
  }

  closeDocFormModal();
  syncPublicSite();
}

function highlightField(id, msg) {
  const el = document.getElementById(id);
  if (el) {
    el.style.borderColor = '#ff6464';
    el.style.boxShadow  = '0 0 15px rgba(255,100,100,0.3)';
    el.focus();
    setTimeout(() => {
      el.style.borderColor = '';
      el.style.boxShadow   = '';
    }, 2000);
  }
  showToastAdmin(msg, 'warning', '⚠️');
}

// ===== CONFIRM DELETE (Beautiful Dialog) =====
function confirmDeleteDocument(id) {
  const doc = window.DocHub.documents.find(d => d.id === id);
  if (!doc) return;

  // Remove existing
  const existing = document.getElementById('confirm-delete-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'confirm-delete-overlay';
  overlay.className = 'confirm-overlay';

  overlay.innerHTML = `
    <div class="confirm-box">
      <div class="confirm-header">
        <span class="confirm-icon">🗑️</span>
        <div class="confirm-title">Delete Permanently</div>
      </div>
      <div class="confirm-body">
        <div class="confirm-doc-name">${doc.icon} ${doc.title}</div>
        <div class="confirm-warning">
          This will <strong>permanently remove</strong> this document from DocHub.<br>
          The action <strong>cannot be undone</strong>.
        </div>
        <div class="confirm-btns">
          <button class="confirm-btn-cancel" onclick="document.getElementById('confirm-delete-overlay').remove()">
            Cancel
          </button>
          <button class="confirm-btn-delete" onclick="executeDelete(${id})">
            🗑️ Delete Permanently
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Close on backdrop click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });

  // ESC to cancel
  const esc = (e) => {
    if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', esc); }
  };
  document.addEventListener('keydown', esc);
}

// ===== EXECUTE DELETE =====
function executeDelete(id) {
  const doc = window.DocHub.documents.find(d => d.id === id);
  if (!doc) return;

  const name = doc.title;

  // Remove overlay first
  const overlay = document.getElementById('confirm-delete-overlay');
  if (overlay) overlay.remove();

  // Flash the row red before removing
  const row = document.getElementById(`admin-row-${id}`);
  if (row) {
    row.style.transition = 'all 0.4s ease';
    row.style.background = 'rgba(255,50,50,0.15)';
    row.style.opacity = '0.5';
    row.style.transform = 'translateX(30px)';
  }

  setTimeout(() => {
    // Permanently delete from DocHub array
    window.DocHub.documents = window.DocHub.documents.filter(d => d.id !== id);

    // Sync entire site immediately
    syncPublicSite();

    showToastAdmin(`"${name}" deleted permanently`, 'info', '🗑️');
  }, 350);
}

// ===== CATEGORY MANAGER =====
function initCategoryManager() {
  renderCategoryList();
  updateCategoryDropdown();
}

function renderCategoryList() {
  const container = document.getElementById('category-list');
  if (!container) return;

  if (window.DocHub.categories.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:30px;color:var(--text-muted);font-family:var(--font-ui);">No categories yet. Add one above.</div>`;
    return;
  }

  container.innerHTML = window.DocHub.categories.map((cat, i) => {
    const count = window.DocHub.documents.filter(d => d.category === cat.name).length;
    return `
      <div style="
        display:flex;align-items:center;justify-content:space-between;
        padding:14px 18px;
        background:var(--bg-glass);
        border:1px solid var(--glass-border);
        border-radius:12px;
        margin-bottom:8px;
        transition:all 0.2s ease;
      " onmouseover="this.style.borderColor='${cat.color}44'" onmouseout="this.style.borderColor='var(--glass-border)'">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="
            width:42px;height:42px;border-radius:10px;
            background:${cat.color}18;border:1px solid ${cat.color}33;
            display:flex;align-items:center;justify-content:center;font-size:1.3rem;
          ">${cat.icon}</div>
          <div>
            <div style="font-family:var(--font-ui);font-weight:700;color:${cat.color};font-size:0.9rem;">${cat.name}</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px;">
              ${count} document${count !== 1 ? 's' : ''}
              ${count > 0 ? `<span style="color:#ff9966;margin-left:6px;">⚠️ will also be deleted</span>` : ''}
            </div>
          </div>
        </div>
        <div style="display:flex;gap:8px;align-items:center;">
          <button class="admin-action-btn delete-btn" onclick="confirmDeleteCategory(${i})" title="Delete Category Permanently"
            style="width:36px;height:36px;font-size:1rem;">🗑️</button>
        </div>
      </div>
    `;
  }).join('');
}

// ===== ADD CATEGORY =====
function addCategory() {
  const nameEl = document.getElementById('new-category-name');
  const iconEl = document.getElementById('new-category-icon');
  const name   = nameEl?.value?.trim();
  const icon   = iconEl?.value?.trim() || '📁';

  if (!name) { showToastAdmin('Category name is required', 'warning', '⚠️'); return; }

  if (window.DocHub.categories.find(c => c.name.toLowerCase() === name.toLowerCase())) {
    showToastAdmin(`"${name}" already exists`, 'warning', '⚠️'); return;
  }

  // Random vibrant colors
  const colors = ['#00d4ff','#b400ff','#00ff88','#ff6e00','#ff006e','#00ffff','#ff4444','#44ff88'];
  const color  = colors[window.DocHub.categories.length % colors.length];

  window.DocHub.categories.push({ name, icon, color, shadow: color.replace(')', ', 0.3)').replace('#', 'rgba(').replace(/([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i, (m,r,g,b)=> `${parseInt(r,16)},${parseInt(g,16)},${parseInt(b,16)}`) });

  if (nameEl) nameEl.value = '';
  if (iconEl)  iconEl.value  = '';

  // Update admin filter tabs
  updateAdminFilterTabs();
  updateCategoryDropdown();
  renderCategoryList();
  updateAdminStats();

  // Sync public folders + SAVE permanently
  if (window.renderFolders) window.renderFolders('folders-grid');
  if (window.saveDocHubData) window.saveDocHubData();

  showToastAdmin(`Category "${name}" created!`, 'success', '✅');
}

// ===== CONFIRM DELETE CATEGORY =====
function confirmDeleteCategory(index) {
  const cat = window.DocHub.categories[index];
  if (!cat) return;

  const existing = document.getElementById('confirm-delete-overlay');
  if (existing) existing.remove();

  const count = window.DocHub.documents.filter(d => d.category === cat.name).length;

  const overlay = document.createElement('div');
  overlay.id = 'confirm-delete-overlay';
  overlay.className = 'confirm-overlay';

  overlay.innerHTML = `
    <div class="confirm-box">
      <div class="confirm-header">
        <span class="confirm-icon">${cat.icon}</span>
        <div class="confirm-title">Delete Category</div>
      </div>
      <div class="confirm-body">
        <div class="confirm-doc-name" style="color:${cat.color};">${cat.name}</div>
        ${count > 0 ? `
        <div style="
          padding:12px 16px;margin-bottom:14px;
          background:rgba(255,100,0,0.08);
          border:1px solid rgba(255,100,0,0.3);
          border-radius:10px;text-align:center;
        ">
          <div style="font-size:1.5rem;margin-bottom:6px;">⚠️</div>
          <div style="font-family:var(--font-ui);font-size:0.82rem;color:#ff9966;font-weight:700;letter-spacing:1px;margin-bottom:4px;">
            ${count} DOCUMENT${count !== 1 ? 'S' : ''} WILL ALSO BE DELETED
          </div>
          <div style="font-size:0.75rem;color:var(--text-muted);">
            All documents in this category will be permanently removed.
          </div>
        </div>
        ` : ''}
        <div class="confirm-warning">
          This category will be <strong>permanently deleted</strong>.<br>
          This action <strong>cannot be undone</strong>.
        </div>
        <div class="confirm-btns">
          <button class="confirm-btn-cancel" onclick="document.getElementById('confirm-delete-overlay').remove()">
            Cancel
          </button>
          <button class="confirm-btn-delete" onclick="executeDeleteCategory(${index})">
            🗑️ Delete${count > 0 ? ` Category + ${count} Doc${count !== 1 ? 's' : ''}` : ' Category'}
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

  const esc = (e) => {
    if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', esc); }
  };
  document.addEventListener('keydown', esc);
}

// ===== EXECUTE DELETE CATEGORY =====
function executeDeleteCategory(index) {
  const overlay = document.getElementById('confirm-delete-overlay');
  if (overlay) overlay.remove();

  const cat = window.DocHub.categories[index];
  if (!cat) return;

  const catName = cat.name;
  const docsRemoved = window.DocHub.documents.filter(d => d.category === catName).length;

  // Delete all documents in this category
  window.DocHub.documents = window.DocHub.documents.filter(d => d.category !== catName);

  // Delete the category
  window.DocHub.categories.splice(index, 1);

  // Sync everything
  updateCategoryDropdown();
  updateAdminFilterTabs();
  renderCategoryList();
  updateAdminStats();
  renderAdminDocuments('All');
  AdminHub.currentCatFilter = 'All';

  if (window.renderFolders) window.renderFolders('folders-grid');
  if (window.applyFilters) window.applyFilters();

  const msg = docsRemoved > 0
    ? `"${catName}" + ${docsRemoved} document${docsRemoved !== 1 ? 's' : ''} deleted`
    : `Category "${catName}" deleted`;
  showToastAdmin(msg, 'info', '🗑️');
}

// ===== UPDATE CATEGORY DROPDOWN =====
function updateCategoryDropdown() {
  const select = document.getElementById('form-doc-category');
  if (!select) return;
  select.innerHTML = window.DocHub.categories.map(c =>
    `<option value="${c.name}">${c.icon} ${c.name}</option>`
  ).join('');
}

// ===== UPDATE ADMIN FILTER TABS =====
function updateAdminFilterTabs() {
  const container = document.getElementById('admin-category-filters');
  if (!container) return;

  const cats = ['All', ...window.DocHub.categories.map(c => c.name)];
  container.innerHTML = cats.map((f, i) => `
    <button class="admin-filter-tab ${f === AdminHub.currentCatFilter ? 'active' : ''}"
            data-filter="${f}"
            onclick="adminFilterCategory('${f}')">
      ${f === 'All' ? '🌐 All' : (window.DocHub.categories.find(c=>c.name===f)?.icon || '') + ' ' + f}
    </button>
  `).join('');
}

// ===== ADMIN FILTER =====
function adminFilterCategory(cat) {
  AdminHub.currentCatFilter = cat;
  document.querySelectorAll('.admin-filter-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.filter === cat);
  });
  renderAdminDocuments(cat);
}

// ===== ADMIN SEARCH =====
function initAdminSearch() {
  const searchEl = document.getElementById('admin-search');
  if (!searchEl) return;
  searchEl.addEventListener('input', () => {
    renderAdminDocuments(AdminHub.currentCatFilter);
  });
}

// ===== TOAST =====
function showToastAdmin(message, type = 'info', icon = '💡') {
  if (window.showToast) window.showToast(message, type, icon);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initAdminLogin();
  initAdminSearch();

  const formModal = document.getElementById('doc-form-modal');
  if (formModal) {
    formModal.addEventListener('click', (e) => {
      if (e.target === formModal) closeDocFormModal();
    });
  }

  // ESC closes form modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const formModal = document.getElementById('doc-form-modal');
      if (formModal && formModal.style.display === 'flex') closeDocFormModal();
    }
  });

  // Expose all globals
  window.adminLogout            = adminLogout;
  window.openAddModal           = openAddModal;
  window.openEditModal          = openEditModal;
  window.closeDocFormModal      = closeDocFormModal;
  window.saveDocument           = saveDocument;
  window.confirmDeleteDocument  = confirmDeleteDocument;
  window.executeDelete          = executeDelete;
  window.addCategory            = addCategory;
  window.confirmDeleteCategory  = confirmDeleteCategory;
  window.executeDeleteCategory  = executeDeleteCategory;
  window.adminFilterCategory    = adminFilterCategory;
  window.updateCategoryDropdown = updateCategoryDropdown;
  window.syncPublicSite         = syncPublicSite;
});
