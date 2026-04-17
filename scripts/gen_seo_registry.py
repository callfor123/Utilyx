#!/usr/bin/env python3
"""Generate enriched seo-registry.ts with 53 entries."""
import os

def esc(s):
    """Escape for TypeScript single-quoted strings."""
    return s.replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n')

def fmt_entry(e):
    slug = e['slug']
    lines = []
    lines.append(f"  '{slug}': {{")
    lines.append(f"    toolId: '{e['toolId']}', category: '{e['category']}', slug: '{slug}',")
    lines.append(f"    title: '{esc(e['title'])}',")
    lines.append(f"    desc: '{esc(e['desc'])}',")
    lines.append(f"    h1: '{esc(e['h1'])}',")
    lines.append(f"    intro: '{esc(e['intro'])}',")
    lines.append(f"    faq: [")
    for f in e['faq']:
        lines.append(f"      {{ q: '{esc(f['q'])}', a: '{esc(f['a'])}' }},")
    lines.append(f"    ],")
    lines.append(f"    howTo: [{', '.join(repr(s) for s in e['howTo'])}],")
    lines.append(f"    relatedSlugs: [{', '.join(repr(s) for s in e['relatedSlugs'])}],")
    lines.append(f"  }},")
    return '\n'.join(lines)

entries = []
