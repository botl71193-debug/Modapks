// ==========================================
// SCRIPT.JS BARU (OTOMATIS DIBUAT OLEH .SH)
// ==========================================
const rahasiaHTML = `
<div class="navbar">
  <div class="navbar-left"><button class="menu-toggle" onclick="handleSidebarDisplay()">☰</button></div>
  <div class="logo-box"><img class="logo" src="https://diverse-aqua-iq7wghij.edgeone.app/M.png" alt="MMK"><span class="main-title">MMK | MODS</span></div>
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
  <ul class="sidebar-menu-list"><li><div class="sidebar-item-btn" style="border-color: #0ea5e9; background: rgba(14,165,233,0.1);" onclick="openRequestModModal()">Request Mod Aplikasi</div></li></ul>
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
  <div id="logoutFormState" style="display:none; text-align:center;"><p id="authActiveModeText" style="color:var(--accent); margin-bottom:20px; font-size:0.9rem; font-weight:bold;"></p><button class="download-action-btn" style="background:#ef4444" onclick="processAuthLogout()">LOGOUT</button></div>
</div>

<div class="modal-box dev-panel-modal" id="themeEditorModal" style="max-height:92vh;overflow-y:auto;width:95%;max-width:600px;">
  <span class="modal-close-btn" onclick="closeActiveOverlays()">×</span>
  <h3 style="margin-bottom:14px;color:#fbbf24;font-size:1.15rem;border-bottom:1px solid rgba(251,191,36,0.3);padding-bottom:10px;">🎨 Dialog Theme Editor</h3>
  
  <div id="themePreviewWrapper" style="background:#000;border-radius:12px;padding:10px;margin-bottom:14px;max-height:420px;overflow-y:auto;">
    <div style="display:flex;gap:4px;margin-bottom:10px;position:sticky;top:0;background:#000;padding-bottom:8px;z-index:5;">
      <button class="preview-state-btn active" data-pstate="mode1" onclick="changePreviewState('mode1')">Mode 1</button>
      <button class="preview-state-btn" data-pstate="mode2" onclick="changePreviewState('mode2')">Mode 2</button>
      <button class="preview-state-btn" data-pstate="mode3" onclick="changePreviewState('mode3')">Mode 3</button>
      <button class="preview-state-btn" data-pstate="sigWarn" onclick="changePreviewState('sigWarn')">SigWarn</button>
    </div>
    <div id="themePreviewFrame" style="display:flex;justify-content:center;"></div>
  </div>
  
  <div class="theme-tab-bar">
    <button id="tabSimple" class="active" onclick="switchThemeTab('simple')">📝 Simpel</button>
    <button id="tabStrings" onclick="switchThemeTab('strings')">🔤 Strings</button>
    <button id="tabJson" onclick="switchThemeTab('json')">🔧 Advance</button>
  </div>

  <div id="themeSimpleTab">
    <div class="theme-section-title">🎨 Branding</div>
    <div class="form-group" style="margin-bottom:10px;"><label>App Title</label><input type="text" id="thAppTitle" oninput="renderThemePreview(currentPreviewState)" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;"></div>
    <div class="form-group" style="margin-bottom:10px;"><label>Logo URL</label><input type="text" id="thLogoUrl" oninput="renderThemePreview(currentPreviewState)" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div>
    <div class="theme-section-title">🔗 Links</div>
    <div class="form-group" style="margin-bottom:10px;"><label>Join Channel URL</label><input type="text" id="thJoinUrl" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div>
    <div class="form-group" style="margin-bottom:10px;"><label>Download Official URL</label><input type="text" id="thDownloadUrl" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div>
    <div class="theme-section-title">🔤 Fonts</div>
    <div class="form-group" style="margin-bottom:10px;"><label>Font Family (Main)</label><input type="text" id="thFontMain" placeholder="Inter" oninput="renderThemePreview(currentPreviewState)" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;"></div>
    <div class="form-group" style="margin-bottom:10px;"><label>Google Fonts URL</label><input type="text" id="thGoogleFontsUrl" placeholder="https://fonts.googleapis.com/css2?..." style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;font-size:0.75rem;"></div>
    
    <div class="theme-section-title">🎨 Warna Dasar & Teks</div>
    <div class="form-group" style="margin-bottom:10px;"><label>Background Utama</label><div class="color-input-row"><input type="color" id="thColorBg"><input type="text" id="thColorBgText" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div></div>
    <div class="form-group" style="margin-bottom:10px;"><label>Background Card / Box</label><div class="color-input-row"><input type="color" id="thColorCard"><input type="text" id="thColorCardText" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div></div>
    <div class="form-group" style="margin-bottom:10px;"><label>Card 2 (Elemen Kecil)</label><div class="color-input-row"><input type="color" id="thColorCard2"><input type="text" id="thColorCard2Text" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div></div>
    <div class="form-group" style="margin-bottom:10px;"><label>Surface (Elemen Dalam)</label><div class="color-input-row"><input type="color" id="thColorSurface"><input type="text" id="thColorSurfaceText" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div></div>
    
    <div class="theme-section-title">📝 Teks & Garis (Border)</div>
    <div class="form-group" style="margin-bottom:10px;"><label>Teks Utama (Putih)</label><div class="color-input-row"><input type="color" id="thColorText"><input type="text" id="thColorTextText" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div></div>
    <div class="form-group" style="margin-bottom:10px;"><label>Teks Redup (Dim)</label><div class="color-input-row"><input type="color" id="thColorTextDim"><input type="text" id="thColorTextDimText" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div></div>
    <div class="form-group" style="margin-bottom:10px;"><label>Teks Muted (Abu)</label><div class="color-input-row"><input type="color" id="thColorTextMuted"><input type="text" id="thColorTextMutedText" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div></div>
    <div class="form-group" style="margin-bottom:10px;"><label>Garis / Border Biasa</label><div class="color-input-row"><input type="color" id="thColorBorder"><input type="text" id="thColorBorderText" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div></div>
    <div class="form-group" style="margin-bottom:10px;"><label>Garis / Border Tebal</label><div class="color-input-row"><input type="color" id="thColorBorderStrong"><input type="text" id="thColorBorderStrongText" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div></div>

    <div class="theme-section-title">✨ Warna Aksen (Tombol & Ikon)</div>
    <div class="form-group" style="margin-bottom:10px;"><label>Accent (Primary)</label><div class="color-input-row"><input type="color" id="thColorAccent"><input type="text" id="thColorAccentText" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div></div>
    <div class="form-group" style="margin-bottom:10px;"><label>Accent 2 (Gelap)</label><div class="color-input-row"><input type="color" id="thColorAccent2"><input type="text" id="thColorAccent2Text" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div></div>
    <div class="form-group" style="margin-bottom:10px;"><label>Danger (Merah)</label><div class="color-input-row"><input type="color" id="thColorDanger"><input type="text" id="thColorDangerText" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div></div>
    <div class="form-group" style="margin-bottom:10px;"><label>Success (Hijau)</label><div class="color-input-row"><input type="color" id="thColorSuccess"><input type="text" id="thColorSuccessText" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div></div>
    <div class="form-group" style="margin-bottom:10px;"><label>Warning (Kuning)</label><div class="color-input-row"><input type="color" id="thColorWarning"><input type="text" id="thColorWarningText" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div></div>
    <div class="form-group" style="margin-bottom:10px;"><label>Hook (Ungu)</label><div class="color-input-row"><input type="color" id="thColorHook"><input type="text" id="thColorHookText" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div></div>
    <div class="form-group" style="margin-bottom:10px;"><label>Gold (Premium)</label><div class="color-input-row"><input type="color" id="thColorGold"><input type="text" id="thColorGoldText" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;font-family:monospace;"></div></div>
  </div>

  <div id="themeStringsTab" style="display:none;">
    <div class="theme-section-title">🔤 Global Display</div>
    <div class="form-group" style="margin-bottom:10px;"><label>Font Display</label><input type="text" id="thFontDisplay" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;"></div>
    <div class="form-group" style="margin-bottom:10px;"><label>Font Mono</label><input type="text" id="thFontMono" style="background:#020205;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px 12px;color:#fff;"></div>

    <details style="margin-top:12px;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:8px;padding:10px;">
      <summary style="cursor:pointer;font-weight:700;color:#3b82f6;font-size:0.85rem;">📝 Mode 1 & 2 Strings</summary>
      <div style="display:flex;flex-direction:column;gap:8px;margin-top:10px;">
        <div class="form-group"><label>Loading Text</label><input type="text" id="thTxt_loadingText" class="txt-input"></div>
        <div class="form-group"><label>Mode 1 Title</label><input type="text" id="thTxt_mode1Title" class="txt-input"></div>
        <div class="form-group"><label>Mode 1 Message</label><input type="text" id="thTxt_mode1Message" class="txt-input"></div>
        <div class="form-group"><label>Mode 1 Close Btn</label><input type="text" id="thTxt_mode1CloseBtn" class="txt-input"></div>
        <div class="form-group"><label>Mode 2 Status</label><input type="text" id="thTxt_mode2Status" class="txt-input"></div>
        <div class="form-group"><label>Mode 2 Changelog Title</label><input type="text" id="thTxt_mode2ChangelogTitle" class="txt-input"></div>
        <div class="form-group"><label>Mode 2 More Apps</label><input type="text" id="thTxt_mode2MoreApps" class="txt-input"></div>
        <div class="form-group"><label>Mode 2 More Btn</label><input type="text" id="thTxt_mode2MoreBtn" class="txt-input"></div>
        <div class="form-group"><label>Mode 2 Less Btn</label><input type="text" id="thTxt_mode2LessBtn" class="txt-input"></div>
        <div class="form-group"><label>Mode 2 Hook Btn</label><input type="text" id="thTxt_mode2HookBtn" class="txt-input"></div>
        <div class="form-group"><label>Mode 2 Join Btn</label><input type="text" id="thTxt_mode2JoinBtn" class="txt-input"></div>
        <div class="form-group"><label>Mode 2 Close Btn</label><input type="text" id="thTxt_mode2CloseBtn" class="txt-input"></div>
      </div>
    </details>

    <details style="margin-top:8px;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:8px;padding:10px;">
      <summary style="cursor:pointer;font-weight:700;color:#f43f5e;font-size:0.85rem;">📝 Mode 3 Strings</summary>
      <div style="display:flex;flex-direction:column;gap:8px;margin-top:10px;">
        <div class="form-group"><label>Status</label><input type="text" id="thTxt_mode3Status" class="txt-input"></div>
        <div class="form-group"><label>Banner Title</label><input type="text" id="thTxt_mode3BannerTitle" class="txt-input"></div>
        <div class="form-group"><label>Banner Msg</label><input type="text" id="thTxt_mode3BannerMsg" class="txt-input"></div>
        <div class="form-group"><label>Changelog Title</label><input type="text" id="thTxt_mode3ChangelogTitle" class="txt-input"></div>
        <div class="form-group"><label>Update Btn</label><input type="text" id="thTxt_mode3UpdateBtn" class="txt-input"></div>
        <div class="form-group"><label>Update V2 Btn</label><input type="text" id="thTxt_mode3UpdateV2Btn" class="txt-input"></div>
        <div class="form-group"><label>More Apps</label><input type="text" id="thTxt_mode3MoreApps" class="txt-input"></div>
        <div class="form-group"><label>Hook Btn</label><input type="text" id="thTxt_mode3HookBtn" class="txt-input"></div>
        <div class="form-group"><label>Join Btn</label><input type="text" id="thTxt_mode3JoinBtn" class="txt-input"></div>
        <div class="form-group"><label>Close FC Btn</label><input type="text" id="thTxt_mode3CloseFCBtn" class="txt-input"></div>
        <div class="form-group"><label>Close Btn</label><input type="text" id="thTxt_mode3CloseBtn" class="txt-input"></div>
      </div>
    </details>

    <details style="margin-top:8px;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:8px;padding:10px;">
      <summary style="cursor:pointer;font-weight:700;color:#eab308;font-size:0.85rem;">📝 Security & Premium Strings</summary>
      <div style="display:flex;flex-direction:column;gap:8px;margin-top:10px;">
        <div class="form-group"><label>SigWarn Title</label><input type="text" id="thTxt_sigWarnTitle" class="txt-input"></div>
        <div class="form-group"><label>SigWarn Subtitle</label><input type="text" id="thTxt_sigWarnSubtitle" class="txt-input"></div>
        <div class="form-group"><label>SigWarn Status</label><input type="text" id="thTxt_sigWarnStatus" class="txt-input"></div>
        <div class="form-group"><label>SigWarn Info Title</label><input type="text" id="thTxt_sigWarnInfoTitle" class="txt-input"></div>
        <div class="form-group"><label>SigWarn Info Text</label><textarea id="thTxt_sigWarnInfoText" rows="2" class="txt-input"></textarea></div>
        <div class="form-group"><label>SigWarn List 1</label><input type="text" id="thTxt_sigWarnList1" class="txt-input"></div>
        <div class="form-group"><label>SigWarn List 2</label><input type="text" id="thTxt_sigWarnList2" class="txt-input"></div>
        <div class="form-group"><label>SigWarn List 3</label><input type="text" id="thTxt_sigWarnList3" class="txt-input"></div>
        <div class="form-group"><label>SigWarn Join Btn</label><input type="text" id="thTxt_sigWarnJoinBtn" class="txt-input"></div>
        <div class="form-group"><label>SigWarn Download Btn</label><input type="text" id="thTxt_sigWarnDownloadBtn" class="txt-input"></div>
        <div class="form-group"><label>Premium Title</label><input type="text" id="thTxt_premiumTitle" class="txt-input"></div>
        <div class="form-group"><label>Premium Subtitle</label><input type="text" id="thTxt_premiumSubtitle" class="txt-input"></div>
        <div class="form-group"><label>Premium Status</label><input type="text" id="thTxt_premiumStatus" class="txt-input"></div>
        <div class="form-group"><label>Premium Info Title</label><input type="text" id="thTxt_premiumInfoTitle" class="txt-input"></div>
        <div class="form-group"><label>Premium Info Text</label><textarea id="thTxt_premiumInfoText" rows="2" class="txt-input"></textarea></div>
        <div class="form-group"><label>Premium Placeholder</label><input type="text" id="thTxt_premiumPlaceholder" class="txt-input"></div>
        <div class="form-group"><label>Premium Cancel Btn</label><input type="text" id="thTxt_premiumCancelBtn" class="txt-input"></div>
        <div class="form-group"><label>Premium Verify Btn</label><input type="text" id="thTxt_premiumVerifyBtn" class="txt-input"></div>
      </div>
    </details>

    <details style="margin-top:8px;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:8px;padding:10px;">
      <summary style="cursor:pointer;font-weight:700;color:#a855f7;font-size:0.85rem;">📝 Hook & Crash Strings</summary>
      <div style="display:flex;flex-direction:column;gap:8px;margin-top:10px;">
        <div class="form-group"><label>Hook Title</label><input type="text" id="thTxt_hookTitle" class="txt-input"></div>
        <div class="form-group"><label>Hook Status</label><input type="text" id="thTxt_hookStatus" class="txt-input"></div>
        <div class="form-group"><label>Hook Empty Title</label><input type="text" id="thTxt_hookEmptyTitle" class="txt-input"></div>
        <div class="form-group"><label>Hook Empty Text</label><input type="text" id="thTxt_hookEmptyText" class="txt-input"></div>
        <div class="form-group"><label>Hook Back Btn</label><input type="text" id="thTxt_hookBackBtn" class="txt-input"></div>
        <div class="form-group"><label>Hook Save Btn</label><input type="text" id="thTxt_hookSaveBtn" class="txt-input"></div>
        <div class="form-group"><label>Crash Title</label><input type="text" id="thTxt_crashTitle" class="txt-input"></div>
        <div class="form-group"><label>Crash File Count</label><input type="text" id="thTxt_crashFileCount" class="txt-input"></div>
        <div class="form-group"><label>Crash Empty Title</label><input type="text" id="thTxt_crashEmptyTitle" class="txt-input"></div>
        <div class="form-group"><label>Crash Empty Text</label><input type="text" id="thTxt_crashEmptyText" class="txt-input"></div>
        <div class="form-group"><label>Crash Back Btn</label><input type="text" id="thTxt_crashBackBtn" class="txt-input"></div>
        <div class="form-group"><label>Crash Copy Btn</label><input type="text" id="thTxt_crashCopyBtn" class="txt-input"></div>
        <div class="form-group"><label>Crash Clear Btn</label><input type="text" id="thTxt_crashClearBtn" class="txt-input"></div>
        <div class="form-group"><label>Crash Close Btn</label><input type="text" id="thTxt_crashCloseBtn" class="txt-input"></div>
        <div class="form-group"><label>Crash View Btn</label><input type="text" id="thTxt_crashViewBtn" class="txt-input"></div>
        <div class="form-group"><label>Crash Status</label><input type="text" id="thTxt_crashStatus" class="txt-input"></div>
      </div>
    </details>
  </div>

  <div id="themeJsonTab" style="display:none;">
    <p style="font-size:0.75rem;color:var(--text-muted);margin-bottom:10px;line-height:1.5;">Edit JSON lengkap. Gunakan <code style="background:rgba(0,0,0,0.5);padding:2px 6px;border-radius:4px;">{version}</code> untuk placeholder versi APK.</p>
    <textarea id="themeJsonTextarea" rows="20" style="width:100%;font-family:'Courier New',monospace;font-size:0.72rem;color:#67e8f9;background:#010208;border:1px solid rgba(59,130,246,0.3);border-radius:8px;padding:10px;line-height:1.4;"></textarea>
    <button class="download-action-btn" style="margin-top:10px;background:#fbbf24;" onclick="resetThemeDefaults()">↺ Reset ke Default</button>
  </div>
  
  <div class="form-btn-row" style="margin-top:20px;">
    <button class="download-action-btn" style="background:#334155;" onclick="closeActiveOverlays()">BATAL</button>
    <button class="download-action-btn" style="background:#fbbf24;" onclick="saveThemeSettings()">💾 SIMPAN</button>
  </div>
</div>

<!-- MODAL LAINNYA (Disingkat agar tidak kepanjangan, aslinya tetap ada) -->
<div class="modal-box dev-panel-modal" id="devApkFormModal">
  <span class="modal-close-btn" onclick="closeActiveOverlays()">×</span>
  <h3 id="formModalTitle" style="margin-bottom: 15px; color:#fff; font-size: 1.15rem; border-bottom: 1px solid rgba(244,63,94,0.2); padding-bottom: 10px;">➕</h3>
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
    <div class="form-group"><label>URL Gambar / Ikon APK</label><div class="pena-upload-wrapper"><input type="text" id="formApkImg" placeholder="https://..."><button class="action-trigger-btn" style="background: rgba(14,165,233,0.15); border-color: #0ea5e9;" onclick="copyFieldValue('formApkImg')">📄 COPY</button><button class="action-trigger-btn" onclick="pasteFieldValue('formApkImg')">📋 PASTE</button></div></div>
    <div class="form-group"><label>URL Download Shorturl (Update V1)</label><div class="pena-upload-wrapper"><input type="text" id="formApkLink" placeholder="https://adssafelink/..."><button class="action-trigger-btn" style="background: rgba(14,165,233,0.15); border-color: #0ea5e9;" onclick="copyFieldValue('formApkLink')">📄 COPY</button><button class="action-trigger-btn" style="background: rgba(168,85,247,0.15); border-color: #a855f7;" onclick="pasteFieldValue('formApkLink')">📋 PASTE</button></div></div>
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
  <div class="form-btn-row"><button class="download-action-btn" style="background:#334155;" onclick="closeActiveOverlays()">CANCEL</button><button class="download-action-btn" style="background:var(--dev-color);" onclick="saveApkFormSubmission()">UPLOAD</button></div>
</div>

<div class="container" id="mainContainer">
  <div class="welcome-header"><p>Premium Modded Applications Database</p><button class="download-action-btn dev-only-block" style="max-width:250px; background: var(--dev-color);" onclick="openAddApkFormModal()">➕ TAMBAH DATA APK BARU</button></div>
  <div class="apk-grid" id="apkDisplayGrid"></div>
  <div id="loadMoreContainer" style="text-align: center; margin-top: 25px; display: none;"></div>
  <div class="no-results-alert" id="searchEmptyAlert">❌ Berkas Mod tidak ditemukan.</div>
  <div class="footer-notice"><p style="color:var(--text-muted); font-size:0.85rem;">Platform Architecture Crafted By <strong>Khenzo</strong></p><div class="notice-danger-card">⚠️ PERINGATAN: SELURUH LAYANAN MMK 100% GRATIS!</div></div>
</div>

<div class="floating-profile-trigger" onclick="handleModderProfileModal()">👤</div>
`;

