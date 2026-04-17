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
    intro: 'Notre compresseur PDF en ligne vous permet de reduire la taille de vos fichiers PDF de maniere significative, jusqu\'a 80% dans la plupart des cas, et ce entierement gratuitement. L\'outil fonctionne directement dans votre navigateur web, sans qu\'aucun fichier ne soit envoye sur un serveur distant. Votre vie privee est ainsi parfaitement respectee : vos documents confidentiels restent sur votre appareil a tout moment. Que vous ayez besoin d\'envoyer un PDF par email, de le telecharger sur un site web ou de liberer de l\'espace de stockage, notre solution repond a tous ces besoins. Le processus de compression utilise des algorithmes avances qui eliminent les donnees redondantes et optimisent les images integrees, tout en preservant une qualite visuelle quasi identique a l\'original. Vous pouvez choisir entre plusieurs niveaux de compression selon vos besoins : compression legere pour une qualite maximale, ou compression forte pour une reduction de taille optimale. L\'interface intuitive vous permet de glisser-deposer votre fichier, de selectionner le niveau souhaite et de telecharger le resultat en quelques secondes. Aucune inscription n\'est requise et il n\'y a aucune limite d\'utilisation. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Comment compresser un PDF gratuitement ?', a: 'Glissez-deposez votre fichier PDF dans la zone de depot ci-dessus, choisissez le niveau de compression souhaite, puis telechargez le resultat. Tout est gratuit et sans inscription.' },
      { q: 'Mes fichiers sont-ils en securite ?', a: 'Oui, a 100%. Le traitement se fait entierement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs ni stocke en ligne.' },
      { q: 'Quelle est la taille maximale autorisee ?', a: 'Comme tout est traite en local, il n\'y a pas de limite stricte. La seule limitation est la memoire de votre appareil.' },
      { q: 'La compression degrade-t-elle la qualite ?', a: 'En compression legere, la perte est imperceptible. En compression forte, une legere reduction peut etre visible sur les images haute resolution.' },
    ],
    howTo: ['Glissez votre fichier PDF dans la zone de depot ou cliquez pour selectionner', 'Choisissez le niveau de compression : legere, moyenne ou forte', 'Cliquez sur Compresser et attendez le traitement', 'Telechargez votre fichier compresse'],
    relatedSlugs: ['fusionner-pdf', 'proteger-pdf', 'deverrouiller-pdf'],
  },
  'fusionner-pdf': {
    toolId: 'pdf-merge', category: 'pdf', slug: 'fusionner-pdf',
    title: 'Fusionner PDF en Ligne Gratuit — Combiner Plusieurs PDF',
    desc: 'Fusionnez plusieurs fichiers PDF en un seul document en quelques secondes. Gratuit, sans inscription, traitement local.',
    h1: 'Fusionner plusieurs PDF en un seul fichier',
    intro: 'Fusionnez plusieurs fichiers PDF en un seul document en quelques clics avec notre outil de fusion PDF en ligne. Que vous ayez besoin d\'assembler des factures, combiner des rapports ou regrouper des documents administratifs, notre solution gratuite et sans inscription vous permet de creer un PDF unique a partir de multiples fichiers. L\'interface intuitive offre une fonctionnalite de glisser-deposer pour reorganiser facilement l\'ordre des fichiers avant la fusion. Tout le traitement s\'effectue directement dans votre navigateur, garantissant que vos documents ne quittent jamais votre appareil. Cela signifie qu\'aucune donnee n\'est transferee vers un serveur externe, assurant une confidentialite totale. L\'outil prend en charge la fusion de deux fichiers comme de dizaines de documents, sans aucune restriction sur le nombre ou la taille. Le resultat est un PDF proprement structure qui conserve la mise en page, les polices et les images de chaque document original. Vous pouvez ensuite telecharger le fichier fusionne instantanement. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Comment fusionner des PDF en ligne ?', a: 'Ajoutez vos fichiers PDF dans l\'outil, reorganisez-les dans l\'ordre souhaite par glisser-deposer, puis cliquez sur Fusionner.' },
      { q: 'Combien de fichiers puis-je fusionner ?', a: 'Il n\'y a aucune limite. Vous pouvez en combiner autant que vous le souhaitez, la contrainte etant la memoire de votre appareil.' },
      { q: 'Puis-je reorganiser les pages avant de fusionner ?', a: 'Oui, l\'interface vous permet de glisser-deposer les fichiers pour changer l\'ordre avant la fusion finale.' },
    ],
    howTo: ['Ajoutez vos fichiers PDF par glisser-deposer ou selection', 'Reorganisez l\'ordre des fichiers selon vos besoins', 'Cliquez sur Fusionner pour combiner les documents', 'Telechargez le PDF fusionne'],
    relatedSlugs: ['compresser-pdf', 'pdf-en-images', 'signer-pdf'],
  },
  'pdf-en-images': {
    toolId: 'pdf-convert', category: 'pdf', slug: 'pdf-en-images',
    title: 'Convertir PDF en Images JPG PNG en Ligne Gratuit',
    desc: 'Convertissez chaque page de votre PDF en image JPG ou PNG haute qualité. Gratuit et sans inscription.',
    h1: 'Convertir un PDF en images JPG ou PNG',
    intro: 'Convertissez chaque page de vos documents PDF en images JPG ou PNG haute resolution avec notre convertisseur en ligne gratuit. Cet outil est ideal pour extraire des pages de PDF afin de les integrer dans des presentations, les partager sur les reseaux sociaux ou les editer dans un logiciel de retouche photo. Le traitement s\'effectue entierement dans votre navigateur, sans aucun envoi de fichiers vers un serveur distant. Vous pouvez choisir entre le format JPG pour des fichiers legers ou le format PNG pour une qualite maximale avec transparence. Chaque page du PDF est convertie individuellement, vous permettant de telecharger soit toutes les pages en une archive ZIP, soit des pages specifiques selon vos besoins. La resolution de sortie est configurable, de 72 DPI pour le web a 300 DPI pour l\'impression professionnelle. L\'outil fonctionne avec tous les types de PDF : documents texte, formulaires, presentations et fichiers graphiques. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'En quel format seront mes images ?', a: 'Vous pouvez choisir entre JPG pour des fichiers legers adaptes au web, et PNG pour une qualite maximale avec transparence.' },
      { q: 'La qualite est-elle bonne ?', a: 'Oui, les images sont generees en haute resolution. Vous pouvez configurer la resolution de sortie jusqu\'a 300 DPI pour l\'impression.' },
      { q: 'Puis-je convertir uniquement certaines pages ?', a: 'Oui, l\'outil vous permet de selectionner les pages specifiques a convertir plutot que l\'integralite du document.' },
    ],
    howTo: ['Chargez votre fichier PDF dans l\'outil', 'Choisissez le format de sortie (JPG ou PNG) et la resolution', 'Selectionnez les pages a convertir ou toutes les pages', 'Telechargez les images generees individuellement ou en ZIP'],
    relatedSlugs: ['compresser-pdf', 'fusionner-pdf', 'convertir-image'],
  },
  'signer-pdf': {
    toolId: 'pdf-sign', category: 'pdf', slug: 'signer-pdf',
    title: 'Signer PDF en Ligne Gratuit — Signature Électronique',
    desc: 'Signez et annotez vos documents PDF directement dans le navigateur. Dessinez ou tapez votre signature. 100% gratuit.',
    h1: 'Signer un document PDF en ligne',
    intro: 'Signez vos documents PDF directement dans votre navigateur avec notre outil de signature electronique gratuit. Plus besoin d\'imprimer, signer manuellement puis scanner : dessinez votre signature a main levee ou saisissez-la au clavier, puis positionnez-la exactement la ou vous le souhaitez sur le document. L\'outil est parfait pour les contrats, les bons de commande et les formulaires administratifs. Vous pouvez egalement ajouter la date de signature et du texte libre. Tout le traitement s\'effectue localement dans votre navigateur, garantissant que vos documents signes ne sont jamais envoyes sur un serveur externe. L\'interface vous permet de redimensionner et deplacer votre signature avec precision, de signer plusieurs endroits du meme document et d\'enregistrer votre signature pour une reutilisation ulterieure. Aucune inscription n\'est requise. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Ma signature est-elle juridiquement valide ?', a: 'Notre outil cree une signature simple. Pour une valeur juridique renforcee conformement au reglement eIDAS, consultez un service certifie.' },
      { q: 'Puis-je sauvegarder ma signature ?', a: 'Oui, vous pouvez enregistrer votre signature dans le navigateur pour la reutiliser rapidement sur vos prochains documents.' },
      { q: 'Comment positionner la signature ?', a: 'Apres avoir cree votre signature, cliquez a l\'endroit souhaite sur le document. Vous pouvez ensuite la redimensionner et la deplacer.' },
    ],
    howTo: ['Chargez votre document PDF', 'Dessinez votre signature a main levee ou saisissez-la au clavier', 'Positionnez et redimensionnez la signature sur le document', 'Telechargez le PDF signe'],
    relatedSlugs: ['compresser-pdf', 'proteger-pdf', 'fusionner-pdf'],
  },
  'deverrouiller-pdf': {
    toolId: 'pdf-unlock', category: 'pdf', slug: 'deverrouiller-pdf',
    title: 'Déverrouiller PDF en Ligne Gratuit — Retirer Mot de Passe',
    desc: 'Retirez le mot de passe de protection de vos fichiers PDF facilement. Gratuit et 100% dans votre navigateur.',
    h1: 'Déverrouiller un PDF protégé par mot de passe',
    intro: 'Supprimez la protection par mot de passe de vos fichiers PDF avec notre outil de deverrouillage en ligne gratuit. Si vous possedez un document protege dont vous connaissez le mot de passe mais que vous souhaitez retirer cette contrainte, cet outil est fait pour vous. Le processus est simple : vous fournissez le mot de passe actuel et l\'outil cree une copie du PDF sans protection. Le traitement s\'effectue entierement dans votre navigateur, vos fichiers restent sur votre appareil. L\'outil prend en charge les protections par mot de passe d\'ouverture et les restrictions d\'impression, de copie ou de modification. Attention : cet outil ne permet pas de contourner un mot de passe que vous ne connaissez pas, il sert uniquement a retirer la protection d\'un document dont vous avez legitimement le mot de passe. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Puis-je deverrouiller un PDF dont je ne connais pas le mot de passe ?', a: 'Non, cet outil permet uniquement de retirer la protection d\'un PDF dont vous connaissez deja le mot de passe.' },
      { q: 'Le fichier original est-il modifie ?', a: 'Non, l\'outil cree une nouvelle copie sans protection. Le fichier original reste intact.' },
      { q: 'Quels types de protection sont retires ?', a: 'L\'outil retire la protection par mot de passe d\'ouverture et les restrictions sur l\'impression, la copie et la modification.' },
    ],
    howTo: ['Chargez votre fichier PDF protege', 'Saisissez le mot de passe actuel du document', 'Cliquez sur Deverrouiller pour retirer la protection', 'Telechargez le PDF sans mot de passe'],
    relatedSlugs: ['proteger-pdf', 'compresser-pdf', 'fusionner-pdf'],
  },
  'proteger-pdf': {
    toolId: 'pdf-protect', category: 'pdf', slug: 'proteger-pdf',
    title: 'Protéger PDF avec Mot de Passe en Ligne Gratuit',
    desc: 'Ajoutez un mot de passe à votre PDF pour le sécuriser. Chiffrement AES, traitement 100% local.',
    h1: 'Protéger un PDF avec un mot de passe',
    intro: 'Securisez vos documents PDF en leur ajoutant une protection par mot de passe avec notre outil gratuit en ligne. Que vous souhaitiez partager des informations confidentielles ou restreindre l\'acces a vos fichiers, notre solution vous permet d\'ajouter un chiffrement AES-256 a vos PDF en quelques secondes. Le processus est entierement realise dans votre navigateur, sans envoi de donnees vers un serveur. Vous pouvez choisir de proteger l\'ouverture du document ou restreindre certaines actions comme l\'impression, la copie ou la modification. Le chiffrement AES-256 est le meme standard utilise par les banques et les gouvernements, assurant une securite maximale pour vos documents les plus sensibles. Aucune inscription n\'est requise. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Quel type de chiffrement est utilise ?', a: 'Le chiffrement AES-256 est utilise, le meme standard que les banques et les gouvernements.' },
      { q: 'Puis-je restreindre uniquement l\'impression ou la copie ?', a: 'Oui, vous pouvez configurer des permissions detaillees : autoriser la lecture mais restreindre l\'impression ou la modification.' },
      { q: 'Que se passe-t-il si j\'oublie le mot de passe ?', a: 'Il n\'existe aucun moyen de recuperer un mot de passe oublie. Notez-le dans un endroit sur avant de proteger votre document.' },
    ],
    howTo: ['Chargez votre fichier PDF dans l\'outil', 'Definissez un mot de passe solide', 'Choisissez les permissions : lecture seule, impression autorisee, etc.', 'Telechargez le PDF protege et chiffre'],
    relatedSlugs: ['deverrouiller-pdf', 'compresser-pdf', 'signer-pdf'],
  },
  // ─── IMAGE ──────────────────────────────────────────────────────────
  'convertir-image': {
    toolId: 'img-convert', category: 'image', slug: 'convertir-image',
    title: 'Convertisseur d\'Images en Ligne Gratuit — WebP, AVIF, JPG, PNG',
    desc: 'Convertissez vos images entre WebP, AVIF, JPG et PNG gratuitement. Traitement ultra-rapide 100% dans votre navigateur.',
    h1: 'Convertir vos images en WebP, AVIF, JPG ou PNG',
    intro: 'Convertissez vos images entre differents formats en un clic avec notre convertisseur d\'images en ligne gratuit. L\'outil prend en charge PNG, JPG, WEBP, BMP, GIF, SVG, TIFF et d\'autres. Que vous ayez besoin de transformer un PNG en JPG pour reduire la taille, convertir un WEBP en PNG pour la compatibilite, ou transformer un SVG en image bitmap, notre solution repond a tous vos besoins. Le traitement est entierement realise dans votre navigateur, sans envoi de vos images vers un serveur. L\'interface simple vous permet de charger une ou plusieurs images, de choisir le format de sortie et la qualite, puis de telecharger les fichiers convertis. Vous pouvez egalement ajuster la qualite de compression pour JPG et WEBP, et choisir de conserver ou non la transparence pour PNG. Aucune inscription n\'est requise. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Quels formats d\'image sont pris en charge ?', a: 'PNG, JPG, WEBP, BMP, GIF, SVG, TIFF et d\'autres formats mineurs.' },
      { q: 'La conversion modifie-t-elle la qualite ?', a: 'Vers JPG ou WEBP, le niveau de qualite est reglable. Vers PNG ou BMP, la qualite originale est conservee sans perte.' },
      { q: 'Puis-je convertir plusieurs images a la fois ?', a: 'Oui, la conversion par lot est supportee. Chargez plusieurs images et convertissez-les toutes en un seul clic.' },
    ],
    howTo: ['Chargez votre image ou vos images', 'Choisissez le format de sortie souhaite', 'Ajustez la qualite si necessaire', 'Telechargez les images converties'],
    relatedSlugs: ['compresser-image', 'redimensionner-image', 'heic-vers-jpg'],
  },
  'compresser-image': {
    toolId: 'img-compress', category: 'image', slug: 'compresser-image',
    title: 'Compresser Image en Ligne Gratuit — Réduire Poids Photo',
    desc: 'Optimisez le poids de vos images JPG, PNG, WebP sans perte de qualité visible. Gratuit et traitement local.',
    h1: 'Compresser vos images en ligne',
    intro: 'Reduisez la taille de vos images sans perte de qualite visible grace a notre compresseur d\'images en ligne gratuit. L\'outil utilise des algorithmes avances qui optimisent vos fichiers JPG, PNG et WEBP en eliminant les metadonnees inutiles et en appliquant une compression intelligente. Ideal pour accelerer le chargement de votre site web, envoyer des photos par email ou economiser de l\'espace de stockage. Tout le traitement s\'effectue localement dans votre navigateur. Vous pouvez charger plusieurs images, choisir le niveau de compression et visualiser un apercu avant-apres pour comparer la qualite. L\'outil affiche egalement le taux de compression et l\'economie d\'espace realisee. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Quelle reduction de taille puis-je obtenir ?', a: 'De 30% a 80% selon le type d\'image et le niveau de compression choisi.' },
      { q: 'La compression est-elle avec ou sans perte ?', a: 'Les deux modes sont disponibles : sans perte (retrait des metadonnees) et avec perte reglable pour une reduction maximale.' },
      { q: 'Puis-je comparer le resultat avant de telecharger ?', a: 'Oui, l\'outil affiche un apercu avant-apres avec le taux de compression et la difference de taille.' },
    ],
    howTo: ['Chargez une ou plusieurs images', 'Choisissez le niveau de compression', 'Apercez le resultat avant-apres', 'Telechargez les images compressees'],
    relatedSlugs: ['convertir-image', 'redimensionner-image', 'compresser-pdf'],
  },
  'redimensionner-image': {
    toolId: 'img-resize', category: 'image', slug: 'redimensionner-image',
    title: 'Redimensionner Image en Ligne Gratuit — Changer Taille Photo',
    desc: 'Redimensionnez vos images aux dimensions exactes en pixels ou en pourcentage. Gratuit et sans inscription.',
    h1: 'Redimensionner une image en ligne',
    intro: 'Redimensionnez vos images facilement avec notre outil de redimensionnement en ligne gratuit. Que vous ayez besoin de reduire la taille d\'une photo pour l\'envoyer par email, agrandir une image pour une impression ou ajuster les dimensions pour un site web, notre solution vous permet de modifier la largeur et la hauteur en quelques clics. Vous pouvez redimensionner en specifiant des dimensions exactes en pixels, en pourcentage, ou en utilisant des proportions predefinies adaptees aux reseaux sociaux. L\'outil preserve le ratio d\'aspect par defaut pour eviter toute deformation, mais vous pouvez le desactiver. Tout le traitement s\'effectue dans votre navigateur sans envoi de donnees vers un serveur. L\'outil prend en charge JPG, PNG, WEBP et BMP. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Comment eviter la deformation ?', a: 'Par defaut, le ratio d\'aspect est verrouille. Modifiez la largeur et la hauteur s\'ajuste automatiquement.' },
      { q: 'Puis-je redimensionner plusieurs images a la fois ?', a: 'Oui, chargez plusieurs images et definissez les dimensions souhaitees. Toutes seront redimensionnees aux memes dimensions.' },
      { q: 'L\'agrandissement degrade-t-il la qualite ?', a: 'L\'agrandissement peut reduire la nettete. Pour de meilleurs resultats, utilisez des images source de haute resolution.' },
    ],
    howTo: ['Chargez votre image dans l\'outil', 'Entrez les nouvelles dimensions en pixels ou en pourcentage', 'Activez ou desactivez le verrouillage du ratio d\'aspect', 'Telechargez l\'image redimensionnee'],
    relatedSlugs: ['compresser-image', 'convertir-image', 'supprimer-arriere-plan'],
  },
  'supprimer-arriere-plan': {
    toolId: 'img-bgremove', category: 'image', slug: 'supprimer-arriere-plan',
    title: 'Supprimer Arrière-Plan Image en Ligne Gratuit — Détourage Auto',
    desc: 'Retirez l\'arrière-plan de vos images automatiquement grâce à l\'IA. Gratuit, sans inscription et rapide.',
    h1: 'Supprimer l\'arrière-plan d\'une image automatiquement',
    intro: 'Supprimez automatiquement l\'arriere-plan de vos images grace a notre outil de suppression de fond en ligne gratuit. Utilisant des algorithmes d\'intelligence artificielle avances, l\'outil detecte le sujet principal et elimine l\'arriere-plan avec precision, meme sur des images complexes avec des cheveux ou des contours irreguliers. Le resultat est une image PNG transparente utilisable pour des logos, montages photo ou visuels professionnels. Tout le traitement s\'effectue dans votre navigateur, sans envoi de vos images vers un serveur. Vous pouvez affiner le resultat en ajustant le seuil de detection ou en utilisant l\'outil de gomme pour les zones residuelles. L\'outil prend en charge JPG, PNG et WEBP en entree et produit toujours un PNG transparent. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'L\'outil fonctionne-t-il sur toutes les images ?', a: 'Il fonctionne mieux avec un contraste eleve entre le sujet et l\'arriere-plan. Les images a fond uni donnent les meilleurs resultats.' },
      { q: 'Puis-je affiner le resultat manuellement ?', a: 'Oui, apres la suppression automatique, utilisez la gomme pour les zones residuelles et l\'outil de restauration pour corriger.' },
      { q: 'Quel est le format du fichier de sortie ?', a: 'Le resultat est toujours un PNG avec transparence, quel que soit le format d\'entree.' },
    ],
    howTo: ['Chargez votre image dans l\'outil', 'L\'IA detecte et supprime automatiquement l\'arriere-plan', 'Ajustez le resultat avec les outils de retouche si necessaire', 'Telechargez l\'image PNG transparente'],
    relatedSlugs: ['compresser-image', 'convertir-image', 'redimensionner-image'],
  },
  'heic-vers-jpg': {
    toolId: 'heic-to-jpg', category: 'image', slug: 'heic-vers-jpg',
    title: 'Convertir HEIC en JPG en Ligne Gratuit — Photos iPhone',
    desc: 'Convertissez vos photos iPhone HEIC en JPG ou PNG en un clic. 100% gratuit et dans votre navigateur.',
    h1: 'Convertir les photos HEIC (iPhone) en JPG',
    intro: 'Convertissez vos photos HEIC et HEIF d\'iPhone en fichiers JPG universellement compatibles avec notre convertisseur gratuit en ligne. Depuis iOS 11, Apple enregistre les photos au format HEIC par defaut, ce qui pose probleme de compatibilite. Notre outil resout ce probleme en transformant vos photos HEIC en JPG en quelques secondes, directement dans votre navigateur et sans envoi de donnees vers un serveur. Vous pouvez convertir une seule photo ou un lot entier. L\'outil preserve la qualite originale tout en reduisant generalement la taille du fichier. Le format JPG obtenu est compatible avec tous les appareils et logiciels. Aucune inscription n\'est requise. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Pourquoi mes photos iPhone sont-elles au format HEIC ?', a: 'Depuis iOS 11, Apple utilise HEIC par defaut pour economiser l\'espace. Ce format n\'est pas universellement compatible.' },
      { q: 'Puis-je convertir plusieurs fichiers a la fois ?', a: 'Oui, la conversion par lot est supportee. Glissez-deposez plusieurs fichiers HEIC et convertissez-les tous en JPG.' },
      { q: 'La conversion reduit-elle la qualite ?', a: 'La compression JPG est avec perte, mais le niveau de qualite est reglable. Avec un reglage eleve, la difference est imperceptible.' },
    ],
    howTo: ['Chargez vos fichiers HEIC ou HEIF', 'Ajustez la qualite JPG si necessaire', 'Lancez la conversion', 'Telechargez vos photos JPG converties'],
    relatedSlugs: ['convertir-image', 'compresser-image', 'redimensionner-image'],
  },
  'generateur-favicon': {
    toolId: 'favicon-generator', category: 'image', slug: 'generateur-favicon',
    title: 'Générateur de Favicon en Ligne Gratuit — ICO, PNG, SVG',
    desc: 'Créez tous les formats de favicon pour votre site web en quelques secondes. ICO, PNG 16x16 à 512x512, Apple Touch Icon.',
    h1: 'Générer un favicon pour votre site web',
    intro: 'Generez des favicons professionnels pour votre site web avec notre generateur en ligne gratuit. A partir d\'une image source, l\'outil cree automatiquement toutes les tailles necessaires : favicon.ico, 16x16, 32x32, 48x48, apple-touch-icon et android-chrome-192x192. Vous obtenez un package complet pret a integrer avec le code HTML pour la section head. L\'outil optimise chaque taille pour une nettete maximale, meme aux plus petites resolutions. Tout le traitement s\'effectue dans votre navigateur sans envoi de votre image vers un serveur. Vous pouvez previsualiser l\'apparence de votre favicon dans differents contextes. L\'outil prend en charge PNG, JPG, SVG et BMP en entree. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Quelle taille d\'image source dois-je utiliser ?', a: 'Utilisez une image carree d\'au moins 512x512 pixels au format PNG avec transparence pour de meilleurs resultats.' },
      { q: 'Quels fichiers sont generes ?', a: 'favicon.ico, les tailles PNG 16, 32, 48, 180 et 192 pixels, plus le code HTML d\'integration.' },
      { q: 'Comment integrer les favicons dans mon site ?', a: 'Telechargez le ZIP, decompressez-le a la racine de votre site et copiez le code HTML dans la section head.' },
    ],
    howTo: ['Chargez votre image source (PNG, JPG ou SVG)', 'Previsualisez le resultat a differentes tailles', 'Generez le package complet de favicons', 'Telechargez le ZIP et le code HTML d\'integration'],
    relatedSlugs: ['convertir-image', 'compresser-image', 'meta-tags'],
  },
  'telecharger-miniature-youtube': {
    toolId: 'youtube-thumbnail', category: 'image', slug: 'telecharger-miniature-youtube',
    title: 'Télécharger Miniature YouTube HD Gratuit — Thumbnail Downloader',
    desc: 'Téléchargez les miniatures HD (1280x720) de n\'importe quelle vidéo YouTube en un clic. 100% gratuit.',
    h1: 'Télécharger la miniature d\'une vidéo YouTube en HD',
    intro: 'Telechargez les miniatures de n\'importe quelle video YouTube en haute resolution avec notre outil gratuit en ligne. Collez l\'URL d\'une video YouTube et l\'outil recupere instantanement toutes les tailles disponibles : 120x90, 320x180, 480x360, 640x360 et 1280x720 pixels. L\'outil fonctionne entierement dans votre navigateur et ne necessite aucune inscription. Les miniatures telechargees peuvent servir pour des presentations, analyser les visuels des videos populaires ou sauvegarder une image representative d\'une video. Le telechargement est rapide et fonctionne avec toutes les videos publiques ou non listees. L\'interface est simple : collez l\'URL, selectionnez la resolution et telechargez. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Quelles resolutions sont disponibles ?', a: '5 tailles : 120x90, 320x180, 480x360, 640x360 et 1280x720 pixels selon la video originale.' },
      { q: 'Puis-je telecharger des miniatures de videos privees ?', a: 'Non, l\'outil fonctionne uniquement avec les videos publiques ou non listees.' },
      { q: 'L\'utilisation est-elle legale ?', a: 'Les miniatures sont des images publiques fournies par YouTube. Verifiez les conditions d\'utilisation pour un usage commercial.' },
    ],
    howTo: ['Collez l\'URL de la video YouTube dans le champ prevu', 'Selectionnez la resolution de miniature souhaitee', 'Cliquez sur Telecharger', 'Sauvegardez l\'image sur votre appareil'],
    relatedSlugs: ['convertir-image', 'compresser-image', 'redimensionner-image'],
  },
  // ─── VIDEO ──────────────────────────────────────────────────────────
  'decouper-video': {
    toolId: 'video-trim', category: 'video', slug: 'decouper-video',
    title: 'Découper Vidéo en Ligne Gratuit — Couper et Rogner MP4',
    desc: 'Découpez et coupez vos vidéos directement dans le navigateur. MP4, WebM, AVI. Gratuit, sans inscription, 100% privé.',
    h1: 'Découper une vidéo en ligne gratuitement',
    intro: 'Decoupez vos videos avec precision grace a notre outil de decoupage video en ligne gratuit. Cet outil vous permet de couper les parties indesirables au debut ou a la fin d\'une video, d\'extraire un segment specifique ou de diviser une video en plusieurs clips. L\'interface intuitive affiche une timeline visuelle avec des poignees de coupe ajustables au dixieme de seconde pres. Vous pouvez egalement saisir des timestamps exacts. Le traitement s\'effectue entierement dans votre navigateur, sans envoi de vos videos vers un serveur, garantissant une confidentialite totale. L\'outil prend en charge MP4, WEBM, MOV et AVI, et le fichier de sortie conserve la qualite originale sans recompression inutile. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Puis-je couper plusieurs segments ?', a: 'Oui, vous pouvez definir plusieurs points de coupe pour extraire plusieurs segments en une seule operation.' },
      { q: 'La qualite est-elle preservee apres decoupage ?', a: 'Oui, le decoupage sans perte conserve la qualite audio et video originale lorsque le format le permet.' },
      { q: 'Quels formats video sont pris en charge ?', a: 'MP4, WEBM, MOV et AVI en entree. Le format de sortie depend du format d\'entree.' },
    ],
    howTo: ['Chargez votre fichier video', 'Utilisez la timeline pour definir debut et fin', 'Ajustez les poignees de coupe avec precision', 'Telechargez le clip decoupe'],
    relatedSlugs: ['compresser-video', 'convertir-video', 'video-en-gif'],
  },
  'compresser-video': {
    toolId: 'video-compress', category: 'video', slug: 'compresser-video',
    title: 'Compresser Vidéo en Ligne Gratuit — Réduire Taille MP4',
    desc: 'Réduisez la taille de vos vidéos MP4, WebM, AVI sans perte de qualité visible. 100% en ligne et gratuit.',
    h1: 'Compresser une vidéo en ligne',
    intro: 'Reduisez la taille de vos fichiers video sans perte de qualite visible avec notre compresseur video en ligne gratuit. Les fichiers video sont souvent volumineux et difficiles a partager. Notre outil compresse vos videos directement dans votre navigateur, sans envoi vers un serveur externe. L\'algorithme optimise le debit video et audio tout en preservant une qualite satisfaisante. Vous pouvez choisir entre plusieurs niveaux de compression : leger, moyen et fort. L\'outil affiche un apercu pour comparer la qualite avant et apres. Les formats MP4 et WEBM sont pris en charge, avec des options pour ajuster la resolution et le debit. Parfait pour compresser avant envoi par messagerie ou telechargement sur un site. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Quelle reduction de taille puis-je obtenir ?', a: 'En compression moyenne, comptez 40-60% de reduction. En compression forte, jusqu\'a 80%.' },
      { q: 'La compression degrade-t-elle la qualite ?', a: 'En compression legere, la perte est imperceptible. En compression forte, une legere degradation peut etre visible.' },
      { q: 'Quels formats sont pris en charge ?', a: 'MP4 et WEBM en entree et en sortie. L\'audio est egalement recompressé si necessaire.' },
    ],
    howTo: ['Chargez votre fichier video', 'Choisissez le niveau de compression', 'Apercez le resultat avec l\'apercu avant-apres', 'Telechargez la video compressee'],
    relatedSlugs: ['decouper-video', 'convertir-video', 'compresser-image'],
  },
  'convertir-video': {
    toolId: 'video-convert', category: 'video', slug: 'convertir-video',
    title: 'Convertisseur Vidéo en Ligne Gratuit — MP4, WebM, AVI, MKV',
    desc: 'Convertissez vos vidéos entre MP4, WebM, AVI, MKV, MOV et GIF gratuitement dans votre navigateur.',
    h1: 'Convertir une vidéo entre différents formats',
    intro: 'Convertissez vos fichiers video entre differents formats avec notre convertisseur en ligne gratuit. L\'outil prend en charge les conversions entre MP4, WEBM, AVI, MOV et MKV, rendant n\'importe quelle video compatible avec votre appareil ou logiciel. Que vous ayez besoin de convertir un MOV d\'iPhone en MP4, transformer un AVI en WEBM, ou preparer un MKV pour une lecture sur TV, notre solution repond a tous vos besoins. Le traitement s\'effectue entierement dans votre navigateur. Vous pouvez egalement ajuster la resolution de sortie, le debit video et le format audio. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Quels formats puis-je convertir ?', a: 'MP4, WEBM, AVI, MOV et MKV en entree. MP4 pour la compatibilite universelle, WEBM pour le web.' },
      { q: 'Puis-je changer la resolution ?', a: 'Oui, selectionnez la resolution de sortie parmi plusieurs options ou definissez des dimensions personnalisees.' },
      { q: 'La conversion prend-elle du temps ?', a: 'Le temps depend de la taille et de votre appareil. La conversion se fait localement sans attente de serveur.' },
    ],
    howTo: ['Chargez votre fichier video', 'Choisissez le format de sortie et les parametres', 'Lancez la conversion', 'Telechargez la video convertie'],
    relatedSlugs: ['compresser-video', 'decouper-video', 'video-en-gif'],
  },
  'ajouter-audio-video': {
    toolId: 'video-add-audio', category: 'video', slug: 'ajouter-audio-video',
    title: 'Ajouter Audio à une Vidéo en Ligne Gratuit',
    desc: 'Ajoutez de la musique, une voix-off ou un son à vos vidéos gratuitement directement dans le navigateur.',
    h1: 'Ajouter une piste audio à une vidéo',
    intro: 'Ajoutez ou remplacez la piste audio d\'une video avec notre outil en ligne gratuit. Que vous souhaitiez ajouter une musique de fond, remplacer l\'audio original ou superposer un commentaire vocal sur un enregistrement d\'ecran, cet outil vous permet de combiner facilement une piste audio avec votre video. L\'interface vous offre le choix entre remplacer l\'audio existant ou melanger la nouvelle piste avec l\'audio original. Vous pouvez ajuster le volume de chaque piste independamment. Tout le traitement s\'effectue dans votre navigateur sans envoi de fichiers vers un serveur. L\'outil prend en charge MP4, WEBM et MOV pour la video, et MP3, WAV et OGG pour l\'audio. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Puis-je garder l\'audio original et ajouter une musique ?', a: 'Oui, choisissez le mode mixage pour superposer les pistes avec un controle de volume independant.' },
      { q: 'Quels formats audio sont acceptes ?', a: 'MP3, WAV et OGG. L\'audio est automatiquement converti pour correspondre au format video de sortie.' },
      { q: 'La video est-elle recompressée ?', a: 'Seule la piste audio est reencodee. La piste video est conservee sans recompression.' },
    ],
    howTo: ['Chargez votre fichier video', 'Chargez le fichier audio a ajouter', 'Choisissez le mode : remplacer ou mixer', 'Ajustez les volumes et telechargez le resultat'],
    relatedSlugs: ['extraire-audio-video', 'supprimer-audio-video', 'decouper-video'],
  },
  'extraire-audio-video': {
    toolId: 'video-extract-audio', category: 'video', slug: 'extraire-audio-video',
    title: 'Extraire Audio d\'une Vidéo en Ligne Gratuit — MP3, WAV',
    desc: 'Extrayez la piste audio de vos vidéos en MP3, WAV, AAC, OGG ou FLAC. 100% gratuit et dans le navigateur.',
    h1: 'Extraire l\'audio d\'une vidéo en MP3',
    intro: 'Extrayez la piste audio d\'une video et enregistrez-la au format MP3 ou WAV avec notre outil d\'extraction audio en ligne gratuit. Parfait pour recuperer la musique d\'un clip video, sauvegarder un podcast au format audio ou extraire un extrait sonore d\'une conference. Le processus est entierement realise dans votre navigateur, sans envoi de vos fichiers vers un serveur. Vous pouvez choisir la qualite de sortie audio : MP3 pour des fichiers compacts, ou WAV pour une qualite sans perte. L\'outil preserve la qualite audio originale et prend en charge MP4, WEBM, MOV, AVI et MKV. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Quel format audio dois-je choisir ?', a: 'MP3 pour des fichiers compacts adaptes a la lecture. WAV pour une qualite sans perte pour le montage professionnel.' },
      { q: 'La qualite audio est-elle preservee ?', a: 'En WAV, la qualite originale est conservee sans perte. En MP3, vous pouvez choisir le debit.' },
      { q: 'Quels formats video sont pris en charge ?', a: 'MP4, WEBM, MOV, AVI et MKV.' },
    ],
    howTo: ['Chargez votre fichier video', 'Choisissez le format de sortie : MP3 ou WAV', 'Selectionnez la qualite audio', 'Telechargez le fichier audio extrait'],
    relatedSlugs: ['ajouter-audio-video', 'supprimer-audio-video', 'decouper-video'],
  },
  'video-en-gif': {
    toolId: 'video-to-gif', category: 'video', slug: 'video-en-gif',
    title: 'Convertir Vidéo en GIF en Ligne Gratuit — Créer GIF Animé',
    desc: 'Créez des GIF animés à partir de vos vidéos avec contrôle total sur la durée et la qualité. Gratuit.',
    h1: 'Convertir une vidéo en GIF animé',
    intro: 'Transformez vos clips video en GIF animes avec notre convertisseur en ligne gratuit. Les GIF animes sont parfaits pour les reseaux sociaux, les messages et les demonstrations visuelles. Notre outil vous permet de convertir n\'importe quel segment de video en GIF dans votre navigateur, sans envoi de fichiers vers un serveur. Vous pouvez definir le debut et la fin du segment, ajuster les dimensions, choisir le nombre d\'images par seconde et optimiser la taille du fichier. L\'interface vous permet de previsualiser le GIF avant de le telecharger. L\'outil prend en charge MP4, WEBM et MOV. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Comment reduire la taille de mon GIF ?', a: 'Reduisez les dimensions, diminuez les FPS ou raccourcissez la duree. L\'outil affiche la taille estimee en temps reel.' },
      { q: 'Puis-je ajouter du texte sur le GIF ?', a: 'Oui, ajoutez du texte ou des captions avec des options de police, taille et couleur.' },
      { q: 'Quelle est la duree maximale d\'un GIF ?', a: 'Pas de limite stricte, mais les GIF de plus de 10 secondes deviennent volumineux. Limitez a 5-8 secondes.' },
    ],
    howTo: ['Chargez votre fichier video', 'Definissez le segment a convertir avec les poignees de coupe', 'Ajustez dimensions, FPS et qualite', 'Telechargez le GIF anime genere'],
    relatedSlugs: ['decouper-video', 'convertir-video', 'compresser-video'],
  },
  'supprimer-audio-video': {
    toolId: 'video-remove-audio', category: 'video', slug: 'supprimer-audio-video',
    title: 'Supprimer Audio d\'une Vidéo en Ligne Gratuit — Vidéo Muette',
    desc: 'Retirez la piste audio de vos vidéos pour obtenir un fichier muet. 100% gratuit et dans le navigateur.',
    h1: 'Supprimer l\'audio d\'une vidéo',
    intro: 'Supprimez la piste audio d\'une video pour obtenir un fichier video muet avec notre outil gratuit en ligne. Utile pour utiliser une video sans son pour un montage, supprimer l\'audio parasite d\'un enregistrement d\'ecran, ou creer une video silencieuse pour les reseaux sociaux. L\'outil retire la piste audio tout en conservant la piste video intacte sans recompression inutile, garantissant une qualite video parfaitement preservee. Le traitement s\'effectue entierement dans votre navigateur. Vous pouvez traiter des fichiers MP4, WEBM, MOV et AVI. Le fichier de sortie est au format MP4 pour une compatibilite universelle. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'La qualite video est-elle affectee ?', a: 'Non, seule la piste audio est supprimee. La piste video est conservee sans aucune modification.' },
      { q: 'Puis-je choisir le format de sortie ?', a: 'Le format de sortie est MP4 par defaut pour une compatibilite maximale.' },
      { q: 'Que se passe-t-il si la video n\'a pas d\'audio ?', a: 'L\'outil detecte les pistes audio. Si la video est deja muette, le fichier sera simplement recopie.' },
    ],
    howTo: ['Chargez votre fichier video', 'Verifiez la piste audio detectee', 'Cliquez sur Supprimer l\'audio', 'Telechargez la video muette en MP4'],
    relatedSlugs: ['ajouter-audio-video', 'extraire-audio-video', 'decouper-video'],
  },
  // ─── DEV & SEO ──────────────────────────────────────────────────────
  'json-csv': {
    toolId: 'json-csv', category: 'dev-seo', slug: 'json-csv',
    title: 'Convertir JSON en CSV en Ligne Gratuit et Vice Versa',
    desc: 'Convertissez facilement vos données entre JSON et CSV. Formatage, prévisualisation et téléchargement instantanés.',
    h1: 'Convertir JSON en CSV et CSV en JSON',
    intro: 'Convertissez vos donnees JSON en CSV et inversement avec notre convertisseur en ligne gratuit. Indispensable pour les developpeurs et analystes de donnees, la conversion JSON vers CSV est parfaite pour importer des donnees d\'API dans Excel ou Google Sheets, tandis que la conversion CSV vers JSON facilite l\'integration de donnees tabulaires dans des applications web. L\'outil detecte automatiquement la structure et gere les tableaux imbriques en aplatissant les objets JSON en colonnes CSV. Vous pouvez personnaliser le separateur, le delimiteur de texte et l\'encodage. Tout le traitement s\'effectue dans votre navigateur sans envoi de donnees vers un serveur, garantissant la confidentialite de vos informations. L\'interface vous permet de coller directement vos donnees ou de charger un fichier, de previsualiser le resultat en temps reel et de telecharger le fichier converti. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Comment gerer les objets JSON imbriques ?', a: 'L\'outil aplatit automatiquement les objets imbriques en creant des colonnes avec des noms hierarchiques separes par des points.' },
      { q: 'Puis-je choisir le separateur CSV ?', a: 'Oui, vous pouvez selectionner virgule, point-virgule ou tabulation comme separateur.' },
      { q: 'Y a-t-il une limite de taille ?', a: 'La limite depend de la memoire de votre navigateur. Pour des fichiers de plusieurs megaoctets, le traitement peut etre plus lent.' },
    ],
    howTo: ['Collez vos donnees JSON ou chargez un fichier', 'Choisissez le sens de conversion et les options', 'Previsualisez le resultat en temps reel', 'Telechargez le fichier converti'],
    relatedSlugs: ['formateur-json', 'base64', 'compteur-mots'],
  },
  'testeur-regex': {
    toolId: 'regex-tester', category: 'dev-seo', slug: 'testeur-regex',
    title: 'Testeur de Regex en Ligne — Expressions Régulières en Temps Réel',
    desc: 'Testez et débuggez vos expressions régulières en temps réel avec coloration syntaxique et explication des groupes.',
    h1: 'Tester des expressions régulières (regex) en ligne',
    intro: 'Testez vos expressions regulieres en temps reel avec notre testeur regex en ligne gratuit. L\'outil met en surbrillance les correspondances dans votre texte a mesure que vous tapez votre regex, vous permettant de deboguer et d\'affiner vos patterns instantanement. L\'outil affiche visuellement chaque groupe de capture, liste toutes les correspondances et signale les erreurs de syntaxe. Vous pouvez basculer entre les flags global, insensible a la casse, multiligne et dotAll. L\'outil inclut une bibliotheque de patterns predefinis pour les cas frequents : emails, URLs, numeros de telephone et adresses IP. Tout fonctionne dans votre navigateur sans envoi de donnees vers un serveur. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Quels flags regex sont supportes ?', a: 'Les flags g, i, m, s et u sont supportes et activables individuellement.' },
      { q: 'Puis-je tester des groupes de capture nommes ?', a: 'Oui, les groupes nommes et les groupes de capture standards sont affiches individuellement avec leurs valeurs.' },
      { q: 'L\'outil supporte-t-il les regex JavaScript et PCRE ?', a: 'L\'outil utilise le moteur regex JavaScript. La plupart des patterns PCRE sont compatibles.' },
    ],
    howTo: ['Saisissez votre expression reguliere dans le champ prevu', 'Tapez ou collez votre texte de test', 'Activez les flags souhaites', 'Consultez les correspondances et groupes en surbrillance'],
    relatedSlugs: ['json-csv', 'formateur-json', 'url-encode-decode'],
  },
  'meta-tags': {
    toolId: 'meta-tags', category: 'dev-seo', slug: 'meta-tags',
    title: 'Générateur de Meta Tags SEO en Ligne Gratuit — Open Graph, Twitter',
    desc: 'Créez et prévisualisez vos balises meta (title, description, Open Graph, Twitter Cards) pour un SEO parfait.',
    h1: 'Générer des balises Meta Tags pour le SEO',
    intro: 'Generez les balises meta HTML optimisees pour le SEO de votre site web avec notre generateur en ligne gratuit. Les meta tags sont essentiels pour le referencement : ils indiquent aux moteurs de recherche le titre, la description et les informations de partage de vos pages. Notre outil vous permet de configurer toutes les balises necessaires : titre de page, meta description, balises Open Graph pour Facebook et LinkedIn, Twitter Cards pour X, les balises canoniques et les instructions robots. L\'interface vous guide avec des indicateurs de longueur optimale et des apercus en temps reel du rendu dans les resultats de recherche Google et les partages sur les reseaux sociaux. Vous obtenez un code HTML pret a copier dans la section head de votre page. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Quelle longueur pour le titre et la description ?', a: 'Google affiche environ 60 caracteres pour le titre et 155 pour la description. L\'outil vous alerte si vous depassez.' },
      { q: 'Quelles balises Open Graph dois-je inclure ?', a: 'Les balises minimales recommandees sont og:title, og:description, og:image et og:url.' },
      { q: 'Puis-je previsualiser le rendu Google ?', a: 'Oui, l\'outil affiche un apercu en temps reel du snippet Google et des cartes Twitter et Facebook.' },
    ],
    howTo: ['Renseignez le titre, la description et l\'URL de votre page', 'Ajoutez l\'image Open Graph et les informations Twitter Card', 'Verifiez les apercus Google et reseaux sociaux', 'Copiez le code HTML genere dans votre page'],
    relatedSlugs: ['sitemap-robots', 'json-csv', 'compteur-mots'],
  },
  'sitemap-robots': {
    toolId: 'sitemap-robots', category: 'dev-seo', slug: 'sitemap-robots',
    title: 'Générateur Sitemap XML et Robots.txt en Ligne Gratuit',
    desc: 'Générez votre fichier sitemap.xml et robots.txt pour Google en quelques secondes. Gratuit.',
    h1: 'Générer un sitemap.xml et un robots.txt',
    intro: 'Generez les fichiers sitemap.xml et robots.txt pour votre site web avec notre outil en ligne gratuit. Le sitemap.xml guide les moteurs de recherche vers toutes les pages importantes, tandis que le robots.txt leur indique quelles pages explorer ou ignorer. Notre generateur vous permet de creer un sitemap en entrant manuellement vos URLs ou en important un CSV, en definissant les priorites et frequences de mise a jour. Pour le robots.txt, configurez les regles d\'acces pour Googlebot, Bingbot et d\'autres robots d\'indexation, avec des regles Allow et Disallow intuitives. Vous pouvez egalement ajouter la reference a votre sitemap dans le robots.txt. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Dois-je avoir un sitemap et un robots.txt ?', a: 'Oui, les deux sont fortement recommandes. Le sitemap aide les moteurs a decouvrir vos pages, et le robots.txt controle les permissions.' },
      { q: 'Quelle priorite attribuer a mes pages ?', a: 'La page d\'accueil generalement 1.0, les pages importantes 0.8, les pages secondaires 0.5.' },
      { q: 'Comment ajouter le sitemap au robots.txt ?', a: 'L\'outil ajoute automatiquement la directive Sitemap dans le robots.txt.' },
    ],
    howTo: ['Ajoutez vos URLs pour le sitemap ou importez un CSV', 'Definissez priorites et frequences de mise a jour', 'Configurez les regles Allow/Disallow du robots.txt', 'Telechargez les deux fichiers prets a deployer'],
    relatedSlugs: ['meta-tags', 'formateur-json', 'json-csv'],
  },
  'formateur-json': {
    toolId: 'json-formatter', category: 'dev-seo', slug: 'formateur-json',
    title: 'JSON Formatter et Validateur en Ligne Gratuit',
    desc: 'Formatez, validez et minifiez vos données JSON en un clic. Coloration syntaxique et détection d\'erreurs.',
    h1: 'Formater et valider du JSON en ligne',
    intro: 'Formatez, validez et embellissez vos donnees JSON avec notre formateur en ligne gratuit. L\'outil prend en charge l\'indentation, la minimisation, la validation syntaxique et la conversion entre JSON compact et lisible. Que vous deboguez une reponse d\'API, travailliez sur un fichier de configuration ou nettoyiez des donnees mal formatees, notre solution vous fait gagner du temps. Le formateur detecte et signale les erreurs de syntaxe avec leur position exacte. Vous pouvez choisir le niveau d\'indentation, trier les cles alphabetiquement et convertir les caracteres Unicode echappes en caracteres lisibles. L\'outil prend egalement en charge la conversion JSON vers YAML. Tout le traitement s\'effectue dans votre navigateur sans envoi de vos donnees vers un serveur. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Comment corriger une erreur de syntaxe JSON ?', a: 'Collez votre JSON et l\'outil soulignera l\'erreur avec sa position exacte. Corrigez-la et la validation se met a jour.' },
      { q: 'Puis-je trier les cles alphabetiquement ?', a: 'Oui, cochez l\'option de tri alphabetique pour reorganiser les cles de vos objets JSON.' },
      { q: 'L\'outil supporte-t-il JSON5 ?', a: 'L\'outil valide le JSON standard RFC 8259. Les commentaires et trailing commas sont signales comme erreurs.' },
    ],
    howTo: ['Collez ou chargez vos donnees JSON', 'Choisissez le format de sortie et l\'indentation', 'Corrigez les erreurs signalees', 'Copiez ou telechargez le JSON formate'],
    relatedSlugs: ['json-csv', 'testeur-regex', 'url-encode-decode'],
  },
  'url-encode-decode': {
    toolId: 'url-encode-decode', category: 'dev-seo', slug: 'url-encode-decode',
    title: 'URL Encode Decode en Ligne Gratuit — Encodeur Décodeur URL',
    desc: 'Encodez et décodez vos URLs et paramètres de requête rapidement. Gratuit et instantané.',
    h1: 'Encoder et décoder des URLs en ligne',
    intro: 'Encodez et decodez les URLs et les parametres de requete avec notre outil en ligne gratuit. L\'encodage URL est essentiel lorsque vous manipulez des parametres contenant des caracteres speciaux, des accents, des espaces ou des caracteres non ASCII. Notre outil prend en charge l\'encodage et le decodage URL complet ainsi que l\'encodage des composants individuels. Vous pouvez egalement encoder et decoder les donnees de formulaire au format application/x-www-form-urlencoded. L\'interface vous permet de basculer instantanement entre encodage et decodage, de traiter des URLs individuelles ou des listes, et de voir les resultats en temps reel. Tout fonctionne dans votre navigateur sans envoi de donnees vers un serveur. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Quelle est la difference entre encodeURI et encodeURIComponent ?', a: 'encodeURI preserve les caracteres de structure d\'URL comme /, ?, # et &. encodeURIComponent encode tous les caracteres speciaux, adapte aux valeurs de parametres.' },
      { q: 'Puis-je encoder plusieurs URLs a la fois ?', a: 'Oui, collez une URL par ligne et encodez-les toutes en un seul clic.' },
      { q: 'L\'outil gere-t-il les caracteres Unicode ?', a: 'Oui, les caracteres Unicode sont correctement encodes en sequences percent-encoded UTF-8 conformement a la RFC 3986.' },
    ],
    howTo: ['Collez votre URL ou parametre a encoder/decoder', 'Choisissez le mode : encode ou decode', 'Selectionnez le type : URI complet ou composant', 'Copiez le resultat'],
    relatedSlugs: ['base64', 'formateur-json', 'nettoyeur-url-tracking'],
  },
  'css-gradient': {
    toolId: 'css-gradient-generator', category: 'dev-seo', slug: 'css-gradient',
    title: 'Générateur de Dégradé CSS en Ligne Gratuit — CSS Gradient Maker',
    desc: 'Créez des dégradés CSS (linear, radial) visuellement et copiez le code CSS dans votre projet.',
    h1: 'Créer des dégradés CSS visuellement',
    intro: 'Generez des codes de gradient CSS avec un apercu visuel en temps reel grace a notre generateur en ligne gratuit. L\'outil vous permet de creer des gradients lineaires et radiaux complexes en ajoutant, deplacant et modifiant des points de couleur. Vous pouvez definir l\'angle des gradients lineaires, la forme et la position des gradients radiaux, et ajuster les positions des arrets de couleur. L\'interface affiche un apercu en temps reel et genere automatiquement le code CSS correspondant, avec les prefixes webkit et moz pour une compatibilite maximale. Vous pouvez egalement generer des gradients coniques. L\'outil inclut une bibliotheque de gradients predefinis populaires comme point de depart. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Quels types de gradients sont supportes ?', a: 'Les gradients lineaires, radiaux et coniques sont supportes avec des options de configuration specifiques.' },
      { q: 'Le code genere est-il compatible avec tous les navigateurs ?', a: 'Oui, le code inclut les prefixes -webkit- et -moz- plus la syntaxe standard.' },
      { q: 'Puis-je sauvegarder mes gradients ?', a: 'Vous pouvez copier le code CSS ou l\'URL de partage qui encode votre gradient.' },
    ],
    howTo: ['Choisissez le type de gradient : lineaire, radial ou conique', 'Ajoutez et ajustez les points de couleur', 'Configurez l\'angle, la forme et la position', 'Copiez le code CSS genere'],
    relatedSlugs: ['color-picker', 'meta-tags', 'markdown-preview'],
  },
  'markdown-preview': {
    toolId: 'markdown-preview', category: 'dev-seo', slug: 'markdown-preview',
    title: 'Éditeur Markdown en Ligne Gratuit avec Aperçu en Direct',
    desc: 'Écrivez en Markdown et voyez le rendu HTML en temps réel. Gratuit, rapide, sans inscription.',
    h1: 'Éditeur Markdown avec aperçu en temps réel',
    intro: 'Previsualisez votre Markdown en temps reel avec notre editeur en ligne gratuit. L\'outil vous permet de rediger du Markdown dans un panneau et de voir instantanement le rendu HTML dans un panneau adjacent. Parfait pour rediger des fichiers README, des articles de blog ou de la documentation technique. L\'editeur prend en charge la syntaxe Markdown complete plus GitHub Flavored Markdown : tableaux, listes de taches, suppression de texte et blocs de code avec coloration syntaxique. L\'outil inclut une barre d\'outils avec des boutons de formatage rapide. Vous pouvez exporter le resultat en HTML ou en PDF. Tout fonctionne dans votre navigateur sans envoi de donnees vers un serveur. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Quelle variante de Markdown est supportee ?', a: 'Markdown standard plus GitHub Flavored Markdown, incluant tableaux, listes de taches et blocs de code fences.' },
      { q: 'Puis-je exporter le resultat ?', a: 'Oui, en HTML avec styles inline ou en PDF directement depuis le navigateur.' },
      { q: 'La coloration syntaxique fonctionne-t-elle dans les blocs de code ?', a: 'Oui, les blocs de code avec indication de langage beneficient d\'une coloration syntaxique pour plus de 100 langages.' },
    ],
    howTo: ['Redigez votre Markdown dans le panneau de gauche', 'Consultez l\'apercu en temps reel dans le panneau de droite', 'Utilisez la barre d\'outils pour inserer rapidement des elements', 'Exportez en HTML ou PDF'],
    relatedSlugs: ['compteur-mots', 'comparateur-texte', 'meta-tags'],
  },
  'nettoyeur-url-tracking': {
    toolId: 'url-cleaner', category: 'dev-seo', slug: 'nettoyeur-url-tracking',
    title: 'Nettoyeur d\'URL en Ligne — Supprimer UTM, fbclid, Tracking',
    desc: 'Supprimez instantanément les paramètres de suivi (utm_source, fbclid, gclid) de vos URLs pour des liens propres et courts.',
    h1: 'Nettoyer une URL : supprimer les trackers et paramètres UTM',
    intro: 'Nettoyez vos URLs en supprimant les parametres de suivi et de tracking avec notre outil en ligne gratuit. De nombreux sites ajoutent des parametres UTM et de suivi a leurs URLs pour tracer le comportement des utilisateurs : utm_source, utm_medium, utm_campaign, fbclid, gclid, ref et des dizaines d\'autres. Notre outil detecte et supprime automatiquement plus de 200 parametres de suivi connus, vous permettant de partager des URLs propres qui ne compromettent pas la vie privee. Vous pouvez egalement definir des parametres personnalises a supprimer ou a conserver. L\'outil traite les URLs une par une ou par lot. Tout fonctionne dans votre navigateur sans envoi de donnees vers un serveur. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Quels parametres de suivi sont supprimes ?', a: 'Plus de 200 parametres dont utm_source, utm_medium, utm_campaign, fbclid, gclid, mc_eid, ref et bien d\'autres.' },
      { q: 'Puis-je conserver certains parametres ?', a: 'Oui, vous pouvez configurer une liste blanche de parametres a conserver.' },
      { q: 'L\'URL nettoyee fonctionne-t-elle toujours ?', a: 'Oui, dans la grande majorite des cas, les parametres de suivi sont ignores par le site destination.' },
    ],
    howTo: ['Collez votre URL contenant des parametres de suivi', 'L\'outil detecte et supprime automatiquement les trackers', 'Verifiez les parametres retires dans la liste', 'Copiez l\'URL nettoyee'],
    relatedSlugs: ['url-encode-decode', 'generateur-lien-whatsapp', 'meta-tags'],
  },
  // ─── TEXT TOOLS ─────────────────────────────────────────────────────
  'compteur-mots': {
    toolId: 'word-counter', category: 'text-tools', slug: 'compteur-mots',
    title: 'Compteur de Mots et Caractères en Ligne Gratuit',
    desc: 'Comptez les mots, caractères, phrases et analysez la densité des mots-clés de votre texte. Gratuit et instantané.',
    h1: 'Compter les mots et caractères de votre texte',
    intro: 'Comptez les mots, les caracteres, les phrases et les paragraphes de votre texte avec notre compteur de mots en ligne gratuit. L\'outil calcule egalement le temps de lecture estime base sur 250 mots par minute, ainsi que le temps de parole pour les presentations. Que vous redigiez un article, une these, un post pour les reseaux sociaux ou un discours, connaitre le nombre de mots est essentiel. Notre compteur detecte automatiquement le type de contenu et ajuste le calcul. L\'interface affiche en temps reel le nombre de mots, de caracteres avec et sans espaces, de phrases et de paragraphes. Vous pouvez egalement obtenir des statistiques sur la densite des mots cles. L\'outil prend en charge toutes les langues y compris les langues asiatiques. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Comment le temps de lecture est-il calcule ?', a: 'Base sur 250 mots par minute. Vous pouvez ajuster cette valeur dans les parametres.' },
      { q: 'Les caracteres asiatiques sont-ils comptes comme des mots ?', a: 'Oui, l\'outil detecte les langues asiatiques et ajuste le comptage. En japonais et chinois, chaque caractere est generalement compte comme un mot.' },
      { q: 'Puis-je analyser la frequence des mots ?', a: 'Oui, l\'outil affiche les mots les plus frequents avec leur nombre d\'occurrences.' },
    ],
    howTo: ['Collez ou saisissez votre texte dans la zone de saisie', 'Consultez les statistiques en temps reel dans le panneau lateral', 'Ajustez la vitesse de lecture si necessaire', 'Utilisez l\'analyseur de frequence pour les mots cles'],
    relatedSlugs: ['convertisseur-casse', 'comparateur-texte', 'lorem-ipsum'],
  },
  'convertisseur-casse': {
    toolId: 'case-converter', category: 'text-tools', slug: 'convertisseur-casse',
    title: 'Convertisseur de Casse en Ligne Gratuit — Majuscule, Minuscule, camelCase',
    desc: 'Convertissez votre texte en MAJUSCULES, minuscules, Title Case, camelCase, snake_case et plus. Gratuit et instantané.',
    h1: 'Convertir la casse de votre texte',
    intro: 'Convertissez la casse de votre texte en un clic avec notre convertisseur en ligne gratuit. L\'outil propose toutes les conversions courantes : MAJUSCULES, minuscules, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE et d\'autres. Que vous ayez tape un texte entier en majuscules par erreur, que vous souhaitiez convertir un titre en camelCase pour du code JavaScript ou transformer des underscores en tirets pour des URLs, notre outil fait la conversion instantanement. L\'interface vous permet de coller votre texte, de choisir le format de sortie parmi plus de 10 options et de copier le resultat en un clic. L\'outil gere correctement les accents et les caracteres speciaux des langues europeennes. Tout fonctionne dans votre navigateur. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Quels formats de casse sont disponibles ?', a: 'MAJUSCULES, minuscules, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE et dot.case.' },
      { q: 'Le Title Case gere-t-il les articles et prepositions ?', a: 'Oui, le Title Case intelligent ne met pas en majuscule les articles et prepositions courts sauf en debut de phrase.' },
      { q: 'Puis-je convertir un texte avec des accents ?', a: 'Oui, l\'outil gere correctement les caracteres accentues de toutes les langues europeennes.' },
    ],
    howTo: ['Collez votre texte dans la zone de saisie', 'Choisissez le format de casse souhaite', 'Le resultat s\'affiche instantanement', 'Copiez le texte converti'],
    relatedSlugs: ['compteur-mots', 'comparateur-texte', 'lorem-ipsum'],
  },
  'lorem-ipsum': {
    toolId: 'lorem-ipsum-generator', category: 'text-tools', slug: 'lorem-ipsum',
    title: 'Générateur Lorem Ipsum en Ligne Gratuit — Texte Placeholder',
    desc: 'Générez du texte Lorem Ipsum pour vos maquettes web et documents. Paragraphes, mots ou phrases au choix.',
    h1: 'Générer du texte Lorem Ipsum',
    intro: 'Generez du texte d\'occupation Lorem Ipsum personnalise avec notre generateur en ligne gratuit. L\'outil vous permet de creer du texte placeholder adapte a vos besoins : nombre de paragraphes, de phrases ou de mots, type de texte et options de formatage. Parfait pour les web designers qui ont besoin de contenu de remplacement dans leurs maquettes, les developpeurs qui testent des interfaces avec du texte realiste, ou les redacteurs qui veulent visualiser la mise en page avant d\'ecrire le contenu final. Contrairement au Lorem Ipsum standard, notre generateur peut produire du texte avec des longueurs variees pour un rendu plus naturel. Vous pouvez egalement generer des listes, des titres et des blocs de citation. L\'outil offre un mode copie directe dans le presse-papiers. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Puis-je generer un nombre exact de mots ?', a: 'Oui, choisissez le mode par nombre de mots et l\'outil generera exactement le nombre demande.' },
      { q: 'Le texte genere est-il toujours le meme ?', a: 'Non, chaque generation produit un texte different en melangeant les phrases du corpus Lorem Ipsum.' },
      { q: 'Puis-je generer du texte thematique ?', a: 'Oui, en plus du Lorem Ipsum classique, l\'outil peut generer du texte placeholder en francais thematique.' },
    ],
    howTo: ['Choisissez le type de generation : paragraphes, phrases ou mots', 'Definissez la quantite souhaitee', 'Selectionnez les options de formatage', 'Copiez le texte genere'],
    relatedSlugs: ['compteur-mots', 'convertisseur-casse', 'markdown-preview'],
  },
  'base64': {
    toolId: 'base64-encode-decode', category: 'text-tools', slug: 'base64',
    title: 'Base64 Encoder Décoder en Ligne Gratuit — Texte et Fichiers',
    desc: 'Encodez et décodez des textes et fichiers en Base64 instantanément. Gratuit et sans inscription.',
    h1: 'Encoder et décoder en Base64',
    intro: 'Encodez et decodez des chaines en Base64 avec notre outil en ligne gratuit. L\'encodage Base64 est utilise dans de nombreux contextes : integration d\'images dans du CSS ou du HTML, transmission de donnees binaires dans des APIs REST, stockage de credentials d\'authentification HTTP Basic, et encodage de pieces jointes dans les emails MIME. Notre outil prend en charge l\'encodage et le decodage de texte UTF-8 ainsi que de donnees binaires comme les images et les fichiers. Vous pouvez encoder une image en Base64 pour l\'integrer dans votre code, ou decoder une chaine Base64 pour retrouver le contenu original. L\'interface simple vous permet de basculer entre encodage et decodage en un clic, de coller votre texte ou de charger un fichier, et de copier le resultat. L\'outil gere correctement les caracteres Unicode et les donnees binaires. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Puis-je encoder des images en Base64 ?', a: 'Oui, chargez une image et l\'outil la convertira en chaine Base64 avec le data URI scheme approprie.' },
      { q: 'L\'encodage Base64 est-il un chiffrement ?', a: 'Non, Base64 est un encodage, pas un chiffrement. Les donnees encodees peuvent etre decodees par n\'importe qui.' },
      { q: 'Quelle est la limite de taille ?', a: 'La limite depend de la memoire de votre navigateur. Pour des fichiers de plus de 50 Mo, le traitement peut etre lent.' },
    ],
    howTo: ['Collez votre texte ou chargez un fichier a encoder/decoder', 'Choisissez le mode : encode ou decode', 'Le resultat s\'affiche instantanement', 'Copiez le resultat ou telechargez le fichier decode'],
    relatedSlugs: ['url-encode-decode', 'generateur-hash', 'formateur-json'],
  },
  'comparateur-texte': {
    toolId: 'text-diff-checker', category: 'text-tools', slug: 'comparateur-texte',
    title: 'Comparateur de Texte en Ligne Gratuit — Diff Checker',
    desc: 'Comparez deux textes et identifiez les différences ligne par ligne avec coloration. Gratuit et instantané.',
    h1: 'Comparer deux textes et trouver les différences',
    intro: 'Comparez deux textes et mettez en evidence les differences avec notre comparateur en ligne gratuit. L\'outil utilise un algorithme de diff intelligent qui detecte les insertions, suppressions et modifications entre deux versions d\'un meme texte, puis les affiche avec un code couleur : vert pour les ajouts, rouge pour les suppressions et jaune pour les modifications. Parfait pour verifier les revisions d\'un document, comparer deux versions d\'un contrat ou relire des traductions. L\'interface cote a cote vous permet de visualiser les deux textes avec les differences surlignees. Vous pouvez naviguer de difference en difference avec des boutons de navigation. L\'outil gere les comparaisons ligne par ligne ou mot par mot, et vous permet d\'ignorer les differences de casse ou d\'espacement. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Quels types de differences sont detectes ?', a: 'Insertions, suppressions et modifications, chacun affiche avec un code couleur different.' },
      { q: 'Puis-je ignorer les differences d\'espacement ?', a: 'Oui, activez l\'option pour ignorer les espaces multiples et les sauts de ligne superflus.' },
      { q: 'Comment naviguer entre les differences ?', a: 'Utilisez les boutons precedent/suivant ou les raccourcis clavier pour sauter d\'une difference a l\'autre.' },
    ],
    howTo: ['Collez le texte original dans le panneau de gauche', 'Collez le texte modifie dans le panneau de droite', 'Consultez les differences en surbrillance', 'Naviguez entre les differences avec les boutons'],
    relatedSlugs: ['compteur-mots', 'convertisseur-casse', 'formateur-json'],
  },
  'separateur-nom-prenom': {
    toolId: 'name-splitter', category: 'text-tools', slug: 'separateur-nom-prenom',
    title: 'Séparer Nom et Prénom en Ligne Gratuit — Liste Excel, CRM',
    desc: 'Séparez automatiquement une liste de noms complets en deux colonnes Prénom et Nom. Compatible Excel, Google Sheets et CRM.',
    h1: 'Séparer les prénoms et noms d\'une liste',
    intro: 'Separez les noms complets en prenom et nom de famille avec notre outil en ligne gratuit. L\'outil detecte automatiquement la structure des noms et les separe intelligemment en prenom, nom de famille et eventuellement deuxieme prenom ou particule. Parfait pour nettoyer des listes de contacts, preparer des fichiers d\'importation CRM ou normaliser des bases de donnees de noms. Vous pouvez traiter un nom individuel ou importer un fichier CSV avec une colonne de noms complets a separer. L\'outil gere les noms composes, les particules comme de, du, van et von, les prefixes comme Dr. et Mme, et les suffixes comme Jr. et III. Le resultat peut etre exporte en CSV avec les colonnes prenom et nom separees. L\'outil prend en charge les conventions francaises et internationales. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'L\'outil gere-t-il les noms composes ?', a: 'Oui, les noms composes comme Jean-Pierre ou Marie-Claire sont correctement identifies comme prenoms composes.' },
      { q: 'Puis-je traiter un fichier CSV complet ?', a: 'Oui, importez votre CSV, selectionnez la colonne contenant les noms complets, et l\'outil ajoutera les colonnes prenom et nom.' },
      { q: 'Les particules sont-elles gerees ?', a: 'Oui, les particules comme de, du, van, von et el sont conservees avec le nom de famille.' },
    ],
    howTo: ['Collez un nom ou importez un fichier CSV', 'L\'outil detecte automatiquement la structure du nom', 'Verifiez la separation proposee', 'Exportez le resultat en CSV ou copiez-le'],
    relatedSlugs: ['compteur-mots', 'convertisseur-casse', 'comparateur-texte'],
  },
  // ─── GENERATORS ─────────────────────────────────────────────────────
  'generateur-qr-code': {
    toolId: 'qr-code-generator', category: 'generators', slug: 'generateur-qr-code',
    title: 'Générateur de QR Code en Ligne Gratuit — URL, Texte, WiFi',
    desc: 'Créez des QR codes personnalisés pour vos URLs, textes, réseaux WiFi et plus. HD, téléchargeable et gratuit.',
    h1: 'Générer un QR Code gratuitement',
    intro: 'Creez des codes QR personnalises avec notre generateur de QR code en ligne gratuit. L\'outil prend en charge tous les types de contenu : URLs, texte libre, adresses WiFi, contacts vCard, numeros de telephone, adresses email et evenements calendar. Vous pouvez personnaliser l\'apparence de votre QR code en choisissant les couleurs de premier plan et d\'arriere-plan, le niveau de correction d\'erreur, la taille et le style des modules. L\'outil genere des QR codes haute resolution adaptes a l\'impression comme a l\'affichage numerique. Le niveau de correction d\'erreur ajustable de L a H vous permet de compenser les dommages eventuels du QR code imprime. Vous pouvez egalement ajouter un logo ou une image au centre du QR code pour renforcer votre marque. L\'interface vous permet de previsualiser le QR code en temps reel et de le telecharger aux formats PNG, SVG ou JPG. Tout le traitement s\'effectue dans votre navigateur sans envoi de donnees vers un serveur, garantissant la confidentialite de vos informations. Aucune inscription n\'est requise et l\'utilisation est illimitee. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Quels types de contenu puis-je encoder ?', a: 'URLs, texte libre, WiFi (SSID/mot de passe), contacts vCard, numeros de telephone, adresses email et evenements iCal sont tous supportes.' },
      { q: 'Quel niveau de correction choisir ?', a: 'Le niveau M (15%) est recommande pour un usage general. Le niveau H (30%) est preferable si le QR code risque d\'etre endommage ou partiellement occulte.' },
      { q: 'Puis-je ajouter un logo au centre ?', a: 'Oui, l\'outil permet d\'inserer un logo ou une image au centre du QR code. Assurez-vous de choisir un niveau de correction eleve (H) pour compenser la zone occultee.' },
    ],
    howTo: ['Choisissez le type de contenu a encoder', 'Saisissez les informations correspondantes', 'Personnalisez couleurs, taille et correction', 'Telechargez en PNG, SVG ou JPG'],
    relatedSlugs: ['generateur-mot-de-passe', 'generateur-lien-whatsapp', 'generateur-uuid-guid'],
  },
  'generateur-mot-de-passe': {
    toolId: 'password-generator', category: 'generators', slug: 'generateur-mot-de-passe',
    title: 'Générateur de Mots de Passe Sécurisés en Ligne Gratuit',
    desc: 'Générez des mots de passe forts et aléatoires instantanément. Longueur et complexité personnalisables.',
    h1: 'Générer un mot de passe sécurisé',
    intro: 'Generez des mots de passe securises et personnalises avec notre generateur de mots de passe en ligne gratuit. La securite de vos comptes en ligne depend directement de la robustesse de vos mots de passe. Notre outil vous permet de creer des mots de passe forts avec des criteres personnalisables : longueur ajustable de 4 a 128 caracteres, inclusion ou exclusion de majuscules, minuscules, chiffres et symboles, et exclusion de caracteres ambigus comme 0/O et 1/l/I. Vous pouvez generer un seul mot de passe ou une liste de plusieurs mots de passe en un clic. L\'outil affiche la force estimee du mot de passe en bits d\'entropie et le temps de craquage theorique. L\'option de prononciabilite genere des mots de passe faciles a retenir tout en restant suffisamment securises pour un usage quotidien. Tout le processus s\'effectue dans votre navigateur avec un generateur de nombres pseudo-aleatoires cryptographiquement sur. Aucun mot de passe genere n\'est envoye a un serveur, garantissant une confidentialite totale. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Quelle longueur de mot de passe recommander ?', a: 'Pour un usage courant, 16 caracteres avec tous les types de caracteres est recommande. Pour les comptes critiques, 24 caracteres ou plus est ideal.' },
      { q: 'Les mots de passe sont-ils vraiment aleatoires ?', a: 'Oui, l\'outil utilise le generateur crypto.getRandomValues() du navigateur, qui est cryptographiquement securise et impossible a predire.' },
      { q: 'Puis-je exclure certains caracteres ?', a: 'Oui, vous pouvez exclure les caracteres ambigus (0/O, 1/l/I) ou definir une liste personnalisee de caracteres a exclure de la generation.' },
    ],
    howTo: ['Definissez la longueur souhaitee du mot de passe', 'Cochez les types de caracteres a inclure', 'Excluez les caracteres ambigus si necessaire', 'Cliquez sur Generer et copiez le resultat'],
    relatedSlugs: ['generateur-hash', 'generateur-qr-code', 'generateur-uuid-guid'],
  },
  'generateur-hash': {
    toolId: 'hash-generator', category: 'generators', slug: 'generateur-hash',
    title: 'Générateur de Hash MD5, SHA-1, SHA-256 en Ligne Gratuit',
    desc: 'Générez des hash MD5, SHA-1, SHA-256 et SHA-512 à partir de texte ou de fichiers. 100% local.',
    h1: 'Générer des hash MD5 et SHA en ligne',
    intro: 'Calculez les empreintes numeriques de vos donnees avec notre generateur de hash en ligne gratuit. L\'outil prend en charge les algorithmes de hachage les plus courants : MD5, SHA-1, SHA-224, SHA-256, SHA-384 et SHA-512. Les fonctions de hachage sont essentielles pour verifier l\'integrite de fichiers, stocker des mots de passe de maniere securisee, generer des identifiants uniques et detecter les doublons dans les bases de donnees. Notre interface vous permet de saisir du texte ou de charger un fichier, puis d\'obtenir instantanement le hash dans tous les formats supportes. Vous pouvez comparer un hash calcule avec un hash de reference pour verifier l\'integrite d\'un telechargement ou d\'un fichier transfere. L\'outil affiche les resultats en hexadecimal majuscule et minuscule, et en Base64. Tout le calcul s\'effectue dans votre navigateur via l\'API Web Crypto, sans envoi de vos donnees vers un serveur. Aucune inscription n\'est requise et l\'utilisation est illimitee. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Quel algorithme choisir ?', a: 'SHA-256 est le standard actuel pour la plupart des usages. MD5 et SHA-1 sont deconseilles pour la securite mais restent utiles pour les controles d\'integrite non critiques.' },
      { q: 'Puis-ou hasher des fichiers ?', a: 'Oui, chargez un fichier et l\'outil calculera son empreinte dans tous les algorithmes supportes. Ideal pour verifier l\'integrite d\'un telechargement.' },
      { q: 'L\'outil peut-il verifier un hash existant ?', a: 'Oui, collez un hash de reference et l\'outil le comparera automatiquement avec le hash calcule pour vous indiquer s\'ils correspondent.' },
    ],
    howTo: ['Saisissez du texte ou chargez un fichier', 'Selectionnez les algorithmes de hachage souhaites', 'Consultez les empreintes generees', 'Comparez avec un hash de reference si necessaire'],
    relatedSlugs: ['generateur-mot-de-passe', 'base64', 'generateur-uuid-guid'],
  },
  'color-picker': {
    toolId: 'color-picker', category: 'generators', slug: 'color-picker',
    title: 'Color Picker en Ligne Gratuit — Convertisseur HEX RGB HSL',
    desc: 'Choisissez une couleur et convertissez-la entre HEX, RGB, HSL et plus. Palette et nuancier inclus.',
    h1: 'Choisir et convertir des couleurs en ligne',
    intro: 'Choisissez et convertissez des couleurs avec notre selecteur de couleur en ligne gratuit. L\'outil offre un selecteur visuel interactif avec un cercle chromatique et une barre de luminosite, ainsi que des champs de saisie pour les formats HEX, RGB, HSL et CMYK. Parfait pour les web designers, les graphistes et les developpeurs qui ont besoin de trouver la couleur exacte pour leurs projets. Vous pouvez cliquer n\'importe ou sur le cercle chromatique pour selectionner une teinte, puis ajuster la saturation et la luminosite avec la barre laterale. L\'outil affiche instantanement la couleur selectionnee dans tous les formats et permet de copier chaque valeur en un clic. Une bibliotheque de couleurs nommees HTML et CSS est incluse pour reference rapide. Vous pouvez egalement generer des palettes harmonieuses a partir d\'une couleur de base : complementaire, analogue, triadique et split-complementaire. Tout fonctionne dans votre navigateur sans envoi de donnees vers un serveur. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Quels formats de couleur sont supportes ?', a: 'HEX, RGB, HSL, HSV et CMYK sont tous supportes. La saisie dans n\'importe lequel de ces formats met a jour instantanement les autres.' },
      { q: 'Puis-je generer une palette a partir d\'une couleur ?', a: 'Oui, l\'outil genere des palettes complementaire, analogue, triadique et split-complementaire a partir de votre couleur de base.' },
      { q: 'Comment copier les valeurs rapidement ?', a: 'Chaque format dispose d\'un bouton Copier. Cliquez dessus pour copier la valeur dans le presse-papiers et l\'utiliser directement dans votre code.' },
    ],
    howTo: ['Utilisez le selecteur visuel ou saisissez un code HEX', 'Ajustez la teinte, saturation et luminosite', 'Consultez les conversions dans tous les formats', 'Copiez le format souhaite en un clic'],
    relatedSlugs: ['css-gradient', 'generateur-favicon', 'meta-tags'],
  },
  'generateur-lien-whatsapp': {
    toolId: 'whatsapp-link', category: 'generators', slug: 'generateur-lien-whatsapp',
    title: 'Générateur de Lien WhatsApp Direct Gratuit — Message Sans Contact',
    desc: 'Créez un lien wa.me WhatsApp pour envoyer un message sans ajouter le numéro à vos contacts. Gratuit et instantané.',
    h1: 'Générer un lien direct WhatsApp (sans enregistrer le contact)',
    intro: 'Creez des liens click-to-chat WhatsApp avec notre generateur en ligne gratuit. L\'outil vous permet de generer une URL WhatsApp qui ouvre directement une conversation avec un numero de telephone predefini et optionnellement un message pre-rempli. Parfait pour les entreprises, les sites web et les reseaux sociaux : ajoutez un bouton WhatsApp a votre site, partagez un lien dans votre bio Instagram ou integrez-le dans vos campagnes email. Vous pouvez configurer le numero de telephone avec le code pays, rediger un message d\'accueil personnalise et generer l\'URL au format wa.me ou api.whatsapp.com. L\'outil valide le numero de telephone et affiche un apercu du message tel qu\'il apparaitra pour l\'utilisateur. Vous pouvez egalement generer le code HTML pour integrer le lien sous forme de bouton sur votre site web. Tout fonctionne dans votre navigateur sans envoi de donnees vers un serveur. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Quel format de numero utiliser ?', a: 'Utilisez le format international sans espaces ni plus : 33612345678 pour la France. N\'oubliez pas le code pays en debut de numero.' },
      { q: 'Le message pre-rempli peut-il contenir des retours a la ligne ?', a: 'Oui, utilisez le caractere %0A pour un saut de ligne dans le message. L\'outil encode automatiquement les caracteres speciaux dans l\'URL.' },
      { q: 'L\'utilisateur doit-il avoir mon numero dans ses contacts ?', a: 'Non, le lien click-to-chat fonctionne meme si l\'utilisateur n\'a pas votre numero dans ses contacts. La conversation s\'ouvre directement dans WhatsApp.' },
    ],
    howTo: ['Entrez le numero de telephone avec le code pays', 'Redigez le message pre-rempli si souhaite', 'Choisissez le format d\'URL : wa.me ou api.whatsapp.com', 'Copiez le lien ou le code HTML du bouton'],
    relatedSlugs: ['generateur-qr-code', 'nettoyeur-url-tracking', 'generateur-uuid-guid'],
  },
  'generateur-uuid-guid': {
    toolId: 'uuid-generator', category: 'generators', slug: 'generateur-uuid-guid',
    title: 'Générateur de UUID / GUID en Ligne Gratuit — V4 Aléatoire',
    desc: 'Générez des identifiants UUID v4 et GUID uniques en masse. 100% local, instantané et gratuit.',
    h1: 'Générer des UUID et GUID uniques',
    intro: 'Generez des identifiants uniques universels UUID/GUID version 4 avec notre generateur en ligne gratuit. Les UUID sont essentiels dans le developpement logiciel pour creer des identifiants uniques sans coordination centrale : cles primaires de base de donnees, identifiants de session, identifiants de transaction et noms de fichiers uniques. Notre outil utilise l\'API crypto.getRandomValues() du navigateur pour generer des UUID v4 cryptographiquement aleatoires conformes a la RFC 4122. Vous pouvez generer un seul UUID ou un lot de plusieurs identifiants en un clic. L\'outil affiche les UUID en format standard avec tirets, sans tirets, en majuscules et en format URN. Chaque UUID genere est statistiquement unique avec une probabilite de collision extremement faible. Tout le processus s\'effectue dans votre navigateur sans envoi de donnees vers un serveur, garantissant la confidentialite et la qualite aleatoire des identifiants generes. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Quelle est la probabilite de collision ?', a: 'La probabilite de collision pour UUID v4 est d\'environ 1 sur 2.7x10^18. En pratique, cela signifie qu\'une collision est quasi impossible.' },
      { q: 'Puis-je generer plusieurs UUID a la fois ?', a: 'Oui, l\'outil permet de generer jusqu\'a 1000 UUID en un seul clic. Les resultats sont affiches en liste et copiables en un clic.' },
      { q: 'Les UUID generes sont-ils conformes a la RFC 4122 ?', a: 'Oui, tous les UUID generes sont des version 4 conformes a la RFC 4122 avec les bits de version et de variante correctement definis.' },
    ],
    howTo: ['Choisissez le nombre d\'UUID a generer', 'Selectionnez le format de sortie', 'Cliquez sur Generer', 'Copiez les resultats en un clic'],
    relatedSlugs: ['generateur-hash', 'generateur-mot-de-passe', 'generateur-qr-code'],
  },
  // ─── CALCULATORS ────────────────────────────────────────────────────
  'calculateur-imc': {
    toolId: 'bmi-calculator', category: 'calculators', slug: 'calculateur-imc',
    title: 'Calculateur IMC (Indice de Masse Corporelle) en Ligne Gratuit',
    desc: 'Calculez gratuitement votre Indice de Masse Corporelle. Entrez taille et poids pour connaître votre catégorie santé.',
    h1: 'Calculer votre Indice de Masse Corporelle (IMC)',
    intro: 'Calculez votre Indice de Masse Corporelle et interpretez les resultats avec notre calculateur d\'IMC en ligne gratuit. L\'IMC est un indicateur reconnu par l\'Organisation Mondiale de la Sante pour evaluer la corpulence d\'un adulte. Notre outil va au-dela du simple calcul : apres avoir saisi votre poids et votre taille, il affiche votre IMC, votre categorie de corpulence selon les normes OMS, et un graphique visuel qui situe votre resultat par rapport aux zones de sous-poids, poids normal, surpoids et obesite. L\'outil prend en compte les specificites homme/femme et fournit des fourchettes de poids ideal pour votre taille. Vous pouvez egalement calculer votre IMC avec les unites metriques (kg/cm) ou imperiales (lbs/pouces). Les resultats sont accompagnes de recommandations de sante generales et de liens vers des ressources officielles. L\'outil ne remplace pas un avis medical mais vous donne une premiere evaluation de votre corpulence. Tout le calcul s\'effectue dans votre navigateur sans envoi de donnees de sante vers un serveur. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Comment l\'IMC est-il calcule ?', a: 'L\'IMC est calcule en divisant le poids en kilogrammes par le carre de la taille en metres. Par exemple, pour 70 kg et 1,75 m : IMC = 70 / (1,75 x 1,75) = 22,9.' },
      { q: 'L\'IMC est-il fiable pour tous ?', a: 'L\'IMC ne distingue pas la masse musculaire de la masse grasse. Il peut surestimer la corpulence des sportifs muscules et sous-estimer celle des personnes agees.' },
      { q: 'Quelles sont les categories OMS ?', a: 'Sous-poids (IMC < 18,5), poids normal (18,5-24,9), surpoids (25-29,9), obesite classe I (30-34,9), classe II (35-39,9), classe III (40 et plus).' },
    ],
    howTo: ['Entrez votre poids en kilogrammes ou livres', 'Entrez votre taille en centimetres ou pouces', 'Selectionnez votre sexe pour des resultats plus precis', 'Consultez votre IMC, votre categorie et les recommandations'],
    relatedSlugs: ['calculateur-age', 'calculateur-pourcentage', 'convertisseur-unites'],
  },
  'calculateur-age': {
    toolId: 'age-calculator', category: 'calculators', slug: 'calculateur-age',
    title: 'Calculateur d\'Âge Exact en Ligne Gratuit — Années, Mois, Jours',
    desc: 'Calculez votre âge exact en années, mois, jours et même heures. Découvrez quel jour de la semaine vous êtes né.',
    h1: 'Calculer votre âge exact',
    intro: 'Calculez votre age exact en annees, mois et jours avec notre calculateur d\'age en ligne gratuit. L\'outil vous permet de determiner precisement votre age a partir de votre date de naissance, mais aussi de calculer la difference entre deux dates quelconques. Parfait pour verifier un age pour des raisons administratives, calculer l\'age de retraite ou determiner la duree entre deux evenements. En plus de l\'age en annees, mois et jours, l\'outil affiche votre age en mois totaux, en semaines, en jours, en heures et en minutes. Vous pouvez egalement calculer l\'age que vous aurez a une date future donnee, ou determiner quelle date correspond a un age specifique. L\'interface vous indique votre prochain anniversaire et le nombre de jours restants avant celui-ci. Tout fonctionne dans votre navigateur sans envoi de donnees personnelles vers un serveur, garantissant la confidentialite de vos informations. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Puis-je calculer l\'age entre deux dates ?', a: 'Oui, l\'outil calcule la difference exacte entre deux dates en annees, mois et jours, pas seulement a partir de la date du jour.' },
      { q: 'L\'outil prend-il en compte les annees bissextiles ?', a: 'Oui, les annees bissextiles sont correctement prises en compte dans tous les calculs, y compris le nombre de jours entre deux dates.' },
      { q: 'Puis-je calculer l\'age a une date future ?', a: 'Oui, modifiez la date de reference pour calculer l\'age que vous aurez a n\'importe quelle date future ou passee.' },
    ],
    howTo: ['Entrez votre date de naissance', 'Verifiez la date de reference (aujourd\'hui par defaut)', 'Consultez votre age exact en annees, mois et jours', 'Decouvrez votre age en semaines, jours et heures'],
    relatedSlugs: ['calculateur-imc', 'calculateur-pourcentage', 'convertisseur-unites'],
  },
  'calculateur-pourcentage': {
    toolId: 'percentage-calculator', category: 'calculators', slug: 'calculateur-pourcentage',
    title: 'Calculateur de Pourcentages en Ligne Gratuit — Tous les Calculs',
    desc: 'Calculez tous les types de pourcentages : X% de Y, augmentation, réduction, pourcentage entre deux nombres.',
    h1: 'Tous les calculs de pourcentages',
    intro: 'Calculez rapidement tous les types de pourcentages avec notre calculateur de pourcentage en ligne gratuit. L\'outil couvre toutes les operations courantes : calculer un pourcentage d\'un nombre, trouver quel pourcentage represente une valeur par rapport a une autre, calculer une augmentation ou une reduction en pourcentage, et determiner la valeur originale a partir d\'un pourcentage. Que vous fassiez vos courses et vouliez calculer la remise sur un article soldé, que vous verifiiez une facture avec TVA, ou que vous analysiez des statistiques professionnelles, notre outil vous donne les resultats instantanement avec les formules utilisees. L\'interface propose plusieurs modes de calcul accessibles par des onglets intuitifs, et affiche les etapes intermediaires pour comprendre le raisonnement. Vous pouvez egalement enregistrer et comparer plusieurs calculs. Tout fonctionne dans votre navigateur sans envoi de donnees vers un serveur. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Comment calculer une remise en pourcentage ?', a: 'Utilisez le mode augmentation/reduction, entrez le prix original et le pourcentage de remise. L\'outil calcule le montant de la remise et le prix final.' },
      { q: 'Puis-je calculer la valeur originale a partir du pourcentage ?', a: 'Oui, le mode Valeur originale permet de retrouver le prix avant remise ou le montant HT a partir du TTC et du taux.' },
      { q: 'Les etapes de calcul sont-elles affichees ?', a: 'Oui, chaque calcul affiche la formule utilisee et les etapes intermediaires pour comprendre le raisonnement.' },
    ],
    howTo: ['Choisissez le type de calcul : pourcentage d\'un nombre, valeur en pourcentage, augmentation ou reduction', 'Entrez les valeurs dans les champs prevus', 'Consultez le resultat et les etapes', 'Reinitialisez ou enchaenez un nouveau calcul'],
    relatedSlugs: ['calculateur-imc', 'convertisseur-unites', 'calculateur-age'],
  },
  'convertisseur-unites': {
    toolId: 'unit-converter', category: 'calculators', slug: 'convertisseur-unites',
    title: 'Convertisseur d\'Unités en Ligne Gratuit — Longueur, Poids, Température',
    desc: 'Convertissez facilement entre les unités de longueur, poids, température et volume. Gratuit et instantané.',
    h1: 'Convertir des unités de mesure',
    intro: 'Convertissez des unites de mesure entre differents systemes avec notre convertisseur d\'unites en ligne gratuit. L\'outil couvre toutes les categories de conversion courantes : longueur (metres, pieds, pouces, kilometres, miles), poids et masse (kilogrammes, livres, onces, tonnes), temperature (Celsius, Fahrenheit, Kelvin), volume (litres, gallons, millilitres, pieds cubes), vitesse (km/h, mph, noeuds), surface et aire (metres carres, hectares, acres), temps (secondes, minutes, heures, jours) et bien d\'autres. L\'interface intuitive vous permet de selectionner la categorie, de choisir les unites source et cible, et de saisir la valeur a convertir. Le resultat s\'affiche instantanement avec la precision ajustable. Les formules de conversion sont affichees pour reference educative. Vous pouvez egalement inverser le sens de conversion en un clic et utiliser la recherche rapide pour trouver une unite par son nom ou son symbole. Tout fonctionne dans votre navigateur sans envoi de donnees vers un serveur. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Quelles categories sont disponibles ?', a: 'Longueur, poids, temperature, volume, vitesse, surface, temps, pression, energie, puissance, donnees informatiques et angle sont disponibles.' },
      { q: 'La temperature est-elle bien convertie ?', a: 'Oui, les conversions entre Celsius, Fahrenheit et Kelvin utilisent les formules exactes avec decalages d\'echelle, pas de simple multiplication.' },
      { q: 'Puis-je convertir entre differentes categories ?', a: 'Non, chaque categorie est independante. Pour convertir des litres en kilogrammes, vous auriez besoin de la densite du liquide, ce qui n\'est pas couvert.' },
    ],
    howTo: ['Selectionnez la categorie de conversion', 'Choisissez les unites source et cible', 'Entrez la valeur a convertir', 'Consultez le resultat et la formule utilisee'],
    relatedSlugs: ['calculateur-pourcentage', 'calculateur-imc', 'calculateur-age'],
  },
  'calculateur-dosage-beton': {
    toolId: 'concrete-calculator', category: 'calculators', slug: 'calculateur-dosage-beton',
    title: 'Calculateur Dosage Béton Gratuit — Sacs de Ciment, Sable, Gravier, Eau',
    desc: 'Calculez le dosage exact en nombre de sacs de ciment 35kg, sable, gravier et litres d\'eau pour vos dalles, terrasses ou fondations.',
    h1: 'Calculateur de dosage béton : ciment, sable, gravier et eau',
    intro: 'Calculez les quantites de ciment, sable, gravier et eau necessaires pour votre dosage de beton avec notre calculateur en ligne gratuit. Que vous realisiez une dalle de terrasse, des fondations, un mur en beton ou un poteau, l\'outil determine les proportions exactes de chaque composant selon le dosage souhaite. Vous pouvez choisir parmi les dosages standards : 350 kg/m3 pour les fondations, 400 kg/m3 pour les dalles et murs porteurs, ou definir un dosage personnalise. Entrez les dimensions de votre ouvrage et l\'outil calcule automatiquement le volume de beton necessaire, puis les quantites de chaque materiau en kilogrammes et en volume pour une commande chez le fournisseur. Le calcul inclut une marge de securite de 5% pour les pertes. L\'outil prend egalement en compte le dosage en eau optimal selon le rapport eau/ciment recommande. Tout fonctionne dans votre navigateur sans envoi de donnees vers un serveur. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Quel dosage choisir ?', a: '350 kg/m3 pour les fondations et travaux non structures, 400 kg/m3 pour les dalles et murs porteurs. Plus le dosage est eleve, plus le beton est resistant.' },
      { q: 'Comment calculer le volume de beton ?', a: 'Entrez les dimensions de votre ouvrage (longueur, largeur, epaisseur) et l\'outil calcule le volume automatiquement. Ajoutez 5% de marge pour les pertes.' },
      { q: 'Quelle quantite d\'eau utiliser ?', a: 'Le rapport eau/ciment recommande est de 0,45 a 0,55. L\'outil calcule automatiquement la quantite d\'eau optimale selon le dosage choisi.' },
    ],
    howTo: ['Entrez les dimensions de votre ouvrage', 'Choisissez le dosage de beton', 'Consultez les quantites de chaque materiau', 'Ajoutez la marge de securite et commandez'],
    relatedSlugs: ['calculateur-frais-kilometriques', 'convertisseur-unites', 'calculateur-pourcentage'],
  },
  'calculateur-frais-kilometriques': {
    toolId: 'mileage-calculator', category: 'calculators', slug: 'calculateur-frais-kilometriques',
    title: 'Calculateur de Frais Kilométriques en Ligne Gratuit — Toutes Devises',
    desc: 'Calculez vos indemnités et frais kilométriques professionnels en EUR, USD, GBP, MAD, DZD ou toute autre devise.',
    h1: 'Calculer vos frais et indemnités kilométriques',
    intro: 'Calculez vos indemnites kilometriques avec notre calculateur en ligne gratuit. L\'outil prend en charge le bareme kilometrique francais avec les trois options de puissance fiscale, permettant aux salaries et aux independants de calculer leurs frais de deplacement pour la declaration d\'impots. Entrez la distance parcourue et la puissance fiscale de votre vehicule, et l\'outil calcule automatiquement l\'indemnite selon le bareme officiel en vigueur. Vous pouvez egalement comparer le cout reel avec le bareme forfaitaire pour determiner quelle option est la plus avantageuse pour votre situation. L\'outil gere les tranches de distance du bareme avec les coefficients degressifs applicables. Pour les entreprises, il permet de calculer les indemnites a verser aux salaries en deplacement professionnel. Les calculs sont detailles avec les formules et coefficients utilises pour chaque tranche. Tout fonctionne dans votre navigateur sans envoi de donnees vers un serveur. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Quel bareme est utilise ?', a: 'L\'outil utilise le bareme kilometrique officiel francais en vigueur. Les coefficients sont mis a jour chaque annee selon les arretes ministereils.' },
      { q: 'Comment choisir entre frais reels et forfait ?', a: 'L\'outil calcule les deux options pour que vous puissiez comparer. Si vos frais reels depassent l\'abattement forfaitaire de 10%, choisissez les frais reels.' },
      { q: 'La puissance fiscale est-elle prise en compte ?', a: 'Oui, le bareme tient compte de la puissance fiscale du vehicule avec trois tranches : jusqu\'a 3 CV, 4 a 6 CV, et 7 CV et plus.' },
    ],
    howTo: ['Entrez la distance parcourue en kilometres', 'Selectionnez la puissance fiscale de votre vehicule', 'Consultez l\'indemnite selon le bareme officiel', 'Comparez avec le forfait pour choisir la meilleure option'],
    relatedSlugs: ['calculateur-dosage-beton', 'calculateur-pourcentage', 'convertisseur-unites'],
  },
  'convertisseur-couleurs': {
    toolId: 'color-converter', category: 'generators', slug: 'convertisseur-couleurs',
    title: 'Convertisseur de Couleurs en Ligne — HEX, RGB, HSL, CMYK',
    desc: 'Convertissez instantanément entre les formats de couleur HEX, RGB, HSL et CMYK. Gratuit, sans inscription, 100% dans votre navigateur.',
    h1: 'Convertisseur de couleurs HEX, RGB, HSL, CMYK',
    intro: "Saisissez une couleur dans n'importe quel format (HEX, RGB, HSL) et obtenez instantanément toutes les conversions. Utilisez le sélecteur de couleur visuel, les champs numériques ou les présélections pour trouver la couleur parfaite pour vos projets web et design.",
    faq: [
      { q: 'Comment convertir un HEX en RGB ?', a: 'Entrez votre code HEX comme #3b82f6 dans le champ prevu et la valeur RGB s\'affiche instantanement dans le panneau de resultats.' },
      { q: 'Qu\'est-ce que le format CMYK ?', a: 'CMYK est le modele de couleur utilise en imprimerie. Contrairement au RGB destine aux ecrans, le CMYK utilise quatre encres : Cyan, Magenta, Jaune et Noir.' },
      { q: 'Puis-je copier les valeurs rapidement ?', a: 'Oui, chaque format dispose d\'un bouton Copier pour recuperer la valeur dans le presse-papiers et l\'utiliser directement dans votre code.' },
    ],
    howTo: ['Choisissez une couleur avec le selecteur ou entrez un code HEX', 'Visualisez les conversions RGB, HSL et CMYK', 'Ajustez l\'opacite si necessaire', 'Copiez le format souhaite en un clic'],
    relatedSlugs: ['color-picker', 'css-gradient', 'convertisseur-unites'],
  },
  'chronometre': {
    toolId: 'stopwatch', category: 'calculators', slug: 'chronometre',
    title: 'Chronomètre en Ligne Gratuit — Chronométrage de Précision',
    desc: 'Chronomètre en ligne gratuit avec fonctionnalité de tours intermédiaires. Précision au centième de seconde.',
    h1: 'Chronomètre en ligne avec tours intermédiaires',
    intro: "Un chronomètre de précision directement dans votre navigateur. Enregistrez des tours intermédiaires, mesurez au centième de seconde et suivez vos performances.",
    faq: [
      { q: 'Quelle est la precision du chronometre ?', a: 'Le chronometre affiche les centiemes de seconde. La precision effective depend de la resolution du timer du navigateur, generalement de l\'ordre de 10 millisecondes.' },
      { q: 'Le chronometre continue-t-il si je change d\'onglet ?', a: 'Oui, le chronometre utilise l\'horloge systeme et continue de tourner meme si vous changez d\'onglet ou reduisez la fenetre.' },
      { q: 'Puis-je exporter les temps de tour ?', a: 'Oui, cliquez sur le bouton Exporter pour telecharger la liste des temps de tour en format texte ou CSV.' },
    ],
    howTo: ['Cliquez sur Demarrer pour lancer le chronometre', 'Cliquez sur Tour pour enregistrer un temps intermediaire', 'Cliquez sur Pause pour arreter temporairement', 'Cliquez sur Reinitialiser pour remettre a zero'],
    relatedSlugs: ['timer-pomodoro', 'calculateur-age', 'convertisseur-unites'],
  },
  'timer-pomodoro': {
    toolId: 'pomodoro-timer', category: 'calculators', slug: 'timer-pomodoro',
    title: 'Timer Pomodoro en Ligne Gratuit — Technique Pomodoro',
    desc: 'Timer Pomodoro gratuit avec sessions de travail personnalisables, pauses courtes et longues. Améliorez votre productivité.',
    h1: 'Timer Pomodoro — Technique de productivité',
    intro: "La technique Pomodoro alterne des périodes de travail concentré avec des pauses. Notre timer vous guide avec une interface visuelle et des paramètres personnalisables.",
    faq: [
      { q: 'Qu\'est-ce que la technique Pomodoro ?', a: 'La methode Pomodoro consiste a travailler intensivement pendant 25 minutes, puis a prendre une pause de 5 minutes. Apres 4 cycles, prenez une pause longue de 15 a 30 minutes.' },
      { q: 'Puis-je modifier les durees ?', a: 'Oui, toutes les durees sont personnalisables : travail, pause courte, pause longue et nombre de Pomodoros avant la pause longue.' },
      { q: 'Les notifications fonctionnent-elles en arriere-plan ?', a: 'Oui, si vous avez autorise les notifications du navigateur, vous recevrez une alerte sonore et visuelle meme si l\'onglet n\'est pas actif.' },
    ],
    howTo: ['Configurez les durees de travail et de pause', 'Cliquez sur Demarrer pour commencer le premier Pomodoro', 'Le timer bascule automatiquement entre travail et pause', 'Consultez vos statistiques de productivite en fin de session'],
    relatedSlugs: ['chronometre', 'calculateur-age', 'calculateur-pourcentage'],
  },
  'calculateur-tva': {
    toolId: 'vat-calculator', category: 'calculators', slug: 'calculateur-tva',
    title: 'Calculateur de TVA en Ligne Gratuit — HT, TTC, Taux de TVA',
    desc: 'Calculez instantanément le montant HT, TTC et la TVA à partir de n\'importe quel taux. Gratuit, sans inscription, 100% dans votre navigateur.',
    h1: 'Calculateur de TVA : montant HT, TTC et taux',
    intro: 'Calculez instantanement les montants HT, TTC et TVA avec notre calculateur de TVA en ligne gratuit. L\'outil vous permet de convertir dans les deux sens : du TTC vers le HT et du HT vers le TTC, en appliquant le taux de TVA de votre choix. Les taux predefinus couvrent les principaux pays europeens : France (20%, 10%, 5,5%, 2,1%), Belgique (21%, 12%, 6%), Suisse (8,1%, 2,6%), Allemagne (19%, 7%), Espagne (21%, 10%, 4%) et Royaume-Uni (20%, 5%). Vous pouvez egalement saisir un taux personnalise pour tout autre pays ou situation. L\'interface affiche en temps reel le montant HT, le montant de la TVA et le montant TTC, avec les formules de calcul pour reference. L\'outil prend en charge les arrondis conformement aux normes comptables francaises. Parfait pour les professionnels, les commercants et les particuliers qui verifient des factures ou calculent des prix. Tout fonctionne dans votre navigateur sans envoi de donnees vers un serveur. Contrairement a de nombreux outils en ligne, Utilyx traite toutes vos donnees directement dans votre navigateur web. Aucun fichier n\'est envoye a nos serveurs, garantissant une confidentialite totale et une securite maximale pour vos informations. L\'outil est entierement gratuit, sans inscription requise et sans limite d\'utilisation quotidienne. Vous pouvez l\'utiliser sur tout appareil : ordinateur, tablette ou smartphone, sans installation de logiciel ni extension de navigateur. Que vous soyez un professionnel en mission, un etudiant en recherche de productivite ou un particulier souhaitant gagner du temps au quotidien, cet outil est concu pour repondre a vos besoins avec simplicite et efficacite. L\'interface est volontairement epuree pour vous permettre de realiser votre tache en quelques clics, sans courbe d\'apprentissage necessaire.',
    faq: [
      { q: 'Comment calculer la TVA a partir du TTC ?', a: 'Pour retrouver le HT a partir du TTC : HT = TTC / (1 + taux/100). Par exemple, pour 120 euros TTC avec une TVA a 20% : HT = 120 / 1,20 = 100 euros et TVA = 20 euros.' },
      { q: 'Comment calculer la TVA a partir du HT ?', a: 'TVA = HT x (taux/100) et TTC = HT + TVA. Par exemple, pour 100 euros HT avec une TVA a 20% : TVA = 20 euros et TTC = 120 euros.' },
      { q: 'L\'outil fonctionne-t-il pour d\'autres pays ?', a: 'Oui, des taux predefinis sont disponibles pour la Belgique, la Suisse, l\'Allemagne, l\'Espagne et le Royaume-Uni. Vous pouvez aussi saisir n\'importe quel taux personnalise.' },
    ],
    howTo: ['Choisissez le sens du calcul (TTC vers HT ou HT vers TTC)', 'Entrez le montant et selectionnez le taux de TVA', 'Les resultats HT, TVA et TTC s\'affichent instantanement', 'Ajustez le taux ou le montant pour de nouveaux calculs'],
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

/** Get the locale-specific path for a tool, handling slug translations */
export function getPathForLocale(toolId: string, locale: string): { category: string; slug: string } | undefined {
  const path = toolIdToPath[toolId]
  if (!path) return undefined
  if (locale === 'fr') return path
  // For English, map French slugs to English slugs via slug-map
  if (locale === 'en') {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const slugMap: Record<string, string> = require('./seo-registries/slug-map.json')
    const enSlug = slugMap[path.slug] || path.slug
    return { category: path.category, slug: enSlug }
  }
  // For other locales, use French slugs (same as fr for now)
  return path
}

/** ── Locale-slug resolution (EN gets English slugs) ──────────────── */
import slugMapData from './seo-registries/slug-map.json'
const slugMap = slugMapData as Record<string, string>

const reverseSlugMap: Record<string, string> = {}
for (const [base, en] of Object.entries(slugMap)) {
  reverseSlugMap[en] = base
}

/** Get the slug for a given locale from the base (FR) slug */
export function getSlugForLocale(baseSlug: string, locale: string): string {
  if (locale === 'en') return slugMap[baseSlug] || baseSlug
  return baseSlug
}

/** Reverse: given a slug that might be EN, resolve to the base (FR) slug */
export function resolveSlugToBase(slug: string): string {
  return reverseSlugMap[slug] || slug
}
