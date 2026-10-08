"""Assemble dist/ — the files the server actually needs.

No bundler: the site is vanilla HTML/CSS/JS, so a "build" is just copying
every file the page references and leaving the rest (sources, PRD, tests)
behind. Run: python build.py
"""
import io, os, re, shutil

ENTRY = ("index.html", "css/styles.css", "js/main.js", "js/smoke.js")
SITE = "https://mahaprayag.com/"          # share-preview URLs are absolute
DIST = "dist"

PAT = re.compile(
    r'(?:src|href)="([^"]+)"'                      # 1 plain link
    r'|srcset="([^"]+)"'                           # 2 responsive set
    r'|url\((["\']?)([^"\')]+)\3\)'                # 4 stylesheet url()
    r'|content="(' + re.escape(SITE) + r'[^"]+)"'  # 5 absolute og:/twitter: asset
)

refs = set(ENTRY)
for entry in ENTRY:
    base = os.path.dirname(entry)
    for one, srcset, _q, css_url, meta in PAT.findall(io.open(entry, encoding="utf-8").read()):
        for cand in [one, css_url, meta] + [p.split()[0] for p in srcset.split(",") if p.strip()]:
            cand = cand.split("?")[0].split("#")[0].strip()
            if cand.startswith(SITE):
                cand = cand[len(SITE):]
            elif "://" in cand or cand.startswith(("//", "mailto:", "tel:", "data:")):
                continue
            if not cand or "%" in cand:
                continue
            refs.add(os.path.normpath(os.path.join(base, cand)).replace("\\", "/"))

missing = sorted(r for r in refs if not os.path.isfile(r))
assert not missing, "referenced but not on disk: %s" % missing

shutil.rmtree(DIST, ignore_errors=True)
total = 0
for r in sorted(refs):
    dest = os.path.join(DIST, r)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    shutil.copy2(r, dest)
    total += os.path.getsize(dest)

print("dist: %d files, %.0f KB" % (len(refs), total / 1024))
left = sorted(set(os.listdir("assets")) - {os.path.basename(r) for r in refs})
print("unreferenced assets left out:", ", ".join(left) or "none")
