const rahasiaHTML = `
<style>
.sidebar-device-id{display:inline-flex;align-items:center;gap:6px;font-size:0.65rem;font-weight:800;color:var(--text-muted);font-family:'Courier New',monospace;letter-spacing:2px;background:rgba(59,130,246,0.05);border:1px dashed rgba(59,130,246,0.35);padding:4px 12px;border-radius:6px;margin-top:6px;cursor:pointer;transition:all 0.2s;user-select:none}
.sidebar-device-id:hover{border-color:var(--accent);color:var(--accent);background:rgba(59,130,246,0.12);box-shadow:0 0 10px var(--accent-glow)}
.sidebar-device-id::before{content:'🆔';font-size:0.75rem}
.sidebar-device-id:active{transform:scale(0.96)}
.sidebar-device-id.copied{border-color:#10b981;color:#10b981;background:rgba(16,185,129,0.08)}
.theme-section-title{font-size:0.72rem;color:#3b82f6;text-transform:uppercase;letter-spacing:0.5px;font-weight:700;padding-top:12px;margin-top:12px;border-top:1px dashed rgba(59,130,246,0.3)}
.theme-section-title:first-child{padding-top:0;margin-top:0;border-top:none}
.color-input-row{display:flex;gap:6px;align-items:center}
.color-input-row input[type=color]{width:40px;height:38px;padding:2px;border-radius:6px;border:1px solid rgba(59,130,246,0.3);background:transparent;cursor:pointer}
.color-input-row input[type=text]{flex:1}
.theme-tab-bar{display:flex;gap:4px;margin-bottom:14px;border-bottom:1px solid var(--border);padding-bottom:10px}
.theme-tab-bar button{flex:1;padding:8px 12px;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:8px;color:var(--text-muted);font-size:0.78rem;font-weight:700;cursor:pointer;transition:all 0.2s}
.theme-tab-bar button.active{background:rgba(59,130,246,0.15);border-color:#3b82f6;color:#3b82f6}
</style>

<div class="navbar">
  <div class="navbar-left"><button class="menu-toggle" onclick="handleSidebarDisplay()">☰</button></div>
  <div class="logo-box"><img class="logo" src="https://diverse-aqua-iq7wghij.edgeone.app/M.png" alt="Logo MMK"><span class="main-title">MMK | MODS</span></div>
  <div class="navbar-right">
    <div id="devUndoRedoControls" style="display: none; gap: 8px; margin-right: 15px; align-items: center;">
      <button class="dev-action-badge-btn edit-btn" style="width: 32px; height: 32px; font-weight: bold;" title="Undo" onclick="undoDeveloperAction()">←</button>
      <button class="dev-action-badge-btn edit-btn" style="width: 32px; height: 32px; font-weight: bold;" title="Redo" onclick="redoDeveloperAction()">→</button>
    </div>
    <button class="search-trigger-btn" onclick="handleSearchToggle()">🔍</button>
    <div class="search-popover" id="searchPopover"><input type="text" id="searchInput" placeholder="Cari Mod Game..." onkeyup="executeApkSearch()"></div>
  </div>
</div>

<div class="sidebar" id="sidebarMenu">
  <span class="sidebar-close" onclick="handleSidebarDisplay()">×</span>
  <div class="sidebar-brand-area">
    <img class="sidebar-community-logo" src="https://diverse-aqua-iq7wghij.edgeone.app/M.png" alt="MMK">
    <div class="sidebar-brand-title">MMK | MODS</div>
    <div id="userSignBadge" class="sidebar-sign-text">Guest Mode</div>
    <div id="userDeviceId" class="sidebar-device-id" onclick="copyDeviceId()" title="Tap untuk copy">--------</div>
  </div>
  <div class="cyber-auth-container" style="margin-bottom: 22px;"><button id="authTriggerBtn" class="cyber-auth-btn" onclick="handleAuthModalDisplay()">⚙️ Sign In</button></div>
  <div id="devRoleSwitcher" style="display:none; margin-bottom: 22px; padding: 10px; border: 1px dashed rgba(244,63,94,0.3); border-radius: 10px; background: rgba(244,63,94,0.05);">
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
  <ul class="sidebar-menu-list"><li><div class="sidebar-item-btn" style="border-color: #0ea5e9; background: rgba(14, 165, 233, 0.1);" onclick="openRequestModModal()">Request Mod Aplikasi</div></li></ul>
  <div class="sidebar-divider dev-only-block"></div>
  <div class="sidebar-label dev-only-block" style="color: var(--dev-color);">Dev Full Database Tool</div>
  <ul class="sidebar-menu-list dev-only-block">
    <li><div class="sidebar-item-btn" style="border-color: #fbbf24; background: rgba(251,191,36,0.1);" onclick="openThemeEditor()">🎨 Dialog Theme</div></li>
    <li><div class="sidebar-item-btn" style="border-color: #3b82f6; background: rgba(59,130,246,0.12);" onclick="openDialogConfigPanel()">⚙️ Configuration Dialog</div></li>
    <li><div class="sidebar-item-btn" style="border-color: rgba(244,63,94,0.3); background: rgba(244,63,94,0.05);" onclick="exportCurrentApksFile('apksOnly')">💾 Ekspor apks.js</div></li>
    <li><div class="sidebar-item-btn" style="border-color: rgba(244,63,94,0.3); background: rgba(244,63,94,0.05);" onclick="document.getElementById('importApksFile').click()">📥 Impor apks.js</div></li>
    <li style="margin-top: 10px;"><div class="sidebar-item-btn" style="border-color: #a855f7; background: rgba(168,85,247,0.1);" onclick="openAddExecutiveMemberModal()">👑 Add Executive Member</div></li>
    <li><div class="sidebar-item-btn" style="border-color: #a855f7; background: rgba(168,85,247,0.1);" onclick="openListMemberModal()">📋 List Member</div></li>
    <li><div class="sidebar-item-btn" style="border-color: #eab308; background: rgba(234,179,8,0.1);" onclick="exportUserDB()">📤 Ekspor DB User</div></li>
    <li><div class="sidebar-item-btn" style="border-color: #eab308; background: rgba(234,179,8,0.1);" onclick="document.getElementById('importUserDBFile').click()">📥 Impor DB User</div></li>
    <li style="margin-top: 10px;"><div class="sidebar-item-btn" style="border-color: #f59e0b; background: rgba(245,158,11,0.1);" onclick="openClearCloneModal()">🧹 Clear Clone</div></li>
  </ul>
  <input type="file" id="importApksFile" accept=".js" style="display:none" onchange="processImportApks(this)">
  <input type="file" id="importUserDBFile" accept=".js,.json" style="display:none" onchange="importUserDB(this)">
  <div class="sidebar-divider"></div>
  <div class="sidebar-label">𝕁𝕆𝕀ℕ 𝕄𝕐 ℂ𝕆𝕄𝕄𝕌ℕ𝕀𝕋𝕐</div>
  <ul class="sidebar-menu-list">
    <li><a class="sidebar-item-btn" href="https://chat.whatsapp.com/LDzlBOXR3I12Rb79oy5TFJ" target="_blank">MrKhenz - Official</a></li>
    <li><a class="sidebar-item-btn" href="https://whatsapp.com/channel/0029Vb7vQrL1yT22MFrBrR42" target="_blank">MMK | Saluran 1</a></li>
    <li><a class="sidebar-item-btn" href="https://whatsapp.com/channel/0029Vb7i2omLNSa3VM8Chc1A" target="_blank">MMK | Saluran 2</a></li>
  </ul>
</div>

<div class="overlay-mask" id="globalOverlay" onclick="closeActiveOverlays()"></div>

<div class="modal-box" id="authGateModal">
  <span class="modal-close-btn" onclick="closeActiveOverlays()">×</span>
  <h3 style="margin-bottom: 10px; color:#fff;">🛡️ SIGN IN</h3>
  <div id="loginFormState"><input type="password" id="devKeyInput" style="background:#020205; border:1px solid var(--border); border-radius:8px; padding:12px; color:#fff; width:100%; margin-bottom:15px; text-align:center; letter-spacing:4px; outline:none;" placeholder=" ✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏ "><button class="download-action-btn" onclick="processAuthVerification()">VERIFIKASI AKSES</button></div>
  <div id="logoutFormState" style="display:none; text-align:center;"><p id="authActiveModeText" style="color:var(--accent); margin-bottom:20px; font-size:0.9rem; font-weight:bold;"></p><button class="download-action-btn" style="background:linear-gradient(135deg, #ef4444, #991b1b)" onclick="processAuthLogout()">LOGOUT</button></div>
</div>

<div class="modal-box dev-panel-modal" id="themeEditorModal" style="max-height:92vh;overflow-y:auto;width:95%;max-width:600px;">
  <span class="modal-close-btn" onclick="closeActiveOverlays()">×</span>
  <h3 style="margin-bottom:14px;color:#fbbf24;font-size:1.15rem;border-bottom:1px solid rgba(251,191,36,0.3);padding-bottom:10px;">🎨 Dialog Theme Editor</h3>
  <div class="theme-tab-bar">
    <button id="tabSimple" class="active" onclick="switchThemeTab('simple')">📝 Simple</button>
    <button id="tabJson" onclick="switchThemeTab('json')">🔧 JSON (Advanced)</button>
  </div>
  
  <div id="themeSimpleTab">
    <div class="theme-section-title">🎨 Branding</div>
    <div class="form-group" style="margin-bottom:10px;"><label>App Title</label><input type="text" id="thAppTitle" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;"></div>
    <div class="form-group" style="margin-bottom:10px;"><label>Logo URL</label><input type="text" id="thLogoUrl" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div>
    
    <div class="theme-section-title">🔗 Links</div>
    <div class="form-group" style="margin-bottom:10px;"><label>Join Channel URL</label><input type="text" id="thJoinUrl" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div>
    <div class="form-group" style="margin-bottom:10px;"><label>Download Official URL</label><input type="text" id="thDownloadUrl" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div>
    
    <div class="theme-section-title">🔤 Fonts</div>
    <div class="form-group" style="margin-bottom:10px;"><label>Font Family (Main)</label><input type="text" id="thFontMain" placeholder="Inter" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;"></div>
    <div class="form-group" style="margin-bottom:10px;"><label>Google Fonts URL</label><input type="text" id="thGoogleFontsUrl" placeholder="https://fonts.googleapis.com/css2?..." style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;font-size:0.75rem;"></div>
    
    <div class="theme-section-title">🎨 Colors</div>
    <div class="form-group" style="margin-bottom:10px;"><label>Background</label><div class="color-input-row"><input type="color" id="thColorBg"><input type="text" id="thColorBgText" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div></div>
    <div class="form-group" style="margin-bottom:10px;"><label>Card</label><div class="color-input-row"><input type="color" id="thColorCard"><input type="text" id="thColorCardText" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div></div>
    <div class="form-group" style="margin-bottom:10px;"><label>Accent (Primary)</label><div class="color-input-row"><input type="color" id="thColorAccent"><input type="text" id="thColorAccentText" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div></div>
    <div class="form-group" style="margin-bottom:10px;"><label>Danger</label><div class="color-input-row"><input type="color" id="thColorDanger"><input type="text" id="thColorDangerText" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div></div>
    <div class="form-group" style="margin-bottom:10px;"><label>Success</label><div class="color-input-row"><input type="color" id="thColorSuccess"><input type="text" id="thColorSuccessText" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div></div>
    <div class="form-group" style="margin-bottom:10px;"><label>Warning</label><div class="color-input-row"><input type="color" id="thColorWarning"><input type="text" id="thColorWarningText" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div></div>
    <div class="form-group" style="margin-bottom:10px;"><label>Hook (Purple)</label><div class="color-input-row"><input type="color" id="thColorHook"><input type="text" id="thColorHookText" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div></div>
    <div class="form-group" style="margin-bottom:10px;"><label>Gold (Premium)</label><div class="color-input-row"><input type="color" id="thColorGold"><input type="text" id="thColorGoldText" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div></div>
    
    <div style="padding:10px;background:rgba(59,130,246,0.05);border:1px dashed rgba(59,130,246,0.3);border-radius:8px;margin-top:14px;font-size:0.75rem;color:var(--text-muted);line-height:1.5;">
      ℹ️ Untuk ubah <b>semua teks</b> (title, button, warning, dll) → tab <b>JSON (Advanced)</b>
    </div>
  </div>
  
  <div id="themeJsonTab" style="display:none;">
    <p style="font-size:0.75rem;color:var(--text-muted);margin-bottom:10px;line-height:1.5;">Edit JSON lengkap untuk semua teks (title, button, warning, dll). Gunakan <code style="background:rgba(0,0,0,0.5);padding:2px 6px;border-radius:4px;">{version}</code> untuk placeholder versi APK.</p>
    <textarea id="themeJsonTextarea" rows="20" style="width:100%;font-family:'Courier New',monospace;font-size:0.72rem;color:#67e8f9;background:#010208;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px;line-height:1.4;"></textarea>
    <button class="download-action-btn" style="margin-top:10px;background:linear-gradient(135deg,#fbbf24,#d97706);" onclick="resetThemeDefaults()">↺ Reset ke Default</button>
  </div>
  
  <div class="form-btn-row" style="margin-top:20px;">
    <button class="download-action-btn" style="background:#334155;" onclick="closeActiveOverlays()">BATAL</button>
    <button class="download-action-btn" style="background:linear-gradient(135deg,#fbbf24,#d97706);" onclick="saveThemeSettings()">💾 SIMPAN</button>
  </div>
</div>

<div class="modal-box dev-panel-modal" id="devApkFormModal">
  <span class="modal-close-btn" onclick="closeActiveOverlays()">×</span>
  <h3 id="formModalTitle" style="margin-bottom: 15px; color:#fff; font-size: 1.15rem; border-bottom: 1px solid rgba(244, 63, 94, 0.2); padding-bottom: 10px;">➕</h3>
  <input type="hidden" id="formEditIndex" value="">
  <div class="form-mobile-vertical-stack">
    <div class="form-group" id="existingApkSelectorRow"><label style="color: var(--accent);">Salin Dari APK Yang Sudah Ada</label><select id="formExistingApkSelect" onchange="handleLoadExistingApkData()"><option value="">-- Buat Baru Dari Awal --</option></select></div>
    <div class="form-group"><label>Nama APK</label><input type="text" id="formApkName"></div>
    <div class="form-group"><label>Versi (tampil)</label><input type="text" id="formApkVersion" placeholder="2.5.4"></div>
    <div class="form-group"><label>versionName</label><input type="text" id="formApkVersionName" placeholder="2.5.4 (opsional)"></div>
    <div class="form-group"><label>versionCode (angka)</label><input type="number" id="formApkVersionCode" min="1" placeholder="25302"></div>
    <div class="form-group"><label>packageName</label><input type="text" id="formApkPackageName" placeholder="com.example.app"></div>
    <div class="form-group"><label>Changelog (satu baris per item)</label><textarea id="formApkChangelog" rows="2"></textarea></div>
    <div class="form-group"><label>Link Arm64 (direct/premium)</label><input type="text" id="formApkLinkArm64"></div>
    <div class="form-group"><label>Link Arm32 (direct/premium)</label><input type="text" id="formApkLinkArm32"></div>
    <div class="form-group"><label>Kategori</label><select id="formApkCategory"><option value="Aplikasi Mod">Aplikasi Mod</option><option value="Games Mod">Games Mod</option><option value="Streaming">Streaming</option><option value="Music">Music</option><option value="Tools">Tools</option><option value="Editor">Editor</option></select></div>
    <div class="form-group"><label>Ukuran Size</label><input type="text" id="formApkSize"></div>
    <div class="form-group"><label>Sistem Android</label><select id="formApkAndroid"><option value="Android 5+">Android 5+</option><option value="Android 6+">Android 6+</option><option value="Android 7+">Android 7+</option><option value="Android 8+">Android 8+</option><option value="Android 9+">Android 9+</option><option value="Android 10+">Android 10+</option><option value="Android 11+">Android 11+</option><option value="Android 12+">Android 12+</option><option value="Android 13+">Android 13+</option><option value="Android 14+">Android 14+</option><option value="Android 15+">Android 15+</option></select></div>
    <div class="form-group"><label>Deskripsi Fitur</label><textarea id="formApkDesc" rows="3"></textarea></div>
    <div class="form-group"><label>URL Gambar / Ikon APK</label><div class="pena-upload-wrapper"><input type="text" id="formApkImg" placeholder="https://..."><button class="action-trigger-btn" style="background: rgba(14, 165, 233, 0.15); border-color: #0ea5e9;" onclick="copyFieldValue('formApkImg')">📄 COPY</button><button class="action-trigger-btn" onclick="pasteFieldValue('formApkImg')">📋 PASTE</button></div></div>
    <div class="form-group"><label>URL Download Shorturl (Update V1)</label><div class="pena-upload-wrapper"><input type="text" id="formApkLink" placeholder="https://adssafelink/..."><button class="action-trigger-btn" style="background: rgba(14, 165, 233, 0.15); border-color: #0ea5e9;" onclick="copyFieldValue('formApkLink')">📄 COPY</button><button class="action-trigger-btn" style="background: rgba(168, 85, 247, 0.15); border-color: #a855f7;" onclick="pasteFieldValue('formApkLink')">📋 PASTE</button></div></div>
    <div class="form-group" style="margin-top: 10px; border-top: 1px dashed rgba(168,85,247,0.35); padding-top: 14px;">
      <label style="color: #a855f7; display: flex; align-items: center; justify-content: space-between; gap: 10px; cursor: pointer; user-select: none;">
        <span style="display: flex; align-items: center; gap: 8px;"><input type="checkbox" id="formApkHookEnabled" onchange="onHookToggleChange()" style="width: 18px; height: 18px; cursor: pointer; accent-color: #a855f7;"><span>⚡ AKTIFKAN HOOK SYSTEM</span></span>
        <span id="hookStatusBadge" style="font-size: 0.7rem; padding: 2px 8px; border-radius: 6px; background: rgba(100,116,139,0.2); color: #64748b; border: 1px solid rgba(100,116,139,0.4);">NONAKTIF</span>
      </label>
    </div>
    <div id="hookBuilderSection" style="display: none;">
      <div class="form-group">
        <div style="display: flex; justify-content: flex-end; margin-bottom: 6px;"><button type="button" class="action-trigger-btn" style="padding: 4px 10px; font-size: 0.72rem; background: rgba(168,85,247,0.15); border-color: #a855f7;" onclick="addHookRow()">+ TAMBAH HOOK</button></div>
        <div id="hookRowsContainer" style="display: flex; flex-direction: column; gap: 8px;"></div>
        <input type="hidden" id="formApkHooks" value="[]">
      </div>
    </div>
  </div>
  <div class="form-btn-row"><button class="download-action-btn" style="background:#334155;" onclick="closeActiveOverlays()">CANCEL</button><button class="download-action-btn" style="background:linear-gradient(135deg, var(--dev-color) 0%, #991b1b 100%);" onclick="saveApkFormSubmission()">UPLOAD</button></div>
</div>

<div class="modal-box dev-panel-modal" id="dialogConfigPanelModal" style="max-height:90vh;overflow-y:auto;width:95%;max-width:680px;">
  <span class="modal-close-btn" onclick="closeActiveOverlays()">×</span>
  <h3 style="margin-bottom:14px;color:#fff;font-size:1.15rem;border-bottom:1px solid rgba(59,130,246,0.3);padding-bottom:10px;">⚙️ Configuration Dialog</h3>
  <div class="form-group" style="margin-bottom:14px;"><input type="text" id="dialogConfigSearch" placeholder="🔍 Cari APK..." oninput="renderDialogConfigList()" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;"></div>
  <div id="dialogConfigList" style="display:flex;flex-direction:column;gap:10px;"></div>
</div>

<div class="modal-box dev-panel-modal" id="dialogConfigEditModal" style="max-height:92vh;overflow-y:auto;width:95%;max-width:560px;">
  <span class="modal-close-btn" onclick="closeActiveOverlays()">×</span>
  <input type="hidden" id="dialogConfigEditIndex" value="">
  <h3 style="margin-bottom:14px;color:#fff;font-size:1.15rem;border-bottom:1px solid rgba(59,130,246,0.3);padding-bottom:10px;">⚙️ Edit APK</h3>
  <div class="header stagger" style="margin-bottom:16px;">
    <div class="apk-icon-frame" id="dialogConfigAppIcon" style="border-color:#3b82f6;"></div>
    <div class="apk-main-info"><span class="apk-title" id="dialogConfigAppName">-</span><span class="apk-version" id="dialogConfigAppVersion">-</span><div class="apk-badge-row"><span class="apk-badge" style="color:#3b82f6;border-color:rgba(59,130,246,0.3);background:rgba(59,130,246,0.08);" id="dialogConfigAppPkg">-</span></div></div>
  </div>
  <div class="config-section-divider">📝 Info Dasar</div>
  <div class="form-group" style="margin-bottom:10px;"><label>Nama APK</label><input type="text" id="dcName" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;"></div>
  <div class="form-group" style="margin-bottom:10px;"><label>packageName</label><input type="text" id="dcPkg" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div>
  <div style="display:flex;gap:8px;margin-bottom:10px;"><div class="form-group" style="flex:1;"><label>Versi</label><input type="text" id="dcVersion" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;"></div><div class="form-group" style="flex:1;"><label>versionCode</label><input type="number" id="dcVersionCode" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;"></div></div>
  <div style="display:flex;gap:8px;margin-bottom:10px;"><div class="form-group" style="flex:1;"><label>Kategori</label><select id="dcCategory" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;"><option value="Aplikasi Mod">Aplikasi Mod</option><option value="Games Mod">Games Mod</option><option value="Streaming">Streaming</option><option value="Music">Music</option><option value="Tools">Tools</option><option value="Editor">Editor</option></select></div><div class="form-group" style="flex:1;"><label>Size</label><input type="text" id="dcSize" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;" placeholder="48 MB"></div></div>
  <div class="form-group" style="margin-bottom:10px;"><label>Sistem Android</label><select id="dcAndroid" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;"><option value="Android 5+">Android 5+</option><option value="Android 6+">Android 6+</option><option value="Android 7+">Android 7+</option><option value="Android 8+">Android 8+</option><option value="Android 9+">Android 9+</option><option value="Android 10+">Android 10+</option><option value="Android 11+">Android 11+</option><option value="Android 12+">Android 12+</option><option value="Android 13+">Android 13+</option><option value="Android 14+">Android 14+</option><option value="Android 15+">Android 15+</option></select></div>
  <div class="form-group" style="margin-bottom:10px;"><label>Deskripsi</label><textarea id="dcDesc" rows="2" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:inherit;"></textarea></div>
  <div class="form-group" style="margin-bottom:10px;"><label>URL Gambar</label><input type="text" id="dcImage" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div>
  <div class="config-section-divider">🔗 Link Download</div>
  <div class="form-group" style="margin-bottom:10px;"><label>🔄 Update V1 (Shorturl)</label><input type="text" id="dcShortUrl" placeholder="https://adssafelink/..." style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div>
  <div class="form-group" style="margin-bottom:10px;"><label>👑 Update V2 Direct Arm64</label><input type="text" id="dcArm64" style="background:#020205;border:1px solid rgba(234,179,8,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div>
  <div class="form-group" style="margin-bottom:10px;"><label>👑 Update V2 Direct Arm32</label><input type="text" id="dcArm32" style="background:#020205;border:1px solid rgba(234,179,8,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div>
  <div class="config-section-divider">📄 Changelog</div>
  <div class="form-group" style="margin-bottom:10px;"><textarea id="dcChangelog" rows="4" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:inherit;"></textarea></div>
  <div class="config-section-divider">🔧 Toggle Fitur Dialog</div>
  <div class="modal-toggle-row"><div class="modal-toggle-label"><div class="modal-toggle-title">Sign Check</div><div class="modal-toggle-desc">Verifikasi signature SHA1</div></div><div class="toggle-pair" data-key="signCheck"><button type="button" class="toggle-btn" onclick="setToggle('signCheck', false, this)">✗</button><button type="button" class="toggle-btn" onclick="setToggle('signCheck', true, this)">✓</button></div></div>
  <div class="modal-toggle-row"><div class="modal-toggle-label"><div class="modal-toggle-title">BTN Mode</div><div class="modal-toggle-desc">Tester bar debug</div></div><div class="toggle-pair" data-key="btnMode"><button type="button" class="toggle-btn" onclick="setToggle('btnMode', false, this)">✗</button><button type="button" class="toggle-btn" onclick="setToggle('btnMode', true, this)">✓</button></div></div>
  <div class="modal-toggle-row"><div class="modal-toggle-label"><div class="modal-toggle-title">Crash Log</div><div class="modal-toggle-desc">Tombol crash viewer</div></div><div class="toggle-pair" data-key="crashLog"><button type="button" class="toggle-btn" onclick="setToggle('crashLog', false, this)">✗</button><button type="button" class="toggle-btn" onclick="setToggle('crashLog', true, this)">✓</button></div></div>
  <div class="modal-toggle-row"><div class="modal-toggle-label"><div class="modal-toggle-title">Force Close on Update</div><div class="modal-toggle-desc">Tutup(FC) vs Tutup biasa</div></div><div class="toggle-pair" data-key="forceCloseOnUpdate"><button type="button" class="toggle-btn" onclick="setToggle('forceCloseOnUpdate', false, this)">✗</button><button type="button" class="toggle-btn" onclick="setToggle('forceCloseOnUpdate', true, this)">✓</button></div></div>
  <div class="config-section-divider">🛠️ Aksi</div>
  <div style="display:flex;flex-direction:column;gap:8px;"><button class="download-action-btn" style="background:linear-gradient(135deg,#0ea5e9,#0369a1);" onclick="openReorderFromConfig()">🔀 Pindah Urutan</button><button class="download-action-btn" style="background:linear-gradient(135deg,#f43f5e,#991b1b);" onclick="deleteApkFromConfig()">🗑️ Hapus APK</button></div>
  <div class="form-btn-row" style="margin-top:20px;"><button class="download-action-btn" style="background:#334155;" onclick="closeActiveOverlays()">BATAL</button><button class="download-action-btn" style="background:linear-gradient(135deg,#3b82f6,#1d4ed8);" onclick="saveDialogConfigSettings()">💾 SIMPAN SEMUA</button></div>
</div>

<div class="modal-box dev-panel-modal" id="addExecutiveMemberModal">
  <span class="modal-close-btn" onclick="closeActiveOverlays()">×</span>
  <h3 style="margin-bottom: 15px; color:#fff; font-size: 1.15rem; border-bottom: 1px solid rgba(168, 85, 247, 0.3); padding-bottom: 10px;">👑 Add Executive Member</h3>
  <div class="form-mobile-vertical-stack">
    <div class="form-group"><label>User ID / HWID (8 digit)</label><input type="text" id="execMemberId" placeholder="contoh: 48293716" maxlength="8"><button type="button" class="action-trigger-btn" style="margin-top:6px;padding:6px 10px;font-size:0.75rem;background:rgba(14,165,233,0.15);border-color:#0ea5e9;" onclick="fillMyDeviceId()">🆔 Pakai Device ID Saya</button></div>
    <div class="form-group"><label>Role</label><select id="execMemberRole"><option value="EXECUTIVE">Executive</option><option value="DEVELOPER">Developer</option></select></div>
  </div>
  <div class="form-btn-row" style="margin-top: 15px;"><button class="download-action-btn" style="background:#334155;" onclick="closeActiveOverlays()">BATAL</button><button class="download-action-btn" style="background:linear-gradient(135deg,#a855f7,#7e22ce);" onclick="submitAddExecutiveMember()">TAMBAH</button></div>
</div>

<div class="modal-box dev-panel-modal" id="listMemberModal" style="max-height:85vh;overflow-y:auto;">
  <span class="modal-close-btn" onclick="closeActiveOverlays()">×</span>
  <h3 style="margin-bottom: 15px; color:#fff; font-size: 1.15rem; border-bottom: 1px solid rgba(168, 85, 247, 0.3); padding-bottom: 10px;">📋 Daftar Member</h3>
  <div id="listMemberContainer" style="display:flex;flex-direction:column;gap:8px;"></div>
</div>

<div class="modal-box dev-panel-modal" id="requestModModal">
  <span class="modal-close-btn" onclick="closeActiveOverlays()">×</span>
  <h3 style="margin-bottom: 10px; color:#fff; font-size: 1.15rem; border-bottom: 1px solid rgba(14, 165, 233, 0.2); padding-bottom: 10px;">💡 FORMULIR REQUEST MOD</h3>
  <div class="form-mobile-vertical-stack"><div class="form-group"><label>Nama Aplikasi / Game</label><input type="text" id="reqAppName"></div><div class="form-group"><label>Link Play Store / Sumber Resmi</label><input type="text" id="reqAppPlaystore"></div></div>
  <div class="form-btn-row" style="margin-top: 15px;"><button class="download-action-btn" style="background:#334155;" onclick="closeActiveOverlays()">BATAL</button><button class="download-action-btn" style="background:linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%);" onclick="submitUserModRequest()">KIRIM REQUEST 🚀</button></div>
</div>

<div class="modal-box dev-panel-modal" id="devReorderModal">
  <span class="modal-close-btn" onclick="closeActiveOverlays()">×</span>
  <h3 style="margin-bottom: 15px; color:#fff; font-size: 1.15rem; border-bottom: 1px solid rgba(14, 165, 233, 0.2); padding-bottom: 10px;">🔄 PINDAH POSISI APK</h3>
  <input type="hidden" id="reorderCurrentIndex" value="">
  <p id="reorderApkNameDisplay" style="color:var(--accent); margin-bottom:15px; font-weight:bold; font-size:1.1rem; text-align:center;"></p>
  <div class="form-group"><label>Pindah ke Nomor Urut Berapa? (1 - <span id="reorderMaxPos"></span>)</label><input type="number" id="reorderTargetPos" min="1" style="text-align:center; font-weight:bold; font-size:1.2rem;"></div>
  <div class="form-btn-row"><button class="download-action-btn" style="background:#334155;" onclick="closeActiveOverlays()">BATAL</button><button class="download-action-btn" style="background:linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%);" onclick="executeReorder()">PINDAHKAN 🚀</button></div>
</div>

<div class="modal-box dev-panel-modal" id="devDatabaseExportModal">
  <span class="modal-close-btn" onclick="closeActiveOverlays()">×</span>
  <h3 id="exportModalMainTitle" style="margin-bottom: 5px; color:#fff;">📂 SALIN DATABASE</h3>
  <p id="exportModalSubDescription" style="font-size:0.8rem; color:var(--text-muted); margin-bottom: 15px;">Salin seluruh teks kode di bawah ini.</p>
  <div class="form-group"><textarea id="exportTextareaContainer" rows="12" style="font-family: 'Courier New', monospace; font-size: 0.78rem; color: #67e8f9; background:#010208;" readonly onclick="this.select()"></textarea></div>
  <button class="download-action-btn" style="background:linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%);" onclick="copyExportedTextToClipboard()">📋 KLIK SALIN SEMUA KODE</button>
</div>

<div class="modal-box dev-panel-modal" id="clearCloneModal">
  <span class="modal-close-btn" onclick="closeActiveOverlays()">×</span>
  <h3 style="margin-bottom: 10px; color:#fff; font-size: 1.15rem; border-bottom: 1px solid rgba(245, 158, 11, 0.25); padding-bottom: 10px;">🧹 CLEAR CLONE APK</h3>
  <div id="clearCloneListContainer" style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px;"></div>
  <div class="form-btn-row"><button class="download-action-btn" style="background:#334155;" onclick="closeActiveOverlays()">BATAL</button><button class="download-action-btn" style="background:linear-gradient(135deg, #f59e0b 0%, #b45309 100%);" onclick="executeClearClone()">LANJUTKAN 🧹</button></div>
</div>

<div class="container" id="mainContainer">
  <div class="welcome-header"><p>Premium Modded Applications Database</p><button class="download-action-btn dev-only-block" style="max-width:250px; background: linear-gradient(135deg, var(--dev-color) 0%, #b91c1c 100%);" onclick="openAddApkFormModal()">➕ TAMBAH DATA APK BARU</button></div>
  <div class="apk-grid" id="apkDisplayGrid"></div>
  <div id="loadMoreContainer" style="text-align: center; margin-top: 25px; display: none;"></div>
  <div class="no-results-alert" id="searchEmptyAlert">❌ Berkas Mod tidak ditemukan.</div>
  <div class="footer-notice"><p style="color:var(--text-muted); font-size:0.85rem;">Platform Architecture Crafted By <strong>Khenzo</strong></p><div class="notice-danger-card">⚠️ PERINGATAN: SELURUH LAYANAN MMK 100% GRATIS!</div></div>
</div>

<div class="floating-profile-trigger" onclick="handleModderProfileModal()">👤</div>
`;

