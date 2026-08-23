#!/usr/bin/env python3

import os
import sys
import shutil
import json
import re
import zipfile
import tempfile
import subprocess
import urllib.request
import glob
import time
import traceback
import r2pipe



ENABLE_FLUTTER_PATCH = True 
ENABLE_MANIFEST_PATCH = True 
ENABLE_AUTO_INSTALL = False  


ENABLE_PP_PATCH = False       
ENABLE_ASM_PATCH = True       


KEYWORDS_TRUE = ["keyword", "keyword"]
KEYWORDS_FALSE = ["SVIP", "isSvip", "Svip", "SvipState", "Subscription", "dailyAdKey", "pro_access_life_time", "premiumstatus", "premium", "Premium_is_active", "isPro", "isvip", "vip", "ispremium", "is_premium", "is_vip", "is_pro", "lifetime", "CustomerInfo", "isSubscription", "issubscribe"]


ENABLE_TRUE_PATCH = False
ENABLE_FALSE_PATCH = True

ASM_REGEX_PATTERNS = [
    # Regex 1
    r"(((SVIP|premium|Svip|SvipState|vip|subscribed|_getUserActivationStatus|Subscription|dailyAdKey|pro_access_life_time|premiumstatus|Premium_is_active|isPremium|isSubscription|ispro\b|is_pro\b|is_premium|is_subscription)\w*\s*\([^)]*\)\s*(?:async\s*)?\{?)|(entitlementinfo)|(customerinfo))(?:[\s\S]*?)}",
    
    # Regex 2
    r"((?:\b(?:get|fetch|retrieve)?issubscription|islifetime|get.*subscription.*info|subscription.*status|plus|subscription.*controller|is_lifetime|has.*lifetime|\w*lifetime\b|\blifetime\w*|is subscription|isSubscription|issubscription\b|has.*subscription|\bispro\b|pro_access|\bhaspro\b|\bis.*pro\b|has_premium|hasPremium|get.*PREMIUM|subscribed|is_subscribed|setpremium|set_premium|isPremium|vip|has.*access|isvip|hasvip|Svip|vip|is_premium|has_vip|hasvip|svipstate|get.*VIP|is_subscription)(?:(?!\/\/ \*\* addr:).)*?\n\s*\/\/ \*\* addr: .*, size:)(?:[\s\S]*?)}"
]

ASM_FALSE_PATTERNS = [
    r"(\b0x[0-9a-fA-F]+):\s*(?:r\d+|x\d+|w\d+)\s*=\s*false",
    r"(\b0x[0-9a-fA-F]+).*false\b",
    r"^(\b0x[0-9a-fA-F]+):.*\bfalse"
]



def check_termux():
    return os.path.exists('/data/data/com.termux/files/usr/bin')

