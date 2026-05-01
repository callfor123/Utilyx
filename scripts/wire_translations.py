"""
Script to wire up useTranslations in all tool components.
For each file: add import, add const t, replace static CardTitle/CardDescription text.
"""
import re, os

# Map: file -> (title_key, desc_key, title_text_pattern, desc_text_pattern)
# title_text_pattern: the exact text between CardTitle tags (stripped)
# desc_text_pattern: the exact text between CardDescription tags (stripped)

COMPONENTS = [
    # dev-seo
    ("src/components/tools/dev-seo/regex-tester.tsx",
     "regexTester", "regexTesterDesc",
     "Testeur d'expressions régulières", "Testez et déboguez vos expressions régulières en temps réel"),
    ("src/components/tools/dev-seo/json-formatter.tsx",
     "jsonFormatter", "jsonFormatterDesc",
     "JSON Formatter", "Formatez, validez et minifiez vos données JSON."),
    ("src/components/tools/dev-seo/url-encode-decode.tsx",
     "urlEncodeDecode", "urlEncodeDecodeDesc",
     "URL Encode / Decode", "Encodez ou décodez des URLs en temps réel."),
    ("src/components/tools/dev-seo/css-gradient-generator.tsx",
     "cssGradient", "cssGradientDesc",
     "CSS Gradient Generator", "Créez des dégradés CSS visuellement et copiez le code."),
    ("src/components/tools/dev-seo/sitemap-robots.tsx",
     "sitemapRobots", "sitemapRobotsDesc",
     "Sitemap XML &amp; Robots.txt", "Générez des fichiers sitemap et robots.txt optimisés pour le référencement"),
    ("src/components/tools/dev-seo/meta-tags.tsx",
     "metaTagsGenerator", "metaTagsDesc",
     "Générateur de balises meta", "Créez des balises meta SEO optimisées et visualisez les aperçus en temps réel"),
    ("src/components/tools/dev-seo/markdown-interpreter.tsx",
     "markdownInterpreter", "markdownInterpreterDesc",
     "Interpreteur Markdown", "Ecrivez et previsualisez votre Markdown en temps reel. Support de la syntaxe courante."),
    # image
    ("src/components/tools/image/youtube-thumbnail.tsx",
     "youtubeThumbnail", "youtubeThumbnailDesc",
     "Téléchargeur de Miniatures YouTube", "Obtenez instantanément la miniature d'une vidéo YouTube en haute définition (HD, SD)."),
    # calculators
    ("src/components/tools/calculators/concrete-calculator.tsx",
     "concreteCalc", "concreteCalcDesc",
     "Calculateur de Dosage Béton", "Estimez rapidement les quantités de ciment, de sable, de gravier et d'eau nécessaires pour votre dalle ou vos fondations."),
    ("src/components/tools/calculators/tip-calculator.tsx",
     "tipCalc", "tipCalcDesc",
     "Calculateur de Pourboire", "Calculez le pourboire et la répartition entre convives."),
    ("src/components/tools/calculators/percentage-calculator.tsx",
     "percentageCalc", "percentageCalcDesc",
     "Percentage Calculator", "Tous les calculs de pourcentages dont vous avez besoin."),
    ("src/components/tools/calculators/mileage-calculator.tsx",
     "mileageCalculator", "mileageCalcDesc",
     "Calculateur de Frais Kilométriques", "Calculez vos indemnités kilométriques globales. Saisissez la distance et le taux de remboursement de votre pays ou entreprise."),
    ("src/components/tools/calculators/unit-converter.tsx",
     "unitConverter", "unitConverterDesc",
     "Unit Converter", "Convertissez entre différentes unités de mesure."),
    ("src/components/tools/calculators/bmi-calculator.tsx",
     "bmiCalc", "bmiCalcDesc",
     "BMI Calculator", "Calculez votre indice de masse corporelle (IMC)."),
    ("src/components/tools/calculators/vat-calculator.tsx",
     "vatCalc", "vatCalcDesc",
     "Calculateur de TVA", "Calculez le montant HT, TTC et la TVA à partir de n&apos;importe quel taux."),
    ("src/components/tools/calculators/age-calculator.tsx",
     "ageCalc", "ageCalcDesc",
     "Age Calculator", "Calculez votre âge exact en années, mois et jours."),
    # text-tools
    ("src/components/tools/text-tools/case-converter.tsx",
     "caseConverter", "caseConverterDesc",
     "Convertisseur de Casse", "Convertissez votre texte entre différents formats de casse."),
    ("src/components/tools/text-tools/name-splitter.tsx",
     "nameSplitter", "nameSplitterDesc",
     "Séparateur Prénom / Nom", "Collez votre liste de noms complets avec espaces (un par ligne) pour générer automatiquement une liste \"Prénom;Nom\" compatible Excel ou CRM."),
    ("src/components/tools/text-tools/base64-encode-decode.tsx",
     "base64", "base64Desc",
     "Base64 Encode / Decode", "Encodez du texte en Base64 ou décodez une chaîne Base64."),
    ("src/components/tools/text-tools/word-counter.tsx",
     "wordCounter", "wordCounterDesc",
     "Compteur de Mots", "Comptez les mots, caractères, phrases et paragraphes en temps réel."),
    ("src/components/tools/text-tools/lorem-ipsum-generator.tsx",
     "loremIpsum", "loremIpsumDesc",
     "Générateur Lorem Ipsum", "Générez du texte placeholder pour vos maquettes et projets."),
    ("src/components/tools/text-tools/text-diff-checker.tsx",
     "textDiff", "textDiffDesc",
     "Comparateur de Texte", "Comparez deux textes et visualisez les différences."),
    ("src/components/tools/text-tools/url-cleaner.tsx",
     "urlCleaner", "urlCleanerDesc",
     "Nettoyeur de Lien (Anti-Tracking)", "Retirez les paramètres de tracking indésirables (utm, fbclid, ref amazon...) pour obtenir un lien propre et neutre à partager."),
    # generators
    ("src/components/tools/generators/hash-generator.tsx",
     "hashGenerator", "hashDesc",
     "Hash Generator", "Générez des hash MD5, SHA-1, SHA-256, SHA-384 et SHA-512."),
    ("src/components/tools/generators/password-generator.tsx",
     "passwordGenerator", "passwordGeneratorDesc",
     "Password Generator", "Générez des mots de passe sécurisés et aléatoires."),
    ("src/components/tools/generators/random-number-generator.tsx",
     "randomNumberGenerator", "randomNumberGeneratorDesc",
     "Générateur de Nombre Aléatoire", "Générez un ou plusieurs nombres aléatoires dans une plage donnée."),
    ("src/components/tools/generators/color-picker.tsx",
     "colorPicker", "colorPickerDesc",
     "Color Picker", "Sélectionnez une couleur et obtenez ses valeurs HEX, RGB, HSL."),
    ("src/components/tools/generators/qr-code-generator.tsx",
     "qrCodeGenerator", "qrCodeDesc",
     "QR Code Generator", "Générez des QR codes pour URLs, texte, WiFi, email et téléphone."),
    ("src/components/tools/generators/uuid-generator.tsx",
     "uuidGenerator", "uuidGeneratorDesc",
     "Générateur d'UUID / GUID", "Générez instantanément des UUID (Universally Unique Identifiers) version 4 parfaitement aléatoires et sécurisés."),
]