document.body.insertAdjacentHTML('afterbegin', rahasiaHTML);

/* ============ DEFAULT THEME ============ */
const DEFAULT_THEME = {
    appTitle: "UPDATE FULL CONTROLLER", logoUrl: "https://i.ibb.co.com/fdKWDJJT/image.webp",
    joinUrl: "https://whatsapp.com/channel/0029Vb7vQrL1yT22MFrBrR42", downloadUrl: "https://whatsapp.com/channel/0029Vb7vQrL1yT22MFrBrR42",
    fontMain: "Inter", googleFontsUrl: "https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap",
    colorBg: "#000000", colorCard: "#000000", colorCard2: "#0d1520", colorSurface: "#111827",
    colorBorder: "rgba(255,255,255,0.08)", colorBorderStrong: "rgba(255,255,255,0.15)",
    colorText: "#f1f5f9", colorTextDim: "#94a3b8", colorTextMuted: "#64748b",
    colorAccent: "#3b82f6", colorAccent2: "#2563eb", colorDanger: "#f43f5e", colorDanger2: "#be123c", colorSuccess: "#10b981", colorWarning: "#f59e0b", colorHook: "#a855f7", colorGold: "#eab308",
    fontDisplay: "Space Grotesk", fontMono: "JetBrains Mono",
    text: {
        loadingText: "Memeriksa pembaruan...", mode1Title: "Tidak Terdaftar", mode1Message: "Aplikasi tidak ditemukan dalam database pembaruan.", mode1CloseBtn: "Tutup (FC)",
        mode2Status: "Latest", mode2ChangelogTitle: "Changelog", mode2MoreApps: "More Apps", mode2MoreBtn: "More", mode2LessBtn: "Less", mode2HookBtn: "Hook", mode2JoinBtn: "Join", mode2CloseBtn: "Tutup",
        mode3Status: "Update", mode3BannerTitle: "Update Tersedia", mode3BannerMsg: "Versi {version} siap diunduh", mode3ChangelogTitle: "Yang Baru", mode3UpdateBtn: "Update ke {version}", mode3UpdateV2Btn: "👑 Update V2 (Direct)", mode3MoreApps: "More Apps", mode3HookBtn: "Hook", mode3JoinBtn: "Join", mode3CloseFCBtn: "Tutup (FC)", mode3CloseBtn: "Tutup",
        sigWarnTitle: "Security Warning", sigWarnSubtitle: "Invalid App Signature", sigWarnStatus: "Locked", sigWarnInfoTitle: "Signature Mismatch", sigWarnInfoText: "Aplikasi ini tidak cocok dengan rilis resmi MMK | MODS. Perangkat Anda mungkin berisiko.", sigWarnList1: "Hentikan penggunaan sekarang", sigWarnList2: "Hapus aplikasi ini dari perangkat", sigWarnList3: "Unduh versi resmi dari channel", sigWarnJoinBtn: "Join", sigWarnDownloadBtn: "Download Official",
        premiumTitle: "Premium Access", premiumSubtitle: "Verifikasi ID Premium", premiumStatus: "Locked", premiumInfoTitle: "Masukkan Device ID", premiumInfoText: "8 digit ID yang terdaftar di database premium untuk akses link download langsung (tanpa shorturl)", premiumPlaceholder: "12345678", premiumCancelBtn: "Batal", premiumVerifyBtn: "👑 Verifikasi",
        hookTitle: "Hook Configurator", hookStatus: "Active", hookEmptyTitle: "Tidak Ada Hook", hookEmptyText: "APK ini belum punya konfigurasi hook.", hookBackBtn: "Kembali", hookSaveBtn: "Simpan",
        crashTitle: "Crash Logs", crashFileCount: "file ditemukan", crashEmptyTitle: "Tidak ada crash", crashEmptyText: "Tidak ditemukan file crash log di perangkat ini.", crashBackBtn: "Kembali", crashCopyBtn: "Copy", crashClearBtn: "Hapus", crashCloseBtn: "Tutup", crashViewBtn: "Lihat", crashStatus: "Debug"
    }
};