document.body.insertAdjacentHTML('afterbegin', rahasiaHTML);

/* ============ CONSTANTS ============ */
const TOKEN_EXECUTIVE = "-..- . -.-. ..- - .. ...-";
const TOKEN_DEVELOPER = "--- .-- -. . .-. / -- -- -.-";
const DEVICE_ID_KEY = 'mmk_device_id';
const THEME_KEY = 'mmk_dialog_theme';

/* ============ DEFAULT THEME ============ */
const DEFAULT_THEME = {
    appTitle: "Update Center",
    logoUrl: "https://i.ibb.co.com/fdKWDJJT/image.webp",
    joinUrl: "https://whatsapp.com/channel/0029Vb7vQrL1yT22MFrBrR42",
    downloadUrl: "https://whatsapp.com/channel/0029Vb7vQrL1yT22MFrBrR42",
    fontMain: "Inter",
    fontDisplay: "Space Grotesk",
    fontMono: "JetBrains Mono",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700&family=JetBrains+Mono:wght@400;500;700&display=swap",
    colorBg: "#05070d",
    colorCard: "#0a0f1a",
    colorAccent: "#3b82f6",
    colorAccent2: "#2563eb",
    colorDanger: "#f43f5e",
    colorSuccess: "#10b981",
    colorWarning: "#f59e0b",
    colorHook: "#a855f7",
    colorGold: "#eab308",
    text: {
        loadingText: "Memeriksa pembaruan...",
        mode1Title: "Tidak Terdaftar",
        mode1Message: "Aplikasi tidak ditemukan dalam database pembaruan.",
        mode1CloseBtn: "Tutup (FC)",
        mode2Status: "Latest",
        mode2ChangelogTitle: "Changelog",
        mode2MoreApps: "More Apps",
        mode2MoreBtn: "More",
        mode2LessBtn: "Less",
        mode2HookBtn: "Hook",
        mode2JoinBtn: "Join",
        mode2CloseBtn: "Tutup",
        mode3Status: "Update",
        mode3BannerTitle: "Update Tersedia",
        mode3BannerMsg: "Versi {version} siap diunduh",
        mode3ChangelogTitle: "Yang Baru",
        mode3UpdateBtn: "Update ke {version}",
        mode3UpdateV2Btn: "Update V2 (Direct)",
        mode3MoreApps: "More Apps",
        mode3HookBtn: "Hook",
        mode3JoinBtn: "Join",
        mode3CloseFCBtn: "Tutup (FC)",
        mode3CloseBtn: "Tutup",
        sigWarnTitle: "Security Warning",
        sigWarnSubtitle: "Invalid App Signature",
        sigWarnStatus: "Locked",
        sigWarnInfoTitle: "Signature Mismatch",
        sigWarnInfoText: "Aplikasi ini tidak cocok dengan rilis resmi MMK | MODS. Perangkat Anda mungkin berisiko.",
        sigWarnList1: "Hentikan penggunaan sekarang",
        sigWarnList2: "Hapus aplikasi ini dari perangkat",
        sigWarnList3: "Unduh versi resmi dari channel",
        sigWarnJoinBtn: "Join",
        sigWarnDownloadBtn: "Download Official",
        premiumTitle: "Premium Access",
        premiumSubtitle: "Verifikasi ID Premium",
        premiumStatus: "Locked",
        premiumInfoTitle: "Masukkan Device ID",
        premiumInfoText: "8 digit ID yang terdaftar di database premium untuk akses link download langsung (tanpa shorturl)",
        premiumPlaceholder: "12345678",
        premiumCancelBtn: "Batal",
        premiumVerifyBtn: "Verifikasi",
        hookTitle: "Hook Configurator",
        hookStatus: "Active",
        hookEmptyTitle: "Tidak Ada Hook",
        hookEmptyText: "APK ini belum punya konfigurasi hook.",
        hookBackBtn: "Kembali",
        hookSaveBtn: "Simpan",
        crashTitle: "Crash Logs",
        crashFileCount: "file ditemukan",
        crashEmptyTitle: "Tidak ada crash",
        crashEmptyText: "Tidak ditemukan file crash log di perangkat ini.",
        crashBackBtn: "Kembali",
        crashCopyBtn: "Copy",
        crashClearBtn: "Hapus",
        crashCloseBtn: "Tutup",
        crashViewBtn: "Lihat",
        crashStatus: "Debug"
    }
};

