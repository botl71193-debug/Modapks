const rahasiaHTML = `
  <div class="navbar">
    <div class="navbar-left">
      <button class="menu-toggle" onclick="handleSidebarDisplay()">☰</button>
    </div>
    <div class="logo-box">
      <img class="logo" src="https://diverse-aqua-iq7wghij.edgeone.app/M.png" alt="Logo MMK">
      <span class="main-title">MMK | MODS</span>
    </div>
    <div class="navbar-right">
      <div id="devUndoRedoControls" style="display: none; gap: 8px; margin-right: 15px; align-items: center;">
        <button class="dev-action-badge-btn edit-btn" style="width: 32px; height: 32px; font-weight: bold;" title="Undo Data" onclick="undoDeveloperAction()">←</button>
        <button class="dev-action-badge-btn edit-btn" style="width: 32px; height: 32px; font-weight: bold;" title="Redo Data" onclick="redoDeveloperAction()">→</button>
      </div>
      <button class="search-trigger-btn" onclick="handleSearchToggle()">🔍</button>
      <div class="search-popover" id="searchPopover">
        <input type="text" id="searchInput" placeholder="Cari Mod Game..." onkeyup="executeApkSearch()">
      </div>
    </div>
  </div>

  <div class="sidebar" id="sidebarMenu">
    <span class="sidebar-close" onclick="handleSidebarDisplay()">×</span>
    <div class="sidebar-brand-area">
      <img class="sidebar-community-logo" src="https://diverse-aqua-iq7wghij.edgeone.app/M.png" alt="MMK Community">
      <div class="sidebar-brand-title">MMK | MODS</div>
      <div id="userSignBadge" class="sidebar-sign-text">Guest Mode</div>
    </div>
    <div class="cyber-auth-container" style="margin-bottom: 22px;">
      <button id="authTriggerBtn" class="cyber-auth-btn" onclick="handleAuthModalDisplay()">⚙️ Sign In</button>
    </div>
    <div id="devRoleSwitcher" class="ever-dev-block" style="display:none; margin-bottom: 22px; padding: 10px; border: 1px dashed rgba(244,63,94,0.3); border-radius: 10px; background: rgba(244,63,94,0.05);">
      <div style="font-size:0.7rem; color:var(--text-muted); margin-bottom:8px; text-align:center;">Ganti Role Cepat</div>
      <div style="display:flex; gap:6px;">
        <button class="action-trigger-btn" style="flex:1; font-size:0.7rem; padding:6px 4px;" onclick="switchRoleDirect('GUEST')">Guest</button>
        <button class="action-trigger-btn" style="flex:1; font-size:0.7rem; padding:6px 4px; border-color:#a855f7; background:rgba(168,85,247,0.1);" onclick="switchRoleDirect('EXECUTIVE')">Executive</button>
        <button class="action-trigger-btn" style="flex:1; font-size:0.7rem; padding:6px 4px; border-color:var(--dev-color); background:rgba(244,63,94,0.1);" onclick="switchRoleDirect('DEVELOPER')">Developer</button>
      </div>
    </div>
    <div class="sidebar-label">𝙆𝙖𝙩𝙚𝙜𝙤𝙧𝙞 𝘼𝙥𝙡𝙞𝙠𝙖𝙨𝙞</div>
    <ul class="sidebar-menu-list">
      <li><div class="sidebar-item-btn" onclick="applyCategoryFilter('all')">𝐀𝐥𝐥 𝐀𝐩𝐩𝐬</div></li>
      <li><div class="sidebar-item-btn" onclick="applyCategoryFilter('Aplikasi Mod')">𝐀𝐩𝐥𝐢𝐤𝐚𝐬𝐢 𝐌𝐨𝐝</div></li>
      <li><div class="sidebar-item-btn" onclick="applyCategoryFilter('Games Mod')">𝐆𝐚𝐦𝐞𝐬 𝐌𝐨𝐝</div></li>
      <li><div class="sidebar-item-btn" onclick="applyCategoryFilter('Streaming')">𝐒𝐭𝐫𝐞𝐚𝐦𝐢𝐧𝐠</div></li>
      <li><div class="sidebar-item-btn" onclick="applyCategoryFilter('Music')">𝐌𝐮𝐬𝐢𝐜</div></li>
      <li><div class="sidebar-item-btn" onclick="applyCategoryFilter('Tools')">𝐓𝐨𝐨𝐥𝐬</div></li>
      <li><div class="sidebar-item-btn" onclick="applyCategoryFilter('Editor')">𝐄𝐝𝐢𝐭𝐨𝐫</div></li>
    </ul>

    <div class="sidebar-divider"></div>
    <div class="sidebar-label">Interaksi Komunitas</div>
    <ul class="sidebar-menu-list">
      <li><div class="sidebar-item-btn" style="border-color: #0ea5e9; background: rgba(14, 165, 233, 0.1);" onclick="openRequestModModal()">Request Mod Aplikasi</div></li>
    </ul>

    <div class="sidebar-divider dev-only-block"></div>
    <div class="sidebar-label dev-only-block" style="color: var(--dev-color);">Dev Full Database Tool</div>
    <ul class="sidebar-menu-list dev-only-block">
      <li><div class="sidebar-item-btn" style="border-color: #3b82f6; background: rgba(59,130,246,0.12);" onclick="openDialogConfigPanel()">⚙️ Configuration Dialog</div></li>
      <li><div class="sidebar-item-btn" style="border-color: rgba(244,63,94,0.3); background: rgba(244,63,94,0.05);" onclick="exportCurrentApksFile('apksOnly')">💾 Ekspor apks.js</div></li>
      <li><div class="sidebar-item-btn" style="border-color: #3b82f6; background: rgba(59,130,246,0.12);" onclick="openDialogUpdateExportModal()">🚀 Luncurkan updt</div></li>
      <li><div class="sidebar-item-btn" style="border-color: rgba(244,63,94,0.3); background: rgba(244,63,94,0.05);" onclick="document.getElementById('importApksFile').click()">📥 Impor apks.js</div></li>
      <li style="margin-top: 10px;"><div class="sidebar-item-btn" style="border-color: #a855f7; background: rgba(168,85,247,0.1);" onclick="exportCurrentApksFile('exportvip')">⚡ Ekspor vip.js</div></li>
      <li><div class="sidebar-item-btn" style="border-color: #a855f7; background: rgba(168,85,247,0.1);" onclick="document.getElementById('importvipFile').click()">📥 Impor vip.js</div></li>
      <li style="margin-top: 10px;"><div class="sidebar-item-btn" style="border-color: #f59e0b; background: rgba(245,158,11,0.1);" onclick="openClearCloneModal()">🧹 Clear Clone</div></li>
    </ul>
    <input type="file" id="importApksFile" accept=".js" style="display:none" onchange="processImportApks(this)">
    <input type="file" id="importvipFile" accept=".js" style="display:none" onchange="processImportvip(this)">

    <div class="sidebar-divider hidden-exec-item"></div>
    <div class="sidebar-label hidden-exec-item" style="color: var(--exec-color);">Exclusive MODDED</div>
    <ul class="sidebar-menu-list hidden-exec-item">
      <li class="dropdown-parent" id="dropToolsModder">
        <div class="sidebar-item-btn exec-theme-btn" onclick="handleDropdownTrigger('dropToolsModder')">
          <span>🧰 Modder Tools app</span><span class="arrow-icon exec-arrow">▼</span>
        </div>
        <ul class="sub-menu-holder exec-sub-list">
          <li><div onclick="showExecAppDetails('npManager')">- np manager</div></li>
          <li><div onclick="showExecAppDetails('mtManager')">- mt manager</div></li>
          <li><div onclick="showExecAppDetails('toolM')">- tool M</div></li>
          <li><div onclick="showExecAppDetails('luckyPatcher')">- Lucky patcher</div></li>
          <li><div onclick="showExecAppDetails('modderhub')">- Modderhub</div></li>
        </ul>
      </li>
    </ul>

    <div class="sidebar-divider"></div>
    <div class="sidebar-label">𝕁𝕆𝕀ℕ 𝕄𝕐 ℂ𝕆𝕄𝕄𝕌ℕ𝕀𝕋𝕐</div>
    <ul class="sidebar-menu-list">
      <li><a class="sidebar-item-btn" href="https://chat.whatsapp.com/LDzlBOXR3I12Rb79oy5TFJ" target="_blank">MrKhenz - Official [Grup]🚀</a></li>
      <li><a class="sidebar-item-btn" href="https://whatsapp.com/channel/0029Vb7vQrL1yT22MFrBrR42" target="_blank">MMK | Saluran 1</a></li>
      <li><a class="sidebar-item-btn" href="https://whatsapp.com/channel/0029Vb7i2omLNSa3VM8Chc1A" target="_blank">MMK | Saluran 2</a></li>
    </ul>
  </div>

  <div class="overlay-mask" id="globalOverlay" onclick="closeActiveOverlays()"></div>

  <div class="modal-box" id="authGateModal">
    <span class="modal-close-btn" onclick="closeActiveOverlays()">×</span>
    <h3 style="margin-bottom: 10px; color:#fff;">🛡️ SIGN IN</h3>
    <div id="loginFormState">
      <input type="password" id="devKeyInput" style="background:#020205; border:1px solid var(--border); border-radius:8px; padding:12px; color:#fff; width:100%; margin-bottom:15px; text-align:center; letter-spacing:4px; outline:none;" placeholder=" ✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏ ">
      <button class="download-action-btn" onclick="processAuthVerification()">VERIFIKASI AKSES</button>
    </div>
    <div id="logoutFormState" style="display:none; text-align:center;">
      <p id="authActiveModeText" style="color:var(--accent); margin-bottom:20px; font-size:0.9rem; font-weight:bold;"></p>
      <button class="download-action-btn" style="background:linear-gradient(135deg, #ef4444, #991b1b)" onclick="processAuthLogout()">LOGOUT</button>
    </div>
  </div>

  <div class="modal-box dev-panel-modal" id="devApkFormModal">
    <span class="modal-close-btn" onclick="closeActiveOverlays()">×</span>
    <h3 id="formModalTitle" style="margin-bottom: 15px; color:#fff; font-size: 1.15rem; border-bottom: 1px solid rgba(244, 63, 94, 0.2); padding-bottom: 10px;">➕</h3>
    <input type="hidden" id="formEditIndex" value="">
    <div class="form-mobile-vertical-stack">
      <div class="form-group" id="existingApkSelectorRow">
        <label style="color: var(--accent);">Salin Dari APK Yang Sudah Ada</label>
        <select id="formExistingApkSelect" onchange="handleLoadExistingApkData()">
          <option value="">-- Buat Baru Dari Awal --</option>
        </select>
      </div>
      <div class="form-group"><label>Nama APK</label><input type="text" id="formApkName"></div>
      <div class="form-group"><label>Versi (tampil)</label><input type="text" id="formApkVersion" placeholder="2.5.4"></div>
      <div class="form-group"><label>versionName</label><input type="text" id="formApkVersionName" placeholder="2.5.4 (opsional)"></div>
      <div class="form-group"><label>versionCode (angka)</label><input type="number" id="formApkVersionCode" min="1" placeholder="25302"></div>
      <div class="form-group"><label>packageName</label><input type="text" id="formApkPackageName" placeholder="com.example.app"></div>
      <div class="form-group"><label>Changelog (satu baris per item)</label><textarea id="formApkChangelog" rows="2"></textarea></div>
      <div class="form-group"><label>Link Arm64 (opsional)</label><input type="text" id="formApkLinkArm64"></div>
      <div class="form-group"><label>Link Arm32 (opsional)</label><input type="text" id="formApkLinkArm32"></div>
      <div class="form-group">
        <label>Kategori</label>
        <select id="formApkCategory">
          <option value="Aplikasi Mod">Aplikasi Mod</option>
          <option value="Games Mod">Games Mod</option>
          <option value="Streaming">Streaming</option>
          <option value="Music">Music</option>
          <option value="Tools">Tools</option>
          <option value="Editor">Editor</option>
        </select>
      </div>
      <div class="form-group"><label>Ukuran Size</label><input type="text" id="formApkSize"></div>
      <div class="form-group">
        <label>Sistem Android</label>
        <select id="formApkAndroid">
          <option value="Android 5+">Android 5+</option>
          <option value="Android 6+">Android 6+</option>
          <option value="Android 7+">Android 7+</option>
          <option value="Android 8+">Android 8+</option>
          <option value="Android 9+">Android 9+</option>
          <option value="Android 10+">Android 10+</option>
          <option value="Android 11+">Android 11+</option>
          <option value="Android 12+">Android 12+</option>
          <option value="Android 13+">Android 13+</option>
          <option value="Android 14+">Android 14+</option>
          <option value="Android 15+">Android 15+</option>
        </select>
      </div>
      <div class="form-group"><label>Deskripsi Fitur</label><textarea id="formApkDesc" rows="3"></textarea></div>
      <div class="form-group">
        <label>URL Gambar / Ikon APK</label>
        <div class="pena-upload-wrapper">
          <input type="text" id="formApkImg" placeholder="https://...">
          <button class="action-trigger-btn" style="background: rgba(14, 165, 233, 0.15); border-color: #0ea5e9;" onclick="copyFieldValue('formApkImg')">📄 COPY</button>
          <button class="action-trigger-btn" onclick="pasteFieldValue('formApkImg')">📋 PASTE</button>
        </div>
      </div>
      <div class="form-group">
        <label>URL Download Tautan Berkas</label>
        <div class="pena-upload-wrapper">
          <input type="text" id="formApkLink" placeholder="https://...">
          <button class="action-trigger-btn" style="background: rgba(14, 165, 233, 0.15); border-color: #0ea5e9;" onclick="copyFieldValue('formApkLink')">📄 COPY</button>
          <button class="action-trigger-btn" style="background: rgba(168, 85, 247, 0.15); border-color: #a855f7;" onclick="pasteFieldValue('formApkLink')">📋 PASTE</button>
        </div>
      </div>
      <div class="form-group" style="margin-top: 10px; border-top: 1px dashed rgba(168,85,247,0.35); padding-top: 14px;">
        <label style="color: #a855f7; display: flex; align-items: center; justify-content: space-between; gap: 10px; cursor: pointer; user-select: none;">
          <span style="display: flex; align-items: center; gap: 8px;">
            <input type="checkbox" id="formApkHookEnabled" onchange="onHookToggleChange()" style="width: 18px; height: 18px; cursor: pointer; accent-color: #a855f7;">
            <span>⚡ AKTIFKAN HOOK SYSTEM</span>
          </span>
          <span id="hookStatusBadge" style="font-size: 0.7rem; padding: 2px 8px; border-radius: 6px; background: rgba(100,116,139,0.2); color: #64748b; border: 1px solid rgba(100,116,139,0.4);">NONAKTIF</span>
        </label>
      </div>
      <div id="hookBuilderSection" style="display: none;">
        <div class="form-group">
          <div style="display: flex; justify-content: flex-end; margin-bottom: 6px;">
            <button type="button" class="action-trigger-btn" style="padding: 4px 10px; font-size: 0.72rem; background: rgba(168,85,247,0.15); border-color: #a855f7;" onclick="addHookRow()">+ TAMBAH HOOK</button>
          </div>
          <div id="hookRowsContainer" style="display: flex; flex-direction: column; gap: 8px;"></div>
          <input type="hidden" id="formApkHooks" value="[]">
        </div>
      </div>
    </div>
    <div class="form-btn-row">
      <button class="download-action-btn" style="background:#334155;" onclick="closeActiveOverlays()">CANCEL</button>
      <button class="download-action-btn" style="background:linear-gradient(135deg, var(--dev-color) 0%, #991b1b 100%);" onclick="saveApkFormSubmission()">UPLOAD</button>
    </div>
  </div>

  <div class="modal-box dev-panel-modal" id="dialogConfigPanelModal" style="max-height:90vh;overflow-y:auto;width:95%;max-width:680px;">
    <span class="modal-close-btn" onclick="closeActiveOverlays()">×</span>
    <h3 style="margin-bottom:14px;color:#fff;font-size:1.15rem;border-bottom:1px solid rgba(59,130,246,0.3);padding-bottom:10px;">⚙️ Configuration Dialog</h3>
    <p style="font-size:0.78rem;color:var(--text-muted);margin-bottom:14px;">Klik ⚙️ pada setiap APK untuk mengatur toggle fitur dan metadata.</p>
    <div id="dialogConfigList" style="display:flex;flex-direction:column;gap:10px;"></div>
  </div>

  <div class="modal-box dev-panel-modal" id="dialogConfigEditModal" style="max-height:90vh;overflow-y:auto;width:95%;max-width:520px;">
    <span class="modal-close-btn" onclick="closeActiveOverlays()">×</span>
    <input type="hidden" id="dialogConfigEditIndex" value="">
    <h3 style="margin-bottom:14px;color:#fff;font-size:1.15rem;border-bottom:1px solid rgba(59,130,246,0.3);padding-bottom:10px;">⚙️ Konfigurasi APK</h3>
    <div class="header stagger" style="margin-bottom:16px;">
      <div class="apk-icon-frame" id="dialogConfigAppIcon" style="border-color:#3b82f6;"></div>
      <div class="apk-main-info">
        <span class="apk-title" id="dialogConfigAppName">-</span>
        <span class="apk-version" id="dialogConfigAppVersion">-</span>
        <div class="apk-badge-row">
          <span class="apk-badge" style="color:#3b82f6;border-color:rgba(59,130,246,0.3);background:rgba(59,130,246,0.08);" id="dialogConfigAppPkg">-</span>
        </div>
      </div>
    </div>

    <div class="config-section-divider">🔧 Fitur Dialog</div>

    <div class="modal-toggle-row">
      <div class="modal-toggle-label">
        <div class="modal-toggle-title">Sign Check</div>
        <div class="modal-toggle-desc">Verifikasi signature SHA1</div>
      </div>
      <div class="toggle-pair" data-key="signCheck">
        <button type="button" class="toggle-btn" onclick="setToggle('signCheck', false, this)">✗</button>
        <button type="button" class="toggle-btn" onclick="setToggle('signCheck', true, this)">✓</button>
      </div>
    </div>

    <div class="modal-toggle-row">
      <div class="modal-toggle-label">
        <div class="modal-toggle-title">BTN Mode</div>
        <div class="modal-toggle-desc">Tester bar debug (Mode 1/2/3/Auto)</div>
      </div>
      <div class="toggle-pair" data-key="btnMode">
        <button type="button" class="toggle-btn" onclick="setToggle('btnMode', false, this)">✗</button>
        <button type="button" class="toggle-btn" onclick="setToggle('btnMode', true, this)">✓</button>
      </div>
    </div>

    <div class="modal-toggle-row">
      <div class="modal-toggle-label">
        <div class="modal-toggle-title">Crash Log</div>
        <div class="modal-toggle-desc">Tombol crash viewer di tester bar</div>
      </div>
      <div class="toggle-pair" data-key="crashLog">
        <button type="button" class="toggle-btn" onclick="setToggle('crashLog', false, this)">✗</button>
        <button type="button" class="toggle-btn" onclick="setToggle('crashLog', true, this)">✓</button>
      </div>
    </div>

    <div class="modal-toggle-row">
      <div class="modal-toggle-label">
        <div class="modal-toggle-title">Force Close on Update</div>
        <div class="modal-toggle-desc">Tutup(FC) vs Tutup biasa saat update</div>
      </div>
      <div class="toggle-pair" data-key="forceCloseOnUpdate">
        <button type="button" class="toggle-btn" onclick="setToggle('forceCloseOnUpdate', false, this)">✗</button>
        <button type="button" class="toggle-btn" onclick="setToggle('forceCloseOnUpdate', true, this)">✓</button>
      </div>
    </div>

    <div class="config-section-divider">📝 Metadata Update</div>

    <div class="form-group" style="margin-bottom:10px;">
      <label>Versi (versionName)</label>
      <input type="text" id="dialogConfigVersion" placeholder="2.5.4" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;">
    </div>
    <div class="form-group" style="margin-bottom:10px;">
      <label>Kode Versi (versionCode)</label>
      <input type="number" id="dialogConfigVersionCode" placeholder="25302" min="1" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;">
    </div>
    <div class="form-group">
      <label>Changelog (satu baris per item)</label>
      <textarea id="dialogConfigChangelog" rows="5" placeholder="Perbaikan bug&#10;Update UI" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:inherit;"></textarea>
    </div>

    <div class="form-btn-row" style="margin-top:20px;">
      <button class="download-action-btn" style="background:#334155;" onclick="closeActiveOverlays()">BATAL</button>
      <button class="download-action-btn" style="background:linear-gradient(135deg,#3b82f6,#1d4ed8);" onclick="saveDialogConfigSettings()">SIMPAN</button>
    </div>
  </div>

  <div class="modal-box dev-panel-modal" id="requestModModal" style="max-height: 90vh; overflow-y: auto;">
    <span class="modal-close-btn" onclick="closeActiveOverlays()">×</span>
    <h3 style="margin-bottom: 10px; color:#fff; font-size: 1.15rem; border-bottom: 1px solid rgba(14, 165, 233, 0.2); padding-bottom: 10px;">💡 FORMULIR REQUEST MOD</h3>
    <div class="form-mobile-vertical-stack">
      <div class="form-group"><label>Nama Aplikasi / Game</label><input type="text" id="reqAppName"></div>
      <div class="form-group"><label>Link Play Store / Sumber Resmi</label><input type="text" id="reqAppPlaystore"></div>
    </div>
    <div class="form-btn-row" style="margin-top: 15px;">
      <button class="download-action-btn" style="background:#334155;" onclick="closeActiveOverlays()">BATAL</button>
      <button class="download-action-btn" style="background:linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%);" onclick="submitUserModRequest()">KIRIM REQUEST 🚀</button>
    </div>
  </div>

  <div class="modal-box dev-panel-modal" id="adminRequestListModal" style="max-height: 85vh; overflow-y: auto; width: 90%; max-width: 600px;">
    <span class="modal-close-btn" onclick="closeActiveOverlays()">×</span>
    <h3 style="margin-bottom: 12px; color:#fff; font-size: 1.15rem; border-bottom: 1px solid rgba(244, 63, 94, 0.2); padding-bottom: 10px;">📋 KELOLA DAFTAR REQUEST</h3>
    <div id="adminRequestListContainer" style="display: flex; flex-direction: column; gap: 10px;"></div>
  </div>

  <div class="modal-box dev-panel-modal" id="devReorderModal">
    <span class="modal-close-btn" onclick="closeActiveOverlays()">×</span>
    <h3 style="margin-bottom: 15px; color:#fff; font-size: 1.15rem; border-bottom: 1px solid rgba(14, 165, 233, 0.2); padding-bottom: 10px;">🔄 PINDAH POSISI APK</h3>
    <input type="hidden" id="reorderCurrentIndex" value="">
    <p id="reorderApkNameDisplay" style="color:var(--accent); margin-bottom:15px; font-weight:bold; font-size:1.1rem; text-align:center;"></p>
    <div class="form-group">
      <label>Pindah ke Nomor Urut Berapa? (1 - <span id="reorderMaxPos"></span>)</label>
      <input type="number" id="reorderTargetPos" min="1" style="text-align:center; font-weight:bold; font-size:1.2rem;">
    </div>
    <div class="form-btn-row">
      <button class="download-action-btn" style="background:#334155;" onclick="closeActiveOverlays()">BATAL</button>
      <button class="download-action-btn" style="background:linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%);" onclick="executeReorder()">PINDAHKAN 🚀</button>
    </div>
  </div>

  <div class="modal-box dev-panel-modal" id="devDatabaseExportModal">
    <span class="modal-close-btn" onclick="closeActiveOverlays()">×</span>
    <h3 id="exportModalMainTitle" style="margin-bottom: 5px; color:#fff;">📂 SALIN DATABASE</h3>
    <p id="exportModalSubDescription" style="font-size:0.8rem; color:var(--text-muted); margin-bottom: 15px;">Salin seluruh teks kode di bawah ini.</p>
    <div class="form-group">
      <textarea id="exportTextareaContainer" rows="12" style="font-family: 'Courier New', monospace; font-size: 0.78rem; color: #67e8f9; background:#010208;" readonly onclick="this.select()"></textarea>
    </div>
    <button class="download-action-btn" style="background:linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%);" onclick="copyExportedTextToClipboard()">📋 KLIK SALIN SEMUA KODE</button>
  </div>

  <div class="modal-box dev-panel-modal" id="dialogUpdateExportModal" style="max-height: 90vh; overflow-y: auto;">
    <span class="modal-close-btn" onclick="closeActiveOverlays()">×</span>
    <h3 style="margin-bottom: 10px; color:#fff; font-size: 1.15rem; border-bottom: 1px solid rgba(59,130,246,0.35); padding-bottom: 10px;">🚀 Luncurkan Update</h3>
    <div class="form-group">
      <label>Pilih APK</label>
      <select id="dialogUpdateApkSelect" onchange="previewDialogUpdatePayload()"></select>
    </div>
    <div class="form-group">
      <label>Role unduhan</label>
      <select id="dialogUpdateRoleSelect" onchange="previewDialogUpdatePayload()">
        <option value="GUEST">Guest / User</option>
        <option value="EXECUTIVE">Executive</option>
        <option value="DEVELOPER">Developer</option>
      </select>
    </div>
    <div class="form-group">
      <label>Preview JSON</label>
      <textarea id="dialogUpdatePreview" rows="14" style="font-family: 'Courier New', monospace; font-size: 0.75rem; color: #93c5fd; background:#010208;" readonly onclick="this.select()"></textarea>
    </div>
    <div class="form-btn-row" style="flex-wrap:wrap; gap:8px;">
      <button class="download-action-btn" style="background:#334155;" onclick="closeActiveOverlays()">BATAL</button>
      <button class="download-action-btn" style="background:linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);" onclick="copyDialogUpdatePayload()">📋 SALIN JSON</button>
      <button class="download-action-btn" style="background:linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%);" onclick="downloadDialogUpdateFile()">💾 UNDUH JSON</button>
    </div>
  </div>

  <div class="modal-box dev-panel-modal" id="clearCloneModal" style="max-height: 85vh; overflow-y: auto;">
    <span class="modal-close-btn" onclick="closeActiveOverlays()">×</span>
    <h3 style="margin-bottom: 10px; color:#fff; font-size: 1.15rem; border-bottom: 1px solid rgba(245, 158, 11, 0.25); padding-bottom: 10px;">🧹 CLEAR CLONE APK</h3>
    <div id="clearCloneListContainer" style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px;"></div>
    <div class="form-btn-row">
      <button class="download-action-btn" style="background:#334155;" onclick="closeActiveOverlays()">BATAL</button>
      <button class="download-action-btn" style="background:linear-gradient(135deg, #f59e0b 0%, #b45309 100%);" onclick="executeClearClone()">LANJUTKAN 🧹</button>
    </div>
  </div>

  <div class="modal-box exec-panel-modal" id="execAppDetailsModal">
    <span class="modal-close-btn" onclick="closeActiveOverlays()">×</span>
    <div class="apk-top-flex" style="border-bottom: 1px solid rgba(168, 85, 247, 0.2); padding-bottom: 15px; margin-bottom: 10px;">
      <div class="apk-icon-frame" id="execModalIcon" style="border-color: var(--exec-color);"></div>
      <div class="apk-main-info">
        <span class="apk-title" id="execModalName">Nama Aplikasi</span>
        <span class="apk-version" id="execModalVersion">Versi: 1.0.0</span>
        <div class="apk-badge-row" id="execModalBadges"></div>
      </div>
    </div>
    <div class="exec-header-row">
      <span class="sidebar-label" style="color: var(--exec-color); font-size: 0.72rem;">FUNGSI & ENGINE UTAMA :</span>
      <a href="#" target="_blank" id="execModalDownloadBtn" class="exec-panel-download-btn"> UNDUH </a>
    </div>
    <div style="text-align: left;">
      <div class="exec-feature-list" id="execModalFeatures"></div>
    </div>
  </div>

  <div class="modal-box" id="modderProfileModal">
    <span class="modal-close-btn" onclick="closeActiveOverlays()">×</span>
    <div style="text-align:center; padding:10px 0;">
      <div style="width:75px; height:75px; background:rgba(0,243,255,0.1); border:2px solid var(--accent); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 15px auto; font-weight:900; color:#fff; font-size:1.5rem;">MMK</div>
      <h3 style="color:#fff; margin-bottom:4px;">MMK Modder Engine</h3>
      <p style="color:var(--accent); font-size:0.85rem; font-weight:700; margin-bottom:15px;">Lead Software Modificator</p>
      <p style="font-size:0.84rem; color:var(--text-muted); line-height:1.5;">Ekosistem Aplikasi Android khusus internal MMK Team.</p>
    </div>
  </div>

  <div class="container" id="mainContainer">
    <div class="welcome-header">
      <p>Premium Modded Applications Database</p>
      <button class="download-action-btn dev-only-block" style="max-width:250px; background: linear-gradient(135deg, var(--dev-color) 0%, #b91c1c 100%);" onclick="openAddApkFormModal()">
        ➕ TAMBAH DATA APK BARU
      </button>
    </div>
    <div class="apk-grid" id="apkDisplayGrid"></div>
    <div id="loadMoreContainer" style="text-align: center; margin-top: 25px; display: none;"></div>
    <div class="no-results-alert" id="searchEmptyAlert">❌ Berkas Mod tidak ditemukan.</div>
    <div class="footer-notice">
      <p style="color:var(--text-muted); font-size:0.85rem;">Platform Architecture Crafted By <strong>Khenzo</strong></p>
      <div class="notice-danger-card">⚠️ PERINGATAN: SELURUH LAYANAN MMK 100% GRATIS!</div>
    </div>
  </div>

  <div class="floating-profile-trigger" onclick="handleModderProfileModal()">👤</div>
`;