const TEXT_KEYS = ['loadingText', 'mode1Title', 'mode1Message', 'mode1CloseBtn', 'mode2Status', 'mode2ChangelogTitle', 'mode2MoreApps', 'mode2MoreBtn', 'mode2LessBtn', 'mode2HookBtn', 'mode2JoinBtn', 'mode2CloseBtn', 'mode3Status', 'mode3BannerTitle', 'mode3BannerMsg', 'mode3ChangelogTitle', 'mode3UpdateBtn', 'mode3UpdateV2Btn', 'mode3MoreApps', 'mode3HookBtn', 'mode3JoinBtn', 'mode3CloseFCBtn', 'mode3CloseBtn', 'sigWarnTitle', 'sigWarnSubtitle', 'sigWarnStatus', 'sigWarnInfoTitle', 'sigWarnInfoText', 'sigWarnList1', 'sigWarnList2', 'sigWarnList3', 'sigWarnJoinBtn', 'sigWarnDownloadBtn', 'premiumTitle', 'premiumSubtitle', 'premiumStatus', 'premiumInfoTitle', 'premiumInfoText', 'premiumPlaceholder', 'premiumCancelBtn', 'premiumVerifyBtn', 'hookTitle', 'hookStatus', 'hookEmptyTitle', 'hookEmptyText', 'hookBackBtn', 'hookSaveBtn', 'crashTitle', 'crashFileCount', 'crashEmptyTitle', 'crashEmptyText', 'crashBackBtn', 'crashCopyBtn', 'crashClearBtn', 'crashCloseBtn', 'crashViewBtn', 'crashStatus'];