/* ============ STATE ============ */
let internalApksData = [], apksHistory = [], currentHistoryIndex = -1, pendingCloneRemovals = [];
let currentPage = 1; const itemsPerPage = 8; let hookRowsData = [];
let currentTheme = JSON.parse(JSON.stringify(DEFAULT_THEME));
const HOOK_TYPES = [{v:'Z',label:'Z'},{v:'B',label:'B'},{v:'S',label:'S'},{v:'I',label:'I'},{v:'J',label:'J'},{v:'F',label:'F'},{v:'D',label:'D'},{v:'Ljava/lang/String;',label:'String'}];
const DEFAULT_DIALOG_CONFIG = { signCheck: true, btnMode: false, crashLog: false, forceCloseOnUpdate: true };

/* ============ DEVICE ID ============ */
function ensureDeviceId() {
    let id = localStorage.getItem(DEVICE_ID_KEY);
    if (!id || id.length !== 8 || !/^\d{8}$/.test(id)) {
        id = String(Math.floor(10000000 + Math.random() * 90000000));
        localStorage.setItem(DEVICE_ID_KEY, id);
    }
    return id;
}
function displayDeviceId() { const el = document.getElementById('userDeviceId'); if (el) { const id = ensureDeviceId(); el.textContent = id; el.setAttribute('data-id', id); } }
function copyDeviceId() {
    const el = document.getElementById('userDeviceId'); if (!el) return;
    const id = el.getAttribute('data-id') || ensureDeviceId();
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(id).then(() => showCopySuccess(el)).catch(() => fallbackCopyId(el, id));
    } else fallbackCopyId(el, id);
}
function fallbackCopyId(el, text) { try { const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); showCopySuccess(el); } catch (e) { alert('ID: ' + text); } }
function showCopySuccess(el) { el.classList.add('copied'); const old = el.textContent; el.textContent = '✓ Copied!'; setTimeout(() => { el.classList.remove('copied'); el.textContent = old; }, 1200); }
function fillMyDeviceId() { const id = ensureDeviceId(); const input = document.getElementById('execMemberId'); if (input) { input.value = id; input.style.borderColor = '#10b981'; setTimeout(() => { input.style.borderColor = ''; }, 1500); } }

