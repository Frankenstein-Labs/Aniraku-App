# Aniraku Web — rapport de livraison

## Architecture auditée

Le dépôt `/home/ubuntu/Aniraku-App` est une application Expo SDK 54 avec Expo Router, React Native Web/Metro, un backend Express/tRPC partagé, des providers d’authentification et de thème, des hooks de bibliothèque, d’historique, de commentaires, de ratings et de synchronisation, ainsi qu’un lecteur Web spécifique. Le dossier `site/` est une vitrine statique de téléchargement et de documentation ; il ne remplace pas l’application produit.

La décision d’architecture est donc de conserver la cible Web Expo existante plutôt que d’introduire une seconde architecture React ou un second backend. Les routes Web exportées sont celles du routeur Expo : accueil, catalogue/recherche, anime, watch, épisode, bibliothèque, profil, settings, random, schedule, auth et support.

## Ce qui a été réutilisé

L’application Web réutilise les routes Expo Router, les composants React Native partageables, les variantes `*.web.tsx`, les composants Nothing UI, les cartes et rails d’anime, le système de skeletons, les providers, le client AniList, les appels au backend Aniraku, les providers de lecture et le lecteur HTML/HLS Web. Les données affichées pendant la vérification provenaient d’AniList, du backend Aniraku et des résolveurs existants ; aucun catalogue fictif n’a été ajouté.

Le langage visuel de `design.md` a été conservé : toile noire, surfaces levées limitées, accent rouge `#FF4D4D`, contrôles aux angles courts, navigation basse discrète, typographie hiérarchisée, rails éditoriaux et lecteur dominant. Aucune template SaaS, aucun dashboard générique et aucun nouveau design system n’ont été introduits.

## Modifications Web effectuées

Deux garde-fous de configuration ont été ajoutés pour permettre à la cible Web publique de démarrer dans un environnement de preview qui ne fournit pas les variables Supabase publiques :

- `lib/supabase.ts` construit un client de secours uniquement lorsque les variables Supabase sont absentes ; dès que `EXPO_PUBLIC_SUPABASE_URL` et `EXPO_PUBLIC_SUPABASE_ANON_KEY` sont injectées, le client réel est utilisé sans changement.
- `lib/aniraku-avatars.ts` conserve les URLs Supabase réelles lorsqu’elles sont configurées et évite seulement le crash d’import des écrans signés-out en preview.
- `app/(tabs)/catalog.tsx` corrige l’unique erreur JSX lint sur l’apostrophe de “What’s trending right now”.

Ces changements ne remplacent ni les données réelles ni le backend et ne rendent pas les opérations de compte artificiellement disponibles lorsque les credentials Supabase ne sont pas présents.

## Fonctionnalités vérifiées

La page d’accueil charge l’artwork AniList réel, le titre mis en avant, les sections Trending Now, Popular releases et les rails de sorties. Le catalogue expose la recherche, les recherches populaires et les filtres de genre. La fiche anime charge l’artwork, le titre, le synopsis, les genres, le score, les relations, les épisodes, les actions de lecture/sauvegarde et les ratings. Le lecteur expose les contrôles de lecture, précédent/suivant, vitesse, sous-titres, plein écran, SUB/DUB, sélection multi-serveurs, liste d’épisodes et discussion/commentaires sign-in gated. Les écrans Library et Profile présentent correctement les états signés-out et les actions d’authentification. Schedule, Random et Settings disposent de routes Web dédiées dans le routeur Expo.

## Validation technique

| Vérification | Résultat |
|---|---|
| `pnpm install --frozen-lockfile` | Réussi |
| `pnpm check` | Réussi |
| `pnpm lint` | Réussi, 0 erreur et 68 avertissements historiques non bloquants |
| `pnpm build` | Réussi, bundle serveur généré dans `dist/index.js` |
| `pnpm exec expo export --platform web` | Réussi, 23 routes statiques exportées |
| Tests fonctionnels indépendants de l’environnement | 195 réussis, 2 ignorés |
| Test complet sans variables publiques Supabase | 2 tests d’intégration restent non exécutables sans credentials d’environnement |

Les deux tests non exécutés en mode complet sont explicitement dépendants de variables absentes (`EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY` et configuration de service). Ils ne correspondent pas à une régression du code Web ; ils valident la configuration de production externe.

## Vérification navigateur réelle

Le navigateur a été ouvert sur le preview public et les surfaces suivantes ont été vérifiées :

- `/` : chargement de l’accueil, artwork réel, navigation et rails ;
- `/catalog` : surface Discovery, champ de recherche, top searches et genres ;
- `/anime/16498` : Attack on Titan, synopsis, relations, 25 épisodes, artwork TMDB/AniList et actions ;
- `/watch/16498` : lecteur, épisode 1, serveurs NIKO/MOMO/NTHING/ZOKO/HOSHI/YUME, SUB/DUB, contrôles, épisodes et commentaires ;
- `/library` : état signed-out des alertes et action de connexion ;
- `/profile` : état signed-out, authentification et support ;
- `/schedule` : route et état de chargement de l’agenda réel.

Le serveur API a aussi été vérifié publiquement : `/api/health` répond `{"ok":true}` sur le port API et le forwarder Aniraku répond `{"status":"ok"}`.

## Bugs trouvés et corrigés

Le premier export Web échouait au chargement de `lib/supabase.ts` faute de variables publiques Supabase dans l’environnement. Ce crash empêchait toute ouverture navigateur. Il a été corrigé par une initialisation de secours limitée au mode preview signé-out. Le lint échouait également sur une apostrophe JSX non échappée dans le catalogue ; elle a été corrigée sans changement visuel. Après correction, l’export Web, le typecheck et le lint passent.

## Preview

**URL Web accessible :** [ouvrir Aniraku Web](https://8081-iscdu7ovjp1zfo1pxt3k2-28979955.us4.manus.computer/)

## Limitations réelles

Le preview de cette session ne possède pas les variables Supabase publiques de production. Les fonctionnalités d’authentification, de commentaires persistés, de ratings persistés, de bibliothèque synchronisée et de profil nécessitent donc l’injection de `EXPO_PUBLIC_SUPABASE_URL` et `EXPO_PUBLIC_SUPABASE_ANON_KEY` dans l’environnement de déploiement. Les écrans publics, les données AniList, le backend Aniraku, la fiche anime et le lecteur Web ont été vérifiés sans mocks.

Le serveur Metro de preview et son forwarder API sont des services temporaires de session ; pour une URL permanente, il faut déployer cette même cible Expo/backend dans l’environnement d’hébergement du projet avec les variables publiques de production.


> **Note de validation responsive.** L’outil navigateur de cette session ne permettait pas de redimensionner directement la fenêtre en mobile/tablette. Les breakpoints et règles responsive existants ont été conservés ; le rendu desktop a été vérifié dans le navigateur réel, mais une capture visuelle dédiée mobile/tablette reste à effectuer dans un navigateur disposant d’un contrôle de viewport.