document.body.insertAdjacentHTML('afterbegin', rahasiaHTML);

const TOKEN_EXECUTIVE = "-..- . -.-. ..- - .. ...-";
const TOKEN_DEVELOPER = "--- .-- -. . .-. / -- -- -.-";

let internalApksData = [];
let apksHistory = [];
let currentHistoryIndex = -1;
let pendingCloneRemovals = [];
let currentPage = 1;
const itemsPerPage = 8;

const unmodifiableAppsList = [
  "gopay", "dana", "ovo", "shopeepay", "linkaja", "jenius", "sakuku", "mekari pay",
  "airlearn", "babbel", "brilliant", "testbook", "unacademy", "aiuta", "tradingview", "vidyakul",
  "mobile legends", "free fire", "pubg", "genshin impact", "whatsapp official"
];

const HOOK_TYPES = [
  { v: 'Z', label: 'Z — boolean (toggle)' },
  { v: 'B', label: 'B — byte' },
  { v: 'S', label: 'S — short' },
  { v: 'I', label: 'I — int' },
  { v: 'J', label: 'J — long (tanggal)' },
  { v: 'F', label: 'F — float' },
  { v: 'D', label: 'D — double' },
  { v: 'Ljava/lang/String;', label: 'String' }
];
let hookRowsData = [];