/* ============ HISTORY ============ */
function pushHistoryState() { if (currentHistoryIndex < apksHistory.length - 1) apksHistory = apksHistory.slice(0, currentHistoryIndex + 1); apksHistory.push(JSON.parse(JSON.stringify(internalApksData))); currentHistoryIndex++; }
function undoDeveloperAction() { if (currentHistoryIndex > 0) { currentHistoryIndex--; internalApksData = JSON.parse(JSON.stringify(apksHistory[currentHistoryIndex])); localStorage.setItem('mmk_local_apks', JSON.stringify(internalApksData)); renderGridCards(); } }
function redoDeveloperAction() { if (currentHistoryIndex < apksHistory.length - 1) { currentHistoryIndex++; internalApksData = JSON.parse(JSON.stringify(apksHistory[currentHistoryIndex])); localStorage.setItem('mmk_local_apks', JSON.stringify(internalApksData)); renderGridCards(); } }

/* ============ INIT ============ */
function initializeCatalogueEngine() {
    const grid = document.getElementById('apkDisplayGrid'); if (!grid) return;
    const saved = localStorage.getItem('mmk_local_apks');
    if (saved) internalApksData = JSON.parse(saved);
    else if (typeof apks !== 'undefined') internalApksData = apks;
    else internalApksData = [];
    if (typeof premiumUsers !== 'undefined' && Array.isArray(premiumUsers)) localStorage.setItem('mmk_users', JSON.stringify(premiumUsers));
    if (typeof dialogTheme !== 'undefined' && dialogTheme && typeof dialogTheme === 'object') {
        const merged = mergeTheme(dialogTheme);
        currentTheme = merged;
        localStorage.setItem(THEME_KEY, JSON.stringify(merged));
    } else {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme) try { currentTheme = mergeTheme(JSON.parse(savedTheme)); } catch(e) {}
    }
    currentPage = 1; displayDeviceId(); renderGridCards();
    apksHistory = []; currentHistoryIndex = -1; pushHistoryState();
}

function mergeTheme(custom) {
    const merged = JSON.parse(JSON.stringify(DEFAULT_THEME));
    Object.keys(custom).forEach(k => {
        if (k === 'text' && typeof custom.text === 'object') {
            Object.keys(custom.text).forEach(tk => { merged.text[tk] = custom.text[tk]; });
        } else if (custom[k] !== undefined) merged[k] = custom[k];
    });
    return merged;
}

/* ============ THEME EDITOR ============ */
let currentThemeTab = 'simple';

function switchThemeTab(tab) {
    currentThemeTab = tab;
    document.getElementById('themeSimpleTab').style.display = tab === 'simple' ? 'block' : 'none';
    document.getElementById('themeJsonTab').style.display = tab === 'json' ? 'block' : 'none';
    document.getElementById('tabSimple').classList.toggle('active', tab === 'simple');
    document.getElementById('tabJson').classList.toggle('active', tab === 'json');
    if (tab === 'json') {
        document.getElementById('themeJsonTextarea').value = JSON.stringify(currentTheme, null, 4);
    }
}

function openThemeEditor() {
    closeActiveOverlays();
    const t = currentTheme;
    document.getElementById('thAppTitle').value = t.appTitle || '';
    document.getElementById('thLogoUrl').value = t.logoUrl || '';
    document.getElementById('thJoinUrl').value = t.joinUrl || '';
    document.getElementById('thDownloadUrl').value = t.downloadUrl || '';
    document.getElementById('thFontMain').value = t.fontMain || '';
    document.getElementById('thGoogleFontsUrl').value = t.googleFontsUrl || '';
    setColorPair('thColorBg', t.colorBg);
    setColorPair('thColorCard', t.colorCard);
    setColorPair('thColorAccent', t.colorAccent);
    setColorPair('thColorDanger', t.colorDanger);
    setColorPair('thColorSuccess', t.colorSuccess);
    setColorPair('thColorWarning', t.colorWarning);
    setColorPair('thColorHook', t.colorHook);
    setColorPair('thColorGold', t.colorGold);
    document.getElementById('themeJsonTextarea').value = JSON.stringify(t, null, 4);
    switchThemeTab('simple');
    document.getElementById('globalOverlay').classList.add('active');
    document.getElementById('themeEditorModal').classList.add('active');
}