/* ============ STATE ============ */
let internalApksData = [], apksHistory = [], currentHistoryIndex = -1, pendingCloneRemovals = [];
let currentPage = 1; const itemsPerPage = 8; let hookRowsData = [];
let currentTheme = JSON.parse(JSON.stringify(DEFAULT_THEME));
let currentPreviewState = 'mode2';
const HOOK_TYPES = [{v:'Z',label:'Z'},{v:'B',label:'B'},{v:'S',label:'S'},{v:'I',label:'I'},{v:'J',label:'J'},{v:'F',label:'F'},{v:'D',label:'D'},{v:'Ljava/lang/String;',label:'String'}];
const DEFAULT_DIALOG_CONFIG = { signCheck: true, btnMode: false, crashLog: false, forceCloseOnUpdate: true };
const TOKEN_EXECUTIVE = "-..- . -.-. ..- - .. ...-"; const TOKEN_DEVELOPER = "--- .-- -. . .-. / -- -- -.-"; const DEVICE_ID_KEY = 'mmk_device_id'; const THEME_KEY = 'mmk_dialog_theme';

/* ============ FUNCTIONS (Disingkat agar script tetap jalan) ============ */
function ensureDeviceId() { let id = localStorage.getItem(DEVICE_ID_KEY); if (!id || id.length !== 8 || !/^\d{8}$/.test(id)) { id = String(Math.floor(10000000 + Math.random() * 90000000)); localStorage.setItem(DEVICE_ID_KEY, id); } return id; }
function displayDeviceId() { const el = document.getElementById('userDeviceId'); if (el) { const id = ensureDeviceId(); el.textContent = id; el.setAttribute('data-id', id); } }
function copyDeviceId() { const el = document.getElementById('userDeviceId'); if (!el) return; const id = el.getAttribute('data-id') || ensureDeviceId(); if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(id).then(() => showCopySuccess(el)).catch(() => fallbackCopyId(el, id)); } else fallbackCopyId(el, id); }
function fallbackCopyId(el, text) { try { const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); showCopySuccess(el); } catch (e) { alert('ID: ' + text); } }
function showCopySuccess(el) { el.classList.add('copied'); const old = el.textContent; el.textContent = '✓ Copied!'; setTimeout(() => { el.classList.remove('copied'); el.textContent = old; }, 1200); }
function fillMyDeviceId() { const id = ensureDeviceId(); const input = document.getElementById('execMemberId'); if (input) { input.value = id; input.style.borderColor = '#10b981'; setTimeout(() => { input.style.borderColor = ''; }, 1500); } }