const DEFAULT_DIALOG_CONFIG = {
  signCheck: true,
  btnMode: false,
  crashLog: false,
  forceCloseOnUpdate: true
};

function pushHistoryState() {
    if (currentHistoryIndex < apksHistory.length - 1) {
        apksHistory = apksHistory.slice(0, currentHistoryIndex + 1);
    }
    apksHistory.push(JSON.parse(JSON.stringify(internalApksData)));
    currentHistoryIndex++;
}

function undoDeveloperAction() {
    if (currentHistoryIndex > 0) {
        currentHistoryIndex--;
        internalApksData = JSON.parse(JSON.stringify(apksHistory[currentHistoryIndex]));
        localStorage.setItem('mmk_local_apks', JSON.stringify(internalApksData));
        renderGridCards();
    } else alert("⚠️ Memori Undo kosong.");
}

function redoDeveloperAction() {
    if (currentHistoryIndex < apksHistory.length - 1) {
        currentHistoryIndex++;
        internalApksData = JSON.parse(JSON.stringify(apksHistory[currentHistoryIndex]));
        localStorage.setItem('mmk_local_apks', JSON.stringify(internalApksData));
        renderGridCards();
    } else alert("⚠️ Memori Redo kosong.");
}

function initializeCatalogueEngine() {
    const grid = document.getElementById('apkDisplayGrid');
    if (!grid) return;
    const savedLocalData = localStorage.getItem('mmk_local_apks');
    if (savedLocalData) {
        internalApksData = JSON.parse(savedLocalData);
    } else if (typeof apks !== 'undefined') {
        internalApksData = apks;
    } else {
        internalApksData = [];
    }
    currentPage = 1;
    renderGridCards();
    updateAdminBadgeCount();
    apksHistory = [];
    currentHistoryIndex = -1;
    pushHistoryState();
}

