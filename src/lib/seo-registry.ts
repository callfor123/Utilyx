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
  'compresser-pdf': {
    toolId: 'pdf-compress', category: 'pdf', slug: 'compresser-pdf',
    title: 'Compresser PDF en Ligne Gratuit — Réduire Taille PDF',
    desc: 'Réduisez la taille de vos fichiers PDF jusqu\'à 80% gratuitement. Aucune inscription, traitement 100% local dans votre navigateur.',
    h1: 'Compresser un fichier PDF en ligne gratuitement',
    intro: 'Notre outil de compression PDF réduit instantanément la taille de vos documents sans perte de qualité visible. Idéal pour envoyer des fichiers par email, les télécharger sur un site web ou les stocker sans gaspiller d\'espace disque. Aucun fichier n\'est envoyé à un serveur externe : tout le traitement se déroule directement dans votre navigateur, garantissant une confidentialité totale de vos documents. La compression PDF fonctionne en optimisant les images intégrées, en supprimant les métadonnées inutiles et en réorganisant la structure du fichier pour un poids minimal. Vous pouvez choisir le niveau de compression selon vos besoins : compression légère pour une qualité maximale, ou compression forte pour un fichier le plus léger possible. Cet outil est entièrement gratuit et ne nécessite aucune inscription. Vous pouvez compresser autant de PDF que vous le souhaitez, sans limitation. Le traitement 100% local signifie que vos documents sensibles ne quittent jamais votre appareil, ce qui est particulièrement important pour les contrats, relevés bancaires et documents confidentiels.',
    faq: [
      { q: 'Comment compresser un PDF gratuitement ?', a: 'Glissez-déposez votre fichier PDF dans l\'outil ci-dessus, choisissez le niveau de compression souhaité, puis téléchargez le résultat. Tout est gratuit et sans inscription.' },
      { q: 'Mes fichiers sont-ils en sécurité ?', a: 'Oui, 100%. Le traitement se fait entièrement dans votre navigateur web. Aucun fichier n\'est envoyé à nos serveurs ni stocké en ligne.' },
      { q: 'Quelle est la taille maximale autorisée ?', a: 'Comme tout est traité en local, il n\'y a pas de limite stricte. La seule limitation est la mémoire de votre appareil.' }
    ],
    howTo: ['Glissez votre fichier PDF dans la zone de dépôt', 'Choisissez le niveau de compression', 'Cliquez sur "Compresser" et téléchargez le résultat'],
    relatedSlugs: ['fusionner-pdf', 'proteger-pdf', 'deverrouiller-pdf'],
  },
  'fusionner-pdf': {
    toolId: 'pdf-merge', category: 'pdf', slug: 'fusionner-pdf',
    title: 'Fusionner PDF en Ligne Gratuit — Combiner Plusieurs PDF',
    desc: 'Fusionnez plusieurs fichiers PDF en un seul document en quelques secondes. Gratuit, sans inscription, traitement local.',
    h1: 'Fusionner plusieurs PDF en un seul fichier',
    intro: 'Combinez facilement 2 ou plusieurs documents PDF en un seul fichier unifié en quelques secondes. Notre outil vous permet de réorganiser l\'ordre des pages par simple glisser-déposer avant de fusionner, vous offrant un contrôle total sur le résultat final. Parfait pour assembler des factures, des rapports, des dossiers administratifs, des mémoires universitaires ou tout autre document multipage. La fusion de PDF est une opération courante pour les professionnels, les étudiants et les particuliers qui souhaitent regrouper plusieurs documents en un seul fichier facile à partager et à archiver. Imaginez pouvoir regrouper tous les chapitres d\'un mémoire, assembler les pages d\'un contrat signé, ou compiler plusieurs factures en un seul fichier PDF à envoyer à votre comptable. Aucune inscription n\'est requise et le service est entièrement gratuit. Le traitement s\'effectue 100% localement dans votre navigateur, ce qui signifie que vos documents ne sont jamais envoyés sur un serveur distant, garantissant ainsi une confidentialité totale de vos données.',
    faq: [
      { q: 'Comment fusionner des PDF en ligne ?', a: 'Ajoutez vos fichiers PDF dans l\'outil, réorganisez-les dans l\'ordre souhaité, puis cliquez sur Fusionner. Vous obtiendrez un seul PDF combiné.' },
      { q: 'Combien de fichiers puis-je fusionner ?', a: 'Il n\'y a pas de limite au nombre de fichiers. Vous pouvez en combiner autant que vous le souhaitez.' },
      { q: 'Puis-je réorganiser les pages avant de fusionner ?', a: 'Oui, vous pouvez réorganiser l\'ordre des fichiers PDF avant la fusion par simple glisser-déposer.' },
      { q: 'La qualité sera-t-elle préservée ?', a: 'Absolument. La fusion ne modifie pas le contenu des PDF. Chaque page conserve sa qualité et ses propriétés d\'origine.' }
    ],
    howTo: ['Ajoutez vos fichiers PDF', 'Réorganisez l\'ordre par glisser-déposer', 'Cliquez sur Fusionner et téléchargez'],
    relatedSlugs: ['compresser-pdf', 'pdf-en-images', 'signer-pdf'],
  },
  'pdf-en-images': {
    toolId: 'pdf-convert', category: 'pdf', slug: 'pdf-en-images',
    title: 'Convertir PDF en Images JPG PNG en Ligne Gratuit',
    desc: 'Convertissez chaque page de votre PDF en image JPG ou PNG haute qualité. Gratuit et sans inscription.',
    h1: 'Convertir un PDF en images JPG ou PNG',
    intro: 'Transformez chaque page de vos documents PDF en images haute résolution (JPG ou PNG) en quelques secondes. Cet outil est particulièrement utile pour intégrer des pages PDF dans une présentation PowerPoint, les partager sur les réseaux sociaux, ou les éditer dans un logiciel de retouche photo comme Photoshop ou GIMP. Le format JPG produit des fichiers légers, idéaux pour le web et l\'email, tandis que le PNG offre une qualité maximale avec la possibilité de conserver la transparence. Les professionnels du marketing, les graphistes et les étudiants utilisent régulièrement la conversion PDF en images pour créer des visuels à partir de rapports, brochures ou catalogues. Tout le traitement s\'effectue localement dans votre navigateur : vos documents restent sur votre appareil et ne sont jamais transférés vers un serveur. Le service est entièrement gratuit et ne nécessite aucune inscription. Vous pouvez convertir autant de PDF que vous le souhaitez, sans filigrane ni limitation de qualité.',
    faq: [
      { q: 'En quel format seront mes images ?', a: 'Vous pouvez choisir entre JPG (léger, idéal pour le web) et PNG (qualité maximale, transparence possible).' },
      { q: 'La qualité est-elle bonne ?', a: 'Oui, les images sont générées en haute résolution directement dans votre navigateur, sans perte de qualité.' },
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, l\'outil est 100% gratuit et ne nécessite aucune inscription. Vous pouvez convertir autant de fichiers que vous le souhaitez.' }
    ],
    howTo: ['Chargez votre PDF', 'Choisissez le format de sortie (JPG ou PNG)', 'Téléchargez les images générées'],
    relatedSlugs: ['compresser-pdf', 'fusionner-pdf', 'convertir-image'],
  },
  'signer-pdf': {
    toolId: 'pdf-sign', category: 'pdf', slug: 'signer-pdf',
    title: 'Signer PDF en Ligne Gratuit — Signature Électronique',
    desc: 'Signez et annotez vos documents PDF directement dans le navigateur. Dessinez ou tapez votre signature. 100% gratuit.',
    h1: 'Signer un document PDF en ligne',
    intro: 'Ajoutez votre signature manuscrite ou tapée à n\'importe quel document PDF sans imprimer ni scanner. Notre outil vous permet de dessiner votre signature directement à l\'écran, de la taper dans une police calligraphiée, ou de l\'importer depuis une image. Vous pouvez ensuite la positionner et la redimensionner précisément sur le document. Idéal pour les contrats de travail, les bons de commande, les formulaires administratifs, les accords de confidentialité et tout document nécessitant une signature. Cet outil élimine le cycle fastidieux d\'impression, signature et numérisation, vous faisant gagner un temps précieux. Le processus est 100% local : votre document reste sur votre appareil et n\'est jamais envoyé à un serveur. Le service est entièrement gratuit et sans inscription. Notez que notre outil crée une signature simple. Pour une valeur juridique renforcée conformément au règlement eIDAS, consultez un service de signature électronique certifié.',
    faq: [
      { q: 'Ma signature est-elle juridiquement valide ?', a: 'Notre outil crée une signature simple. Pour une valeur juridique renforcée, consultez un service de signature électronique certifié eIDAS.' },
      { q: 'Comment ajouter ma signature ?', a: 'Chargez votre PDF, dessinez ou tapez votre signature, positionnez-la sur le document, puis téléchargez le fichier signé.' },
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, l\'outil est 100% gratuit et sans inscription. Vos documents restent sur votre appareil et ne sont jamais envoyés à un serveur.' },
      { q: 'Puis-je importer une image de signature ?', a: 'Oui, vous pouvez importer une image de votre signature préalablement numérisée et la positionner sur le document.' }
    ],
    howTo: ['Chargez votre PDF', 'Dessinez ou tapez votre signature', 'Positionnez-la sur le document et téléchargez'],
    relatedSlugs: ['compresser-pdf', 'proteger-pdf', 'fusionner-pdf'],
  },
  'deverrouiller-pdf': {
    toolId: 'pdf-unlock', category: 'pdf', slug: 'deverrouiller-pdf',
    title: 'Déverrouiller PDF en Ligne Gratuit — Retirer Mot de Passe',
    desc: 'Retirez le mot de passe de protection de vos fichiers PDF facilement. Gratuit et 100% dans votre navigateur.',
    h1: 'Déverrouiller un PDF protégé par mot de passe',
    intro: 'Vous avez un PDF protégé dont vous connaissez le mot de passe mais que vous devez ouvrir fréquemment ? Notre outil vous permet de retirer la protection par mot de passe en un seul clic, afin de pouvoir ouvrir et partager votre document librement sans avoir à saisir le mot de passe à chaque fois. C\'est particulièrement utile pour les relevés bancaires protégés, les contrats sécurisés ou tout document dont vous souhaitez supprimer la contrainte du mot de passe tout en conservant le contenu intact. Le processus est simple : chargez votre PDF protégé, saisissez le mot de passe, et téléchargez le fichier déverrouillé. Tout se passe dans votre navigateur : aucune donnée n\'est envoyée à un serveur, garantissant une confidentialité totale. L\'outil est entièrement gratuit et ne nécessite aucune inscription. Attention : vous devez connaître le mot de passe pour déverrouiller le fichier. Notre outil ne crack pas les mots de passe.',
    faq: [
      { q: 'Puis-je déverrouiller un PDF sans le mot de passe ?', a: 'Non, vous devez connaître le mot de passe. Notre outil retire la protection mais ne crack pas les mots de passe.' },
      { q: 'Est-ce gratuit et sécurisé ?', a: 'Oui, 100% gratuit et sans inscription. Le traitement se fait localement dans votre navigateur, vos fichiers ne quittent jamais votre appareil.' },
      { q: 'Le contenu du PDF est-il modifié ?', a: 'Non, le contenu reste exactement identique. Seule la protection par mot de passe est retirée.' },
      { q: 'Combien de PDF puis-je déverrouiller ?', a: 'Il n\'y a aucune limite. Vous pouvez déverrouiller autant de fichiers que vous le souhaitez, gratuitement.' }
    ],
    howTo: ['Chargez votre PDF protégé', 'Entrez le mot de passe', 'Téléchargez le PDF déverrouillé'],
    relatedSlugs: ['proteger-pdf', 'compresser-pdf', 'fusionner-pdf'],
  },
  'proteger-pdf': {
    toolId: 'pdf-protect', category: 'pdf', slug: 'proteger-pdf',
    title: 'Protéger PDF en Ligne Gratuit — Ajouter Mot de Passe',
    desc: 'Ajoutez un mot de passe à vos fichiers PDF pour les sécuriser. Gratuit, sans inscription, 100% local.',
    h1: 'Protéger un PDF avec un mot de passe',
    intro: 'Sécurisez vos documents PDF en leur ajoutant une protection par mot de passe. Seules les personnes connaissant le mot de passe pourront ouvrir et lire votre fichier, ce qui est essentiel pour les documents confidentiels comme les contrats, les relevés bancaires, les dossiers médicaux ou les données personnelles. Notre outil vous permet de choisir un mot de passe robuste et de l\'appliquer instantanément à votre PDF. Le chiffrement AES-128 ou AES-256 est utilisé pour garantir une protection solide. Le processus est entièrement local : votre document et votre mot de passe restent sur votre appareil et ne sont jamais transmis à un serveur. Le service est gratuit et ne nécessite aucune inscription. Vous pouvez protéger autant de PDF que vous le souhaitez. Pour une sécurité optimale, choisissez un mot de passe d\'au moins 8 caractères combinant majuscules, minuscules, chiffres et symboles.',
    faq: [
      { q: 'Quel niveau de protection cet outil offre-t-il ?', a: 'Votre PDF sera chiffré avec AES-128 ou AES-256 et nécessitera un mot de passe pour être ouvert. Utilisez un mot de passe fort pour une sécurité maximale.' },
      { q: 'Est-ce gratuit et sécurisé ?', a: 'Oui, 100% gratuit sans inscription. Le traitement est entièrement local : votre document et votre mot de passe ne quittent jamais votre appareil.' },
      { q: 'Puis-je protéger plusieurs PDF à la fois ?', a: 'Oui, vous pouvez protéger autant de PDF que vous le souhaitez, sans limite ni inscription.' },
      { q: 'Que se passe-t-il si j\'oublie le mot de passe ?', a: 'Il n\'existe aucun moyen de récupérer le mot de passe. Conservez-le soigneusement, car sans lui le PDF sera inaccessible.' }
    ],
    howTo: ['Chargez votre PDF', 'Choisissez un mot de passe', 'Téléchargez le PDF protégé'],
    relatedSlugs: ['deverrouiller-pdf', 'compresser-pdf', 'signer-pdf'],
  },
  'convertir-image': {
    toolId: 'img-convert', category: 'image', slug: 'convertir-image',
    title: 'Convertisseur d\'Images en Ligne Gratuit — WebP, AVIF, JPG, PNG',
    desc: 'Convertissez vos images en WebP, AVIF, JPG, PNG et plus. Gratuit, sans inscription, traitement 100% local.',
    h1: 'Convertir des images en WebP, AVIF, JPG, PNG',
    intro: 'Convertissez vos images entre tous les formats populaires : WebP, AVIF, JPG, PNG, GIF, BMP et TIFF. Le WebP et l\'AVIF sont les formats modernes qui offrent une compression nettement supérieure au JPG classique, réduisant le poids de vos images de 30 à 50% sans perte de qualité visible. Idéal pour accélérer le chargement de vos sites web et améliorer votre référencement SEO. Les développeurs web, graphistes et blogueurs utilisent quotidiennement la conversion d\'images pour optimiser les visuels de leurs projets. Vous pouvez convertir une ou plusieurs images en un clic, choisir la qualité de sortie et télécharger les résultats. Tout le traitement s\'effectue localement dans votre navigateur : vos images restent sur votre appareil et ne sont jamais envoyées à un serveur. Le service est entièrement gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Vous pouvez convertir autant d\'images que vous le souhaitez.' },
      { q: 'Pourquoi convertir en WebP ou AVIF ?', a: 'Le WebP et l\'AVIF offrent une compression bien supérieure au JPG, réduisant le poids des images de 30 à 50% sans perte visible. Cela accélère le chargement de vos pages web et améliore votre SEO.' },
      { q: 'Mes images sont-elles sécurisées ?', a: 'Oui, tout le traitement se fait dans votre navigateur. Vos images ne sont jamais envoyées à un serveur ni stockées en ligne.' }
    ],
    howTo: ['Chargez votre image', 'Choisissez le format de sortie', 'Ajustez la qualité si nécessaire', 'Téléchargez l\'image convertie'],
    relatedSlugs: ['compresser-image', 'redimensionner-image', 'pdf-en-images'],
  },
  'compresser-image': {
    toolId: 'img-compress', category: 'image', slug: 'compresser-image',
    title: 'Compresser Image en Ligne Gratuit — Optimiser le Poids',
    desc: 'Réduisez le poids de vos images JPG, PNG, WebP sans perte de qualité visible. Gratuit, sans inscription, 100% local.',
    h1: 'Compresser une image en ligne gratuitement',
    intro: 'Réduisez instantanément le poids de vos images sans dégradation visible de la qualité. Notre outil de compression d\'images optimise vos fichiers JPG, PNG et WebP en ajustant le niveau de compression selon vos besoins. Une image compressée charge plus rapidement sur un site web, consomme moins de bande passante et améliore l\'expérience utilisateur et le référencement SEO. Les développeurs web, les blogueurs et les professionnels du marketing ont tout intérêt à compresser leurs images avant de les publier en ligne. Google recommande d\'ailleurs l\'optimisation des images comme critère de performance. Vous pouvez choisir entre une compression légère, équilibrée ou forte, et comparer le résultat avec l\'original avant de télécharger. Le traitement est entièrement local dans votre navigateur : vos images ne sont jamais envoyées à un serveur. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, l\'outil est 100% gratuit et sans inscription. Vous pouvez compresser autant d\'images que vous le souhaitez.' },
      { q: 'La qualité sera-t-elle préservée ?', a: 'Vous choisissez le niveau de compression. En mode léger ou équilibré, la perte de qualité est imperceptible. Vous pouvez prévisualiser le résultat avant de télécharger.' },
      { q: 'Quels formats sont supportés ?', a: 'JPG, PNG, WebP, GIF, BMP et AVIF. La compression est optimisée pour chaque format.' },
      { q: 'Comment ça marche techniquement ?', a: 'L\'outil ajuste les paramètres de compression (qualité JPEG, palette PNG, etc.) directement dans votre navigateur en utilisant les API Canvas et les codecs natifs.' }
    ],
    howTo: ['Chargez votre image', 'Choisissez le niveau de compression', 'Prévisualisez le résultat', 'Téléchargez l\'image compressée'],
    relatedSlugs: ['convertir-image', 'redimensionner-image', 'supprimer-arriere-plan'],
  },
  'redimensionner-image': {
    toolId: 'img-resize', category: 'image', slug: 'redimensionner-image',
    title: 'Redimensionner Image en Ligne Gratuit — Changer Taille Image',
    desc: 'Redimensionnez vos images JPG, PNG, WebP facilement. Par pourcentage ou dimensions exactes. Gratuit et 100% local.',
    h1: 'Redimensionner une image en ligne',
    intro: 'Modifiez les dimensions de vos images en quelques clics, que ce soit pour les adapter à un site web, un profil social, une impression ou un email. Notre outil vous permet de redimensionner par pourcentage, par largeur ou hauteur fixe, ou en spécifiant les dimensions exactes souhaitées. Vous pouvez choisir de conserver les proportions ou de forcer de nouvelles dimensions. Les développeurs web redimensionnent fréquemment leurs images pour les adapter aux résolutions d\'écran et aux grilles CSS, tandis que les photographes ajustent les dimensions pour l\'impression. Le traitement s\'effectue entièrement dans votre navigateur : vos images restent sur votre appareil et ne sont jamais envoyées à un serveur. Le service est gratuit et sans inscription. Vous pouvez redimensionner plusieurs images à la suite sans limitation.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Aucune limite sur le nombre d\'images à redimensionner.' },
      { q: 'Puis-je conserver les proportions ?', a: 'Oui, par défaut l\'outil conserve les proportions. Décochez l\'option si vous souhaitez forcer des dimensions spécifiques.' },
      { q: 'Quels formats sont supportés ?', a: 'JPG, PNG, WebP, GIF, BMP et la plupart des formats d\'image courants.' }
    ],
    howTo: ['Chargez votre image', 'Entrez les nouvelles dimensions ou le pourcentage', 'Choisissez de conserver ou non les proportions', 'Téléchargez l\'image redimensionnée'],
    relatedSlugs: ['compresser-image', 'convertir-image', 'supprimer-arriere-plan'],
  },
  'supprimer-arriere-plan': {
    toolId: 'img-bgremove', category: 'image', slug: 'supprimer-arriere-plan',
    title: 'Supprimer Arrière-Plan Image en Ligne Gratuit — Détourage Auto',
    desc: 'Supprimez l\'arrière-plan de vos images automatiquement. Détourage IA gratuit, sans inscription, 100% local.',
    h1: 'Supprimer l\'arrière-plan d\'une image',
    intro: 'Éliminez automatiquement l\'arrière-plan de vos images en un clic grâce à notre technologie de détourage intelligent. Plus besoin de tracer manuellement des contours complexes dans Photoshop : notre algorithme détecte le sujet principal et supprime le fond avec précision. Cet outil est indispensable pour créer des visuels e-commerce, des portraits professionnels, des logos transparents ou des montages photo. Les vendeurs en ligne l\'utilisent pour présenter leurs produits sur un fond blanc uniforme, tandis que les designers s\'en servent pour isoler des éléments graphiques. Le résultat est téléchargeable en PNG avec transparence ou en JPG avec fond blanc. Tout le traitement s\'effectue localement dans votre navigateur grâce à l\'intelligence artificielle intégrée : vos images ne sont jamais envoyées à un serveur. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Vous pouvez supprimer l\'arrière-plan d\'autant d\'images que vous le souhaitez.' },
      { q: 'Comment fonctionne le détourage automatique ?', a: 'Un algorithme d\'intelligence artificielle s\'exécutant dans votre navigateur détecte le sujet principal de l\'image et sépare l\'arrière-plan automatiquement.' },
      { q: 'Dans quel format télécharger le résultat ?', a: 'Vous pouvez télécharger en PNG (avec transparence) pour les montages, ou en JPG (avec fond blanc) pour les visuels e-commerce.' },
      { q: 'La qualité du détourage est-elle bonne ?', a: 'L\'algorithme offre d\'excellents résultats sur les portraits, produits et objets bien détachés du fond. Pour les images complexes, vous pouvez affiner le résultat manuellement.' }
    ],
    howTo: ['Chargez votre image', 'L\'algorithme détecte et supprime l\'arrière-plan automatiquement', 'Ajustez si nécessaire', 'Téléchargez en PNG ou JPG'],
    relatedSlugs: ['compresser-image', 'convertir-image', 'redimensionner-image'],
  },
  'heic-vers-jpg': {
    toolId: 'heic-to-jpg', category: 'image', slug: 'heic-vers-jpg',
    title: 'Convertir HEIC en JPG en Ligne Gratuit — Photos iPhone',
    desc: 'Convertissez vos photos iPhone HEIC en JPG ou PNG. Gratuit, sans inscription, traitement 100% local.',
    h1: 'Convertir des photos HEIC en JPG ou PNG',
    intro: 'Transformez vos photos iPhone au format HEIC en fichiers JPG ou PNG universellement compatibles. Le format HEIC (High Efficiency Image Container) est utilisé par défaut sur les iPhones depuis iOS 11, mais de nombreux logiciels, sites web et appareils ne le prennent pas en charge. Notre convertisseur vous permet de retrouver une compatibilité totale en transformant vos photos HEIC en JPG (idéal pour le partage) ou en PNG (idéal pour la qualité maximale avec transparence). Vous pouvez convertir une ou plusieurs photos à la fois, ce qui est particulièrement utile après un transfert de photos depuis un iPhone vers un PC Windows ou un appareil Android. Le traitement s\'effectue entièrement dans votre navigateur : vos photos restent sur votre appareil et ne sont jamais envoyées à un serveur. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Convertissez autant de photos HEIC que vous le souhaitez.' },
      { q: 'Pourquoi convertir HEIC en JPG ?', a: 'Le format HEIC n\'est pas universellement supporté. Le JPG est compatible avec tous les logiciels, sites web et appareils, ce qui facilite le partage et l\'édition.' },
      { q: 'La qualité est-elle conservée ?', a: 'Oui, la conversion préserve la qualité d\'origine de votre photo. Vous pouvez choisir le niveau de qualité JPG selon vos besoins.' }
    ],
    howTo: ['Chargez vos photos HEIC', 'Choisissez le format de sortie (JPG ou PNG)', 'Téléchargez les photos converties'],
    relatedSlugs: ['convertir-image', 'compresser-image', 'redimensionner-image'],
  },
  'generateur-favicon': {
    toolId: 'favicon-generator', category: 'image', slug: 'generateur-favicon',
    title: 'Générateur de Favicon en Ligne Gratuit — Icônes Site Web',
    desc: 'Générez des favicons et icônes de site web à partir de votre image. Gratuit, sans inscription, 100% local.',
    h1: 'Générer un favicon pour votre site web',
    intro: 'Créez toutes les tailles de favicon et d\'icônes nécessaires pour votre site web à partir d\'une seule image source. Notre générateur produit automatiquement les fichiers favicon.ico, Apple Touch Icon, Android Chrome et les icônes PWA dans toutes les résolutions requises (16x16, 32x32, 48x48, 64x64, 180x180, 192x192, 512x512 pixels). Un favicon professionnel renforce l\'identité visuelle de votre site, améliore la reconnaissance dans les onglets du navigateur et les favoris, et constitue un critère de qualité pour le référencement SEO. Les développeurs web et les designers utilisent cet outil pour générer en un clic l\'ensemble complet d\'icônes nécessaire au support multi-plateforme. Le code HTML à insérer dans votre balise head est automatiquement généré. Le traitement est entièrement local dans votre navigateur : votre image ne quitte jamais votre appareil. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Générez autant de favicons que vous le souhaitez.' },
      { q: 'Quelles tailles de favicon sont générées ?', a: 'L\'outil génère toutes les tailles standard : 16x16, 32x32, 48x48, 64x64 pour favicon.ico, 180x180 pour Apple, 192x192 et 512x512 pour Android/PWA.' },
      { q: 'Comment installer le favicon sur mon site ?', a: 'Téléchargez le pack ZIP, placez les fichiers à la racine de votre site et copiez le code HTML fourni dans la balise head de vos pages.' },
      { q: 'Quel format d\'image source puis-je utiliser ?', a: 'JPG, PNG, WebP, SVG ou BMP. Pour de meilleurs résultats, utilisez une image carrée d\'au moins 512x512 pixels.' }
    ],
    howTo: ['Chargez votre image source', 'Ajustez le cadrage si nécessaire', 'Téléchargez le pack complet', 'Insérez le code HTML dans votre site'],
    relatedSlugs: ['convertir-image', 'compresser-image', 'telecharger-miniature-youtube'],
  },
  'telecharger-miniature-youtube': {
    toolId: 'youtube-thumbnail', category: 'image', slug: 'telecharger-miniature-youtube',
    title: 'Télécharger Miniature YouTube en HD Gratuit — Thumbnail Grabber',
    desc: 'Téléchargez les miniatures HD de vidéos YouTube en un clic. Résolution maximale 1280x720. Gratuit et sans inscription.',
    h1: 'Télécharger la miniature d\'une vidéo YouTube',
    intro: 'Récupérez la miniature (thumbnail) de n\'importe quelle vidéo YouTube en haute résolution (1280x720 pixels) en collant simplement son URL. Les miniatures YouTube sont des visuels puissants utilisés par les créateurs de contenu, les marketeurs et les designers pour des présentations, des articles de blog, des montages vidéo ou des analyses de contenu. Notre outil récupère instantanément la miniature officielle dans la meilleure résolution disponible, sans nécessiter de connexion YouTube ni de logiciel tiers. Vous pouvez télécharger la miniature en JPG directement sur votre appareil. Cet outil est particulièrement utile pour les agences de marketing qui analysent les stratégies visuelles des chaînes populaires, ou pour les créateurs qui souhaitent s\'inspirer des miniatures performantes. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Téléchargez autant de miniatures que vous le souhaitez.' },
      { q: 'Quelle résolution puis-je obtenir ?', a: 'La résolution maximale est de 1280x720 pixels (HD), soit la meilleure qualité disponible pour les miniatures YouTube.' },
      { q: 'Puis-je télécharger la miniature de n\'importe quelle vidéo ?', a: 'Oui, tant que la vidéo est publique sur YouTube. Collez l\'URL de la vidéo et la miniature sera récupérée instantanément.' }
    ],
    howTo: ['Collez l\'URL de la vidéo YouTube', 'Cliquez sur Télécharger', 'Récupérez la miniature en HD'],
    relatedSlugs: ['convertir-image', 'generateur-favicon', 'compresser-image'],
  },
  'decouper-video': {
    toolId: 'video-trim', category: 'video', slug: 'decouper-video',
    title: 'Découper Vidéo en Ligne Gratuit — Couper Vidéo',
    desc: 'Coupez et découpez vos vidéos en quelques secondes. Gratuit, sans inscription, traitement 100% local.',
    h1: 'Découper une vidéo en ligne gratuitement',
    intro: 'Coupez et extrayez les portions souhaitées de vos vidéos en quelques clics, sans installer de logiciel lourd. Notre outil de découpage vidéo vous permet de définir précisément le début et la fin de la séquence à conserver, avec une prévisualisation en temps réel pour ajuster vos points de coupe au milliseconde près. Idéal pour supprimer les intros inutiles, couper les silences en début ou fin de vidéo, isoler les moments forts d\'un enregistrement ou préparer des clips pour les réseaux sociaux. Les créateurs de contenu, les formateurs et les professionnels du marketing vidéo utilisent quotidiennement le découpage pour optimiser leurs vidéos avant publication. Le traitement s\'effectue entièrement dans votre navigateur grâce à FFmpeg WebAssembly : vos fichiers vidéo ne sont jamais envoyés à un serveur. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Aucune limite sur le nombre de vidéos à découper.' },
      { q: 'Comment fonctionne le découpage vidéo ?', a: 'Chargez votre vidéo, définissez les points de début et de fin de la séquence à conserver en utilisant le lecteur vidéo ou les champs numériques, puis cliquez sur Découper. Le traitement s\'effectue localement dans votre navigateur.' },
      { q: 'Quels formats vidéo sont supportés ?', a: 'MP4, WebM, AVI, MOV, MKV et la plupart des formats courants. La vidéo de sortie est au format MP4.' }
    ],
    howTo: ['Chargez votre vidéo', 'Définissez les points de début et de fin', 'Prévisualisez la sélection', 'Cliquez sur Découper et téléchargez'],
    relatedSlugs: ['compresser-video', 'convertir-video', 'video-en-gif'],
  },
  'compresser-video': {
    toolId: 'video-compress', category: 'video', slug: 'compresser-video',
    title: 'Compresser Vidéo en Ligne Gratuit — Réduire Taille Vidéo',
    desc: 'Réduisez la taille de vos vidéos sans perte de qualité visible. Gratuit, sans inscription, 100% local.',
    h1: 'Compresser une vidéo en ligne gratuitement',
    intro: 'Réduisez significativement le poids de vos fichiers vidéo tout en conservant une qualité visuelle optimale. Notre outil de compression vidéo ajuste automatiquement le bitrate et la résolution pour obtenir le meilleur rapport qualité/poids. Une vidéo compressée se charge plus rapidement sur les sites web, consomme moins de bande passante et se partage plus facilement par email ou messagerie. Les créateurs de contenu compressent leurs vidéos avant de les uploader sur YouTube, TikTok ou Instagram pour réduire les temps de traitement. Les professionnels du marketing vidéo optimisent leurs publicités pour un chargement rapide sur mobile. Vous pouvez choisir entre plusieurs niveaux de compression selon vos besoins. Le traitement s\'effectue entièrement dans votre navigateur : vos vidéos ne quittent jamais votre appareil. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Compressez autant de vidéos que vous le souhaitez.' },
      { q: 'La qualité sera-t-elle préservée ?', a: 'En mode compression légère ou équilibrée, la perte de qualité est imperceptible. Vous pouvez prévisualiser le résultat avant de télécharger.' },
      { q: 'Quelle réduction de taille puis-je espérer ?', a: 'En général, 40 à 70% de réduction selon la vidéo d\'origine et le niveau de compression choisi.' },
      { q: 'Quels formats sont supportés ?', a: 'MP4, WebM, AVI, MOV, MKV et la plupart des formats vidéo courants. La sortie est au format MP4.' }
    ],
    howTo: ['Chargez votre vidéo', 'Choisissez le niveau de compression', 'Lancez la compression', 'Téléchargez la vidéo compressée'],
    relatedSlugs: ['decouper-video', 'convertir-video', 'video-en-gif'],
  },
  'convertir-video': {
    toolId: 'video-convert', category: 'video', slug: 'convertir-video',
    title: 'Convertir Vidéo en Ligne Gratuit — MP4, WebM, AVI, MKV',
    desc: 'Convertissez vos vidéos entre MP4, WebM, AVI, MKV et GIF. Gratuit, sans inscription, 100% local.',
    h1: 'Convertir une vidéo en ligne gratuitement',
    intro: 'Convertissez vos vidéos entre tous les formats populaires : MP4, WebM, AVI, MKV, MOV et GIF. Le format MP4 est le plus universellement compatible pour le web et les réseaux sociaux, tandis que le WebM offre une meilleure compression pour les sites modernes. L\'AVI est pris en charge par de nombreux logiciels de montage, et le MKV permet de conserver plusieurs pistes audio et sous-titres. Les créateurs de contenu convertissent régulièrement leurs vidéos pour les adapter aux exigences des différentes plateformes : MP4 pour YouTube, WebM pour les sites web, MOV pour Final Cut Pro. Le traitement s\'effectue entièrement dans votre navigateur grâce à FFmpeg WebAssembly : vos fichiers vidéo restent sur votre appareil et ne sont jamais envoyés à un serveur. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Convertissez autant de vidéos que vous le souhaitez.' },
      { q: 'Quels formats de sortie sont disponibles ?', a: 'MP4, WebM, AVI, MKV, MOV et GIF. Le MP4 est recommandé pour une compatibilité maximale.' },
      { q: 'La conversion préserve-t-elle la qualité ?', a: 'Oui, la conversion préserve la qualité d\'origine au maximum. Vous pouvez ajuster les paramètres de bitrate si nécessaire.' }
    ],
    howTo: ['Chargez votre vidéo', 'Choisissez le format de sortie', 'Ajustez les paramètres si nécessaire', 'Téléchargez la vidéo convertie'],
    relatedSlugs: ['compresser-video', 'decouper-video', 'video-en-gif'],
  },
  'ajouter-audio-video': {
    toolId: 'video-add-audio', category: 'video', slug: 'ajouter-audio-video',
    title: 'Ajouter Audio à une Vidéo en Ligne Gratuit',
    desc: 'Ajoutez une musique ou une voix-off à votre vidéo. Gratuit, sans inscription, 100% local.',
    h1: 'Ajouter de l\'audio à une vidéo en ligne',
    intro: 'Incorporez une piste audio à votre vidéo en quelques clics, que ce soit pour ajouter une musique de fond, une voix-off ou un commentaire audio. Notre outil vous permet de fusionner un fichier audio (MP3, WAV, AAC, OGG) avec une vidéo, en choisissant si vous souhaitez remplacer ou mixer l\'audio existant. Les créateurs de contenu YouTube ajoutent régulièrement des musiques de fond à leurs vidéos, les formateurs superposent des commentaires pédagogiques, et les marketeurs intègrent des voix-off publicitaires. Vous pouvez ajuster le volume de la piste audio et de la vidéo d\'origine indépendamment pour obtenir le mixage parfait. Le traitement s\'effectue entièrement dans votre navigateur : vos fichiers ne sont jamais envoyés à un serveur. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Ajoutez de l\'audio à autant de vidéos que vous le souhaitez.' },
      { q: 'Quels formats audio sont supportés ?', a: 'MP3, WAV, AAC et OGG. Vous pouvez ajouter n\'importe quel format audio courant à votre vidéo.' },
      { q: 'Puis-je ajuster le volume ?', a: 'Oui, vous pouvez régler le volume de l\'audio ajouté et de l\'audio d\'origine indépendamment pour obtenir le mixage souhaité.' },
      { q: 'L\'audio d\'origine est-il conservé ?', a: 'Oui, par défaut l\'audio ajouté est mixé avec l\'audio d\'origine. Vous pouvez aussi choisir de remplacer complètement l\'audio existant.' }
    ],
    howTo: ['Chargez votre vidéo', 'Chargez le fichier audio', 'Ajustez les volumes', 'Cliquez sur Fusionner et téléchargez'],
    relatedSlugs: ['extraire-audio-video', 'supprimer-audio-video', 'compresser-video'],
  },
  'extraire-audio-video': {
    toolId: 'video-extract-audio', category: 'video', slug: 'extraire-audio-video',
    title: 'Extraire Audio d\'une Vidéo en Ligne Gratuit — MP3, WAV, AAC',
    desc: 'Extrayez la piste audio de vos vidéos en MP3, WAV ou AAC. Gratuit, sans inscription, 100% local.',
    h1: 'Extraire l\'audio d\'une vidéo en ligne',
    intro: 'Isolez et extrayez la piste audio de n\'importe quelle vidéo en quelques secondes. Notre outil vous permet de convertir la bande son d\'un fichier vidéo en format audio (MP3, WAV ou AAC), idéal pour récupérer la musique d\'un clip vidéo, isoler un podcast depuis un enregistrement YouTube, ou extraire un extrait sonore pour un montage audio. Les musiciens extraient les pistes audio de clips musicaux pour les réécouter, les podcasteurs récupèrent l\'audio de leurs lives streaming, et les journalistes isolent des interviews vidéo pour n\'en garder que le son. Vous pouvez choisir la qualité de sortie et le format qui convient le mieux à votre usage. Le traitement s\'effectue entièrement dans votre navigateur : vos fichiers restent sur votre appareil. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Extrayez l\'audio d\'autant de vidéos que vous le souhaitez.' },
      { q: 'Quels formats audio puis-je obtenir ?', a: 'MP3 (format universel, fichier léger), WAV (qualité maximale, sans perte) et AAC (bonne qualité, fichier compact).' },
      { q: 'La qualité audio sera-t-elle préservée ?', a: 'Oui, l\'audio est extrait sans réencodage si possible. En MP3, vous pouvez choisir le bitrate de sortie (128, 192 ou 320 kbps).' }
    ],
    howTo: ['Chargez votre vidéo', 'Choisissez le format de sortie (MP3, WAV ou AAC)', 'Ajustez la qualité si nécessaire', 'Téléchargez le fichier audio'],
    relatedSlugs: ['ajouter-audio-video', 'supprimer-audio-video', 'decouper-video'],
  },
  'video-en-gif': {
    toolId: 'video-to-gif', category: 'video', slug: 'video-en-gif',
    title: 'Convertir Vidéo en GIF en Ligne Gratuit — Créateur de GIF',
    desc: 'Créez des GIF animés à partir de vidéos MP4, WebM, MOV. Gratuit, sans inscription, 100% local.',
    h1: 'Convertir une vidéo en GIF animé en ligne',
    intro: 'Transformez n\'importe quelle séquence vidéo en GIF animé en quelques secondes. Les GIF sont parfaits pour illustrer un propos sur les réseaux sociaux, créer des réactions visuelles dans les conversations, ou animer des présentations sans la lourdeur d\'un fichier vidéo. Notre outil vous permet de sélectionner précisément la portion de vidéo à convertir, d\'ajuster la vitesse de lecture et de contrôler la qualité pour obtenir le meilleur compromis entre rendu visuel et poids du fichier. Les community managers créent des GIF pour booster l\'engagement sur Twitter et Slack, les designers les utilisent pour des maquettes interactives, et les formateurs pour illustrer des procédures pas à pas. Le traitement s\'effectue entièrement dans votre navigateur : vos vidéos ne sont jamais envoyées à un serveur. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Créez autant de GIF que vous le souhaitez.' },
      { q: 'Comment réduire la taille du GIF ?', a: 'Vous pouvez réduire la durée, diminuer la résolution ou ajuster la qualité. Un GIF de 3 à 5 secondes en 480p pèse généralement entre 1 et 3 Mo.' },
      { q: 'Quelle est la durée maximale du GIF ?', a: 'Il n\'y a pas de limite stricte, mais pour un GIF fluide et léger, nous recommandons une durée de 2 à 10 secondes.' },
      { q: 'Quels formats vidéo sont supportés en entrée ?', a: 'MP4, WebM, AVI, MOV et MKV. La plupart des formats vidéo courants sont acceptés.' }
    ],
    howTo: ['Chargez votre vidéo', 'Sélectionnez la portion à convertir', 'Ajustez la taille et la qualité', 'Téléchargez le GIF animé'],
    relatedSlugs: ['compresser-video', 'convertir-video', 'decouper-video'],
  },
  'supprimer-audio-video': {
    toolId: 'video-remove-audio', category: 'video', slug: 'supprimer-audio-video',
    title: 'Supprimer Audio d\'une Vidéo en Ligne Gratuit — Silencer Vidéo',
    desc: 'Retirez la piste audio d\'une vidéo en un clic. Gratuit, sans inscription, 100% local.',
    h1: 'Supprimer l\'audio d\'une vidéo en ligne',
    intro: 'Retirez la piste audio de n\'importe quelle vidéo en un seul clic pour obtenir un fichier vidéo silencieux. Cet outil est indispensable dans de nombreuses situations : supprimer le bruit de fond d\'une vidéo de surveillance, enlever la musique d\'origine pour ajouter une nouvelle bande son, créer des vidéos muettes pour des présentations ou des montages, ou encore préparer une vidéo avant d\'y ajouter une voix-off. Les monteurs vidéo rendent souvent leurs clips silencieux avant de réenregistrer un nouveau commentaire, tandis que les créateurs de memes suppriment l\'audio d\'origine pour le remplacer par un effet sonore viral. Le processus est rapide et ne modifie pas la qualité vidéo d\'origine. Le traitement s\'effectue entièrement dans votre navigateur : vos fichiers ne quittent jamais votre appareil. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Supprimez l\'audio d\'autant de vidéos que vous le souhaitez.' },
      { q: 'La qualité vidéo est-elle préservée ?', a: 'Oui, seule la piste audio est retirée. La qualité vidéo reste exactement identique à l\'originale.' },
      { q: 'Puis-je réajouter un autre audio ensuite ?', a: 'Oui, utilisez notre outil Ajouter Audio pour superposer une nouvelle piste sonore sur votre vidéo silencieuse.' }
    ],
    howTo: ['Chargez votre vidéo', 'Cliquez sur Supprimer l\'audio', 'Téléchargez la vidéo sans son'],
    relatedSlugs: ['ajouter-audio-video', 'extraire-audio-video', 'compresser-video'],
  },
  'json-csv': {
    toolId: 'json-csv', category: 'dev-seo', slug: 'json-csv',
    title: 'Convertir JSON en CSV en Ligne Gratuit — JSON / CSV',
    desc: 'Convertissez et formatez vos données JSON et CSV facilement. Gratuit, sans inscription, 100% local.',
    h1: 'Convertir JSON en CSV et inversement',
    intro: 'Convertissez facilement vos données entre les formats JSON et CSV, deux des formats de données les plus utilisés dans le développement web et l\'analyse de données. Le JSON (JavaScript Object Notation) est le standard pour les API REST et les échanges de données entre applications, tandis que le CSV (Comma-Separated Values) est le format universel pour les tableurs comme Excel et Google Sheets. Notre outil vous permet de transformer un tableau JSON en fichier CSV prêt à être importé dans Excel, ou inversement de convertir un CSV en JSON structuré pour une API ou un script. Les développeurs utilisent cette conversion pour migrer des données entre bases de données et APIs, les analystes pour exploiter des réponses d\'API dans leurs tableurs, et les data scientists pour préparer leurs jeux de données. Le traitement s\'effectue entièrement dans votre navigateur : vos données restent sur votre appareil. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Aucune limite sur le nombre de conversions.' },
      { q: 'Comment convertir du JSON en CSV ?', a: 'Collez ou chargez vos données JSON, l\'outil détecte automatiquement la structure et génère le CSV correspondant. Vous pouvez ensuite télécharger ou copier le résultat.' },
      { q: 'Les données imbriquées JSON sont-elles supportées ?', a: 'Oui, les objets imbriqués sont aplatis automatiquement. Les clés imbriquées sont combinées avec des points (ex: user.name) pour créer des colonnes CSV.' }
    ],
    howTo: ['Collez ou chargez vos données JSON ou CSV', 'L\'outil convertit automatiquement', 'Ajustez les options si nécessaire', 'Copiez ou téléchargez le résultat'],
    relatedSlugs: ['formateur-json', 'url-encode-decode', 'markdown-preview'],
  },
  'testeur-regex': {
    toolId: 'regex-tester', category: 'dev-seo', slug: 'testeur-regex',
    title: 'Testeur Regex en Ligne Gratuit — Expressions Régulières',
    desc: 'Testez et débuggez vos expressions régulières en temps réel. Gratuit, sans inscription, 100% local.',
    h1: 'Tester une expression régulière en ligne',
    intro: 'Testez et débugguez vos expressions régulières (regex) en temps réel avec notre outil interactif. Les expressions régulières sont des motifs de recherche puissants utilisés pour valider des emails, extraire des données, nettoyer du texte ou configurer des règles de routage. Cependant, leur syntaxe cryptique les rend difficiles à écrire et à débugger sans un outil adapté. Notre testeur regex met en surbrillance les correspondances en temps réel au fur et à mesure que vous tapez, affiche les groupes capturés et vous permet de tester plusieurs chaînes d\'entrée simultanément. Les développeurs l\'utilisent pour valider des patterns de validation de formulaires (email, téléphone, code postal), les DevOps pour configurer des règles de réécriture Nginx, et les data engineers pour nettoyer des jeux de données. Le traitement s\'effectue entièrement dans votre navigateur. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Testez autant d\'expressions régulières que vous le souhaitez.' },
      { q: 'Quels flags regex sont supportés ?', a: 'Les flags standards sont supportés : g (global), i (insensible à la casse), m (multiligne), s (dotAll) et u (unicode).' },
      { q: 'Les groupes capturés sont-ils affichés ?', a: 'Oui, tous les groupes de capture et groupes nommés sont affichés avec leur contenu correspondant.' }
    ],
    howTo: ['Entrez votre expression régulière', 'Ajoutez vos chaînes de test', 'Les correspondances s\'affichent en temps réel', 'Ajustez et itérez'],
    relatedSlugs: ['formateur-json', 'url-encode-decode', 'meta-tags'],
  },
  'meta-tags': {
    toolId: 'meta-tags', category: 'dev-seo', slug: 'meta-tags',
    title: 'Générateur Meta Tags en Ligne Gratuit — Prévisualisation SEO',
    desc: 'Générez et prévisualisez les meta tags pour le SEO et les réseaux sociaux. Gratuit, sans inscription.',
    h1: 'Générer et prévisualiser les meta tags SEO',
    intro: 'Créez et prévisualisez les meta tags essentiels pour le référencement naturel (SEO) et le partage sur les réseaux sociaux. Les meta tags sont des éléments HTML invisibles qui indiquent aux moteurs de recherche et aux réseaux sociaux comment afficher votre page : titre, description, image de prévisualisation, type de contenu et bien plus. Notre outil génère les balises Open Graph (Facebook, LinkedIn), Twitter Cards, les meta tags SEO classiques et les balises de verification pour Google Search Console et Bing Webmaster Tools. Vous pouvez prévisualiser en temps réel comment votre page apparaîtra dans les résultats Google et sur les réseaux sociaux avant de les publier. Les référenceurs optimisent leurs meta tags pour maximiser le taux de clic (CTR), les développeurs les intègrent dans leurs templates, et les marketeurs les configurent pour chaque campagne. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Générez autant de meta tags que vous le souhaitez.' },
      { q: 'Quels meta tags sont générés ?', a: 'Title, description, Open Graph (og:title, og:description, og:image, og:type), Twitter Cards, robots, canonical et les balises de vérification pour Google et Bing.' },
      { q: 'Comment installer les meta tags ?', a: 'Copiez le code HTML généré et collez-le dans la section <head> de votre page web.' }
    ],
    howTo: ['Remplissez les champs (titre, description, image)', 'Prévisualisez le résultat sur Google et les réseaux', 'Copiez le code HTML généré', 'Collez dans la balise head de votre page'],
    relatedSlugs: ['sitemap-robots', 'css-gradient', 'url-encode-decode'],
  },
  'sitemap-robots': {
    toolId: 'sitemap-robots', category: 'dev-seo', slug: 'sitemap-robots',
    title: 'Générateur Sitemap et Robots.txt en Ligne Gratuit',
    desc: 'Générez un sitemap XML et un fichier robots.txt pour votre site web. Gratuit, sans inscription.',
    h1: 'Générer un sitemap XML et un robots.txt',
    intro: 'Créez facilement les fichiers sitemap.xml et robots.txt essentiels pour le référencement de votre site web. Le sitemap XML est un fichier qui liste toutes les pages de votre site pour guider les moteurs de recherche dans leur exploration, tandis que le fichier robots.txt indique aux robots d\'indexation quelles pages autoriser ou bloquer. Sans ces fichiers, Google et Bing peuvent passer à côté de pages importantes de votre site ou gaspiller leur budget d\'exploration sur des pages inutiles. Notre générateur vous permet de configurer vos URLs, définir les priorités et fréquences de mise à jour, et spécifier les règles d\'autorisation et d\'interdiction pour les robots. Les référenceurs soumettent le sitemap à Google Search Console pour accélérer l\'indexation, les développeurs configurent robots.txt pour bloquer les pages privées ou en développement. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Générez autant de sitemaps et robots.txt que vous le souhaitez.' },
      { q: 'Comment soumettre le sitemap à Google ?', a: 'Uploadez le fichier sitemap.xml à la racine de votre site, puis soumettez-le via Google Search Console dans la section Sitemaps.' },
      { q: 'Que mettre dans le robots.txt ?', a: 'Autorisez l\'accès aux pages publiques et bloquez les pages privées, en développement ou sans valeur SEO (admin, API, assets).' }
    ],
    howTo: ['Ajoutez vos URLs', 'Configurez les priorités et fréquences', 'Définissez les règles robots.txt', 'Téléchargez les fichiers générés'],
    relatedSlugs: ['meta-tags', 'url-encode-decode', 'nettoyeur-url-tracking'],
  },
  'formateur-json': {
    toolId: 'json-formatter', category: 'dev-seo', slug: 'formateur-json',
    title: 'Formateur JSON en Ligne Gratuit — Valider, Formater, Minifier',
    desc: 'Formatez, validez et minifiez votre JSON en un clic. Gratuit, sans inscription, 100% local.',
    h1: 'Formater et valider du JSON en ligne',
    intro: 'Formatez, validez et minifiez vos données JSON en un clic directement dans votre navigateur. Le JSON est le format de données le plus utilisé sur le web, mais un JSON brut non formaté est difficile à lire et à débugger. Notre outil transforme instantanément un JSON compact en une version lisible avec indentation et coloration syntaxique, valide la syntaxe pour détecter les erreurs, et permet aussi de minifier un JSON formaté pour réduire sa taille. Les développeurs utilisent quotidiennement le formatage JSON pour débugger des réponses d\'API, les DevOps pour vérifier des fichiers de configuration, et les data engineers pour inspecter des payloads de base de données. L\'outil détecte et signale précisément les erreurs de syntaxe (virgules manquantes, guillemets oubliés, accolades non fermées). Le traitement s\'effectue entièrement dans votre navigateur : vos données restent sur votre appareil. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Formatez et validez autant de JSON que vous le souhaitez.' },
      { q: 'Comment formater du JSON ?', a: 'Collez votre JSON brut dans l\'éditeur, l\'outil le formate automatiquement avec indentation et coloration syntaxique.' },
      { q: 'L\'outil détecte-t-il les erreurs ?', a: 'Oui, les erreurs de syntaxe sont immédiatement signalées avec leur position exacte (ligne et colonne) pour faciliter la correction.' }
    ],
    howTo: ['Collez votre JSON', 'L\'outil formate et valide automatiquement', 'Corrigez les erreurs signalées', 'Copiez ou téléchargez le JSON formaté'],
    relatedSlugs: ['json-csv', 'url-encode-decode', 'testeur-regex'],
  },
  'url-encode-decode': {
    toolId: 'url-encode-decode', category: 'dev-seo', slug: 'url-encode-decode',
    title: 'URL Encode / Decode en Ligne Gratuit — Encoder Décoder URL',
    desc: 'Encodez et décodez des URLs et paramètres de requête. Gratuit, sans inscription, 100% local.',
    h1: 'Encoder et décoder une URL en ligne',
    intro: 'Encodez et décodez les URLs et leurs paramètres de requête en quelques secondes. L\'encodage URL (percent-encoding) transforme les caractères spéciaux en séquences %XX pour garantir qu\'ils soient transmis correctement dans les liens et les requêtes HTTP. C\'est essentiel pour les paramètres de requête contenant des espaces, des accents ou des caractères spéciaux. Notre outil encode et décode instantanément les URLs, les paramètres de requête et les fragments. Les développeurs l\'utilisent pour construire des URLs d\'API avec des paramètres complexes, les testeurs QA pour vérifier les paramètres de tracking, et les référenceurs pour analyser les URLs encodées dans les logs de serveur. L\'outil gère correctement les caractères réservés (!, *, \', (, ), ;), les accents et les caractères Unicode (emojis, CJK). Le traitement s\'effectue entièrement dans votre navigateur. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Encodez et décodez autant d\'URLs que vous le souhaitez.' },
      { q: 'Quelle est la différence entre encodeURI et encodeURIComponent ?', a: 'encodeURI conserve les séparateurs d\'URL (/, ?, &, =, #) tandis que encodeURIComponent encode tous les caractères spéciaux. Utilisez encodeURIComponent pour les paramètres de requête.' },
      { q: 'Les caractères Unicode sont-ils supportés ?', a: 'Oui, tous les caractères Unicode (accents, emojis, CJK) sont correctement encodés en séquences UTF-8 percent-encodées.' }
    ],
    howTo: ['Collez votre URL ou texte', 'Choisissez encoder ou décoder', 'Le résultat s\'affiche instantanément', 'Copiez le résultat'],
    relatedSlugs: ['nettoyeur-url-tracking', 'json-csv', 'base64'],
  },
  'css-gradient': {
    toolId: 'css-gradient-generator', category: 'dev-seo', slug: 'css-gradient',
    title: 'Générateur de Dégradé CSS en Ligne Gratuit — CSS Gradient',
    desc: 'Créez des dégradés CSS linéaires et radiaux visuellement. Gratuit, sans inscription, 100% local.',
    h1: 'Créer un dégradé CSS en ligne',
    intro: 'Générez visuellement des dégradés CSS (gradients) pour vos projets web sans écrire une seule ligne de code. Les dégradés CSS sont omniprésents dans le design web moderne : arrière-plans de sections, boutons, cartes, hero banners et overlays. Notre générateur vous permet de créer des dégradés linéaires et radiaux en glissant les points de couleur, en ajustant les angles et les positions, et en ajoutant autant de stops de couleur que nécessaire. Le code CSS est généré en temps réel avec les préfixes navigateurs pour une compatibilité maximale. Les designers web l\'utilisent pour prototyper rapidement des arrière-plans, les développeurs frontend pour intégrer des dégradés pixel-perfect, et les créateurs de thèmes pour leurs palettes. Vous pouvez aussi importer des dégradés existants pour les modifier. Le traitement s\'effectue entièrement dans votre navigateur. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Créez autant de dégradés que vous le souhaitez.' },
      { q: 'Quels types de dégradés sont supportés ?', a: 'Dégradés linéaires (linear-gradient) et radiaux (radial-gradient) avec un nombre illimité de stops de couleur.' },
      { q: 'Le code CSS est-il compatible avec tous les navigateurs ?', a: 'Oui, le code généré inclut les préfixes vendeur (-webkit-, -moz-) pour une compatibilité maximale avec les anciens navigateurs.' }
    ],
    howTo: ['Choisissez le type de dégradé (linéaire ou radial)', 'Ajoutez et ajustez les couleurs', 'Modifiez l\'angle et la direction', 'Copiez le code CSS généré'],
    relatedSlugs: ['color-picker', 'convertisseur-couleurs', 'meta-tags'],
  },
  'markdown-preview': {
    toolId: 'markdown-preview', category: 'dev-seo', slug: 'markdown-preview',
    title: 'Éditeur Markdown en Ligne Gratuit — Aperçu en Direct',
    desc: 'Éditeur Markdown avec aperçu en temps réel. Gratuit, sans inscription, 100% local.',
    h1: 'Éditeur Markdown avec aperçu en direct',
    intro: 'Rédigez en Markdown et visualisez instantanément le rendu HTML dans notre éditeur avec aperçu en temps réel. Le Markdown est le format d\'écriture le plus populaire chez les développeurs, utilisé pour la documentation technique (GitHub, GitLab), les fichiers README, les blogs statiques (Hugo, Jekyll, Gatsby) et les systèmes de prise de notes (Notion, Obsidian). Notre éditeur prend en charge la syntaxe Markdown étendue : tableaux, blocs de code avec coloration syntaxique, listes de tâches, notes de bas de page, mathématiques LaTeX et diagrammes Mermaid. Les développeurs l\'utilisent pour rédiger des README et de la documentation, les rédacteurs pour prévisualiser des articles de blog, et les étudiants pour prendre des notes structurées. Le traitement s\'effectue entièrement dans votre navigateur : votre contenu reste sur votre appareil. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Rédigez autant de documents Markdown que vous le souhaitez.' },
      { q: 'Quelle syntaxe Markdown est supportée ?', a: 'Markdown standard (CommonMark) + extensions : tableaux, blocs de code, listes de tâches, notes de bas de page, maths LaTeX et diagrammes Mermaid.' },
      { q: 'Puis-je exporter le résultat ?', a: 'Oui, vous pouvez copier le rendu HTML ou télécharger le document au format HTML.' }
    ],
    howTo: ['Rédigez votre contenu Markdown dans l\'éditeur', 'L\'aperçu HTML s\'affiche en temps réel', 'Utilisez la barre d\'outils pour les raccourcis', 'Copiez ou téléchargez le résultat'],
    relatedSlugs: ['formateur-json', 'testeur-regex', 'compteur-mots'],
  },
  'nettoyeur-url-tracking': {
    toolId: 'url-cleaner', category: 'dev-seo', slug: 'nettoyeur-url-tracking',
    title: 'Nettoyeur d\'URL en Ligne Gratuit — Supprimer Paramètres Tracking',
    desc: 'Supprimez les paramètres de tracking (UTM, fbclid, etc.) de vos liens. Gratuit, sans inscription.',
    h1: 'Nettoyer une URL des paramètres de tracking',
    intro: 'Purifiez vos URLs en supprimant les paramètres de tracking inutiles qui encombrent vos liens partagés. Les paramètres UTM (utm_source, utm_medium, utm_campaign), fbclid (Facebook), gclid (Google Ads), mc_eid (Mailchimp) et dizaines d\'autres sont ajoutés automatiquement par les plateformes marketing pour suivre le parcours des utilisateurs. Ces paramètres alourdissent les URLs, les rendent laides dans les messages et les emails, et peuvent révéler des informations de tracking que vous ne souhaitez pas partager. Notre outil détecte et supprime automatiquement plus de 200 paramètres de tracking connus, tout en préservant les paramètres fonctionnels nécessaires au bon fonctionnement de la page (page, category, id, etc.). Les professionnels du marketing l\'utilisent pour nettoyer les liens avant de les partager en réunion, les blogueurs pour des liens propres dans leurs articles, et les utilisateurs soucieux de leur vie privée. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Nettoyez autant d\'URLs que vous le souhaitez.' },
      { q: 'Quels paramètres sont supprimés ?', a: 'Plus de 200 paramètres de tracking connus : UTM (utm_source, utm_medium, utm_campaign, utm_content, utm_term), fbclid, gclid, mc_eid, mc_cid, yclid, _hsenc et bien d\'autres.' },
      { q: 'Les paramètres fonctionnels sont-ils conservés ?', a: 'Oui, les paramètres nécessaires au fonctionnement de la page (page, id, category, q, search, etc.) sont préservés. Seuls les paramètres de tracking sont supprimés.' }
    ],
    howTo: ['Collez votre URL', 'L\'outil détecte les paramètres de tracking', 'Vérifiez l\'URL nettoyée', 'Copiez l\'URL propre'],
    relatedSlugs: ['url-encode-decode', 'sitemap-robots', 'meta-tags'],
  },
  'compteur-mots': {
    toolId: 'word-counter', category: 'text-tools', slug: 'compteur-mots',
    title: 'Compteur de Mots en Ligne Gratuit — Caractères, Phrases, Paragraphes',
    desc: 'Comptez les mots, caractères, phrases et paragraphes de votre texte en temps réel. Gratuit, sans inscription.',
    h1: 'Compter les mots et caractères d\'un texte',
    intro: 'Analysez instantanément les statistiques de votre texte : nombre de mots, de caractères (avec et sans espaces), de phrases, de paragraphes et le temps de lecture estimé. Le compteur de mots est un outil indispensable pour les rédacteurs web qui doivent respecter des limites de mots imposées par les plateformes (articles SEO à 1500+ mots, posts LinkedIn à 3000 caractères, tweets à 280 caractères), les étudiants qui doivent respecter les consignes de longueur de leurs mémoires, et les traducteurs qui facturent au mot. L\'analyse en temps réel vous permet d\'ajuster votre texte au fur et à mesure de la rédaction sans avoir à lancer de calcul manuel. L\'outil détecte automatiquement la langue du texte pour un comptage précis des mots, y compris pour les langues à caractères non séparés par des espaces comme le chinois ou le japonais. Le traitement s\'effectue entièrement dans votre navigateur : votre texte reste sur votre appareil. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Analysez autant de textes que vous le souhaitez.' },
      { q: 'Comment sont comptés les mots ?', a: 'Les mots sont comptés en séparant le texte par les espaces et la ponctuation. Les caractères spéciaux et les tirets sont gérés intelligemment pour un comptage précis.' },
      { q: 'Le temps de lecture est-il fiable ?', a: 'Oui, le temps de lecture est estimé sur une moyenne de 200 à 250 mots par minute, ce qui correspond à la vitesse de lecture silencieuse d\'un adulte.' }
    ],
    howTo: ['Collez ou tapez votre texte', 'Les statistiques s\'affichent en temps réel', 'Ajustez votre texte selon les limites souhaitées', 'Copiez le texte final'],
    relatedSlugs: ['convertisseur-casse', 'comparateur-texte', 'lorem-ipsum'],
  },
  'convertisseur-casse': {
    toolId: 'case-converter', category: 'text-tools', slug: 'convertisseur-casse',
    title: 'Convertisseur de Casse en Ligne Gratuit — Majuscules, Minuscules, CamelCase',
    desc: 'Convertissez votre texte en majuscules, minuscules, camelCase, snake_case et plus. Gratuit et sans inscription.',
    h1: 'Convertir la casse d\'un texte en ligne',
    intro: 'Transformez instantanément la casse de votre texte entre tous les formats courants : MAJUSCULES, minuscules, Majuscule En Début De Phrase (Title Case), camelCase, PascalCase, snake_case, SCREAMING_SNAKE_CASE, kebab-case et CONSTANT_CASE. La conversion de casse est une opération quotidienne pour les développeurs qui doivent respecter les conventions de nommage (variables en camelCase, constantes en SCREAMING_SNAKE_CASE, composants en PascalCase), les designers qui convertissent des titres en Title Case, et les rédacteurs qui ajustent la casse de leurs textes. Notre outil détecte intelligemment les mots composés et les préserve lors de la conversion. Par exemple, JSON-API devient jsonApi en camelCase et JSON_API en SCREAMING_SNAKE_CASE. Le traitement s\'effectue entièrement dans votre navigateur : votre texte reste sur votre appareil. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Convertissez autant de textes que vous le souhaitez.' },
      { q: 'Quels types de casse sont disponibles ?', a: 'MAJUSCULES, minuscules, Title Case, camelCase, PascalCase, snake_case, SCREAMING_SNAKE_CASE, kebab-case et CONSTANT_CASE.' },
      { q: 'Les mots composés sont-ils gérés ?', a: 'Oui, les mots composés avec tirets ou underscores sont intelligemment préservés lors de la conversion entre les différents formats.' }
    ],
    howTo: ['Collez votre texte', 'Choisissez le type de casse', 'Le texte converti s\'affiche instantanément', 'Copiez le résultat'],
    relatedSlugs: ['compteur-mots', 'lorem-ipsum', 'comparateur-texte'],
  },
  'lorem-ipsum': {
    toolId: 'lorem-ipsum-generator', category: 'text-tools', slug: 'lorem-ipsum',
    title: 'Générateur Lorem Ipsum en Ligne Gratuit — Texte Placeholder',
    desc: 'Générez du texte Lorem Ipsum placeholder pour vos maquettes et designs. Gratuit, sans inscription.',
    h1: 'Générer du texte Lorem Ipsum en ligne',
    intro: 'Générez instantanément du texte Lorem Ipsum pour remplir vos maquettes, prototypes et designs de placeholder. Le Lorem Ipsum est le texte factice standard de l\'industrie du design, utilisé depuis le XVe siècle par les typographes pour simuler du contenu réel sans distraire le lecteur par du texte signifiant. Les designers web l\'utilisent pour peupler les wireframes et les prototypes Figma, les développeurs frontend pour tester les mises en page responsives avec différentes quantités de contenu, et les graphistes pour calibrer les tailles de polices et les interlignages. Notre générateur vous permet de créer du Lorem Ipsum classique ou varié, par nombre de paragraphes, de mots ou de caractères, avec des options de personnalisation. Le texte généré suit la structure du Lorem Ipsum original pour un rendu visuel réaliste. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Générez autant de Lorem Ipsum que vous le souhaitez.' },
      { q: 'Puis-je choisir la quantité de texte ?', a: 'Oui, vous pouvez générer du Lorem Ipsum par nombre de paragraphes, de mots ou de caractères selon vos besoins.' },
      { q: 'Pourquoi utiliser du Lorem Ipsum plutôt que du texte réel ?', a: 'Le Lorem Ipsum simule la distribution visuelle du texte réel sans en distraire le lecteur par le sens, ce qui permet de se concentrer sur la mise en page et le design.' }
    ],
    howTo: ['Choisissez le mode (paragraphes, mots ou caractères)', 'Définissez la quantité souhaitée', 'Générez le texte', 'Copiez le Lorem Ipsum'],
    relatedSlugs: ['compteur-mots', 'convertisseur-casse', 'comparateur-texte'],
  },
  'base64': {
    toolId: 'base64-encode-decode', category: 'text-tools', slug: 'base64',
    title: 'Base64 Encode / Decode en Ligne Gratuit — Encoder Décoder Base64',
    desc: 'Encodez et décodez du texte et des fichiers en Base64. Gratuit, sans inscription, 100% local.',
    h1: 'Encoder et décoder en Base64 en ligne',
    intro: 'Encodez et décodez du texte, des URLs et des fichiers en Base64 directement dans votre navigateur. Le Base64 est un encodage binaire vers texte qui convertit des données binaires en une chaîne de caractères ASCII, utilisé pour intégrer des images dans du CSS ou du HTML (data URIs), transmettre des données binaires dans des APIs JSON, stocker des certificats et des clés, ou encoder des identifiants d\'authentification HTTP Basic. Les développeurs backend l\'utilisent pour encoder les payloads JWT, les frontend pour les data URIs d\'images, et les DevOps pour les secrets Kubernetes. Notre outil supporte l\'encodage standard, l\'encodage URL-safe (sans +/), et le décodage automatique des deux formats. Le traitement s\'effectue entièrement dans votre navigateur : vos données restent sur votre appareil. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Encodez et décodez autant de données que vous le souhaitez.' },
      { q: 'Quelle est la différence entre Base64 standard et URL-safe ?', a: 'Le Base64 standard utilise + et / qui sont des caractères réservés dans les URLs. Le Base64 URL-safe les remplace par - et _ pour une utilisation sécurisée dans les URLs et noms de fichiers.' },
      { q: 'Puis-je encoder des fichiers en Base64 ?', a: 'Oui, vous pouvez encoder n\'importe quel fichier (images, PDF, etc.) en Base64 pour l\'intégrer dans du CSS, du HTML ou du JSON.' }
    ],
    howTo: ['Collez votre texte ou chargez un fichier', 'Choisissez encoder ou décoder', 'Sélectionnez le mode (standard ou URL-safe)', 'Copiez le résultat'],
    relatedSlugs: ['url-encode-decode', 'generateur-hash', 'generateur-mot-de-passe'],
  },
  'comparateur-texte': {
    toolId: 'text-diff-checker', category: 'text-tools', slug: 'comparateur-texte',
    title: 'Comparateur de Texte en Ligne Gratuit — Diff Texte',
    desc: 'Comparez deux textes et voyez les différences en surbrillance. Gratuit, sans inscription, 100% local.',
    h1: 'Comparer deux textes et voir les différences',
    intro: 'Comparez deux textes côte à côte et visualisez instantanément les différences avec un surlignage couleur. Notre comparateur de texte (diff checker) met en évidence les lignes ajoutées, supprimées et modifiées entre deux versions d\'un document. C\'est un outil essentiel pour les rédacteurs qui révisent des articles, les traducteurs qui vérifient des modifications, les développeurs qui comparent des configurations, et les juristes qui suivent les changements dans des contrats. L\'affichage côte à côte permet une lecture fluide des différences, tandis que l\'affichage unifié regroupe toutes les modifications dans un seul texte. Les différences sont colorées : vert pour les ajouts, rouge pour les suppressions, et jaune pour les modifications. Le traitement s\'effectue entièrement dans votre navigateur : vos textes restent sur votre appareil. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Comparez autant de textes que vous le souhaitez.' },
      { q: 'Comment fonctionne la comparaison ?', a: 'L\'algorithme analyse les deux textes ligne par ligne et identifie les ajouts, suppressions et modifications. Les différences sont mises en surbrillance avec des couleurs distinctes.' },
      { q: 'Puis-je ignorer les différences de casse ou d\'espaces ?', a: 'Oui, des options permettent d\'ignorer les différences de casse (majuscules/minuscules) et d\'espaces (espaces multiples, tabulations) pour une comparaison plus souple.' }
    ],
    howTo: ['Collez le texte original dans le panneau gauche', 'Collez le texte modifié dans le panneau droit', 'Les différences s\'affichent en surbrillance', 'Ajustez les options de comparaison si nécessaire'],
    relatedSlugs: ['compteur-mots', 'convertisseur-casse', 'lorem-ipsum'],
  },
  'separateur-nom-prenom': {
    toolId: 'name-splitter', category: 'text-tools', slug: 'separateur-nom-prenom',
    title: 'Séparateur Prénom Nom en Ligne Gratuit — Split Noms',
    desc: 'Séparez les prénoms et noms de famille depuis une liste. Gratuit, sans inscription, 100% local.',
    h1: 'Séparer prénoms et noms de famille en ligne',
    intro: 'Séparez automatiquement les prénoms et noms de famille à partir d\'une liste de noms complets. Lorsque vous importez des données depuis un fichier Excel, un CRM ou une base de données, les noms sont souvent regroupés dans une seule colonne. Notre outil détecte intelligemment la structure des noms (prénom + nom, nom + prénom, noms composés avec tirets, particules comme de, van, von) et les sépare en colonnes distinctes. Les professionnels RH utilisent cet outil pour nettoyer les listes d\'employés, les marketeurs pour segmenter leurs bases de contacts, et les administrateurs pour préparer des fichiers d\'import. Vous pouvez coller une liste de noms ou charger un fichier CSV, et exporter le résultat en CSV ou Excel. Le traitement s\'effectue entièrement dans votre navigateur : vos données restent sur votre appareil. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Séparez autant de noms que vous le souhaitez.' },
      { q: 'Les noms composés sont-ils gérés ?', a: 'Oui, l\'outil détecte les noms composés avec tirets (Jean-Pierre), les particules (de, van, von, el) et les noms à particules nobiliaires.' },
      { q: 'Puis-je importer un fichier CSV ?', a: 'Oui, vous pouvez charger un fichier CSV contenant une colonne de noms complets. Sélectionnez la colonne à traiter et exportez le résultat.' },
      { q: 'Comment l\'outil détermine-t-il le prénom et le nom ?', a: 'L\'algorithme analyse la position, les majuscules et les patterns courants pour les noms français et internationaux. Vous pouvez aussi spécifier le format (prénom nom ou nom prénom).' }
    ],
    howTo: ['Collez votre liste de noms ou chargez un CSV', 'L\'outil sépare automatiquement prénoms et noms', 'Vérifiez et corrigez si nécessaire', 'Exportez en CSV ou copiez le résultat'],
    relatedSlugs: ['compteur-mots', 'convertisseur-casse', 'comparateur-texte'],
  },
  'generateur-qr-code': {
    toolId: 'qr-code-generator', category: 'generators', slug: 'generateur-qr-code',
    title: 'Générateur de QR Code en Ligne Gratuit — Créer QR Code',
    desc: 'Créez des QR codes pour URLs, texte, WiFi et plus. Personnalisez couleurs et taille. Gratuit, sans inscription.',
    h1: 'Générer un QR code en ligne gratuitement',
    intro: 'Créez des QR codes personnalisés pour toutes vos utilisations : liens web, texte, identifiants WiFi, coordonnées vCard, numéros de téléphone et adresses email. Les QR codes sont devenus un outil incontournable du marketing digital et de la communication : cartes de visite numériques, menus de restaurant sans contact, liens de paiement, billets d\'événement et campagnes publicitaires. Notre générateur vous permet de personnaliser la couleur de premier plan et d\'arrière-plan, la taille de l\'image, et le niveau de correction d\'erreur (L, M, Q, H) pour garantir la lisibilité même si le QR code est partiellement endommagé ou imprimé en petite taille. Le résultat est téléchargeable en PNG haute résolution ou en SVG vectoriel pour une impression professionnelle. Le traitement s\'effectue entièrement dans votre navigateur : vos données restent sur votre appareil. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Générez autant de QR codes que vous le souhaitez.' },
      { q: 'Que puis-je encoder dans un QR code ?', a: 'URLs, texte libre, identifiants WiFi (SSID, mot de passe, type de chiffrement), coordonnées vCard, numéros de téléphone et adresses email.' },
      { q: 'Quelle est la différence entre PNG et SVG ?', a: 'Le PNG est une image bitmap idéale pour le web et les réseaux sociaux. Le SVG est vectoriel et peut être redimensionné à l\'infini sans perte de qualité, parfait pour l\'impression.' },
      { q: 'Quels niveaux de correction d\'erreur choisir ?', a: 'L (7%), M (15%), Q (25%), H (30%). Plus le niveau est élevé, plus le QR code résiste aux dommages, mais plus il est dense. Q ou H sont recommandés pour l\'impression.' }
    ],
    howTo: ['Choisissez le type de contenu à encoder', 'Entrez vos données', 'Personnalisez couleurs et options', 'Téléchargez en PNG ou SVG'],
    relatedSlugs: ['generateur-mot-de-passe', 'generateur-lien-whatsapp', 'generateur-hash'],
  },
  'generateur-mot-de-passe': {
    toolId: 'password-generator', category: 'generators', slug: 'generateur-mot-de-passe',
    title: 'Générateur de Mots de Passe en Ligne Gratuit — Mots de Passe Sécurisés',
    desc: 'Générez des mots de passe forts et aléatoires. Personnalisez longueur et caractères. Gratuit, 100% local.',
    h1: 'Générer un mot de passe sécurisé en ligne',
    intro: 'Créez des mots de passe forts et aléatoires en un clic pour protéger vos comptes en ligne. La sécurité des mots de passe est la première ligne de défense contre le piratage : un mot de passe faible peut être cracké en quelques secondes par une attaque par force brute. Notre générateur vous permet de configurer précisément la longueur (de 4 à 128 caractères) et les types de caractères inclus : majuscules, minuscules, chiffres et symboles spéciaux. Les recommandations actuelles du NIST préconisent des mots de passe d\'au moins 12 caractères combinant tous les types de caractères. L\'outil affiche en temps réel la force estimée du mot de passe (faible, moyen, fort, très fort) et le temps estimé pour le craquer par force brute. Les mots de passe sont générés entièrement dans votre navigateur en utilisant l\'API Crypto.getRandomValues() pour une véritable randomisation cryptographique. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Aucune donnée n\'est envoyée à un serveur.' },
      { q: 'Mes mots de passe sont-ils vraiment sécurisés ?', a: 'Oui, ils sont générés avec l\'API cryptographique Crypto.getRandomValues() du navigateur, qui produit une véritable randomisation impossible à prédire.' },
      { q: 'Quelle longueur de mot de passe recommander ?', a: 'Minimum 12 caractères pour un usage courant, 16+ pour les comptes sensibles (banque, email principal). Combinez majuscules, minuscules, chiffres et symboles.' },
      { q: 'L\'outil stocke-t-il mes mots de passe ?', a: 'Non, aucun mot de passe n\'est jamais stocké ou transmis. Tout reste dans votre navigateur.' }
    ],
    howTo: ['Choisissez la longueur souhaitée', 'Sélectionnez les types de caractères', 'Cliquez sur Générer', 'Copiez le mot de passe'],
    relatedSlugs: ['generateur-hash', 'generateur-uuid-guid', 'base64'],
  },
  'generateur-hash': {
    toolId: 'hash-generator', category: 'generators', slug: 'generateur-hash',
    title: 'Générateur de Hash en Ligne Gratuit — MD5, SHA-256, SHA-512',
    desc: 'Générez des hash MD5, SHA-1, SHA-256 et SHA-512. Gratuit, sans inscription, 100% local.',
    h1: 'Générer un hash MD5, SHA-256 ou SHA-512 en ligne',
    intro: 'Calculez instantanément les empreintes numériques (hash) de n\'importe quel texte en utilisant les algorithmes les plus courants : MD5, SHA-1, SHA-256, SHA-384 et SHA-512. Les fonctions de hash sont des primitives cryptographiques essentielles utilisées pour vérifier l\'intégrité des fichiers, stocker les mots de passe de manière sécurisée, signer des documents numériquement et identifier des données de manière unique. Les développeurs utilisent les hash pour vérifier que les fichiers téléchargés n\'ont pas été altérés, les administrateurs système pour vérifier les sommes de contrôle des sauvegardes, et les security engineers pour détecter les modifications non autorisées. Notre outil calcule tous les hash en parallèle pour un résultat instantané. Le traitement s\'effectue entièrement dans votre navigateur grâce à l\'API Web Crypto : vos données ne sont jamais envoyées à un serveur. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Calculez autant de hash que vous le souhaitez.' },
      { q: 'Quelle est la différence entre MD5 et SHA-256 ?', a: 'MD5 produit un hash de 128 bits (32 caractères hex) mais est considéré comme cryptographiquement cassé. SHA-256 produit un hash de 256 bits (64 caractères hex) et est recommandé pour les usages de sécurité.' },
      { q: 'A quoi servent les hash ?', a: 'Vérification d\'intégrité des fichiers, stockage sécurisé de mots de passe, signatures numériques, identification de données, détection de doublons et de modifications.' }
    ],
    howTo: ['Entrez ou collez votre texte', 'Les hash sont calculés instantanément', 'Copiez le hash souhaité (MD5, SHA-1, SHA-256, SHA-512)'],
    relatedSlugs: ['generateur-mot-de-passe', 'base64', 'generateur-uuid-guid'],
  },
  'color-picker': {
    toolId: 'color-picker', category: 'generators', slug: 'color-picker',
    title: 'Color Picker en Ligne Gratuit — Sélecteur de Couleur HEX RGB HSL',
    desc: 'Choisissez une couleur et obtenez ses valeurs HEX, RGB et HSL. Gratuit, sans inscription.',
    h1: 'Choisir une couleur en ligne — HEX, RGB, HSL',
    intro: 'Sélectionnez visuellement la couleur parfaite pour vos projets web et graphiques à l\'aide de notre sélecteur de couleur interactif. L\'outil affiche instantanément les valeurs dans tous les formats nécessaires : HEX (#3b82f6), RGB (59, 130, 246), HSL (217°, 91%, 60%) et nom CSS le plus proche. Les designers web utilisent le color picker pour définir les palettes de leurs interfaces, les développeurs frontend pour copier les valeurs exactes des couleurs dans leur CSS ou Tailwind, et les graphistes pour coordonner les couleurs entre leurs différents outils. Le sélecteur visuel vous permet de naviguer dans le spectre chromatique, ajuster la saturation et la luminosité, et affiner avec précision grâce aux champs numériques. Vous pouvez aussi saisir directement une valeur HEX ou RGB pour retrouver la couleur correspondante. Le traitement s\'effectue entièrement dans votre navigateur. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Choisissez autant de couleurs que vous le souhaitez.' },
      { q: 'Quels formats de couleur sont disponibles ?', a: 'HEX (#rrggbb), RGB (r, g, b), HSL (h, s%, l%) et le nom CSS le plus proche (par ex. dodgerblue, coral).' },
      { q: 'Puis-je copier les valeurs facilement ?', a: 'Oui, chaque format dispose d\'un bouton Copier en un clic pour coller directement dans votre CSS ou code.' }
    ],
    howTo: ['Utilisez le sélecteur de couleur visuel', 'Ajustez saturation et luminosité', 'Visualisez les valeurs HEX, RGB et HSL', 'Copiez le format souhaité'],
    relatedSlugs: ['convertisseur-couleurs', 'css-gradient', 'generateur-favicon'],
  },
  'generateur-lien-whatsapp': {
    toolId: 'whatsapp-link', category: 'generators', slug: 'generateur-lien-whatsapp',
    title: 'Générateur de Lien WhatsApp en Ligne Gratuit — Wa.me Link',
    desc: 'Créez un lien direct vers WhatsApp avec message pré-rempli. Gratuit, sans inscription.',
    h1: 'Générer un lien direct vers WhatsApp en ligne',
    intro: 'Créez un lien direct vers WhatsApp (wa.me) qui ouvre automatiquement une conversation avec un numéro prédéfini et un message pré-rempli. Les liens WhatsApp sont un outil puissant pour le marketing et le service client : placez-les sur votre site web, dans vos emails, vos réseaux sociaux ou vos publicités pour permettre à vos visiteurs de vous contacter instantanément sur WhatsApp sans avoir à chercher votre numéro. Les e-commerçants les utilisent pour l\'assistance client, les restaurateurs pour les réservations, les freelances pour les devis, et les agences pour les prises de contact. Notre générateur vous permet de configurer le numéro de téléphone (avec indicatif pays), le message par défaut et de prévisualiser le lien avant de le copier. Le format wa.me/33612345678 est universellement compatible avec iOS, Android et WhatsApp Web. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Générez autant de liens WhatsApp que vous le souhaitez.' },
      { q: 'Comment fonctionne le lien wa.me ?', a: 'Le lien wa.me/33612345678 ouvre WhatsApp directement sur la conversation avec le numéro +33612345678. Vous pouvez ajouter ?text=VotreMessage pour pré-remplir le message.' },
      { q: 'Le numéro doit-il inclure l\'indicatif pays ?', a: 'Oui, le numéro doit être au format international sans le + (ex: 33612345678 pour la France, 212612345678 pour le Maroc).' }
    ],
    howTo: ['Entrez le numéro de téléphone avec indicatif pays', 'Rédigez le message par défaut', 'Prévisualisez le lien', 'Copiez le lien wa.me généré'],
    relatedSlugs: ['generateur-qr-code', 'generateur-mot-de-passe', 'color-picker'],
  },
  'generateur-uuid-guid': {
    toolId: 'uuid-generator', category: 'generators', slug: 'generateur-uuid-guid',
    title: 'Générateur d\'UUID en Ligne Gratuit — GUID v4',
    desc: 'Générez instantanément des UUID v4 uniques et aléatoires. Gratuit, sans inscription, 100% local.',
    h1: 'Générer un UUID (GUID) v4 en ligne',
    intro: 'Générez instantanément des identifiants universels uniques (UUID v4 / GUID) directement dans votre navigateur. Les UUID sont des identifiants de 128 bits représentés sous forme de chaîne de 36 caractères (ex: 550e8400-e29b-41d4-a716-446655440000) utilisés pour identifier de manière unique des enregistrements dans les bases de données, des fichiers, des sessions utilisateur, des transactions et des messages. La version 4 (aléatoire) offre 2^122 combinaisons possibles, rendant la probabilité de collision quasiment nulle. Les développeurs backend utilisent les UUID comme clés primaires dans leurs bases de données, les développeurs frontend pour les identifiants de composants, et les DevOps pour les noms de ressources cloud. Notre générateur utilise l\'API Crypto.getRandomValues() pour une véritable randomisation cryptographique. Vous pouvez générer un ou plusieurs UUID à la fois. Le traitement s\'effectue entièrement dans votre navigateur. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Générez autant d\'UUID que vous le souhaitez.' },
      { q: 'Quelle est la probabilité de collision ?', a: 'Avec UUID v4, la probabilité de deux UUID identiques est d\'environ 1 sur 2.71 × 10^18, soit virtuellement impossible.' },
      { q: 'Quelle est la différence entre UUID et GUID ?', a: 'UUID et GUID désignent la même chose. UUID est le terme standard (RFC 4122), tandis que GUID est le terme utilisé par Microsoft.' }
    ],
    howTo: ['Choisissez le nombre d\'UUID à générer', 'Cliquez sur Générer', 'Copiez les UUID individuellement ou en bloc'],
    relatedSlugs: ['generateur-hash', 'generateur-mot-de-passe', 'generateur-nombres-aleatoires'],
  },
  'generateur-nombres-aleatoires': {
    toolId: 'random-number-generator', category: 'generators', slug: 'generateur-nombres-aleatoires',
    title: 'Générateur de Nombres Aléatoires en Ligne Gratuit',
    desc: 'Générez des nombres aléatoires avec paramètres personnalisables. Gratuit, sans inscription, 100% local.',
    h1: 'Générer des nombres aléatoires en ligne',
    intro: 'Générez des nombres aléatoires avec des paramètres entièrement personnalisables : minimum, maximum, nombre de résultats, et option d\'exclusion des doublons. Notre générateur utilise l\'API Crypto.getRandomValues() du navigateur pour produire une véritable randomisation cryptographique, bien supérieure aux générateurs pseudo-aléatoires classiques. Les nombres aléatoires sont utilisés dans de nombreux contextes : tirages au sort pour les concours, sélection aléatoire dans les jeux de société, génération de codes de vérification, échantillonnage statistique, simulations Monte Carlo et tests de charge. Les enseignants l\'utilisent pour former des groupes aléatoires, les joueurs pour les tirages de dés, et les développeurs pour tester leurs algorithmes avec des données aléatoires. Vous pouvez générer des nombres entiers ou décimaux, dans n\'importe quelle plage de valeurs. Le traitement s\'effectue entièrement dans votre navigateur : aucune donnée n\'est envoyée à un serveur. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Générez autant de nombres aléatoires que vous le souhaitez.' },
      { q: 'Les nombres sont-ils vraiment aléatoires ?', a: 'Oui, l\'outil utilise Crypto.getRandomValues() qui fournit une randomisation cryptographique, bien plus robuste que les générateurs pseudo-aléatoires standard.' },
      { q: 'Puis-je exclure les doublons ?', a: 'Oui, activez l\'option \'Sans doublons\' pour garantir que chaque nombre généré est unique dans la série.' },
      { q: 'Quelle plage de valeurs est supportée ?', a: 'De -1 000 000 000 à +1 000 000 000 pour les entiers. Pour les décimaux, vous pouvez définir le nombre de chiffres après la virgule.' }
    ],
    howTo: ['Définissez les bornes minimum et maximum', 'Choisissez le nombre de résultats', 'Activez l\'option sans doublons si nécessaire', 'Cliquez sur Générer'],
    relatedSlugs: ['generateur-uuid-guid', 'generateur-mot-de-passe', 'generateur-hash'],
  },
  'convertisseur-couleurs': {
    toolId: 'color-converter', category: 'generators', slug: 'convertisseur-couleurs',
    title: 'Convertisseur de Couleurs en Ligne Gratuit — HEX, RGB, HSL, CMYK',
    desc: 'Convertissez les couleurs entre HEX, RGB, HSL et CMYK. Gratuit, sans inscription, 100% local.',
    h1: 'Convertisseur de couleurs HEX, RGB, HSL, CMYK',
    intro: 'Convertissez instantanément une couleur entre tous les formats professionnels : HEX, RGB, HSL et CMYK. Saisissez une valeur dans n\'importe quel format et obtenez immédiatement toutes les conversions correspondantes avec un aperçu visuel. Le sélecteur de couleur intégré vous permet de choisir visuellement la teinte souhaitée, tandis que les champs numériques offrent un contrôle précis. Les développeurs web convertissent couramment entre HEX et RGB pour le CSS, les designers passent de HSL à CMYK pour l\'impression, et les graphistes coordonnent les couleurs entre leurs outils numériques et print. Le format CMYK est essentiel pour l\'impression professionnelle (offset, numérique grand format) car les couleurs d\'imprimerie ne correspondent pas exactement aux couleurs écran. Le traitement s\'effectue entièrement dans votre navigateur. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Convertissez autant de couleurs que vous le souhaitez.' },
      { q: 'Comment convertir un HEX en RGB ?', a: 'Entrez votre code HEX (ex: #3b82f6) dans le champ prévu et la valeur RGB s\'affiche instantanément.' },
      { q: 'Qu\'est-ce que le format CMYK ?', a: 'CMYK (Cyan, Magenta, Jaune, Noir) est utilisé en imprimerie. Notre outil convertit automatiquement votre couleur en CMYK pour un usage professionnel.' },
      { q: 'Puis-je copier les valeurs ?', a: 'Oui, chaque format dispose d\'un bouton Copier pour récupérer la valeur en un clic.' }
    ],
    howTo: ['Choisissez une couleur avec le sélecteur ou entrez un code HEX', 'Visualisez les conversions RGB, HSL et CMYK', 'Copiez le format souhaité en un clic'],
    relatedSlugs: ['color-picker', 'css-gradient', 'convertisseur-unites'],
  },
  'calculateur-imc': {
    toolId: 'bmi-calculator', category: 'calculators', slug: 'calculateur-imc',
    title: 'Calculateur d\'IMC en Ligne Gratuit — Indice de Masse Corporelle',
    desc: 'Calculez votre IMC et découvrez votre catégorie de poids. Gratuit, sans inscription, 100% local.',
    h1: 'Calculer son Indice de Masse Corporelle (IMC) en ligne',
    intro: 'Calculez votre Indice de Masse Corporelle (IMC) en saisissant votre taille et votre poids, et découvrez instantanément dans quelle catégorie de poids vous vous situez selon les classifications de l\'Organisation Mondiale de la Santé. L\'IMC est l\'indicateur de référence utilisé par les professionnels de santé pour évaluer le risque lié au poids : insuffisance pondérale (IMC < 18,5), poids normal (18,5-24,9), surpoids (25-29,9) et obésité (30+). Notre calculateur prend en charge les unités métriques (kg/cm) et impériales (lb/pieds-pouces) pour une utilisation mondiale. Les résultats incluent votre IMC, votre catégorie de poids, la plage de poids idéal pour votre taille, et un graphique de repérage visuel. L\'IMC est un outil de dépistage utile mais ne prend pas en compte la composition corporelle (masse musculaire vs masse grasse). Le calcul s\'effectue localement dans votre navigateur : vos données restent privées. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Aucune donnée n\'est collectée.' },
      { q: 'Quel est un IMC sain ?', a: 'Selon l\'OMS, un IMC entre 18,5 et 24,9 est considéré comme un poids normal. L\'insuffisance pondérale est en dessous de 18,5, le surpoids entre 25 et 29,9, et l\'obésité à 30 et au-dessus.' },
      { q: 'L\'IMC est-il fiable pour tout le monde ?', a: 'L\'IMC est un indicateur de dépistage utile mais il ne prend pas en compte la masse musculaire, la répartition des graisses ni l\'âge. Consultez un professionnel de santé pour une évaluation complète.' }
    ],
    howTo: ['Entrez votre taille (en cm ou pieds/pouces)', 'Entrez votre poids (en kg ou livres)', 'L\'IMC et la catégorie s\'affichent instantanément', 'Consultez la plage de poids idéal pour votre taille'],
    relatedSlugs: ['calculateur-age', 'calculateur-pourcentage', 'convertisseur-unites'],
  },
  'calculateur-age': {
    toolId: 'age-calculator', category: 'calculators', slug: 'calculateur-age',
    title: 'Calculateur d\'Âge en Ligne Gratuit — Âge Exact en Jours',
    desc: 'Calculez votre âge exact en années, mois et jours. Gratuit, sans inscription, 100% local.',
    h1: 'Calculer son âge exact en ligne',
    intro: 'Calculez votre âge exact en années, mois et jours à partir de votre date de naissance, ainsi que le nombre total de jours vécus, les heures et les minutes. Savoir son âge précis est utile dans de nombreuses situations : calcul de l\'âge légal pour la retraite, vérification de l\'éligibilité pour un programme, suivi de la croissance d\'un enfant, ou simplement curiosité personnelle. Notre calculateur affiche également votre prochain anniversaire, le nombre de jours restants avant celui-ci, et votre jour de naissance dans la semaine. Les professionnels RH l\'utilisent pour vérifier l\'âge des candidats, les parents pour suivre l\'âge précis de leurs enfants en mois, et les retraités pour calculer leurs trimestres cotisés. Le calcul s\'effectue localement dans votre navigateur : votre date de naissance n\'est jamais envoyée à un serveur. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Aucune donnée personnelle n\'est collectée.' },
      { q: 'L\'âge est-il calculé en temps réel ?', a: 'Oui, l\'âge se met à jour en temps réel avec la précision à la journée près, incluant les années bissextiles.' },
      { q: 'Puis-je calculer l\'âge entre deux dates quelconques ?', a: 'Oui, vous pouvez calculer la différence entre n\'importe quelles deux dates, pas seulement entre votre naissance et aujourd\'hui.' }
    ],
    howTo: ['Entrez votre date de naissance', 'L\'âge exact s\'affiche instantanément', 'Consultez les détails (jours vécus, prochain anniversaire)'],
    relatedSlugs: ['calculateur-imc', 'chronometre', 'calculateur-pourcentage'],
  },
  'calculateur-pourcentage': {
    toolId: 'percentage-calculator', category: 'calculators', slug: 'calculateur-pourcentage',
    title: 'Calculateur de Pourcentage en Ligne Gratuit — Tous les Calculs %',
    desc: 'Calculez tous les types de pourcentages : augmentation, réduction, proportion et plus. Gratuit, sans inscription.',
    h1: 'Calculer un pourcentage en ligne',
    intro: 'Réalisez tous les calculs de pourcentages en un clic : quelle est X% de Y ? X est quel pourcentage de Y ? Augmentation de X% ? Réduction de X% ? Le calcul de pourcentages est une compétence quotidienne essentielle : vérifier une remise lors des soldes, calculer la TVA, évaluer une augmentation de salaire, déterminer un pourboire, ou analyser des statistiques. Notre calculateur couvre tous les cas de figure avec des explications claires et des exemples concrets. Les consommateurs l\'utilisent pour vérifier les prix soldés et les taux d\'intérêt, les étudiants pour résoudre des exercices de mathématiques, et les professionnels pour analyser des données financières. Chaque calcul est accompagné de la formule utilisée pour vous permettre de reproduire le calcul mentalement à l\'avenir. Le calcul s\'effectue localement dans votre navigateur. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Calculez autant de pourcentages que vous le souhaitez.' },
      { q: 'Quels types de calculs sont disponibles ?', a: 'X% de Y, X est quel % de Y, augmentation de X%, réduction de X%, et le calcul de variation entre deux valeurs.' },
      { q: 'Comment calculer une remise ?', a: 'Utilisez le calcul \'réduction de X%\' : entrez le prix original et le pourcentage de remise. Par exemple, 30% de réduction sur 100€ donne 70€.' }
    ],
    howTo: ['Choisissez le type de calcul', 'Entrez les valeurs', 'Le résultat s\'affiche instantanément avec la formule'],
    relatedSlugs: ['calculateur-tva', 'calculateur-pourboire', 'calculateur-imc'],
  },
  'convertisseur-unites': {
    toolId: 'unit-converter', category: 'calculators', slug: 'convertisseur-unites',
    title: 'Convertisseur d\'Unités en Ligne Gratuit — Longueur, Poids, Température',
    desc: 'Convertissez entre unités de longueur, poids, température, volume, vitesse et plus. Gratuit, sans inscription.',
    h1: 'Convertir des unités en ligne gratuitement',
    intro: 'Convertissez instantanément entre toutes les unités de mesure courantes : longueur (m, km, mi, ft), poids (kg, lb, oz), température (°C, °F, K), volume (L, gal, fl oz), vitesse (km/h, mph, m/s), surface (m², ha, acre) et temps (s, min, h, jours). Le convertisseur d\'unités est un outil essentiel pour les voyageurs qui passent d\'un système métrique à impérial, les cuisiniers qui adaptent des recettes étrangères, les étudiants en sciences qui manipulent des unités SI, et les professionnels qui travaillent avec des partenaires internationaux. Notre outil couvre 7 catégories de mesures avec plus de 50 unités, et les conversions s\'effectuent en temps réel au fur et à mesure de la saisie. Les formules de conversion sont affichées pour référence éducative. Le calcul s\'effectue localement dans votre navigateur. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Convertissez autant d\'unités que vous le souhaitez.' },
      { q: 'Quelles catégories d\'unités sont disponibles ?', a: 'Longueur, poids/masse, température, volume, vitesse/vélocité, surface et temps — plus de 50 unités au total.' },
      { q: 'Comment convertir des températures ?', a: 'Entrez la valeur et sélectionnez l\'unité source. Les conversions en Celsius, Fahrenheit et Kelvin s\'affichent instantanément.' }
    ],
    howTo: ['Sélectionnez la catégorie d\'unités', 'Entrez la valeur et choisissez l\'unité source', 'Le résultat dans toutes les unités s\'affiche instantanément'],
    relatedSlugs: ['calculateur-pourcentage', 'convertisseur-couleurs', 'calculateur-dosage-beton'],
  },
  'calculateur-dosage-beton': {
    toolId: 'concrete-calculator', category: 'calculators', slug: 'calculateur-dosage-beton',
    title: 'Calculateur de Dosage Béton en Ligne Gratuit — Ciment, Sable, Gravier',
    desc: 'Calculez les volumes de ciment, sable et gravier pour votre dosage béton. Gratuit, sans inscription.',
    h1: 'Calculer le dosage du béton en ligne',
    intro: 'Calculez les quantités précises de ciment, sable, gravier et eau nécessaires pour votre dosage béton en fonction du volume à couler et du type de béton souhaité. Le dosage du béton est une étape critique de tout projet de construction : un béton mal dosé peut être trop faible, trop poreux ou ne pas prendre correctement. Notre calculateur vous propose les dosages standards (350 kg/m³ pour les fondations, 400 kg/m³ pour les dalles, 250 kg/m³ pour les scellement) et vous permet de personnaliser le dosage selon vos besoins. Les résultats sont exprimés en kilogrammes et en nombre de sacs de ciment de 35 kg pour faciliter vos achats. Les professionnels du BTP, les artisans maçons et les particuliers réalisant des travaux de bricolage utilisent cet outil pour éviter le gaspillage et garantir la résistance du béton. Le calcul s\'effectue localement dans votre navigateur. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Calculez autant de dosages que vous le souhaitez.' },
      { q: 'Quel dosage pour quel usage ?', a: '350 kg/m³ pour les fondations et murs porteurs, 400 kg/m³ pour les dalles et terrasses, 250 kg/m³ pour les scellements et réparations.' },
      { q: 'Comment calculer le volume à couler ?', a: 'Entrez les dimensions (longueur, largeur, épaisseur) et l\'outil calcule automatiquement le volume en m³.' },
      { q: 'Le dosage inclut-il l\'eau ?', a: 'Oui, la quantité d\'eau est calculée en litres selon le ratio eau/ciment recommandé pour chaque type de béton.' }
    ],
    howTo: ['Entrez les dimensions de l\'ouvrage (longueur, largeur, épaisseur)', 'Choisissez le type de béton ou personnalisez le dosage', 'Les quantités de ciment, sable, gravier et eau s\'affichent', 'Notez les résultats pour vos achats'],
    relatedSlugs: ['calculateur-frais-kilometriques', 'convertisseur-unites', 'calculateur-pourcentage'],
  },
  'calculateur-frais-kilometriques': {
    toolId: 'mileage-calculator', category: 'calculators', slug: 'calculateur-frais-kilometriques',
    title: 'Calculateur de Frais Kilométriques en Ligne Gratuit — Barème URSSAF',
    desc: 'Calculez vos indemnités kilométriques selon le barème URSSAF. Gratuit, sans inscription, 100% local.',
    h1: 'Calculer ses frais kilométriques en ligne',
    intro: 'Calculez vos indemnités kilométriques selon le barème officiel URSSAF pour votre déclaration d\'impôts ou vos notes de frais professionnelles. Le barème kilométrique est publié chaque année par l\'administration fiscale et varie selon la puissance fiscale du véhicule et le nombre de kilomètres parcourus. Notre calculateur intègre les barèmes les plus récents pour les voitures (CV 3 à 7 et plus), les motos (50cc à plus de 500cc) et les cyclomoteurs (moins de 50cc). Il suffit d\'entrer la distance parcourue et la puissance fiscale de votre véhicule pour obtenir instantanément le montant de l\'indemnité. Les salariés en déplacement professionnel, les travailleurs indépendants et les auto-entrepreneurs utilisent cet outil pour optimiser leur déduction fiscale et ne pas oublier les frais de carburant, d\'entretien et d\'assurance inclus dans le barème. Le calcul s\'effectue localement dans votre navigateur. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Calculez vos frais kilométriques autant que nécessaire.' },
      { q: 'Quel barème est utilisé ?', a: 'Le barème URSSAF officiel le plus récent est appliqué. Il varie selon la puissance fiscale du véhicule et le kilométrage annuel.' },
      { q: 'Quels frais sont inclus dans le barème ?', a: 'Le barème inclut les frais de carburant, d\'entretien, d\'assurance, de dépréciation du véhicule et des pneus. Les péages et le stationnement ne sont pas inclus.' },
      { q: 'Puis-je utiliser ce calcul pour ma déclaration d\'impôts ?', a: 'Oui, les montants calculés sont conformes au barème fiscal officiel et peuvent être utilisés pour votre déclaration de revenus.' }
    ],
    howTo: ['Sélectionnez le type de véhicule (voiture, moto, cyclomoteur)', 'Entrez la puissance fiscale en CV', 'Entrez le kilométrage annuel', 'Le montant de l\'indemnité s\'affiche instantanément'],
    relatedSlugs: ['calculateur-tva', 'calculateur-pourcentage', 'convertisseur-unites'],
  },
  'chronometre': {
    toolId: 'stopwatch', category: 'calculators', slug: 'chronometre',
    title: 'Chronomètre en Ligne Gratuit — Chronométrage de Précision',
    desc: 'Chronomètre en ligne gratuit avec tours intermédiaires. Précision au centième de seconde.',
    h1: 'Chronomètre en ligne avec tours intermédiaires',
    intro: 'Un chronomètre de précision directement dans votre navigateur, avec enregistrement des temps intermédiaires (laps) et une précision au centième de seconde. Que vous chronométriez une course sportive, une session d\'entraînement, un temps de cuisson ou un projet professionnel, notre chronomètre offre toutes les fonctionnalités d\'un chronomètre physique sans rien installer. L\'enregistrement des tours intermédiaires vous permet de comparer les temps entre différentes phases d\'un même chronométrage. Les sportifs l\'utilisent pour mesurer leurs performances à l\'entraînement, les enseignants pour les tests en classe, et les professionnels pour le suivi du temps passé sur des tâches. L\'interface est optimisée pour une utilisation sur mobile comme sur desktop, avec des boutons larges et réactifs. Le chronomètre fonctionne même si vous changez d\'onglet. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Chronométrez autant que vous le souhaitez.' },
      { q: 'Quelle est la précision du chronomètre ?', a: 'Le chronomètre est précis au centième de seconde (10 ms). Les temps intermédiaires sont enregistrés avec la même précision.' },
      { q: 'Puis-je enregistrer des tours intermédiaires ?', a: 'Oui, le bouton Tour enregistre le temps écoulé depuis le dernier tour et affiche tous les temps intermédiaires.' },
      { q: 'Le chronomètre fonctionne-t-il en arrière-plan ?', a: 'Oui, le chronomètre continue de fonctionner même si vous changez d\'onglet ou minimisez le navigateur.' }
    ],
    howTo: ['Cliquez sur Démarrer pour lancer le chronomètre', 'Cliquez sur Tour pour enregistrer un temps intermédiaire', 'Cliquez sur Pause pour arrêter', 'Cliquez sur Réinitialiser pour recommencer'],
    relatedSlugs: ['timer-pomodoro', 'calculateur-age', 'convertisseur-unites'],
  },
  'timer-pomodoro': {
    toolId: 'pomodoro-timer', category: 'calculators', slug: 'timer-pomodoro',
    title: 'Timer Pomodoro en Ligne Gratuit — Technique Pomodoro',
    desc: 'Timer Pomodoro gratuit avec sessions de travail personnalisables, pauses courtes et longues. Améliorez votre productivité.',
    h1: 'Timer Pomodoro — Technique de productivité',
    intro: 'Boostez votre productivité avec la technique Pomodoro grâce à notre timer en ligne avec interface visuelle et paramètres entièrement personnalisables. La technique Pomodoro, inventée par Francesco Cirillo dans les années 1980, alternne des périodes de travail concentré (traditionnellement 25 minutes) avec des pauses courtes (5 minutes), et une pause longue tous les 4 cycles (15-30 minutes). Cette méthode simple mais puissante exploite la pression du temps pour maintenir la concentration et prévenir la procrastination. Notre timer vous guide à travers chaque phase avec des notifications sonores et visuelles, et affiche le nombre de Pomodoros complétés dans la session. Vous pouvez personnaliser la durée des sessions de travail, des pauses et du nombre de cycles avant la pause longue. Les étudiants l\'utilisent pour réviser efficacement, les développeurs pour coder en flux continu, et les freelances pour structurer leurs journées. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Qu\'est-ce que la technique Pomodoro ?', a: 'Travaillez 25 minutes en concentration totale, prenez une pause de 5 minutes, puis recommencez. Après 4 Pomodoros, prenez une pause longue de 15 à 30 minutes.' },
      { q: 'Puis-je modifier les durées ?', a: 'Oui, vous pouvez personnaliser la durée du travail (5-60 min), des pauses courtes (1-15 min), des pauses longues (5-30 min) et le nombre de Pomodoros avant la pause longue.' },
      { q: 'Le timer fonctionne-t-il en arrière-plan ?', a: 'Oui, le timer continue de fonctionner même si vous changez d\'onglet, avec des notifications sonores pour chaque transition.' }
    ],
    howTo: ['Configurez les durées de travail et de pause', 'Cliquez sur Démarrer pour commencer le Pomodoro', 'Travaillez jusqu\'à la fin de la session', 'Prenez la pause, le timer bascule automatiquement'],
    relatedSlugs: ['chronometre', 'calculateur-age', 'calculateur-pourcentage'],
  },
  'calculateur-tva': {
    toolId: 'vat-calculator', category: 'calculators', slug: 'calculateur-tva',
    title: 'Calculateur de TVA en Ligne Gratuit — HT, TTC, Taux de TVA',
    desc: 'Calculez instantanément le montant HT, TTC et la TVA à partir de n\'importe quel taux. Gratuit, sans inscription, 100% local.',
    h1: 'Calculateur de TVA : montant HT, TTC et taux',
    intro: 'Calculez facilement le montant hors taxes (HT), toutes taxes comprises (TTC) et le montant de la TVA. Sélectionnez un taux de TVA prédéfini (France 20%, 10%, 5,5%, 2,1%, Belgique 21%, Suisse 8,1%, Allemagne 19%, Espagne 21%, Royaume-Uni 20%) ou entrez un taux personnalisé pour n\'importe quel pays. Le calculateur fonctionne dans les deux sens : entrez un montant TTC pour retrouver le HT, ou un montant HT pour obtenir le TTC. Les professionnels utilisent cet outil pour vérifier leurs factures, les entrepreneurs pour calculer leurs prix de vente, et les consommateurs pour comprendre la part de TVA dans leurs achats. Les formules de calcul sont affichées pour référence : HT = TTC / (1 + taux) et TTC = HT × (1 + taux). Le calcul s\'effectue localement dans votre navigateur. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Comment calculer la TVA à partir du TTC ?', a: 'Pour retrouver le HT à partir du TTC : HT = TTC / (1 + taux/100). Par exemple, pour 120 € TTC avec une TVA à 20% : HT = 120 / 1,20 = 100 € et TVA = 20 €.' },
      { q: 'Comment calculer la TVA à partir du HT ?', a: 'TVA = HT × (taux/100) et TTC = HT + TVA. Par exemple, pour 100 € HT avec une TVA à 20% : TVA = 20 € et TTC = 120 €.' },
      { q: 'Quels sont les taux de TVA en France ?', a: 'France : 20% (taux normal), 10% (taux intermédiaire), 5,5% (taux réduit), 2,1% (taux particulier).' },
      { q: 'L\'outil fonctionne-t-il pour d\'autres pays ?', a: 'Oui, des taux prédéfinis sont disponibles pour la Belgique, la Suisse, l\'Allemagne, l\'Espagne et le Royaume-Uni. Vous pouvez aussi saisir n\'importe quel taux personnalisé.' }
    ],
    howTo: ['Choisissez le sens du calcul (TTC vers HT ou HT vers TTC)', 'Entrez le montant et sélectionnez le taux de TVA', 'Les résultats HT, TVA et TTC s\'affichent instantanément'],
    relatedSlugs: ['calculateur-pourcentage', 'convertisseur-unites', 'calculateur-frais-kilometriques'],
  },
  'calculateur-pourboire': {
    toolId: 'tip-calculator', category: 'calculators', slug: 'calculateur-pourboire',
    title: 'Calculateur de Pourboire en Ligne Gratuit — Répartition Addition',
    desc: 'Calculez le pourboire et répartissez l\'addition entre plusieurs personnes. Gratuit, sans inscription, 100% local.',
    h1: 'Calculer le pourboire et répartir l\'addition',
    intro: 'Vous êtes au restaurant avec des amis et vous voulez calculer le pourboire et diviser l\'addition équitablement ? Notre calculateur de pourboire vous permet de saisir le montant de l\'addition, de choisir un pourcentage de pourboire (15%, 18%, 20% ou personnalisé) et de répartir le total entre plusieurs personnes. L\'outil calcule instantanément le montant du pourboire, le total à payer et la part de chacun. Il est particulièrement utile dans les pays où le pourboire est une pratique courante, comme aux États-Unis (15-20%), au Canada (15-18%) ou au Maroc (5-10%), mais aussi en France où le service est souvent inclus mais un pourboire de 5-10% est apprécié pour un bon service. Le calculateur gère les arrondis intelligents pour éviter les centimes superflus lors de la répartition. Le calcul s\'effectue localement dans votre navigateur : aucune donnée n\'est envoyée à un serveur. Le service est gratuit et sans inscription.',
    faq: [
      { q: 'Combien de pourboire laisser au restaurant ?', a: 'En France, le pourboire n\'est pas obligatoire mais 5 à 10% est courant pour bon service. Aux États-Unis, 15 à 20% est la norme. Au Maroc, 5 à 10% est apprécié.' },
      { q: 'Comment répartir l\'addition entre plusieurs personnes ?', a: 'Entrez le montant total et le nombre de personnes. L\'outil calcule la part de chacun, incluant le pourboire.' },
      { q: 'Puis-je personnaliser le pourcentage de pourboire ?', a: 'Oui, en plus des pourcentages prédéfinis (15%, 18%, 20%), vous pouvez saisir n\'importe quel montant ou pourcentage personnalisé.' },
      { q: 'L\'outil fonctionne-t-il avec différentes devises ?', a: 'Oui, le calcul est indépendant de la devise. Entrez simplement le montant dans la devise de votre choix.' }
    ],
    howTo: ['Entrez le montant de l\'addition', 'Choisissez le pourcentage de pourboire', 'Indiquez le nombre de personnes', 'Le total par personne s\'affiche instantanément'],
    relatedSlugs: ['calculateur-pourcentage', 'calculateur-tva', 'calculateur-frais-kilometriques'],
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
