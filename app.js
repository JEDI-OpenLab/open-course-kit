(() => {
  const version = "2026-05-30";
  const logoPath = "assets/jedi-openlab-logo.png";
  const currentFile = window.location.pathname.split("/").pop() || "index.html";

  const pages = [
    { file: "index.html", label: "Accueil" },
    { file: "licences.html", label: "Licences" },
    { file: "preparer.html", label: "Préparer" },
    { file: "github.html", label: "GitHub" },
    { file: "accessibilite.html", label: "Accessibilité" },
    { file: "modeles.html", label: "Modèles" },
    { file: "a-propos.html", label: "À propos" },
    { file: "https://jedi-openlab.github.io/jedi/", label: "JEDI-OpenLab" },
  ];

  const escapeHtml = (value) =>
    String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

  const getValue = (form, name) => {
    const field = form.elements[name];
    return field ? String(field.value || "").trim() : "";
  };

  const getRadio = (form, name) => {
    const field = form.querySelector(`input[name="${name}"]:checked`);
    return field ? field.value : "";
  };

  const insertAfterHero = (html) => {
    const hero = document.querySelector(".hero");
    if (!hero || document.querySelector(".tool-section")) return null;
    hero.insertAdjacentHTML("afterend", html);
    return hero.nextElementSibling;
  };

  const ensureSkipLink = () => {
    if (document.querySelector(".skip-link")) return;
    const link = document.createElement("a");
    link.className = "skip-link";
    link.href = "#contenu";
    link.textContent = "Aller au contenu";
    document.body.prepend(link);
    const main = document.querySelector("main");
    if (main && !main.id) main.id = "contenu";
  };

  const renderLayout = () => {
    const nav = pages
      .map((page) => {
        const active = page.file === currentFile || (currentFile === "" && page.file === "index.html");
        return `<a href="${page.file}"${active ? ' aria-current="page"' : ""}>${page.label}</a>`;
      })
      .join("");

    const header = document.querySelector(".site-header");
    if (header) {
      header.innerHTML = `
        <div class="header-inner">
          <a class="brand" href="index.html" aria-label="Accueil Open Course Kit">
            <img src="${logoPath}" alt="JEDI-OpenLab" width="52" height="52">
            <span class="brand-text">
              <strong>Open Course Kit</strong>
              <span>Une ressource JEDI-OpenLab</span>
            </span>
          </a>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">Menu</button>
          <nav class="main-nav" id="primary-nav" aria-label="Navigation principale">
            ${nav}
          </nav>
        </div>`;

      const menuButton = header.querySelector(".menu-toggle");
      const primaryNav = header.querySelector("#primary-nav");
      menuButton?.addEventListener("click", () => {
        const isOpen = primaryNav?.classList.toggle("is-open") || false;
        menuButton.setAttribute("aria-expanded", String(isOpen));
      });
      primaryNav?.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          primaryNav.classList.remove("is-open");
          menuButton?.setAttribute("aria-expanded", "false");
        });
      });
    }

    const footer = document.querySelector(".site-footer");
    if (footer) {
      footer.classList.add("footer-shell");
      footer.innerHTML = `
        <div class="footer-inner">
          <div class="footer-brand">
            <img src="${logoPath}" alt="" width="40" height="40">
            <span><strong>Open Course Kit</strong><br><small>JEDI-OpenLab · Version ${version}</small></span>
          </div>
          <div class="footer-links" aria-label="Liens de pied de page">
            <a href="a-propos.html">À propos</a>
            <a href="licences.html">Licences</a>
            <a href="modeles.html">Modèles</a>
            <a href="LICENSE">CC BY 4.0</a>
          </div>
        </div>`;
    }
  };

  const enhanceCopyBlocks = () => {
    document.querySelectorAll(".copy-block pre").forEach((pre, index) => {
      const block = pre.closest(".copy-block");
      if (!block || block.querySelector(".copy-button")) return;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "copy-button";
      button.textContent = "Copier";
      button.setAttribute("aria-label", `Copier le modèle ${index + 1}`);
      button.addEventListener("click", async () => {
        const text = pre.textContent.trim();
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          const textarea = document.createElement("textarea");
          textarea.value = text;
          textarea.setAttribute("readonly", "");
          textarea.style.position = "fixed";
          textarea.style.left = "-9999px";
          document.body.append(textarea);
          textarea.select();
          document.execCommand("copy");
          textarea.remove();
        }
        const previous = button.textContent;
        button.textContent = "Copié";
        setTimeout(() => {
          button.textContent = previous;
        }, 1600);
      });
      block.prepend(button);
    });
  };

  const enhanceTables = () => {
    document.querySelectorAll(".table-wrapper").forEach((wrapper) => {
      wrapper.setAttribute("tabindex", "0");
      if (!wrapper.hasAttribute("aria-label")) {
        wrapper.setAttribute("aria-label", "Tableau défilable horizontalement");
      }
    });
  };

  const renderHomeDashboard = () => {
    if (currentFile !== "index.html") return;
    insertAfterHero(`
      <section class="tool-section" id="demarrer" aria-labelledby="demarrer-title">
        <div class="tool-inner">
          <p class="kicker">Parcours rapide</p>
          <h2 id="demarrer-title">Partir d’une ressource et arriver à une publication réutilisable</h2>
          <p>Open Course Kit propose un chemin simple : vérifier ce qui peut être partagé, choisir une licence, préparer les fichiers, documenter le contexte, puis publier proprement.</p>
          <div class="dashboard-grid">
            <div class="cards two-columns">
              <article class="card">
                <h3>1. Clarifier les droits</h3>
                <p>Identifier les contenus originaux, les contenus tiers, les données personnelles et les éléments à retirer.</p>
                <a href="preparer.html">Préparer la ressource</a>
              </article>
              <article class="card">
                <h3>2. Choisir une licence</h3>
                <p>Comprendre les différences entre CC0, CC BY, CC BY-SA et les clauses plus restrictives.</p>
                <a href="licences.html">Comparer les licences</a>
              </article>
              <article class="card">
                <h3>3. Structurer le dépôt</h3>
                <p>Mettre en place un README, une licence, des crédits, des sources et une documentation lisible.</p>
                <a href="github.html">Structurer sur GitHub</a>
              </article>
              <article class="card">
                <h3>4. Faciliter la reprise</h3>
                <p>Améliorer la lisibilité, fournir les formats sources et rendre les consignes compréhensibles hors contexte.</p>
                <a href="accessibilite.html">Améliorer l’accessibilité</a>
              </article>
            </div>
            <aside class="result-panel">
              <h3>Ce que vous pouvez produire avec le kit</h3>
              <ul class="checklist">
                <li>Une mention de licence claire.</li>
                <li>Un README adapté à une ressource pédagogique.</li>
                <li>Une fiche ressource réutilisable.</li>
                <li>Une checklist avant publication.</li>
                <li>Une structure de dépôt prête pour GitHub Pages.</li>
              </ul>
              <a class="button ghost" href="modeles.html">Ouvrir les modèles</a>
            </aside>
          </div>
        </div>
      </section>`);
  };

  const renderLicenseHelper = () => {
    if (currentFile !== "licences.html") return;
    const warning = document.querySelector("#prudence-juridique")?.closest("section");
    if (!warning || document.querySelector("#assistant-licence")) return;
    warning.insertAdjacentHTML(
      "afterend",
      `<section class="tool-section" id="assistant-licence" aria-labelledby="assistant-licence-title">
        <div class="tool-inner">
          <p class="kicker">Assistant express</p>
          <h2 id="assistant-licence-title">Obtenir une première orientation de licence</h2>
          <p>Répondez à quelques questions pour obtenir une piste. Le résultat reste indicatif : il faut toujours vérifier les droits des contenus tiers et les règles applicables à votre contexte.</p>
          <div class="tool-grid">
            <form class="tool-panel" id="license-form">
              <fieldset>
                <legend>La ressource contient-elle des contenus tiers à republier ?</legend>
                <div class="choice-list">
                  <label><input type="radio" name="tiers" value="no" checked> Non, elle est essentiellement originale.</label>
                  <label><input type="radio" name="tiers" value="yes"> Oui, elle contient des images, extraits, données ou médias de tiers.</label>
                </div>
              </fieldset>
              <fieldset>
                <legend>Souhaitez-vous autoriser les adaptations ?</legend>
                <div class="choice-list">
                  <label><input type="radio" name="adapt" value="yes" checked> Oui, la ressource doit pouvoir être modifiée.</label>
                  <label><input type="radio" name="adapt" value="no"> Non, je souhaite éviter les modifications.</label>
                </div>
              </fieldset>
              <fieldset>
                <legend>Quelle condition souhaitez-vous privilégier ?</legend>
                <div class="choice-list">
                  <label><input type="radio" name="condition" value="open" checked> La réutilisation la plus large possible.</label>
                  <label><input type="radio" name="condition" value="by"> Une attribution obligatoire.</label>
                  <label><input type="radio" name="condition" value="sa"> Le partage des adaptations sous la même licence.</label>
                  <label><input type="radio" name="condition" value="nc"> L’interdiction des usages commerciaux.</label>
                </div>
              </fieldset>
            </form>
            <div class="result-panel" id="license-result" aria-live="polite"></div>
          </div>
        </div>
      </section>`
    );

    const form = document.querySelector("#license-form");
    const result = document.querySelector("#license-result");
    const update = () => {
      const tiers = getRadio(form, "tiers");
      const adapt = getRadio(form, "adapt");
      const condition = getRadio(form, "condition");
      let title = "CC0 1.0 Universal";
      let body = "Piste adaptée si vous détenez les droits nécessaires et souhaitez maximiser la circulation, l’adaptation et la republication de la ressource.";

      if (tiers === "yes") {
        title = "Commencer par un inventaire des droits";
        body = "Avant de choisir une licence globale, signalez les contenus tiers, leurs sources et leurs conditions. La licence ouverte ne couvrira que les contenus que vous avez le droit de licencier.";
      } else if (adapt === "no") {
        title = "CC BY-ND, avec prudence";
        body = "Cette option limite les modifications. Elle peut convenir à un document que vous voulez diffuser tel quel, mais elle est généralement peu adaptée aux ressources éducatives libres.";
      } else if (condition === "by") {
        title = "CC BY";
        body = "Bon équilibre si vous voulez autoriser les adaptations et les usages larges tout en imposant l’attribution.";
      } else if (condition === "sa") {
        title = "CC BY-SA";
        body = "Option pertinente si vous souhaitez que les adaptations restent dans une logique de partage à l’identique.";
      } else if (condition === "nc") {
        title = "CC BY-NC, à manier avec prudence";
        body = "La clause NC peut rassurer, mais elle limite certains usages pédagogiques et la notion d’usage commercial peut être difficile à interpréter.";
      }

      result.innerHTML = `
        <h3>Orientation proposée : ${title}</h3>
        <p>${body}</p>
        <p><strong>À vérifier :</strong> contenus tiers, données personnelles, contrats, marques, logiciels et règles institutionnelles.</p>`;
    };

    form.addEventListener("change", update);
    update();
  };

  const renderAuditTool = () => {
    if (currentFile !== "preparer.html") return;
    const warning = document.querySelector("#attention")?.closest("section");
    if (!warning || document.querySelector("#audit-ouverture")) return;
    const items = [
      "Les auteurs et contributeurs sont identifiés.",
      "Les contenus originaux et les contenus tiers sont distingués.",
      "Les droits des images, médias et extraits ont été vérifiés.",
      "Les données personnelles ou sensibles ont été retirées ou anonymisées.",
      "Une licence claire est prévue pour les contenus originaux.",
      "Un README ou une fiche ressource explique le contexte d’usage.",
      "Des formats sources modifiables sont fournis quand c’est pertinent.",
      "Les crédits et sources sont regroupés dans une section dédiée.",
    ];

    warning.insertAdjacentHTML(
      "afterend",
      `<section class="tool-section" id="audit-ouverture" aria-labelledby="audit-title">
        <div class="tool-inner">
          <p class="kicker">Audit express</p>
          <h2 id="audit-title">Mesurer l’état de préparation avant publication</h2>
          <p>Cochez les points déjà traités. L’objectif n’est pas d’obtenir un score parfait, mais de repérer les actions les plus utiles avant de rendre la ressource publique.</p>
          <div class="tool-grid">
            <form class="tool-panel" id="audit-form">
              <div class="choice-list">
                ${items
                  .map((item, index) => `<label><input type="checkbox" name="audit" value="${index}"> ${item}</label>`)
                  .join("")}
              </div>
            </form>
            <div class="result-panel" id="audit-result" aria-live="polite">
              <h3>Préparation</h3>
              <div class="score-meter" aria-hidden="true"><span></span></div>
              <p></p>
            </div>
          </div>
        </div>
      </section>`
    );

    const form = document.querySelector("#audit-form");
    const meter = document.querySelector("#audit-result .score-meter span");
    const text = document.querySelector("#audit-result p");
    const update = () => {
      const checked = form.querySelectorAll("input:checked").length;
      const percent = Math.round((checked / items.length) * 100);
      meter.style.width = `${percent}%`;
      if (percent < 40) {
        text.innerHTML = "<strong>À structurer :</strong> commencez par l’inventaire des fichiers, des auteurs et des contenus tiers.";
      } else if (percent < 75) {
        text.innerHTML = "<strong>Bonne base :</strong> complétez la licence, les crédits, les formats sources et les éléments d’accessibilité.";
      } else {
        text.innerHTML = "<strong>Presque publiable :</strong> relisez comme un visiteur externe et testez les liens avant diffusion.";
      }
    };

    form.addEventListener("change", update);
    update();
  };

  const renderTemplateGenerators = () => {
    if (currentFile !== "modeles.html") return;
    const mode = document.querySelector("#mode-emploi")?.closest("section");
    if (!mode || document.querySelector("#generateurs")) return;
    mode.insertAdjacentHTML(
      "afterend",
      `<section class="tool-section" id="generateurs" aria-labelledby="generateurs-title">
        <div class="tool-inner">
          <p class="kicker">Générateurs</p>
          <h2 id="generateurs-title">Produire un README ou une fiche ressource</h2>
          <p>Ces formulaires génèrent un brouillon Markdown directement dans la page. Les informations saisies restent dans le navigateur.</p>
          <div class="tool-grid">
            <form class="tool-panel" id="readme-form">
              <h3>README pédagogique</h3>
              <label for="readme-title">Titre</label>
              <input id="readme-title" name="title" placeholder="Ex. Atelier d’alignement pédagogique">
              <label for="readme-public">Public cible</label>
              <input id="readme-public" name="public" placeholder="Ex. enseignants du supérieur">
              <label for="readme-description">Description courte</label>
              <textarea id="readme-description" name="description" placeholder="Décrire la ressource et son usage principal."></textarea>
              <label for="readme-license">Licence</label>
              <select id="readme-license" name="license">
                <option>CC BY 4.0</option>
                <option>CC0 1.0 Universal</option>
                <option>CC BY-SA 4.0</option>
                <option>Licence à préciser</option>
              </select>
              <button class="button" type="submit">Générer le README</button>
            </form>
            <div class="copy-block" id="readme-output">
              <pre><code>Complétez le formulaire pour générer un brouillon de README.</code></pre>
            </div>
            <form class="tool-panel" id="fiche-form">
              <h3>Fiche ressource</h3>
              <label for="fiche-title">Titre</label>
              <input id="fiche-title" name="title" placeholder="Ex. Jeu de cartes pour concevoir une séance">
              <label for="fiche-type">Type de ressource</label>
              <input id="fiche-type" name="type" placeholder="Atelier, guide, jeu sérieux, webapp...">
              <label for="fiche-duration">Durée</label>
              <input id="fiche-duration" name="duration" placeholder="Ex. 45 minutes">
              <label for="fiche-objectives">Objectifs pédagogiques</label>
              <textarea id="fiche-objectives" name="objectives" placeholder="Un objectif par ligne."></textarea>
              <button class="button" type="submit">Générer la fiche</button>
            </form>
            <div class="copy-block" id="fiche-output">
              <pre><code>Complétez le formulaire pour générer une fiche ressource.</code></pre>
            </div>
          </div>
        </div>
      </section>`
    );

    const updateBlock = (selector, text) => {
      const code = document.querySelector(`${selector} code`);
      if (code) code.textContent = text.trim();
      enhanceCopyBlocks();
    };

    document.querySelector("#readme-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const title = getValue(form, "title") || "[Titre de la ressource]";
      const target = getValue(form, "public") || "[Public cible]";
      const description = getValue(form, "description") || "[Description courte de la ressource.]";
      const license = getValue(form, "license") || "[Licence]";
      const licenseNotice = license === "CC BY 4.0"
        ? "Ressource éducative libre (REL) au sens de la Recommandation UNESCO de 2019. Sauf mention contraire, les contenus originaux sont placés sous licence Creative Commons Attribution 4.0 International — CC BY 4.0. Les contenus tiers conservent leurs droits et licences propres. Voir le site principal de JEDI-OpenLab pour plus d’informations."
        : `Sauf mention contraire, les contenus originaux de ce projet sont placés sous ${license}.`;
      updateBlock(
        "#readme-output",
        `# ${title}

## Présentation

${description}

## Public cible

Cette ressource s’adresse à : ${target}.

## Contenu du dépôt

- \`docs/\` : documentation ou site publié
- \`assets/\` : images, médias et fichiers associés
- \`sources/\` : fichiers sources modifiables
- \`credits/\` : sources, crédits et droits tiers

## Utilisation

[Expliquer comment consulter, utiliser, adapter ou animer la ressource.]

## Licence

${licenseNotice}

Les marques, logiciels, services tiers, documents sources et ressources citées restent soumis à leurs licences et droits respectifs.`
      );
    });

    document.querySelector("#fiche-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const title = getValue(form, "title") || "[Titre de la ressource]";
      const type = getValue(form, "type") || "[Type de ressource]";
      const duration = getValue(form, "duration") || "[Durée estimée]";
      const objectives = getValue(form, "objectives")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => `- ${line}`)
        .join("\n") || "- [Objectif pédagogique]";
      updateBlock(
        "#fiche-output",
        `# Fiche ressource pédagogique

## Titre

${title}

## Type de ressource

${type}

## Public cible

[Indiquer le public concerné, le niveau et les prérequis éventuels.]

## Durée estimée

${duration}

## Objectifs pédagogiques

${objectives}

## Matériel nécessaire

- [Support, outil ou équipement]

## Déroulé conseillé

1. [Étape 1]
2. [Étape 2]
3. [Étape 3]

## Licence et crédits

[Indiquer la licence, les auteurs, les contributeurs, les sources et les droits tiers.]`
      );
    });
  };

  const init = () => {
    ensureSkipLink();
    renderLayout();
    renderHomeDashboard();
    renderLicenseHelper();
    renderAuditTool();
    renderTemplateGenerators();
    enhanceCopyBlocks();
    enhanceTables();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