IMPORT_INTL = "import { useTranslations } from 'next-intl'"

def add_import(content, file_path):
    """Add useTranslations import if not present."""
    if "useTranslations" in content:
        return content
    # Find first 'import' line and add after it, or after 'use client'
    # Strategy: insert after the last import that doesn't include 'next-intl'
    lines = content.split('\n')
    last_import_idx = -1
    for i, line in enumerate(lines):
        if line.strip().startswith('import '):
            last_import_idx = i
    if last_import_idx >= 0:
        lines.insert(last_import_idx + 1, IMPORT_INTL)
        return '\n'.join(lines)
    return content

def add_const_t(content):
    """Add const t = useTranslations('ToolsUI') in the component function body."""
    if "const t = useTranslations" in content:
        return content
    # Find the first useState or the function body opening
    # Insert after the last useState/useRef/useMemo/useEffect declaration block
    # Simple approach: find 'return (' and insert before it
    # But we want to insert at top of function body
    # Strategy: find the export function line, find the opening brace, then add after existing hooks
    
    # Find last line with useState/useRef/useReducer/useCallback before 'return ('
    lines = content.split('\n')
    return_idx = -1
    last_hook_idx = -1
    in_function = False
    
    for i, line in enumerate(lines):
        if re.match(r'^export (default )?function ', line) or re.match(r'^export const \w+ = ', line):
            in_function = True
        if in_function:
            if re.search(r'\b(useState|useRef|useReducer|useCallback|useMemo|useEffect)\b', line):
                last_hook_idx = i
            if line.strip() == 'return (' or line.strip().startswith('return (') or line.strip() == 'return(':
                return_idx = i
                break
    
    insert_after = last_hook_idx if last_hook_idx >= 0 else (return_idx - 1 if return_idx > 0 else -1)
    
    if insert_after >= 0:
        lines.insert(insert_after + 1, "  const t = useTranslations('ToolsUI')")
        return '\n'.join(lines)
    return content

def replace_card_text(content, title_text, title_key, desc_text, desc_key):
    """Replace static CardTitle and CardDescription text with t() calls."""
    # Replace title - handle both inline and multiline patterns
    # Pattern: text inside CardTitle tags
    escaped_title = re.escape(title_text)
    content = re.sub(
        r'(<CardTitle[^>]*>)(.*?)(' + escaped_title + r')(.*?)(</CardTitle>)',
        lambda m: m.group(1) + m.group(2) + "{t('" + title_key + "')}" + m.group(4) + m.group(5),
        content, flags=re.DOTALL
    )
    
    # Replace desc - handle multiline
    escaped_desc = re.escape(desc_text)
    content = re.sub(
        r'(<CardDescription[^>]*>)\s*' + escaped_desc + r'\s*(</CardDescription>)',
        r"\1{t('" + desc_key + r"')}\2",
        content, flags=re.DOTALL
    )
    
    return content

errors = []
for filepath, title_key, desc_key, title_text, desc_text in COMPONENTS:
    if not os.path.exists(filepath):
        print(f"SKIP (not found): {filepath}")
        continue
    
    with open(filepath, encoding='utf-8') as f:
        content = f.read()
    
    original = content
    content = add_import(content, filepath)
    content = add_const_t(content)
    content = replace_card_text(content, title_text, title_key, desc_text, desc_key)
    
    if content == original:
        print(f"WARN (no change): {filepath}")
    else:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"OK: {os.path.basename(filepath)}")

print("\nDone!")
