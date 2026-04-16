import type { ToolId, ModuleId } from './tools-store'

export interface ToolSeoEntry {
  toolId: ToolId
  category: ModuleId
  slug: string
  title: string
  desc: string
  h1: string
  intro: string
  faq: { q: string; a: string }[]
  howTo: string[]
  relatedSlugs: string[]
}

/**
 * Central SEO registry: maps every slug to its tool + rich SEO content.
 * This is the SINGLE source of truth for sitemap, metadata and page rendering.
 */
export const seoRegistry: Record<string, ToolSeoEntry> = {
  // ─── PDF ────────────────────────────────────────────────────────────
  'compresser-pdf': {
    toolId: 'pdf-compress', category: 'pdf', slug: 'compresser-pdf',
    title: 'Compresser PDF en Ligne Gratuit — Réduire Taille PDF',
    desc: 'Réduisez la taille de vos fichiers PDF jusqu\'à 80% gratuitement. Aucune inscription, traitement 100% local dans votre navigateur.',
    h1: 'Compresser un fichier PDF en ligne gratuitement',
    intro: 'Notre outil de compression PDF réduit instantanément la taille de vos documents sans perte de qualité visible. Idéal pour envoyer des fichiers par email, les télécharger sur un site ou les stocker sans gaspiller d\'espace. Aucun fichier n\'est envoyé à un serveur : tout se passe dans votre navigateur.',
    faq: [
      { q: 'Comment compresser un PDF gratuitement ?', a: 'Glissez-déposez votre fichier PDF dans l\'outil ci-dessus, choisissez le niveau de compression souhaité, puis téléchargez le résultat. Tout est gratuit et sans inscription.' },
      { q: 'Mes fichiers sont-ils en sécurité ?', a: 'Oui, 100%. Le traitement se fait entièrement dans votre navigateur web. Aucun fichier n\'est envoyé à nos serveurs ni stocké en ligne.' },
      { q: 'Quelle est la taille maximale autorisée ?', a: 'Comme tout est traité en local, il n\'y a pas de limite stricte. La seule limitation est la mémoire de votre appareil.' },
    ],
    howTo: ['Glissez votre fichier PDF dans la zone de dépôt', 'Choisissez le niveau de compression', 'Cliquez sur "Compresser" et téléchargez le résultat'],
    relatedSlugs: ['fusionner-pdf', 'proteger-pdf', 'deverrouiller-pdf'],
  },
  'fusionner-pdf': {
    toolId: 'pdf-merge', category: 'pdf', slug: 'fusionner-pdf',
    title: 'Fusionner PDF en Ligne Gratuit — Combiner Plusieurs PDF',
    desc: 'Fusionnez plusieurs fichiers PDF en un seul document en quelques secondes. Gratuit, sans inscription, traitement local.',
    h1: 'Fusionner plusieurs PDF en un seul fichier',
    intro: 'Combinez facilement 2 ou plusieurs documents PDF en un seul fichier. Réorganisez l\'ordre des pages par glisser-déposer avant de fusionner. Parfait pour assembler des factures, des rapports ou des documents administratifs.',
    faq: [
      { q: 'Comment fusionner des PDF en ligne ?', a: 'Ajoutez vos fichiers PDF dans l\'outil, réorganisez-les dans l\'ordre souhaité, puis cliquez sur Fusionner. Vous obtiendrez un seul PDF combiné.' },
      { q: 'Combien de fichiers puis-je fusionner ?', a: 'Il n\'y a pas de limite au nombre de fichiers. Vous pouvez en combiner autant que vous le souhaitez.' },
    ],
    howTo: ['Ajoutez vos fichiers PDF', 'Réorganisez l\'ordre par glisser-déposer', 'Cliquez sur Fusionner et téléchargez'],
    relatedSlugs: ['compresser-pdf', 'pdf-en-images', 'signer-pdf'],
  },
  'pdf-en-images': {
    toolId: 'pdf-convert', category: 'pdf', slug: 'pdf-en-images',
    title: 'Convertir PDF en Images JPG PNG en Ligne Gratuit',
    desc: 'Convertissez chaque page de votre PDF en image JPG ou PNG haute qualité. Gratuit et sans inscription.',
    h1: 'Convertir un PDF en images JPG ou PNG',
    intro: 'Transformez chaque page de vos documents PDF en images haute résolution. Utile pour intégrer des pages dans une présentation, les partager sur les réseaux sociaux ou les éditer dans un logiciel de retouche photo.',
    faq: [
      { q: 'En quel format seront mes images ?', a: 'Vous pouvez choisir entre JPG (léger) et PNG (qualité maximale, transparence possible).' },
      { q: 'La qualité est-elle bonne ?', a: 'Oui, les images sont générées en haute résolution directement dans votre navigateur.' },
    ],
    howTo: ['Chargez votre PDF', 'Choisissez le format de sortie (JPG ou PNG)', 'Téléchargez les images générées'],
    relatedSlugs: ['compresser-pdf', 'fusionner-pdf', 'convertir-image'],
  },
  'signer-pdf': {
    toolId: 'pdf-sign', category: 'pdf', slug: 'signer-pdf',
    title: 'Signer PDF en Ligne Gratuit — Signature Électronique',
    desc: 'Signez et annotez vos documents PDF directement dans le navigateur. Dessinez ou tapez votre signature. 100% gratuit.',
    h1: 'Signer un document PDF en ligne',
    intro: 'Ajoutez votre signature manuscrite ou tapée à n\'importe quel document PDF sans imprimer ni scanner. Idéal pour les contrats, les bons de commande et les formulaires administratifs.',
    faq: [
      { q: 'Ma signature est-elle juridiquement valide ?', a: 'Notre outil crée une signature simple. Pour une valeur juridique renforcée, consultez un service de signature électronique certifié eIDAS.' },
    ],
    howTo: ['Chargez votre PDF', 'Dessinez ou tapez votre signature', 'Positionnez-la sur le document et téléchargez'],
    relatedSlugs: ['compresser-pdf', 'proteger-pdf', 'fusionner-pdf'],
  },
  'deverrouiller-pdf': {
    toolId: 'pdf-unlock', category: 'pdf', slug: 'deverrouiller-pdf',
    title: 'Déverrouiller PDF en Ligne Gratuit — Retirer Mot de Passe',
    desc: 'Retirez le mot de passe de protection de vos fichiers PDF facilement. Gratuit et 100% dans votre navigateur.',
    h1: 'Déverrouiller un PDF protégé par mot de passe',
    intro: 'Vous avez un PDF protégé dont vous connaissez le mot de passe mais vous voulez en retirer la protection ? Cet outil supprime la restriction de mot de passe de vos documents PDF en un clic.',
    faq: [
      { q: 'Puis-je déverrouiller un PDF dont je ne connais pas le mot de passe ?', a: 'Non. Cet outil permet uniquement de retirer la protection d\'un PDF dont vous connaissez déjà le mot de passe. Il ne contourne aucune sécurité.' },
    ],
    howTo: ['Chargez votre PDF protégé', 'Entrez le mot de passe actuel', 'Téléchargez le PDF sans protection'],
    relatedSlugs: ['proteger-pdf', 'compresser-pdf', 'fusionner-pdf'],
  },
  'proteger-pdf': {
    toolId: 'pdf-protect', category: 'pdf', slug: 'proteger-pdf',
    title: 'Protéger PDF avec Mot de Passe en Ligne Gratuit',
    desc: 'Ajoutez un mot de passe à votre PDF pour le sécuriser. Chiffrement AES, traitement 100% local.',
    h1: 'Protéger un PDF avec un mot de passe',
    intro: 'Sécurisez vos documents confidentiels en ajoutant un mot de passe. Le chiffrement se fait directement dans votre navigateur — aucun fichier n\'est envoyé en ligne.',
    faq: [
      { q: 'Quel type de chiffrement est utilisé ?', a: 'Le chiffrement AES-256 est utilisé, le même standard que les banques et les gouvernements.' },
    ],
    howTo: ['Chargez votre PDF', 'Définissez un mot de passe', 'Téléchargez le PDF protégé'],
    relatedSlugs: ['deverrouiller-pdf', 'compresser-pdf', 'signer-pdf'],
  },
  // ─── IMAGE ──────────────────────────────────────────────────────────
  'convertir-image': {
    toolId: 'img-convert', category: 'image', slug: 'convertir-image',
    title: 'Convertisseur d\'Images en Ligne Gratuit — WebP, AVIF, JPG, PNG',
    desc: 'Convertissez vos images entre WebP, AVIF, JPG et PNG gratuitement. Traitement ultra-rapide 100% dans votre navigateur.',
    h1: 'Convertir vos images en WebP, AVIF, JPG ou PNG',
    intro: 'Besoin de convertir une image WebP en JPG pour la compatibilité, ou transformer vos JPG en WebP pour accélérer votre site ? Notre convertisseur gère tous les formats modernes : WebP, AVIF, JPG, PNG, et plus encore.',
    faq: [
      { q: 'Pourquoi convertir en WebP ?', a: 'Le format WebP est jusqu\'à 30% plus léger que le JPG à qualité égale. Google recommande ce format pour améliorer le chargement de vos pages web.' },
      { q: 'Qu\'est-ce que le format AVIF ?', a: 'AVIF est le successeur du WebP, encore plus compressé. Il est supporté par Chrome, Firefox et Safari modernes.' },
    ],
    howTo: ['Ajoutez vos images', 'Choisissez le format cible', 'Téléchargez les images converties'],
    relatedSlugs: ['compresser-image', 'redimensionner-image', 'heic-vers-jpg'],
  },
  'compresser-image': {
    toolId: 'img-compress', category: 'image', slug: 'compresser-image',
    title: 'Compresser Image en Ligne Gratuit — Réduire Poids Photo',
    desc: 'Optimisez le poids de vos images JPG, PNG, WebP sans perte de qualité visible. Gratuit et traitement local.',
    h1: 'Compresser vos images en ligne',
    intro: 'Réduisez le poids de vos photos et images sans sacrifier la qualité visuelle. Idéal pour accélérer le chargement de votre site web ou pour respecter les limites de taille des pièces jointes email.',
    faq: [
      { q: 'La qualité va-t-elle diminuer ?', a: 'La compression intelligente réduit le poids du fichier tout en préservant une qualité visuelle quasi identique à l\'original.' },
    ],
    howTo: ['Glissez vos images dans l\'outil', 'Ajustez le niveau de qualité', 'Téléchargez les images optimisées'],
    relatedSlugs: ['convertir-image', 'redimensionner-image', 'compresser-pdf'],
  },
  'redimensionner-image': {
    toolId: 'img-resize', category: 'image', slug: 'redimensionner-image',
    title: 'Redimensionner Image en Ligne Gratuit — Changer Taille Photo',
    desc: 'Redimensionnez vos images aux dimensions exactes en pixels ou en pourcentage. Gratuit et sans inscription.',
    h1: 'Redimensionner une image en ligne',
    intro: 'Changez la taille de vos images en quelques clics. Définissez les dimensions en pixels ou en pourcentage, avec ou sans conservation des proportions.',
    faq: [
      { q: 'Puis-je garder les proportions ?', a: 'Oui, activez le verrou de ratio pour conserver les proportions d\'origine automatiquement.' },
    ],
    howTo: ['Chargez votre image', 'Définissez la nouvelle taille', 'Téléchargez l\'image redimensionnée'],
    relatedSlugs: ['compresser-image', 'convertir-image', 'supprimer-arriere-plan'],
  },
  'supprimer-arriere-plan': {
    toolId: 'img-bgremove', category: 'image', slug: 'supprimer-arriere-plan',
    title: 'Supprimer Arrière-Plan Image en Ligne Gratuit — Détourage Auto',
    desc: 'Retirez l\'arrière-plan de vos images automatiquement grâce à l\'IA. Gratuit, sans inscription et rapide.',
    h1: 'Supprimer l\'arrière-plan d\'une image automatiquement',
    intro: 'Notre outil de détourage automatique utilise l\'intelligence artificielle pour retirer l\'arrière-plan de vos photos en quelques secondes. Parfait pour les photos de produits e-commerce, les portraits ou les montages.',
    faq: [
      { q: 'L\'IA fonctionne-t-elle sur tous les types de photos ?', a: 'L\'outil fonctionne très bien sur les portraits, les objets et les produits. Les scènes complexes avec des cheveux fins peuvent nécessiter de petites retouches.' },
    ],
    howTo: ['Chargez votre image', 'L\'IA détecte et supprime l\'arrière-plan', 'Téléchargez l\'image détourée en PNG transparent'],
    relatedSlugs: ['compresser-image', 'convertir-image', 'redimensionner-image'],
  },
  'heic-vers-jpg': {
    toolId: 'heic-to-jpg', category: 'image', slug: 'heic-vers-jpg',
    title: 'Convertir HEIC en JPG en Ligne Gratuit — Photos iPhone',
    desc: 'Convertissez vos photos iPhone HEIC en JPG ou PNG en un clic. 100% gratuit et dans votre navigateur.',
    h1: 'Convertir les photos HEIC (iPhone) en JPG',
    intro: 'Votre iPhone prend des photos au format HEIC, mais certains logiciels ou sites web ne le supportent pas ? Convertissez-les instantanément en JPG ou PNG sans perte de qualité.',
    faq: [
      { q: 'Qu\'est-ce que le format HEIC ?', a: 'HEIC (High Efficiency Image Container) est le format photo par défaut d\'Apple depuis iOS 11. Il offre une meilleure compression que le JPG mais n\'est pas universellement compatible.' },
      { q: 'Puis-je convertir plusieurs photos à la fois ?', a: 'Oui, notre outil supporte la conversion par lot. Ajoutez toutes vos photos et convertissez-les en une seule opération.' },
    ],
    howTo: ['Ajoutez vos fichiers HEIC', 'Choisissez JPG ou PNG', 'Téléchargez les photos converties'],
    relatedSlugs: ['convertir-image', 'compresser-image', 'redimensionner-image'],
  },
  'generateur-favicon': {
    toolId: 'favicon-generator', category: 'image', slug: 'generateur-favicon',
    title: 'Générateur de Favicon en Ligne Gratuit — ICO, PNG, SVG',
    desc: 'Créez tous les formats de favicon pour votre site web en quelques secondes. ICO, PNG 16x16 à 512x512, Apple Touch Icon.',
    h1: 'Générer un favicon pour votre site web',
    intro: 'Uploadez une image et générez automatiquement toutes les tailles de favicon nécessaires pour votre site : ICO, PNG (16x16, 32x32, 180x180, 512x512), Apple Touch Icon et plus.',
    faq: [
      { q: 'Quelles tailles de favicon faut-il ?', a: 'Au minimum : favicon.ico (16x16 et 32x32), apple-touch-icon.png (180x180) et un icon-512x512.png pour le manifest PWA.' },
    ],
    howTo: ['Uploadez votre logo ou image', 'Toutes les tailles sont générées', 'Téléchargez le pack de favicons'],
    relatedSlugs: ['convertir-image', 'compresser-image', 'meta-tags'],
  },
  'telecharger-miniature-youtube': {
    toolId: 'youtube-thumbnail', category: 'image', slug: 'telecharger-miniature-youtube',
    title: 'Télécharger Miniature YouTube HD Gratuit — Thumbnail Downloader',
    desc: 'Téléchargez les miniatures HD (1280x720) de n\'importe quelle vidéo YouTube en un clic. 100% gratuit.',
    h1: 'Télécharger la miniature d\'une vidéo YouTube en HD',
    intro: 'Récupérez facilement la vignette (thumbnail) de n\'importe quelle vidéo YouTube en haute définition. Collez simplement l\'URL de la vidéo et téléchargez la miniature en qualité maximale (jusqu\'à 1280x720 pixels).',
    faq: [
      { q: 'Comment trouver la miniature d\'une vidéo YouTube ?', a: 'Copiez l\'URL de la vidéo YouTube, collez-la dans notre outil et cliquez sur Télécharger. La miniature HD apparaîtra instantanément.' },
      { q: 'Quelles résolutions sont disponibles ?', a: 'Nous proposons la miniature en plusieurs résolutions : 120x90, 320x180, 480x360, 640x480 et 1280x720 (HD max).' },
    ],
    howTo: ['Copiez l\'URL de la vidéo YouTube', 'Collez-la dans l\'outil', 'Téléchargez la miniature en HD'],
    relatedSlugs: ['convertir-image', 'compresser-image', 'redimensionner-image'],
  },
  // ─── VIDEO ──────────────────────────────────────────────────────────
  'decouper-video': {
    toolId: 'video-trim', category: 'video', slug: 'decouper-video',
    title: 'Découper Vidéo en Ligne Gratuit — Couper et Rogner MP4',
    desc: 'Découpez et coupez vos vidéos directement dans le navigateur. MP4, WebM, AVI. Gratuit, sans inscription, 100% privé.',
    h1: 'Découper une vidéo en ligne gratuitement',
    intro: 'Sélectionnez la portion exacte de votre vidéo que vous souhaitez conserver. Définissez le point de début et de fin, puis exportez. Idéal pour créer des extraits, des Reels Instagram ou des clips TikTok.',
    faq: [
      { q: 'Quels formats vidéo sont supportés ?', a: 'MP4, WebM, AVI, MKV et MOV sont tous pris en charge.' },
      { q: 'Ma vidéo est-elle envoyée sur un serveur ?', a: 'Non. Le découpage se fait entièrement dans votre navigateur grâce à FFmpeg.wasm. Vos fichiers restent privés.' },
    ],
    howTo: ['Chargez votre vidéo', 'Sélectionnez le début et la fin', 'Exportez le clip découpé'],
    relatedSlugs: ['compresser-video', 'convertir-video', 'video-en-gif'],
  },
  'compresser-video': {
    toolId: 'video-compress', category: 'video', slug: 'compresser-video',
    title: 'Compresser Vidéo en Ligne Gratuit — Réduire Taille MP4',
    desc: 'Réduisez la taille de vos vidéos MP4, WebM, AVI sans perte de qualité visible. 100% en ligne et gratuit.',
    h1: 'Compresser une vidéo en ligne',
    intro: 'Votre vidéo est trop lourde pour l\'envoyer par email ou la publier en ligne ? Réduisez sa taille sans perte de qualité visible. Le traitement se fait entièrement dans votre navigateur.',
    faq: [
      { q: 'De combien la taille sera-t-elle réduite ?', a: 'En moyenne, la taille est réduite de 40% à 80% selon la vidéo et le niveau de compression choisi.' },
    ],
    howTo: ['Chargez votre vidéo', 'Choisissez le niveau de compression', 'Téléchargez la vidéo compressée'],
    relatedSlugs: ['decouper-video', 'convertir-video', 'compresser-image'],
  },
  'convertir-video': {
    toolId: 'video-convert', category: 'video', slug: 'convertir-video',
    title: 'Convertisseur Vidéo en Ligne Gratuit — MP4, WebM, AVI, MKV',
    desc: 'Convertissez vos vidéos entre MP4, WebM, AVI, MKV, MOV et GIF gratuitement dans votre navigateur.',
    h1: 'Convertir une vidéo entre différents formats',
    intro: 'Changez le format de vos vidéos facilement. Convertissez en MP4 pour la compatibilité maximale, en WebM pour le web, ou en GIF pour les animations.',
    faq: [
      { q: 'Quel format choisir ?', a: 'MP4 (H.264) est le plus compatible. WebM est léger pour le web. MKV est idéal pour la qualité maximale.' },
    ],
    howTo: ['Chargez votre vidéo', 'Choisissez le format de sortie', 'Lancez la conversion et téléchargez'],
    relatedSlugs: ['compresser-video', 'decouper-video', 'video-en-gif'],
  },
  'ajouter-audio-video': {
    toolId: 'video-add-audio', category: 'video', slug: 'ajouter-audio-video',
    title: 'Ajouter Audio à une Vidéo en Ligne Gratuit',
    desc: 'Ajoutez de la musique, une voix-off ou un son à vos vidéos gratuitement directement dans le navigateur.',
    h1: 'Ajouter une piste audio à une vidéo',
    intro: 'Ajoutez facilement une bande sonore, une musique de fond ou une voix-off à vos vidéos. Parfait pour créer du contenu pour YouTube, TikTok ou Instagram.',
    faq: [{ q: 'Quels formats audio sont supportés ?', a: 'MP3, WAV, AAC, OGG et FLAC sont pris en charge.' }],
    howTo: ['Chargez votre vidéo', 'Ajoutez un fichier audio', 'Exportez la vidéo avec le nouvel audio'],
    relatedSlugs: ['extraire-audio-video', 'supprimer-audio-video', 'decouper-video'],
  },
  'extraire-audio-video': {
    toolId: 'video-extract-audio', category: 'video', slug: 'extraire-audio-video',
    title: 'Extraire Audio d\'une Vidéo en Ligne Gratuit — MP3, WAV',
    desc: 'Extrayez la piste audio de vos vidéos en MP3, WAV, AAC, OGG ou FLAC. 100% gratuit et dans le navigateur.',
    h1: 'Extraire l\'audio d\'une vidéo en MP3',
    intro: 'Récupérez uniquement la piste sonore de vos vidéos. Idéal pour extraire une musique, un podcast ou une interview depuis un fichier vidéo.',
    faq: [{ q: 'Puis-je choisir le format de sortie ?', a: 'Oui : MP3, WAV, AAC, OGG et FLAC sont disponibles.' }],
    howTo: ['Chargez votre vidéo', 'Choisissez le format audio', 'Téléchargez le fichier audio extrait'],
    relatedSlugs: ['ajouter-audio-video', 'supprimer-audio-video', 'decouper-video'],
  },
  'video-en-gif': {
    toolId: 'video-to-gif', category: 'video', slug: 'video-en-gif',
    title: 'Convertir Vidéo en GIF en Ligne Gratuit — Créer GIF Animé',
    desc: 'Créez des GIF animés à partir de vos vidéos avec contrôle total sur la durée et la qualité. Gratuit.',
    h1: 'Convertir une vidéo en GIF animé',
    intro: 'Transformez n\'importe quelle vidéo en GIF animé. Définissez le début, la fin, la taille et le nombre d\'images par seconde pour un résultat parfait.',
    faq: [{ q: 'Puis-je contrôler la qualité du GIF ?', a: 'Oui, vous pouvez ajuster la résolution, le FPS et la durée pour optimiser le poids du GIF.' }],
    howTo: ['Chargez votre vidéo', 'Sélectionnez la portion à convertir', 'Ajustez les paramètres et téléchargez le GIF'],
    relatedSlugs: ['decouper-video', 'convertir-video', 'compresser-video'],
  },
  'supprimer-audio-video': {
    toolId: 'video-remove-audio', category: 'video', slug: 'supprimer-audio-video',
    title: 'Supprimer Audio d\'une Vidéo en Ligne Gratuit — Vidéo Muette',
    desc: 'Retirez la piste audio de vos vidéos pour obtenir un fichier muet. 100% gratuit et dans le navigateur.',
    h1: 'Supprimer l\'audio d\'une vidéo',
    intro: 'Besoin d\'une vidéo sans son ? Supprimez instantanément la bande sonore de n\'importe quelle vidéo. Utile pour les présentations, les fond d\'écran animés ou pour remplacer l\'audio par une autre piste.',
    faq: [{ q: 'La qualité vidéo change-t-elle ?', a: 'Non, seule la piste audio est supprimée. La qualité vidéo reste identique.' }],
    howTo: ['Chargez votre vidéo', 'Cliquez sur Supprimer l\'audio', 'Téléchargez la vidéo muette'],
    relatedSlugs: ['ajouter-audio-video', 'extraire-audio-video', 'decouper-video'],
  },
  // ─── DEV & SEO ──────────────────────────────────────────────────────
  'json-csv': {
    toolId: 'json-csv', category: 'dev-seo', slug: 'json-csv',
    title: 'Convertir JSON en CSV en Ligne Gratuit et Vice Versa',
    desc: 'Convertissez facilement vos données entre JSON et CSV. Formatage, prévisualisation et téléchargement instantanés.',
    h1: 'Convertir JSON en CSV et CSV en JSON',
    intro: 'Transformez vos données JSON complexes en tableaux CSV lisibles dans Excel, et inversement. Idéal pour les développeurs, les data analysts et les marketeurs qui manipulent des données au quotidien.',
    faq: [{ q: 'Mon JSON imbriqué sera-t-il aplati ?', a: 'Oui, les objets imbriqués sont automatiquement aplatis en colonnes avec la notation par points (ex: adresse.ville).' }],
    howTo: ['Collez votre JSON ou CSV', 'Cliquez sur Convertir', 'Copiez ou téléchargez le résultat'],
    relatedSlugs: ['formateur-json', 'base64', 'compteur-mots'],
  },
  'testeur-regex': {
    toolId: 'regex-tester', category: 'dev-seo', slug: 'testeur-regex',
    title: 'Testeur de Regex en Ligne — Expressions Régulières en Temps Réel',
    desc: 'Testez et débuggez vos expressions régulières en temps réel avec coloration syntaxique et explication des groupes.',
    h1: 'Tester des expressions régulières (regex) en ligne',
    intro: 'Écrivez votre regex et voyez instantanément les correspondances surlignées dans votre texte. Supportez les flags g, i, m, s et les groupes de capture.',
    faq: [{ q: 'Quels langages de regex sont supportés ?', a: 'L\'outil utilise le moteur regex JavaScript natif de votre navigateur.' }],
    howTo: ['Entrez votre expression régulière', 'Tapez ou collez le texte à tester', 'Les correspondances s\'affichent en temps réel'],
    relatedSlugs: ['json-csv', 'formateur-json', 'url-encode-decode'],
  },
  'meta-tags': {
    toolId: 'meta-tags', category: 'dev-seo', slug: 'meta-tags',
    title: 'Générateur de Meta Tags SEO en Ligne Gratuit — Open Graph, Twitter',
    desc: 'Créez et prévisualisez vos balises meta (title, description, Open Graph, Twitter Cards) pour un SEO parfait.',
    h1: 'Générer des balises Meta Tags pour le SEO',
    intro: 'Créez les balises meta essentielles pour votre page web : title, description, Open Graph pour Facebook, Twitter Cards, et le code HTML prêt à copier. Prévisualisez le rendu Google, Facebook et Twitter.',
    faq: [{ q: 'Quelles balises sont générées ?', a: 'Title, meta description, Open Graph (og:title, og:description, og:image), Twitter Cards et la balise canonical.' }],
    howTo: ['Renseignez le titre et la description', 'Ajoutez l\'URL de votre image OG', 'Copiez le code HTML généré'],
    relatedSlugs: ['sitemap-robots', 'json-csv', 'compteur-mots'],
  },
  'sitemap-robots': {
    toolId: 'sitemap-robots', category: 'dev-seo', slug: 'sitemap-robots',
    title: 'Générateur Sitemap XML et Robots.txt en Ligne Gratuit',
    desc: 'Générez votre fichier sitemap.xml et robots.txt pour Google en quelques secondes. Gratuit.',
    h1: 'Générer un sitemap.xml et un robots.txt',
    intro: 'Créez un sitemap XML valide et un fichier robots.txt optimisé pour soumettre à Google Search Console. Indispensable pour le référencement de votre site.',
    faq: [{ q: 'Pourquoi ai-je besoin d\'un sitemap ?', a: 'Le sitemap aide Google à découvrir et indexer toutes les pages de votre site plus rapidement et efficacement.' }],
    howTo: ['Entrez vos URLs', 'Configurez les priorités et fréquences', 'Téléchargez le sitemap.xml'],
    relatedSlugs: ['meta-tags', 'formateur-json', 'json-csv'],
  },
  'formateur-json': {
    toolId: 'json-formatter', category: 'dev-seo', slug: 'formateur-json',
    title: 'JSON Formatter et Validateur en Ligne Gratuit',
    desc: 'Formatez, validez et minifiez vos données JSON en un clic. Coloration syntaxique et détection d\'erreurs.',
    h1: 'Formater et valider du JSON en ligne',
    intro: 'Formatez du JSON brut pour le rendre lisible, ou minifiez-le pour la production. L\'outil détecte et localise instantanément les erreurs de syntaxe.',
    faq: [{ q: 'L\'outil détecte-t-il les erreurs ?', a: 'Oui, les erreurs de syntaxe JSON sont détectées et leur position est indiquée pour un débogage rapide.' }],
    howTo: ['Collez votre JSON', 'Cliquez sur Formater ou Minifier', 'Copiez le résultat'],
    relatedSlugs: ['json-csv', 'testeur-regex', 'url-encode-decode'],
  },
  'url-encode-decode': {
    toolId: 'url-encode-decode', category: 'dev-seo', slug: 'url-encode-decode',
    title: 'URL Encode Decode en Ligne Gratuit — Encodeur Décodeur URL',
    desc: 'Encodez et décodez vos URLs et paramètres de requête rapidement. Gratuit et instantané.',
    h1: 'Encoder et décoder des URLs en ligne',
    intro: 'Encodez les caractères spéciaux de vos URLs pour les rendre valides, ou décodez des URLs encodées pour les rendre lisibles.',
    faq: [{ q: 'Qu\'est-ce que l\'URL encoding ?', a: 'C\'est le remplacement des caractères spéciaux (espaces, accents, &, =) par leur code en %XX pour les rendre valides dans une URL.' }],
    howTo: ['Collez votre URL ou texte', 'Cliquez sur Encoder ou Décoder', 'Copiez le résultat'],
    relatedSlugs: ['base64', 'formateur-json', 'nettoyeur-url-tracking'],
  },
  'css-gradient': {
    toolId: 'css-gradient-generator', category: 'dev-seo', slug: 'css-gradient',
    title: 'Générateur de Dégradé CSS en Ligne Gratuit — CSS Gradient Maker',
    desc: 'Créez des dégradés CSS (linear, radial) visuellement et copiez le code CSS dans votre projet.',
    h1: 'Créer des dégradés CSS visuellement',
    intro: 'Créez des dégradés linéaires ou radiaux en choisissant vos couleurs, l\'angle et les points de transition. Le code CSS se génère automatiquement en temps réel.',
    faq: [{ q: 'Le code est-il compatible tous navigateurs ?', a: 'Oui, le code généré inclut les préfixes vendeur si nécessaire pour une compatibilité maximale.' }],
    howTo: ['Choisissez vos couleurs', 'Ajustez l\'angle et la direction', 'Copiez le code CSS'],
    relatedSlugs: ['color-picker', 'meta-tags', 'markdown-preview'],
  },
  'markdown-preview': {
    toolId: 'markdown-preview', category: 'dev-seo', slug: 'markdown-preview',
    title: 'Éditeur Markdown en Ligne Gratuit avec Aperçu en Direct',
    desc: 'Écrivez en Markdown et voyez le rendu HTML en temps réel. Gratuit, rapide, sans inscription.',
    h1: 'Éditeur Markdown avec aperçu en temps réel',
    intro: 'Rédigez en Markdown dans l\'éditeur à gauche et visualisez le rendu HTML instantanément à droite. Supporte les tableaux, le code, les listes, les images et plus.',
    faq: [{ q: 'Quelles syntaxes Markdown sont supportées ?', a: 'Toute la syntaxe GitHub Flavored Markdown (GFM) : tableaux, cases à cocher, code avec coloration, emojis, etc.' }],
    howTo: ['Tapez en Markdown à gauche', 'L\'aperçu se met à jour en temps réel', 'Copiez le HTML généré'],
    relatedSlugs: ['compteur-mots', 'comparateur-texte', 'meta-tags'],
  },
  'nettoyeur-url-tracking': {
    toolId: 'url-cleaner', category: 'dev-seo', slug: 'nettoyeur-url-tracking',
    title: 'Nettoyeur d\'URL en Ligne — Supprimer UTM, fbclid, Tracking',
    desc: 'Supprimez instantanément les paramètres de suivi (utm_source, fbclid, gclid) de vos URLs pour des liens propres et courts.',
    h1: 'Nettoyer une URL : supprimer les trackers et paramètres UTM',
    intro: 'Quand vous copiez un lien depuis Amazon, Facebook, TikTok ou Google, l\'URL est souvent rallongée avec des dizaines de paramètres de tracking invisibles (utm_source, fbclid, gclid…). Notre outil les supprime en un clic pour vous donner un lien propre et court à partager.',
    faq: [
      { q: 'Quels paramètres de tracking sont supprimés ?', a: 'Tous les utm_* (source, medium, campaign…), fbclid, gclid, wbraid, gbraid, igshid, msclkid, mc_cid, les paramètres Amazon (pd_rd, pf_rd) et bien plus.' },
      { q: 'Le lien fonctionnera-t-il toujours ?', a: 'Oui ! Les paramètres de tracking sont uniquement utilisés pour les statistiques marketing, pas pour le fonctionnement du lien. Le lien nettoyé mène exactement au même contenu.' },
      { q: 'Pourquoi nettoyer ses liens ?', a: 'Pour protéger votre vie privée, raccourcir vos URLs et éviter de partager des données de suivi quand vous envoyez un lien à quelqu\'un.' },
    ],
    howTo: ['Collez votre URL complète', 'L\'outil supprime automatiquement les trackers', 'Copiez le lien propre'],
    relatedSlugs: ['url-encode-decode', 'generateur-lien-whatsapp', 'meta-tags'],
  },
  // ─── TEXT TOOLS ─────────────────────────────────────────────────────
  'compteur-mots': {
    toolId: 'word-counter', category: 'text-tools', slug: 'compteur-mots',
    title: 'Compteur de Mots et Caractères en Ligne Gratuit',
    desc: 'Comptez les mots, caractères, phrases et analysez la densité des mots-clés de votre texte. Gratuit et instantané.',
    h1: 'Compter les mots et caractères de votre texte',
    intro: 'Collez votre texte et obtenez instantanément le nombre de mots, de caractères (avec et sans espaces), de phrases et de paragraphes. Idéal pour les rédacteurs, étudiants et professionnels du marketing.',
    faq: [
      { q: 'Les espaces sont-ils comptés dans les caractères ?', a: 'Nous affichons les deux : caractères avec espaces et caractères sans espaces.' },
      { q: 'L\'outil analyse-t-il les mots-clés ?', a: 'Oui, vous pouvez voir la densité et la fréquence de chaque mot, très utile pour le SEO.' },
    ],
    howTo: ['Collez ou tapez votre texte', 'Les statistiques s\'affichent en temps réel', 'Analysez la densité des mots-clés'],
    relatedSlugs: ['convertisseur-casse', 'comparateur-texte', 'lorem-ipsum'],
  },
  'convertisseur-casse': {
    toolId: 'case-converter', category: 'text-tools', slug: 'convertisseur-casse',
    title: 'Convertisseur de Casse en Ligne Gratuit — Majuscule, Minuscule, camelCase',
    desc: 'Convertissez votre texte en MAJUSCULES, minuscules, Title Case, camelCase, snake_case et plus. Gratuit et instantané.',
    h1: 'Convertir la casse de votre texte',
    intro: 'Changez la casse de votre texte en un clic : tout en majuscules, tout en minuscules, Titre (Title Case), ALTERNÉE, camelCase pour les développeurs, ou snake_case. Parfait quand vous avez accidentellement laissé le Caps Lock activé.',
    faq: [{ q: 'Qu\'est-ce que le Title Case ?', a: 'Le Title Case met une majuscule à chaque début de mot : "bonjour le monde" devient "Bonjour Le Monde".' }],
    howTo: ['Collez votre texte', 'Choisissez la casse souhaitée', 'Copiez le résultat'],
    relatedSlugs: ['compteur-mots', 'comparateur-texte', 'lorem-ipsum'],
  },
  'lorem-ipsum': {
    toolId: 'lorem-ipsum-generator', category: 'text-tools', slug: 'lorem-ipsum',
    title: 'Générateur Lorem Ipsum en Ligne Gratuit — Texte Placeholder',
    desc: 'Générez du texte Lorem Ipsum pour vos maquettes web et documents. Paragraphes, mots ou phrases au choix.',
    h1: 'Générer du texte Lorem Ipsum',
    intro: 'Besoin de texte de remplissage pour vos maquettes, wireframes ou présentations ? Générez du Lorem Ipsum en quelques clics, en choisissant le nombre de paragraphes, de phrases ou de mots.',
    faq: [{ q: 'Qu\'est-ce que le Lorem Ipsum ?', a: 'Le Lorem Ipsum est un texte en pseudo-latin utilisé depuis le XVIe siècle par l\'imprimerie pour remplir les espaces vides dans les maquettes.' }],
    howTo: ['Choisissez la quantité (paragraphes, mots, phrases)', 'Cliquez sur Générer', 'Copiez le texte'],
    relatedSlugs: ['compteur-mots', 'convertisseur-casse', 'markdown-preview'],
  },
  'base64': {
    toolId: 'base64-encode-decode', category: 'text-tools', slug: 'base64',
    title: 'Base64 Encoder Décoder en Ligne Gratuit — Texte et Fichiers',
    desc: 'Encodez et décodez des textes et fichiers en Base64 instantanément. Gratuit et sans inscription.',
    h1: 'Encoder et décoder en Base64',
    intro: 'Convertissez du texte ou des fichiers en Base64 pour les intégrer dans du code HTML, du CSS ou des API. Décodez des chaînes Base64 pour retrouver le contenu original.',
    faq: [{ q: 'À quoi sert le Base64 ?', a: 'Le Base64 permet d\'encoder des données binaires (images, fichiers) en texte ASCII, utile pour les emails, les data URIs en HTML/CSS, et les API.' }],
    howTo: ['Collez votre texte ou chargez un fichier', 'Cliquez sur Encoder ou Décoder', 'Copiez le résultat'],
    relatedSlugs: ['url-encode-decode', 'generateur-hash', 'formateur-json'],
  },
  'comparateur-texte': {
    toolId: 'text-diff-checker', category: 'text-tools', slug: 'comparateur-texte',
    title: 'Comparateur de Texte en Ligne Gratuit — Diff Checker',
    desc: 'Comparez deux textes et identifiez les différences ligne par ligne avec coloration. Gratuit et instantané.',
    h1: 'Comparer deux textes et trouver les différences',
    intro: 'Collez deux versions d\'un texte et voyez instantanément les ajouts, suppressions et modifications surlignés en couleur. Très utile pour comparer du code, des contrats ou des versions de documents.',
    faq: [{ q: 'Le comparateur fonctionne-t-il avec du code ?', a: 'Oui, il fonctionne avec tout type de texte : prose, code source, CSV, JSON, etc.' }],
    howTo: ['Collez le texte original à gauche', 'Collez le texte modifié à droite', 'Les différences sont surlignées automatiquement'],
    relatedSlugs: ['compteur-mots', 'convertisseur-casse', 'formateur-json'],
  },
  'separateur-nom-prenom': {
    toolId: 'name-splitter', category: 'text-tools', slug: 'separateur-nom-prenom',
    title: 'Séparer Nom et Prénom en Ligne Gratuit — Liste Excel, CRM',
    desc: 'Séparez automatiquement une liste de noms complets en deux colonnes Prénom et Nom. Compatible Excel, Google Sheets et CRM.',
    h1: 'Séparer les prénoms et noms d\'une liste',
    intro: 'Vous avez une colonne Excel avec "Jean Dupont" et vous avez besoin de deux colonnes séparées "Jean" et "Dupont" ? Notre outil sépare instantanément une liste de noms complets en deux colonnes distinctes, prêtes à être collées dans Excel, Google Sheets ou votre CRM.',
    faq: [
      { q: 'Comment l\'outil sépare-t-il les noms composés ?', a: 'Le premier mot est considéré comme le prénom, et tout le reste comme le nom de famille (ex: "Jean Pierre De La Tour" → Prénom: "Jean", Nom: "Pierre De La Tour").' },
      { q: 'Quel séparateur puis-je utiliser ?', a: 'Vous pouvez choisir entre point-virgule (;), virgule (,) ou tabulation pour une compatibilité parfaite avec Excel.' },
      { q: 'Combien de noms puis-je traiter ?', a: 'Il n\'y a pas de limite. Collez des centaines ou des milliers de noms en une seule opération.' },
    ],
    howTo: ['Collez votre liste de noms complets (un par ligne)', 'Choisissez le séparateur de sortie', 'Copiez le résultat dans Excel'],
    relatedSlugs: ['compteur-mots', 'convertisseur-casse', 'comparateur-texte'],
  },
  // ─── GENERATORS ─────────────────────────────────────────────────────
  'generateur-qr-code': {
    toolId: 'qr-code-generator', category: 'generators', slug: 'generateur-qr-code',
    title: 'Générateur de QR Code en Ligne Gratuit — URL, Texte, WiFi',
    desc: 'Créez des QR codes personnalisés pour vos URLs, textes, réseaux WiFi et plus. HD, téléchargeable et gratuit.',
    h1: 'Générer un QR Code gratuitement',
    intro: 'Créez des QR codes en haute définition pour n\'importe quelle URL, texte, numéro de téléphone ou réseau WiFi. Personnalisez la couleur et la taille, puis téléchargez en PNG ou SVG.',
    faq: [
      { q: 'Le QR code expirera-t-il ?', a: 'Non, les QR codes générés sont statiques et ne nécessitent aucun serveur. Ils fonctionneront indéfiniment.' },
    ],
    howTo: ['Entrez votre URL ou texte', 'Personnalisez la couleur et la taille', 'Téléchargez le QR code'],
    relatedSlugs: ['generateur-mot-de-passe', 'generateur-lien-whatsapp', 'generateur-uuid-guid'],
  },
  'generateur-mot-de-passe': {
    toolId: 'password-generator', category: 'generators', slug: 'generateur-mot-de-passe',
    title: 'Générateur de Mots de Passe Sécurisés en Ligne Gratuit',
    desc: 'Générez des mots de passe forts et aléatoires instantanément. Longueur et complexité personnalisables.',
    h1: 'Générer un mot de passe sécurisé',
    intro: 'Créez des mots de passe aléatoires impossibles à deviner. Choisissez la longueur, incluez ou excluez les majuscules, chiffres et caractères spéciaux. L\'indicateur de force vous aide à vérifier la sécurité.',
    faq: [
      { q: 'Un mot de passe de combien de caractères est sûr ?', a: 'Un minimum de 12 caractères avec un mélange de majuscules, minuscules, chiffres et symboles est recommandé par les experts en cybersécurité.' },
      { q: 'Mon mot de passe est-il stocké quelque part ?', a: 'Non. Le mot de passe est généré localement dans votre navigateur et n\'est jamais envoyé à un serveur.' },
    ],
    howTo: ['Choisissez la longueur', 'Cochez les types de caractères', 'Copiez votre nouveau mot de passe'],
    relatedSlugs: ['generateur-hash', 'generateur-qr-code', 'generateur-uuid-guid'],
  },
  'generateur-hash': {
    toolId: 'hash-generator', category: 'generators', slug: 'generateur-hash',
    title: 'Générateur de Hash MD5, SHA-1, SHA-256 en Ligne Gratuit',
    desc: 'Générez des hash MD5, SHA-1, SHA-256 et SHA-512 à partir de texte ou de fichiers. 100% local.',
    h1: 'Générer des hash MD5 et SHA en ligne',
    intro: 'Calculez l\'empreinte (hash) de vos textes ou fichiers avec les algorithmes MD5, SHA-1, SHA-256 et SHA-512. Utile pour vérifier l\'intégrité de fichiers, stocker des checksums ou comparer des données.',
    faq: [{ q: 'Quel algorithme choisir ?', a: 'SHA-256 est recommandé pour la plupart des usages. MD5 est rapide mais considéré comme faible pour la sécurité. SHA-512 offre la sécurité maximale.' }],
    howTo: ['Entrez votre texte ou chargez un fichier', 'Choisissez l\'algorithme', 'Copiez le hash généré'],
    relatedSlugs: ['generateur-mot-de-passe', 'base64', 'generateur-uuid-guid'],
  },
  'color-picker': {
    toolId: 'color-picker', category: 'generators', slug: 'color-picker',
    title: 'Color Picker en Ligne Gratuit — Convertisseur HEX RGB HSL',
    desc: 'Choisissez une couleur et convertissez-la entre HEX, RGB, HSL et plus. Palette et nuancier inclus.',
    h1: 'Choisir et convertir des couleurs en ligne',
    intro: 'Sélectionnez une couleur visuellement ou entrez un code HEX/RGB/HSL pour la convertir dans les autres formats. Idéal pour les designers et les développeurs web.',
    faq: [{ q: 'Quels formats de couleur sont supportés ?', a: 'HEX (#FF5733), RGB (rgb(255,87,51)), HSL (hsl(11,100%,60%)), et les noms CSS sont pris en charge.' }],
    howTo: ['Cliquez sur la palette pour choisir une couleur', 'Les codes HEX, RGB et HSL se mettent à jour', 'Copiez le code souhaité'],
    relatedSlugs: ['css-gradient', 'generateur-favicon', 'meta-tags'],
  },
  'generateur-lien-whatsapp': {
    toolId: 'whatsapp-link', category: 'generators', slug: 'generateur-lien-whatsapp',
    title: 'Générateur de Lien WhatsApp Direct Gratuit — Message Sans Contact',
    desc: 'Créez un lien wa.me WhatsApp pour envoyer un message sans ajouter le numéro à vos contacts. Gratuit et instantané.',
    h1: 'Générer un lien direct WhatsApp (sans enregistrer le contact)',
    intro: 'Vous voulez envoyer un message WhatsApp à un numéro sans l\'ajouter dans votre répertoire ? Entrez le numéro de téléphone avec l\'indicatif international, ajoutez un message pré-rempli facultatif, et notre outil génère un lien wa.me cliquable que vous pouvez partager ou utiliser directement.',
    faq: [
      { q: 'Comment envoyer un message WhatsApp sans ajouter le contact ?', a: 'Utilisez notre outil pour générer un lien wa.me. En cliquant dessus, WhatsApp s\'ouvrira avec une conversation prête, sans avoir besoin d\'enregistrer le numéro.' },
      { q: 'Dois-je mettre l\'indicatif du pays ?', a: 'Oui. Par exemple +33 pour la France, +1 pour les USA, +212 pour le Maroc, +213 pour l\'Algérie, +32 pour la Belgique.' },
      { q: 'Le message pré-rempli est-il obligatoire ?', a: 'Non, il est optionnel. Si vous le laissez vide, WhatsApp ouvrira simplement une conversation vierge avec le numéro.' },
    ],
    howTo: ['Entrez le numéro avec l\'indicatif pays (+33...)', 'Ajoutez un message pré-rempli (optionnel)', 'Copiez ou testez le lien généré'],
    relatedSlugs: ['generateur-qr-code', 'nettoyeur-url-tracking', 'generateur-uuid-guid'],
  },
  'generateur-uuid-guid': {
    toolId: 'uuid-generator', category: 'generators', slug: 'generateur-uuid-guid',
    title: 'Générateur de UUID / GUID en Ligne Gratuit — V4 Aléatoire',
    desc: 'Générez des identifiants UUID v4 et GUID uniques en masse. 100% local, instantané et gratuit.',
    h1: 'Générer des UUID et GUID uniques',
    intro: 'Créez des identifiants universels uniques (UUID v4) en un clic. Générez-en un ou plusieurs centaines à la fois. Les UUID sont générés localement avec l\'API Crypto de votre navigateur pour garantir l\'unicité.',
    faq: [
      { q: 'Qu\'est-ce qu\'un UUID ?', a: 'Un UUID (Universally Unique Identifier) est un identifiant de 128 bits standardisé (RFC 4122). La probabilité de collision est astronomiquement faible.' },
      { q: 'Quelle est la différence entre UUID et GUID ?', a: 'C\'est la même chose. GUID (Globally Unique Identifier) est le terme utilisé par Microsoft, UUID est le terme standard.' },
    ],
    howTo: ['Cliquez sur Générer', 'Choisissez combien d\'UUID vous voulez', 'Copiez les identifiants'],
    relatedSlugs: ['generateur-hash', 'generateur-mot-de-passe', 'generateur-qr-code'],
  },
  // ─── CALCULATORS ────────────────────────────────────────────────────
  'calculateur-imc': {
    toolId: 'bmi-calculator', category: 'calculators', slug: 'calculateur-imc',
    title: 'Calculateur IMC (Indice de Masse Corporelle) en Ligne Gratuit',
    desc: 'Calculez gratuitement votre Indice de Masse Corporelle. Entrez taille et poids pour connaître votre catégorie santé.',
    h1: 'Calculer votre Indice de Masse Corporelle (IMC)',
    intro: 'L\'IMC (Indice de Masse Corporelle) est un indicateur simple qui permet d\'évaluer la corpulence d\'une personne. Entrez votre taille et votre poids pour obtenir votre IMC et savoir dans quelle catégorie vous vous situez (maigreur, normal, surpoids, obésité).',
    faq: [
      { q: 'Comment calcule-t-on l\'IMC ?', a: 'IMC = Poids (kg) / Taille² (m). Par exemple, une personne de 70 kg mesurant 1,75 m a un IMC de 70 / (1,75×1,75) = 22,9.' },
      { q: 'Quels sont les seuils ?', a: 'Maigreur < 18,5 | Normal 18,5-24,9 | Surpoids 25-29,9 | Obésité ≥ 30.' },
    ],
    howTo: ['Entrez votre taille en cm', 'Entrez votre poids en kg', 'Votre IMC et catégorie s\'affichent'],
    relatedSlugs: ['calculateur-age', 'calculateur-pourcentage', 'convertisseur-unites'],
  },
  'calculateur-age': {
    toolId: 'age-calculator', category: 'calculators', slug: 'calculateur-age',
    title: 'Calculateur d\'Âge Exact en Ligne Gratuit — Années, Mois, Jours',
    desc: 'Calculez votre âge exact en années, mois, jours et même heures. Découvrez quel jour de la semaine vous êtes né.',
    h1: 'Calculer votre âge exact',
    intro: 'Entrez votre date de naissance et découvrez votre âge exact en années, mois et jours. L\'outil vous indique aussi le jour de la semaine de votre naissance et le nombre de jours avant votre prochain anniversaire.',
    faq: [
      { q: 'L\'outil tient-il compte des années bissextiles ?', a: 'Oui, le calcul est parfaitement précis et prend en compte les années bissextiles.' },
    ],
    howTo: ['Entrez votre date de naissance', 'Votre âge exact s\'affiche instantanément', 'Découvrez des détails amusants (jour de naissance, prochain anniversaire)'],
    relatedSlugs: ['calculateur-imc', 'calculateur-pourcentage', 'convertisseur-unites'],
  },
  'calculateur-pourcentage': {
    toolId: 'percentage-calculator', category: 'calculators', slug: 'calculateur-pourcentage',
    title: 'Calculateur de Pourcentages en Ligne Gratuit — Tous les Calculs',
    desc: 'Calculez tous les types de pourcentages : X% de Y, augmentation, réduction, pourcentage entre deux nombres.',
    h1: 'Tous les calculs de pourcentages',
    intro: 'Un outil complet pour tous les calculs de pourcentages : combien fait X% de Y, quel pourcentage représente A par rapport à B, et quel est le pourcentage d\'augmentation ou de baisse entre deux valeurs.',
    faq: [{ q: 'Comment calculer un pourcentage ?', a: 'Pour calculer X% de Y : (X × Y) / 100. Par exemple, 15% de 200 = (15 × 200) / 100 = 30.' }],
    howTo: ['Choisissez le type de calcul', 'Entrez vos valeurs', 'Le résultat s\'affiche instantanément'],
    relatedSlugs: ['calculateur-imc', 'convertisseur-unites', 'calculateur-age'],
  },
  'convertisseur-unites': {
    toolId: 'unit-converter', category: 'calculators', slug: 'convertisseur-unites',
    title: 'Convertisseur d\'Unités en Ligne Gratuit — Longueur, Poids, Température',
    desc: 'Convertissez facilement entre les unités de longueur, poids, température et volume. Gratuit et instantané.',
    h1: 'Convertir des unités de mesure',
    intro: 'Convertissez rapidement entre mètres et pieds, kilogrammes et livres, Celsius et Fahrenheit, litres et gallons, et bien d\'autres unités de mesure.',
    faq: [{ q: 'Quelles catégories d\'unités sont disponibles ?', a: 'Longueur (m, km, miles, pieds, pouces), poids (kg, g, lb, oz), température (°C, °F, K) et volume (L, mL, gallon, cup).' }],
    howTo: ['Choisissez la catégorie (longueur, poids...)', 'Entrez la valeur et les unités', 'La conversion s\'affiche en temps réel'],
    relatedSlugs: ['calculateur-pourcentage', 'calculateur-imc', 'calculateur-age'],
  },
  'calculateur-dosage-beton': {
    toolId: 'concrete-calculator', category: 'calculators', slug: 'calculateur-dosage-beton',
    title: 'Calculateur Dosage Béton Gratuit — Sacs de Ciment, Sable, Gravier, Eau',
    desc: 'Calculez le dosage exact en nombre de sacs de ciment 35kg, sable, gravier et litres d\'eau pour vos dalles, terrasses ou fondations.',
    h1: 'Calculateur de dosage béton : ciment, sable, gravier et eau',
    intro: 'Vous faites du bricolage ou de la maçonnerie ? Entrez les dimensions de votre dalle (longueur × largeur × épaisseur) ou directement le volume en m³, choisissez le type d\'ouvrage (fondations, terrasse, dalle carrossable), et obtenez instantanément les quantités précises en sacs de 35 kg de ciment, de sable, de gravier et en litres d\'eau.',
    faq: [
      { q: 'Combien de sacs de ciment de 35 kg pour 1 m³ de béton ?', a: 'Pour un dosage standard à 350 kg/m³ (dalle piétonne/terrasse), il faut environ 10 sacs de 35 kg de ciment, soit 350 kg pour 1 m³ de béton.' },
      { q: 'Quel dosage choisir pour une terrasse ?', a: 'Pour une terrasse piétonne, un dosage de 350 kg/m³ est recommandé. Pour une dalle carrossable (garage), préférez 400 kg/m³.' },
      { q: 'Quelle épaisseur pour une dalle béton ?', a: 'Comptez 10-12 cm pour une terrasse piétonne, 15-20 cm pour une dalle carrossable, et 30-40 cm pour des fondations.' },
      { q: 'Quel est le ratio sable/gravier ?', a: 'Le ratio classique est environ 2 volumes de sable pour 3 volumes de gravier (40% sable, 60% gravier en masse).' },
    ],
    howTo: ['Choisissez "dimensions" ou "volume en m³"', 'Sélectionnez le type d\'ouvrage', 'Lisez les quantités de ciment, sable, gravier et eau'],
    relatedSlugs: ['calculateur-frais-kilometriques', 'convertisseur-unites', 'calculateur-pourcentage'],
  },
  'calculateur-frais-kilometriques': {
    toolId: 'mileage-calculator', category: 'calculators', slug: 'calculateur-frais-kilometriques',
    title: 'Calculateur de Frais Kilométriques en Ligne Gratuit — Toutes Devises',
    desc: 'Calculez vos indemnités et frais kilométriques professionnels en EUR, USD, GBP, MAD, DZD ou toute autre devise.',
    h1: 'Calculer vos frais et indemnités kilométriques',
    intro: 'Que vous soyez freelance, salarié en déplacement ou chauffeur VTC, calculez en quelques secondes le montant de votre indemnité kilométrique. Entrez la distance parcourue, votre taux de remboursement par kilomètre (ou par mile), et choisissez votre devise. L\'outil est adapté à tous les pays.',
    faq: [
      { q: 'Quel taux de remboursement utiliser ?', a: 'Le taux dépend de votre pays et de votre employeur. En France, le barème URSSAF 2024 va de 0,529 €/km à 0,697 €/km selon la puissance fiscale. Aux USA, l\'IRS fixe le taux à 0,67 $/mile (2024).' },
      { q: 'L\'outil fonctionne-t-il pour les miles ?', a: 'Oui, vous pouvez choisir entre kilomètres (km) et miles (mi) comme unité de distance.' },
      { q: 'Quelles devises sont disponibles ?', a: 'EUR (€), USD ($), GBP (£), CHF, CAD ($), MAD (Dirham marocain) et DZD (Dinar algérien).' },
    ],
    howTo: ['Entrez la distance parcourue', 'Saisissez votre taux de remboursement par km/mile', 'Choisissez la devise et lisez le résultat'],
    relatedSlugs: ['calculateur-dosage-beton', 'calculateur-pourcentage', 'convertisseur-unites'],
  },
  'convertisseur-couleurs': {
    toolId: 'color-converter', category: 'generators', slug: 'convertisseur-couleurs',
    title: 'Convertisseur de Couleurs en Ligne — HEX, RGB, HSL, CMYK',
    desc: 'Convertissez instantanément entre les formats de couleur HEX, RGB, HSL et CMYK. Gratuit, sans inscription, 100% dans votre navigateur.',
    h1: 'Convertisseur de couleurs HEX, RGB, HSL, CMYK',
    intro: "Saisissez une couleur dans n'importe quel format (HEX, RGB, HSL) et obtenez instantanément toutes les conversions. Utilisez le sélecteur de couleur visuel, les champs numériques ou les présélections pour trouver la couleur parfaite pour vos projets web et design.",
    faq: [
      { q: 'Comment convertir un HEX en RGB ?', a: "Entrez votre code HEX (ex: #3b82f6) dans le champ prévu — la valeur RGB s'affiche instantanément." },
      { q: "Qu'est-ce que le format CMYK ?", a: "CMYK (Cyan, Magenta, Jaune, Noir) est utilisé en imprimerie. Notre outil convertit automatiquement votre couleur en CMYK." },
      { q: 'Puis-je copier les valeurs ?', a: "Oui, chaque format dispose d'un bouton Copier pour récupérer la valeur." },
    ],
    howTo: ['Choisissez une couleur avec le sélecteur ou entrez un code HEX', "Visualisez les conversions RGB, HSL et CMYK", 'Copiez le format souhaité en un clic'],
    relatedSlugs: ['color-picker', 'css-gradient', 'convertisseur-unites'],
  },
  'chronometre': {
    toolId: 'stopwatch', category: 'calculators', slug: 'chronometre',
    title: 'Chronomètre en Ligne Gratuit — Chronométrage de Précision',
    desc: 'Chronomètre en ligne gratuit avec fonctionnalité de tours intermédiaires. Précision au centième de seconde.',
    h1: 'Chronomètre en ligne avec tours intermédiaires',
    intro: "Un chronomètre de précision directement dans votre navigateur. Enregistrez des tours intermédiaires, mesurez au centième de seconde et suivez vos performances.",
    faq: [
      { q: 'Quelle est la précision du chronomètre ?', a: 'Le chronomètre est précis au centième de seconde (10 ms).' },
      { q: "Puis-je enregistrer des tours intermédiaires ?", a: "Oui, le bouton Tour enregistre le temps écoulé depuis le dernier tour." },
    ],
    howTo: ['Cliquez sur Démarrer pour lancer le chronomètre', 'Cliquez sur Tour pour enregistrer un temps intermédiaire', 'Cliquez sur Pause pour arrêter ou Réinitialiser'],
    relatedSlugs: ['timer-pomodoro', 'calculateur-age', 'convertisseur-unites'],
  },
  'timer-pomodoro': {
    toolId: 'pomodoro-timer', category: 'calculators', slug: 'timer-pomodoro',
    title: 'Timer Pomodoro en Ligne Gratuit — Technique Pomodoro',
    desc: 'Timer Pomodoro gratuit avec sessions de travail personnalisables, pauses courtes et longues. Améliorez votre productivité.',
    h1: 'Timer Pomodoro — Technique de productivité',
    intro: "La technique Pomodoro alterne des périodes de travail concentré avec des pauses. Notre timer vous guide avec une interface visuelle et des paramètres personnalisables.",
    faq: [
      { q: "Qu'est-ce que la technique Pomodoro ?", a: "Travaillez 25 minutes, prenez une pause de 5 minutes. Après 4 sessions, prenez une pause longue de 15-30 minutes." },
      { q: 'Puis-je modifier les durées ?', a: 'Oui, vous pouvez personnaliser la durée du travail, des pauses et le nombre de Pomodoros.' },
    ],
    howTo: ['Configurez les durées de travail et de pause', 'Cliquez sur Démarrer', 'Le timer bascule automatiquement entre travail et pause'],
    relatedSlugs: ['chronometre', 'calculateur-age', 'calculateur-pourcentage'],
  },,
  'calculateur-tva': {
    toolId: 'vat-calculator', category: 'calculators', slug: 'calculateur-tva',
    title: 'Calculateur de TVA en Ligne Gratuit — HT, TTC, Taux de TVA',
    desc: 'Calculez instantanément le montant HT, TTC et la TVA à partir de n\'importe quel taux. Gratuit, sans inscription, 100% dans votre navigateur.',
    h1: 'Calculateur de TVA : montant HT, TTC et taux',
    intro: 'Calculez facilement le montant hors taxes (HT), toutes taxes comprises (TTC) et le montant de la TVA. Sélectionnez un taux de TVA prédéfini (France 20%, 10%, 5,5%, 2,1%, Belgique, Suisse, Allemagne, Espagne, Royaume-Uni) ou entrez un taux personnalisé. Entrez un montant TTC pour retrouver le HT, ou un montant HT pour obtenir le TTC.',
    faq: [
      { q: 'Comment calculer la TVA à partir du TTC ?', a: 'Pour retrouver le HT à partir du TTC : HT = TTC / (1 + taux/100). Par exemple, pour 120 € TTC avec une TVA à 20% : HT = 120 / 1,20 = 100 € et TVA = 20 €.' },
      { q: 'Comment calculer la TVA à partir du HT ?', a: 'TVA = HT × (taux/100) et TTC = HT + TVA. Par exemple, pour 100 € HT avec une TVA à 20% : TVA = 20 € et TTC = 120 €.' },
      { q: 'Quels sont les taux de TVA en France ?', a: 'France : 20% (taux normal), 10% (taux intermédiaire), 5,5% (taux réduit), 2,1% (taux particulier).' },
      { q: 'L\'outil fonctionne-t-il pour d\'autres pays ?', a: 'Oui, des taux prédéfinis sont disponibles pour la Belgique, la Suisse, l\'Allemagne, l\'Espagne et le Royaume-Uni. Vous pouvez aussi saisir n\'importe quel taux personnalisé.' },
    ],
    howTo: ['Choisissez le sens du calcul (TTC → HT ou HT → TTC)', 'Entrez le montant et sélectionnez le taux de TVA', 'Les résultats HT, TVA et TTC s\'affichent instantanément'],
    relatedSlugs: ['calculateur-pourcentage', 'convertisseur-unites', 'calculateur-frais-kilometriques'],
  },
}

/**
 * Build a reverse lookup: slug → ToolSeoEntry
 * (already the keys are slugs, but this is explicit)
 */
export function getToolBySlug(slug: string): ToolSeoEntry | undefined {
  return seoRegistry[slug]
}

/** Get all slugs for a given category */
export function getSlugsByCategory(category: string): string[] {
  return Object.values(seoRegistry)
    .filter((t) => t.category === category)
    .map((t) => t.slug)
}

/** All valid categories */
export const validCategories = ['pdf', 'image', 'video', 'dev-seo', 'text-tools', 'generators', 'calculators']

/** Reverse lookup: toolId → { category, slug } for building URLs */
export const toolIdToPath: Record<string, { category: string; slug: string }> = Object.fromEntries(
  Object.values(seoRegistry).map((t) => [t.toolId, { category: t.category, slug: t.slug }])
)
