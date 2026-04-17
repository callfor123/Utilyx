#!/usr/bin/env python3
"""Generate enriched seo-registry.ts with all 53 entries."""
import os
def esc(s):
    return s.replace('\\','\\\\').replace("'","\\'").replace('\n','\\n')
def fmt(e):
    faq=',\n'.join(f"      {{ q: '{esc(f['q'])}', a: '{esc(f['a'])}' }}" for f in e['faq'])
    ht=', '.join(f"'{esc(s)}'" for s in e['howTo'])
    rs=', '.join(f"'{s}'" for s in e['relatedSlugs'])
    return f"  '{e['slug']}': {{\n    toolId: '{e['toolId']}', category: '{e['category']}', slug: '{e['slug']}',\n    title: '{esc(e['title'])}',\n    desc: '{esc(e['desc'])}',\n    h1: '{esc(e['h1'])}',\n    intro: '{esc(e['intro'])}',\n    faq: [\n{faq}\n    ],\n    howTo: [{ht}],\n    relatedSlugs: [{rs}],\n  }},"

E=[]
E.append({
'slug':'compresser-pdf','toolId':'pdf-compress','category':'pdf',
'title':"Compresser PDF en Ligne Gratuit — Réduire Taille PDF",
'desc':"Réduisez la taille de vos fichiers PDF jusqu'à 80% gratuitement. Aucune inscription, traitement 100% local dans votre navigateur.",
'h1':"Compresser un fichier PDF en ligne gratuitement",
'intro':"""Notre outil de compression PDF réduit instantanément la taille de vos documents sans perte de qualité visible. Idéal pour envoyer des fichiers par email, les télécharger sur un site web ou les stocker sans gaspiller d'espace disque. Aucun fichier n'est envoyé à un serveur externe : tout le traitement se déroule directement dans votre navigateur, garantissant une confidentialité totale de vos documents. La compression PDF fonctionne en optimisant les images intégrées, en supprimant les métadonnées inutiles et en réorganisant la structure du fichier pour un poids minimal. Vous pouvez choisir le niveau de compression selon vos besoins : compression légère pour une qualité maximale, ou compression forte pour un fichier le plus léger possible. Cet outil est entièrement gratuit et ne nécessite aucune inscription. Vous pouvez compresser autant de PDF que vous le souhaitez, sans limitation. Le traitement 100% local signifie que vos documents sensibles ne quittent jamais votre appareil, ce qui est particulièrement important pour les contrats, relevés bancaires et documents confidentiels.""",
'faq':[
{'q':'Comment compresser un PDF gratuitement ?','a':"Glissez-déposez votre fichier PDF dans l'outil ci-dessus, choisissez le niveau de compression souhaité, puis téléchargez le résultat. Tout est gratuit et sans inscription."},
{'q':'Mes fichiers sont-ils en sécurité ?','a':"Oui, 100%. Le traitement se fait entièrement dans votre navigateur web. Aucun fichier n'est envoyé à nos serveurs ni stocké en ligne."},
{'q':'Quelle est la taille maximale autorisée ?','a':"Comme tout est traité en local, il n'y a pas de limite stricte. La seule limitation est la mémoire de votre appareil."},
],
'howTo':['Glissez votre fichier PDF dans la zone de dépôt','Choisissez le niveau de compression','Cliquez sur "Compresser" et téléchargez le résultat'],
'relatedSlugs':['fusionner-pdf','proteger-pdf','deverrouiller-pdf'],
})
E.append({
'slug':'fusionner-pdf','toolId':'pdf-merge','category':'pdf',
'title':"Fusionner PDF en Ligne Gratuit — Combiner Plusieurs PDF",
'desc':"Fusionnez plusieurs fichiers PDF en un seul document en quelques secondes. Gratuit, sans inscription, traitement local.",
'h1':"Fusionner plusieurs PDF en un seul fichier",
'intro':"""Combinez facilement 2 ou plusieurs documents PDF en un seul fichier unifié en quelques secondes. Notre outil vous permet de réorganiser l'ordre des pages par simple glisser-déposer avant de fusionner, vous offrant un contrôle total sur le résultat final. Parfait pour assembler des factures, des rapports, des dossiers administratifs, des mémoires universitaires ou tout autre document multipage. La fusion de PDF est une opération courante pour les professionnels, les étudiants et les particuliers qui souhaitent regrouper plusieurs documents en un seul fichier facile à partager et à archiver. Imaginez pouvoir regrouper tous les chapitres d'un mémoire, assembler les pages d'un contrat signé, ou compiler plusieurs factures en un seul fichier PDF à envoyer à votre comptable. Aucune inscription n'est requise et le service est entièrement gratuit. Le traitement s'effectue 100% localement dans votre navigateur, ce qui signifie que vos documents ne sont jamais envoyés sur un serveur distant, garantissant ainsi une confidentialité totale de vos données.""",
'faq':[
{'q':'Comment fusionner des PDF en ligne ?','a':"Ajoutez vos fichiers PDF dans l'outil, réorganisez-les dans l'ordre souhaité, puis cliquez sur Fusionner. Vous obtiendrez un seul PDF combiné."},
{'q':'Combien de fichiers puis-je fusionner ?','a':"Il n'y a pas de limite au nombre de fichiers. Vous pouvez en combiner autant que vous le souhaitez."},
{'q':'Puis-je réorganiser les pages avant de fusionner ?','a':"Oui, vous pouvez réorganiser l'ordre des fichiers PDF avant la fusion par simple glisser-déposer."},
{'q':'La qualité sera-t-elle préservée ?','a':"Absolument. La fusion ne modifie pas le contenu des PDF. Chaque page conserve sa qualité et ses propriétés d'origine."},
],
'howTo':['Ajoutez vos fichiers PDF','Réorganisez l\'ordre par glisser-déposer','Cliquez sur Fusionner et téléchargez'],
'relatedSlugs':['compresser-pdf','pdf-en-images','signer-pdf'],
})
E.append({
'slug':'pdf-en-images','toolId':'pdf-convert','category':'pdf',
'title':"Convertir PDF en Images JPG PNG en Ligne Gratuit",
'desc':"Convertissez chaque page de votre PDF en image JPG ou PNG haute qualité. Gratuit et sans inscription.",
'h1':"Convertir un PDF en images JPG ou PNG",
'intro':"""Transformez chaque page de vos documents PDF en images haute résolution (JPG ou PNG) en quelques secondes. Cet outil est particulièrement utile pour intégrer des pages PDF dans une présentation PowerPoint, les partager sur les réseaux sociaux, ou les éditer dans un logiciel de retouche photo comme Photoshop ou GIMP. Le format JPG produit des fichiers légers, idéaux pour le web et l'email, tandis que le PNG offre une qualité maximale avec la possibilité de conserver la transparence. Les professionnels du marketing, les graphistes et les étudiants utilisent régulièrement la conversion PDF en images pour créer des visuels à partir de rapports, brochures ou catalogues. Tout le traitement s'effectue localement dans votre navigateur : vos documents restent sur votre appareil et ne sont jamais transférés vers un serveur. Le service est entièrement gratuit et ne nécessite aucune inscription. Vous pouvez convertir autant de PDF que vous le souhaitez, sans filigrane ni limitation de qualité.""",
'faq':[
{'q':'En quel format seront mes images ?','a':"Vous pouvez choisir entre JPG (léger, idéal pour le web) et PNG (qualité maximale, transparence possible)."},
{'q':'La qualité est-elle bonne ?','a':"Oui, les images sont générées en haute résolution directement dans votre navigateur, sans perte de qualité."},
{'q':'Est-ce gratuit et sans inscription ?','a':"Oui, l'outil est 100% gratuit et ne nécessite aucune inscription. Vous pouvez convertir autant de fichiers que vous le souhaitez."},
],
'howTo':['Chargez votre PDF','Choisissez le format de sortie (JPG ou PNG)','Téléchargez les images générées'],
'relatedSlugs':['compresser-pdf','fusionner-pdf','convertir-image'],
})
E.append({
'slug':'signer-pdf','toolId':'pdf-sign','category':'pdf',
'title':"Signer PDF en Ligne Gratuit — Signature Électronique",
'desc':"Signez et annotez vos documents PDF directement dans le navigateur. Dessinez ou tapez votre signature. 100% gratuit.",
'h1':"Signer un document PDF en ligne",
'intro':"""Ajoutez votre signature manuscrite ou tapée à n'importe quel document PDF sans imprimer ni scanner. Notre outil vous permet de dessiner votre signature directement à l'écran, de la taper dans une police calligraphiée, ou de l'importer depuis une image. Vous pouvez ensuite la positionner et la redimensionner précisément sur le document. Idéal pour les contrats de travail, les bons de commande, les formulaires administratifs, les accords de confidentialité et tout document nécessitant une signature. Cet outil élimine le cycle fastidieux d'impression, signature et numérisation, vous faisant gagner un temps précieux. Le processus est 100% local : votre document reste sur votre appareil et n'est jamais envoyé à un serveur. Le service est entièrement gratuit et sans inscription. Notez que notre outil crée une signature simple. Pour une valeur juridique renforcée conformément au règlement eIDAS, consultez un service de signature électronique certifié.""",
'faq':[
{'q':'Ma signature est-elle juridiquement valide ?','a':"Notre outil crée une signature simple. Pour une valeur juridique renforcée, consultez un service de signature électronique certifié eIDAS."},
{'q':'Comment ajouter ma signature ?','a':"Chargez votre PDF, dessinez ou tapez votre signature, positionnez-la sur le document, puis téléchargez le fichier signé."},
{'q':'Est-ce gratuit et sans inscription ?','a':"Oui, l'outil est 100% gratuit et sans inscription. Vos documents restent sur votre appareil et ne sont jamais envoyés à un serveur."},
{'q':'Puis-je importer une image de signature ?','a':"Oui, vous pouvez importer une image de votre signature préalablement numérisée et la positionner sur le document."},
],
'howTo':['Chargez votre PDF','Dessinez ou tapez votre signature','Positionnez-la sur le document et téléchargez'],
'relatedSlugs':['compresser-pdf','proteger-pdf','fusionner-pdf'],
})
E.append({
'slug':'deverrouiller-pdf','toolId':'pdf-unlock','category':'pdf',
'title':"Déverrouiller PDF en Ligne Gratuit — Retirer Mot de Passe",
'desc':"Retirez le mot de passe de protection de vos fichiers PDF facilement. Gratuit et 100% dans votre navigateur.",
'h1':"Déverrouiller un PDF protégé par mot de passe",
'intro':"""Vous avez un PDF protégé dont vous connaissez le mot de passe mais que vous devez ouvrir fréquemment ? Notre outil vous permet de retirer la protection par mot de passe en un seul clic, afin de pouvoir ouvrir et partager votre document librement sans avoir à saisir le mot de passe à chaque fois. C'est particulièrement utile pour les relevés bancaires protégés, les contrats sécurisés ou tout document dont vous souhaitez supprimer la contrainte du mot de passe tout en conservant le contenu intact. Le processus est simple : chargez votre PDF protégé, saisissez le mot de passe, et téléchargez le fichier déverrouillé. Tout se passe dans votre navigateur : aucune donnée n'est envoyée à un serveur, garantissant une confidentialité totale. L'outil est entièrement gratuit et ne nécessite aucune inscription. Attention : vous devez connaître le mot de passe pour déverrouiller le fichier. Notre outil ne crack pas les mots de passe.""",
'faq':[
{'q':'Puis-je déverrouiller un PDF sans le mot de passe ?','a':"Non, vous devez connaître le mot de passe. Notre outil retire la protection mais ne crack pas les mots de passe."},
{'q':'Est-ce gratuit et sécurisé ?','a':"Oui, 100% gratuit et sans inscription. Le traitement se fait localement dans votre navigateur, vos fichiers ne quittent jamais votre appareil."},
{'q':'Le contenu du PDF est-il modifié ?','a':"Non, le contenu reste exactement identique. Seule la protection par mot de passe est retirée."},
{'q':'Combien de PDF puis-je déverrouiller ?','a':"Il n'y a aucune limite. Vous pouvez déverrouiller autant de fichiers que vous le souhaitez, gratuitement."},
],
'howTo':['Chargez votre PDF protégé','Entrez le mot de passe','Téléchargez le PDF déverrouillé'],
'relatedSlugs':['proteger-pdf','compresser-pdf','fusionner-pdf'],
})
E.append({
'slug':'proteger-pdf','toolId':'pdf-protect','category':'pdf',
'title':"Protéger PDF en Ligne Gratuit — Ajouter Mot de Passe",
'desc':"Ajoutez un mot de passe à vos fichiers PDF pour les sécuriser. Gratuit, sans inscription, 100% local.",
'h1':"Protéger un PDF avec un mot de passe",
'intro':"""Sécurisez vos documents PDF en leur ajoutant une protection par mot de passe. Seules les personnes connaissant le mot de passe pourront ouvrir et lire votre fichier, ce qui est essentiel pour les documents confidentiels comme les contrats, les relevés bancaires, les dossiers médicaux ou les données personnelles. Notre outil vous permet de choisir un mot de passe robuste et de l'appliquer instantanément à votre PDF. Le chiffrement AES-128 ou AES-256 est utilisé pour garantir une protection solide. Le processus est entièrement local : votre document et votre mot de passe restent sur votre appareil et ne sont jamais transmis à un serveur. Le service est gratuit et ne nécessite aucune inscription. Vous pouvez protéger autant de PDF que vous le souhaitez. Pour une sécurité optimale, choisissez un mot de passe d'au moins 8 caractères combinant majuscules, minuscules, chiffres et symboles.""",
'faq':[
{'q':'Quel niveau de protection cet outil offre-t-il ?','a':"Votre PDF sera chiffré avec AES-128 ou AES-256 et nécessitera un mot de passe pour être ouvert. Utilisez un mot de passe fort pour une sécurité maximale."},
{'q':'Est-ce gratuit et sécurisé ?','a':"Oui, 100% gratuit sans inscription. Le traitement est entièrement local : votre document et votre mot de passe ne quittent jamais votre appareil."},
{'q':'Puis-je protéger plusieurs PDF à la fois ?','a':"Oui, vous pouvez protéger autant de PDF que vous le souhaitez, sans limite ni inscription."},
{'q':'Que se passe-t-il si j'oublie le mot de passe ?','a':"Il n'existe aucun moyen de récupérer le mot de passe. Conservez-le soigneusement, car sans lui le PDF sera inaccessible."},
],
'howTo':['Chargez votre PDF','Choisissez un mot de passe','Téléchargez le PDF protégé'],
'relatedSlugs':['deverrouiller-pdf','compresser-pdf','signer-pdf'],
})
E.append({
'slug':'convertir-image','toolId':'img-convert','category':'image',
'title':"Convertisseur d'Images en Ligne Gratuit — WebP, AVIF, JPG, PNG",
'desc':"Convertissez vos images en WebP, AVIF, JPG, PNG et plus. Gratuit, sans inscription, traitement 100% local.",
'h1':"Convertir des images en WebP, AVIF, JPG, PNG",
'intro':"""Convertissez vos images entre tous les formats populaires : WebP, AVIF, JPG, PNG, GIF, BMP et TIFF. Le WebP et l'AVIF sont les formats modernes qui offrent une compression nettement supérieure au JPG classique, réduisant le poids de vos images de 30 à 50% sans perte de qualité visible. Idéal pour accélérer le chargement de vos sites web et améliorer votre référencement SEO. Les développeurs web, graphistes et blogueurs utilisent quotidiennement la conversion d'images pour optimiser les visuels de leurs projets. Vous pouvez convertir une ou plusieurs images en un clic, choisir la qualité de sortie et télécharger les résultats. Tout le traitement s'effectue localement dans votre navigateur : vos images restent sur votre appareil et ne sont jamais envoyées à un serveur. Le service est entièrement gratuit et sans inscription.""",
'faq':[
{'q':'Est-ce gratuit et sans inscription ?','a':"Oui, 100% gratuit et sans inscription. Vous pouvez convertir autant d'images que vous le souhaitez."},
{'q':'Pourquoi convertir en WebP ou AVIF ?','a':"Le WebP et l'AVIF offrent une compression bien supérieure au JPG, réduisant le poids des images de 30 à 50% sans perte visible. Cela accélère le chargement de vos pages web et améliore votre SEO."},
{'q':'Mes images sont-elles sécurisées ?','a':"Oui, tout le traitement se fait dans votre navigateur. Vos images ne sont jamais envoyées à un serveur ni stockées en ligne."},
],
'howTo':['Chargez votre image','Choisissez le format de sortie','Ajustez la qualité si nécessaire','Téléchargez l\'image convertie'],
'relatedSlugs':['compresser-image','redimensionner-image','pdf-en-images'],
})
E.append({
'slug':'compresser-image','toolId':'img-compress','category':'image',
'title':"Compresser Image en Ligne Gratuit — Optimiser le Poids",
'desc':"Réduisez le poids de vos images JPG, PNG, WebP sans perte de qualité visible. Gratuit, sans inscription, 100% local.",
'h1':"Compresser une image en ligne gratuitement",
'intro':"""Réduisez instantanément le poids de vos images sans dégradation visible de la qualité. Notre outil de compression d'images optimise vos fichiers JPG, PNG et WebP en ajustant le niveau de compression selon vos besoins. Une image compressée charge plus rapidement sur un site web, consomme moins de bande passante et améliore l'expérience utilisateur et le référencement SEO. Les développeurs web, les blogueurs et les professionnels du marketing ont tout intérêt à compresser leurs images avant de les publier en ligne. Google recommande d'ailleurs l'optimisation des images comme critère de performance. Vous pouvez choisir entre une compression légère, équilibrée ou forte, et comparer le résultat avec l'original avant de télécharger. Le traitement est entièrement local dans votre navigateur : vos images ne sont jamais envoyées à un serveur. Le service est gratuit et sans inscription.""",
'faq':[
{'q':'Est-ce gratuit et sans inscription ?','a':"Oui, l'outil est 100% gratuit et sans inscription. Vous pouvez compresser autant d'images que vous le souhaitez."},
{'q':'La qualité sera-t-elle préservée ?','a':"Vous choisissez le niveau de compression. En mode léger ou équilibré, la perte de qualité est imperceptible. Vous pouvez prévisualiser le résultat avant de télécharger."},
{'q':'Quels formats sont supportés ?','a':"JPG, PNG, WebP, GIF, BMP et AVIF. La compression est optimisée pour chaque format."},
{'q':'Comment ça marche techniquement ?','a':"L'outil ajuste les paramètres de compression (qualité JPEG, palette PNG, etc.) directement dans votre navigateur en utilisant les API Canvas et les codecs natifs."},
],
'howTo':['Chargez votre image','Choisissez le niveau de compression','Prévisualisez le résultat','Téléchargez l\'image compressée'],
'relatedSlugs':['convertir-image','redimensionner-image','supprimer-arriere-plan'],
})
E.append({
'slug':'redimensionner-image','toolId':'img-resize','category':'image',
'title':"Redimensionner Image en Ligne Gratuit — Changer Taille Image",
'desc':"Redimensionnez vos images JPG, PNG, WebP facilement. Par pourcentage ou dimensions exactes. Gratuit et 100% local.",
'h1':"Redimensionner une image en ligne",
'intro':"""Modifiez les dimensions de vos images en quelques clics, que ce soit pour les adapter à un site web, un profil social, une impression ou un email. Notre outil vous permet de redimensionner par pourcentage, par largeur ou hauteur fixe, ou en spécifiant les dimensions exactes souhaitées. Vous pouvez choisir de conserver les proportions ou de forcer de nouvelles dimensions. Les développeurs web redimensionnent fréquemment leurs images pour les adapter aux résolutions d'écran et aux grilles CSS, tandis que les photographes ajustent les dimensions pour l'impression. Le traitement s'effectue entièrement dans votre navigateur : vos images restent sur votre appareil et ne sont jamais envoyées à un serveur. Le service est gratuit et sans inscription. Vous pouvez redimensionner plusieurs images à la suite sans limitation.""",
'faq':[
{'q':'Est-ce gratuit et sans inscription ?','a':"Oui, 100% gratuit et sans inscription. Aucune limite sur le nombre d'images à redimensionner."},
{'q':'Puis-je conserver les proportions ?','a':"Oui, par défaut l'outil conserve les proportions. Décochez l'option si vous souhaitez forcer des dimensions spécifiques."},
{'q':'Quels formats sont supportés ?','a':"JPG, PNG, WebP, GIF, BMP et la plupart des formats d'image courants."},
],
'howTo':['Chargez votre image','Entrez les nouvelles dimensions ou le pourcentage','Choisissez de conserver ou non les proportions','Téléchargez l\'image redimensionnée'],
'relatedSlugs':['compresser-image','convertir-image','supprimer-arriere-plan'],
})
E.append({
'slug':'supprimer-arriere-plan','toolId':'img-bgremove','category':'image',
'title':"Supprimer Arrière-Plan Image en Ligne Gratuit — Détourage Auto",
'desc':"Supprimez l'arrière-plan de vos images automatiquement. Détourage IA gratuit, sans inscription, 100% local.",
'h1':"Supprimer l'arrière-plan d'une image",
'intro':"""Éliminez automatiquement l'arrière-plan de vos images en un clic grâce à notre technologie de détourage intelligent. Plus besoin de tracer manuellement des contours complexes dans Photoshop : notre algorithme détecte le sujet principal et supprime le fond avec précision. Cet outil est indispensable pour créer des visuels e-commerce, des portraits professionnels, des logos transparents ou des montages photo. Les vendeurs en ligne l'utilisent pour présenter leurs produits sur un fond blanc uniforme, tandis que les designers s'en servent pour isoler des éléments graphiques. Le résultat est téléchargeable en PNG avec transparence ou en JPG avec fond blanc. Tout le traitement s'effectue localement dans votre navigateur grâce à l'intelligence artificielle intégrée : vos images ne sont jamais envoyées à un serveur. Le service est gratuit et sans inscription.""",
'faq':[
{'q':'Est-ce gratuit et sans inscription ?','a':"Oui, 100% gratuit et sans inscription. Vous pouvez supprimer l'arrière-plan d'autant d'images que vous le souhaitez."},
{'q':'Comment fonctionne le détourage automatique ?','a':"Un algorithme d'intelligence artificielle s'exécutant dans votre navigateur détecte le sujet principal de l'image et sépare l'arrière-plan automatiquement."},
{'q':'Dans quel format télécharger le résultat ?','a':"Vous pouvez télécharger en PNG (avec transparence) pour les montages, ou en JPG (avec fond blanc) pour les visuels e-commerce."},
{'q':'La qualité du détourage est-elle bonne ?','a':"L'algorithme offre d'excellents résultats sur les portraits, produits et objets bien détachés du fond. Pour les images complexes, vous pouvez affiner le résultat manuellement."},
],
'howTo':['Chargez votre image','L\'algorithme détecte et supprime l\'arrière-plan automatiquement','Ajustez si nécessaire','Téléchargez en PNG ou JPG'],
'relatedSlugs':['compresser-image','convertir-image','redimensionner-image'],
})
E.append({
'slug':'heic-vers-jpg','toolId':'heic-to-jpg','category':'image',
'title':"Convertir HEIC en JPG en Ligne Gratuit — Photos iPhone",
'desc':"Convertissez vos photos iPhone HEIC en JPG ou PNG. Gratuit, sans inscription, traitement 100% local.",
'h1':"Convertir des photos HEIC en JPG ou PNG",
'intro':"""Transformez vos photos iPhone au format HEIC en fichiers JPG ou PNG universellement compatibles. Le format HEIC (High Efficiency Image Container) est utilisé par défaut sur les iPhones depuis iOS 11, mais de nombreux logiciels, sites web et appareils ne le prennent pas en charge. Notre convertisseur vous permet de retrouver une compatibilité totale en transformant vos photos HEIC en JPG (idéal pour le partage) ou en PNG (idéal pour la qualité maximale avec transparence). Vous pouvez convertir une ou plusieurs photos à la fois, ce qui est particulièrement utile après un transfert de photos depuis un iPhone vers un PC Windows ou un appareil Android. Le traitement s'effectue entièrement dans votre navigateur : vos photos restent sur votre appareil et ne sont jamais envoyées à un serveur. Le service est gratuit et sans inscription.""",
'faq':[
{'q':'Est-ce gratuit et sans inscription ?','a':"Oui, 100% gratuit et sans inscription. Convertissez autant de photos HEIC que vous le souhaitez."},
{'q':'Pourquoi convertir HEIC en JPG ?','a':"Le format HEIC n'est pas universellement supporté. Le JPG est compatible avec tous les logiciels, sites web et appareils, ce qui facilite le partage et l'édition."},
{'q':'La qualité est-elle conservée ?','a':"Oui, la conversion préserve la qualité d'origine de votre photo. Vous pouvez choisir le niveau de qualité JPG selon vos besoins."},
],
'howTo':['Chargez vos photos HEIC','Choisissez le format de sortie (JPG ou PNG)','Téléchargez les photos converties'],
'relatedSlugs':['convertir-image','compresser-image','redimensionner-image'],
})
E.append({
'slug':'generateur-favicon','toolId':'favicon-generator','category':'image',
'title':"Générateur de Favicon en Ligne Gratuit — Icônes Site Web",
'desc':"Générez des favicons et icônes de site web à partir de votre image. Gratuit, sans inscription, 100% local.",
'h1':"Générer un favicon pour votre site web",
'intro':"""Créez toutes les tailles de favicon et d'icônes nécessaires pour votre site web à partir d'une seule image source. Notre générateur produit automatiquement les fichiers favicon.ico, Apple Touch Icon, Android Chrome et les icônes PWA dans toutes les résolutions requises (16x16, 32x32, 48x48, 64x64, 180x180, 192x192, 512x512 pixels). Un favicon professionnel renforce l'identité visuelle de votre site, améliore la reconnaissance dans les onglets du navigateur et les favoris, et constitue un critère de qualité pour le référencement SEO. Les développeurs web et les designers utilisent cet outil pour générer en un clic l'ensemble complet d'icônes nécessaire au support multi-plateforme. Le code HTML à insérer dans votre balise head est automatiquement généré. Le traitement est entièrement local dans votre navigateur : votre image ne quitte jamais votre appareil. Le service est gratuit et sans inscription.""",
'faq':[
{'q':'Est-ce gratuit et sans inscription ?','a':"Oui, 100% gratuit et sans inscription. Générez autant de favicons que vous le souhaitez."},
{'q':'Quelles tailles de favicon sont générées ?','a':"L'outil génère toutes les tailles standard : 16x16, 32x32, 48x48, 64x64 pour favicon.ico, 180x180 pour Apple, 192x192 et 512x512 pour Android/PWA."},
{'q':'Comment installer le favicon sur mon site ?','a':"Téléchargez le pack ZIP, placez les fichiers à la racine de votre site et copiez le code HTML fourni dans la balise head de vos pages."},
{'q':'Quel format d\'image source puis-je utiliser ?','a':"JPG, PNG, WebP, SVG ou BMP. Pour de meilleurs résultats, utilisez une image carrée d'au moins 512x512 pixels."},
],
'howTo':['Chargez votre image source','Ajustez le cadrage si nécessaire','Téléchargez le pack complet','Insérez le code HTML dans votre site'],
'relatedSlugs':['convertir-image','compresser-image','telecharger-miniature-youtube'],
})
E.append({
'slug':'telecharger-miniature-youtube','toolId':'youtube-thumbnail','category':'image',
'title':"Télécharger Miniature YouTube en HD Gratuit — Thumbnail Grabber",
'desc':"Téléchargez les miniatures HD de vidéos YouTube en un clic. Résolution maximale 1280x720. Gratuit et sans inscription.",
'h1':"Télécharger la miniature d'une vidéo YouTube",
'intro':"""Récupérez la miniature (thumbnail) de n'importe quelle vidéo YouTube en haute résolution (1280x720 pixels) en collant simplement son URL. Les miniatures YouTube sont des visuels puissants utilisés par les créateurs de contenu, les marketeurs et les designers pour des présentations, des articles de blog, des montages vidéo ou des analyses de contenu. Notre outil récupère instantanément la miniature officielle dans la meilleure résolution disponible, sans nécessiter de connexion YouTube ni de logiciel tiers. Vous pouvez télécharger la miniature en JPG directement sur votre appareil. Cet outil est particulièrement utile pour les agences de marketing qui analysent les stratégies visuelles des chaînes populaires, ou pour les créateurs qui souhaitent s'inspirer des miniatures performantes. Le service est gratuit et sans inscription.""",
'faq':[
{'q':'Est-ce gratuit et sans inscription ?','a':"Oui, 100% gratuit et sans inscription. Téléchargez autant de miniatures que vous le souhaitez."},
{'q':'Quelle résolution puis-je obtenir ?','a':"La résolution maximale est de 1280x720 pixels (HD), soit la meilleure qualité disponible pour les miniatures YouTube."},
{'q':'Puis-je télécharger la miniature de n\'importe quelle vidéo ?','a':"Oui, tant que la vidéo est publique sur YouTube. Collez l'URL de la vidéo et la miniature sera récupérée instantanément."},
],
'howTo':['Collez l\'URL de la vidéo YouTube','Cliquez sur Télécharger','Récupérez la miniature en HD'],
'relatedSlugs':['convertir-image','generateur-favicon','compresser-image'],
})