function buildBadgeRow(item) {
    const hookBadge = (Array.isArray(item.hooks) && item.hooks.length > 0 && item.hookEnabled !== false)
        ? `<span class="apk-badge" style="background:rgba(168,85,247,0.15);border-color:#a855f7;color:#a855f7;">⚡ ${item.hooks.length} Hook</span>` : '';
    const cfgBadge = (item.dialogConfig)
        ? `<span class="apk-badge" style="background:rgba(59,130,246,0.15);border-color:#3b82f6;color:#3b82f6;">⚙️ Cfg</span>` : '';
    return `
        <span class="apk-badge">💾 ${item.size || '0 MB'}</span>
        <span class="apk-badge">🤖 ${item.android || '5.0+'}</span>
        <span class="apk-badge">📁 ${item.category || 'General'}</span>
        ${hookBadge}
        ${cfgBadge}
    `;
}

function getCardDefaultIcon(item) {
    if (item.category === 'Streaming') return '🎬';
    if (item.category === 'Games Mod') return '🎮';
    if (item.category === 'Music') return '🎵';
    if (item.category === 'Tools') return '🛠️';
    return '📱';
}

function buildDevControlBox(index, activeRole) {
    const displayControl = activeRole === 'DEVELOPER' ? 'flex' : 'none';
    return `
        <div class="card-control-box" style="display:${displayControl}; flex-direction: column; align-items: flex-end; gap: 4px;">
            <div style="display: flex; gap: 4px;">
                <div class="dev-action-badge-btn edit-btn" title="Edit APK" onclick="openEditApkFormModal(${index})">✏️</div>
                <div class="dev-action-badge-btn delete-btn" title="Hapus APK" onclick="deleteApkItemCard(${index})">🗑️</div>
            </div>
            <button class="dev-action-badge-btn edit-btn" title="Pindah Urutan" style="width: auto; padding: 2px 8px; font-size: 0.75rem; border-radius: 4px; margin-top: 2px; font-weight: bold; border-color: rgba(14, 165, 233, 0.4); background: rgba(14, 165, 233, 0.1); color: #0ea5e9;" onclick="openReorderModal(${index})">${index + 1}</button>
        </div>
    `;
}

function renderGridCards() {
    const grid = document.getElementById('apkDisplayGrid');
    const paginationContainer = document.getElementById('loadMoreContainer');
    const alertEmpty = document.getElementById('searchEmptyAlert');
    if (!grid) return;
    grid.innerHTML = "";
    const activeRole = localStorage.getItem('mmk_sys_role') || 'GUEST';
    if (internalApksData.length === 0) {
        if(alertEmpty) alertEmpty.style.display = 'block';
        if(paginationContainer) paginationContainer.style.display = 'none';
        return;
    } else if(alertEmpty) alertEmpty.style.display = 'none';
    const totalPages = Math.ceil(internalApksData.length / itemsPerPage);
    if (currentPage > totalPages) currentPage = totalPages || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const slicedData = internalApksData.slice(startIndex, startIndex + itemsPerPage);
    slicedData.forEach((item, relativeIndex) => {
        const index = startIndex + relativeIndex;
        const card = document.createElement('div');
        card.className = 'apk-card';
        card.setAttribute('data-target-cat', item.category);
        card.setAttribute('data-target-droid', item.android);
        const defaultIcon = getCardDefaultIcon(item);
        card.innerHTML = `
            ${buildDevControlBox(index, activeRole)}
            <div class="apk-top-flex">
                <div class="apk-icon-frame">
                    <img src="${item.imageUrl || ''}" alt="${item.name || ''}" onerror="this.style.display='none'; this.parentElement.innerHTML='${defaultIcon}';">
                </div>
                <div class="apk-main-info">
                    <span class="apk-title">${item.name || 'No Name'}</span>
                    <span class="apk-version">${item.version || ''}</span>
                    <div class="apk-badge-row">${buildBadgeRow(item)}</div>
                </div>
            </div>
            <div class="apk-desc-area">${item.description || 'Tidak ada deskripsi.'}</div>
            <div class="card-action-row">
                <a href="${item.downloadUrl || '#'}" target="_blank" class="download-action-btn"> UNDUH </a>
                <button class="share-action-btn" title="Bagikan" onclick="shareApkCard(${index})">🔗</button>
            </div>
        `;
        grid.appendChild(card);
    });
    if (paginationContainer) {
        if (totalPages > 1) {
            paginationContainer.style.display = 'block';
            let html = '<div style="display: flex; justify-content: center; gap: 6px; flex-wrap: wrap;">';
            for (let i = 1; i <= totalPages; i++) {
                const active = i === currentPage;
                const style = active ? 'background: #0ea5e9; color: #fff; border-color: #0ea5e9;' : 'background: rgba(14, 165, 233, 0.15); color: #0ea5e9; border-color: rgba(14, 165, 233, 0.4);';
                html += `<button style="${style} font-weight: bold; padding: 6px 12px; border-radius: 6px; border-width: 1px; border-style: solid; cursor: pointer;" onclick="changePage(${i})">${i}</button>`;
            }
            html += '</div>';
            paginationContainer.innerHTML = html;
        } else {
            paginationContainer.style.display = 'none';
        }
    }
}

function changePage(pageNum) {
    currentPage = pageNum;
    renderGridCards();
    document.getElementById('mainContainer').scrollIntoView({ behavior: 'smooth' });
}

function deleteApkItemCard(index) {
    const targetApk = internalApksData[index];
    if (!targetApk) return;
    if (confirm(`Hapus "${targetApk.name}" dari sistem?`)) {
        internalApksData.splice(index, 1);
        localStorage.setItem('mmk_local_apks', JSON.stringify(internalApksData));
        pushHistoryState();
        renderGridCards();
        alert("Aplikasi berhasil dihapus!");
    }
}

function openRequestModModal() {
    closeActiveOverlays();
    document.getElementById('reqAppName').value = "";
    document.getElementById('reqAppPlaystore').value = "";
    document.getElementById('globalOverlay').classList.add('active');
    document.getElementById('requestModModal').classList.add('active');
}

function submitUserModRequest() {
    const name = document.getElementById('reqAppName').value.trim();
    const playstore = document.getElementById('reqAppPlaystore').value.trim();
    if (!name || !playstore) { alert("❌ Harap isi Nama Aplikasi dan Link Play Store!"); return; }
    const isUnmodifiable = unmodifiableAppsList.some(k => name.toLowerCase().includes(k) || playstore.toLowerCase().includes(k));
    if (isUnmodifiable) { alert("Sayangnya aplikasi tersebut tidak bisa di mod di karenakan serverside/dll"); return; }
    const newReq = { id: Date.now(), name: name, playstoreUrl: playstore, date: new Date().toLocaleString('id-ID') };
    const existingReqs = JSON.parse(localStorage.getItem('mmk_mod_requests') || '[]');
    existingReqs.push(newReq);
    localStorage.setItem('mmk_mod_requests', JSON.stringify(existingReqs));
    const adminEmail = "mrkhenzoofficial@gmail.com";
    const subject = encodeURIComponent(`Please This App : ${name}`);
    const body = encodeURIComponent(`Halo Min,\n\nNama Aplikasi / Game : ${name}\nLink : ${playstore}\n\nTerima kasih!`);
    window.location.href = `mailto:${adminEmail}?subject=${subject}&body=${body}`;
    alert("✅ Request tersimpan & email dibuka.");
    closeActiveOverlays();
}

function updateAdminBadgeCount() {
    const reqs = JSON.parse(localStorage.getItem('mmk_mod_requests') || '[]');
    const badge = document.getElementById('reqBadgeCount');
    if (badge) badge.textContent = reqs.length;
}

