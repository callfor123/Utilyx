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
    desc: 'Compressez vos PDF gratuitement en ligne. Réduisez la taille de vos fichiers jusqu\'à 80% sans perte de qualité. Traitement 100% local, aucune inscription.',
    h1: 'Compresser un fichier PDF en ligne gratuitement',
    intro: 'Notre outil de compression PDF réduit instantanément la taille de vos documents sans perte de qualité visible. Compresseur PDF gratuit en ligne idéal pour réduire le poids de vos fichiers avant envoi par email, upload sur un site web ou stockage cloud. La compression PDF optimise les images intégrées, supprime les métadonnées inutiles et réorganise la structure du fichier pour un poids minimal. Vous pouvez choisir le niveau de compression selon vos besoins : compression légère pour une qualité maximale, ou compression forte pour un fichier le plus léger possible. Cet outil gratuit de réduction de taille PDF est particulièrement utile pour les professionnels qui envoient des contrats, factures et rapports par email, les étudiants qui soumettent des mémoires universitaires via des plateformes avec limite de taille, et les administrateurs qui optimisent l\'espace de stockage de leurs serveurs. Aucun fichier n\'est envoyé à un serveur externe : tout le traitement se déroule directement dans votre navigateur, garantissant une confidentialité totale de vos documents sensibles. Le compresseur PDF fonctionne sans inscription ni installation, sur ordinateur, tablette ou smartphone. Vous pouvez compresser autant de PDF que vous le souhaitez, sans limite quotidienne ni filigrane sur le résultat.',
    faq: [
      { q: 'Comment compresser un PDF gratuitement ?', a: 'Glissez-déposez votre fichier PDF dans l\'outil ci-dessus, choisissez le niveau de compression souhaité, puis téléchargez le résultat. Tout est gratuit et sans inscription. La compression s\'effectue localement dans votre navigateur.' },
      { q: 'Mes fichiers sont-ils en sécurité ?', a: 'Oui, 100%. Le traitement se fait entièrement dans votre navigateur web. Aucun fichier n\'est envoyé à nos serveurs ni stocké en ligne. Vos documents confidentiels restent sur votre appareil à tout moment.' },
      { q: 'Quelle est la taille maximale autorisée ?', a: 'Comme tout est traité en local dans votre navigateur, il n\'y a pas de limite stricte imposée par nos serveurs. La seule limitation est la mémoire disponible sur votre appareil. Les PDF de plusieurs dizaines de Mo sont traités sans problème.' },
      { q: 'Quelle réduction de taille puis-je espérer ?', a: 'La réduction dépend du contenu du PDF. Les documents riches en images peuvent être réduits de 50 à 80%. Les PDF principalement textuels offrent une réduction de 20 à 40%. Le mode compression forte maximise la réduction.' },
      { q: 'La qualité du PDF est-elle préservée après compression ?', a: 'En mode compression légère ou équilibrée, la perte de qualité est imperceptible à l\'œil nu. Le texte reste net et les images conservent leur clarté. Le mode compression forte réduit davantage la taille mais peut légèrement affecter les images haute résolution.' },
      { q: 'Puis-je compresser plusieurs PDF à la fois ?', a: 'Oui, vous pouvez compresser autant de fichiers PDF que vous le souhaitez, l\'un après l\'autre, sans aucune limite quotidienne ni inscription requise. Chaque fichier est traité individuellement.' }
    ],
    howTo: [
      'Glissez votre fichier PDF dans la zone de dépôt ou cliquez pour parcourir vos fichiers',
      'Choisissez le niveau de compression : légère, équilibrée ou forte',
      'Prévisualisez le résultat et vérifiez la réduction de taille obtenue',
      'Cliquez sur "Compresser" pour lancer le traitement dans votre navigateur',
      'Téléchargez le PDF compressé sur votre appareil'
    ],
    relatedSlugs: ['fusionner-pdf', 'proteger-pdf', 'deverrouiller-pdf'],
  },
  'fusionner-pdf': {
    toolId: 'pdf-merge', category: 'pdf', slug: 'fusionner-pdf',
    title: 'Fusionner PDF en Ligne Gratuit — Combiner Plusieurs PDF',
    desc: 'Fusionnez plusieurs PDF en un seul fichier gratuitement. Combinez vos documents en quelques secondes sans inscription, traitement 100% local.',
    h1: 'Fusionner plusieurs PDF en un seul fichier',
    intro: 'Combinez facilement 2 ou plusieurs documents PDF en un seul fichier unifié en quelques secondes. Fusionneur PDF gratuit en ligne qui vous permet de réorganiser l\'ordre des pages par simple glisser-déposer avant de fusionner, vous offrant un contrôle total sur le résultat final. Parfait pour assembler des factures, des rapports, des dossiers administratifs, des mémoires universitaires ou tout autre document multipage. La fusion de PDF est une opération courante pour les professionnels, les étudiants et les particuliers qui souhaitent regrouper plusieurs documents en un seul fichier facile à partager et à archiver. Imaginez pouvoir regrouper tous les chapitres d\'un mémoire, assembler les pages d\'un contrat signé, ou compiler plusieurs factures en un seul fichier PDF à envoyer à votre comptable. Aucune inscription n\'est requise et le service est entièrement gratuit. Le traitement s\'effectue 100% localement dans votre navigateur, ce qui signifie que vos documents ne sont jamais envoyés sur un serveur distant, garantissant ainsi une confidentialité totale de vos données. Le fusionneur PDF fonctionne sans installation sur ordinateur, tablette ou smartphone, sans limite quotidienne ni filigrane.',
    faq: [
      { q: 'Comment fusionner des PDF en ligne ?', a: 'Ajoutez vos fichiers PDF dans l\'outil, réorganisez-les dans l\'ordre souhaité, puis cliquez sur Fusionner. Vous obtiendrez un seul PDF combiné. Le tout est gratuit et sans inscription.' },
      { q: 'Combien de fichiers puis-je fusionner ?', a: 'Il n\'y a pas de limite au nombre de fichiers PDF que vous pouvez combiner. Fusionnez 2, 10 ou 50 documents en un seul fichier sans aucune restriction ni frais.' },
      { q: 'Puis-je réorganiser les pages avant de fusionner ?', a: 'Oui, vous pouvez réorganiser l\'ordre des fichiers PDF avant la fusion par simple glisser-déposer. L\'aperçu vous permet de vérifier l\'ordre avant de générer le document final.' },
      { q: 'La qualité sera-t-elle préservée ?', a: 'Absolument. La fusion ne modifie pas le contenu des PDF. Chaque page conserve sa qualité et ses propriétés d\'origine, y compris les images, les polices et les annotations.' },
      { q: 'Mes documents sont-ils sécurisés ?', a: 'Oui, le traitement est 100% local dans votre navigateur. Vos PDF ne sont jamais envoyés à un serveur ni stockés en ligne. La confidentialité de vos documents est garantie à tout moment.' },
      { q: 'Puis-je fusionner des PDF de tailles différentes ?', a: 'Oui, l\'outil accepte des PDF de toutes tailles et résolutions. Les pages de chaque document sont conservées telles quelles dans le fichier fusionné, sans redimensionnement ni compression.' }
    ],
    howTo: [
      'Ajoutez vos fichiers PDF en les glissant-déposant ou en parcourant vos dossiers',
      'Réorganisez l\'ordre des fichiers par glisser-déposer selon vos besoins',
      'Vérifiez l\'aperçu de la fusion avant de confirmer',
      'Cliquez sur "Fusionner" pour combiner tous les PDF en un seul',
      'Téléchargez le document PDF fusionné sur votre appareil'
    ],
    relatedSlugs: ['compresser-pdf', 'pdf-en-images', 'signer-pdf'],
  },
  'pdf-en-images': {
    toolId: 'pdf-convert', category: 'pdf', slug: 'pdf-en-images',
    title: 'Convertir PDF en Images JPG PNG en Ligne Gratuit',
    desc: 'Convertissez chaque page de votre PDF en image JPG ou PNG haute qualité. Outil gratuit en ligne, sans inscription, traitement 100% local.',
    h1: 'Convertir un PDF en images JPG ou PNG',
    intro: 'Transformez chaque page de vos documents PDF en images haute résolution (JPG ou PNG) en quelques secondes. Cet outil est particulièrement utile pour intégrer des pages PDF dans une présentation PowerPoint, les partager sur les réseaux sociaux, ou les éditer dans un logiciel de retouche photo comme Photoshop ou GIMP. Le format JPG produit des fichiers légers, idéaux pour le web et l\'email, tandis que le PNG offre une qualité maximale avec la possibilité de conserver la transparence. Les professionnels du marketing, les graphistes et les étudiants utilisent régulièrement la conversion PDF en images pour créer des visuels à partir de rapports, brochures ou catalogues. Tout le traitement s\'effectue localement dans votre navigateur : vos documents restent sur votre appareil et ne sont jamais transférés vers un serveur. Le service est entièrement gratuit et ne nécessite aucune inscription. Vous pouvez convertir autant de PDF que vous le souhaitez, sans filigrane ni limitation de qualité. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
    faq: [
      { q: 'En quel format seront mes images ?', a: 'Vous pouvez choisir entre JPG (léger, idéal pour le web) et PNG (qualité maximale, transparence possible).' },
      { q: 'La qualité est-elle bonne ?', a: 'Oui, les images sont générées en haute résolution directement dans votre navigateur, sans perte de qualité.' },
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, l\'outil est 100% gratuit et ne nécessite aucune inscription. Vous pouvez convertir autant de fichiers que vous le souhaitez.' },
      { q: 'Puis-je extraire le texte des images générées ?', a: 'Oui, vous pouvez utiliser notre outil OCR "Extraire le texte d\'une image" pour convertir le contenu textuel de vos images en texte sélectionnable et modifiable.' }
    ],
    howTo: [
      'Chargez votre fichier PDF en le glissant-déposant ou en parcourant vos dossiers',
      'Choisissez le format de sortie : JPG pour un fichier léger ou PNG pour une qualité maximale',
      'Ajustez la résolution de sortie selon vos besoins (72 dpi pour le web, 300 dpi pour l\'impression)',
      'Prévisualisez les pages converties avant de télécharger',
      'Téléchargez les images générées individuellement ou en lot'
    ],
    relatedSlugs: ['compresser-pdf', 'fusionner-pdf', 'convertir-image'],
  },
  'signer-pdf': {
    toolId: 'pdf-sign', category: 'pdf', slug: 'signer-pdf',
    title: 'Signer PDF en Ligne Gratuit — Signature Électronique',
    desc: 'Signez vos PDF en ligne gratuitement. Signature électronique dessinée ou tapée, sans inscription, traitement 100% local dans le navigateur.',
    h1: 'Signer un document PDF en ligne',
    intro: 'Ajoutez votre signature manuscrite ou tapée à n\'importe quel document PDF sans imprimer ni scanner. Signeur PDF gratuit en ligne qui vous permet de dessiner votre signature directement à l\'écran, de la taper dans une police calligraphiée, ou de l\'importer depuis une image. Vous pouvez ensuite la positionner et la redimensionner précisément sur le document. Idéal pour les contrats de travail, les bons de commande, les formulaires administratifs, les accords de confidentialité et tout document nécessitant une signature. Cet outil élimine le cycle fastidieux d\'impression, signature et numérisation, vous faisant gagner un temps précieux. Le processus est 100% local : votre document reste sur votre appareil et n\'est jamais envoyé à un serveur. Le service est entièrement gratuit et sans inscription. Notez que notre outil crée une signature simple. Pour une valeur juridique renforcée conformément au règlement eIDAS, consultez un service de signature électronique certifié. Le signeur PDF fonctionne sans installation sur ordinateur, tablette ou smartphone, sans limite quotidienne ni filigrane.',
    faq: [
      { q: 'Ma signature est-elle juridiquement valide ?', a: 'Notre outil crée une signature simple, idéale pour un usage courant. Pour une valeur juridique renforcée conforme au règlement eIDAS, consultez un service de signature électronique certifié avec horodatage et certificat.' },
      { q: 'Comment ajouter ma signature ?', a: 'Chargez votre PDF, dessinez ou tapez votre signature à l\'écran, positionnez-la sur le document en la glissant, puis téléchargez le fichier signé. Tout se fait en quelques clics sans installation.' },
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, l\'outil est 100% gratuit et sans inscription. Vos documents restent sur votre appareil et ne sont jamais envoyés à un serveur. Aucune limite d\'utilisation quotidienne.' },
      { q: 'Puis-je importer une image de signature ?', a: 'Oui, vous pouvez importer une image de votre signature préalablement numérisée et la positionner sur le document. L\'outil accepte les formats JPG, PNG et SVG.' },
      { q: 'Puis-je redimensionner ma signature ?', a: 'Oui, après avoir placé votre signature sur le document, vous pouvez la redimensionner en tirant les coins pour l\'adapter parfaitement à l\'espace de signature prévu.' }
    ],
    howTo: [
      'Chargez votre document PDF dans l\'outil',
      'Choisissez le type de signature : dessiner, taper ou importer une image',
      'Dessinez ou tapez votre signature dans la zone prévue',
      'Positionnez la signature sur le document et redimensionnez-la si nécessaire',
      'Téléchargez le PDF signé sur votre appareil'
    ],
    relatedSlugs: ['compresser-pdf', 'proteger-pdf', 'fusionner-pdf'],
  },
  'deverrouiller-pdf': {
    toolId: 'pdf-unlock', category: 'pdf', slug: 'deverrouiller-pdf',
    title: 'Déverrouiller PDF en Ligne Gratuit — Retirer Mot de Passe',
    desc: 'Retirez le mot de passe de protection de vos fichiers PDF facilement. Outil gratuit en ligne, sans inscription, 100% local dans le navigateur.',
    h1: 'Déverrouiller un PDF protégé par mot de passe',
    intro: 'Vous avez un PDF protégé dont vous connaissez le mot de passe mais que vous devez ouvrir fréquemment ? Notre outil vous permet de retirer la protection par mot de passe en un seul clic, afin de pouvoir ouvrir et partager votre document librement sans avoir à saisir le mot de passe à chaque fois. C\'est particulièrement utile pour les relevés bancaires protégés, les contrats sécurisés ou tout document dont vous souhaitez supprimer la contrainte du mot de passe tout en conservant le contenu intact. Le processus est simple : chargez votre PDF protégé, saisissez le mot de passe, et téléchargez le fichier déverrouillé. Tout se passe dans votre navigateur : aucune donnée n\'est envoyée à un serveur, garantissant une confidentialité totale. L\'outil est entièrement gratuit et ne nécessite aucune inscription. Attention : vous devez connaître le mot de passe pour déverrouiller le fichier. Notre outil ne crack pas les mots de passe. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
    faq: [
      { q: 'Puis-je déverrouiller un PDF sans le mot de passe ?', a: 'Non, vous devez connaître le mot de passe. Notre outil retire la protection mais ne crack pas les mots de passe.' },
      { q: 'Est-ce gratuit et sécurisé ?', a: 'Oui, 100% gratuit et sans inscription. Le traitement se fait localement dans votre navigateur, vos fichiers ne quittent jamais votre appareil.' },
      { q: 'Le contenu du PDF est-il modifié ?', a: 'Non, le contenu reste exactement identique. Seule la protection par mot de passe est retirée.' },
      { q: 'Combien de PDF puis-je déverrouiller ?', a: 'Il n\'y a aucune limite. Vous pouvez déverrouiller autant de fichiers que vous le souhaitez, gratuitement.' }
    ],
    howTo: [
      'Chargez votre fichier PDF protégé par mot de passe',
      'Saisissez le mot de passe du document pour le déverrouiller',
      'Vérifiez que le contenu est accessible et complet',
      'Téléchargez le PDF déverrouillé sans mot de passe sur votre appareil'
    ],
    relatedSlugs: ['proteger-pdf', 'compresser-pdf', 'fusionner-pdf'],
  },
  'proteger-pdf': {
    toolId: 'pdf-protect', category: 'pdf', slug: 'proteger-pdf',
    title: 'Protéger PDF en Ligne Gratuit — Ajouter Mot de Passe',
    desc: 'Ajoutez un mot de passe à vos fichiers PDF pour les sécuriser. Chiffrement AES, gratuit, sans inscription, 100% local.',
    h1: 'Protéger un PDF avec un mot de passe',
    intro: 'Sécurisez vos documents PDF en leur ajoutant une protection par mot de passe. Seules les personnes connaissant le mot de passe pourront ouvrir et lire votre fichier, ce qui est essentiel pour les documents confidentiels comme les contrats, les relevés bancaires, les dossiers médicaux ou les données personnelles. Notre outil vous permet de choisir un mot de passe robuste et de l\'appliquer instantanément à votre PDF. Le chiffrement AES-128 ou AES-256 est utilisé pour garantir une protection solide. Le processus est entièrement local : votre document et votre mot de passe restent sur votre appareil et ne sont jamais transmis à un serveur. Le service est gratuit et ne nécessite aucune inscription. Vous pouvez protéger autant de PDF que vous le souhaitez. Pour une sécurité optimale, choisissez un mot de passe d\'au moins 8 caractères combinant majuscules, minuscules, chiffres et symboles. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
    faq: [
      { q: 'Quel niveau de protection cet outil offre-t-il ?', a: 'Votre PDF sera chiffré avec AES-128 ou AES-256 et nécessitera un mot de passe pour être ouvert. Utilisez un mot de passe fort pour une sécurité maximale.' },
      { q: 'Est-ce gratuit et sécurisé ?', a: 'Oui, 100% gratuit sans inscription. Le traitement est entièrement local : votre document et votre mot de passe ne quittent jamais votre appareil.' },
      { q: 'Puis-je protéger plusieurs PDF à la fois ?', a: 'Oui, vous pouvez protéger autant de PDF que vous le souhaitez, sans limite ni inscription.' },
      { q: 'Que se passe-t-il si j\'oublie le mot de passe ?', a: 'Il n\'existe aucun moyen de récupérer le mot de passe. Conservez-le soigneusement, car sans lui le PDF sera inaccessible.' }
    ],
    howTo: [
      'Chargez votre document PDF dans l\'outil',
      'Choisissez un mot de passe robuste (au moins 8 caractères, combinant majuscules, minuscules, chiffres et symboles)',
      'Confirmez le mot de passe pour éviter les erreurs de saisie',
      'Téléchargez le PDF protégé sur votre appareil'
    ],
    relatedSlugs: ['deverrouiller-pdf', 'compresser-pdf', 'signer-pdf'],
  },
  'convertir-image': {
    toolId: 'img-convert', category: 'image', slug: 'convertir-image',
    title: 'Convertisseur d\'Images en Ligne Gratuit — WebP, AVIF, JPG, PNG',
    desc: 'Convertisseur d\'images gratuit en ligne : WebP, AVIF, JPG, PNG et plus. Sans inscription, traitement 100% local dans le navigateur.',
    h1: 'Convertir des images en WebP, AVIF, JPG, PNG',
    intro: 'Convertissez vos images entre tous les formats populaires : WebP, AVIF, JPG, PNG, GIF, BMP et TIFF. Le WebP et l\'AVIF sont les formats modernes qui offrent une compression nettement supérieure au JPG classique, réduisant le poids de vos images de 30 à 50% sans perte de qualité visible. Idéal pour accélérer le chargement de vos sites web et améliorer votre référencement SEO. Les développeurs web, graphistes et blogueurs utilisent quotidiennement la conversion d\'images pour optimiser les visuels de leurs projets. Vous pouvez convertir une ou plusieurs images en un clic, choisir la qualité de sortie et télécharger les résultats. Tout le traitement s\'effectue localement dans votre navigateur : vos images restent sur votre appareil et ne sont jamais envoyées à un serveur. Le service est entièrement gratuit et sans inscription. Le convertisseur d\'images fonctionne sans installation sur ordinateur, tablette ou smartphone, sans limite quotidienne ni filigrane.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Vous pouvez convertir autant d\'images que vous le souhaitez, sans filigrane ni limitation de qualité sur le résultat.' },
      { q: 'Pourquoi convertir en WebP ou AVIF ?', a: 'Le WebP et l\'AVIF offrent une compression bien supérieure au JPG, réduisant le poids des images de 30 à 50% sans perte visible. Cela accélère le chargement de vos pages web et améliore votre SEO.' },
      { q: 'Mes images sont-elles sécurisées ?', a: 'Oui, tout le traitement se fait dans votre navigateur. Vos images ne sont jamais envoyées à un serveur ni stockées en ligne. La confidentialité de vos fichiers est garantie.' },
      { q: 'Quels formats sont supportés en entrée ?', a: 'JPG, PNG, WebP, GIF, BMP, TIFF, AVIF et SVG. Vous pouvez convertir n\'importe quel format d\'image courant vers n\'importe quel format de sortie disponible.' },
      { q: 'Puis-je convertir plusieurs images à la fois ?', a: 'Oui, vous pouvez sélectionner plusieurs images simultanément pour une conversion par lot. Toutes les images seront converties dans le format de sortie choisi en une seule opération.' }
    ],
    howTo: [
      'Chargez votre image en la glissant-déposant ou en parcourant vos dossiers',
      'Choisissez le format de sortie souhaité (WebP, AVIF, JPG, PNG, GIF)',
      'Ajustez la qualité de sortie si nécessaire avec le curseur',
      'Prévisualisez le résultat et vérifiez la taille du fichier',
      'Téléchargez l\'image convertie sur votre appareil'
    ],
    relatedSlugs: ['compresser-image', 'redimensionner-image', 'pdf-en-images'],
  },
  'compresser-image': {
    toolId: 'img-compress', category: 'image', slug: 'compresser-image',
    title: 'Compresser Image en Ligne Gratuit — Optimiser le Poids',
    desc: 'Compressez vos images JPG, PNG, WebP gratuitement. Réduisez le poids sans perte de qualité visible. Sans inscription, 100% local.',
    h1: 'Compresser une image en ligne gratuitement',
    intro: 'Réduisez instantanément le poids de vos images sans dégradation visible de la qualité. Compresseur d\'images gratuit en ligne qui optimise vos fichiers JPG, PNG et WebP en ajustant le niveau de compression selon vos besoins. Une image compressée charge plus rapidement sur un site web, consomme moins de bande passante et améliore l\'expérience utilisateur et le référencement SEO. Les développeurs web, les blogueurs et les professionnels du marketing ont tout intérêt à compresser leurs images avant de les publier en ligne. Google recommande d\'ailleurs l\'optimisation des images comme critère de performance. Vous pouvez choisir entre une compression légère, équilibrée ou forte, et comparer le résultat avec l\'original avant de télécharger. Le traitement est entièrement local dans votre navigateur : vos images ne sont jamais envoyées à un serveur. Le service est gratuit et sans inscription. Le compresseur d\'images fonctionne sans installation sur ordinateur, tablette ou smartphone, sans limite quotidienne ni filigrane.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, l\'outil est 100% gratuit et sans inscription. Vous pouvez compresser autant d\'images que vous le souhaitez, sans filigrane ni limite quotidienne.' },
      { q: 'La qualité sera-t-elle préservée ?', a: 'Vous choisissez le niveau de compression. En mode léger ou équilibré, la perte de qualité est imperceptible. Vous pouvez prévisualiser le résultat avant de télécharger pour comparer avec l\'original.' },
      { q: 'Quels formats sont supportés ?', a: 'JPG, PNG, WebP, GIF, BMP et AVIF. La compression est optimisée pour chaque format avec des algorithmes spécifiques adaptés au type d\'image.' },
      { q: 'Comment ça marche techniquement ?', a: 'L\'outil ajuste les paramètres de compression (qualité JPEG, palette PNG, etc.) directement dans votre navigateur en utilisant les API Canvas et les codecs natifs de votre appareil.' },
      { q: 'Quelle réduction de taille puis-je espérer ?', a: 'En compression légère, 20 à 40% de réduction. En compression équilibrée, 40 à 60%. En compression forte, 60 à 80%. Les résultats varient selon le contenu de l\'image.' }
    ],
    howTo: [
      'Chargez votre image en la glissant-déposant ou en cliquant pour parcourir',
      'Choisissez le niveau de compression : légère, équilibrée ou forte',
      'Prévisualisez le résultat et comparez avec l\'original',
      'Ajustez les paramètres si le résultat ne vous convient pas',
      'Téléchargez l\'image compressée sur votre appareil'
    ],
    relatedSlugs: ['convertir-image', 'redimensionner-image', 'supprimer-arriere-plan'],
  },
  'redimensionner-image': {
    toolId: 'img-resize', category: 'image', slug: 'redimensionner-image',
    title: 'Redimensionner Image en Ligne Gratuit — Changer Taille Image',
    desc: 'Redimensionnez vos images JPG, PNG, WebP gratuitement en ligne. Par pourcentage ou dimensions exactes, sans inscription, 100% local.',
    h1: 'Redimensionner une image en ligne gratuitement',
    intro: 'Modifiez les dimensions de vos images en quelques clics, que ce soit pour les adapter à un site web, un profil social, une impression ou un email. Redimensionneur d\'images gratuit en ligne qui vous permet de redimensionner par pourcentage, par largeur ou hauteur fixe, ou en spécifiant les dimensions exactes souhaitées. Vous pouvez choisir de conserver les proportions ou de forcer de nouvelles dimensions. Les développeurs web redimensionnent fréquemment leurs images pour les adapter aux résolutions d\'écran et aux grilles CSS, tandis que les photographes ajustent les dimensions pour l\'impression. Le traitement s\'effectue entièrement dans votre navigateur : vos images restent sur votre appareil et ne sont jamais envoyées à un serveur. Le service est gratuit et sans inscription. Le redimensionneur fonctionne sans installation sur ordinateur, tablette ou smartphone, sans limite quotidienne.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Aucune limite sur le nombre d\'images à redimensionner. Aucun filigrane n\'est ajouté sur le résultat.' },
      { q: 'Puis-je conserver les proportions ?', a: 'Oui, par défaut l\'outil conserve les proportions (aspect ratio). Décochez l\'option si vous souhaitez forcer des dimensions spécifiques sans respecter le ratio d\'origine.' },
      { q: 'Quels formats sont supportés ?', a: 'JPG, PNG, WebP, GIF, BMP et la plupart des formats d\'image courants. Le format de sortie est identique au format d\'entrée.' },
      { q: 'Puis-je redimensionner par pourcentage ?', a: 'Oui, vous pouvez réduire ou agrandir votre image en saisissant un pourcentage (ex: 50% pour diviser les dimensions par deux, 200% pour les doubler).' },
      { q: 'La qualité est-elle préservée après redimensionnement ?', a: 'Pour les réductions de taille, la qualité est excellente. Pour les agrandissements au-delà de 200%, une légère perte de netteté peut apparaître. L\'outil utilise un algorithme de rééchantillonnage bicubique de haute qualité.' }
    ],
    howTo: [
      'Chargez votre image en la glissant-déposant ou en parcourant vos dossiers',
      'Entrez les nouvelles dimensions en pixels ou le pourcentage souhaité',
      'Choisissez de conserver ou non les proportions (aspect ratio)',
      'Prévisualisez le résultat avant de confirmer',
      'Téléchargez l\'image redimensionnée sur votre appareil'
    ],
    relatedSlugs: ['compresser-image', 'convertir-image', 'supprimer-arriere-plan'],
  },
  'supprimer-arriere-plan': {
    toolId: 'img-bgremove', category: 'image', slug: 'supprimer-arriere-plan',
    title: 'Supprimer Arrière-Plan Image en Ligne Gratuit — Détourage Auto',
    desc: 'Supprimez l\'arrière-plan de vos images gratuitement. Détourage IA automatique, sans inscription, traitement 100% local.',
    h1: 'Supprimer l\'arrière-plan d\'une image',
    intro: 'Éliminez automatiquement l\'arrière-plan de vos images en un clic grâce à notre technologie de détourage intelligent. Suppresseur d\'arrière-plan gratuit en ligne, plus besoin de tracer manuellement des contours complexes dans Photoshop : notre algorithme détecte le sujet principal et supprime le fond avec précision. Cet outil est indispensable pour créer des visuels e-commerce, des portraits professionnels, des logos transparents ou des montages photo. Les vendeurs en ligne l\'utilisent pour présenter leurs produits sur un fond blanc uniforme, tandis que les designers s\'en servent pour isoler des éléments graphiques. Le résultat est téléchargeable en PNG avec transparence ou en JPG avec fond blanc. Tout le traitement s\'effectue localement dans votre navigateur grâce à l\'intelligence artificielle intégrée : vos images ne sont jamais envoyées à un serveur. Le service est gratuit et sans inscription. Le suppresseur d\'arrière-plan fonctionne sans installation, sans limite quotidienne ni filigrane.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Vous pouvez supprimer l\'arrière-plan d\'autant d\'images que vous le souhaitez, sans filigrane ni limite quotidienne.' },
      { q: 'Comment fonctionne le détourage automatique ?', a: 'Un algorithme d\'intelligence artificielle s\'exécutant dans votre navigateur détecte le sujet principal de l\'image et sépare l\'arrière-plan automatiquement, sans envoi de données vers un serveur.' },
      { q: 'Dans quel format télécharger le résultat ?', a: 'Vous pouvez télécharger en PNG (avec transparence) pour les montages et designs, ou en JPG (avec fond blanc) pour les visuels e-commerce et les photos produit.' },
      { q: 'La qualité du détourage est-elle bonne ?', a: 'L\'algorithme offre d\'excellents résultats sur les portraits, produits et objets bien détachés du fond. Pour les images complexes, vous pouvez affiner le résultat manuellement avec l\'outil d\'édition intégré.' },
      { q: 'Quels types d\'images fonctionnent le mieux ?', a: 'Les images avec un sujet clair sur un fond contrasté donnent les meilleurs résultats : photos produit sur fond uni, portraits, logos. Les fonds uniformes sont détectés plus facilement que les fonds complexes.' }
    ],
    howTo: [
      'Chargez votre image en la glissant-déposant ou en parcourant vos dossiers',
      'L\'algorithme IA détecte et supprime l\'arrière-plan automatiquement',
      'Vérifiez le résultat et ajustez les zones si nécessaire',
      'Choisissez le format de sortie : PNG avec transparence ou JPG avec fond blanc',
      'Téléchargez l\'image sans arrière-plan sur votre appareil'
    ],
    relatedSlugs: ['compresser-image', 'convertir-image', 'redimensionner-image'],
  },
  'heic-vers-jpg': {
    toolId: 'heic-to-jpg', category: 'image', slug: 'heic-vers-jpg',
    title: 'Convertir HEIC en JPG en Ligne Gratuit — Photos iPhone',
    desc: 'Convertissez vos photos iPhone HEIC en JPG ou PNG. Compatible tous appareils, gratuit, sans inscription, 100% local.',
    h1: 'Convertir des photos HEIC en JPG ou PNG',
    intro: 'Transformez vos photos iPhone au format HEIC en fichiers JPG ou PNG universellement compatibles. Convertisseur HEIC gratuit en ligne pour le format HEIC (High Efficiency Image Container) utilisé par défaut sur les iPhones depuis iOS 11, que de nombreux logiciels, sites web et appareils ne prennent pas en charge. Notre convertisseur vous permet de retrouver une compatibilité totale en transformant vos photos HEIC en JPG (idéal pour le partage) ou en PNG (idéal pour la qualité maximale avec transparence). Vous pouvez convertir une ou plusieurs photos à la fois, ce qui est particulièrement utile après un transfert de photos depuis un iPhone vers un PC Windows ou un appareil Android. Le traitement s\'effectue entièrement dans votre navigateur : vos photos restent sur votre appareil et ne sont jamais envoyées à un serveur. Le service est gratuit et sans inscription. Le convertisseur HEIC fonctionne sans installation, sans limite quotidienne ni filigrane.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Convertissez autant de photos HEIC que vous le souhaitez, sans filigrane ni limite quotidienne sur le résultat.' },
      { q: 'Pourquoi convertir HEIC en JPG ?', a: 'Le format HEIC n\'est pas universellement supporté. Le JPG est compatible avec tous les logiciels, sites web et appareils, ce qui facilite le partage sur les réseaux sociaux et l\'édition photo.' },
      { q: 'La qualité est-elle conservée ?', a: 'Oui, la conversion préserve la qualité d\'origine de votre photo. Vous pouvez choisir le niveau de qualité JPG selon vos besoins, de 80% (partage web) à 100% (qualité maximale).' },
      { q: 'Puis-je convertir plusieurs photos à la fois ?', a: 'Oui, vous pouvez sélectionner plusieurs photos HEIC simultanément pour une conversion par lot. Toutes les photos seront converties en une seule opération.' },
      { q: 'Quelle est la différence entre JPG et PNG ?', a: 'Le JPG offre une bonne qualité avec un fichier léger, idéal pour le partage et le web. Le PNG offre une qualité maximale avec transparence possible, mais produit un fichier plus volumineux.' }
    ],
    howTo: [
      'Chargez vos photos HEIC en les glissant-déposant ou en les sélectionnant',
      'Choisissez le format de sortie : JPG pour la compatibilité ou PNG pour la qualité',
      'Ajustez la qualité de sortie si nécessaire',
      'Prévisualisez le résultat de la conversion',
      'Téléchargez les photos converties individuellement ou en lot'
    ],
    relatedSlugs: ['convertir-image', 'compresser-image', 'redimensionner-image'],
  },
  'ocr-image': {
    toolId: 'img-ocr', category: 'image', slug: 'ocr-image',
    title: 'OCR Image en Ligne Gratuit — Extraire Texte d\'Image',
    desc: 'Extraire du texte depuis des images JPG, PNG, WebP. Reconnaissance optique de caractères gratuite, sans inscription, 100% locale.',
    h1: 'Extraire du texte d\'une image avec OCR',
    intro: 'Transformez instantanément vos images contenant du texte en texte sélectionnable et modifiable. Notre outil d\'OCR (Optical Character Recognition) vous permet d\'extraire du texte depuis des captures d\'écran, des scans de documents, des photos de livres ou tout autre image contenant du texte. L\'OCR est particulièrement utile pour numériser des documents papier, extraire du texte de PDF scannés, récupérer des informations de factures ou reçus, ou transcrire des pancartes et enseignes. L\'outil supporte de nombreuses langues dont le français, l\'anglais, l\'espagnol, l\'allemand, l\'italien et plus de 100 autres langues. Le traitement s\'effectue entièrement dans votre navigateur : vos images ne sont jamais envoyées à un serveur, garantissant une confidentialité totale de vos documents. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Extrayez du texte d\'autant d\'images que vous le souhaitez, sans filigrane ni limite quotidienne.' },
      { q: 'Quels types d\'images fonctionnent le mieux ?', a: 'Les images avec du texte clair, net et bien contrasté donnent les meilleurs résultats. Les scans de documents, captures d\'écran et photos de textes imprimés fonctionnent très bien. Les images floues, sombres ou avec peu de contraste peuvent donner des résultats moins précis.' },
      { q: 'Quelles langues sont supportées ?', a: 'Plus de 100 langues sont supportées, dont le français, anglais, espagnol, allemand, italien, portugais, russe, chinois, japonais et bien d\'autres. Vous pouvez sélectionner la langue appropriée pour améliorer la précision.' },
      { q: 'La confidentialité de mes documents est-elle garantie ?', a: 'Oui, absolument. Le traitement s\'effectue entièrement dans votre navigateur. Vos images ne quittent jamais votre appareil et ne sont jamais envoyées à un serveur distant.' },
      { q: 'Puis-je corriger le texte extrait ?', a: 'Oui, le texte extrait est entièrement modifiable. Vous pouvez le copier-coller dans un traitement de texte pour le corriger et le formater selon vos besoins.' }
    ],
    howTo: [
      'Chargez votre image en la glissant-déposant ou en parcourant vos fichiers',
      'Sélectionnez la langue du texte dans l\'image si elle est connue',
      'Cliquez sur "Extraire le texte" pour démarrer l\'OCR',
      'Attendez que le traitement se termine (quelques secondes)',
      'Corrigez le texte extrait si nécessaire et copiez-le'
    ],
    relatedSlugs: ['convertir-image', 'compresser-image', 'redimensionner-image'],
  },
  'generateur-favicon': {
    toolId: 'favicon-generator', category: 'image', slug: 'generateur-favicon',
    title: 'Générateur de Favicon en Ligne Gratuit — Icônes Site Web',
    desc: 'Générez favicons et icônes site web depuis votre image. Pack complet ICO, Apple, Android, PWA. Gratuit, sans inscription, 100% local.',
    h1: 'Générer un favicon pour votre site web',
    intro: 'Créez toutes les tailles de favicon et d\'icônes nécessaires pour votre site web à partir d\'une seule image source. Notre générateur produit automatiquement les fichiers favicon.ico, Apple Touch Icon, Android Chrome et les icônes PWA dans toutes les résolutions requises (16x16, 32x32, 48x48, 64x64, 180x180, 192x192, 512x512 pixels). Un favicon professionnel renforce l\'identité visuelle de votre site, améliore la reconnaissance dans les onglets du navigateur et les favoris, et constitue un critère de qualité pour le référencement SEO. Les développeurs web et les designers utilisent cet outil pour générer en un clic l\'ensemble complet d\'icônes nécessaire au support multi-plateforme. Le code HTML à insérer dans votre balise head est automatiquement généré. Le traitement est entièrement local dans votre navigateur : votre image ne quitte jamais votre appareil. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
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
    title: 'Télécharger Miniature YouTube HD Gratuit',
    desc: 'Téléchargez les miniatures HD de vidéos YouTube en un clic. Résolution max 1280x720. Gratuit, sans inscription, 100% en ligne.',
    h1: 'Télécharger la miniature d\'une vidéo YouTube',
    intro: 'Récupérez la miniature (thumbnail) de n\'importe quelle vidéo YouTube en haute résolution (1280x720 pixels) en collant simplement son URL. Les miniatures YouTube sont des visuels puissants utilisés par les créateurs de contenu, les marketeurs et les designers pour des présentations, des articles de blog, des montages vidéo ou des analyses de contenu. Notre outil récupère instantanément la miniature officielle dans la meilleure résolution disponible, sans nécessiter de connexion YouTube ni de logiciel tiers. Vous pouvez télécharger la miniature en JPG directement sur votre appareil. Cet outil est particulièrement utile pour les agences de marketing qui analysent les stratégies visuelles des chaînes populaires, ou pour les créateurs qui souhaitent s\'inspirer des miniatures performantes pour améliorer leur propre taux de clic. Les blogueurs et journalistes utilisent aussi ces miniatures pour illustrer leurs articles lorsqu\'ils mentionnent des vidéos YouTube. Le service est gratuit et sans inscription. Cet outil en ligne ne nécessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est conçue pour être intuitive et accessible à tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir à créer de compte. Chaque fonctionnalité est optimisée pour offrir le meilleur résultat possible en un minimum de clics, vous permettant de gagner du temps sur vos tâches quotidiennes.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Téléchargez autant de miniatures que vous le souhaitez, sans aucune limite quotidienne ni filigrane sur le résultat.' },
      { q: 'Quelle résolution puis-je obtenir ?', a: 'La résolution maximale est de 1280x720 pixels (HD), soit la meilleure qualité disponible pour les miniatures YouTube. Certaines vidéos plus anciennes peuvent proposer du 640x480.' },
      { q: 'Puis-je télécharger la miniature de n\'importe quelle vidéo ?', a: 'Oui, tant que la vidéo est publique sur YouTube. Collez l\'URL de la vidéo et la miniature sera récupérée instantanément. Les vidéos privées ou non répertoriées ne sont pas accessibles.' },
      { q: 'Puis-je utiliser la miniature pour mon propre contenu ?', a: 'La miniature appartient au créateur de la vidéo. Vous pouvez l\'utiliser à des fins personnelles ou d\'analyse. Pour une utilisation commerciale ou publique, demandez l\'autorisation du créateur.' },
      { q: 'Quel format de fichier est téléchargé ?', a: 'La miniature est téléchargée au format JPG, le format standard utilisé par YouTube pour ses miniatures. Ce format est compatible avec tous les logiciels d\'édition et de retouche photo.' },
      { q: 'Comment trouver l\'URL d\'une vidéo YouTube ?', a: 'Allez sur la vidéo YouTube, cliquez sur Partager puis copiez le lien. Vous pouvez aussi copier l\'URL directement depuis la barre d\'adresse de votre navigateur.' }
    ],
    howTo: [
      'Allez sur la vidéo YouTube et copiez son URL depuis la barre d\'adresse',
      'Collez l\'URL dans le champ prévu de notre outil',
      'Cliquez sur le bouton pour récupérer la miniature',
      'Prévisualisez la miniature avant de la télécharger',
      'Téléchargez la miniature en HD sur votre appareil'
    ],
    relatedSlugs: ['convertir-image', 'generateur-favicon', 'compresser-image'],
  },
  'decouper-video': {
    toolId: 'video-trim', category: 'video', slug: 'decouper-video',
    title: 'Découper Vidéo en Ligne Gratuit — Couper Vidéo',
    desc: 'Coupez et découpez vos vidéos en quelques secondes. Sans réencodage, gratuit, sans inscription, traitement 100% local.',
    h1: 'Découper une vidéo en ligne gratuitement',
    intro: 'Coupez et extrayez les portions souhaitées de vos vidéos en quelques clics, sans installer de logiciel lourd. Notre outil de découpage vidéo vous permet de définir précisément le début et la fin de la séquence à conserver, avec une prévisualisation en temps réel pour ajuster vos points de coupe au milliseconde près. Idéal pour supprimer les intros inutiles, couper les silences en début ou fin de vidéo, isoler les moments forts d\'un enregistrement ou préparer des clips pour les réseaux sociaux. Les créateurs de contenu, les formateurs et les professionnels du marketing vidéo utilisent quotidiennement le découpage pour optimiser leurs vidéos avant publication. Le traitement s\'effectue entièrement dans votre navigateur grâce à FFmpeg WebAssembly : vos fichiers vidéo ne sont jamais envoyés à un serveur. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Aucune limite sur le nombre de vidéos à découper.' },
      { q: 'Comment fonctionne le découpage vidéo ?', a: 'Chargez votre vidéo, définissez les points de début et de fin de la séquence à conserver en utilisant le lecteur vidéo ou les champs numériques, puis cliquez sur Découper. Le traitement s\'effectue localement dans votre navigateur.' },
      { q: 'Quels formats vidéo sont supportés ?', a: 'MP4, WebM, AVI, MOV, MKV et la plupart des formats courants. La vidéo de sortie est au format MP4.' },
      { q: 'Puis-je découper plusieurs segments d\'une même vidéo ?', a: 'Oui, vous pouvez découper plusieurs segments en effectuant plusieurs opérations de découpage successives sur la même vidéo.' },
      { q: 'La qualité vidéo est-elle préservée après le découpage ?', a: 'Oui, le découpage supprime uniquement les segments indésirables sans réencodage. La qualité vidéo de la séquence conservée est identique à l\'originale.' }
    ],
    howTo: ['Chargez votre vidéo', 'Définissez les points de début et de fin', 'Prévisualisez la sélection', 'Cliquez sur Découper et téléchargez'],
    relatedSlugs: ['compresser-video', 'convertir-video', 'video-en-gif'],
  },
  'compresser-video': {
    toolId: 'video-compress', category: 'video', slug: 'compresser-video',
    title: 'Compresser Vidéo en Ligne Gratuit — Réduire Taille Vidéo',
    desc: 'Réduisez la taille de vos vidéos sans perte de qualité visible. Multi-niveaux de compression, gratuit, sans inscription, 100% local.',
    h1: 'Compresser une vidéo en ligne gratuitement',
    intro: 'Réduisez significativement le poids de vos fichiers vidéo tout en conservant une qualité visuelle optimale. Notre outil de compression vidéo ajuste automatiquement le bitrate et la résolution pour obtenir le meilleur rapport qualité/poids. Une vidéo compressée se charge plus rapidement sur les sites web, consomme moins de bande passante et se partage plus facilement par email ou messagerie. Les créateurs de contenu compressent leurs vidéos avant de les uploader sur YouTube, TikTok ou Instagram pour réduire les temps de traitement. Les professionnels du marketing vidéo optimisent leurs publicités pour un chargement rapide sur mobile. Vous pouvez choisir entre plusieurs niveaux de compression selon vos besoins. Le traitement s\'effectue entièrement dans votre navigateur : vos vidéos ne quittent jamais votre appareil. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
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
    desc: 'Convertissez vos vidéos entre MP4, WebM, AVI, MKV et GIF. Tous formats supportés, gratuit, sans inscription, 100% local.',
    h1: 'Convertir une vidéo en ligne gratuitement',
    intro: 'Convertissez vos vidéos entre tous les formats populaires : MP4, WebM, AVI, MKV, MOV et GIF. Le format MP4 est le plus universellement compatible pour le web et les réseaux sociaux, tandis que le WebM offre une meilleure compression pour les sites modernes. L\'AVI est pris en charge par de nombreux logiciels de montage, et le MKV permet de conserver plusieurs pistes audio et sous-titres. Les créateurs de contenu convertissent régulièrement leurs vidéos pour les adapter aux exigences des différentes plateformes : MP4 pour YouTube, WebM pour les sites web, MOV pour Final Cut Pro. Le traitement s\'effectue entièrement dans votre navigateur grâce à FFmpeg WebAssembly : vos fichiers vidéo restent sur votre appareil et ne sont jamais envoyés à un serveur. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Convertissez autant de vidéos que vous le souhaitez.' },
      { q: 'Quels formats de sortie sont disponibles ?', a: 'MP4, WebM, AVI, MKV, MOV et GIF. Le MP4 est recommandé pour une compatibilité maximale.' },
      { q: 'La conversion préserve-t-elle la qualité ?', a: 'Oui, la conversion préserve la qualité d\'origine au maximum. Vous pouvez ajuster les paramètres de bitrate si nécessaire.' },
      { q: 'Puis-je convertir une vidéo pour Instagram ou YouTube ?', a: 'Oui, choisissez le format MP4 pour une compatibilité optimale avec Instagram, YouTube, TikTok et toutes les plateformes de partage vidéo.' },
      { q: 'Quelle est la durée maximale de vidéo convertible ?', a: 'Il n\'y a pas de limite stricte. La conversion s\'effectue localement dans votre navigateur, la seule contrainte est la mémoire disponible sur votre appareil.' }
    ],
    howTo: ['Chargez votre vidéo', 'Choisissez le format de sortie', 'Ajustez les paramètres si nécessaire', 'Téléchargez la vidéo convertie'],
    relatedSlugs: ['compresser-video', 'decouper-video', 'video-en-gif'],
  },
  'ajouter-audio-video': {
    toolId: 'video-add-audio', category: 'video', slug: 'ajouter-audio-video',
    title: 'Ajouter Audio à une Vidéo en Ligne Gratuit',
    desc: 'Ajoutez une musique ou une voix-off à votre vidéo. Mixage volume indépendant, gratuit, sans inscription, 100% local.',
    h1: 'Ajouter de l\'audio à une vidéo en ligne',
    intro: 'Incorporez une piste audio à votre vidéo en quelques clics, que ce soit pour ajouter une musique de fond, une voix-off ou un commentaire audio. Notre outil vous permet de fusionner un fichier audio (MP3, WAV, AAC, OGG) avec une vidéo, en choisissant si vous souhaitez remplacer ou mixer l\'audio existant. Les créateurs de contenu YouTube ajoutent régulièrement des musiques de fond à leurs vidéos, les formateurs superposent des commentaires pédagogiques, et les marketeurs intègrent des voix-off publicitaires. Vous pouvez ajuster le volume de la piste audio et de la vidéo d\'origine indépendamment pour obtenir le mixage parfait. Le traitement s\'effectue entièrement dans votre navigateur : vos fichiers ne sont jamais envoyés à un serveur. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
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
    desc: 'Extrayez la piste audio de vos vidéos en MP3, WAV ou AAC. Choix du bitrate, gratuit, sans inscription, 100% local.',
    h1: 'Extraire l\'audio d\'une vidéo en ligne',
    intro: 'Isolez et extrayez la piste audio de n\'importe quelle vidéo en quelques secondes. Notre outil vous permet de convertir la bande son d\'un fichier vidéo en format audio (MP3, WAV ou AAC), idéal pour récupérer la musique d\'un clip vidéo, isoler un podcast depuis un enregistrement YouTube, ou extraire un extrait sonore pour un montage audio. Les musiciens extraient les pistes audio de clips musicaux pour les réécouter, les podcasteurs récupèrent l\'audio de leurs lives streaming, et les journalistes isolent des interviews vidéo pour n\'en garder que le son. Vous pouvez choisir la qualité de sortie et le format qui convient le mieux à votre usage. Le traitement s\'effectue entièrement dans votre navigateur : vos fichiers restent sur votre appareil. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Extrayez l\'audio d\'autant de vidéos que vous le souhaitez.' },
      { q: 'Quels formats audio puis-je obtenir ?', a: 'MP3 (format universel, fichier léger), WAV (qualité maximale, sans perte) et AAC (bonne qualité, fichier compact).' },
      { q: 'La qualité audio sera-t-elle préservée ?', a: 'Oui, l\'audio est extrait sans réencodage si possible. En MP3, vous pouvez choisir le bitrate de sortie (128, 192 ou 320 kbps).' },
      { q: 'Puis-je extraire l\'audio d\'une vidéo YouTube ?', a: 'Notre outil fonctionne avec des fichiers vidéo locaux. Pour extraire l\'audio d\'une vidéo en ligne, vous devez d\'abord la télécharger sur votre appareil, puis l\'importer dans l\'outil.' },
      { q: 'Quels formats vidéo sont supportés en entrée ?', a: 'MP4, WebM, AVI, MOV, MKV et la plupart des formats vidéo courants. L\'audio est extrait quelle que soit la vidéo source.' }
    ],
    howTo: ['Chargez votre vidéo', 'Choisissez le format de sortie (MP3, WAV ou AAC)', 'Ajustez la qualité si nécessaire', 'Téléchargez le fichier audio'],
    relatedSlugs: ['ajouter-audio-video', 'supprimer-audio-video', 'decouper-video'],
  },
  'video-en-gif': {
    toolId: 'video-to-gif', category: 'video', slug: 'video-en-gif',
    title: 'Convertir Vidéo en GIF en Ligne Gratuit — Créateur de GIF',
    desc: 'Créez des GIF animés à partir de vidéos MP4, WebM, MOV. Ajustez vitesse et qualité, gratuit, sans inscription, 100% local.',
    h1: 'Convertir une vidéo en GIF animé en ligne',
    intro: 'Transformez n\'importe quelle séquence vidéo en GIF animé en quelques secondes. Les GIF sont parfaits pour illustrer un propos sur les réseaux sociaux, créer des réactions visuelles dans les conversations, ou animer des présentations sans la lourdeur d\'un fichier vidéo. Notre outil vous permet de sélectionner précisément la portion de vidéo à convertir, d\'ajuster la vitesse de lecture et de contrôler la qualité pour obtenir le meilleur compromis entre rendu visuel et poids du fichier. Les community managers créent des GIF pour booster l\'engagement sur Twitter et Slack, les designers les utilisent pour des maquettes interactives, et les formateurs pour illustrer des procédures pas à pas. Le traitement s\'effectue entièrement dans votre navigateur : vos vidéos ne sont jamais envoyées à un serveur. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
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
    title: 'Supprimer Audio d\'une Vidéo en Ligne Gratuit',
    desc: 'Retirez la piste audio d\'une vidéo en un clic. Vidéo silencieuse sans réencodage. Gratuit, sans inscription, 100% local.',
    h1: 'Supprimer l\'audio d\'une vidéo en ligne',
    intro: 'Retirez la piste audio de n\'importe quelle vidéo en un seul clic pour obtenir un fichier vidéo silencieux. Cet outil est indispensable dans de nombreuses situations : supprimer le bruit de fond d\'une vidéo de surveillance, enlever la musique d\'origine pour ajouter une nouvelle bande son, créer des vidéos muettes pour des présentations ou des montages, ou encore préparer une vidéo avant d\'y ajouter une voix-off. Les monteurs vidéo rendent souvent leurs clips silencieux avant de réenregistrer un nouveau commentaire, tandis que les créateurs de memes suppriment l\'audio d\'origine pour le remplacer par un effet sonore viral. Les professionnels du marketing utilisent aussi cette technique pour créer des versions silencieuses de leurs publicités destinées aux plateformes qui lisent les vidéos en muet par défaut, comme Facebook et Instagram. Le processus est rapide et ne modifie pas la qualité vidéo d\'origine. Le traitement s\'effectue entièrement dans votre navigateur grâce à FFmpeg WebAssembly : vos fichiers ne quittent jamais votre appareil. Le service est gratuit et sans inscription. Cet outil en ligne ne nécessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est conçue pour être intuitive et accessible à tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir à créer de compte. Chaque fonctionnalité est optimisée pour offrir le meilleur résultat possible en un minimum de clics, vous permettant de gagner du temps sur vos tâches quotidiennes.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Supprimez l\'audio d\'autant de vidéos que vous le souhaitez, sans limite quotidienne ni filigrane sur le résultat.' },
      { q: 'La qualité vidéo est-elle préservée ?', a: 'Oui, seule la piste audio est retirée. La qualité vidéo et les images restent exactement identiques à l\'originale, sans aucune perte ni réencodage.' },
      { q: 'Puis-je réajouter un autre audio ensuite ?', a: 'Oui, utilisez notre outil Ajouter Audio pour superposer une nouvelle piste sonore sur votre vidéo silencieuse. Vous pouvez ainsi remplacer la bande son d\'origine par une musique ou une voix-off.' },
      { q: 'Quels formats vidéo sont supportés ?', a: 'MP4, WebM, AVI, MOV, MKV et la plupart des formats vidéo courants. La vidéo de sortie est au format MP4 pour une compatibilité maximale.' },
      { q: 'Combien de temps prend la suppression de l\'audio ?', a: 'La suppression est très rapide car il s\'agit d\'une opération de copie de flux vidéo sans réencodage. Une vidéo de quelques minutes est traitée en quelques secondes.' },
      { q: 'Mes vidéos sont-elles en sécurité ?', a: 'Oui, le traitement s\'effectue entièrement dans votre navigateur. Vos vidéos ne sont jamais envoyées à un serveur ni stockées en ligne. La confidentialité de vos fichiers est garantie.' }
    ],
    howTo: [
      'Chargez votre vidéo en la glissant-déposant ou en parcourant vos dossiers',
      'Prévisualisez la vidéo pour vérifier qu\'il s\'agit du bon fichier',
      'Cliquez sur "Supprimer l\'audio" pour lancer le traitement',
      'Attendez que le traitement se termine (quelques secondes)',
      'Téléchargez la vidéo silencieuse sur votre appareil'
    ],
    relatedSlugs: ['ajouter-audio-video', 'extraire-audio-video', 'compresser-video'],
  },
  'json-csv': {
    toolId: 'json-csv', category: 'dev-seo', slug: 'json-csv',
    title: 'Convertir JSON en CSV en Ligne Gratuit — JSON / CSV',
    desc: 'Convertissez et formatez vos données JSON et CSV facilement. Import/export Excel, gratuit, sans inscription, 100% local.',
    h1: 'Convertir JSON en CSV et inversement',
    intro: 'Convertissez facilement vos données entre les formats JSON et CSV, deux des formats de données les plus utilisés dans le développement web et l\'analyse de données. Le JSON (JavaScript Object Notation) est le standard pour les API REST et les échanges de données entre applications, tandis que le CSV (Comma-Separated Values) est le format universel pour les tableurs comme Excel et Google Sheets. Notre outil vous permet de transformer un tableau JSON en fichier CSV prêt à être importé dans Excel, ou inversement de convertir un CSV en JSON structuré pour une API ou un script. Les développeurs utilisent cette conversion pour migrer des données entre bases de données et APIs, les analystes pour exploiter des réponses d\'API dans leurs tableurs, et les data scientists pour préparer leurs jeux de données. Le traitement s\'effectue entièrement dans votre navigateur : vos données restent sur votre appareil. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Aucune limite sur le nombre de conversions.' },
      { q: 'Comment convertir du JSON en CSV ?', a: 'Collez ou chargez vos données JSON, l\'outil détecte automatiquement la structure et génère le CSV correspondant. Vous pouvez ensuite télécharger ou copier le résultat.' },
      { q: 'Les données imbriquées JSON sont-elles supportées ?', a: 'Oui, les objets imbriqués sont aplatis automatiquement. Les clés imbriquées sont combinées avec des points (ex: user.name) pour créer des colonnes CSV.' },
      { q: 'Puis-je convertir du CSV en JSON ?', a: 'Oui, l\'outil fonctionne dans les deux sens. Collez votre CSV, choisissez la direction de conversion, et obtenez un JSON structuré avec les en-têtes comme clés.' },
      { q: 'Mes données sont-elles sécurisées ?', a: 'Oui, 100% sécurisé. Toutes les conversions s\'effectuent localement dans votre navigateur. Aucune donnée n\'est envoyée à un serveur externe.' }
    ],
    howTo: ['Collez ou chargez vos données JSON ou CSV', 'L\'outil convertit automatiquement', 'Ajustez les options si nécessaire', 'Copiez ou téléchargez le résultat'],
    relatedSlugs: ['formateur-json', 'url-encode-decode', 'markdown-preview'],
  },
  'testeur-regex': {
    toolId: 'regex-tester', category: 'dev-seo', slug: 'testeur-regex',
    title: 'Testeur Regex en Ligne Gratuit — Expressions Régulières',
    desc: 'Testez et débuggez vos expressions régulières en temps réel. Surlignage des correspondances, gratuit, sans inscription, 100% local.',
    h1: 'Tester une expression régulière en ligne',
    intro: 'Testez et débugguez vos expressions régulières (regex) en temps réel avec notre outil interactif. Les expressions régulières sont des motifs de recherche puissants utilisés pour valider des emails, extraire des données, nettoyer du texte ou configurer des règles de routage. Cependant, leur syntaxe cryptique les rend difficiles à écrire et à débugger sans un outil adapté. Notre testeur regex met en surbrillance les correspondances en temps réel au fur et à mesure que vous tapez, affiche les groupes capturés et vous permet de tester plusieurs chaînes d\'entrée simultanément. Les développeurs l\'utilisent pour valider des patterns de validation de formulaires (email, téléphone, code postal), les DevOps pour configurer des règles de réécriture Nginx, et les data engineers pour nettoyer des jeux de données. Le traitement s\'effectue entièrement dans votre navigateur. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Testez autant d\'expressions régulières que vous le souhaitez.' },
      { q: 'Quels flags regex sont supportés ?', a: 'Les flags standards sont supportés : g (global), i (insensible à la casse), m (multiligne), s (dotAll) et u (unicode).' },
      { q: 'Les groupes capturés sont-ils affichés ?', a: 'Oui, tous les groupes de capture et groupes nommés sont affichés avec leur contenu correspondant.' },
      { q: 'Puis-je partager mes regex ?', a: 'Oui, vous pouvez copier l\'URL de la page avec votre pattern et vos chaînes de test pré-remplies pour les partager avec vos collègues.' },
      { q: 'Quels cas d\'usage courants sont possibles ?', a: 'Validation d\'email, extraction de données, nettoyage de texte, recherche et remplacement avancé, parsing de logs, validation de formulaires et bien plus.' }
    ],
    howTo: ['Entrez votre expression régulière', 'Ajoutez vos chaînes de test', 'Les correspondances s\'affichent en temps réel', 'Ajustez et itérez'],
    relatedSlugs: ['formateur-json', 'url-encode-decode', 'meta-tags'],
  },
  'meta-tags': {
    toolId: 'meta-tags', category: 'dev-seo', slug: 'meta-tags',
    title: 'Générateur Meta Tags en Ligne Gratuit — Prévisualisation SEO',
    desc: 'Générez et prévisualisez les meta tags pour le SEO et les réseaux sociaux. Aperçu Google et Open Graph, gratuit, sans inscription.',
    h1: 'Générer et prévisualiser les meta tags SEO',
    intro: 'Créez et prévisualisez les meta tags essentiels pour le référencement naturel (SEO) et le partage sur les réseaux sociaux. Les meta tags sont des éléments HTML invisibles qui indiquent aux moteurs de recherche et aux réseaux sociaux comment afficher votre page : titre, description, image de prévisualisation, type de contenu et bien plus. Notre outil génère les balises Open Graph (Facebook, LinkedIn), Twitter Cards, les meta tags SEO classiques et les balises de verification pour Google Search Console et Bing Webmaster Tools. Vous pouvez prévisualiser en temps réel comment votre page apparaîtra dans les résultats Google et sur les réseaux sociaux avant de les publier. Les référenceurs optimisent leurs meta tags pour maximiser le taux de clic (CTR), les développeurs les intègrent dans leurs templates, et les marketeurs les configurent pour chaque campagne. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Générez autant de meta tags que vous le souhaitez.' },
      { q: 'Quels meta tags sont générés ?', a: 'Title, description, Open Graph (og:title, og:description, og:image, og:type), Twitter Cards, robots, canonical et les balises de vérification pour Google et Bing.' },
      { q: 'Comment installer les meta tags ?', a: 'Copiez le code HTML généré et collez-le dans la section <head> de votre page web.' },
      { q: 'Pourquoi les meta tags sont-ils importants pour le SEO ?', a: 'Les meta tags indiquent aux moteurs de recherche le titre et la description de votre page, ce qui influence directement le taux de clic dans les résultats Google. Les balises Open Graph contrôlent l\'apparence lors du partage sur les réseaux sociaux.' },
      { q: 'Quelle longueur recommandée pour le title et la description ?', a: 'Title : 50 à 60 caractères pour éviter la troncature dans Google. Description : 150 à 160 caractères pour un affichage optimal dans les résultats de recherche.' }
    ],
    howTo: ['Remplissez les champs (titre, description, image)', 'Prévisualisez le résultat sur Google et les réseaux', 'Copiez le code HTML généré', 'Collez dans la balise head de votre page'],
    relatedSlugs: ['sitemap-robots', 'css-gradient', 'url-encode-decode'],
  },
  'sitemap-robots': {
    toolId: 'sitemap-robots', category: 'dev-seo', slug: 'sitemap-robots',
    title: 'Générateur Sitemap et Robots.txt en Ligne Gratuit',
    desc: 'Générez un sitemap XML et un fichier robots.txt pour votre site web. Optimisation SEO Google, gratuit, sans inscription.',
    h1: 'Générer un sitemap XML et un robots.txt',
    intro: 'Créez facilement les fichiers sitemap.xml et robots.txt essentiels pour le référencement de votre site web. Le sitemap XML est un fichier qui liste toutes les pages de votre site pour guider les moteurs de recherche dans leur exploration, tandis que le fichier robots.txt indique aux robots d\'indexation quelles pages autoriser ou bloquer. Sans ces fichiers, Google et Bing peuvent passer à côté de pages importantes de votre site ou gaspiller leur budget d\'exploration sur des pages inutiles. Notre générateur vous permet de configurer vos URLs, définir les priorités et fréquences de mise à jour, et spécifier les règles d\'autorisation et d\'interdiction pour les robots. Les référenceurs soumettent le sitemap à Google Search Console pour accélérer l\'indexation, les développeurs configurent robots.txt pour bloquer les pages privées ou en développement. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Générez autant de sitemaps et robots.txt que vous le souhaitez.' },
      { q: 'Comment soumettre le sitemap à Google ?', a: 'Uploadez le fichier sitemap.xml à la racine de votre site, puis soumettez-le via Google Search Console dans la section Sitemaps.' },
      { q: 'Que mettre dans le robots.txt ?', a: 'Autorisez l\'accès aux pages publiques et bloquez les pages privées, en développement ou sans valeur SEO (admin, API, assets).' },
      { q: 'Quelle est la différence entre sitemap et robots.txt ?', a: 'Le sitemap.xml liste les pages que vous voulez que Google indexe. Le robots.txt indique aux robots quelles pages ils peuvent ou ne peuvent pas explorer. Les deux sont complémentaires pour le SEO.' },
      { q: 'À quelle fréquence mettre à jour le sitemap ?', a: 'Mettez à jour votre sitemap à chaque ajout ou suppression de pages significatives. Indiquez la fréquence de mise à jour (daily, weekly, monthly) pour aider Google à explorer vos pages plus efficacement.' }
    ],
    howTo: ['Ajoutez vos URLs', 'Configurez les priorités et fréquences', 'Définissez les règles robots.txt', 'Téléchargez les fichiers générés'],
    relatedSlugs: ['meta-tags', 'url-encode-decode', 'nettoyeur-url-tracking'],
  },
  'formateur-json': {
    toolId: 'json-formatter', category: 'dev-seo', slug: 'formateur-json',
    title: 'Formateur JSON en Ligne Gratuit — Valider, Formater, Minifier',
    desc: 'Formatez, validez et minifiez votre JSON en un clic. Coloration syntaxique, gratuit, sans inscription, 100% local.',
    h1: 'Formater et valider du JSON en ligne',
    intro: 'Formatez, validez et minifiez vos données JSON en un clic directement dans votre navigateur. Le JSON est le format de données le plus utilisé sur le web, mais un JSON brut non formaté est difficile à lire et à débugger. Notre outil transforme instantanément un JSON compact en une version lisible avec indentation et coloration syntaxique, valide la syntaxe pour détecter les erreurs, et permet aussi de minifier un JSON formaté pour réduire sa taille. Les développeurs utilisent quotidiennement le formatage JSON pour débugger des réponses d\'API, les DevOps pour vérifier des fichiers de configuration, et les data engineers pour inspecter des payloads de base de données. L\'outil détecte et signale précisément les erreurs de syntaxe (virgules manquantes, guillemets oubliés, accolades non fermées). Le traitement s\'effectue entièrement dans votre navigateur : vos données restent sur votre appareil. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Formatez et validez autant de JSON que vous le souhaitez.' },
      { q: 'Comment formater du JSON ?', a: 'Collez votre JSON brut dans l\'éditeur, l\'outil le formate automatiquement avec indentation et coloration syntaxique.' },
      { q: 'L\'outil détecte-t-il les erreurs ?', a: 'Oui, les erreurs de syntaxe sont immédiatement signalées avec leur position exacte (ligne et colonne) pour faciliter la correction.' },
      { q: 'Puis-je minifier du JSON ?', a: 'Oui, l\'outil permet de minifier un JSON formaté pour réduire sa taille, utile pour les transferts réseau et les fichiers de configuration en production.' },
      { q: 'Quelle est la taille maximale de JSON supportée ?', a: 'Il n\'y a pas de limite stricte. Cependant, pour des fichiers très volumineux (plusieurs Mo), le formatage peut prendre quelques secondes selon les performances de votre appareil.' }
    ],
    howTo: ['Collez votre JSON', 'L\'outil formate et valide automatiquement', 'Corrigez les erreurs signalées', 'Copiez ou téléchargez le JSON formaté'],
    relatedSlugs: ['json-csv', 'url-encode-decode', 'testeur-regex'],
  },
  'url-encode-decode': {
    toolId: 'url-encode-decode', category: 'dev-seo', slug: 'url-encode-decode',
    title: 'URL Encode / Decode en Ligne Gratuit — Encoder Décoder URL',
    desc: 'Encodez et décodez des URLs et paramètres de requête. Support Unicode et emojis, gratuit, sans inscription, 100% local.',
    h1: 'Encoder et décoder une URL en ligne',
    intro: 'Encodez et décodez les URLs et leurs paramètres de requête en quelques secondes. L\'encodage URL (percent-encoding) transforme les caractères spéciaux en séquences %XX pour garantir qu\'ils soient transmis correctement dans les liens et les requêtes HTTP. C\'est essentiel pour les paramètres de requête contenant des espaces, des accents ou des caractères spéciaux. Notre outil encode et décode instantanément les URLs, les paramètres de requête et les fragments. Les développeurs l\'utilisent pour construire des URLs d\'API avec des paramètres complexes, les testeurs QA pour vérifier les paramètres de tracking, et les référenceurs pour analyser les URLs encodées dans les logs de serveur. L\'outil gère correctement les caractères réservés (!, *, \', (, ), ;), les accents et les caractères Unicode (emojis, CJK). Le traitement s\'effectue entièrement dans votre navigateur. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Encodez et décodez autant d\'URLs que vous le souhaitez.' },
      { q: 'Quelle est la différence entre encodeURI et encodeURIComponent ?', a: 'encodeURI conserve les séparateurs d\'URL (/, ?, &, =, #) tandis que encodeURIComponent encode tous les caractères spéciaux. Utilisez encodeURIComponent pour les paramètres de requête.' },
      { q: 'Les caractères Unicode sont-ils supportés ?', a: 'Oui, tous les caractères Unicode (accents, emojis, CJK) sont correctement encodés en séquences UTF-8 percent-encodées.' },
      { q: 'Pourquoi encoder une URL ?', a: 'Les caractères spéciaux (espaces, accents, &, =, ?) doivent être encodés pour être transmis correctement dans une URL. Sans encodage, ils peuvent provoquer des erreurs de routage ou des paramètres tronqués.' },
      { q: 'Puis-je encoder des paramètres de requête complexes ?', a: 'Oui, l\'outil encode correctement les paramètres de requête contenant des espaces, des accents, des caractères spéciaux et des valeurs imbriquées.' }
    ],
    howTo: ['Collez votre URL ou texte', 'Choisissez encoder ou décoder', 'Le résultat s\'affiche instantanément', 'Copiez le résultat'],
    relatedSlugs: ['nettoyeur-url-tracking', 'json-csv', 'base64'],
  },
  'css-gradient': {
    toolId: 'css-gradient-generator', category: 'dev-seo', slug: 'css-gradient',
    title: 'Générateur de Dégradé CSS en Ligne Gratuit — CSS Gradient',
    desc: 'Créez des dégradés CSS linéaires et radiaux visuellement. Code CSS copiable, gratuit, sans inscription, 100% local.',
    h1: 'Générateur de dégradé CSS gratuit en ligne',
    intro: 'Générez visuellement des dégradés CSS (gradients) pour vos projets web sans écrire une seule ligne de code. Les dégradés CSS sont omniprésents dans le design web moderne : arrière-plans de sections, boutons, cartes, hero banners et overlays. Notre générateur vous permet de créer des dégradés linéaires et radiaux en glissant les points de couleur, en ajustant les angles et les positions, et en ajoutant autant de stops de couleur que nécessaire. Le code CSS est généré en temps réel avec les préfixes navigateurs pour une compatibilité maximale. Les designers web l\'utilisent pour prototyper rapidement des arrière-plans, les développeurs frontend pour intégrer des dégradés pixel-perfect, et les créateurs de thèmes pour leurs palettes. Vous pouvez aussi importer des dégradés existants pour les modifier. Le traitement s\'effectue entièrement dans votre navigateur. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Créez autant de dégradés que vous le souhaitez.' },
      { q: 'Quels types de dégradés sont supportés ?', a: 'Dégradés linéaires (linear-gradient) et radiaux (radial-gradient) avec un nombre illimité de stops de couleur.' },
      { q: 'Le code CSS est-il compatible avec tous les navigateurs ?', a: 'Oui, le code généré inclut les préfixes vendeur (-webkit-, -moz-) pour une compatibilité maximale avec les anciens navigateurs.' },
      { q: 'Puis-je copier le code CSS directement ?', a: 'Oui, le code CSS complet est généré en temps réel et peut être copié en un clic pour être collé dans votre feuille de styles ou votre composant Tailwind.' },
      { q: 'Comment créer un dégradé en diagonale ?', a: 'Utilisez l\'angle de direction : 45deg pour une diagonale haut-gauche vers bas-droite, 135deg pour l\'inverse. Vous pouvez saisir n\'importe quel angle de 0 à 360 degrés.' }
    ],
    howTo: ['Choisissez le type de dégradé (linéaire ou radial)', 'Ajoutez et ajustez les couleurs', 'Modifiez l\'angle et la direction', 'Copiez le code CSS généré'],
    relatedSlugs: ['color-picker', 'convertisseur-couleurs', 'meta-tags'],
  },
  'markdown-preview': {
    toolId: 'markdown-preview', category: 'dev-seo', slug: 'markdown-preview',
    title: 'Éditeur Markdown en Ligne Gratuit — Aperçu en Direct',
    desc: 'Éditeur Markdown avec aperçu en temps réel. Support tableaux, code et LaTeX, gratuit, sans inscription, 100% local.',
    h1: 'Éditeur Markdown avec aperçu en direct',
    intro: 'Rédigez en Markdown et visualisez instantanément le rendu HTML dans notre éditeur avec aperçu en temps réel. Le Markdown est le format d\'écriture le plus populaire chez les développeurs, utilisé pour la documentation technique (GitHub, GitLab), les fichiers README, les blogs statiques (Hugo, Jekyll, Gatsby) et les systèmes de prise de notes (Notion, Obsidian). Notre éditeur prend en charge la syntaxe Markdown étendue : tableaux, blocs de code avec coloration syntaxique, listes de tâches, notes de bas de page, mathématiques LaTeX et diagrammes Mermaid. Les développeurs l\'utilisent pour rédiger des README et de la documentation, les rédacteurs pour prévisualiser des articles de blog, et les étudiants pour prendre des notes structurées. Le traitement s\'effectue entièrement dans votre navigateur : votre contenu reste sur votre appareil. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Rédigez autant de documents Markdown que vous le souhaitez.' },
      { q: 'Quelle syntaxe Markdown est supportée ?', a: 'Markdown standard (CommonMark) + extensions : tableaux, blocs de code, listes de tâches, notes de bas de page, maths LaTeX et diagrammes Mermaid.' },
      { q: 'Puis-je exporter le résultat ?', a: 'Oui, vous pouvez copier le rendu HTML ou télécharger le document au format HTML.' },
      { q: 'Le contenu est-il sauvegardé ?', a: 'Votre contenu reste dans votre navigateur en local. Aucune donnée n\'est envoyée à un serveur. Pensez à sauvegarder votre travail en le copiant ou le téléchargeant.' },
      { q: 'À quoi sert le Markdown ?', a: 'Le Markdown est utilisé pour la documentation technique (GitHub, GitLab), les fichiers README, les blogs statiques (Hugo, Jekyll), les systèmes de prise de notes (Notion, Obsidian) et les commentaires de code.' }
    ],
    howTo: ['Rédigez votre contenu Markdown dans l\'éditeur', 'L\'aperçu HTML s\'affiche en temps réel', 'Utilisez la barre d\'outils pour les raccourcis', 'Copiez ou téléchargez le résultat'],
    relatedSlugs: ['formateur-json', 'testeur-regex', 'compteur-mots'],
  },
  'nettoyeur-url-tracking': {
    toolId: 'url-cleaner', category: 'dev-seo', slug: 'nettoyeur-url-tracking',
    title: 'Nettoyeur d\'URL en Ligne Gratuit — Supprimer Paramètres Tracking',
    desc: 'Supprimez les paramètres de tracking (UTM, fbclid, etc.) de vos liens. 200+ paramètres détectés, gratuit, sans inscription.',
    h1: 'Nettoyer une URL des paramètres de tracking',
    intro: 'Purifiez vos URLs en supprimant les paramètres de tracking inutiles qui encombrent vos liens partagés. Les paramètres UTM (utm_source, utm_medium, utm_campaign), fbclid (Facebook), gclid (Google Ads), mc_eid (Mailchimp) et dizaines d\'autres sont ajoutés automatiquement par les plateformes marketing pour suivre le parcours des utilisateurs. Ces paramètres alourdissent les URLs, les rendent laides dans les messages et les emails, et peuvent révéler des informations de tracking que vous ne souhaitez pas partager. Notre outil détecte et supprime automatiquement plus de 200 paramètres de tracking connus, tout en préservant les paramètres fonctionnels nécessaires au bon fonctionnement de la page (page, category, id, etc.). Les professionnels du marketing l\'utilisent pour nettoyer les liens avant de les partager en réunion, les blogueurs pour des liens propres dans leurs articles, et les utilisateurs soucieux de leur vie privée. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Nettoyez autant d\'URLs que vous le souhaitez.' },
      { q: 'Quels paramètres sont supprimés ?', a: 'Plus de 200 paramètres de tracking connus : UTM (utm_source, utm_medium, utm_campaign, utm_content, utm_term), fbclid, gclid, mc_eid, mc_cid, yclid, _hsenc et bien d\'autres.' },
      { q: 'Les paramètres fonctionnels sont-ils conservés ?', a: 'Oui, les paramètres nécessaires au fonctionnement de la page (page, id, category, q, search, etc.) sont préservés. Seuls les paramètres de tracking sont supprimés.' },
      { q: 'Pourquoi nettoyer les URLs de tracking ?', a: 'Les paramètres de tracking alourdissent les URLs, les rendent peu esthétiques dans les messages et emails, et peuvent révéler des informations de campagne marketing que vous ne souhaitez pas partager.' },
      { q: 'Puis-je nettoyer plusieurs URLs à la fois ?', a: 'Oui, collez plusieurs URLs (une par ligne) et l\'outil nettoiera chacune d\'entre elles automatiquement en supprimant les paramètres de tracking détectés.' }
    ],
    howTo: ['Collez votre URL', 'L\'outil détecte les paramètres de tracking', 'Vérifiez l\'URL nettoyée', 'Copiez l\'URL propre'],
    relatedSlugs: ['url-encode-decode', 'sitemap-robots', 'meta-tags'],
  },
  'compteur-mots': {
    toolId: 'word-counter', category: 'text-tools', slug: 'compteur-mots',
    title: 'Compteur de Mots en Ligne Gratuit — Caractères, Phrases, Paragraphes',
    desc: 'Comptez les mots, caractères, phrases et paragraphes de votre texte en temps réel. Temps de lecture estimé, gratuit, sans inscription.',
    h1: 'Compteur de mots en ligne gratuit — Caractères et phrases',
    intro: 'Analysez instantanément les statistiques de votre texte : nombre de mots, de caractères (avec et sans espaces), de phrases, de paragraphes et le temps de lecture estimé. Le compteur de mots est un outil indispensable pour les rédacteurs web qui doivent respecter des limites de mots imposées par les plateformes (articles SEO à 1500+ mots, posts LinkedIn à 3000 caractères, tweets à 280 caractères), les étudiants qui doivent respecter les consignes de longueur de leurs mémoires, et les traducteurs qui facturent au mot. L\'analyse en temps réel vous permet d\'ajuster votre texte au fur et à mesure de la rédaction sans avoir à lancer de calcul manuel. L\'outil détecte automatiquement la langue du texte pour un comptage précis des mots, y compris pour les langues à caractères non séparés par des espaces comme le chinois ou le japonais. Le traitement s\'effectue entièrement dans votre navigateur : votre texte reste sur votre appareil. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Analysez autant de textes que vous le souhaitez.' },
      { q: 'Comment sont comptés les mots ?', a: 'Les mots sont comptés en séparant le texte par les espaces et la ponctuation. Les caractères spéciaux et les tirets sont gérés intelligemment pour un comptage précis.' },
      { q: 'Le temps de lecture est-il fiable ?', a: 'Oui, le temps de lecture est estimé sur une moyenne de 200 à 250 mots par minute, ce qui correspond à la vitesse de lecture silencieuse d\'un adulte.' },
      { q: 'Quels sont les caractères comptés ?', a: 'L\'outil compte les caractères avec et sans espaces, les mots, les phrases (séparées par . ! ?) et les paragraphes (séparés par des retours à la ligne).' },
      { q: 'Le compteur fonctionne-t-il avec d\'autres langues ?', a: 'Oui, l\'outil détecte automatiquement la langue du texte pour un comptage précis, y compris pour les langues à caractères non séparés par des espaces comme le chinois ou le japonais.' }
    ],
    howTo: ['Collez ou tapez votre texte', 'Les statistiques s\'affichent en temps réel', 'Ajustez votre texte selon les limites souhaitées', 'Copiez le texte final'],
    relatedSlugs: ['convertisseur-casse', 'comparateur-texte', 'lorem-ipsum'],
  },
  'convertisseur-casse': {
    toolId: 'case-converter', category: 'text-tools', slug: 'convertisseur-casse',
    title: 'Convertisseur de Casse en Ligne Gratuit — Majuscules, Minuscules, CamelCase',
    desc: 'Convertissez votre texte en majuscules, minuscules, camelCase, snake_case et plus. 9 formats disponibles, gratuit, sans inscription.',
    h1: 'Convertisseur de casse en ligne gratuit — Majuscules, minuscules',
    intro: 'Transformez instantanément la casse de votre texte entre tous les formats courants : MAJUSCULES, minuscules, Majuscule En Début De Phrase (Title Case), camelCase, PascalCase, snake_case, SCREAMING_SNAKE_CASE, kebab-case et CONSTANT_CASE. La conversion de casse est une opération quotidienne pour les développeurs qui doivent respecter les conventions de nommage (variables en camelCase, constantes en SCREAMING_SNAKE_CASE, composants en PascalCase), les designers qui convertissent des titres en Title Case, et les rédacteurs qui ajustent la casse de leurs textes. Notre outil détecte intelligemment les mots composés et les préserve lors de la conversion. Par exemple, JSON-API devient jsonApi en camelCase et JSON_API en SCREAMING_SNAKE_CASE. Le traitement s\'effectue entièrement dans votre navigateur : votre texte reste sur votre appareil. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Convertissez autant de textes que vous le souhaitez.' },
      { q: 'Quels types de casse sont disponibles ?', a: 'MAJUSCULES, minuscules, Title Case, camelCase, PascalCase, snake_case, SCREAMING_SNAKE_CASE, kebab-case et CONSTANT_CASE.' },
      { q: 'Les mots composés sont-ils gérés ?', a: 'Oui, les mots composés avec tirets ou underscores sont intelligemment préservés lors de la conversion entre les différents formats.' },
      { q: 'Quand utiliser chaque type de casse ?', a: 'camelCase pour les variables JavaScript, PascalCase pour les composants React, snake_case pour Python et les bases de données, SCREAMING_SNAKE_CASE pour les constantes, kebab-case pour les URLs et CSS.' },
      { q: 'Le Title Case fonctionne-t-il en français ?', a: 'Oui, l\'outil applique les règles du Title Case adaptées au français, où les mots courts (articles, prépositions) restent en minuscules sauf en début de phrase.' }
    ],
    howTo: ['Collez votre texte', 'Choisissez le type de casse', 'Le texte converti s\'affiche instantanément', 'Copiez le résultat'],
    relatedSlugs: ['compteur-mots', 'lorem-ipsum', 'comparateur-texte'],
  },
  'lorem-ipsum': {
    toolId: 'lorem-ipsum-generator', category: 'text-tools', slug: 'lorem-ipsum',
    title: 'Générateur Lorem Ipsum en Ligne Gratuit — Texte Placeholder',
    desc: 'Générez du texte Lorem Ipsum placeholder pour vos maquettes et designs. Par paragraphes, mots ou caractères, gratuit, sans inscription.',
    h1: 'Générateur Lorem Ipsum gratuit en ligne — Texte placeholder',
    intro: 'Générez instantanément du texte Lorem Ipsum pour remplir vos maquettes, prototypes et designs de placeholder. Le Lorem Ipsum est le texte factice standard de l\'industrie du design, utilisé depuis le XVe siècle par les typographes pour simuler du contenu réel sans distraire le lecteur par du texte signifiant. Les designers web l\'utilisent pour peupler les wireframes et les prototypes Figma, les développeurs frontend pour tester les mises en page responsives avec différentes quantités de contenu, et les graphistes pour calibrer les tailles de polices et les interlignages. Notre générateur vous permet de créer du Lorem Ipsum classique ou varié, par nombre de paragraphes, de mots ou de caractères, avec des options de personnalisation. Le texte généré suit la structure du Lorem Ipsum original pour un rendu visuel réaliste. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Générez autant de Lorem Ipsum que vous le souhaitez.' },
      { q: 'Puis-je choisir la quantité de texte ?', a: 'Oui, vous pouvez générer du Lorem Ipsum par nombre de paragraphes, de mots ou de caractères selon vos besoins.' },
      { q: 'Pourquoi utiliser du Lorem Ipsum plutôt que du texte réel ?', a: 'Le Lorem Ipsum simule la distribution visuelle du texte réel sans en distraire le lecteur par le sens, ce qui permet de se concentrer sur la mise en page et le design.' },
      { q: 'Le Lorem Ipsum généré est-il varié ?', a: 'Oui, notre générateur propose du Lorem Ipsum classique et des variantes pour éviter la répétition dans vos maquettes. Chaque génération produit un texte différent.' },
      { q: 'Puis-je copier le texte facilement ?', a: 'Oui, un bouton Copier en un clic vous permet de coller le Lorem Ipsum directement dans votre éditeur, votre wireframe ou votre prototype Figma.' }
    ],
    howTo: ['Choisissez le mode (paragraphes, mots ou caractères)', 'Définissez la quantité souhaitée', 'Générez le texte', 'Copiez le Lorem Ipsum'],
    relatedSlugs: ['compteur-mots', 'convertisseur-casse', 'comparateur-texte'],
  },
  'base64': {
    toolId: 'base64-encode-decode', category: 'text-tools', slug: 'base64',
    title: 'Base64 Encode / Decode en Ligne Gratuit — Encoder Décoder Base64',
    desc: 'Encodez et décodez du texte et des fichiers en Base64. Standard et URL-safe, gratuit, sans inscription, 100% local.',
    h1: 'Encoder et décoder en Base64 en ligne',
    intro: 'Encodez et décodez du texte, des URLs et des fichiers en Base64 directement dans votre navigateur. Le Base64 est un encodage binaire vers texte qui convertit des données binaires en une chaîne de caractères ASCII, utilisé pour intégrer des images dans du CSS ou du HTML (data URIs), transmettre des données binaires dans des APIs JSON, stocker des certificats et des clés, ou encoder des identifiants d\'authentification HTTP Basic. Les développeurs backend l\'utilisent pour encoder les payloads JWT, les frontend pour les data URIs d\'images, et les DevOps pour les secrets Kubernetes. Notre outil supporte l\'encodage standard, l\'encodage URL-safe (sans +/), et le décodage automatique des deux formats. Le traitement s\'effectue entièrement dans votre navigateur : vos données restent sur votre appareil. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Encodez et décodez autant de données que vous le souhaitez.' },
      { q: 'Quelle est la différence entre Base64 standard et URL-safe ?', a: 'Le Base64 standard utilise + et / qui sont des caractères réservés dans les URLs. Le Base64 URL-safe les remplace par - et _ pour une utilisation sécurisée dans les URLs et noms de fichiers.' },
      { q: 'Puis-je encoder des fichiers en Base64 ?', a: 'Oui, vous pouvez encoder n\'importe quel fichier (images, PDF, etc.) en Base64 pour l\'intégrer dans du CSS, du HTML ou du JSON.' },
      { q: 'À quoi sert l\'encodage Base64 ?', a: 'Le Base64 convertit des données binaires en texte ASCII pour les intégrer dans des emails, des data URIs CSS, des payloads JWT, des certificats et des APIs JSON qui ne supportent pas le binaire.' },
      { q: 'Le Base64 augmente-t-il la taille des données ?', a: 'Oui, l\'encodage Base64 augmente la taille d\'environ 33%. Un fichier de 1 Mo donnera un encodage Base64 d\'environ 1,33 Mo. C\'est le compromis pour pouvoir transporter du binaire dans du texte.' }
    ],
    howTo: ['Collez votre texte ou chargez un fichier', 'Choisissez encoder ou décoder', 'Sélectionnez le mode (standard ou URL-safe)', 'Copiez le résultat'],
    relatedSlugs: ['url-encode-decode', 'generateur-hash', 'generateur-mot-de-passe'],
  },
  'comparateur-texte': {
    toolId: 'text-diff-checker', category: 'text-tools', slug: 'comparateur-texte',
    title: 'Comparateur de Texte en Ligne Gratuit — Diff Texte',
    desc: 'Comparez deux textes et voyez les différences en surbrillance. Côte à côte ou unifié, gratuit, sans inscription, 100% local.',
    h1: 'Comparer deux textes et voir les différences',
    intro: 'Comparez deux textes côte à côte et visualisez instantanément les différences avec un surlignage couleur. Notre comparateur de texte (diff checker) met en évidence les lignes ajoutées, supprimées et modifiées entre deux versions d\'un document. C\'est un outil essentiel pour les rédacteurs qui révisent des articles, les traducteurs qui vérifient des modifications, les développeurs qui comparent des configurations, et les juristes qui suivent les changements dans des contrats. L\'affichage côte à côte permet une lecture fluide des différences, tandis que l\'affichage unifié regroupe toutes les modifications dans un seul texte. Les différences sont colorées : vert pour les ajouts, rouge pour les suppressions, et jaune pour les modifications. Le traitement s\'effectue entièrement dans votre navigateur : vos textes restent sur votre appareil. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Comparez autant de textes que vous le souhaitez.' },
      { q: 'Comment fonctionne la comparaison ?', a: 'L\'algorithme analyse les deux textes ligne par ligne et identifie les ajouts, suppressions et modifications. Les différences sont mises en surbrillance avec des couleurs distinctes.' },
      { q: 'Puis-je ignorer les différences de casse ou d\'espaces ?', a: 'Oui, des options permettent d\'ignorer les différences de casse (majuscules/minuscules) et d\'espaces (espaces multiples, tabulations) pour une comparaison plus souple.' },
      { q: 'Quels cas d\'usage sont possibles ?', a: 'Révision d\'articles, vérification de traductions, comparaison de contrats, suivi de modifications dans des documents collaboratifs, validation de données et audit de configurations.' },
      { q: 'Les textes sont-ils sécurisés ?', a: 'Oui, le traitement s\'effectue entièrement dans votre navigateur. Vos textes ne sont jamais envoyés à un serveur ni stockés en ligne, garantissant la confidentialité de vos documents.' }
    ],
    howTo: ['Collez le texte original dans le panneau gauche', 'Collez le texte modifié dans le panneau droit', 'Les différences s\'affichent en surbrillance', 'Ajustez les options de comparaison si nécessaire'],
    relatedSlugs: ['compteur-mots', 'convertisseur-casse', 'lorem-ipsum'],
  },
  'separateur-nom-prenom': {
    toolId: 'name-splitter', category: 'text-tools', slug: 'separateur-nom-prenom',
    title: 'Séparateur Prénom Nom en Ligne Gratuit — Split Noms',
    desc: 'Séparez les prénoms et noms de famille depuis une liste. Noms composés et particules, gratuit, sans inscription, 100% local.',
    h1: 'Séparer prénoms et noms de famille en ligne',
    intro: 'Séparez automatiquement les prénoms et noms de famille à partir d\'une liste de noms complets. Lorsque vous importez des données depuis un fichier Excel, un CRM ou une base de données, les noms sont souvent regroupés dans une seule colonne. Notre outil détecte intelligemment la structure des noms (prénom + nom, nom + prénom, noms composés avec tirets, particules comme de, van, von) et les sépare en colonnes distinctes. Les professionnels RH utilisent cet outil pour nettoyer les listes d\'employés, les marketeurs pour segmenter leurs bases de contacts, et les administrateurs pour préparer des fichiers d\'import. Vous pouvez coller une liste de noms ou charger un fichier CSV, et exporter le résultat en CSV ou Excel. Le traitement s\'effectue entièrement dans votre navigateur : vos données restent sur votre appareil. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
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
    desc: 'Créez des QR codes pour URLs, texte, WiFi et plus. Personnalisez couleurs et taille, export PNG/SVG, gratuit, sans inscription.',
    h1: 'Générer un QR code en ligne gratuitement',
    intro: 'Créez des QR codes personnalisés pour toutes vos utilisations : liens web, texte, identifiants WiFi, coordonnées vCard, numéros de téléphone et adresses email. Les QR codes sont devenus un outil incontournable du marketing digital et de la communication : cartes de visite numériques, menus de restaurant sans contact, liens de paiement, billets d\'événement et campagnes publicitaires. Notre générateur vous permet de personnaliser la couleur de premier plan et d\'arrière-plan, la taille de l\'image, et le niveau de correction d\'erreur (L, M, Q, H) pour garantir la lisibilité même si le QR code est partiellement endommagé ou imprimé en petite taille. Le résultat est téléchargeable en PNG haute résolution ou en SVG vectoriel pour une impression professionnelle. Le traitement s\'effectue entièrement dans votre navigateur : vos données restent sur votre appareil. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
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
    desc: 'Générez des mots de passe forts et aléatoires. Personnalisez longueur et caractères, indicateur de force, gratuit, 100% local.',
    h1: 'Générer un mot de passe sécurisé en ligne',
    intro: 'Créez des mots de passe forts et aléatoires en un clic pour protéger vos comptes en ligne. La sécurité des mots de passe est la première ligne de défense contre le piratage : un mot de passe faible peut être cracké en quelques secondes par une attaque par force brute. Notre générateur vous permet de configurer précisément la longueur (de 4 à 128 caractères) et les types de caractères inclus : majuscules, minuscules, chiffres et symboles spéciaux. Les recommandations actuelles du NIST préconisent des mots de passe d\'au moins 12 caractères combinant tous les types de caractères. L\'outil affiche en temps réel la force estimée du mot de passe (faible, moyen, fort, très fort) et le temps estimé pour le craquer par force brute. Les mots de passe sont générés entièrement dans votre navigateur en utilisant l\'API Crypto.getRandomValues() pour une véritable randomisation cryptographique. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
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
    desc: 'Générez des hash MD5, SHA-1, SHA-256 et SHA-512. Vérifiez l\'intégrité de fichiers. Gratuit, sans inscription, 100% local.',
    h1: 'Générer un hash MD5, SHA-256 ou SHA-512 en ligne',
    intro: 'Calculez instantanément les empreintes numériques (hash) de n\'importe quel texte en utilisant les algorithmes les plus courants : MD5, SHA-1, SHA-256, SHA-384 et SHA-512. Les fonctions de hash sont des primitives cryptographiques essentielles utilisées pour vérifier l\'intégrité des fichiers, stocker les mots de passe de manière sécurisée, signer des documents numériquement et identifier des données de manière unique. Les développeurs utilisent les hash pour vérifier que les fichiers téléchargés n\'ont pas été altérés, les administrateurs système pour vérifier les sommes de contrôle des sauvegardes, et les security engineers pour détecter les modifications non autorisées. Notre outil calcule tous les hash en parallèle pour un résultat instantané. Vous pouvez aussi comparer deux hash pour vérifier rapidement s\'ils correspondent, ce qui est particulièrement utile pour valider l\'intégrité d\'un téléchargement ou détecter des modifications dans un fichier de configuration. Le traitement s\'effectue entièrement dans votre navigateur grâce à l\'API Web Crypto : vos données ne sont jamais envoyées à un serveur. Le service est gratuit et sans inscription. Cet outil en ligne ne nécessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est conçue pour être intuitive et accessible à tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir à créer de compte. Chaque fonctionnalité est optimisée pour offrir le meilleur résultat possible en un minimum de clics, vous permettant de gagner du temps sur vos tâches quotidiennes.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Calculez autant de hash que vous le souhaitez, sans aucune limite quotidienne.' },
      { q: 'Quelle est la différence entre MD5 et SHA-256 ?', a: 'MD5 produit un hash de 128 bits (32 caractères hex) mais est considéré comme cryptographiquement cassé et ne doit plus être utilisé pour la sécurité. SHA-256 produit un hash de 256 bits (64 caractères hex) et est recommandé pour tous les usages de sécurité.' },
      { q: 'À quoi servent les hash ?', a: 'Vérification d\'intégrité des fichiers téléchargés, stockage sécurisé de mots de passe, signatures numériques, identification de données, détection de doublons et de modifications non autorisées dans des fichiers de configuration.' },
      { q: 'Puis-je hasher des fichiers ?', a: 'Oui, vous pouvez charger n\'importe quel fichier (image, PDF, archive) pour calculer son hash. C\'est utile pour vérifier qu\'un fichier téléchargé correspond à la somme de contrôle fournie par l\'éditeur.' },
      { q: 'Le hash est-il réversible ?', a: 'Non, les fonctions de hash sont à sens unique. Il est impossible de retrouver le texte d\'origine à partir du hash. C\'est ce qui les rend adaptées au stockage sécurisé de mots de passe.' },
      { q: 'Quels algorithmes sont disponibles ?', a: 'MD5, SHA-1, SHA-256, SHA-384 et SHA-512. Tous sont calculés simultanément en temps réel au fur et à mesure que vous tapez votre texte.' }
    ],
    howTo: [
      'Entrez ou collez votre texte dans le champ prévu',
      'Les hash sont calculés instantanément en temps réel pour chaque algorithme',
      'Comparez deux hash si vous souhaitez vérifier une correspondance',
      'Cliquez sur le bouton Copier à côté du hash souhaité',
      'Utilisez le hash pour vérifier l\'intégrité ou stocker une empreinte sécurisée'
    ],
    relatedSlugs: ['generateur-mot-de-passe', 'base64', 'generateur-uuid-guid'],
  },
  'color-picker': {
    toolId: 'color-picker', category: 'generators', slug: 'color-picker',
    title: 'Color Picker en Ligne Gratuit — Sélecteur de Couleur HEX RGB HSL',
    desc: 'Choisissez une couleur et obtenez ses valeurs HEX, RGB et HSL. Pipette intégrée, gratuit, sans inscription.',
    h1: 'Choisir une couleur en ligne — HEX, RGB, HSL',
    intro: 'Sélectionnez visuellement la couleur parfaite pour vos projets web et graphiques à l\'aide de notre sélecteur de couleur interactif. L\'outil affiche instantanément les valeurs dans tous les formats nécessaires : HEX (#3b82f6), RGB (59, 130, 246), HSL (217°, 91%, 60%) et nom CSS le plus proche. Les designers web utilisent le color picker pour définir les palettes de leurs interfaces, les développeurs frontend pour copier les valeurs exactes des couleurs dans leur CSS ou Tailwind, et les graphistes pour coordonner les couleurs entre leurs différents outils. Le sélecteur visuel vous permet de naviguer dans le spectre chromatique, ajuster la saturation et la luminosité, et affiner avec précision grâce aux champs numériques. Vous pouvez aussi saisir directement une valeur HEX ou RGB pour retrouver la couleur correspondante. Le traitement s\'effectue entièrement dans votre navigateur. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Choisissez autant de couleurs que vous le souhaitez.' },
      { q: 'Quels formats de couleur sont disponibles ?', a: 'HEX (#rrggbb), RGB (r, g, b), HSL (h, s%, l%) et le nom CSS le plus proche (par ex. dodgerblue, coral).' },
      { q: 'Puis-je copier les valeurs facilement ?', a: 'Oui, chaque format dispose d\'un bouton Copier en un clic pour coller directement dans votre CSS ou code.' },
      { q: 'Comment trouver la couleur d\'un élément d\'une image ?', a: 'Utilisez l\'outil de pipette intégré pour sélectionner n\'importe quelle couleur affichée à l\'écran et obtenir instantanément ses valeurs HEX, RGB et HSL.' },
      { q: 'Quelle est la différence entre HEX et RGB ?', a: 'HEX est une notation hexadécimale compacte (#3b82f6) utilisée en CSS, tandis que RGB (59, 130, 246) est une notation décimale plus lisible. Les deux représentent la même couleur.' }
    ],
    howTo: ['Utilisez le sélecteur de couleur visuel', 'Ajustez saturation et luminosité', 'Visualisez les valeurs HEX, RGB et HSL', 'Copiez le format souhaité'],
    relatedSlugs: ['convertisseur-couleurs', 'css-gradient', 'generateur-favicon'],
  },
  'generateur-lien-whatsapp': {
    toolId: 'whatsapp-link', category: 'generators', slug: 'generateur-lien-whatsapp',
    title: 'Générateur de Lien WhatsApp en Ligne Gratuit — Wa.me Link',
    desc: 'Créez un lien direct vers WhatsApp avec message pré-rempli. Format wa.me, gratuit, sans inscription.',
    h1: 'Générer un lien direct vers WhatsApp en ligne',
    intro: 'Créez un lien direct vers WhatsApp (wa.me) qui ouvre automatiquement une conversation avec un numéro prédéfini et un message pré-rempli. Les liens WhatsApp sont un outil puissant pour le marketing et le service client : placez-les sur votre site web, dans vos emails, vos réseaux sociaux ou vos publicités pour permettre à vos visiteurs de vous contacter instantanément sur WhatsApp sans avoir à chercher votre numéro. Les e-commerçants les utilisent pour l\'assistance client, les restaurateurs pour les réservations, les freelances pour les devis, et les agences pour les prises de contact. Notre générateur vous permet de configurer le numéro de téléphone (avec indicatif pays), le message par défaut et de prévisualiser le lien avant de le copier. Le format wa.me/33612345678 est universellement compatible avec iOS, Android et WhatsApp Web. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Générez autant de liens WhatsApp que vous le souhaitez.' },
      { q: 'Comment fonctionne le lien wa.me ?', a: 'Le lien wa.me/33612345678 ouvre WhatsApp directement sur la conversation avec le numéro +33612345678. Vous pouvez ajouter ?text=VotreMessage pour pré-remplir le message.' },
      { q: 'Le numéro doit-il inclure l\'indicatif pays ?', a: 'Oui, le numéro doit être au format international sans le + (ex: 33612345678 pour la France, 212612345678 pour le Maroc).' },
      { q: 'Où placer le lien WhatsApp ?', a: 'Sur votre site web (bouton Contactez-nous), dans vos emails, vos signatures email, vos réseaux sociaux, vos cartes de visite numériques et vos publicités en ligne.' },
      { q: 'Le lien fonctionne-t-il sur tous les appareils ?', a: 'Oui, le lien wa.me est universellement compatible avec iOS, Android, WhatsApp Web et WhatsApp Desktop. Il ouvre l\'application si elle est installée, sinon la version web.' }
    ],
    howTo: ['Entrez le numéro de téléphone avec indicatif pays', 'Rédigez le message par défaut', 'Prévisualisez le lien', 'Copiez le lien wa.me généré'],
    relatedSlugs: ['generateur-qr-code', 'generateur-mot-de-passe', 'color-picker'],
  },
  'generateur-uuid-guid': {
    toolId: 'uuid-generator', category: 'generators', slug: 'generateur-uuid-guid',
    title: 'Générateur d\'UUID en Ligne Gratuit — GUID v4',
    desc: 'Générez instantanément des UUID v4 uniques et aléatoires. Jusqu\'à 100 UUID en un clic. Gratuit, sans inscription, 100% local.',
    h1: 'Générer un UUID (GUID) v4 en ligne',
    intro: 'Générez instantanément des identifiants universels uniques (UUID v4 / GUID) directement dans votre navigateur. Les UUID sont des identifiants de 128 bits représentés sous forme de chaîne de 36 caractères (ex: 550e8400-e29b-41d4-a716-446655440000) utilisés pour identifier de manière unique des enregistrements dans les bases de données, des fichiers, des sessions utilisateur, des transactions et des messages. La version 4 (aléatoire) offre 2^122 combinaisons possibles, rendant la probabilité de collision quasiment nulle. Les développeurs backend utilisent les UUID comme clés primaires dans leurs bases de données, les développeurs frontend pour les identifiants de composants React ou Vue, et les DevOps pour les noms de ressources cloud. Notre générateur utilise l\'API Crypto.getRandomValues() pour une véritable randomisation cryptographique, garantissant que chaque UUID est imprévisible et unique. Vous pouvez générer un ou plusieurs UUID à la fois (jusqu\'à 100 en un clic) et les copier dans différents formats : majuscules, minuscules, avec ou sans tirets, et en formatURN. Le traitement s\'effectue entièrement dans votre navigateur. Le service est gratuit et sans inscription. Cet outil en ligne ne nécessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est conçue pour être intuitive et accessible à tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir à créer de compte. Chaque fonctionnalité est optimisée pour offrir le meilleur résultat possible en un minimum de clics, vous permettant de gagner du temps sur vos tâches quotidiennes.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Générez autant d\'UUID que vous le souhaitez, sans aucune limite quotidienne.' },
      { q: 'Quelle est la probabilité de collision ?', a: 'Avec UUID v4, la probabilité de deux UUID identiques est d\'environ 1 sur 2.71 × 10^18, soit virtuellement impossible. Même en générant des milliards d\'UUID, les collisions restent extrêmement improbables.' },
      { q: 'Quelle est la différence entre UUID et GUID ?', a: 'UUID et GUID désignent la même chose. UUID (Universally Unique Identifier) est le terme standard RFC 4122, tandis que GUID (Globally Unique Identifier) est le terme utilisé par Microsoft dans l\'écosystème .NET et Windows.' },
      { q: 'Puis-je générer plusieurs UUID à la fois ?', a: 'Oui, vous pouvez générer jusqu\'à 100 UUID en un seul clic. Tous les UUID générés sont uniques et peuvent être copiés individuellement ou en bloc.' },
      { q: 'Quels formats de sortie sont disponibles ?', a: 'Minuscules avec tirets (standard), majuscules avec tirets, sans tirets (compact), et format URN. Vous pouvez copier dans le format qui convient à votre usage.' },
      { q: 'Les UUID sont-ils sécurisés ?', a: 'Oui, notre générateur utilise Crypto.getRandomValues() qui produit une véritable randomisation cryptographique. Les UUID générés sont imprévisibles et ne peuvent pas être devinés.' }
    ],
    howTo: [
      'Choisissez le nombre d\'UUID à générer (de 1 à 100)',
      'Sélectionnez le format de sortie souhaité (minuscules, majuscules, sans tirets)',
      'Cliquez sur "Générer" pour créer les UUID',
      'Vérifiez les UUID générés dans la zone de résultats',
      'Copiez les UUID individuellement ou en bloc avec le bouton Copier'
    ],
    relatedSlugs: ['generateur-hash', 'generateur-mot-de-passe', 'generateur-nombres-aleatoires'],
  },
  'generateur-nombres-aleatoires': {
    toolId: 'random-number-generator', category: 'generators', slug: 'generateur-nombres-aleatoires',
    title: 'Générateur de Nombres Aléatoires en Ligne Gratuit',
    desc: 'Générez des nombres aléatoires avec paramètres personnalisables. Crypto-random, sans doublons, gratuit, sans inscription, 100% local.',
    h1: 'Générer des nombres aléatoires en ligne',
    intro: 'Générez des nombres aléatoires avec des paramètres entièrement personnalisables : minimum, maximum, nombre de résultats, et option d\'exclusion des doublons. Notre générateur utilise l\'API Crypto.getRandomValues() du navigateur pour produire une véritable randomisation cryptographique, bien supérieure aux générateurs pseudo-aléatoires classiques. Les nombres aléatoires sont utilisés dans de nombreux contextes : tirages au sort pour les concours, sélection aléatoire dans les jeux de société, génération de codes de vérification, échantillonnage statistique, simulations Monte Carlo et tests de charge. Les enseignants l\'utilisent pour former des groupes aléatoires, les joueurs pour les tirages de dés, et les développeurs pour tester leurs algorithmes avec des données aléatoires. Vous pouvez générer des nombres entiers ou décimaux, dans n\'importe quelle plage de valeurs. Le traitement s\'effectue entièrement dans votre navigateur : aucune donnée n\'est envoyée à un serveur. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
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
    desc: 'Convertissez les couleurs entre HEX, RGB, HSL et CMYK. Impression et web, gratuit, sans inscription, 100% local.',
    h1: 'Convertisseur de couleurs HEX, RGB, HSL, CMYK',
    intro: 'Convertissez instantanément une couleur entre tous les formats professionnels : HEX, RGB, HSL et CMYK. Saisissez une valeur dans n\'importe quel format et obtenez immédiatement toutes les conversions correspondantes avec un aperçu visuel. Le sélecteur de couleur intégré vous permet de choisir visuellement la teinte souhaitée, tandis que les champs numériques offrent un contrôle précis. Les développeurs web convertissent couramment entre HEX et RGB pour le CSS, les designers passent de HSL à CMYK pour l\'impression, et les graphistes coordonnent les couleurs entre leurs outils numériques et print. Le format CMYK est essentiel pour l\'impression professionnelle (offset, numérique grand format) car les couleurs d\'imprimerie ne correspondent pas exactement aux couleurs écran. Le traitement s\'effectue entièrement dans votre navigateur. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
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
    desc: 'Calculez votre IMC et découvrez votre catégorie de poids. Unités métriques et impériales, gratuit, sans inscription, 100% local.',
    h1: 'Calculer son Indice de Masse Corporelle (IMC) en ligne',
    intro: 'Calculez votre Indice de Masse Corporelle (IMC) en saisissant votre taille et votre poids, et découvrez instantanément dans quelle catégorie de poids vous vous situez selon les classifications de l\'Organisation Mondiale de la Santé. L\'IMC est l\'indicateur de référence utilisé par les professionnels de santé pour évaluer le risque lié au poids : insuffisance pondérale (IMC < 18,5), poids normal (18,5-24,9), surpoids (25-29,9) et obésité (30+). Notre calculateur prend en charge les unités métriques (kg/cm) et impériales (lb/pieds-pouces) pour une utilisation mondiale. Les résultats incluent votre IMC, votre catégorie de poids, la plage de poids idéal pour votre taille, et un graphique de repérage visuel. L\'IMC est un outil de dépistage utile mais ne prend pas en compte la composition corporelle (masse musculaire vs masse grasse). Le calcul s\'effectue localement dans votre navigateur : vos données restent privées. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Aucune donnée n\'est collectée.' },
      { q: 'Quel est un IMC sain ?', a: 'Selon l\'OMS, un IMC entre 18,5 et 24,9 est considéré comme un poids normal. L\'insuffisance pondérale est en dessous de 18,5, le surpoids entre 25 et 29,9, et l\'obésité à 30 et au-dessus.' },
      { q: 'L\'IMC est-il fiable pour tout le monde ?', a: 'L\'IMC est un indicateur de dépistage utile mais il ne prend pas en compte la masse musculaire, la répartition des graisses ni l\'âge. Consultez un professionnel de santé pour une évaluation complète.' },
      { q: 'Comment est calculé l\'IMC ?', a: 'L\'IMC est calculé en divisant le poids (en kg) par le carré de la taille (en m²). Formule : IMC = poids / taille². Par exemple, 70 kg pour 1,75 m donne un IMC de 22,9.' },
      { q: 'L\'outil fonctionne-t-il avec les unités impériales ?', a: 'Oui, vous pouvez saisir votre poids en livres (lb) et votre taille en pieds et pouces. La conversion en unités métriques est effectuée automatiquement pour le calcul.' }
    ],
    howTo: ['Entrez votre taille (en cm ou pieds/pouces)', 'Entrez votre poids (en kg ou livres)', 'L\'IMC et la catégorie s\'affichent instantanément', 'Consultez la plage de poids idéal pour votre taille'],
    relatedSlugs: ['calculateur-age', 'calculateur-pourcentage', 'convertisseur-unites'],
  },
  'calculateur-age': {
    toolId: 'age-calculator', category: 'calculators', slug: 'calculateur-age',
    title: 'Calculateur d\'Âge en Ligne Gratuit — Âge Exact en Jours, Mois, Heures',
    desc: 'Calculez votre âge exact en années, mois, jours, heures et minutes. Inclut le jour de naissance et le prochain anniversaire. Gratuit, sans inscription, 100% local.',
    h1: 'Calculer son âge exact en années, mois et jours',
    intro: 'Découvrez votre âge précis en années, mois et jours à partir de votre date de naissance, avec des détails complets incluant le nombre total de jours vécus, les heures et les minutes écoulées depuis votre naissance. Notre calculateur d\'âge va au-delà du simple calcul : il affiche votre jour de naissance dans la semaine (lundi, mardi...), le nombre de jours restants avant votre prochain anniversaire, et le pourcentage de l\'année écoulée. Connaître son âge exact est essentiel dans de nombreuses situations du quotidien : vérifier l\'éligibilité à un programme scolaire ou sportif, calculer l\'âge légal pour la retraite, déterminer l\'âge d\'un enfant en mois pour le suivi pédiatrique, ou encore préparer les documents administratifs nécessitant un âge précis. Les professionnels des ressources humaines utilisent notre outil pour vérifier l\'âge des candidats lors des recrutements, les parents suivent l\'évolution de leurs enfants en mois et semaines, et les retraités calculent le nombre exact de trimestres cotisés pour leur dossier de retraite. Vous pouvez aussi calculer la différence entre deux dates quelconques : durée d\'un contrat, ancienneté dans un poste, intervalle entre deux événements. Le calcul s\'effectue intégralement dans votre navigateur : votre date de naissance n\'est jamais transmise à un serveur, garantissant une confidentialité totale de vos données personnelles. Le service est entièrement gratuit et ne nécessite aucune inscription. Cet outil en ligne ne nécessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est conçue pour être intuitive et accessible à tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir à créer de compte.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Aucune donnée personnelle n\'est collectée ni stockée. Votre date de naissance reste sur votre appareil.' },
      { q: 'L\'âge est-il calculé en temps réel ?', a: 'Oui, l\'âge se met à jour en temps réel avec une précision à la journée près, incluant la prise en compte des années bissextiles pour un résultat exact.' },
      { q: 'Puis-je calculer l\'âge entre deux dates quelconques ?', a: 'Oui, vous pouvez calculer la différence entre n\'importe quelles deux dates, pas seulement entre votre naissance et aujourd\'hui. Idéal pour calculer une durée de contrat ou d\'ancienneté.' },
      { q: 'Le calculateur prend-il en compte les années bissextiles ?', a: 'Oui, le 29 février est correctement géré. Si vous êtes né le 29 février, votre âge est calculé avec précision et les années non bissextiles sont comptabilisées correctement.' },
      { q: 'Quelles informations sont affichées en plus de l\'âge ?', a: 'Outre l\'âge en années, mois et jours, l\'outil affiche le nombre total de jours vécus, les heures et minutes écoulées, le jour de naissance dans la semaine, les jours restants avant le prochain anniversaire et le pourcentage de l\'année écoulée.' },
      { q: 'Puis-je calculer l\'âge de plusieurs personnes ?', a: 'Oui, vous pouvez changer la date de naissance autant de fois que vous le souhaitez. L\'outil est illimité et gratuit, parfait pour calculer l\'âge de tous les membres de votre famille ou de vos collègues.' }
    ],
    howTo: [
      'Entrez votre date de naissance dans le champ prévu (jour, mois, année)',
      'L\'âge exact en années, mois et jours s\'affiche instantanément',
      'Consultez les détails complémentaires : jours vécus, heures, jour de naissance',
      'Vérifiez le nombre de jours restants avant votre prochain anniversaire',
      'Pour calculer un intervalle entre deux dates, entrez la date de début et la date de fin'
    ],
    relatedSlugs: ['calculateur-imc', 'chronometre', 'calculateur-pourcentage'],
  },
  'calculateur-pourcentage': {
    toolId: 'percentage-calculator', category: 'calculators', slug: 'calculateur-pourcentage',
    title: 'Calculateur de Pourcentage — Tous les Calculs % en Ligne',
    desc: 'Calculez facilement tous les pourcentages : augmentation, réduction, proportion, variation. Formules et exemples inclus. Gratuit, sans inscription.',
    h1: 'Calculer un pourcentage en ligne — augmentation, réduction, proportion',
    intro: 'Réalisez tous les calculs de pourcentages en quelques secondes grâce à notre calculateur complet et intuitif. Que vous souhaitiez connaître X% d\'un nombre, déterminer quel pourcentage représente une valeur par rapport à une autre, calculer une augmentation ou une réduction en pourcentage, ou mesurer la variation entre deux valeurs, notre outil couvre tous les cas de figure avec des explications claires et des formules détaillées. Le calcul de pourcentages est une compétence quotidienne indispensable : les consommateurs vérifient les remises lors des soldes et les augmentations de prix, les commerçants calculent leurs marges et la TVA, les étudiants résolvent des exercices de mathématiques, les salariés évaluent une augmentation de salaire ou le montant de leur prime, et les investisseurs analysent les rendements de leurs placements. Notre calculateur affiche systématiquement la formule utilisée et le détail des étapes de calcul, ce qui vous permet de comprendre le raisonnement et de reproduire le calcul mentalement à l\'avenir. Les résultats sont instantanés et précis, sans risque d\'erreur de calcul manuel. Le calcul s\'effectue intégralement dans votre navigateur : aucune donnée n\'est envoyée à un serveur, garantissant la confidentialité de vos calculs financiers. Le service est entièrement gratuit et ne nécessite aucune inscription. Cet outil en ligne ne nécessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est conçue pour être intuitive et accessible à tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir à créer de compte. Chaque fonctionnalité est optimisée pour offrir le meilleur résultat possible en un minimum de clics, vous permettant de gagner du temps sur vos tâches quotidiennes.',
    faq: [
      { q: 'Est-ce gratuit et sans inscription ?', a: 'Oui, 100% gratuit et sans inscription. Calculez autant de pourcentages que vous le souhaitez, sans aucune limite quotidienne ni filigrane sur les résultats.' },
      { q: 'Quels types de calculs sont disponibles ?', a: 'Notre calculateur couvre cinq modes : X% de Y (proportion), X est quel % de Y (taux), augmentation de X% (hausse), réduction de X% (baisse), et variation entre deux valeurs (évolution). Chaque mode affiche la formule et le détail du calcul.' },
      { q: 'Comment calculer une remise lors des soldes ?', a: 'Utilisez le mode "réduction de X%" : entrez le prix original et le pourcentage de remise. Par exemple, 30% de réduction sur 100€ donne un prix soldé de 70€. L\'outil affiche aussi le montant de la remise (30€).' },
      { q: 'Comment calculer une augmentation de salaire ?', a: 'Utilisez le mode "augmentation de X%" : entrez votre salaire actuel et le pourcentage d\'augmentation. Par exemple, une augmentation de 5% sur 2000€ donne un nouveau salaire de 2100€ avec une hausse de 100€.' },
      { q: 'Comment calculer la variation entre deux valeurs ?', a: 'Entrez la valeur initiale et la valeur finale. L\'outil calcule le pourcentage d\'évolution : ((finale - initiale) / initiale) × 100. Un résultat positif indique une hausse, un résultat négatif une baisse. Par exemple, de 80€ à 100€ = +25%.' },
      { q: 'Les résultats sont-ils arrondis ?', a: 'Les résultats sont affichés avec deux décimales par défaut pour une lisibilité optimale, mais le calcul interne utilise la précision maximale. Vous pouvez ajuster le nombre de décimales selon vos besoins.' }
    ],
    howTo: [
      'Choisissez le type de calcul souhaité : proportion, taux, augmentation, réduction ou variation',
      'Entrez les valeurs demandées dans les champs prévus (montant, pourcentage, valeurs de départ et d\'arrivée)',
      'Le résultat s\'affiche instantanément avec la formule utilisée et le détail des étapes',
      'Ajustez le nombre de décimales si nécessaire pour plus de précision',
      'Copiez le résultat ou effectuez un nouveau calcul en modifiant les valeurs'
    ],
    relatedSlugs: ['calculateur-tva', 'calculateur-pourboire', 'calculateur-imc'],
  },
  'convertisseur-unites': {
    toolId: 'unit-converter', category: 'calculators', slug: 'convertisseur-unites',
    title: 'Convertisseur d\'Unités en Ligne Gratuit — Longueur, Poids, Température',
    desc: 'Convertissez entre unités de longueur, poids, température, volume, vitesse et plus. 50+ unités, gratuit, sans inscription.',
    h1: 'Convertir des unités en ligne gratuitement',
    intro: 'Convertissez instantanément entre toutes les unités de mesure courantes : longueur (m, km, mi, ft), poids (kg, lb, oz), température (°C, °F, K), volume (L, gal, fl oz), vitesse (km/h, mph, m/s), surface (m², ha, acre) et temps (s, min, h, jours). Le convertisseur d\'unités est un outil essentiel pour les voyageurs qui passent d\'un système métrique à impérial, les cuisiniers qui adaptent des recettes étrangères, les étudiants en sciences qui manipulent des unités SI, et les professionnels qui travaillent avec des partenaires internationaux. Notre outil couvre 7 catégories de mesures avec plus de 50 unités, et les conversions s\'effectuent en temps réel au fur et à mesure de la saisie. Les formules de conversion sont affichées pour référence éducative. Le calcul s\'effectue localement dans votre navigateur. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
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
    intro: 'Calculez les quantités précises de ciment, sable, gravier et eau nécessaires pour votre dosage béton en fonction du volume à couler et du type de béton souhaité. Le dosage du béton est une étape critique de tout projet de construction : un béton mal dosé peut être trop faible, trop poreux ou ne pas prendre correctement. Notre calculateur vous propose les dosages standards (350 kg/m³ pour les fondations, 400 kg/m³ pour les dalles, 250 kg/m³ pour les scellement) et vous permet de personnaliser le dosage selon vos besoins. Les résultats sont exprimés en kilogrammes et en nombre de sacs de ciment de 35 kg pour faciliter vos achats. Les professionnels du BTP, les artisans maçons et les particuliers réalisant des travaux de bricolage utilisent cet outil pour éviter le gaspillage et garantir la résistance du béton. Le calcul s\'effectue localement dans votre navigateur. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
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
    intro: 'Calculez vos indemnités kilométriques selon le barème officiel URSSAF pour votre déclaration d\'impôts ou vos notes de frais professionnelles. Le barème kilométrique est publié chaque année par l\'administration fiscale et varie selon la puissance fiscale du véhicule et le nombre de kilomètres parcourus. Notre calculateur intègre les barèmes les plus récents pour les voitures (CV 3 à 7 et plus), les motos (50cc à plus de 500cc) et les cyclomoteurs (moins de 50cc). Il suffit d\'entrer la distance parcourue et la puissance fiscale de votre véhicule pour obtenir instantanément le montant de l\'indemnité. Les salariés en déplacement professionnel, les travailleurs indépendants et les auto-entrepreneurs utilisent cet outil pour optimiser leur déduction fiscale et ne pas oublier les frais de carburant, d\'entretien et d\'assurance inclus dans le barème. Le calcul s\'effectue localement dans votre navigateur. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
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
    intro: 'Un chronomètre de précision directement dans votre navigateur, avec enregistrement des temps intermédiaires (laps) et une précision au centième de seconde. Que vous chronométriez une course sportive, une session d\'entraînement, un temps de cuisson ou un projet professionnel, notre chronomètre offre toutes les fonctionnalités d\'un chronomètre physique sans rien installer. L\'enregistrement des tours intermédiaires vous permet de comparer les temps entre différentes phases d\'un même chronométrage. Les sportifs l\'utilisent pour mesurer leurs performances à l\'entraînement, les enseignants pour les tests en classe, et les professionnels pour le suivi du temps passé sur des tâches. L\'interface est optimisée pour une utilisation sur mobile comme sur desktop, avec des boutons larges et réactifs. Le chronomètre fonctionne même si vous changez d\'onglet. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
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
    intro: 'Boostez votre productivité avec la technique Pomodoro grâce à notre timer en ligne avec interface visuelle et paramètres entièrement personnalisables. La technique Pomodoro, inventée par Francesco Cirillo dans les années 1980, alternne des périodes de travail concentré (traditionnellement 25 minutes) avec des pauses courtes (5 minutes), et une pause longue tous les 4 cycles (15-30 minutes). Cette méthode simple mais puissante exploite la pression du temps pour maintenir la concentration et prévenir la procrastination. Notre timer vous guide à travers chaque phase avec des notifications sonores et visuelles, et affiche le nombre de Pomodoros complétés dans la session. Vous pouvez personnaliser la durée des sessions de travail, des pauses et du nombre de cycles avant la pause longue. Les étudiants l\'utilisent pour réviser efficacement, les développeurs pour coder en flux continu, et les freelances pour structurer leurs journées. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
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
    intro: 'Calculez facilement le montant hors taxes (HT), toutes taxes comprises (TTC) et le montant de la TVA. Sélectionnez un taux de TVA prédéfini (France 20%, 10%, 5,5%, 2,1%, Belgique 21%, Suisse 8,1%, Allemagne 19%, Espagne 21%, Royaume-Uni 20%) ou entrez un taux personnalisé pour n\'importe quel pays. Le calculateur fonctionne dans les deux sens : entrez un montant TTC pour retrouver le HT, ou un montant HT pour obtenir le TTC. Les professionnels utilisent cet outil pour vérifier leurs factures, les entrepreneurs pour calculer leurs prix de vente, et les consommateurs pour comprendre la part de TVA dans leurs achats. Les formules de calcul sont affichées pour référence : HT = TTC / (1 + taux) et TTC = HT × (1 + taux). Le calcul s\'effectue localement dans votre navigateur. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
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
    intro: 'Vous êtes au restaurant avec des amis et vous voulez calculer le pourboire et diviser l\'addition équitablement ? Notre calculateur de pourboire vous permet de saisir le montant de l\'addition, de choisir un pourcentage de pourboire (15%, 18%, 20% ou personnalisé) et de répartir le total entre plusieurs personnes. L\'outil calcule instantanément le montant du pourboire, le total à payer et la part de chacun. Il est particulièrement utile dans les pays où le pourboire est une pratique courante, comme aux États-Unis (15-20%), au Canada (15-18%) ou au Maroc (5-10%), mais aussi en France où le service est souvent inclus mais un pourboire de 5-10% est apprécié pour un bon service. Le calculateur gère les arrondis intelligents pour éviter les centimes superflus lors de la répartition. Le calcul s\'effectue localement dans votre navigateur : aucune donnée n\'est envoyée à un serveur. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise. Vous pouvez utiliser cet outil autant de fois que vous le souhaitez, sans limite quotidienne et sans avoir a creer de compte. Chaque fonctionnalite est optimisee pour offrir le meilleur resultat possible en un minimum de clics, vous permettant de gagner du temps sur vos taches quotidiennes.',
    faq: [
      { q: 'Combien de pourboire laisser au restaurant ?', a: 'En France, le pourboire n\'est pas obligatoire mais 5 à 10% est courant pour bon service. Aux États-Unis, 15 à 20% est la norme. Au Maroc, 5 à 10% est apprécié.' },
      { q: 'Comment répartir l\'addition entre plusieurs personnes ?', a: 'Entrez le montant total et le nombre de personnes. L\'outil calcule la part de chacun, incluant le pourboire.' },
      { q: 'Puis-je personnaliser le pourcentage de pourboire ?', a: 'Oui, en plus des pourcentages prédéfinis (15%, 18%, 20%), vous pouvez saisir n\'importe quel montant ou pourcentage personnalisé.' },
      { q: 'L\'outil fonctionne-t-il avec différentes devises ?', a: 'Oui, le calcul est indépendant de la devise. Entrez simplement le montant dans la devise de votre choix.' }
    ],
    howTo: ['Entrez le montant de l\'addition', 'Choisissez le pourcentage de pourboire', 'Indiquez le nombre de personnes', 'Le total par personne s\'affiche instantanément'],
    relatedSlugs: ['calculateur-pourcentage', 'calculateur-tva', 'calculateur-frais-kilometriques'],
  },
  'calculateur-remise': {
    toolId: 'discount-calculator', category: 'calculators', slug: 'calculateur-remise',
    title: 'Calculateur de Remise en Ligne Gratuit — Prix après Réduction',
    desc: 'Calculez instantanément le prix après remise, l\'économie réalisée ou le pourcentage de réduction. Remises simples et doubles. Gratuit, sans inscription.',
    h1: 'Calculateur de remise : prix après réduction',
    intro: 'Calculez en un instant le prix final après une remise ou déterminez le pourcentage de réduction à partir du prix original et du prix payé. Cet outil gratuit prend en charge les remises simples et les doubles remises (soldes cumulatives), très courantes lors des périodes de promotions. Parfait pour les achats en ligne, les soldes, les négociations commerciales ou la vérification d\'une facture. La double remise est particulièrement utile lorsque deux promotions se cumulent, par exemple -30% puis -20% supplémentaires : la remise effective n\'est pas 50% mais 44%, car la seconde remise s\'applique sur le prix déjà réduit. L\'outil calcule automatiquement la remise effective globale, vous permettant de comprendre facilement l\'économie réelle. Vous pouvez aussi utiliser le mode inverse pour retrouver le pourcentage de remise à partir du prix original et du prix final. Tout le traitement s\'effectue localement dans votre navigateur : aucune donnée n\'est envoyée à un serveur. Le service est entièrement gratuit et sans inscription.',
    faq: [
      { q: 'Comment calculer une remise en pourcentage ?', a: 'Pour calculer le prix après remise : Prix final = Prix original × (1 - remise/100). Par exemple, un article à 80 € avec 25% de remise : 80 × 0,75 = 60 €.' },
      { q: 'Comment calculer le pourcentage de remise à partir du prix initial et final ?', a: 'Pourcentage de remise = ((Prix original - Prix final) / Prix original) × 100. Par exemple, de 100 € à 70 € : ((100-70)/100) × 100 = 30%.' },
      { q: 'Comment fonctionne une double remise ?', a: 'La deuxième remise s\'applique sur le prix déjà réduit, pas sur le prix original. Par exemple, -30% puis -20% : après la première remise, le prix est à 70% du prix original. La deuxième remise de 20% s\'applique sur ce prix réduit, soit 70% × 80% = 56% du prix original. La remise effective est donc 44%, pas 50%.' },
      { q: 'L\'outil est-il gratuit ?', a: 'Oui, l\'outil est 100% gratuit et sans inscription. Aucune limite d\'utilisation, aucun filigrane, aucune collecte de données.' },
      { q: 'Puis-je utiliser le calculateur pour d\'autres devises que l\'euro ?', a: 'Oui, le calcul est indépendant de la devise. Entrez simplement le montant dans la devise de votre choix, les résultats seront dans la même devise.' }
    ],
    howTo: ['Entrez le prix original de l\'article', 'Saisissez le pourcentage de remise ou utilisez les préréglages (5%, 10%, 20%, 30%…)', 'Les résultats affichent l\'économie, le prix final et le pourcentage de réduction', 'Pour une double remise, passez à l\'onglet "Double remise" et saisissez les deux pourcentages'],
    relatedSlugs: ['calculateur-pourcentage', 'calculateur-tva', 'calculateur-pourboire'],
  },
  'convertisseur-temps': {
    toolId: 'time-converter', category: 'calculators', slug: 'convertisseur-temps',
    title: 'Convertisseur de Temps en Ligne Gratuit — Secondes, Minutes, Heures, Jours',
    desc: 'Convertissez instantanément entre secondes, minutes, heures, jours, semaines, mois et années. Gratuit, sans inscription, 100% local.',
    h1: 'Convertisseur de temps : secondes, minutes, heures, jours',
    intro: 'Convertissez facilement une durée entre toutes les unités de temps : secondes, minutes, heures, jours, semaines, mois et années. Entrez une valeur dans n\'importe quelle unité et obtenez instantanément la conversion dans toutes les autres. Parfait pour calculer des durées de projet, convertir des temps de travail, planifier des événements ou simplement comprendre une durée exprimée dans une unité différente. Les conversions utilisent les valeurs standards : 1 minute = 60 secondes, 1 heure = 60 minutes, 1 jour = 24 heures, 1 semaine = 7 jours, 1 mois = 30,44 jours (moyenne), 1 an = 365,25 jours (moyenne incluant les années bissextiles). Le calcul s\'effectue localement dans votre navigateur. Le service est gratuit et sans inscription. Cet outil en ligne ne necessite aucune installation : il fonctionne directement dans votre navigateur web sur ordinateur, tablette ou smartphone. L\'interface est concue pour etre intuitive et accessible a tous, sans connaissance technique requise.',
    faq: [
      { q: 'Comment convertir des heures en minutes ?', a: 'Multipliez le nombre d\'heures par 60. Par exemple, 2,5 heures = 2,5 × 60 = 150 minutes.' },
      { q: 'Comment convertir des secondes en heures ?', a: 'Divisez le nombre de secondes par 3600. Par exemple, 7200 secondes = 7200 / 3600 = 2 heures.' },
      { q: 'Combien de secondes dans une journée ?', a: 'Une journée de 24 heures contient 86 400 secondes (24 × 60 × 60).' },
      { q: 'Comment sont calculés les mois et années ?', a: 'Un mois est calculé comme 30,44 jours en moyenne (365,25 / 12) et une année comme 365,25 jours (incluant les années bissextiles).' },
    ],
    howTo: ['Sélectionnez l\'unité source (secondes, minutes, heures, etc.)', 'Entrez la valeur à convertir', 'Tous les résultats s\'affichent instantanément dans chaque unité'],
    relatedSlugs: ['convertisseur-unites', 'chronometre', 'calculateur-age'],
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

/** Locale-specific slug mappings: base slug → locale slug */
const localeSlugMap: Record<string, Record<string, string>> = {
  'compresser-pdf': { ar: 'ضغط-pdf', de: 'pdf-komprimieren', en: 'compress-pdf', es: 'comprimir-pdf', pt: 'comprimir-pdf' },
  'fusionner-pdf': { ar: 'دمج-pdf', de: 'pdf-zusammenfuegen', en: 'merge-pdf', es: 'fusionar-pdf', pt: 'juntar-pdf' },
  'pdf-en-images': { ar: 'pdf-الى-صور', de: 'pdf-zu-bildern', en: 'pdf-to-images', es: 'pdf-a-imagenes', pt: 'pdf-para-imagens' },
  'signer-pdf': { ar: 'توقيع-pdf', de: 'pdf-signieren', en: 'sign-pdf', es: 'firmar-pdf', pt: 'assinar-pdf' },
  'deverrouiller-pdf': { ar: 'فتح-pdf', de: 'pdf-entsperren', en: 'unlock-pdf', es: 'desbloquear-pdf', pt: 'desbloquear-pdf' },
  'proteger-pdf': { ar: 'حماية-pdf', de: 'pdf-schuetzen', en: 'protect-pdf', es: 'proteger-pdf', pt: 'proteger-pdf' },
  'convertir-image': { ar: 'تحويل-صورة', de: 'bild-konvertieren', en: 'convert-image', es: 'convertir-imagen', pt: 'converter-imagem' },
  'compresser-image': { ar: 'ضغط-صورة', de: 'bild-komprimieren', en: 'compress-image', es: 'comprimir-imagen', pt: 'comprimir-imagem' },
  'redimensionner-image': { ar: 'تغيير-حجم-صورة', de: 'bild-groesse', en: 'resize-image', es: 'redimensionar-imagen', pt: 'redimensionar-imagem' },
  'supprimer-arriere-plan': { ar: 'ازالة-خلفية', de: 'hintergrund-entfernen', en: 'remove-background', es: 'eliminar-fondo', pt: 'remover-fundo' },
  'heic-vers-jpg': { ar: 'heic-الى-jpg', de: 'heic-zu-jpg', en: 'heic-to-jpg', es: 'heic-a-jpg', pt: 'heic-para-jpg' },
  'ocr-image': { ar: 'نص-الصورة', de: 'bild-ocr', en: 'image-ocr', es: 'ocr-imagen', pt: 'ocr-imagem' },
  'generateur-favicon': { ar: 'مولد-فاڤيكون', de: 'favicon-generator', en: 'favicon-generator', es: 'generador-favicon', pt: 'gerador-favicon' },
  'telecharger-miniature-youtube': { ar: 'صورة-يوتيوب', de: 'youtube-vorschaubild', en: 'youtube-thumbnail', es: 'miniatura-youtube', pt: 'miniatura-youtube' },
  'decouper-video': { ar: 'قص-الفيديو', de: 'video-schneiden', en: 'trim-video', es: 'recortar-video', pt: 'cortar-video' },
  'compresser-video': { ar: 'ضغط-الفيديو', de: 'video-komprimieren', en: 'compress-video', es: 'comprimir-video', pt: 'comprimir-video' },
  'convertir-video': { ar: 'تحويل-فيديو', de: 'video-konvertieren', en: 'convert-video', es: 'convertir-video', pt: 'converter-video' },
  'ajouter-audio-video': { ar: 'اضافة-صوت-للفيديو', de: 'audio-zu-video', en: 'add-audio-to-video', es: 'anadir-audio-video', pt: 'adicionar-audio-video' },
  'extraire-audio-video': { ar: 'استخراج-صوت-من-فيديو', de: 'audio-aus-video', en: 'extract-audio-from-video', es: 'extraer-audio-video', pt: 'extrair-audio-video' },
  'video-en-gif': { ar: 'فيديو-الى-جيف', de: 'video-zu-gif', en: 'video-to-gif', es: 'video-a-gif', pt: 'video-para-gif' },
  'supprimer-audio-video': { ar: 'ازالة-صوت-من-فيديو', de: 'audio-aus-video-entfernen', en: 'remove-audio-from-video', es: 'eliminar-audio-video', pt: 'remover-audio-video' },
  'json-csv': { ar: 'json-csv', de: 'json-csv', en: 'json-csv', es: 'json-csv', pt: 'json-csv' },
  'testeur-regex': { ar: 'اختبار-ريجكس', de: 'regex-tester', en: 'regex-tester', es: 'probador-regex', pt: 'testador-regex' },
  'meta-tags': { fr: 'meta-tags', en: 'meta-tags', ar: 'meta-tags', de: 'meta-tags', es: 'meta-tags', pt: 'meta-tags' },
  'sitemap-robots': { fr: 'sitemap-robots', en: 'sitemap-robots', ar: 'sitemap-robots', de: 'sitemap-robots', es: 'sitemap-robots', pt: 'sitemap-robots' },
  'formateur-json': { ar: 'منسق-جسون', de: 'json-formatierer', en: 'json-formatter', es: 'formateador-json', pt: 'formatador-json' },
  'url-encode-decode': { ar: 'url-ترميز-فك', de: 'url-kodieren-dekodieren', en: 'url-encode-decode', es: 'url-codificar-decodificar', pt: 'url-codificar-decodificar' },
  'css-gradient': { fr: 'css-gradient', en: 'css-gradient', ar: 'css-gradient', de: 'css-gradient', es: 'css-gradient', pt: 'css-gradient' },
  'markdown-preview': { fr: 'markdown-preview', en: 'markdown-preview', ar: 'markdown-preview', de: 'markdown-preview', es: 'markdown-preview', pt: 'markdown-preview' },
  'nettoyeur-url-tracking': { ar: 'منظف-الروابط', de: 'url-bereiniger', en: 'url-cleaner', es: 'limpiador-url', pt: 'limpador-url' },
  'compteur-mots': { ar: 'عداد-الكلمات', de: 'wortzaehler', en: 'word-counter', es: 'contador-palabras', pt: 'contador-palavras' },
  'convertisseur-casse': { ar: 'محول-الحالة', de: 'gross-klein-konverter', en: 'case-converter', es: 'conversor-mayusculas', pt: 'conversor-maiusculas' },
  'lorem-ipsum': { fr: 'lorem-ipsum', en: 'lorem-ipsum', ar: 'lorem-ipsum', de: 'lorem-ipsum', es: 'lorem-ipsum', pt: 'lorem-ipsum' },
  'base64': { ar: 'base64-ترميز-فك', de: 'base64-kodieren-dekodieren', en: 'base64-encode-decode', es: 'base64-codificar-decodificar', pt: 'base64-codificar-decodificar' },
  'comparateur-texte': { ar: 'فحص-الفروق', de: 'text-diff-pruefer', en: 'text-diff-checker', es: 'comparador-texto', pt: 'comparador-texto' },
  'separateur-nom-prenom': { ar: 'فاصل-الاسماء', de: 'namen-trennen', en: 'name-splitter', es: 'separador-nombres', pt: 'separador-nomes' },
  'generateur-qr-code': { ar: 'مولد-كيو-ار', de: 'qr-code-generator', en: 'qr-code-generator', es: 'generador-qr', pt: 'gerador-qr' },
  'generateur-mot-de-passe': { ar: 'مولد-كلمات-المرور', de: 'passwort-generator', en: 'password-generator', es: 'generador-contrasena', pt: 'gerador-senha' },
  'generateur-hash': { ar: 'مولد-هاش', de: 'hash-generator', en: 'hash-generator', es: 'generador-hash', pt: 'gerador-hash' },
  'color-picker': { fr: 'color-picker', en: 'color-picker', ar: 'color-picker', de: 'color-picker', es: 'color-picker', pt: 'color-picker' },
  'generateur-lien-whatsapp': { ar: 'رابط-واتساب', de: 'whatsapp-link', en: 'whatsapp-link', es: 'enlace-whatsapp', pt: 'link-whatsapp' },
  'generateur-uuid-guid': { ar: 'مولد-uuid', de: 'uuid-generator', en: 'uuid-generator', es: 'generador-uuid', pt: 'gerador-uuid' },
  'generateur-nombres-aleatoires': { fr: 'generateur-nombres-aleatoires', en: 'random-number-generator', ar: 'مولد-ارقام-عشوائية', de: 'zufallszahlen-generator', es: 'generador-numeros-aleatorios', pt: 'gerador-numeros-aleatorios' },
  'convertisseur-couleurs': { ar: 'محول-الالوان', de: 'farbkonverter', en: 'color-converter', es: 'conversor-colores', pt: 'conversor-cores' },
  'calculateur-imc': { ar: 'حاسبة-معدل-الكتلة', de: 'bmi-rechner', en: 'bmi-calculator', es: 'calculadora-imc', pt: 'calculadora-imc' },
  'calculateur-age': { ar: 'حاسبة-العمر', de: 'altersrechner', en: 'age-calculator', es: 'calculadora-edad', pt: 'calculadora-idade' },
  'calculateur-pourcentage': { ar: 'حاسبة-النسبة', de: 'prozentrechner', en: 'percentage-calculator', es: 'calculadora-porcentaje', pt: 'calculadora-porcentagem' },
  'convertisseur-unites': { ar: 'محول-الوحدات', de: 'einheitenumrechner', en: 'unit-converter', es: 'conversor-unidades', pt: 'conversor-unidades' },
  'calculateur-dosage-beton': { ar: 'حاسبة-الخرسانة', de: 'betonrechner', en: 'concrete-calculator', es: 'calculadora-hormigon', pt: 'calculadora-concreto' },
  'calculateur-frais-kilometriques': { ar: 'حاسبة-المسافات', de: 'kilometerpauschale-rechner', en: 'mileage-calculator', es: 'calculadora-kilometraje', pt: 'calculadora-quilometragem' },
  'chronometre': { ar: 'ساعة-ايقاف', de: 'stoppuhr', en: 'stopwatch', es: 'cronometro', pt: 'cronometro' },
  'timer-pomodoro': { ar: 'مؤقت-بومودورو', de: 'pomodoro-timer', en: 'pomodoro-timer', es: 'temporizador-pomodoro', pt: 'temporizador-pomodoro' },
  'calculateur-tva': { ar: 'حاسبة-الضريبة', de: 'mehrwertsteuer-rechner', en: 'vat-calculator', es: 'calculadora-iva', pt: 'calculadora-iva' },
  'calculateur-pourboire': { ar: 'حاسبة-البقشيش', de: 'trinkgeldrechner', en: 'tip-calculator', es: 'calculadora-propina', pt: 'calculadora-gorjeta' },
  'calculateur-remise': { ar: 'حاسبة-الخصم', de: 'rabattrechner', en: 'discount-calculator', es: 'calculadora-descuento', pt: 'calculadora-desconto' },
  'convertisseur-temps': { ar: 'محول-الوقت', de: 'zeitumrechner', en: 'time-converter', es: 'conversor-tiempo', pt: 'conversor-tempo' },
}
/** Get locale-specific slug for a base slug */
export function getSlugForLocale(baseSlug: string, locale: string): string {
  if (locale === 'fr') return baseSlug
  const localeSlugs = localeSlugMap[baseSlug]
  if (localeSlugs && localeSlugs[locale]) return localeSlugs[locale]
  return baseSlug
}

/** Reverse lookup: locale-specific slug → base slug */
const reverseSlugMap: Record<string, string> = {}
for (const [baseSlug, localeMap] of Object.entries(localeSlugMap)) {
  reverseSlugMap[baseSlug] = baseSlug
  for (const [locale, localeSlug] of Object.entries(localeMap)) {
    if (localeSlug !== baseSlug) {
      reverseSlugMap[localeSlug] = baseSlug
    }
  }
}

/** Resolve any slug (locale-specific or base) to its base form */
export function resolveSlugToBase(slug: string): string {
  return reverseSlugMap[slug] || slug
}

/** Get the URL path for a tool in a specific locale (using toolId) */
/** Map toolId to locale-specific path object */
export function getPathForLocale(toolId: string, locale: string): { category: string; slug: string } | undefined {
  const entry = toolIdToPath[toolId]
  if (!entry) return undefined
  const slug = getSlugForLocale(entry.slug, locale)
  return { category: entry.category, slug }
}