def install_packages():
    print("="*60)
    print("CHECKING REQUIRED PACKAGES")
    print("="*60)
    
    packages = [
        "openjdk-17", "python", "git", "cmake", "ninja", 
        "build-essential", "pkg-config", "libicu", "capstone", 
        "fmt", "wget", "unzip"
    ]
    
    pip_packages = ["requests", "pyelftools", "r2pipe"]
    
    try:
        print("Updating package list...")
        subprocess.run(["pkg", "update", "-y"], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print("✓ Package list updated")
        
        for pkg in packages:
            print(f"Checking package: {pkg}...")
            result = subprocess.run(["pkg", "list-installed", pkg], capture_output=True, text=True)
            if result.returncode != 0 or pkg not in result.stdout:
                print(f"  Installing: {pkg}")
                subprocess.run(["pkg", "install", "-y", pkg], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                print(f"  ✓ {pkg} installed")
            else:
                print(f"  ✓ {pkg} already installed")
        
        print("\nChecking Python packages...")
        for pip_pkg in pip_packages:
            try:
                __import__(pip_pkg.replace("-", "_"))
                print(f"  ✓ {pip_pkg} already installed")
            except ImportError:
                print(f"  Installing: {pip_pkg}")
                subprocess.run([sys.executable, "-m", "pip", "install", pip_pkg], check=True)
                print(f"  ✓ {pip_pkg} installed")
        
        print("\n" + "="*60)
        print("ALL PACKAGES SUCCESSFULLY CHECKED/INSTALLED")
        print("="*60)
        return True
        
    except Exception as e:
        print(f"Package installation error: {e}")
        return False

def install_blutter():
    print("\n" + "="*60)
    print("CHECKING BLUTTER")
    print("="*60)
    
    home = os.path.expanduser("~")
    blutter_dir = os.path.join(home, "blutter-termux")
    
    if os.path.exists(blutter_dir) and os.path.exists(os.path.join(blutter_dir, "blutter.py")):
        print("✓ Blutter already installed")
        return True
    
    try:
        print("Downloading Blutter...")
        subprocess.run(["git", "clone", "https://github.com/AbhiTheModder/blutter-termux.git", blutter_dir], 
                      check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print("✓ Blutter downloaded")
        
        os.chdir(blutter_dir)
        subprocess.run(["find", ".", "-type", "f", "-exec", "sed", "-i", "s/std::format/fmt::format/g", "{}", "+"],
                      check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print("✓ Files updated")
        
        os.chdir(home)
        print("✓ Blutter successfully installed and configured")
        return True
        
    except Exception as e:
        print(f"Blutter installation error: {e}")
        return False

def check_and_install_r2():
    print("\n" + "="*60)
    print("CHECKING RADARE2")
    print("="*60)
    
    if shutil.which("r2"):
        print("✓ Radare2 already installed")
        return True
    
    try:
        print("Installing Radare2...")
        subprocess.run(["pkg", "install", "-y", "radare2"], 
                      check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
        if shutil.which("r2"):
            print("✓ Radare2 successfully installed")
            return True
        else:
            print("✗ Radare2 installation failed")
            return False
            
    except Exception as e:
        print(f"Radare2 installation error: {e}")
        return False

def check_and_install_pptool():
    print("\n" + "="*60)
    print("CHECKING PPTOOL")
    print("="*60)
    
    if shutil.which("pptool"):
        print("✓ Pptool already installed")
        return True
    
    try:
        print("Downloading and compiling Pptool...")
        home = os.path.expanduser("~")
        pptool_dir = os.path.join(home, "ppfind")
        
        if os.path.exists(pptool_dir):
            shutil.rmtree(pptool_dir)
        
        subprocess.run(["git", "clone", "https://github.com/Pr0214/ppfind", pptool_dir], 
                      check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
        os.chdir(pptool_dir)
        subprocess.run(["g++", "-std=c++11", "-o", "pptool", "pptool.cpp"], 
                      check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        subprocess.run(["chmod", "+x", "pptool"], check=True)
        shutil.copy("pptool", "/data/data/com.termux/files/usr/bin/")
        os.chdir(home)
        
        if shutil.which("pptool"):
            print("✓ Pptool successfully installed")
            return True
        else:
            print("✗ Pptool installation failed")
            return False
            
    except Exception as e:
        print(f"Pptool installation error: {e}")
        return False

def run_auto_installation():
    if not check_termux():
        print("This script should only be run in Termux environment!")
        return False
    
    print("\n" + "="*60)
    print("FLUTTER SMALI PATCHER - AUTO INSTALLATION")
    print("="*60)
    print("All required tools will be checked and installed...")
    print("="*60 + "\n")
    
    try:
        if not install_packages():
            print("Package installation failed!")
            return False
        
        if not install_blutter():
            print("Blutter installation failed!")
            return False
        
        if not check_and_install_r2():
            print("Radare2 installation failed!")
            return False
        
        if not check_and_install_pptool():
            print("Pptool installation failed!")
            return False
        
        jar_file = check_apkeditor()
        if not jar_file:
            print("APKEditor installation failed!")
            return False
        
        print("\n" + "="*60)
        print("AUTO INSTALLATION COMPLETED!")
        print("="*60)
        print("All required tools successfully installed.")
        print("Flutter Smali Patcher is now ready to use!")
        print("="*60 + "\n")
        
        return True
        
    except Exception as e:
        print(f"Auto installation error: {e}")
        print(f"Traceback: {traceback.format_exc()}")
        return False

def check_apkeditor():
    """Check and download APKEditor"""
    print("\n" + "="*60)
    print("CHECKING APKEDITOR")
    print("="*60)
    
    for f in os.listdir('.'):
        if f.lower().endswith('.jar') and "apkeditor" in f.lower():
            print(f"✓ APKEditor found: {f}")
            return f
    
    jars = glob.glob("APKEditor*.jar") + glob.glob("*APKEditor*.jar")
    if jars:
        print(f"✓ APKEditor found: {jars[0]}")
        return jars[0]
    
    try:
        print("Downloading APKEditor...")
        api_url = "https://api.github.com/repos/REAndroid/APKEditor/releases/latest"
        with urllib.request.urlopen(api_url) as resp:
            data = json.load(resp)
        
        for asset in data.get("assets", []):
            if asset["name"].endswith(".jar") and "apkeditor" in asset["name"].lower():
                download_url = asset["browser_download_url"]
                filename = asset["name"]
                break
        else:
            download_url = "https://github.com/REAndroid/APKEditor/releases/latest/download/APKEditor.jar"
            filename = "APKEditor.jar"
        
        req = urllib.request.Request(download_url, headers={'User-Agent': 'flutter_patcher/1.0'})
        with urllib.request.urlopen(req) as resp, open(filename, 'wb') as f:
            shutil.copyfileobj(resp, f)
        
        print(f"✓ APKEditor successfully downloaded: {filename}")
        return filename
        
    except Exception as e:
        print(f"APKEditor download error: {e}")
        return None

def extract_arm64_folder_from_apk(apk_path, dest_parent='.'):
    """Extract arm64-v8a folder and libapp.so from APK"""
    if not os.path.exists(apk_path):
        raise FileNotFoundError(f"APK not found: {apk_path}")

    with zipfile.ZipFile(apk_path, 'r') as z:
        members = [m for m in z.namelist() if m.startswith('lib/arm64-v8a/')]
        if not members:
            raise RuntimeError("'lib/arm64-v8a/' folder not found in APK.")

        tmpdir = tempfile.mkdtemp(prefix='apk_extract_')
        try:
            for m in members:
                if not m.endswith('/'):
                    z.extract(m, path=tmpdir)

            src_folder = os.path.join(tmpdir, 'lib', 'arm64-v8a')
            dst_folder = os.path.join(os.path.abspath(dest_parent), 'arm64-v8a')

            if os.path.exists(dst_folder):
                shutil.rmtree(dst_folder)
            shutil.move(src_folder, dst_folder)
            print(f"'lib/arm64-v8a' extracted → {dst_folder}")

            libso = os.path.join(dst_folder, 'libapp.so')
            if os.path.exists(libso):
                dst_so = os.path.join(os.path.abspath(dest_parent), 'libapp.so')
                if os.path.exists(dst_so):
                    os.remove(dst_so)
                shutil.copy(libso, dst_so)
                print(f"libapp.so copied → {dst_so}")
            else:
                print("libapp.so not found in arm64-v8a folder.")
        finally:
            shutil.rmtree(tmpdir, ignore_errors=True)

def run_blutter(filename, apk_dir):
    """Run Blutter to extract asm files"""
    home = os.path.expanduser("~")
    
    extracted_path = os.path.join(apk_dir, "arm64-v8a")
    if not os.path.exists(extracted_path):
        os.makedirs(extracted_path, exist_ok=True)
    
    out_dir = os.path.join(home, "blutter-termux", f"out_dir_{filename}")
    cmd = ["python3", "blutter.py", extracted_path, out_dir]
    print("Running Blutter to extract files...")
    subprocess.run(cmd, cwd=os.path.join(home, "blutter-termux"), check=True)
    
    # Check if asm folder was created
    asm_folder = os.path.join(out_dir, "asm")
    if os.path.exists(asm_folder):
        print(f"✓ asm folder created: {asm_folder}")
    
    # Copy pp.txt if exists
    pp_source = os.path.join(out_dir, "pp.txt")
    pp_dest = os.path.join(apk_dir, "pp.txt")
    if os.path.exists(pp_source):
        shutil.copy(pp_source, pp_dest)
        print(f"✓ pp.txt copied to main directory: {pp_dest}")
    
    return out_dir

def replace_lib_in_apk(apk_path, patched_lib):
    """Replace libapp.so in APK with patched version"""
    tmp_apk = apk_path + ".tmp"
    with zipfile.ZipFile(apk_path, 'r') as zin, zipfile.ZipFile(tmp_apk, 'w') as zout:
        for item in zin.infolist():
            if item.filename == "lib/arm64-v8a/libapp.so":
                print(f"Replacing {item.filename} with patched version...")
                zout.write(patched_lib, item.filename)
            else:
                zout.writestr(item, zin.read(item.filename))
    os.replace(tmp_apk, apk_path)
    print(f"libapp.so replaced in {apk_path}")

def cleanup_workspace(apk_dir):
    """Clean up temporary files and folders"""
    for folder in ['arm64-v8a']:
        folder_path = os.path.join(apk_dir, folder)
        if os.path.exists(folder_path):
            shutil.rmtree(folder_path, ignore_errors=True)
            print(f"Folder removed: {folder_path}")
    
    for file in ['libapp.so']:
        file_path = os.path.join(apk_dir, file)
        if os.path.exists(file_path):
            os.remove(file_path)
            print(f"File removed: {file_path}")


def find_related_functions(lib_path, pp_address, timeout=12):
    print(f"Searching for related functions for {pp_address} using pptool...\n")
    output = ""

    try:
        proc = subprocess.run(["pptool", lib_path, pp_address],
                              stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
                              text=True, timeout=timeout)
        output = proc.stdout or ""
    except Exception:
        pass

    if not output.strip():
        try:
            proc = subprocess.run(["r2", "-w", lib_path, "-c",
                                   f'!pptool {lib_path} {pp_address}; q'],
                                   stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
                                   text=True, timeout=timeout)
            output = proc.stdout or ""
        except Exception:
            pass

    if not output.strip():
        print("No pptool output found.")
        return []

    ansi_re = re.compile(r'\x1b\[[0-9;]*[A-Za-z]')
    clean = ansi_re.sub("", output)
    lines = [re.sub(r'[ \t]+', ' ', ln).strip() for ln in clean.splitlines()]

    triple_re = re.compile(r'(0x[0-9a-fA-F]+)\s+(0x[0-9a-fA-F]+)\s+(0x[0-9a-fA-F]+)')
    matches = [(m.group(1), m.group(3)) for ln in lines if (m := triple_re.search(ln))]

    if not matches:
        for ln in lines:
            toks = re.findall(r'0x[0-9a-fA-F]+', ln)
            if len(toks) >= 3:
                matches.append((toks[0], toks[-1]))

    if not matches:
        print("No function-offset pairs found.")
        return []

    seen, functions = set(), []
    for func_addr, offset in matches:
        key = (func_addr.lower(), offset.lower())
        if key not in seen:
            seen.add(key)
            functions.append((func_addr, offset))

    print("Related functions found:\n")
    for i, (func_addr, offset) in enumerate(functions, start=1):
        print(f" {i}. function_address = {func_addr} | offset_value = {offset}")
    print("\nRelated functions search completed.")

    return functions

def analyze_function_with_r2_commands(libso_path, func_addr):
    try:
        r2 = r2pipe.open(libso_path, flags=["-2"])
        
        print(f"  → s {func_addr}")
        r2.cmd(f"s {func_addr}")
        
        print(f"  → aF")
        r2.cmd("aF")
        
        print(f"  → pdr")
        disasm = r2.cmd("pdr")
        
        r2.quit()
        return disasm
    except Exception as e:
        print(f"R2 command analysis error: {e}")
        return ""

def patch_true_functions(libso_path, related_funcs, indices):
    """PP PATCHING: FALSE patch mode (0x20 → 0x30)"""
    if not related_funcs:
        print("No related functions provided.")
        return {}

    print("\n" + "="*60)
    print("✅ FALSE PATCH MODE (0x20 → 0x30)")
    print("="*60)
    print("🔍 Searching: add x[0-30], x22, 0x20")
    print("🔄 Replacing: add x[0-30], x22, 0x30")
    print("="*60 + "\n")
  
    patterns = [
        r"add\s+(x([0-9]|[12][0-9]|30)),\s*x22,\s*0x20",
        r"add\s+(x([0-9]|[12][0-9]|30)),\s*x22,\s*#?0x20"
    ]
    
    results = {}

    try:
        for i in indices:
            func_addr, offset = related_funcs[i-1]
            print(f"\n➡️  Checking function #{i} for FALSE patch @ {func_addr} (offset {offset})")
            
            print("  Executing R2 commands...")
            disasm = analyze_function_with_r2_commands(libso_path, func_addr)
            
            if not disasm:
                print("  ⚠️  Could not get disassembly from R2 commands")
                results[i] = (func_addr, offset, False, None, None, "TRUE_PATCH")
                continue
            
            patched = False
            patched_at = None
            matched_register = None
            matched_instr = None
            
            for pattern in patterns:
                for line in disasm.splitlines():
                    match = re.search(pattern, line, re.IGNORECASE)
                    if match and "0x20" in line:
                        matched_register = match.group(1)
                        addr_match = re.search(r"(0x[0-9a-fA-F]+)", line)
                        instr_addr = addr_match.group(1) if addr_match else func_addr
                        matched_instr = line.strip()
                        
                        print(f"✅ TRUE pattern found: {matched_instr}")
                        print(f"   Address: {instr_addr}")
                        print(f"   Register: {matched_register}")
                        
                        try:
                            r2 = r2pipe.open(libso_path, flags=["-w", "-2"])
                            r2.cmd(f"s {instr_addr}")
                            r2.cmd(f"wa add {matched_register}, x22, 0x30")
                            r2.quit()
                            
                            print(f"   ↪️  Patched to 'add {matched_register}, x22, 0x30' (true → false)")
                            
                            patched = True
                            patched_at = instr_addr
                            break
                        except Exception as e:
                            print(f"   ❌ Patching error: {e}")
                if patched:
                    break

            results[i] = (func_addr, offset, patched, patched_at, matched_register, "TRUE_PATCH")
            if patched:
                print(f"🎯 Function #{i} FALSE patched at {patched_at}.")
            else:
                print(f"⚠️ Function #{i}: No target found for FALSE patch.")
                
                print("\n📄 pdr output (first 3 lines):")
                for j, line in enumerate(disasm.splitlines()[:3]):
                    print(f"  {j:3d}: {line}")

    except Exception as e:
        print(f"❌ FALSE patching error: {e}")

    return results

def patch_false_functions(libso_path, related_funcs, indices):
    """PP PATCHING: TRUE patch mode (0x30 → 0x20)"""
    if not related_funcs:
        print("No related functions provided.")
        return {}

    print("\n" + "="*60)
    print("❌ TRUE PATCH MODE (0x30 → 0x20)")
    print("="*60)
    print("🔍 Searching: add x[0-30], x22, 0x30")
    print("🔄 Replacing: add x[0-30], x22, 0x20")
    print("="*60 + "\n")
  
    patterns = [
        r"add\s+(x([0-9]|[12][0-9]|30)),\s*x22,\s*0x30",
        r"add\s+(x([0-9]|[12][0-9]|30)),\s*x22,\s*#?0x30"
    ]
    
    results = {}

    try:
        for i in indices:
            func_addr, offset = related_funcs[i-1]
            print(f"\n➡️  Checking function #{i} for TRUE patch @ {func_addr} (offset {offset})")
            
            print("  Executing R2 commands...")
            disasm = analyze_function_with_r2_commands(libso_path, func_addr)
            
            if not disasm:
                print("  ⚠️  Could not get disassembly from R2 commands")
                results[i] = (func_addr, offset, False, None, None, "FALSE_PATCH")
                continue
            
            patched = False
            patched_at = None
            matched_register = None
            matched_instr = None
            
            for pattern in patterns:
                for line in disasm.splitlines():
                    match = re.search(pattern, line, re.IGNORECASE)
                    if match and "0x30" in line:
                        matched_register = match.group(1)
                        addr_match = re.search(r"(0x[0-9a-fA-F]+)", line)
                        instr_addr = addr_match.group(1) if addr_match else func_addr
                        matched_instr = line.strip()
                        
                        print(f"✅ FALSE pattern found: {matched_instr}")
                        print(f"   Address: {instr_addr}")
                        print(f"   Register: {matched_register}")
                        
                        try:
                            r2 = r2pipe.open(libso_path, flags=["-w", "-2"])
                            r2.cmd(f"s {instr_addr}")
                            r2.cmd(f"wa add {matched_register}, x22, 0x20")
                            r2.quit()
                            
                            print(f"   ↪️  Patched to 'add {matched_register}, x22, 0x20' (false → true)")
                            
                            patched = True
                            patched_at = instr_addr
                            break
                        except Exception as e:
                            print(f"   ❌ Patching error: {e}")
                if patched:
                    break

            results[i] = (func_addr, offset, patched, patched_at, matched_register, "FALSE_PATCH")
            if patched:
                print(f"🎯 Function #{i} TRUE patched at {patched_at}.")
            else:
                print(f"⚠️ Function #{i}: No target found for TRUE patch.")
                
                print("\n📄 pdr output (first 3 lines):")
                for j, line in enumerate(disasm.splitlines()[:3]):
                    print(f"  {j:3d}: {line}")

    except Exception as e:
        print(f"❌ TRUE patching error: {e}")

    return results


def search_asm_folder(asm_folder):
    """Search for regex patterns in .dart files within asm folder"""
    print("\n" + "="*60)
    print("SEARCHING ASM FOLDER FOR REGEX PATTERNS")
    print("="*60)
    
    all_matches = []
    
    if not os.path.exists(asm_folder):
        print(f"asm folder not found: {asm_folder}")
        return all_matches
    
  
    dart_files = []
    for root, dirs, files in os.walk(asm_folder):
        for file in files:
            if file.endswith('.dart'):
                dart_files.append(os.path.join(root, file))
    
    print(f"Found {len(dart_files)} .dart files")
    
    
    for i, dart_file in enumerate(dart_files, 1):
        try:
            with open(dart_file, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            
            for regex_pattern in ASM_REGEX_PATTERNS:
                matches = re.finditer(regex_pattern, content, re.IGNORECASE)
                for match in matches:
                 
                    addr_match = re.search(r'// \*\* addr: (0x[0-9a-fA-F]+)', content[max(0, match.start()-200):match.end()])
                    if addr_match:
                        address = addr_match.group(1)
                      
                        lines = content.splitlines()
                        match_line_idx = content[:match.start()].count('\n')
                        context_start = max(0, match_line_idx - 10)
                        context_end = min(len(lines), match_line_idx + 10)
                        context = match.group()
                        
                        all_matches.append({
                            'address': address,
                            'context': context,
                            'file': os.path.relpath(dart_file, asm_folder),
                            'match_text': match.group() if len(match.group()) > 200 else match.group()
                        })
                        
                        if len(all_matches) % 10 == 0:
                            print(f"  Found {len(all_matches)} matches so far...")
        
        except Exception as e:
            print(f"  Error reading {dart_file}: {e}")
        
        if i % 50 == 0:
            print(f"  Processed {i}/{len(dart_files)} files")
    
    print(f"\n✓ Total matches found: {len(all_matches)}")
    return all_matches

def create_smngn_file(matches, output_file="smngn.txt"):
    """Create smngn.txt file with all matches"""
    print(f"\nCreating {output_file}...")
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("="*60 + "\n")
        f.write("SMNGN REGEX MATCHES\n")
        f.write("="*60 + "\n\n")
        
        for i, match in enumerate(matches, 1):
            f.write(f"MATCH #{i}\n")
            f.write(f"Address: {match['address']}\n")
            f.write(f"File: {match['file']}\n")
            f.write(f"Context:\n{match['context']}\n")
            f.write(f"Match Text:\n{match['match_text']}\n")
            f.write("-"*60 + "\n\n")
    
    print(f"✓ {output_file} created with {len(matches)} matches")
    return output_file

def extract_false_addresses_from_smngn(smngn_file):
    """Extract false addresses from smngn.txt file"""
    print(f"\nExtracting false addresses from {smngn_file}...")
    
    false_addresses = []
    
    if not os.path.exists(smngn_file):
        print(f"✗ {smngn_file} not found")
        return false_addresses
    
    try:
        with open(smngn_file, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        
       
        for pattern in ASM_FALSE_PATTERNS:
            matches = re.finditer(pattern, content, re.IGNORECASE)
            for match in matches:
                address = match.group(1)
                if address not in false_addresses:
                    false_addresses.append(address)
                    
                   
                    lines = content.splitlines()
                    for j, line in enumerate(lines):
                        if address in line and 'false' in line.lower():
                            context_start = max(0, j - 2)
                            context_end = min(len(lines), j + 3)
                            context = '\n'.join(lines[context_start:context_end])
                            print(f"  Found false at {address}: {line.strip()}")
                            break
        
        print(f"✓ Extracted {len(false_addresses)} false addresses")
        return false_addresses
    
    except Exception as e:
        print(f"Error reading {smngn_file}: {e}")
        return []

def patch_false_addresses(libso_path, false_addresses):
    """ASM PATCHING: Patch false addresses (false → true)"""
    if not false_addresses:
        print("No false addresses to patch")
        return {}
    
    print("\n" + "="*60)
    print("ASM PATCHING FALSE ADDRESSES (false → true)")
    print("="*60)
    print("Pattern: add x[0-30], x22, 0x30 → add x[0-30], x22, 0x20")
    print("="*60)
    
    results = {}
    
    for i, address in enumerate(false_addresses, 1):
        print(f"\n[{i}/{len(false_addresses)}] Patching false address: {address}")
        
        try:
         
            r2 = r2pipe.open(libso_path, flags=["-w", "-2"])
            
            
            print(f"  → s {address}")
            r2.cmd(f"s {address}")
            
           
            print(f"  → pd1")
            disasm = r2.cmd("pd1")
            print(f"  Instruction: {disasm.strip()}")
            
            
            add_pattern = r"add\s+(x([0-9]|[12][0-9]|30)),\s*x22,\s*0x30"
            match = re.search(add_pattern, disasm, re.IGNORECASE)
            
            if match:
                matched_register = match.group(1)
                print(f"  ✓ Found: {disasm.strip()}")
                print(f"  Register: {matched_register}")
                
          
                patch_cmd = f"wa add {matched_register}, x22, 0x20"
                print(f"  → {patch_cmd}")
                r2.cmd(patch_cmd)
                
               
                r2.cmd(f"s {address}")
                verify_disasm = r2.cmd("pd1")
                print(f"  Patched to: {verify_disasm.strip()}")
                
                results[address] = {
                    'patched': True,
                    'original': disasm.strip(),
                    'patched_to': verify_disasm.strip(),
                    'register': matched_register,
                    'type': 'FALSE_TO_TRUE'
                }
                
                print(f"  ✓ Successfully patched {address}")
            else:
                print(f"  ✗ Not an add x[0-30], x22, 0x30 instruction")
                results[address] = {
                    'patched': False,
                    'reason': 'Not matching pattern',
                    'instruction': disasm.strip()
                }
            
            r2.quit()
            
        except Exception as e:
            print(f"  ✗ Error patching {address}: {e}")
            results[address] = {
                'patched': False,
                'reason': str(e)
            }
    
  
    successful = sum(1 for r in results.values() if r.get('patched', False))
    print(f"\n" + "="*60)
    print(f"ASM PATCH SUMMARY: {successful}/{len(false_addresses)} successful")
    print("="*60)
    
    return results


def process_pp_patch(apk_path):
    """Process pp.txt based patching"""
    if not ENABLE_PP_PATCH:
        print("PP Patching disabled.")
        return apk_path, 0
    
    print("\n" + "="*60)
    print("PP.TXT BASED PATCHING")
    print("="*60)
    
    apk_dir = os.path.dirname(os.path.abspath(apk_path))
    if not apk_dir:
        apk_dir = "."
    
    print(f"TRUE Keywords: {KEYWORDS_TRUE}")
    print(f"FALSE Keywords: {KEYWORDS_FALSE}")
    
    
    pp_txt = os.path.join(apk_dir, "pp.txt")
    if not os.path.exists(pp_txt):
        print("pp.txt not found!")
        return apk_path, 0

    pp_addresses_true = []
    pp_addresses_false = []

    with open(pp_txt, "r", errors="ignore") as f:
        lines = f.readlines()

    if ENABLE_TRUE_PATCH:
        for kw in KEYWORDS_TRUE:
            found_for_kw = False
            for line in lines:
                if kw.lower() in line.lower():
                    m = re.search(r"\[pp\+(0x[0-9a-fA-F]+)\]", line)
                    if m:
                        pp_addr = m.group(1)
                        if pp_addr not in pp_addresses_true:
                            pp_addresses_true.append(pp_addr)
                            print(f"✓ Address found for TRUE '{kw}' → {pp_addr}")
                            found_for_kw = True
            if not found_for_kw:
                print(f"✗ No address found for TRUE '{kw}'")

    if ENABLE_FALSE_PATCH:
        for kw in KEYWORDS_FALSE:
            found_for_kw = False
            for line in lines:
                if kw.lower() in line.lower():
                    m = re.search(r"\[pp\+(0x[0-9a-fA-F]+)\]", line)
                    if m:
                        pp_addr = m.group(1)
                        if pp_addr not in pp_addresses_false:
                            pp_addresses_false.append(pp_addr)
                            print(f"✓ Address found for FALSE '{kw}' → {pp_addr}")
                            found_for_kw = True
            if not found_for_kw:
                print(f"✗ No address found for FALSE '{kw}'")

    libapp_path = os.path.join(apk_dir, "libapp.so")
    all_patch_results = {}

    if pp_addresses_true and ENABLE_TRUE_PATCH:
        print(f"\n{'='*60}")
        print(f"PP: STARTING TRUE PATCH PROCESS ({len(pp_addresses_true)} addresses)")
        print(f"{'='*60}")
        
        for idx, pp_address in enumerate(pp_addresses_true, 1):
            print(f"\n[{idx}/{len(pp_addresses_true)}] PP TRUE patch process for {pp_address}:")
            
            related_funcs = find_related_functions(libapp_path, pp_address)
            if related_funcs:
                max_index = len(related_funcs)
                indices = list(range(1, max_index + 1))
                patch_results = patch_true_functions(libapp_path, related_funcs, indices)
                
                for k, v in patch_results.items():
                    all_patch_results[f"TRUE_{pp_address}_{k}"] = v
            else:
                print(f"  ⚠️  No functions found for {pp_address}.")

    if pp_addresses_false and ENABLE_FALSE_PATCH:
        print(f"\n{'='*60}")
        print(f"PP: STARTING FALSE PATCH PROCESS ({len(pp_addresses_false)} addresses)")
        print(f"{'='*60}")
        
        for idx, pp_address in enumerate(pp_addresses_false, 1):
            print(f"\n[{idx}/{len(pp_addresses_false)}] PP FALSE patch process for {pp_address}:")
            
            related_funcs = find_related_functions(libapp_path, pp_address)
            if related_funcs:
                max_index = len(related_funcs)
                indices = list(range(1, max_index + 1))
                patch_results = patch_false_functions(libapp_path, related_funcs, indices)
                
                for k, v in patch_results.items():
                    all_patch_results[f"FALSE_{pp_address}_{k}"] = v
            else:
                print(f"  ⚠️  No functions found for {pp_address}.")

    successful_patches = sum(1 for info in all_patch_results.values() if info[2])
    print(f"\nPP PATCHING: {successful_patches} successful patches")
    
    return apk_path, successful_patches

def process_asm_patch(apk_path, apk_dir):
    """Process asm folder based patching"""
    if not ENABLE_ASM_PATCH:
        print("ASM Patching disabled.")
        return 0
    
    print("\n" + "="*60)
    print("ASM FOLDER BASED PATCHING")
    print("="*60)
    
    try:
        base = os.path.splitext(os.path.basename(apk_path))[0]
        out_dir = run_blutter(base, apk_dir)
        
        if not out_dir:
            print("Blutter failed to create output directory")
            return 0
        
        
        asm_folder = os.path.join(out_dir, "asm")
        matches = search_asm_folder(asm_folder)
        
        if not matches:
            print("No regex matches found in asm folder")
            return 0
        
 
        smngn_file = os.path.join(apk_dir, "smngn.txt")
        create_smngn_file(matches, smngn_file)
        
        
        false_addresses = extract_false_addresses_from_smngn(smngn_file)
        
       
        libapp_path = os.path.join(apk_dir, "libapp.so")
        
        if false_addresses:
            print(f"\n{'='*60}")
            print(f"ASM: PATCHING {len(false_addresses)} FALSE ADDRESSES")
            print(f"{'='*60}")
            
            patch_results = patch_false_addresses(libapp_path, false_addresses)
            
          
            successful_patches = sum(1 for info in patch_results.values() if info.get('patched', False))
            print(f"\nASM PATCHING: {successful_patches} successful patches")
            return successful_patches
        else:
            print("\n⚠️ ASM: No false addresses found to patch.")
            return 0
            
    except Exception as e:
        print(f"ASM patching error: {e}")
        return 0

def process_flutter_patch_combined(apk_path):
    """Combined flutter patching using both pp.txt and asm folder"""
    if not ENABLE_FLUTTER_PATCH:
        print("Flutter patching disabled.")
        return apk_path
    
    print("\n" + "="*60)
    print("COMBINED FLUTTER PATCHING (PP.TXT + ASM FOLDER)")
    print("="*60)
    print(f"PP Patching: {'ENABLED' if ENABLE_PP_PATCH else 'DISABLED'}")
    print(f"ASM Patching: {'ENABLED' if ENABLE_ASM_PATCH else 'DISABLED'}")
    print("="*60)
    
    apk_dir = os.path.dirname(os.path.abspath(apk_path))
    if not apk_dir:
        apk_dir = "."
    
    print(f"Working directory: {apk_dir}")
    
    total_successful_patches = 0
    
    try:
       
        extract_arm64_folder_from_apk(apk_path, apk_dir)
    except Exception as e:
        print(f"Extraction error: {e}")
        return apk_path
    
    
    base = os.path.splitext(os.path.basename(apk_path))[0]
    run_blutter(base, apk_dir)
    
    
    if ENABLE_PP_PATCH:
        _, pp_patches = process_pp_patch(apk_path)
        total_successful_patches += pp_patches
    
    if ENABLE_ASM_PATCH:
        asm_patches = process_asm_patch(apk_path, apk_dir)
        total_successful_patches += asm_patches
    
   
    libapp_path = os.path.join(apk_dir, "libapp.so")
    
    if total_successful_patches > 0:
        print(f"\n{'='*60}")
        print(f"✅ TOTAL {total_successful_patches} PATCHES APPLIED")
        print(f"{'='*60}")
        print("Updating APK with patched libapp.so...")
        replace_lib_in_apk(apk_path, libapp_path)
    else:
        print(f"\n{'='*60}")
        print("⚠️ NO PATCHES APPLIED")
        print(f"{'='*60}")
    
   
    cleanup_workspace(apk_dir)
    

    for file in ['pp.txt', 'smngn.txt']:
        file_path = os.path.join(apk_dir, file)
        if os.path.exists(file_path):
            os.remove(file_path)
            print(f"Temporary file removed: {file_path}")
    
    return apk_path


def find_apkeditor_jar():
    for f in os.listdir('.'):
        if f.lower().endswith('.jar') and "apkeditor" in f.lower():
            return f
    jars = glob.glob("APKEditor*.jar") + glob.glob("*APKEditor*.jar")
    return jars[0] if jars else None

def check_apkeditor_main():
    jar = find_apkeditor_jar()
    if not jar:
        print("APKEditor jar not found.")
        print("Please download APKEditor and place it in the same directory")
        sys.exit(1)
    print(f"APKEditor jar found: {jar}")
    return jar

def run_command(komut, verbose=True, exit_on_error=True):
    try:
        result = subprocess.run(komut, shell=True, capture_output=True, text=True)
        if result.returncode != 0:
            if verbose:
                print(f"Command failed: {komut}\n{result.stderr}")
            if exit_on_error:
                sys.exit(1)
        return result.stdout.strip()
    except Exception as e:
        if verbose:
            print(f"Command error: {komut}\n{str(e)}")
        if exit_on_error:
            sys.exit(1)
        return ""

def decompile_apk(apk_yolu, cikti_klasoru, jar_file):
    print("Decompiling APK...")
    cmd = f'java -jar "{jar_file}" d -i "{apk_yolu}" -o "{cikti_klasoru}"'
    run_command(cmd, verbose=False)
    return os.path.exists(cikti_klasoru)

def build_apk(kaynak_klasor, cikti_apk, jar_file):
    print("Building APK...")
    cmd = f'java -jar "{jar_file}" b -i "{kaynak_klasor}" -o "{cikti_apk}"'
    run_command(cmd, verbose=False)
    if os.path.exists(cikti_apk):
        dosya_boyutu = os.path.getsize(cikti_apk) / (1024 * 1024)
        print(f"APK successfully built ({dosya_boyutu:.2f} MB)")
        return True
    return False

MANIFEST_PATCHES = [
    (re.compile(r'<[^>]*\b(?:com\.pairip\.licensecheck|android\.vending\.CHECK_LICENSE)\b[^>]*/>'), 
     '<!-- License check disabled -->', "CHECK_LICENSE"),
    ("extractNativeLibs", lambda content: content.replace('android:extractNativeLibs="false"', ''))
]

def safe_regex_operation(pattern, replacement, content, description, file_path=""):
    try:
        if isinstance(pattern, str):
            pattern = re.compile(pattern)
        yeni_icerik = pattern.sub(replacement, content)
        return True, yeni_icerik, None if yeni_icerik != content else (True, content, f"Pattern not matched: {description}")
    except Exception as e:
        hata_mesaji = f"Regex error [{description}]: {str(e)}"
        if file_path:
            hata_mesaji += f" - File: {os.path.basename(file_path)}"
        return False, content, hata_mesaji

def safe_function_operation(func, content, description, file_path=""):
    try:
        yeni_icerik = func(content)
        return True, yeni_icerik, None
    except Exception as e:
        hata_mesaji = f"Function error [{description}]: {str(e)}"
        if file_path:
            hata_mesaji += f" - File: {os.path.basename(file_path)}"
        return False, content, hata_mesaji

def patch_android_manifest(decompile_klasoru):
    print("Patching AndroidManifest.xml...")
    manifest_yolu = os.path.join(decompile_klasoru, 'AndroidManifest.xml')
    if not os.path.exists(manifest_yolu):
        print("AndroidManifest.xml not found")
        return False
    
    try:
        with open(manifest_yolu, 'r', encoding='utf-8') as f:
            icerik = f.read()
        
        orijinal_icerik = icerik
        
        if not MANIFEST_PATCHES:
            print("No manifest patches defined")
            return True
        
        for patch in MANIFEST_PATCHES:
            if len(patch) == 3:
                pattern, replacement, aciklama = patch
                if isinstance(pattern, str):
                    pattern = re.compile(pattern)
                basarili, yeni_icerik, hata_mesaji = safe_regex_operation(pattern, replacement, icerik, aciklama, manifest_yolu)
                if not basarili:
                    print(f"Manifest patch error: {hata_mesaji}")
                    continue
                if yeni_icerik != icerik:
                    icerik = yeni_icerik
                    print(f"Applied (regex): {aciklama}")
            
            elif len(patch) == 2:
                aciklama, patch_func = patch
                basarili, yeni_icerik, hata_mesaji = safe_function_operation(patch_func, icerik, aciklama, manifest_yolu)
                if not basarili:
                    print(f"Manifest patch error: {hata_mesaji}")
                    continue
                if yeni_icerik != icerik:
                    icerik = yeni_icerik
                    print(f"Applied (function): {aciklama}")
        
        if icerik != orijinal_icerik:
            with open(manifest_yolu, 'w', encoding='utf-8') as f:
                f.write(icerik)
            print("AndroidManifest.xml successfully patched")
            return True
        else:
            print("No changes made to AndroidManifest.xml")
            return True
            
    except Exception as e:
        print(f"Failed to patch AndroidManifest.xml: {e}")
        return False

def process_manifest_patcher(apk_yolu, jar_file):
    if not os.path.exists(apk_yolu):
        print(f"APK file not found: {apk_yolu}")
        return False

    orijinal_klasor = os.getcwd()
    apk_abs_yolu = os.path.abspath(apk_yolu)
    jar_abs_yolu = os.path.join(orijinal_klasor, jar_file)
    
    base_name = os.path.splitext(os.path.basename(apk_yolu))[0]
    output_apk = f"{base_name}-patched.apk"
    output_abs_yolu = os.path.join(orijinal_klasor, output_apk)
    
    work_dir = os.path.expanduser("~/apk_patch_work")
    if os.path.exists(work_dir):
        shutil.rmtree(work_dir, ignore_errors=True)
    os.makedirs(work_dir, exist_ok=True)
    
    try:
        os.chdir(work_dir)
        print("Copying files to working directory...")
        shutil.copy2(apk_abs_yolu, "input.apk")
        shutil.copy2(jar_abs_yolu, jar_file)
        
        decompile_dir = "decompiled_app"
        print("Step 1/2: Decompiling APK")
        baslangic_zamani = time.time()
        if not decompile_apk("input.apk", decompile_dir, jar_file):
            return False
        print(f"Decompile completed in {time.time() - baslangic_zamani:.1f} seconds")
        
        print("Step 2/2: Patching AndroidManifest.xml")
        baslangic_zamani = time.time()
        if not patch_android_manifest(decompile_dir):
            print("Failed to patch AndroidManifest.xml")
            return False
        print(f"AndroidManifest.xml patched in {time.time() - baslangic_zamani:.1f} seconds")
        
        print("Step 3/3: Building patched APK")
        baslangic_zamani = time.time()
        if not build_apk(decompile_dir, "output.apk", jar_file):
            return False
        print(f"Building completed in {time.time() - baslangic_zamani:.1f} seconds")
        
        if os.path.exists("output.apk"):
            shutil.move("output.apk", output_abs_yolu)
            dosya_boyutu = os.path.getsize(output_abs_yolu) / (1024 * 1024)
            print(f"Final APK: {output_apk} ({dosya_boyutu:.2f} MB)")
            
            if os.path.exists(apk_abs_yolu):
                os.remove(apk_abs_yolu)
                print(f"Deleted previous APK: {os.path.basename(apk_abs_yolu)}")
            
            return True
        else:
            print("Output APK not found")
            return False
            
    except Exception as e:
        print(f"Processing error: {e}")
        return False
    finally:
        os.chdir(orijinal_klasor)
        if os.path.exists(work_dir):
            shutil.rmtree(work_dir, ignore_errors=True)


def ensure_apkeditor():
    jar = find_apkeditor_jar()
    if jar:
        print(f"APKEditor jar found: {jar}")
        return jar
    name, url = get_latest_apkeditor_url()
    print("APKEditor jar not found. Downloading latest version...")
    download_file(url, name)
    return name

def download_file(url, outname):
    print(f"Downloading: {url}")
    req = urllib.request.Request(url, headers={'User-Agent': 'flutter_patcher/1.0'})
    with urllib.request.urlopen(req) as resp, open(outname, 'wb') as f:
        shutil.copyfileobj(resp, f)
    print("Download completed.")

def get_latest_apkeditor_url():
    api_url = "https://api.github.com/repos/REAndroid/APKEditor/releases/latest"
    try:
        with urllib.request.urlopen(api_url) as resp:
            data = json.load(resp)
        for asset in data.get("assets", []):
            if asset["name"].endswith(".jar") and "apkeditor" in asset["name"].lower():
                return asset["name"], asset["browser_download_url"]
    except Exception:
        pass
    return "APKEditor.jar", "https://github.com/REAndroid/APKEditor/releases/latest/download/APKEditor.jar"

def has_java():
    return shutil.which("java") is not None

def run_merge(jarfile, apks, apk):
    cmd = ["java", "-jar", jarfile, "m", "-i", apks, "-o", apk]
    print("Merging split APKs...")
    return subprocess.call(cmd)

def auto_clean_splitfolder(base_name):
    folder = os.path.abspath(base_name)
    if os.path.isdir(folder):
        try:
            shutil.rmtree(folder)
            print(f"Split folder auto-cleaned: {folder}")
        except Exception as e:
            print(f"Warning: {folder} could not be removed: {e}")


def main():
    print("="*60)
    print("FLUTTER SMALI PATCHER - COMBINED VERSION")
    print("="*60)
    print(f"Flutter Patch: {'ENABLED' if ENABLE_FLUTTER_PATCH else 'DISABLED'}")
    print(f"Manifest Patch: {'ENABLED' if ENABLE_MANIFEST_PATCH else 'DISABLED'}")
    print(f"PP Patching: {'ENABLED' if ENABLE_PP_PATCH else 'DISABLED'}")
    print(f"ASM Patching: {'ENABLED' if ENABLE_ASM_PATCH else 'DISABLED'}")
    print(f"TRUE Patch: {'ENABLED' if ENABLE_TRUE_PATCH else 'DISABLED'}")
    print(f"FALSE Patch: {'ENABLED' if ENABLE_FALSE_PATCH else 'DISABLED'}")
    print(f"TRUE Keywords: {KEYWORDS_TRUE}")
    print(f"FALSE Keywords: {KEYWORDS_FALSE}")
    print(f"ASM Regex Patterns: {len(ASM_REGEX_PATTERNS)} patterns")
    print("Method: Combined PP.TXT + ASM folder search")
    print("="*60 + "\n")

    if ENABLE_AUTO_INSTALL:
        print("AUTO INSTALLATION MODE ACTIVE")
        if not run_auto_installation():
            print("Auto installation failed. Manual installation may be required.")
            input("Press ENTER to continue...")

    # Find APK file
    apk = None
    apks = None

    for f in os.listdir('.'):
        if f.endswith(".apk"):
            apk = os.path.abspath(f)
            break

    if apk is None:
        for f in os.listdir('.'):
            if f.endswith(".apks"):
                apks = os.path.abspath(f)
                break

    if not apk and not apks:
        print("No APK/APKS file found.")
        return

    if apk:
        apk_dir = os.path.dirname(apk) or "."
    else:
        apk_dir = os.path.dirname(apks) or "."
    
    print(f"APK directory: {apk_dir}")

    
    if apks:
        if not has_java():
            print("Java not found — Termux: pkg install openjdk-17")
            return

        jar = ensure_apkeditor()
        outfile = apks.replace(".apks", ".apk")

        print(f"Merging {apks} → {outfile}...")
        if run_merge(jar, apks, outfile) != 0:
            print("APKS merge failed.")
            return

        print("APKS successfully merged to APK.")
        auto_clean_splitfolder(os.path.splitext(apks)[0])
        apk = outfile

    print(f"Using APK: {apk}")
    

    if ENABLE_FLUTTER_PATCH:
        print("\n" + "="*60)
        print("Starting Combined Flutter Patching")
        print("="*60)
        apk = process_flutter_patch_combined(apk)
    else:
        print("\n" + "="*60)
        print("Flutter Patching Disabled")
        print("="*60 + "\n")
    
  
    if ENABLE_MANIFEST_PATCH:
        print("\n" + "="*60)
        print("Manifest Patching Process")
        print("="*60)
        
        jar_file = check_apkeditor_main()
        baslangic_zamani = time.time()
        
        if process_manifest_patcher(apk, jar_file):
            toplam_sure = time.time() - baslangic_zamani
            print(f"Manifest patching completed in {toplam_sure:.1f} seconds")
        else:
            print("Manifest patching failed")
    else:
        print("\n" + "="*60)
        print("Manifest Patching Disabled")
        print("="*60 + "\n")
    
    print("\n" + "="*60)
    print("PROCESS COMPLETED — (⚡smngn⚡) PATCH FINISHED")
    print("="*60)
    print("Check pp.txt and smngn.txt for matches")
    print("="*60)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nProcess cancelled by user.")
        sys.exit(0)
    except Exception as e:
        print(f"Unexpected error: {e}")
        print(f"Traceback: {traceback.format_exc()}")
        sys.exit(1)