function openAdminRequestListModal() {
    closeActiveOverlays();
    const container = document.getElementById('adminRequestListContainer');
    if (!container) return;
    let reqs = JSON.parse(localStorage.getItem('mmk_mod_requests') || '[]');
    container.innerHTML = "";
    if (reqs.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:var(--text-muted); padding: 20px;">Belum ada request mod masuk.</p>`;
    } else {
        reqs.forEach((req, idx) => {
            const itemBox = document.createElement('div');
            itemBox.style.cssText = "background: rgba(2,2,5,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px; display: flex; flex-direction: column; gap: 8px;";
            itemBox.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <strong style="color:#fff; font-size:0.95rem;">${idx + 1}. ${req.name}</strong>
                    <span style="font-size:0.7rem; color:var(--text-muted);">${req.date}</span>
                </div>
                <div style="font-size:0.78rem; color:#0ea5e9; word-break:break-all;">🔗 ${req.playstoreUrl}</div>
                <div style="display:flex; gap:8px; margin-top:4px; flex-wrap:wrap;">
                    <button class="action-trigger-btn" style="background:rgba(14,165,233,0.15); border-color:#0ea5e9; font-size:0.72rem; padding:4px 8px;" onclick="copyDirectText('${req.playstoreUrl}')">📋 Copy</button>
                    <button class="action-trigger-btn" style="background:rgba(34,197,94,0.15); border-color:#22c55e; font-size:0.72rem; padding:4px 8px;" onclick="resolveModRequest(${req.id}, 'selesai')">✅ Selesai</button>
                    <button class="action-trigger-btn" style="background:rgba(239,68,68,0.15); border-color:#ef4444; font-size:0.72rem; padding:4px 8px;" onclick="resolveModRequest(${req.id}, 'ditolak')">❌ Tidak Bisa</button>
                </div>
            `;
            container.appendChild(itemBox);
        });
    }
    document.getElementById('globalOverlay').classList.add('active');
    document.getElementById('adminRequestListModal').classList.add('active');
}

async function copyDirectText(text) {
    try { await navigator.clipboard.writeText(text); alert("📋 Link disalin!"); }
    catch(e) { alert("Gagal menyalin."); }
}

function resolveModRequest(id, status) {
    let reqs = JSON.parse(localStorage.getItem('mmk_mod_requests') || '[]');
    reqs = reqs.filter(r => r.id !== id);
    localStorage.setItem('mmk_mod_requests', JSON.stringify(reqs));
    updateAdminBadgeCount();
    openAdminRequestListModal();
    if (status === 'selesai') alert("🎉 Request selesai!");
    else alert("⚠️ Request ditandai tidak bisa di-mod.");
}

function openReorderModal(index) {
    closeActiveOverlays();
    const apk = internalApksData[index];
    if (!apk) return;
    document.getElementById('reorderCurrentIndex').value = index;
    document.getElementById('reorderApkNameDisplay').textContent = apk.name;
    document.getElementById('reorderMaxPos').textContent = internalApksData.length;
    document.getElementById('reorderTargetPos').value = index + 1;
    document.getElementById('reorderTargetPos').max = internalApksData.length;
    document.getElementById('globalOverlay').classList.add('active');
    document.getElementById('devReorderModal').classList.add('active');
}

function executeReorder() {
    const currentIndex = parseInt(document.getElementById('reorderCurrentIndex').value);
    let targetPos = parseInt(document.getElementById('reorderTargetPos').value);
    if (isNaN(targetPos) || targetPos < 1 || targetPos > internalApksData.length) {
        alert("❌ Posisi tidak valid!"); return;
    }
    const targetIndex = targetPos - 1;
    if (currentIndex === targetIndex) { closeActiveOverlays(); return; }
    const itemToMove = internalApksData.splice(currentIndex, 1)[0];
    internalApksData.splice(targetIndex, 0, itemToMove);
    localStorage.setItem('mmk_local_apks', JSON.stringify(internalApksData));
    pushHistoryState();
    closeActiveOverlays();
    renderGridCards();
}

window.addEventListener('DOMContentLoaded', () => {
    initializeCatalogueEngine();
    syncSecurityAccessState();
    applySharedAppFilterFromUrl();
});

function getSiteBaseUrl() {
    return window.location.origin + window.location.pathname.replace(/index\.html$/, '').replace(/\/$/, '');
}

async function shareApkCard(index) {
    const item = internalApksData[index];
    if (!item) return;
    const shareUrl = `${getSiteBaseUrl()}/sharing.html?app=${encodeURIComponent(item.name)}`;
    const shareText = `*${item.name}*\n\`${item.version || '-'}\`\n\n${item.description || ''}\n\nLink :\n> ${shareUrl}`.trim();
    if (navigator.share) {
        try { await navigator.share({ title: item.name, text: shareText }); } catch (err) {}
        return;
    }
    try {
        await navigator.clipboard.writeText(shareText);
        alert(`🔗 Info "${item.name}" disalin!`);
    } catch (err) { prompt('Salin manual:', shareText); }
}

function applySharedAppFilterFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const sharedApp = params.get('share') || params.get('app');
    if (!sharedApp) return;
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = sharedApp;
    executeApkSearch();
    setTimeout(() => {
        const grid = document.getElementById('apkDisplayGrid');
        if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
}

function handleSidebarDisplay() {
    const sb = document.getElementById('sidebarMenu');
    const ov = document.getElementById('globalOverlay');
    if(sb && ov) { sb.classList.toggle('active'); ov.classList.toggle('active'); }
}

function handleSearchToggle() {
    const container = document.getElementById('searchPopover');
    if(!container) return;
    container.classList.toggle('active');
    if (container.classList.contains('active')) document.getElementById('searchInput').focus();
}

function handleDropdownTrigger(targetId) {
    const target = document.getElementById(targetId);
    if(target) target.classList.toggle('open');
}

function syncSecurityAccessState() {
    const activeRole = localStorage.getItem('mmk_sys_role') || 'GUEST';
    const badge = document.getElementById('userSignBadge');
    const triggerBtn = document.getElementById('authTriggerBtn');
    const hiddenExecElements = document.querySelectorAll('.hidden-exec-item');
    const devOnlyBlocks = document.querySelectorAll('.dev-only-block');
    const controlBoxes = document.querySelectorAll('.card-control-box');
    const devUndoRedo = document.getElementById('devUndoRedoControls');
    const roleSwitcher = document.getElementById('devRoleSwitcher');
    if (roleSwitcher) {
        const everDev = localStorage.getItem('mmk_ever_dev') === 'true';
        roleSwitcher.style.display = everDev ? 'block' : 'none';
    }
    if (activeRole === 'DEVELOPER') {
        if(badge) { badge.textContent = "Developer Mode"; badge.className = "sidebar-sign-text dev-badge"; }
        if(triggerBtn) { triggerBtn.innerHTML = "🔒 Logout"; triggerBtn.classList.add('active-control'); }
        hiddenExecElements.forEach(el => el.style.setProperty('display', 'block', 'important'));
        devOnlyBlocks.forEach(el => el.style.setProperty('display', 'block', 'important'));
        controlBoxes.forEach(el => el.style.display = 'flex');
        if(devUndoRedo) devUndoRedo.style.setProperty('display', 'flex', 'important');
    } else if (activeRole === 'EXECUTIVE') {
        if(badge) { badge.textContent = "Executive Member"; badge.className = "sidebar-sign-text exec-badge"; }
        if(triggerBtn) { triggerBtn.innerHTML = "🔒 Logout"; triggerBtn.classList.add('active-control'); }
        hiddenExecElements.forEach(el => el.style.setProperty('display', 'block', 'important'));
        devOnlyBlocks.forEach(el => el.style.setProperty('display', 'none', 'important'));
        controlBoxes.forEach(el => el.style.display = 'none');
        if(devUndoRedo) devUndoRedo.style.setProperty('display', 'none', 'important');
    } else {
        if(badge) { badge.textContent = "Guest Mode"; badge.className = "sidebar-sign-text"; }
        if(triggerBtn) { triggerBtn.innerHTML = "⚙️ Sign In"; triggerBtn.classList.remove('active-control'); }
        hiddenExecElements.forEach(el => el.style.setProperty('display', 'none', 'important'));
        devOnlyBlocks.forEach(el => el.style.setProperty('display', 'none', 'important'));
        controlBoxes.forEach(el => el.style.display = 'none');
        if(devUndoRedo) devUndoRedo.style.setProperty('display', 'none', 'important');
    }
}

function handleAuthModalDisplay() {
    closeActiveOverlays();
    const activeRole = localStorage.getItem('mmk_sys_role') || 'GUEST';
    document.getElementById('globalOverlay').classList.add('active');
    document.getElementById('authGateModal').classList.add('active');
    if (activeRole !== 'GUEST') {
        document.getElementById('loginFormState').style.display = "none";
        document.getElementById('logoutFormState').style.display = "block";
        document.getElementById('authActiveModeText').textContent = `Status: [ ${activeRole} ]`;
    } else {
        document.getElementById('loginFormState').style.display = "block";
        document.getElementById('logoutFormState').style.display = "none";
        document.getElementById('devKeyInput').value = "";
    }
}

function processAuthVerification() {
    const tokenValue = document.getElementById('devKeyInput').value.trim();
    if (tokenValue === TOKEN_DEVELOPER) {
        localStorage.setItem('mmk_sys_role', 'DEVELOPER');
        localStorage.setItem('mmk_ever_dev', 'true');
        alert("🔐 Akses Developer Terbuka!");
        location.reload();
    } else if (tokenValue === TOKEN_EXECUTIVE) {
        localStorage.setItem('mmk_sys_role', 'EXECUTIVE');
        alert("🔮 Akses Executive Member Terbuka!");
        location.reload();
    } else alert("❌ Token salah!");
}

function switchRoleDirect(role) {
    if (localStorage.getItem('mmk_ever_dev') !== 'true') return;
    if (!['GUEST', 'EXECUTIVE', 'DEVELOPER'].includes(role)) return;
    localStorage.setItem('mmk_sys_role', role);
    location.reload();
}

function processAuthLogout() {
    localStorage.setItem('mmk_sys_role', 'GUEST');
    alert("Keluar dari sesi adm.");
    location.reload();
}

async function copyFieldValue(inputId) {
    const el = document.getElementById(inputId);
    if (!el || !el.value) { alert("⚠️ Kolom kosong!"); return; }
    try { await navigator.clipboard.writeText(el.value); alert("📄 URL disalin!"); }
    catch (err) { el.select(); document.execCommand('copy'); alert("📄 URL disalin!"); }
}

async function pasteFieldValue(inputId) {
    const el = document.getElementById(inputId);
    if (!el) return;
    try { const text = await navigator.clipboard.readText(); el.value = text; }
    catch (err) { alert("❌ Gagal tempel."); }
}

function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function onHookToggleChange() {
    const enabled = document.getElementById('formApkHookEnabled').checked;
    const section = document.getElementById('hookBuilderSection');
    const statusBadge = document.getElementById('hookStatusBadge');
    if (section) section.style.display = enabled ? 'block' : 'none';
    if (statusBadge) {
        if (enabled) {
            statusBadge.textContent = 'AKTIF';
            statusBadge.style.background = 'rgba(168,85,247,0.2)';
            statusBadge.style.color = '#a855f7';
            statusBadge.style.borderColor = 'rgba(168,85,247,0.5)';
        } else {
            statusBadge.textContent = 'NONAKTIF';
            statusBadge.style.background = 'rgba(100,116,139,0.2)';
            statusBadge.style.color = '#64748b';
            statusBadge.style.borderColor = 'rgba(100,116,139,0.4)';
        }
    }
}

function setHookEnabled(enabled) {
    const cb = document.getElementById('formApkHookEnabled');
    if (cb) cb.checked = !!enabled;
    onHookToggleChange();
}

function addHookRow(data) {
    data = data || {};
    hookRowsData.push({
        fitur: data.fitur || '',
        className: data.className || '',
        methodName: data.methodName || '',
        type: data.type || 'Z',
        defaultValue: data.defaultValue != null ? String(data.defaultValue) : ''
    });
    renderHookRows();
}

function removeHookRow(idx) {
    hookRowsData.splice(idx, 1);
    renderHookRows();
}

function updateHookField(idx, field, value) {
    if (!hookRowsData[idx]) return;
    hookRowsData[idx][field] = value;
    syncHookHiddenInput();
}

function renderHookRows() {
    const container = document.getElementById('hookRowsContainer');
    if (!container) return;
    container.innerHTML = '';
    if (hookRowsData.length === 0) {
        container.innerHTML = '<div style="text-align:center;color:var(--text-muted);font-size:0.8rem;padding:10px;border:1px dashed rgba(255,255,255,0.1);border-radius:8px;">Belum ada hook.</div>';
        syncHookHiddenInput();
        return;
    }
    hookRowsData.forEach((h, i) => {
        const row = document.createElement('div');
        row.style.cssText = 'background:rgba(168,85,247,0.05);border:1px solid rgba(168,85,247,0.25);border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:6px;';
        const typeOptions = HOOK_TYPES.map(t => `<option value="${t.v}" ${h.type === t.v ? 'selected' : ''}>${t.label}</option>`).join('');
        row.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                <strong style="color:#a855f7;font-size:0.78rem;">Hook #${i + 1}</strong>
                <button type="button" onclick="removeHookRow(${i})" style="background:rgba(239,68,68,0.15);border:1px solid #ef4444;color:#ef4444;padding:2px 8px;border-radius:5px;font-size:0.72rem;cursor:pointer;">🗑️</button>
            </div>
            <input type="text" placeholder="Nama Fitur" value="${escapeHtml(h.fitur)}" oninput="updateHookField(${i}, 'fitur', this.value)" style="background:#020205;border:1px solid rgba(168,85,247,0.3);border-radius:6px;padding:7px 10px;color:#fff;font-size:0.82rem;">
            <input type="text" placeholder="Class" value="${escapeHtml(h.className)}" oninput="updateHookField(${i}, 'className', this.value)" style="background:#020205;border:1px solid rgba(168,85,247,0.3);border-radius:6px;padding:7px 10px;color:#fff;font-size:0.82rem;font-family:monospace;">
            <input type="text" placeholder="Method" value="${escapeHtml(h.methodName)}" oninput="updateHookField(${i}, 'methodName', this.value)" style="background:#020205;border:1px solid rgba(168,85,247,0.3);border-radius:6px;padding:7px 10px;color:#fff;font-size:0.82rem;font-family:monospace;">
            <select onchange="updateHookField(${i}, 'type', this.value)" style="background:#020205;border:1px solid rgba(168,85,247,0.3);border-radius:6px;padding:7px 10px;color:#fff;font-size:0.82rem;">${typeOptions}</select>
            <input type="text" placeholder="Default value" value="${escapeHtml(h.defaultValue)}" oninput="updateHookField(${i}, 'defaultValue', this.value)" style="background:#020205;border:1px solid rgba(168,85,247,0.3);border-radius:6px;padding:7px 10px;color:#fff;font-size:0.82rem;">
        `;
        container.appendChild(row);
    });
    syncHookHiddenInput();
}

function syncHookHiddenInput() {
    const el = document.getElementById('formApkHooks');
    if (el) el.value = JSON.stringify(hookRowsData);
}

function loadHooksIntoForm(hooks, enabled) {
    hookRowsData = Array.isArray(hooks) ? hooks.map(h => ({...h})) : [];
    renderHookRows();
    setHookEnabled(enabled === true);
}

/* ==================== DIALOG CONFIG (TOGGLE DI MODAL) ==================== */
function getDialogConfig(item) {
    if (!item || !item.dialogConfig) return {...DEFAULT_DIALOG_CONFIG};
    return {
        signCheck: item.dialogConfig.signCheck !== false,
        btnMode: item.dialogConfig.btnMode === true,
        crashLog: item.dialogConfig.crashLog === true,
        forceCloseOnUpdate: item.dialogConfig.forceCloseOnUpdate !== false
    };
}

function openDialogConfigPanel() {
    closeActiveOverlays();
    const container = document.getElementById('dialogConfigList');
    if (!container) return;
    container.innerHTML = '';
    const list = (typeof internalApksData !== 'undefined' && Array.isArray(internalApksData)) ? internalApksData : [];
    if (list.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:20px;">Belum ada APK terdaftar.</p>';
    } else {
        list.forEach(function(item, index) {
            var icon = item.imageUrl
                ? '<img src="'+item.imageUrl+'" onerror="this.style.display=\'none\';this.parentElement.textContent=\'📱\'">'
                : '📱';
            var row = document.createElement('div');
            row.className = 'config-app-row-h';
            row.setAttribute('onclick', 'openDialogConfigEdit(' + index + ')');
            row.innerHTML =
                '<div class="config-app-icon">'+icon+'</div>' +
                '<div class="config-app-info">' +
                    '<div class="config-app-name">'+(item.name||'No Name')+'</div>' +
                    '<div class="config-app-meta">v'+(item.version||'?')+' · Kode: '+(item.versionCode||'?')+' · '+(item.packageName||'-')+'</div>' +
                '</div>' +
                '<button class="config-app-settings-btn" title="Atur">⚙️</button>';
            container.appendChild(row);
        });
    }
    document.getElementById('globalOverlay').classList.add('active');
    document.getElementById('dialogConfigPanelModal').classList.add('active');
}

function setToggle(key, value, btnEl) {
    var pair = btnEl.closest('.toggle-pair');
    if (!pair) return;
    var btns = pair.querySelectorAll('.toggle-btn');
    btns[0].classList.remove('active-off', 'active-on');
    btns[1].classList.remove('active-off', 'active-on');
    if (value) {
        btns[0].classList.add('active-off');
        btns[1].classList.add('active-on');
    } else {
        btns[0].classList.add('active-off');
    }
    pair.setAttribute('data-value', value ? 'true' : 'false');
}

function openDialogConfigEdit(index) {
    var item = internalApksData[index];
    if (!item) return;
    var cfg = getDialogConfig(item);
    document.getElementById('dialogConfigEditIndex').value = index;
    document.getElementById('dialogConfigAppName').textContent = item.name || 'No Name';
    document.getElementById('dialogConfigAppVersion').textContent = 'v' + (item.version || '?');
    document.getElementById('dialogConfigAppPkg').textContent = item.packageName || '-';
    var iconFrame = document.getElementById('dialogConfigAppIcon');
    iconFrame.innerHTML = item.imageUrl
        ? '<img src="'+item.imageUrl+'" onerror="this.style.display=\'none\';this.parentElement.textContent=\'📱\'">'
        : '📱';
    ['signCheck', 'btnMode', 'crashLog', 'forceCloseOnUpdate'].forEach(function(key) {
        var pair = document.querySelector('.toggle-pair[data-key="' + key + '"]');
        if (!pair) return;
        var btns = pair.querySelectorAll('.toggle-btn');
        var isOn = !!cfg[key];
        btns[0].classList.remove('active-off', 'active-on');
        btns[1].classList.remove('active-off', 'active-on');
        if (isOn) {
            btns[0].classList.add('active-off');
            btns[1].classList.add('active-on');
        } else {
            btns[0].classList.add('active-off');
        }
        pair.setAttribute('data-value', isOn ? 'true' : 'false');
    });
    document.getElementById('dialogConfigVersion').value = item.version || '';
    document.getElementById('dialogConfigVersionCode').value = item.versionCode != null ? item.versionCode : '';
    var cl = item.changelog;
    document.getElementById('dialogConfigChangelog').value = Array.isArray(cl) ? cl.join('\n') : (cl || '');
    document.getElementById('dialogConfigPanelModal').classList.remove('active');
    document.getElementById('dialogConfigEditModal').classList.add('active');
}

function saveDialogConfigSettings() {
    var index = parseInt(document.getElementById('dialogConfigEditIndex').value, 10);
    if (isNaN(index) || !internalApksData[index]) { alert('APK tidak valid'); return; }
    var cfg = {};
    ['signCheck', 'btnMode', 'crashLog', 'forceCloseOnUpdate'].forEach(function(key) {
        var pair = document.querySelector('.toggle-pair[data-key="' + key + '"]');
        if (!pair) { cfg[key] = DEFAULT_DIALOG_CONFIG[key]; return; }
        var dv = pair.getAttribute('data-value');
        cfg[key] = dv === 'true';
    });
    var newVersion = document.getElementById('dialogConfigVersion').value.trim();
    var newVersionCodeRaw = document.getElementById('dialogConfigVersionCode').value.trim();
    var newVersionCode = newVersionCodeRaw === '' ? undefined : parseInt(newVersionCodeRaw, 10);
    var changelogRaw = document.getElementById('dialogConfigChangelog').value.trim();
    var newChangelog = changelogRaw ? changelogRaw.split(/\r?\n/).map(s => s.trim()).filter(Boolean) : [];
    internalApksData[index].dialogConfig = cfg;
    if (newVersion) internalApksData[index].version = newVersion;
    if (newVersionCode !== undefined && !isNaN(newVersionCode)) internalApksData[index].versionCode = newVersionCode;
    if (newChangelog.length) internalApksData[index].changelog = newChangelog;
    localStorage.setItem('mmk_local_apks', JSON.stringify(internalApksData));
    pushHistoryState();
    alert('✅ Konfigurasi & metadata "' + (internalApksData[index].name || 'APK') + '" tersimpan.');
    closeActiveOverlays();
    setTimeout(openDialogConfigPanel, 100);
}

/* ==================== FORM APK ==================== */
function openAddApkFormModal() {
    closeActiveOverlays();
    document.getElementById('formModalTitle').textContent = "Format Edit/Tambah App";
    document.getElementById('formEditIndex').value = "";
    ['formApkName','formApkVersion','formApkVersionName','formApkVersionCode','formApkPackageName','formApkChangelog','formApkSize','formApkDesc','formApkImg','formApkLink','formApkLinkArm64','formApkLinkArm32'].forEach(id => document.getElementById(id).value = "");
    loadHooksIntoForm([], false);
    const selectorRow = document.getElementById('existingApkSelectorRow');
    const selectEl = document.getElementById('formExistingApkSelect');
    selectorRow.style.setProperty('display', 'flex', 'important');
    selectEl.innerHTML = '<option value="">-- Buat Baru Dari Awal --</option>';
    internalApksData.forEach((item, index) => {
        const opt = document.createElement('option');
        opt.value = index;
        opt.textContent = `${item.name || 'Mod'} (${item.version || 'v?'})`;
        selectEl.appendChild(opt);
    });
    document.getElementById('globalOverlay').classList.add('active');
    document.getElementById('devApkFormModal').classList.add('active');
}

function handleLoadExistingApkData() {
    const selectedIndex = document.getElementById('formExistingApkSelect').value;
    if (selectedIndex === "") return;
    const targetData = internalApksData[parseInt(selectedIndex)];
    if (!targetData) return;
    document.getElementById('formApkName').value = targetData.name || "";
    document.getElementById('formApkVersion').value = targetData.version || "";
    document.getElementById('formApkVersionName').value = targetData.versionName || targetData.version || "";
    document.getElementById('formApkVersionCode').value = targetData.versionCode != null ? targetData.versionCode : "";
    document.getElementById('formApkPackageName').value = targetData.packageName || "";
    document.getElementById('formApkChangelog').value = Array.isArray(targetData.changelog) ? targetData.changelog.join("\n") : (targetData.changelog || "");
    document.getElementById('formApkCategory').value = targetData.category || "Aplikasi Mod";
    document.getElementById('formApkSize').value = targetData.size || "";
    document.getElementById('formApkAndroid').value = targetData.android || "Android 5+";
    document.getElementById('formApkDesc').value = targetData.description || "";
    document.getElementById('formApkImg').value = targetData.imageUrl || "";
    document.getElementById('formApkLink').value = targetData.downloadUrl || "";
    const links = targetData.links || {};
    document.getElementById('formApkLinkArm64').value = links.Arm64 || links.arm64 || "";
    document.getElementById('formApkLinkArm32').value = links.Arm32 || links.arm32 || "";
    const hasHooks = Array.isArray(targetData.hooks) && targetData.hooks.length > 0;
    loadHooksIntoForm(targetData.hooks || [], hasHooks && targetData.hookEnabled !== false);
}

function openEditApkFormModal(index) {
    closeActiveOverlays();
    const targetData = internalApksData[index];
    if (!targetData) return;
    document.getElementById('formModalTitle').textContent = "✏️ SUNTING DATA APK";
    document.getElementById('formEditIndex').value = index;
    document.getElementById('existingApkSelectorRow').style.setProperty('display', 'none', 'important');
    document.getElementById('formApkName').value = targetData.name || "";
    document.getElementById('formApkVersion').value = targetData.version || "";
    document.getElementById('formApkVersionName').value = targetData.versionName || targetData.version || "";
    document.getElementById('formApkVersionCode').value = targetData.versionCode != null ? targetData.versionCode : "";
    document.getElementById('formApkPackageName').value = targetData.packageName || "";
    document.getElementById('formApkChangelog').value = Array.isArray(targetData.changelog) ? targetData.changelog.join("\n") : (targetData.changelog || "");
    document.getElementById('formApkCategory').value = targetData.category || "Aplikasi Mod";
    document.getElementById('formApkSize').value = targetData.size || "";
    document.getElementById('formApkAndroid').value = targetData.android || "Android 5+";
    document.getElementById('formApkDesc').value = targetData.description || "";
    document.getElementById('formApkImg').value = targetData.imageUrl || "";
    document.getElementById('formApkLink').value = targetData.downloadUrl || "";
    const linksE = targetData.links || {};
    document.getElementById('formApkLinkArm64').value = linksE.Arm64 || linksE.arm64 || "";
    document.getElementById('formApkLinkArm32').value = linksE.Arm32 || linksE.arm32 || "";
    const hasHooks = Array.isArray(targetData.hooks) && targetData.hooks.length > 0;
    loadHooksIntoForm(targetData.hooks || [], hasHooks && targetData.hookEnabled !== false);
    document.getElementById('globalOverlay').classList.add('active');
    document.getElementById('devApkFormModal').classList.add('active');
}

function compareApkVersions(v1, v2) {
    if(!v1) v1 = "0"; if(!v2) v2 = "0";
    const c1 = v1.replace(/[^0-9.]/g, '').split('.').map(Number);
    const c2 = v2.replace(/[^0-9.]/g, '').split('.').map(Number);
    const len = Math.max(c1.length, c2.length);
    for (let i = 0; i < len; i++) {
        const a = c1[i] || 0, b = c2[i] || 0;
        if (a > b) return 1;
        if (a < b) return -1;
    }
    return 0;
}

function findApkClonesToRemove() {
    const groups = {};
    internalApksData.forEach(item => {
        const key = (item.name || '').trim().toLowerCase();
        if (!key) return;
        if (!groups[key]) groups[key] = [];
        groups[key].push(item);
    });
    const toRemove = [];
    Object.values(groups).forEach(group => {
        if (group.length < 2) return;
        let highest = group[0];
        group.forEach(item => { if (compareApkVersions(item.version, highest.version) > 0) highest = item; });
        group.forEach(item => { if (item !== highest && compareApkVersions(item.version, highest.version) < 0) toRemove.push(item); });
    });
    return toRemove;
}

function openClearCloneModal() {
    closeActiveOverlays();
    pendingCloneRemovals = findApkClonesToRemove();
    const container = document.getElementById('clearCloneListContainer');
    if (!container) return;
    container.innerHTML = "";
    if (pendingCloneRemovals.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:var(--text-muted); padding: 10px;">✅ Tidak ada apk duplikat.</p>`;
    } else {
        pendingCloneRemovals.forEach(item => {
            const row = document.createElement('div');
            row.style.cssText = "background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.3); border-radius: 8px; padding: 10px 12px; font-size:0.85rem; color:#fff;";
            row.innerHTML = `> <strong>${item.name}</strong> versi <span style="color:#f59e0b;">${item.version || '-'}</span> yang lebih rendah`;
            container.appendChild(row);
        });
    }
    document.getElementById('globalOverlay').classList.add('active');
    document.getElementById('clearCloneModal').classList.add('active');
}

function executeClearClone() {
    if (pendingCloneRemovals.length === 0) { closeActiveOverlays(); return; }
    internalApksData = internalApksData.filter(item => !pendingCloneRemovals.includes(item));
    localStorage.setItem('mmk_local_apks', JSON.stringify(internalApksData));
    pushHistoryState();
    const removedCount = pendingCloneRemovals.length;
    pendingCloneRemovals = [];
    closeActiveOverlays();
    renderGridCards();
    alert(`✅ Berhasil menghapus ${removedCount} apk clone.`);
}

function saveApkFormSubmission() {
    const name = document.getElementById('formApkName').value.trim();
    const version = document.getElementById('formApkVersion').value.trim();
    const versionName = (document.getElementById('formApkVersionName').value.trim() || version);
    const versionCodeRaw = document.getElementById('formApkVersionCode').value.trim();
    const versionCode = versionCodeRaw === "" ? undefined : parseInt(versionCodeRaw, 10);
    const packageName = document.getElementById('formApkPackageName').value.trim();
    const changelogRaw = document.getElementById('formApkChangelog').value.trim();
    const changelog = changelogRaw ? changelogRaw.split(/\r?\n/).map(s => s.trim()).filter(Boolean) : undefined;
    const category = document.getElementById('formApkCategory').value;
    const size = document.getElementById('formApkSize').value.trim();
    const android = document.getElementById('formApkAndroid').value;
    const description = document.getElementById('formApkDesc').value.trim();
    const imageUrl = document.getElementById('formApkImg').value.trim();
    const downloadUrl = document.getElementById('formApkLink').value.trim();
    const linkArm64 = document.getElementById('formApkLinkArm64').value.trim();
    const linkArm32 = document.getElementById('formApkLinkArm32').value.trim();
    const hookEnabled = document.getElementById('formApkHookEnabled').checked;
    let hooksParsed = [];
    try { hooksParsed = JSON.parse(document.getElementById('formApkHooks').value || '[]'); } catch(e) { hooksParsed = []; }
    hooksParsed = hooksParsed.filter(h => h.fitur && h.className && h.methodName);
    if (!name || !downloadUrl) { alert("Nama & Link wajib terisi!"); return; }
    if (packageName === "") { alert("packageName wajib diisi!"); return; }
    if (versionCodeRaw === "" || isNaN(versionCode)) { alert("versionCode wajib angka!"); return; }
    if (hookEnabled && hooksParsed.length === 0) { alert("⚠️ Hook System AKTIF tapi belum ada hook valid."); return; }
    const editIndex = document.getElementById('formEditIndex').value;
    const payload = { name, version, versionName, versionCode, packageName, category, size, android, description, imageUrl, downloadUrl };
    if (changelog && changelog.length) payload.changelog = changelog;
    if (linkArm64 || linkArm32) {
        payload.links = {};
        if (linkArm64) payload.links.Arm64 = linkArm64;
        if (linkArm32) payload.links.Arm32 = linkArm32;
        payload.multiDownload = true;
    }
    if (hookEnabled && hooksParsed.length > 0) {
        payload.hooks = hooksParsed;
        payload.hookEnabled = true;
    }
    if (editIndex !== "") {
        const existing = internalApksData[parseInt(editIndex)];
        if (existing && existing.dialogConfig) payload.dialogConfig = existing.dialogConfig;
        internalApksData[parseInt(editIndex)] = payload;
    } else {
        const existingIndex = internalApksData.findIndex(apk => apk.name.trim().toLowerCase() === name.toLowerCase());
        if (existingIndex !== -1) {
            const existingApk = internalApksData[existingIndex];
            if (compareApkVersions(version, existingApk.version) > 0) {
                internalApksData.splice(existingIndex, 1);
                alert(`⚠️ Versi lama "${name}" (v${existingApk.version}) otomatis dihapus.`);
            }
        }
        internalApksData.unshift(payload);
    }
    localStorage.setItem('mmk_local_apks', JSON.stringify(internalApksData));
    pushHistoryState();
    closeActiveOverlays();
    renderGridCards();
}

function processImportApks(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            let content = e.target.result;
            let jsonStr = content.substring(content.indexOf('=') + 1, content.lastIndexOf(';')).trim();
            let parsedData = JSON.parse(jsonStr);
            if (Array.isArray(parsedData)) {
                internalApksData = parsedData;
                localStorage.setItem('mmk_local_apks', JSON.stringify(internalApksData));
                pushHistoryState();
                renderGridCards();
                alert("✅ Berkas apks.js berhasil diimpor!");
                closeActiveOverlays();
            } else alert("❌ Format tidak valid.");
        } catch (err) { alert("❌ Gagal membaca file!"); }
        input.value = "";
    };
    reader.readAsText(file);
}

function processImportvip(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            let content = e.target.result;
            let jsonStr = content.substring(content.indexOf('=') + 1, content.lastIndexOf(';')).trim();
            let parsedData = JSON.parse(jsonStr);
            if (typeof parsedData === 'object' && !Array.isArray(parsedData)) {
                for (let key in execAppsDatabase) delete execAppsDatabase[key];
                for (let key in parsedData) execAppsDatabase[key] = parsedData[key];
                alert("✅ Berkas vip.js berhasil diimpor!");
                closeActiveOverlays();
            } else alert("❌ Format tidak valid.");
        } catch (err) { alert("❌ Gagal membaca file!"); }
        input.value = "";
    };
    reader.readAsText(file);
}

function isDirectHostUrl(url) {
    if (!url) return false;
    const u = String(url).toLowerCase();
    return u.includes('mediafire.com') || u.includes('drive.google.com') || u.includes('.apk');
}

function isSafelinkUrl(url) {
    if (!url) return false;
    const u = String(url).toLowerCase();
    return u.includes('adsafelink') || u.includes('adlinksumo') || u.includes('safefileku') || u.includes('bicolink') || u.includes('linkvertise');
}

function resolveApkDownloadForRole(item, role) {
    role = (role || 'GUEST').toUpperCase();
    const privileged = (role === 'EXECUTIVE' || role === 'DEVELOPER' || role === 'ADMIN');
    const links = item.links || {};
    const mediafire = item.directMediafire || links.Mediafire || links.mediafire || null;
    const arm = links.Arm64 || links.Arm32 || null;
    const primary = item.downloadUrl || '';
    if (privileged) {
        if (mediafire) return mediafire;
        if (arm && isDirectHostUrl(arm)) return arm;
        if (primary && isDirectHostUrl(primary) && !isSafelinkUrl(primary)) return primary;
        return mediafire || arm || primary || '#';
    }
    return primary || mediafire || arm || '#';
}

function apkItemToDialogUpdatePayload(item, role) {
    role = role || 'GUEST';
    const versionName = item.versionName || item.version || '1.0.0';
    const versionCode = (typeof item.versionCode === 'number') ? item.versionCode : (parseInt(String(item.versionCode || '0').replace(/\D/g, ''), 10) || 0);
    const mainUrl = resolveApkDownloadForRole(item, role);
    const links = item.links || {};
    const update_urls = [];
    const mf = item.directMediafire || links.Mediafire || links.mediafire;
    if (mf) update_urls.push({ name: 'Mediafire', url: (role === 'GUEST' && item.downloadUrl && isSafelinkUrl(item.downloadUrl)) ? item.downloadUrl : mf });
    else if (mainUrl && String(mainUrl).toLowerCase().includes('mediafire')) update_urls.push({ name: 'Mediafire', url: mainUrl });
    if (links.Telegram || item.telegramUrl) update_urls.push({ name: 'Telegram', url: links.Telegram || item.telegramUrl });
    if (links.GDrive || links.gdrive) update_urls.push({ name: 'GDrive', url: links.GDrive || links.gdrive });
    if (links.Arm64) update_urls.push({ name: 'Arm64', url: links.Arm64 });
    if (links.Arm32) update_urls.push({ name: 'Arm32', url: links.Arm32 });
    if (!update_urls.length && mainUrl) update_urls.push({ name: 'Download', url: mainUrl });
    return {
        version: versionName,
        versionName: versionName,
        versionCode: versionCode,
        packageName: item.packageName || '',
        title: 'Pembaruan tersedia',
        subtitle: (item.name || 'App') + ' — versi baru',
        update_url: mainUrl,
        show_close_button: false,
        update_urls: update_urls,
        dialogConfig: getDialogConfig(item),
        changelog: Array.isArray(item.changelog) ? item.changelog : (item.changelog ? [String(item.changelog)] : [
            item.description ? String(item.description).slice(0, 160) : 'Perbarui ke versi terbaru'
        ])
    };
}

function openDialogUpdateExportModal() {
    closeActiveOverlays();
    const sel = document.getElementById('dialogUpdateApkSelect');
    if (!sel) { alert('Modal belum termuat.'); return; }
    sel.innerHTML = '';
    const data = (typeof internalApksData !== 'undefined' && Array.isArray(internalApksData)) ? internalApksData : [];
    if (!data.length) {
        sel.innerHTML = '<option value="">— tidak ada data —</option>';
    } else {
        data.forEach((item, idx) => {
            const opt = document.createElement('option');
            opt.value = String(idx);
            opt.textContent = (item.name || 'APK') + ' v' + (item.version || '?') + (item.packageName ? ' · ' + item.packageName : '');
            sel.appendChild(opt);
        });
    }
    const roleSel = document.getElementById('dialogUpdateRoleSelect');
    const activeRole = localStorage.getItem('mmk_sys_role') || 'GUEST';
    if (roleSel && ['GUEST','EXECUTIVE','DEVELOPER'].includes(activeRole)) roleSel.value = activeRole;
    previewDialogUpdatePayload();
    document.getElementById('globalOverlay').classList.add('active');
    document.getElementById('dialogUpdateExportModal').classList.add('active');
}

function previewDialogUpdatePayload() {
    const sel = document.getElementById('dialogUpdateApkSelect');
    const roleSel = document.getElementById('dialogUpdateRoleSelect');
    const box = document.getElementById('dialogUpdatePreview');
    if (!sel || !box) return;
    const idx = parseInt(sel.value, 10);
    const data = (typeof internalApksData !== 'undefined' && Array.isArray(internalApksData)) ? internalApksData : [];
    if (isNaN(idx) || !data[idx]) { box.value = '{\n  "error": "Pilih APK valid"\n}'; return; }
    const role = roleSel ? roleSel.value : 'GUEST';
    box.value = JSON.stringify(apkItemToDialogUpdatePayload(data[idx], role), null, 2);
}

function copyDialogUpdatePayload() {
    const box = document.getElementById('dialogUpdatePreview');
    if (!box || !box.value) return;
    box.select();
    try { document.execCommand('copy'); navigator.clipboard && navigator.clipboard.writeText(box.value); } catch (e) {}
    alert('📋 dialog_update JSON disalin.');
}

function downloadDialogUpdateFile() {
    const box = document.getElementById('dialogUpdatePreview');
    if (!box || !box.value) return;
    const blob = new Blob([box.value], { type: 'application/json;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'dialog_update.json';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    alert('💾 File dialog_update.json diunduh.');
}

function exportCurrentApksFile(mode) {
    closeActiveOverlays();
    const textContainer = document.getElementById('exportTextareaContainer');
    const mainTitle = document.getElementById('exportModalMainTitle');
    if(!textContainer) return;
    if (mode === 'apksOnly') {
        mainTitle.textContent = "💾 SALIN DATA APKS.JS";
        textContainer.value = "const apks = " + JSON.stringify(internalApksData, null, 4) + ";";
    } else if (mode === 'exportvip') {
        mainTitle.textContent = "⚡ SALIN DATA vip.JS";
        textContainer.value = "const execAppsDatabase = " + JSON.stringify(execAppsDatabase, null, 4) + ";";
    }
    document.getElementById('globalOverlay').classList.add('active');
    document.getElementById('devDatabaseExportModal').classList.add('active');
}

function copyExportedTextToClipboard() {
    const textContainer = document.getElementById('exportTextareaContainer');
    if(!textContainer) return;
    textContainer.select();
    document.execCommand('copy');
    alert("📋 Berhasil disalin!");
    closeActiveOverlays();
}

function showExecAppDetails(key) {
    if (typeof execAppsDatabase === 'undefined') { alert("vip.js tidak termuat."); return; }
    const appData = execAppsDatabase[key];
    if (!appData) return;
    const activeRole = localStorage.getItem('mmk_sys_role') || 'GUEST';
    let devActions = activeRole === 'DEVELOPER' ? `<div style="display: flex; gap: 10px; margin-left: auto;"><button onclick="deletevipApp('${key}')" style="background:transparent; border:none; cursor:pointer; font-size:1.2rem;" title="Hapus">🗑️</button></div>` : '';
    const iconFrame = document.getElementById('execModalIcon');
    if(iconFrame) iconFrame.innerHTML = `<img src="${appData.imageUrl || ''}" alt="${appData.name || ''}" onerror="this.style.display='none'; this.parentElement.innerHTML='🛸';">`;
    const nameContainer = document.getElementById('execModalName');
    nameContainer.innerHTML = `<div style="display: flex; align-items: center; width: 100%;"><span>${appData.name || 'Aplikasi'}</span>${devActions}</div>`;
    document.getElementById('execModalVersion').textContent = `Versi: ${appData.version || '1.0'}`;
    const badgeFrame = document.getElementById('execModalBadges');
    if(badgeFrame) badgeFrame.innerHTML = `<span class="apk-badge">💾 ${appData.size || '10MB'}</span><span class="apk-badge">🤖 ${appData.android || '5.0+'}</span>`;
    document.getElementById('execModalDownloadBtn').href = appData.downloadUrl || '#';
    const featuresContainer = document.getElementById('execModalFeatures');
    if(featuresContainer) {
        featuresContainer.innerHTML = "";
        if(appData.features) {
            appData.features.forEach(feat => {
                const item = document.createElement('div');
                item.className = 'exec-feature-item';
                item.innerHTML = `<span style="color:var(--exec-color)">⚡</span> <span>${feat}</span>`;
                featuresContainer.appendChild(item);
            });
        }
    }
    closeActiveOverlays();
    document.getElementById('globalOverlay').classList.add('active');
    document.getElementById('execAppDetailsModal').classList.add('active');
}

function deletevipApp(key) {
    if (typeof execAppsDatabase === 'undefined') return;
    if (!confirm(`Hapus "${key}" dari vip.js?`)) return;
    delete execAppsDatabase[key];
    closeActiveOverlays();
    alert('✅ Entry vip.js dihapus.');
}

function handleModderProfileModal() {
    closeActiveOverlays();
    document.getElementById('globalOverlay').classList.add('active');
    document.getElementById('modderProfileModal').classList.add('active');
}

function closeActiveOverlays() {
    ['sidebarMenu','authGateModal','modderProfileModal','execAppDetailsModal','devApkFormModal','devDatabaseExportModal','devReorderModal','requestModModal','adminRequestListModal','searchPopover','dialogUpdateExportModal','dialogConfigPanelModal','dialogConfigEditModal','clearCloneModal','globalOverlay'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
    });
}

function applyCategoryFilter(catName) {
    const items = document.querySelectorAll('.apk-card');
    const alertEmpty = document.getElementById('searchEmptyAlert');
    let totalMatch = 0;
    items.forEach(box => {
        const specCat = box.getAttribute('data-target-cat');
        if (catName === 'all' || specCat === catName) {
            box.classList.remove('hidden');
            totalMatch++;
        } else {
            box.classList.add('hidden');
        }
    });
    if(alertEmpty) alertEmpty.style.display = totalMatch > 0 ? 'none' : 'block';
    closeActiveOverlays();
}

function executeApkSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const grid = document.getElementById('apkDisplayGrid');
    const alertEmpty = document.getElementById('searchEmptyAlert');
    const paginationContainer = document.getElementById('loadMoreContainer');
    if (query.trim() === '') { renderGridCards(); return; }
    if (!grid) return;
    grid.innerHTML = "";
    let success = false;
    const activeRole = localStorage.getItem('mmk_sys_role') || 'GUEST';
    internalApksData.forEach((item, index) => {
        const titleText = (item.name || '').toLowerCase();
        if (titleText.includes(query)) {
            success = true;
            const card = document.createElement('div');
            card.className = 'apk-card';
            card.setAttribute('data-target-cat', item.category);
            card.setAttribute('data-target-droid', item.android);
            const defaultIcon = getCardDefaultIcon(item);
            card.innerHTML = `
                ${buildDevControlBox(index, activeRole)}
                <div class="apk-top-flex">
                    <div class="apk-icon-frame">
                        <img src="${item.imageUrl || ''}" alt="${item.name || ''}" onerror="this.style.display='none'; this.parentElement.innerHTML='${defaultIcon}';">
                    </div>
                    <div class="apk-main-info">
                        <span class="apk-title">${item.name || 'No Name'}</span>
                        <span class="apk-version">${item.version || ''}</span>
                        <div class="apk-badge-row">${buildBadgeRow(item)}</div>
                    </div>
                </div>
                <div class="apk-desc-area">${item.description || 'Tidak ada deskripsi.'}</div>
                <div class="card-action-row">
                    <a href="${item.downloadUrl || '#'}" target="_blank" class="download-action-btn"> Download </a>
                    <button class="share-action-btn" title="Bagikan" onclick="shareApkCard(${index})">🔗</button>
                </div>
            `;
            grid.appendChild(card);
        }
    });
    if (alertEmpty) alertEmpty.style.display = success ? 'none' : 'block';
    if (paginationContainer) paginationContainer.style.display = 'none';
}