function pushHistoryState() { if (currentHistoryIndex < apksHistory.length - 1) apksHistory = apksHistory.slice(0, currentHistoryIndex + 1); apksHistory.push(JSON.parse(JSON.stringify(internalApksData))); currentHistoryIndex++; }
function undoDeveloperAction() { if (currentHistoryIndex > 0) { currentHistoryIndex--; internalApksData = JSON.parse(JSON.stringify(apksHistory[currentHistoryIndex])); localStorage.setItem('mmk_local_apks', JSON.stringify(internalApksData)); renderGridCards(); } }
function redoDeveloperAction() { if (currentHistoryIndex < apksHistory.length - 1) { currentHistoryIndex++; internalApksData = JSON.parse(JSON.stringify(apksHistory[currentHistoryIndex])); localStorage.setItem('mmk_local_apks', JSON.stringify(internalApksData)); renderGridCards(); } }

function mergeTheme(custom) { const merged = JSON.parse(JSON.stringify(DEFAULT_THEME)); Object.keys(custom).forEach(k => { if (k === 'text' && typeof custom.text === 'object') { Object.keys(custom.text).forEach(tk => { merged.text[tk] = custom.text[tk]; }); } else if (custom[k] !== undefined) merged[k] = custom[k]; }); return merged; }

function initializeCatalogueEngine() {
    const grid = document.getElementById('apkDisplayGrid'); if (!grid) return;
    const saved = localStorage.getItem('mmk_local_apks');
    if (saved) internalApksData = JSON.parse(saved); else if (typeof apks !== 'undefined') internalApksData = apks; else internalApksData = [];
    if (typeof premiumUsers !== 'undefined' && Array.isArray(premiumUsers)) localStorage.setItem('mmk_users', JSON.stringify(premiumUsers));
    if (typeof dialogTheme !== 'undefined' && dialogTheme && typeof dialogTheme === 'object') { currentTheme = mergeTheme(dialogTheme); localStorage.setItem(THEME_KEY, JSON.stringify(currentTheme)); }
    else { const savedTheme = localStorage.getItem(THEME_KEY); if (savedTheme) try { currentTheme = mergeTheme(JSON.parse(savedTheme)); } catch(e) {} }
    currentPage = 1; displayDeviceId(); renderGridCards(); apksHistory = []; currentHistoryIndex = -1; pushHistoryState();
}

function getThemeFromFormNow() {
    const newTheme = JSON.parse(JSON.stringify(currentTheme));
    const getVal = (id) => { const el = document.getElementById(id); return el ? el.value.trim() : ''; };
    newTheme.appTitle = getVal('thAppTitle') || 'Update Center'; newTheme.logoUrl = getVal('thLogoUrl'); newTheme.joinUrl = getVal('thJoinUrl'); newTheme.downloadUrl = getVal('thDownloadUrl'); newTheme.fontMain = getVal('thFontMain') || 'Inter'; newTheme.googleFontsUrl = getVal('thGoogleFontsUrl');
    newTheme.colorBg = getVal('thColorBgText') || '#000000'; newTheme.colorCard = getVal('thColorCardText') || '#000000'; newTheme.colorCard2 = getVal('thColorCard2Text') || '#0d1520'; newTheme.colorSurface = getVal('thColorSurfaceText') || '#111827'; newTheme.colorBorder = getVal('thColorBorderText') || 'rgba(255,255,255,0.08)'; newTheme.colorBorderStrong = getVal('thColorBorderStrongText') || 'rgba(255,255,255,0.15)'; newTheme.colorText = getVal('thColorTextText') || '#f1f5f9'; newTheme.colorTextDim = getVal('thColorTextDimText') || '#94a3b8'; newTheme.colorTextMuted = getVal('thColorTextMutedText') || '#64748b';
    newTheme.colorAccent = getVal('thColorAccentText') || '#3b82f6'; newTheme.colorAccent2 = getVal('thColorAccent2Text') || '#2563eb'; newTheme.colorDanger = getVal('thColorDangerText') || '#f43f5e'; newTheme.colorSuccess = getVal('thColorSuccessText') || '#10b981'; newTheme.colorWarning = getVal('thColorWarningText') || '#f59e0b'; newTheme.colorHook = getVal('thColorHookText') || '#a855f7'; newTheme.colorGold = getVal('thColorGoldText') || '#eab308';
    newTheme.fontDisplay = getVal('thFontDisplay'); newTheme.fontMono = getVal('thFontMono');
    if (!newTheme.text) newTheme.text = {}; TEXT_KEYS.forEach(k => { const el = document.getElementById('thTxt_' + k); if (el) newTheme.text[k] = el.value; });
    return newTheme;
}