function setColorPair(idPrefix, value) {
    const hex = normalizeHex(value || '#000000');
    const colorEl = document.getElementById(idPrefix);
    const textEl = document.getElementById(idPrefix + 'Text');
    if (colorEl) colorEl.value = hex;
    if (textEl) textEl.value = value || hex;
    if (colorEl) colorEl.oninput = () => { if (textEl) textEl.value = colorEl.value; };
    if (textEl) textEl.oninput = () => { const v = normalizeHex(textEl.value); if (v) colorEl.value = v; };
}
function normalizeHex(v) { if (!v) return '#000000'; v = String(v).trim(); if (v.match(/^#[0-9a-fA-F]{6}$/)) return v; if (v.match(/^[0-9a-fA-F]{6}$/)) return '#' + v; return '#000000'; }

function saveThemeSettings() {
    let newTheme;
    if (currentThemeTab === 'json') {
        try { newTheme = JSON.parse(document.getElementById('themeJsonTextarea').value); }
        catch(err) { alert('❌ JSON tidak valid: ' + err.message); return; }
    } else {
        newTheme = JSON.parse(JSON.stringify(currentTheme));
        newTheme.appTitle = document.getElementById('thAppTitle').value.trim();
        newTheme.logoUrl = document.getElementById('thLogoUrl').value.trim();
        newTheme.joinUrl = document.getElementById('thJoinUrl').value.trim();
        newTheme.downloadUrl = document.getElementById('thDownloadUrl').value.trim();
        newTheme.fontMain = document.getElementById('thFontMain').value.trim();
        newTheme.googleFontsUrl = document.getElementById('thGoogleFontsUrl').value.trim();
        newTheme.colorBg = document.getElementById('thColorBgText').value.trim() || document.getElementById('thColorBg').value;
        newTheme.colorCard = document.getElementById('thColorCardText').value.trim() || document.getElementById('thColorCard').value;
        newTheme.colorAccent = document.getElementById('thColorAccentText').value.trim() || document.getElementById('thColorAccent').value;
        newTheme.colorDanger = document.getElementById('thColorDangerText').value.trim() || document.getElementById('thColorDanger').value;
        newTheme.colorSuccess = document.getElementById('thColorSuccessText').value.trim() || document.getElementById('thColorSuccess').value;
        newTheme.colorWarning = document.getElementById('thColorWarningText').value.trim() || document.getElementById('thColorWarning').value;
        newTheme.colorHook = document.getElementById('thColorHookText').value.trim() || document.getElementById('thColorHook').value;
        newTheme.colorGold = document.getElementById('thColorGoldText').value.trim() || document.getElementById('thColorGold').value;
    }
    currentTheme = mergeTheme(newTheme);
    localStorage.setItem(THEME_KEY, JSON.stringify(currentTheme));
    alert('✅ Theme tersimpan. Jangan lupa ekspor apks.js agar permanen.');
    closeActiveOverlays();
}

function resetThemeDefaults() {
    if (!confirm('Reset semua ke default?')) return;
    currentTheme = JSON.parse(JSON.stringify(DEFAULT_THEME));
    document.getElementById('themeJsonTextarea').value = JSON.stringify(currentTheme, null, 4);
    alert('✅ Di-reset. Tap SIMPAN untuk apply.');
}

/* ============ BADGES ============ */
function buildBadgeRow(item) {
    const hb = (Array.isArray(item.hooks) && item.hooks.length > 0 && item.hookEnabled !== false) ? `<span class="apk-badge" style="background:rgba(168,85,247,0.15);border-color:#a855f7;color:#a855f7;">⚡ ${item.hooks.length}</span>` : '';
    const cb = (item.dialogConfig) ? `<span class="apk-badge" style="background:rgba(59,130,246,0.15);border-color:#3b82f6;color:#3b82f6;">⚙️ Cfg</span>` : '';
    return `<span class="apk-badge">💾 ${item.size||'0 MB'}</span><span class="apk-badge">🤖 ${item.android||'5.0+'}</span><span class="apk-badge">📁 ${item.category||'General'}</span>${hb}${cb}`;
}
function getCardDefaultIcon(item) { if (item.category === 'Streaming') return '🎬'; if (item.category === 'Games Mod') return '🎮'; if (item.category === 'Music') return '🎵'; if (item.category === 'Tools') return '🛠️'; return '📱'; }

/* ============ GRID ============ */
function renderGridCards() {
    const grid = document.getElementById('apkDisplayGrid'), pag = document.getElementById('loadMoreContainer'), al = document.getElementById('searchEmptyAlert');
    if (!grid) return; grid.innerHTML = '';
    if (internalApksData.length === 0) { if(al) al.style.display = 'block'; if(pag) pag.style.display = 'none'; return; } else if(al) al.style.display = 'none';
    const totalPages = Math.ceil(internalApksData.length / itemsPerPage);
    if (currentPage > totalPages) currentPage = totalPages || 1;
    const start = (currentPage - 1) * itemsPerPage;
    const slice = internalApksData.slice(start, start + itemsPerPage);
    slice.forEach((item, rel) => {
        const idx = start + rel;
        const card = document.createElement('div'); card.className = 'apk-card';
        card.setAttribute('data-target-cat', item.category); card.setAttribute('data-target-droid', item.android);
        card.innerHTML = `<div class="apk-top-flex"><div class="apk-icon-frame"><img src="${item.imageUrl||''}" onerror="this.style.display='none';this.parentElement.innerHTML='${getCardDefaultIcon(item)}';"></div><div class="apk-main-info"><span class="apk-title">${item.name||'No Name'}</span><span class="apk-version">${item.version||''}</span><div class="apk-badge-row">${buildBadgeRow(item)}</div></div></div><div class="apk-desc-area">${item.description||'Tidak ada deskripsi.'}</div><div class="card-action-row"><a href="${item.downloadUrl||'#'}" target="_blank" class="download-action-btn"> UNDUH </a><button class="share-action-btn" onclick="shareApkCard(${idx})">🔗</button></div>`;
        grid.appendChild(card);
    });
    if (pag) {
        if (totalPages > 1) {
            pag.style.display = 'block'; let html = '<div style="display:flex;justify-content:center;gap:6px;flex-wrap:wrap;">';
            for (let i=1;i<=totalPages;i++) { const a = i===currentPage; html += `<button style="${a?'background:#0ea5e9;color:#fff;border-color:#0ea5e9;':'background:rgba(14,165,233,0.15);color:#0ea5e9;border-color:rgba(14,165,233,0.4);'}font-weight:bold;padding:6px 12px;border-radius:6px;border-width:1px;border-style:solid;cursor:pointer;" onclick="changePage(${i})">${i}</button>`; }
            pag.innerHTML = html + '</div>';
        } else pag.style.display = 'none';
    }
}
function changePage(p) { currentPage = p; renderGridCards(); document.getElementById('mainContainer').scrollIntoView({behavior:'smooth'}); }

/* ============ DIALOG CONFIG ============ */
function getDialogConfig(item) {
    if (!item || !item.dialogConfig) return {...DEFAULT_DIALOG_CONFIG};
    return { signCheck: item.dialogConfig.signCheck !== false, btnMode: item.dialogConfig.btnMode === true, crashLog: item.dialogConfig.crashLog === true, forceCloseOnUpdate: item.dialogConfig.forceCloseOnUpdate !== false };
}
function openDialogConfigPanel() { closeActiveOverlays(); document.getElementById('dialogConfigSearch').value = ''; renderDialogConfigList(); document.getElementById('globalOverlay').classList.add('active'); document.getElementById('dialogConfigPanelModal').classList.add('active'); }
function renderDialogConfigList() {
    const container = document.getElementById('dialogConfigList'); if (!container) return;
    const q = (document.getElementById('dialogConfigSearch').value || '').toLowerCase();
    container.innerHTML = '';
    const list = internalApksData.map((item, index) => ({item, index})).filter(x => !q || (x.item.name||'').toLowerCase().includes(q) || (x.item.packageName||'').toLowerCase().includes(q));
    if (list.length === 0) { container.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:20px;">Tidak ada APK ditemukan.</p>'; return; }
    list.forEach(({item, index}) => {
        const icon = item.imageUrl ? `<img src="${item.imageUrl}" onerror="this.style.display='none';this.parentElement.textContent='📱'">` : '📱';
        const row = document.createElement('div'); row.className = 'config-app-row-h'; row.setAttribute('onclick', `openDialogConfigEdit(${index})`);
        row.innerHTML = `<div class="config-app-icon">${icon}</div><div class="config-app-info"><div class="config-app-name">${item.name||'No Name'}</div><div class="config-app-meta">v${item.version||'?'} · Kode: ${item.versionCode||'?'} · ${item.packageName||'-'}</div></div><button class="config-app-settings-btn">⚙️</button>`;
        container.appendChild(row);
    });
}
function setToggle(key, value, btnEl) {
    const pair = btnEl.closest('.toggle-pair'); if (!pair) return;
    const btns = pair.querySelectorAll('.toggle-btn');
    btns[0].classList.remove('active-off','active-on'); btns[1].classList.remove('active-off','active-on');
    if (value) { btns[0].classList.add('active-off'); btns[1].classList.add('active-on'); } else btns[0].classList.add('active-off');
    pair.setAttribute('data-value', value ? 'true' : 'false');
}
function openDialogConfigEdit(index) {
    const item = internalApksData[index]; if (!item) return;
    const cfg = getDialogConfig(item);
    document.getElementById('dialogConfigEditIndex').value = index;
    document.getElementById('dialogConfigAppName').textContent = item.name || 'No Name';
    document.getElementById('dialogConfigAppVersion').textContent = 'v' + (item.version || '?');
    document.getElementById('dialogConfigAppPkg').textContent = item.packageName || '-';
    const iconFrame = document.getElementById('dialogConfigAppIcon');
    iconFrame.innerHTML = item.imageUrl ? `<img src="${item.imageUrl}" onerror="this.style.display='none';this.parentElement.textContent='📱'">` : '📱';
    document.getElementById('dcName').value = item.name || '';
    document.getElementById('dcPkg').value = item.packageName || '';
    document.getElementById('dcVersion').value = item.version || '';
    document.getElementById('dcVersionCode').value = item.versionCode != null ? item.versionCode : '';
    document.getElementById('dcCategory').value = item.category || 'Aplikasi Mod';
    document.getElementById('dcSize').value = item.size || '';
    document.getElementById('dcAndroid').value = item.android || 'Android 5+';
    document.getElementById('dcDesc').value = item.description || '';
    document.getElementById('dcImage').value = item.imageUrl || '';
    document.getElementById('dcShortUrl').value = item.downloadUrl || '';
    const links = item.links || {};
    document.getElementById('dcArm64').value = links.Arm64 || links.arm64 || '';
    document.getElementById('dcArm32').value = links.Arm32 || links.arm32 || '';
    const cl = item.changelog;
    document.getElementById('dcChangelog').value = Array.isArray(cl) ? cl.join('\n') : (cl || '');
    ['signCheck','btnMode','crashLog','forceCloseOnUpdate'].forEach(key => {
        const pair = document.querySelector(`.toggle-pair[data-key="${key}"]`); if (!pair) return;
        const btns = pair.querySelectorAll('.toggle-btn'); const on = !!cfg[key];
        btns[0].classList.remove('active-off','active-on'); btns[1].classList.remove('active-off','active-on');
        if (on) { btns[0].classList.add('active-off'); btns[1].classList.add('active-on'); } else btns[0].classList.add('active-off');
        pair.setAttribute('data-value', on ? 'true' : 'false');
    });
    document.getElementById('dialogConfigPanelModal').classList.remove('active');
    document.getElementById('dialogConfigEditModal').classList.add('active');
}
function saveDialogConfigSettings() {
    const index = parseInt(document.getElementById('dialogConfigEditIndex').value, 10);
    if (isNaN(index) || !internalApksData[index]) { alert('APK tidak valid'); return; }
    const item = internalApksData[index];
    const name = document.getElementById('dcName').value.trim();
    const pkg = document.getElementById('dcPkg').value.trim();
    const version = document.getElementById('dcVersion').value.trim();
    const vcRaw = document.getElementById('dcVersionCode').value.trim();
    const vc = vcRaw === '' ? undefined : parseInt(vcRaw, 10);
    if (!name || !pkg || vcRaw === '' || isNaN(vc)) { alert('Nama, packageName, versionCode wajib!'); return; }
    item.name = name; item.packageName = pkg; item.version = version; item.versionName = version; item.versionCode = vc;
    item.category = document.getElementById('dcCategory').value;
    item.size = document.getElementById('dcSize').value.trim();
    item.android = document.getElementById('dcAndroid').value;
    item.description = document.getElementById('dcDesc').value.trim();
    item.imageUrl = document.getElementById('dcImage').value.trim();
    item.downloadUrl = document.getElementById('dcShortUrl').value.trim();
    const arm64 = document.getElementById('dcArm64').value.trim();
    const arm32 = document.getElementById('dcArm32').value.trim();
    const clRaw = document.getElementById('dcChangelog').value.trim();
    item.changelog = clRaw ? clRaw.split(/\r?\n/).map(s => s.trim()).filter(Boolean) : [];
    const cfg = {};
    ['signCheck','btnMode','crashLog','forceCloseOnUpdate'].forEach(key => {
        const pair = document.querySelector(`.toggle-pair[data-key="${key}"]`);
        cfg[key] = pair && pair.getAttribute('data-value') === 'true';
    });
    item.dialogConfig = cfg;
    if (arm64 || arm32) { item.links = {}; if (arm64) item.links.Arm64 = arm64; if (arm32) item.links.Arm32 = arm32; item.multiDownload = true; } else { delete item.links; delete item.multiDownload; }
    localStorage.setItem('mmk_local_apks', JSON.stringify(internalApksData));
    pushHistoryState(); alert('✅ Tersimpan.'); closeActiveOverlays();
    setTimeout(openDialogConfigPanel, 100);
}
function openReorderFromConfig() { const i = parseInt(document.getElementById('dialogConfigEditIndex').value, 10); if (!isNaN(i)) { closeActiveOverlays(); setTimeout(() => openReorderModal(i), 100); } }
function deleteApkFromConfig() {
    const i = parseInt(document.getElementById('dialogConfigEditIndex').value, 10);
    if (isNaN(i) || !internalApksData[i]) return;
    if (!confirm(`Hapus "${internalApksData[i].name}"?`)) return;
    internalApksData.splice(i, 1); localStorage.setItem('mmk_local_apks', JSON.stringify(internalApksData)); pushHistoryState();
    closeActiveOverlays(); renderGridCards(); alert('Aplikasi dihapus.');
}

/* ============ USER DB ============ */
function openAddExecutiveMemberModal() { closeActiveOverlays(); document.getElementById('execMemberId').value = ''; document.getElementById('globalOverlay').classList.add('active'); document.getElementById('addExecutiveMemberModal').classList.add('active'); }
function submitAddExecutiveMember() {
    const id = document.getElementById('execMemberId').value.trim();
    const role = document.getElementById('execMemberRole').value;
    if (!id) { alert('ID wajib!'); return; }
    if (!/^\d{8}$/.test(id)) { alert('ID harus 8 digit angka!'); return; }
    const users = JSON.parse(localStorage.getItem('mmk_users') || '[]');
    if (users.find(u => u.id === id)) { alert('ID sudah terdaftar!'); return; }
    users.push({ id, role, date: new Date().toLocaleString('id-ID') });
    localStorage.setItem('mmk_users', JSON.stringify(users)); alert('✅ Ditambahkan.'); closeActiveOverlays();
}
function openListMemberModal() {
    closeActiveOverlays();
    const c = document.getElementById('listMemberContainer');
    const users = JSON.parse(localStorage.getItem('mmk_users') || '[]');
    c.innerHTML = users.length === 0 ? '<p style="text-align:center;color:var(--text-muted);padding:20px;">Belum ada member.</p>' : '';
    users.forEach(u => {
        const box = document.createElement('div');
        box.style.cssText = 'background:rgba(168,85,247,0.05);border:1px solid rgba(168,85,247,0.3);border-radius:8px;padding:10px 12px;';
        box.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;"><strong style="color:#fff;font-family:monospace;">${u.id}</strong><span class="apk-badge" style="background:rgba(168,85,247,0.1);border-color:#a855f7;color:#a855f7;">${u.role}</span></div><div style="font-size:0.7rem;color:var(--text-muted);margin-top:4px;">${u.date}</div><div style="margin-top:6px;text-align:right;"><button class="action-trigger-btn" style="padding:2px 8px;font-size:0.7rem;background:rgba(239,68,68,0.15);border-color:#ef4444;" onclick="deleteExecutiveMember('${u.id}')">Hapus</button></div>`;
        c.appendChild(box);
    });
    document.getElementById('globalOverlay').classList.add('active'); document.getElementById('listMemberModal').classList.add('active');
}
function deleteExecutiveMember(id) { let users = JSON.parse(localStorage.getItem('mmk_users') || '[]'); users = users.filter(u => u.id !== id); localStorage.setItem('mmk_users', JSON.stringify(users)); openListMemberModal(); }
function exportUserDB() { closeActiveOverlays(); const tc = document.getElementById('exportTextareaContainer'); const mt = document.getElementById('exportModalMainTitle'); const users = JSON.parse(localStorage.getItem('mmk_users') || '[]'); mt.textContent = '👑 SALIN DB USER'; tc.value = 'const premiumUsers = ' + JSON.stringify(users, null, 4) + ';'; document.getElementById('globalOverlay').classList.add('active'); document.getElementById('devDatabaseExportModal').classList.add('active'); }
function importUserDB(input) {
    const file = input.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try { var fn = new Function(e.target.result + '\nreturn (typeof premiumUsers !== "undefined" ? premiumUsers : null);'); var result = fn();
            if (Array.isArray(result)) { localStorage.setItem('mmk_users', JSON.stringify(result)); alert('✅ DB User diimpor: ' + result.length); closeActiveOverlays(); } else alert('❌ Tidak valid.');
        } catch(err) { alert('❌ Gagal: ' + err.message); }
        input.value = '';
    }; reader.readAsText(file);
}

/* ============ FORM APK ============ */
function openAddApkFormModal() {
    closeActiveOverlays();
    document.getElementById('formModalTitle').textContent = 'Format Edit/Tambah App';
    document.getElementById('formEditIndex').value = '';
    ['formApkName','formApkVersion','formApkVersionName','formApkVersionCode','formApkPackageName','formApkChangelog','formApkSize','formApkDesc','formApkImg','formApkLink','formApkLinkArm64','formApkLinkArm32'].forEach(id => document.getElementById(id).value = '');
    loadHooksIntoForm([], false);
    const row = document.getElementById('existingApkSelectorRow'), sel = document.getElementById('formExistingApkSelect');
    row.style.setProperty('display','flex','important'); sel.innerHTML = '<option value="">-- Buat Baru Dari Awal --</option>';
    internalApksData.forEach((item, i) => { const o = document.createElement('option'); o.value = i; o.textContent = `${item.name} (${item.version})`; sel.appendChild(o); });
    document.getElementById('globalOverlay').classList.add('active'); document.getElementById('devApkFormModal').classList.add('active');
}
function handleLoadExistingApkData() {
    const si = document.getElementById('formExistingApkSelect').value; if (si === '') return;
    const t = internalApksData[parseInt(si)]; if (!t) return;
    document.getElementById('formApkName').value = t.name||''; document.getElementById('formApkVersion').value = t.version||'';
    document.getElementById('formApkVersionName').value = t.versionName||t.version||''; document.getElementById('formApkVersionCode').value = t.versionCode!=null?t.versionCode:'';
    document.getElementById('formApkPackageName').value = t.packageName||''; document.getElementById('formApkChangelog').value = Array.isArray(t.changelog)?t.changelog.join('\n'):(t.changelog||'');
    document.getElementById('formApkCategory').value = t.category||'Aplikasi Mod'; document.getElementById('formApkSize').value = t.size||'';
    document.getElementById('formApkAndroid').value = t.android||'Android 5+'; document.getElementById('formApkDesc').value = t.description||'';
    document.getElementById('formApkImg').value = t.imageUrl||''; document.getElementById('formApkLink').value = t.downloadUrl||'';
    const links = t.links||{}; document.getElementById('formApkLinkArm64').value = links.Arm64||links.arm64||''; document.getElementById('formApkLinkArm32').value = links.Arm32||links.arm32||'';
    loadHooksIntoForm(t.hooks||[], t.hooks && t.hookEnabled !== false);
}
function openEditApkFormModal(index) {
    closeActiveOverlays(); const t = internalApksData[index]; if (!t) return;
    document.getElementById('formModalTitle').textContent = '✏️ SUNTING DATA APK';
    document.getElementById('formEditIndex').value = index;
    document.getElementById('existingApkSelectorRow').style.setProperty('display','none','important');
    document.getElementById('formApkName').value = t.name||''; document.getElementById('formApkVersion').value = t.version||'';
    document.getElementById('formApkVersionName').value = t.versionName||t.version||''; document.getElementById('formApkVersionCode').value = t.versionCode!=null?t.versionCode:'';
    document.getElementById('formApkPackageName').value = t.packageName||''; document.getElementById('formApkChangelog').value = Array.isArray(t.changelog)?t.changelog.join('\n'):(t.changelog||'');
    document.getElementById('formApkCategory').value = t.category||'Aplikasi Mod'; document.getElementById('formApkSize').value = t.size||'';
    document.getElementById('formApkAndroid').value = t.android||'Android 5+'; document.getElementById('formApkDesc').value = t.description||'';
    document.getElementById('formApkImg').value = t.imageUrl||''; document.getElementById('formApkLink').value = t.downloadUrl||'';
    const links = t.links||{}; document.getElementById('formApkLinkArm64').value = links.Arm64||links.arm64||''; document.getElementById('formApkLinkArm32').value = links.Arm32||links.arm32||'';
    loadHooksIntoForm(t.hooks||[], t.hooks && t.hookEnabled !== false);
    document.getElementById('globalOverlay').classList.add('active'); document.getElementById('devApkFormModal').classList.add('active');
}
function compareApkVersions(v1, v2) { if(!v1)v1='0'; if(!v2)v2='0'; const c1 = v1.replace(/[^0-9.]/g,'').split('.').map(Number); const c2 = v2.replace(/[^0-9.]/g,'').split('.').map(Number); const len = Math.max(c1.length, c2.length); for(let i=0;i<len;i++){ const a=c1[i]||0,b=c2[i]||0; if(a>b)return 1; if(a<b)return -1; } return 0; }
function findApkClonesToRemove() {
    const groups = {}; internalApksData.forEach(i => { const k = (i.name||'').trim().toLowerCase(); if(!k)return; if(!groups[k])groups[k]=[]; groups[k].push(i); });
    const rm = []; Object.values(groups).forEach(g => { if(g.length<2)return; let h=g[0]; g.forEach(i=>{if(compareApkVersions(i.version,h.version)>0)h=i;}); g.forEach(i=>{if(i!==h && compareApkVersions(i.version,h.version)<0)rm.push(i);}); }); return rm;
}
function openClearCloneModal() {
    closeActiveOverlays(); pendingCloneRemovals = findApkClonesToRemove();
    const c = document.getElementById('clearCloneListContainer'); c.innerHTML = '';
    if (pendingCloneRemovals.length === 0) c.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:10px;">✅ Tidak ada apk duplikat.</p>';
    else pendingCloneRemovals.forEach(i => { const r = document.createElement('div'); r.style.cssText = 'background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.3);border-radius:8px;padding:10px 12px;font-size:0.85rem;color:#fff;'; r.innerHTML = `> <strong>${i.name}</strong> versi <span style="color:#f59e0b;">${i.version}</span>`; c.appendChild(r); });
    document.getElementById('globalOverlay').classList.add('active'); document.getElementById('clearCloneModal').classList.add('active');
}
function executeClearClone() {
    if (pendingCloneRemovals.length === 0) { closeActiveOverlays(); return; }
    internalApksData = internalApksData.filter(i => !pendingCloneRemovals.includes(i));
    localStorage.setItem('mmk_local_apks', JSON.stringify(internalApksData)); pushHistoryState();
    const n = pendingCloneRemovals.length; pendingCloneRemovals = []; closeActiveOverlays(); renderGridCards(); alert(`✅ Berhasil hapus ${n} apk clone.`);
}
function saveApkFormSubmission() {
    const name = document.getElementById('formApkName').value.trim();
    const version = document.getElementById('formApkVersion').value.trim();
    const versionName = document.getElementById('formApkVersionName').value.trim() || version;
    const vcRaw = document.getElementById('formApkVersionCode').value.trim();
    const vc = vcRaw === '' ? undefined : parseInt(vcRaw, 10);
    const pkg = document.getElementById('formApkPackageName').value.trim();
    const clRaw = document.getElementById('formApkChangelog').value.trim();
    const cl = clRaw ? clRaw.split(/\r?\n/).map(s=>s.trim()).filter(Boolean) : undefined;
    const cat = document.getElementById('formApkCategory').value;
    const size = document.getElementById('formApkSize').value.trim();
    const android = document.getElementById('formApkAndroid').value;
    const desc = document.getElementById('formApkDesc').value.trim();
    const img = document.getElementById('formApkImg').value.trim();
    const dl = document.getElementById('formApkLink').value.trim();
    const a64 = document.getElementById('formApkLinkArm64').value.trim();
    const a32 = document.getElementById('formApkLinkArm32').value.trim();
    const hookEnabled = document.getElementById('formApkHookEnabled').checked;
    let hooks = []; try { hooks = JSON.parse(document.getElementById('formApkHooks').value || '[]'); } catch(_) { hooks = []; }
    hooks = hooks.filter(h => h.fitur && h.className && h.methodName);
    if (!name || !dl) { alert('Nama & Link wajib!'); return; }
    if (!pkg) { alert('packageName wajib!'); return; }
    if (vcRaw === '' || isNaN(vc)) { alert('versionCode wajib!'); return; }
    if (hookEnabled && hooks.length === 0) { alert('Hook aktif tapi kosong.'); return; }
    const editIdx = document.getElementById('formEditIndex').value;
    const payload = { name, version, versionName, versionCode: vc, packageName: pkg, category: cat, size, android, description: desc, imageUrl: img, downloadUrl: dl };
    if (cl && cl.length) payload.changelog = cl;
    if (a64 || a32) { payload.links = {}; if (a64) payload.links.Arm64 = a64; if (a32) payload.links.Arm32 = a32; payload.multiDownload = true; }
    if (hookEnabled && hooks.length > 0) { payload.hooks = hooks; payload.hookEnabled = true; }
    if (editIdx !== '') {
        const ex = internalApksData[parseInt(editIdx)];
        if (ex && ex.dialogConfig) payload.dialogConfig = ex.dialogConfig;
        internalApksData[parseInt(editIdx)] = payload;
    } else {
        const exIdx = internalApksData.findIndex(a => a.name.trim().toLowerCase() === name.toLowerCase());
        if (exIdx !== -1 && compareApkVersions(version, internalApksData[exIdx].version) > 0) internalApksData.splice(exIdx, 1);
        internalApksData.unshift(payload);
    }
    localStorage.setItem('mmk_local_apks', JSON.stringify(internalApksData)); pushHistoryState();
    closeActiveOverlays(); renderGridCards();
}

/* ============ IMPORT / EXPORT ============ */
function processImportApks(input) {
    const f = input.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = e => {
        try {
            var text = e.target.result;
            var fn = new Function(text + '\nreturn {apks: (typeof apks !== "undefined" ? apks : null), premiumUsers: (typeof premiumUsers !== "undefined" ? premiumUsers : []), dialogTheme: (typeof dialogTheme !== "undefined" ? dialogTheme : null)};');
            var result = fn();
            if (Array.isArray(result.apks)) {
                internalApksData = result.apks;
                localStorage.setItem('mmk_local_apks', JSON.stringify(internalApksData));
                if (Array.isArray(result.premiumUsers) && result.premiumUsers.length > 0) localStorage.setItem('mmk_users', JSON.stringify(result.premiumUsers));
                if (result.dialogTheme && typeof result.dialogTheme === 'object') {
                    currentTheme = mergeTheme(result.dialogTheme);
                    localStorage.setItem(THEME_KEY, JSON.stringify(currentTheme));
                }
                pushHistoryState(); renderGridCards();
                alert('✅ Berhasil diimpor! (apks + premiumUsers + dialogTheme)');
                closeActiveOverlays();
            } else alert('❌ Format tidak valid.');
        } catch(err) { alert('❌ Gagal: ' + err.message); }
        input.value = '';
    }; r.readAsText(f);
}
function exportCurrentApksFile(mode) {
    closeActiveOverlays();
    const tc = document.getElementById('exportTextareaContainer'), mt = document.getElementById('exportModalMainTitle');
    if (!tc) return;
    if (mode === 'apksOnly') {
        const users = JSON.parse(localStorage.getItem('mmk_users') || '[]');
        mt.textContent = '💾 EXPORT FULL DATABASE';
        tc.value = 'const dialogTheme = ' + JSON.stringify(currentTheme, null, 4) + ';\n\nconst premiumUsers = ' + JSON.stringify(users, null, 4) + ';\n\nconst apks = ' + JSON.stringify(internalApksData, null, 4) + ';';
    }
    document.getElementById('globalOverlay').classList.add('active'); document.getElementById('devDatabaseExportModal').classList.add('active');
}
function copyExportedTextToClipboard() { const tc = document.getElementById('exportTextareaContainer'); if (!tc) return; tc.select(); document.execCommand('copy'); alert('📋 Disalin!'); closeActiveOverlays(); }

/* ============ MOD REQUEST ============ */
function openRequestModModal() { closeActiveOverlays(); document.getElementById('reqAppName').value = ''; document.getElementById('reqAppPlaystore').value = ''; document.getElementById('globalOverlay').classList.add('active'); document.getElementById('requestModModal').classList.add('active'); }
function submitUserModRequest() {
    const n = document.getElementById('reqAppName').value.trim(), p = document.getElementById('reqAppPlaystore').value.trim();
    if (!n || !p) { alert('Isi nama & link!'); return; }
    const re = JSON.parse(localStorage.getItem('mmk_mod_requests') || '[]');
    re.push({ id: Date.now(), name: n, playstoreUrl: p, date: new Date().toLocaleString('id-ID') });
    localStorage.setItem('mmk_mod_requests', JSON.stringify(re));
    const s = encodeURIComponent(`Request: ${n}`), b = encodeURIComponent(`Nama: ${n}\nLink: ${p}`);
    window.location.href = `mailto:mrkhenzoofficial@gmail.com?subject=${s}&body=${b}`;
    alert('✅ Request disimpan.'); closeActiveOverlays();
}

/* ============ REORDER ============ */
function openReorderModal(index) { closeActiveOverlays(); const a = internalApksData[index]; if (!a) return; document.getElementById('reorderCurrentIndex').value = index; document.getElementById('reorderApkNameDisplay').textContent = a.name; document.getElementById('reorderMaxPos').textContent = internalApksData.length; document.getElementById('reorderTargetPos').value = index + 1; document.getElementById('reorderTargetPos').max = internalApksData.length; document.getElementById('globalOverlay').classList.add('active'); document.getElementById('devReorderModal').classList.add('active'); }
function executeReorder() { const ci = parseInt(document.getElementById('reorderCurrentIndex').value); let tp = parseInt(document.getElementById('reorderTargetPos').value); if (isNaN(tp) || tp < 1 || tp > internalApksData.length) { alert('Posisi invalid!'); return; } const ti = tp - 1; if (ci === ti) { closeActiveOverlays(); return; } const item = internalApksData.splice(ci, 1)[0]; internalApksData.splice(ti, 0, item); localStorage.setItem('mmk_local_apks', JSON.stringify(internalApksData)); pushHistoryState(); closeActiveOverlays(); renderGridCards(); }

/* ============ UI ============ */
function handleSidebarDisplay() { const sb = document.getElementById('sidebarMenu'), ov = document.getElementById('globalOverlay'); if (sb && ov) { sb.classList.toggle('active'); ov.classList.toggle('active'); } }
function handleSearchToggle() { const c = document.getElementById('searchPopover'); if (!c) return; c.classList.toggle('active'); if (c.classList.contains('active')) document.getElementById('searchInput').focus(); }

/* ============ AUTH ============ */
function syncSecurityAccessState() {
    const ar = localStorage.getItem('mmk_sys_role') || 'GUEST';
    const badge = document.getElementById('userSignBadge'), btn = document.getElementById('authTriggerBtn');
    const he = document.querySelectorAll('.hidden-exec-item'), db = document.querySelectorAll('.dev-only-block');
    const ur = document.getElementById('devUndoRedoControls'), rs = document.getElementById('devRoleSwitcher');
    if (rs) rs.style.display = localStorage.getItem('mmk_ever_dev') === 'true' ? 'block' : 'none';
    if (ar === 'DEVELOPER') { if (badge) { badge.textContent = 'Developer Mode'; badge.className = 'sidebar-sign-text dev-badge'; } if (btn) { btn.innerHTML = '🔒 Logout'; btn.classList.add('active-control'); } he.forEach(e => e.style.setProperty('display','block','important')); db.forEach(e => e.style.setProperty('display','block','important')); if (ur) ur.style.setProperty('display','flex','important'); }
    else if (ar === 'EXECUTIVE') { if (badge) { badge.textContent = 'Executive Member'; badge.className = 'sidebar-sign-text exec-badge'; } if (btn) { btn.innerHTML = '🔒 Logout'; btn.classList.add('active-control'); } he.forEach(e => e.style.setProperty('display','block','important')); db.forEach(e => e.style.setProperty('display','none','important')); if (ur) ur.style.setProperty('display','none','important'); }
    else { if (badge) { badge.textContent = 'Guest Mode'; badge.className = 'sidebar-sign-text'; } if (btn) { btn.innerHTML = '⚙️ Sign In'; btn.classList.remove('active-control'); } he.forEach(e => e.style.setProperty('display','none','important')); db.forEach(e => e.style.setProperty('display','none','important')); if (ur) ur.style.setProperty('display','none','important'); }
}
function handleAuthModalDisplay() {
    closeActiveOverlays(); const ar = localStorage.getItem('mmk_sys_role') || 'GUEST';
    document.getElementById('globalOverlay').classList.add('active'); document.getElementById('authGateModal').classList.add('active');
    if (ar !== 'GUEST') { document.getElementById('loginFormState').style.display = 'none'; document.getElementById('logoutFormState').style.display = 'block'; document.getElementById('authActiveModeText').textContent = `Status: [ ${ar} ]`; }
    else { document.getElementById('loginFormState').style.display = 'block'; document.getElementById('logoutFormState').style.display = 'none'; document.getElementById('devKeyInput').value = ''; }
}
function processAuthVerification() { const t = document.getElementById('devKeyInput').value.trim(); if (t === TOKEN_DEVELOPER) { localStorage.setItem('mmk_sys_role','DEVELOPER'); localStorage.setItem('mmk_ever_dev','true'); alert('🔐 Developer!'); location.reload(); } else if (t === TOKEN_EXECUTIVE) { localStorage.setItem('mmk_sys_role','EXECUTIVE'); alert('🔮 Executive!'); location.reload(); } else alert('❌ Token salah!'); }
function switchRoleDirect(r) { if (localStorage.getItem('mmk_ever_dev') !== 'true') return; if (!['GUEST','EXECUTIVE','DEVELOPER'].includes(r)) return; localStorage.setItem('mmk_sys_role', r); location.reload(); }
function processAuthLogout() { localStorage.setItem('mmk_sys_role','GUEST'); alert('Keluar.'); location.reload(); }

/* ============ CLIPBOARD ============ */
async function copyFieldValue(id) { const e = document.getElementById(id); if (!e || !e.value) { alert('Kosong!'); return; } try { await navigator.clipboard.writeText(e.value); alert('Disalin!'); } catch(_) { e.select(); document.execCommand('copy'); alert('Disalin!'); } }
async function pasteFieldValue(id) { const e = document.getElementById(id); if (!e) return; try { e.value = await navigator.clipboard.readText(); } catch(_) { alert('Gagal tempel.'); } }

/* ============ HOOK BUILDER ============ */
function escapeHtml(s) { return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function onHookToggleChange() {
    const en = document.getElementById('formApkHookEnabled').checked;
    document.getElementById('hookBuilderSection').style.display = en ? 'block' : 'none';
    const b = document.getElementById('hookStatusBadge');
    if (en) { b.textContent = 'AKTIF'; b.style.background = 'rgba(168,85,247,0.2)'; b.style.color = '#a855f7'; b.style.borderColor = 'rgba(168,85,247,0.5)'; }
    else { b.textContent = 'NONAKTIF'; b.style.background = 'rgba(100,116,139,0.2)'; b.style.color = '#64748b'; b.style.borderColor = 'rgba(100,116,139,0.4)'; }
}
function setHookEnabled(e) { const c = document.getElementById('formApkHookEnabled'); if (c) c.checked = !!e; onHookToggleChange(); }
function addHookRow(d) { d = d || {}; hookRowsData.push({ fitur: d.fitur||'', className: d.className||'', methodName: d.methodName||'', type: d.type||'Z', defaultValue: d.defaultValue!=null?String(d.defaultValue):'' }); renderHookRows(); }
function removeHookRow(i) { hookRowsData.splice(i,1); renderHookRows(); }
function updateHookField(i, f, v) { if (hookRowsData[i]) { hookRowsData[i][f] = v; syncHookHiddenInput(); } }
function renderHookRows() {
    const c = document.getElementById('hookRowsContainer'); if (!c) return; c.innerHTML = '';
    if (hookRowsData.length === 0) { c.innerHTML = '<div style="text-align:center;color:var(--text-muted);font-size:0.8rem;padding:10px;border:1px dashed rgba(255,255,255,0.1);border-radius:8px;">Belum ada hook.</div>'; syncHookHiddenInput(); return; }
    hookRowsData.forEach((h, i) => {
        const r = document.createElement('div'); r.style.cssText = 'background:rgba(168,85,247,0.05);border:1px solid rgba(168,85,247,0.25);border-radius:10px;padding:10px;display:flex;flex-direction:column;gap:6px;';
        const opts = HOOK_TYPES.map(t => `<option value="${t.v}" ${h.type===t.v?'selected':''}>${t.label}</option>`).join('');
        r.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;"><strong style="color:#a855f7;font-size:0.78rem;">Hook #${i+1}</strong><button type="button" onclick="removeHookRow(${i})" style="background:rgba(239,68,68,0.15);border:1px solid #ef4444;color:#ef4444;padding:2px 8px;border-radius:5px;font-size:0.72rem;cursor:pointer;">🗑️</button></div><input type="text" placeholder="Nama Fitur" value="${escapeHtml(h.fitur)}" oninput="updateHookField(${i},'fitur',this.value)" style="background:#020205;border:1px solid rgba(168,85,247,0.3);border-radius:6px;padding:7px 10px;color:#fff;font-size:0.82rem;"><input type="text" placeholder="Class" value="${escapeHtml(h.className)}" oninput="updateHookField(${i},'className',this.value)" style="background:#020205;border:1px solid rgba(168,85,247,0.3);border-radius:6px;padding:7px 10px;color:#fff;font-size:0.82rem;font-family:monospace;"><input type="text" placeholder="Method" value="${escapeHtml(h.methodName)}" oninput="updateHookField(${i},'methodName',this.value)" style="background:#020205;border:1px solid rgba(168,85,247,0.3);border-radius:6px;padding:7px 10px;color:#fff;font-size:0.82rem;font-family:monospace;"><select onchange="updateHookField(${i},'type',this.value)" style="background:#020205;border:1px solid rgba(168,85,247,0.3);border-radius:6px;padding:7px 10px;color:#fff;font-size:0.82rem;">${opts}</select><input type="text" placeholder="Default value" value="${escapeHtml(h.defaultValue)}" oninput="updateHookField(${i},'defaultValue',this.value)" style="background:#020205;border:1px solid rgba(168,85,247,0.3);border-radius:6px;padding:7px 10px;color:#fff;font-size:0.82rem;">`;
        c.appendChild(r);
    });
    syncHookHiddenInput();
}
function syncHookHiddenInput() { const e = document.getElementById('formApkHooks'); if (e) e.value = JSON.stringify(hookRowsData); }
function loadHooksIntoForm(h, en) { hookRowsData = Array.isArray(h) ? h.map(x => ({...x})) : []; renderHookRows(); setHookEnabled(en === true); }

/* ============ OVERLAY ============ */
function closeActiveOverlays() {
    ['sidebarMenu','authGateModal','devApkFormModal','devDatabaseExportModal','devReorderModal','requestModModal','adminRequestListModal','searchPopover','dialogConfigPanelModal','dialogConfigEditModal','clearCloneModal','globalOverlay','addExecutiveMemberModal','listMemberModal','themeEditorModal'].forEach(id => { const el = document.getElementById(id); if (el) el.classList.remove('active'); });
}

/* ============ FILTER & SEARCH ============ */
function applyCategoryFilter(cat) { const items = document.querySelectorAll('.apk-card'), al = document.getElementById('searchEmptyAlert'); let tm = 0; items.forEach(b => { if (cat === 'all' || b.getAttribute('data-target-cat') === cat) { b.classList.remove('hidden'); tm++; } else b.classList.add('hidden'); }); if (al) al.style.display = tm > 0 ? 'none' : 'block'; closeActiveOverlays(); }
function executeApkSearch() {
    const q = document.getElementById('searchInput').value.toLowerCase();
    const g = document.getElementById('apkDisplayGrid'), al = document.getElementById('searchEmptyAlert'), pc = document.getElementById('loadMoreContainer');
    if (q.trim() === '') { renderGridCards(); return; }
    if (!g) return; g.innerHTML = ''; let s = false;
    internalApksData.forEach((item, i) => { if ((item.name||'').toLowerCase().includes(q)) { s = true; const card = document.createElement('div'); card.className = 'apk-card'; card.setAttribute('data-target-cat', item.category); card.setAttribute('data-target-droid', item.android); card.innerHTML = `<div class="apk-top-flex"><div class="apk-icon-frame"><img src="${item.imageUrl||''}" onerror="this.style.display='none';this.parentElement.innerHTML='${getCardDefaultIcon(item)}';"></div><div class="apk-main-info"><span class="apk-title">${item.name}</span><span class="apk-version">${item.version}</span><div class="apk-badge-row">${buildBadgeRow(item)}</div></div></div><div class="apk-desc-area">${item.description||''}</div><div class="card-action-row"><a href="${item.downloadUrl||'#'}" target="_blank" class="download-action-btn">Download</a><button class="share-action-btn" onclick="shareApkCard(${i})">🔗</button></div>`; g.appendChild(card); } });
    if (al) al.style.display = s ? 'none' : 'block';
    if (pc) pc.style.display = 'none';
}
async function shareApkCard(i) { const item = internalApksData[i]; if (!item) return; const url = `${window.location.origin}${window.location.pathname.replace(/index\.html$/,'')}/sharing.html?app=${encodeURIComponent(item.name)}`; const text = `*${item.name}*\n\`${item.version||'-'}\`\n\n${item.description||''}\n\nLink:\n> ${url}`.trim(); if (navigator.share) { try { await navigator.share({ title: item.name, text }); } catch(_) {} return; } try { await navigator.clipboard.writeText(text); alert(`🔗 Info "${item.name}" disalin!`); } catch(_) { prompt('Salin:', text); } }
function handleModderProfileModal() { alert('MMK Modder Engine\n\nLead Software Modificator\nEkosistem Aplikasi Android internal MMK Team.'); }

window.addEventListener('DOMContentLoaded', () => { initializeCatalogueEngine(); syncSecurityAccessState(); });