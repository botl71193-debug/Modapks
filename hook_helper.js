/**
 * MMK Hook Helper — pelengkap script.js
 * Fokus: format KEY Class#Method + export payload untuk ModMenu DEX
 *
 * Cara pakai di index.html (setelah script.js):
 *   <script src="apks.js"></script>
 *   <script src="VIP.js"></script>
 *   <script src="script.js"></script>
 *   <script src="hook_helper.js"></script>
 */

/* ========== Konstanta tipe hook (sama dengan form) ========== */
const MMK_HOOK_TYPES = [
  { v: 'Z', label: 'Z — Toggle (boolean)' },
  { v: 'I', label: 'I — Integer' },
  { v: 'J', label: 'J — Long / Date (epoch ms)' },
  { v: 'F', label: 'F — Float' },
  { v: 'D', label: 'D — Double' },
  { v: 'Ljava/lang/String;', label: 'String — Teks' }
];

/**
 * Buat KEY yang dipakai di SharedPreferences & smali patch
 * Class = class pemilik method yang di-hook (BUKAN MainActivity)
 * Method = nama method target (isVip, getCoin, dll)
 */
function buildHookKey(className, methodName) {
  const c = String(className || '').trim().replace(/\//g, '.');
  const m = String(methodName || '').trim();
  if (!c || !m) return '';
  // Hapus prefix L dan suffix ; kalau user paste dari smali
  const clean = c.replace(/^L/, '').replace(/;$/, '');
  return clean + '#' + m;
}

/**
 * Validasi satu entry hook
 */
function validateHookEntry(h) {
  const errors = [];
  if (!h.fitur || !String(h.fitur).trim()) errors.push('Nama fitur kosong');
  if (!h.className || !String(h.className).trim()) errors.push('Class kosong');
  if (!h.methodName || !String(h.methodName).trim()) errors.push('Method kosong');
  if (h.className && /MainActivity/i.test(h.className) && /isVip|isPremium|getCoin/i.test(h.methodName || '')) {
    // peringatan lembut — MainActivity jarang punya isVip
    console.warn('[MMK Hook] Class menyerupai MainActivity. Pastikan ini class yang benar-benar punya method target, bukan Activity tempat InitHelper.');
  }
  return errors;
}

/**
 * Normalisasi hooks sebelum disimpan ke apks.js
 */
function normalizeHooks(hooks) {
  if (!Array.isArray(hooks)) return [];
  return hooks
    .map(h => ({
      fitur: String(h.fitur || '').trim(),
      className: String(h.className || '').trim().replace(/\//g, '.').replace(/^L/, '').replace(/;$/, ''),
      methodName: String(h.methodName || '').trim(),
      type: String(h.type || 'Z').trim(),
      defaultValue: h.defaultValue != null ? String(h.defaultValue) : ''
    }))
    .filter(h => h.fitur && h.className && h.methodName);
}

/**
 * Payload yang dikirim ke ModMenu.show(activity, payloadJson)
 * Cocok dengan modmenu_panel.html (__PAYLOAD__)
 */
function buildModMenuPayload(apkItem) {
  const hooks = normalizeHooks(apkItem.hooks || []);
  return {
    appName: apkItem.name || 'Mod Menu',
    appVersion: apkItem.versionName || apkItem.version || '1.0',
    packageName: apkItem.packageName || '',
    hooks: hooks.map(h => ({
      fitur: h.fitur,
      className: h.className,
      methodName: h.methodName,
      type: h.type,
      defaultValue: h.defaultValue,
      // key siap pakai di native
      key: buildHookKey(h.className, h.methodName)
    }))
  };
}

/**
 * Preview KEY untuk setiap hook di form (opsional UI)
 */
function previewHookKeys() {
  const data = (typeof hookRowsData !== 'undefined' && Array.isArray(hookRowsData))
    ? hookRowsData
    : [];
  return data.map((h, i) => ({
    index: i + 1,
    fitur: h.fitur,
    key: buildHookKey(h.className, h.methodName),
    type: h.type || 'Z'
  }));
}

/**
 * Export teks apks.js siap upload GitHub
 */
function exportApksJsText(apksArray) {
  const data = Array.isArray(apksArray) ? apksArray : (typeof internalApksData !== 'undefined' ? internalApksData : []);
  // pastikan hooks ternormalisasi
  const cleaned = data.map(item => {
    const copy = { ...item };
    if (copy.hookEnabled && Array.isArray(copy.hooks)) {
      copy.hooks = normalizeHooks(copy.hooks);
      if (!copy.hooks.length) {
        delete copy.hooks;
        delete copy.hookEnabled;
      }
    }
    return copy;
  });
  return 'const apks = ' + JSON.stringify(cleaned, null, 4) + ';';
}

/**
 * Contoh entry hook siap tempel (untuk dokumentasi / alert)
 */
function exampleHookEntry() {
  return {
    fitur: 'Unlock VIP',
    className: 'com.example.app.databean.MemberDataBean',  // ← class yang punya isVip(), BUKAN MainActivity
    methodName: 'isVip',
    type: 'Z',
    defaultValue: ''
  };
}

/**
 * Generate baris smali const-string dari class + method
 */
function toSmaliKeyLine(className, methodName) {
  const key = buildHookKey(className, methodName);
  if (!key) return '# Class/Method kosong';
  return '    const-string v1, "' + key + '"';
}

// Expose ke window supaya bisa dipanggil dari console / tombol
window.MMKHook = {
  buildKey: buildHookKey,
  validate: validateHookEntry,
  normalize: normalizeHooks,
  payload: buildModMenuPayload,
  previewKeys: previewHookKeys,
  exportApks: exportApksJsText,
  example: exampleHookEntry,
  toSmali: toSmaliKeyLine,
  types: MMK_HOOK_TYPES
};

console.log('[MMK Hook Helper] siap. Contoh KEY:', buildHookKey('com.xxx.MemberDataBean', 'isVip'));
console.log('Gunakan: MMKHook.buildKey(className, methodName) | MMKHook.toSmali(class, method)');