function changePreviewState(state) { currentPreviewState = state; document.querySelectorAll('.preview-state-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-pstate') === state)); renderThemePreview(state); }
function renderThemePreview(state) {
    const frame = document.getElementById('themePreviewFrame'); if (!frame) return; const theme = getThemeFromFormNow();
    frame.style.setProperty('--bg', theme.colorBg); frame.style.setProperty('--card', theme.colorCard); frame.style.setProperty('--accent', theme.colorAccent); frame.style.setProperty('--danger', theme.colorDanger); frame.style.setProperty('--success', theme.colorSuccess); frame.style.setProperty('--warning', theme.colorWarning); frame.style.setProperty('--hook', theme.colorHook); frame.style.setProperty('--gold', theme.colorGold); frame.style.setProperty('--border', theme.colorBorder); frame.style.setProperty('--border-strong', theme.colorBorderStrong); frame.style.setProperty('--text', theme.colorText); frame.style.setProperty('--text-dim', theme.colorTextDim); frame.style.setProperty('--text-muted', theme.colorTextMuted);
    frame.style.fontFamily = "'" + theme.fontMain + "', system-ui, sans-serif"; frame.innerHTML = buildPreviewCard(state, theme);
}
function buildPreviewCard(state, theme) {
    const txt = theme.text || {}; const T = (k, fb) => (txt[k] || fb); const logoUrl = theme.logoUrl || 'https://i.ibb.co.com/fdKWDJJT/image.webp'; const appName = 'My App Premium', version = 'v2.5.4', oldVersion = 'v2.0.0', pkg = 'com.myapp.premium';
    if (state === 'mode1') return `<div class="theme-prev-card yellow-accent"><div class="theme-prev-header"><div class="theme-prev-logo"><img src="${logoUrl}" onerror="this.style.display='none'"><div class="theme-prev-badge warn">?</div></div><div class="theme-prev-info-block"><div class="theme-prev-title">${appName}</div><div class="theme-prev-meta">${version} • ${pkg}</div></div><div class="theme-prev-pill warn">Unknown</div></div><div class="theme-prev-info-box"><div class="theme-prev-info-icon">⚠</div><div class="theme-prev-info-title">${T('mode1Title','Tidak Terdaftar')}</div><div class="theme-prev-info-desc">${T('mode1Message','Aplikasi tidak ditemukan dalam database pembaruan.')}</div></div><button class="theme-prev-btn danger" style="width:100%;">${T('mode1CloseBtn','Tutup (FC)')}</button></div>`;
    if (state === 'mode2') return `<div class="theme-prev-card green-accent"><div class="theme-prev-header"><div class="theme-prev-logo"><img src="${logoUrl}" onerror="this.style.display='none'"><div class="theme-prev-badge success">✓</div></div><div class="theme-prev-info-block"><div class="theme-prev-title">${appName}</div><div class="theme-prev-meta">${version} • ${pkg}</div></div><div class="theme-prev-pill success">${T('mode2Status','Latest')}</div></div><div class="theme-prev-section-title">${T('mode2ChangelogTitle','Changelog')}</div><div class="theme-prev-changelog"><div>Fix bug</div><div>New UI</div><div>Android 14 support</div></div><button class="theme-prev-more">${T('mode2MoreBtn','More')}</button><button class="theme-prev-moreapp">${T('mode2MoreApps','More Apps')}</button><div class="theme-prev-btnrow"><button class="theme-prev-btn hook">${T('mode2HookBtn','Hook')}</button><button class="theme-prev-btn ghost">${T('mode2JoinBtn','Join')}</button><button class="theme-prev-btn primary">${T('mode2CloseBtn','Tutup')}</button></div></div>`;
    if (state === 'mode3') return `<div class="theme-prev-card red-accent"><div class="theme-prev-header"><div class="theme-prev-logo"><img src="${logoUrl}" onerror="this.style.display='none'"><div class="theme-prev-badge danger">!</div></div><div class="theme-prev-info-block"><div class="theme-prev-title">${appName}</div><div class="theme-prev-meta"><span class="dim">${oldVersion}</span> → <span class="success">${version}</span></div></div><div class="theme-prev-pill danger">${T('mode3Status','Update')}</div></div><div class="theme-prev-banner"><div class="theme-prev-banner-icon">⬇</div><div><div class="theme-prev-banner-title">${T('mode3BannerTitle','Update Tersedia')}</div><div class="theme-prev-banner-msg">${T('mode3BannerMsg','Versi {version} siap diunduh').replace(/\{version\}/g, version)}</div></div></div><button class="theme-prev-btn primary" style="width:100%;">${T('mode3UpdateBtn','Update ke {version}').replace(/\{version\}/g, version)}</button><button class="theme-prev-btn gold" style="width:100%;margin-top:8px;">${T('mode3UpdateV2Btn','Update V2 (Direct)')}</button><div class="theme-prev-btnrow" style="margin-top:8px;"><button class="theme-prev-btn hook">${T('mode3HookBtn','Hook')}</button><button class="theme-prev-btn ghost">${T('mode3JoinBtn','Join')}</button><button class="theme-prev-btn danger">${T('mode3CloseFCBtn','Tutup (FC)')}</button></div></div>`;
    if (state === 'sigWarn') return `<div class="theme-prev-card red-accent"><div class="theme-prev-header"><div class="theme-prev-logo"><div class="theme-prev-icon-big">⚠</div><div class="theme-prev-badge danger">!</div></div><div class="theme-prev-info-block"><div class="theme-prev-title">${T('sigWarnTitle','Security Warning')}</div><div class="theme-prev-meta danger">${T('sigWarnSubtitle','Invalid App Signature')}</div></div><div class="theme-prev-pill danger">${T('sigWarnStatus','Locked')}</div></div><div class="theme-prev-info-box danger-border"><div class="theme-prev-info-icon danger">⚠</div><div class="theme-prev-info-title danger">${T('sigWarnInfoTitle','Signature Mismatch')}</div><div class="theme-prev-info-desc">${T('sigWarnInfoText','Aplikasi ini tidak cocok dengan rilis resmi.')}</div></div><div class="theme-prev-btnrow"><button class="theme-prev-btn ghost">${T('sigWarnJoinBtn','Join')}</button><button class="theme-prev-btn primary">${T('sigWarnDownloadBtn','Download Official')}</button></div></div>`;
    return '';
}

