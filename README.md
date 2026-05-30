# Align-o-matic

Align-o-matic est une application web de JEDI-OpenLab dédiée à la conception d'objectifs pédagogiques et à l'alignement pédagogique. Elle aide à formuler des objectifs observables, à situer leur niveau dans la taxonomie de Bloom, puis à vérifier la cohérence entre objectifs, activités, évaluations, critères et syllabus.

## Objectif de l'application

L'application sert d'atelier de conception pour les enseignants, équipes pédagogiques ou accompagnateurs qui veulent :

- distinguer un objectif pédagogique d'un contenu, d'une activité ou d'une modalité d'évaluation ;
- rédiger un objectif du point de vue de l'étudiant ;
- choisir un verbe d'action cohérent avec le niveau de complexité attendu ;
- utiliser la taxonomie de Bloom comme repère de formulation ;
- concevoir des activités et évaluations alignées avec les objectifs annoncés ;
- vérifier un dispositif grâce à une checklist d'alignement ;
- rendre l'alignement visible dans un syllabus.

## Contenus couverts

La page présente :

- une définition détaillée de l'objectif pédagogique ;
- une méthode de rédaction en plusieurs étapes ;
- la taxonomie de Bloom révisée avec exemples de verbes et d'objectifs ;
- les domaines cognitif, psychomoteur et socio-affectif ;
- le principe d'alignement pédagogique ;
- des exemples de défauts d'alignement ;
- une matrice reliant objectifs, activités et évaluations ;
- une introduction à l'évaluation critériée ;
- une checklist interactive ;
- des repères pour expliciter l'alignement dans un syllabus.

La section bibliographique n'est pas intégrée pour le moment. Elle pourra être ajoutée plus tard sous forme de vraie base de références, séparée du contenu pédagogique principal.

## Fonctionnalités

- Générateur rapide d'objectif pédagogique.
- Sélection du niveau de Bloom et du verbe d'action.
- Copie de l'objectif généré.
- Cartes Bloom filtrables par profondeur d'apprentissage.
- Matrice objectifs / activités / évaluations.
- Checklist persistante via `localStorage`.
- Aides contextuelles accessibles avec les boutons `?`.

## Structure des fichiers

```text
align-o-matic/
|-- LICENSE.md
|-- README.md
|-- index.html
`-- assets/
    |-- app.js
    `-- styles.css
```

## Lancer l'application

L'application est statique. Elle peut être ouverte directement depuis `index.html`.


## Maintenance

- Modifier les contenus éditoriaux principaux dans `index.html`.
- Modifier les niveaux de Bloom, verbes, exemples, matrices et checklist dans `assets/app.js`.
- Modifier la mise en page et les composants visuels dans `assets/styles.css`.
- Ajouter de nouvelles aides contextuelles avec un bouton portant les attributs `data-help-title` et `data-help-body`.

## Licence

Le code et les contenus pédagogiques propres à `align-o-matic` sont distribués sous licence MIT.

Voir [LICENSE.md](LICENSE.md).

## Pistes d'évolution

- Ajouter une vraie base bibliographique.
- Exporter la checklist ou l'objectif généré.
- Proposer des exemples d'objectifs par discipline.
- Ajouter un mode atelier pour comparer plusieurs objectifs.
- Relier les objectifs à des grilles critériées exportables.