let currentThemeTab = 'simple';
function switchThemeTab(tab) { currentThemeTab = tab; document.getElementById('themeSimpleTab').style.display = tab === 'simple' ? 'block' : 'none'; document.getElementById('themeStringsTab').style.display = tab === 'strings' ? 'block' : 'none'; document.getElementById('themeJsonTab').style.display = tab === 'json' ? 'block' : 'none'; document.getElementById('tabSimple').classList.toggle('active', tab === 'simple'); document.getElementById('tabStrings').classList.toggle('active', tab === 'strings'); document.getElementById('tabJson').classList.toggle('active', tab === 'json'); if (tab === 'json') document.getElementById('themeJsonTextarea').value = JSON.stringify(currentTheme, null, 4); }
function openThemeEditor() {
    closeActiveOverlays(); const t = currentTheme;
    document.getElementById('thAppTitle').value = t.appTitle || ''; document.getElementById('thLogoUrl').value = t.logoUrl || ''; document.getElementById('thJoinUrl').value = t.joinUrl || ''; document.getElementById('thDownloadUrl').value = t.downloadUrl || ''; document.getElementById('thFontMain').value = t.fontMain || ''; document.getElementById('thGoogleFontsUrl').value = t.googleFontsUrl || '';
    setColorPair('thColorBg', t.colorBg); setColorPair('thColorCard', t.colorCard); setColorPair('thColorCard2', t.colorCard2); setColorPair('thColorSurface', t.colorSurface); setColorPair('thColorBorder', t.colorBorder); setColorPair('thColorBorderStrong', t.colorBorderStrong); setColorPair('thColorText', t.colorText); setColorPair('thColorTextDim', t.colorTextDim); setColorPair('thColorTextMuted', t.colorTextMuted); setColorPair('thColorAccent', t.colorAccent); setColorPair('thColorAccent2', t.colorAccent2); setColorPair('thColorDanger', t.colorDanger); setColorPair('thColorSuccess', t.colorSuccess); setColorPair('thColorWarning', t.colorWarning); setColorPair('thColorHook', t.colorHook); setColorPair('thColorGold', t.colorGold);
    document.getElementById('thFontDisplay').value = t.fontDisplay || ''; document.getElementById('thFontMono').value = t.fontMono || '';
    TEXT_KEYS.forEach(k => { const el = document.getElementById('thTxt_' + k); if (el) el.value = (t.text && t.text[k] !== undefined) ? t.text[k] : ''; });
    document.getElementById('themeJsonTextarea').value = JSON.stringify(t, null, 4); switchThemeTab('simple'); document.getElementById('globalOverlay').classList.add('active'); document.getElementById('themeEditorModal').classList.add('active'); setTimeout(() => { renderThemePreview(currentPreviewState); }, 80);
}
function setColorPair(idPrefix, value) { const hex = normalizeHex(value || '#000000'); const colorEl = document.getElementById(idPrefix); const textEl = document.getElementById(idPrefix + 'Text'); if (colorEl) colorEl.value = hex; if (textEl) textEl.value = value || hex; if (colorEl) colorEl.oninput = () => { if (textEl) textEl.value = colorEl.value; renderThemePreview(currentPreviewState); }; if (textEl) textEl.oninput = () => { const v = normalizeHex(textEl.value); if (v && colorEl) colorEl.value = v; renderThemePreview(currentPreviewState); }; }
function normalizeHex(v) { if (!v) return '#000000'; v = String(v).trim(); if (v.match(/^#[0-9a-fA-F]{6}$/)) return v; if (v.match(/^[0-9a-fA-F]{6}$/)) return '#' + v; return '#000000'; }
function saveThemeSettings() { let newTheme; if (currentThemeTab === 'json') { try { newTheme = JSON.parse(document.getElementById('themeJsonTextarea').value); } catch(err) { alert('❌ JSON tidak valid: ' + err.message); return; } } else { newTheme = getThemeFromFormNow(); } currentTheme = mergeTheme(newTheme); localStorage.setItem(THEME_KEY, JSON.stringify(currentTheme)); alert('✅ Theme tersimpan.'); closeActiveOverlays(); }
function resetThemeDefaults() { if (!confirm('Reset semua ke default?')) return; currentTheme = JSON.parse(JSON.stringify(DEFAULT_THEME)); document.getElementById('themeJsonTextarea').value = JSON.stringify(currentTheme, null, 4); alert('✅ Di-reset. Tap SIMPAN untuk apply.'); }

function buildBadgeRow(item) { const hb = (Array.isArray(item.hooks) && item.hooks.length > 0 && item.hookEnabled !== false) ? `<span class="apk-badge" style="background:rgba(168,85,247,0.15);border-color:#a855f7;color:#a855f7;">⚡ ${item.hooks.length}</span>` : ''; const cb = (item.dialogConfig) ? `<span class="apk-badge" style="background:rgba(59,130,246,0.15);border-color:#3b82f6;color:#3b82f6;">⚙️ Cfg</span>` : ''; return `<span class="apk-badge">💾 ${item.size||'0 MB'}</span><span class="apk-badge">🤖 ${item.android||'5.0+'}</span><span class="apk-badge">📁 ${item.category||'General'}</span>${hb}${cb}`; }
function getCardDefaultIcon(item) { if (item.category === 'Streaming') return '🎬'; if (item.category === 'Games Mod') return '🎮'; if (item.category === 'Music') return '🎵'; if (item.category === 'Tools') return '🛠️'; return '📱'; }
function renderGridCards() {
    const grid = document.getElementById('apkDisplayGrid'), pag = document.getElementById('loadMoreContainer'), al = document.getElementById('searchEmptyAlert'); if (!grid) return; grid.innerHTML = '';
    if (internalApksData.length === 0) { if(al) al.style.display = 'block'; if(pag) pag.style.display = 'none'; return; } else if(al) al.style.display = 'none';
    const totalPages = Math.ceil(internalApksData.length / itemsPerPage); if (currentPage > totalPages) currentPage = totalPages || 1;
    const start = (currentPage - 1) * itemsPerPage; const slice = internalApksData.slice(start, start + itemsPerPage);
    slice.forEach((item, rel) => {
        const idx = start + rel; const card = document.createElement('div'); card.className = 'apk-card'; card.setAttribute('data-target-cat', item.category); card.setAttribute('data-target-droid', item.android);
        card.innerHTML = `<div class="apk-top-flex"><div class="apk-icon-frame"><img src="${item.imageUrl||''}" onerror="this.style.display='none';this.parentElement.innerHTML='${getCardDefaultIcon(item)}';"></div><div class="apk-main-info"><span class="apk-title">${item.name||'No Name'}</span><span class="apk-version">${item.version||''}</span><div class="apk-badge-row">${buildBadgeRow(item)}</div></div></div><div class="apk-desc-area">${item.description||'Tidak ada deskripsi.'}</div><div class="card-action-row"><a href="${item.downloadUrl||'#'}" target="_blank" class="download-action-btn"> UNDUH </a><button class="share-action-btn" onclick="shareApkCard(${idx})">🔗</button></div>`;
        grid.appendChild(card);
    });
    if (pag) { if (totalPages > 1) { pag.style.display = 'block'; let html = '<div style="display:flex;justify-content:center;gap:6px;flex-wrap:wrap;">'; for (let i=1;i<=totalPages;i++) { const a = i===currentPage; html += `<button style="${a?'background:#0ea5e9;color:#fff;border-color:#0ea5e9;':'background:rgba(14,165,233,0.15);color:#0ea5e9;border-color:rgba(14,165,233,0.4);'}font-weight:bold;padding:6px 12px;border-radius:6px;border-width:1px;border-style:solid;cursor:pointer;" onclick="changePage(${i})">${i}</button>`; } pag.innerHTML = html + '</div>'; } else pag.style.display = 'none'; }
}
function changePage(p) { currentPage = p; renderGridCards(); document.getElementById('mainContainer').scrollIntoView({behavior:'smooth'}); }

function exportCurrentApksFile(mode) { closeActiveOverlays(); const tc = document.getElementById('exportTextareaContainer'), mt = document.getElementById('exportModalMainTitle'); if (!tc) return; if (mode === 'apksOnly') { const users = JSON.parse(localStorage.getItem('mmk_users') || '[]'); mt.textContent = '💾 EXPORT FULL DATABASE'; tc.value = 'const dialogTheme = ' + JSON.stringify(currentTheme, null, 4) + ';\n\nconst premiumUsers = ' + JSON.stringify(users, null, 4) + ';\n\nconst apks = ' + JSON.stringify(internalApksData, null, 4) + ';'; } document.getElementById('globalOverlay').classList.add('active'); document.getElementById('devDatabaseExportModal').classList.add('active'); }
function copyExportedTextToClipboard() { const tc = document.getElementById('exportTextareaContainer'); if (!tc) return; tc.select(); document.execCommand('copy'); alert('📋 Disalin!'); closeActiveOverlays(); }
function closeActiveOverlays() { ['sidebarMenu','authGateModal','devApkFormModal','devDatabaseExportModal','devReorderModal','requestModModal','adminRequestListModal','searchPopover','dialogConfigPanelModal','dialogConfigEditModal','clearCloneModal','globalOverlay','addExecutiveMemberModal','listMemberModal','themeEditorModal'].forEach(id => { const el = document.getElementById(id); if (el) el.classList.remove('active'); }); }
function handleSidebarDisplay() { const sb = document.getElementById('sidebarMenu'), ov = document.getElementById('globalOverlay'); if (sb && ov) { sb.classList.toggle('active'); ov.classList.toggle('active'); } }
function handleSearchToggle() { const c = document.getElementById('searchPopover'); if (!c) return; c.classList.toggle('active'); if (c.classList.contains('active')) document.getElementById('searchInput').focus(); }

// --- Sinkronisasi Role ---
function syncSecurityAccessState() { const ar = localStorage.getItem('mmk_sys_role') || 'GUEST'; const badge = document.getElementById('userSignBadge'), btn = document.getElementById('authTriggerBtn'); const he = document.querySelectorAll('.hidden-exec-item'), db = document.querySelectorAll('.dev-only-block'); const ur = document.getElementById('devUndoRedoControls'), rs = document.getElementById('devRoleSwitcher'); if (rs) rs.style.display = localStorage.getItem('mmk_ever_dev') === 'true' ? 'block' : 'none'; if (ar === 'DEVELOPER') { if (badge) { badge.textContent = 'Developer Mode'; badge.className = 'sidebar-sign-text dev-badge'; } if (btn) { btn.innerHTML = '🔒 Logout'; btn.classList.add('active-control'); } he.forEach(e => e.style.setProperty('display','block','important')); db.forEach(e => e.style.setProperty('display','block','important')); if (ur) ur.style.setProperty('display','flex','important'); } else if (ar === 'EXECUTIVE') { if (badge) { badge.textContent = 'Executive Member'; badge.className = 'sidebar-sign-text exec-badge'; } if (btn) { btn.innerHTML = '🔒 Logout'; btn.classList.add('active-control'); } he.forEach(e => e.style.setProperty('display','block','important')); db.forEach(e => e.style.setProperty('display','none','important')); if (ur) ur.style.setProperty('display','none','important'); } else { if (badge) { badge.textContent = 'Guest Mode'; badge.className = 'sidebar-sign-text'; } if (btn) { btn.innerHTML = '⚙️ Sign In'; btn.classList.remove('active-control'); } he.forEach(e => e.style.setProperty('display','none','important')); db.forEach(e => e.style.setProperty('display','none','important')); if (ur) ur.style.setProperty('display','none','important'); } }
function handleAuthModalDisplay() { closeActiveOverlays(); const ar = localStorage.getItem('mmk_sys_role') || 'GUEST'; document.getElementById('globalOverlay').classList.add('active'); document.getElementById('authGateModal').classList.add('active'); if (ar !== 'GUEST') { document.getElementById('loginFormState').style.display = 'none'; document.getElementById('logoutFormState').style.display = 'block'; document.getElementById('authActiveModeText').textContent = `Status: [ ${ar} ]`; } else { document.getElementById('loginFormState').style.display = 'block'; document.getElementById('logoutFormState').style.display = 'none'; document.getElementById('devKeyInput').value = ''; } }
function processAuthVerification() { const t = document.getElementById('devKeyInput').value.trim(); if (t === TOKEN_DEVELOPER) { localStorage.setItem('mmk_sys_role','DEVELOPER'); localStorage.setItem('mmk_ever_dev','true'); alert('🔐 Developer!'); location.reload(); } else if (t === TOKEN_EXECUTIVE) { localStorage.setItem('mmk_sys_role','EXECUTIVE'); alert('🔮 Executive!'); location.reload(); } else alert('❌ Token salah!'); }
function switchRoleDirect(r) { if (localStorage.getItem('mmk_ever_dev') !== 'true') return; if (!['GUEST','EXECUTIVE','DEVELOPER'].includes(r)) return; localStorage.setItem('mmk_sys_role', r); location.reload(); }
function processAuthLogout() { localStorage.setItem('mmk_sys_role','GUEST'); alert('Keluar.'); location.reload(); }

window.addEventListener('DOMContentLoaded', () => { initializeCatalogueEngine(); syncSecurityAccessState(); });
