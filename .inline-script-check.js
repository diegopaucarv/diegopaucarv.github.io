
            const App = {
                cvData: null,
                originalData: null,
                cachedData: null,
                currentLanguage: localStorage.getItem("language") || "en",
                isLoggedIn: Boolean(localStorage.getItem("sessionToken")),
                credentials: null,
                dataVersion: "2.1",
            };

            const LocalFileData = {
                clone(value) {
                    return value ? JSON.parse(JSON.stringify(value)) : null;
                },

                getCVData() {
                    return this.clone(window.__CV_DATA__ || null);
                },

                getConfig() {
                    return this.clone(window.__CV_CONFIG__ || null);
                },
            };

            const CacheManager = {
                saveToCache(data) {
                    try {
                        const cacheData = {
                            data,
                            timestamp: new Date().toISOString(),
                            version: App.dataVersion,
                        };
                        localStorage.setItem(
                            "cvData_cache",
                            JSON.stringify(cacheData),
                        );
                    } catch (error) {
                        console.error("Error guardando en caché:", error);
                    }
                },

                loadFromCache() {
                    try {
                        const cached = localStorage.getItem("cvData_cache");
                        if (!cached) return null;

                        const parsed = JSON.parse(cached);
                        if (parsed.version === App.dataVersion) {
                            return parsed.data;
                        }

                        localStorage.removeItem("cvData_cache");
                    } catch (error) {
                        console.error("Error cargando caché:", error);
                    }

                    return null;
                },

                exportModifiedData() {
                    if (!App.cvData) {
                        alert("No hay datos para exportar");
                        return;
                    }

                    const exportData = {
                        version: App.dataVersion,
                        timestamp: new Date().toISOString(),
                        description: "Datos modificados del CV",
                        data: App.cvData,
                    };

                    const dataStr = JSON.stringify(exportData, null, 2);
                    const dataBlob = new Blob([dataStr], {
                        type: "application/json",
                    });
                    const url = URL.createObjectURL(dataBlob);
                    const link = document.createElement("a");

                    link.href = url;
                    link.download = `cv_modified_${new Date().toISOString().split("T")[0]}.json`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                },

                clearCache() {
                    localStorage.removeItem("cvData_cache");
                    Data.refreshParsedData();
                    alert("Caché limpiado, usando datos originales");
                },
            };

            const Auth = {
                async init() {
                    const embeddedConfig = LocalFileData.getConfig();

                    if (location.protocol === "file:" && embeddedConfig) {
                        App.credentials = embeddedConfig;
                        return;
                    }

                    try {
                        const response = await fetch("./config.json");
                        if (response.ok) {
                            App.credentials = await response.json();
                        } else if (embeddedConfig) {
                            App.credentials = embeddedConfig;
                        } else {
                            console.warn(
                                "Config file not found. Proceeding without auth.",
                            );
                        }
                    } catch (error) {
                        if (embeddedConfig) {
                            App.credentials = embeddedConfig;
                            return;
                        }
                        console.warn("Could not load credentials:", error);
                    }
                },

                handleLogin(event) {
                    event.preventDefault();
                    const email = document.getElementById("emailInput").value;
                    const password =
                        document.getElementById("passwordInput").value;
                    const errorDiv = document.getElementById("modalError");
                    errorDiv.textContent = "";

                    if (!App.credentials) {
                        errorDiv.textContent = "Authentication not configured.";
                        return;
                    }

                    const validUser = App.credentials.users?.find(
                        (user) =>
                            user.email === email && user.password === password,
                    );

                    if (!validUser) {
                        errorDiv.textContent = "Invalid email or password.";
                        return;
                    }

                    const sessionToken = btoa(`${email}:${Date.now()}`);
                    localStorage.setItem("sessionToken", sessionToken);
                    App.isLoggedIn = true;
                    UI.updateConfigButton();
                    UI.toggleLoginModal();
                    document.getElementById("emailInput").value = "";
                    document.getElementById("passwordInput").value = "";
                    Render.renderCV();
                },

                logout() {
                    localStorage.removeItem("sessionToken");
                    App.isLoggedIn = false;
                    UI.updateConfigButton();
                    Render.renderCV();
                },
            };

            const UI = {
                changeLanguage(lang) {
                    App.currentLanguage = lang;
                    localStorage.setItem("language", lang);
                    this.initLanguageUI();
                    Data.refreshParsedData();
                },

                initLanguageUI() {
                    const lang = App.currentLanguage;

                    document.querySelectorAll(".lang-btn").forEach((btn) => {
                        btn.classList.toggle(
                            "active",
                            btn.dataset.lang === lang,
                        );
                    });

                    document
                        .querySelectorAll(".lang-content")
                        .forEach((element) => {
                            element.classList.toggle(
                                "active",
                                element.dataset.lang === lang,
                            );
                        });
                },

                toggleLoginModal() {
                    const modal = document.getElementById("loginModal");
                    if (modal) {
                        modal.classList.toggle("active");
                    }
                },

                updateConfigButton() {
                    const btn = document.getElementById("configBtn");
                    if (!btn) return;

                    if (App.isLoggedIn) {
                        btn.textContent = "🔓 Logout";
                        btn.onclick = () => {
                            Auth.logout();
                            UI.updateConfigButton();
                        };
                    } else {
                        btn.textContent = "⚙ Config";
                        btn.onclick = () => UI.toggleLoginModal();
                    }
                },
            };

            const AutoExport = {
                isExporting: false,

                async exportOnChange() {
                    if (!App.isLoggedIn || this.isExporting) return;

                    this.isExporting = true;
                    try {
                        await this.exportToJSON();
                    } catch (error) {
                        console.error(
                            "Error en exportación automática:",
                            error,
                        );
                    } finally {
                        this.isExporting = false;
                    }
                },

                async exportToJSON() {
                    if (!App.cvData) return;

                    const exportData = this.reconstructOriginalJSON();
                    const dataStr = JSON.stringify(exportData, null, 2);
                    const dataBlob = new Blob([dataStr], {
                        type: "application/json",
                    });
                    const url = URL.createObjectURL(dataBlob);
                    const link = document.createElement("a");

                    link.href = url;
                    link.download = `cv_modified_${this.getTimestamp()}.json`;
                    link.style.display = "none";
                    document.body.appendChild(link);
                    link.click();

                    setTimeout(() => {
                        document.body.removeChild(link);
                        URL.revokeObjectURL(url);
                    }, 100);
                },

                reconstructOriginalJSON() {
                    if (!App.originalData) {
                        return {
                            version: App.dataVersion,
                            data: App.cvData,
                        };
                    }

                    const reconstructed = JSON.parse(
                        JSON.stringify(App.originalData),
                    );
                    reconstructed.data = {
                        ...reconstructed.data,
                        datos_personales: this.mergeLanguageRows(
                            "datos_personales",
                            this.reconstructPersonalData(),
                        ),
                        profesiones: this.mergeLanguageRows(
                            "profesiones",
                            this.reconstructProfessions(),
                        ),
                        experiencia: this.mergeLanguageRows(
                            "experiencia",
                            this.reconstructExperience(),
                        ),
                        educacion: this.mergeLanguageRows(
                            "educacion",
                            this.reconstructEducation(),
                        ),
                        enlaces_personales: this.mergeLanguageRows(
                            "enlaces_personales",
                            this.reconstructLinks(),
                        ),
                        skills: this.mergeLanguageRows(
                            "skills",
                            this.reconstructSkills(),
                        ),
                        certifications: this.mergeLanguageRows(
                            "certifications",
                            this.reconstructCertifications(),
                        ),
                        publications: this.mergeLanguageRows(
                            "publications",
                            this.reconstructPublications(),
                        ),
                        portfolio_items: this.mergeLanguageRows(
                            "portfolio_items",
                            this.reconstructPortfolioItems(),
                        ),
                    };

                    return reconstructed;
                },

                mergeLanguageRows(tableName, currentLanguageRows) {
                    const originalRows = Array.isArray(
                        App.originalData?.data?.[tableName],
                    )
                        ? App.originalData.data[tableName]
                        : [];
                    const otherLanguageRows = originalRows.filter(
                        (row) =>
                            this.getRowLanguage(row) !== App.currentLanguage,
                    );

                    return [...currentLanguageRows, ...otherLanguageRows];
                },

                getRowLanguage(row) {
                    if (Array.isArray(row)) {
                        return row[row.length - 1];
                    }

                    if (row && typeof row === "object") {
                        return row.lengua || null;
                    }

                    return null;
                },

                getOriginalPersonalRow() {
                    return (
                        App.originalData?.data?.datos_personales?.find(
                            (row) =>
                                row[row.length - 1] === App.currentLanguage,
                        ) ||
                        App.originalData?.data?.datos_personales?.[0] ||
                        []
                    );
                },

                reconstructPersonalData() {
                    const originalRow = this.getOriginalPersonalRow();

                    return [
                        [
                            originalRow[0] || "1",
                            App.cvData.nombres ||
                                originalRow[1] ||
                                "Diego Mauricio Paucar Villacorta",
                            originalRow[2] || "",
                            originalRow[3] || "",
                            originalRow[4] || "",
                            App.cvData.perfil || originalRow[5] || "",
                            App.currentLanguage,
                        ],
                    ];
                },

                reconstructProfessions() {
                    return (App.cvData.profesiones || []).map((item) => [
                        item.id || "1",
                        item.persona_id || "1",
                        item.profesion || "",
                        item.lengua || App.currentLanguage,
                    ]);
                },

                reconstructExperience() {
                    return (App.cvData.experiencia || []).map((item) => [
                        item.id || "1",
                        item.persona_id || "1",
                        item.profesion_id || "1",
                        item.experiencia_categoria || "",
                        item.inicio_anio || "",
                        item.institucion || "",
                        item.lugar || "",
                        item.rol || "",
                        item.tareas || "",
                        item.logros || null,
                        item.referencia || null,
                        item.referencia_linkedin || null,
                        item.lengua || App.currentLanguage,
                    ]);
                },

                reconstructEducation() {
                    return (App.cvData.educacion || []).map((item) => [
                        item.id || "1",
                        item.persona_id || "1",
                        item.grado_instruccion || "",
                        item.institucion || "",
                        item.titulo || "",
                        item.fecha_inicio || "",
                        Boolean(item.en_curso),
                        item.lengua || App.currentLanguage,
                    ]);
                },

                reconstructLinks() {
                    return (App.cvData.enlaces_personales || []).map((item) => [
                        item.id || "1",
                        item.persona_id || "1",
                        item.tipo || "",
                        item.url || "",
                        item.lengua || App.currentLanguage,
                    ]);
                },

                reconstructSkills() {
                    return (App.cvData.skills || []).map((item) => {
                        if (
                            item.certificate_name &&
                            String(item.certificate_name).trim() !== ""
                        ) {
                            return [
                                item.id || "1",
                                item.persona_id || "1",
                                item.profesion_id || null,
                                item.skill_name || "",
                                item.skill_level || "",
                                item.tipo_skill || "",
                                item.certificate_name || "",
                                item.certificate_year || "",
                                item.certificate_institution || "",
                                item.certificate_path || "",
                                item.lengua || App.currentLanguage,
                            ];
                        }

                        return [
                            item.id || "1",
                            item.persona_id || "1",
                            item.profesion_id || null,
                            item.skill_name || "",
                            item.skill_level || "",
                            item.tipo_skill || "",
                            item.certificate_name || "",
                            item.lengua || App.currentLanguage,
                        ];
                    });
                },

                reconstructCertifications() {
                    return (App.cvData.certifications || []).map((item) => [
                        item.id || "1",
                        item.persona_id || "1",
                        item.name || "",
                        item.issuer || "",
                        item.year || "",
                        item.url || null,
                        item.lengua || App.currentLanguage,
                    ]);
                },

                reconstructPublications() {
                    return (App.cvData.publications || []).map((item) => [
                        item.id || "1",
                        item.persona_id || "1",
                        item.title || "",
                        item.authors || "",
                        item.year || "",
                        item.publication_type || "",
                        item.journal_or_publisher || "",
                        item.volume || null,
                        item.pages || null,
                        item.doi || null,
                        item.url || null,
                        item.contribution || "",
                        item.lengua || App.currentLanguage,
                    ]);
                },

                reconstructPortfolioItems() {
                    return (App.cvData.portfolio_items || []).map((item) => [
                        item.id || "1",
                        item.persona_id || "1",
                        item.item_type || "",
                        item.title || "",
                        item.description || "",
                        item.date_created || "",
                        item.url || null,
                        item.repository_link || null,
                        item.image_path || null,
                        item.additional_info || null,
                        item.lengua || App.currentLanguage,
                    ]);
                },

                getTimestamp() {
                    return new Date()
                        .toISOString()
                        .replace(/[:.]/g, "-")
                        .split("T")[0];
                },
            };

            const Data = {
                async fetchCVData() {
                    const embeddedCVData = LocalFileData.getCVData();

                    if (location.protocol === "file:" && embeddedCVData) {
                        App.originalData = embeddedCVData;
                        const cachedData = App.isLoggedIn
                            ? CacheManager.loadFromCache()
                            : null;

                        if (cachedData) {
                            App.cvData = cachedData;
                            Render.renderCV();
                            return;
                        }

                        this.refreshParsedData();
                        return;
                    }

                    try {
                        const response = await fetch("./cvs.json");
                        if (!response.ok)
                            throw new Error("Error al cargar cvs.json");

                        App.originalData = await response.json();
                        const cachedData = App.isLoggedIn
                            ? CacheManager.loadFromCache()
                            : null;

                        if (cachedData) {
                            App.cvData = cachedData;
                            Render.renderCV();
                            return;
                        }

                        this.refreshParsedData();
                    } catch (error) {
                        if (embeddedCVData) {
                            App.originalData = embeddedCVData;
                            const cachedData = App.isLoggedIn
                                ? CacheManager.loadFromCache()
                                : null;

                            if (cachedData) {
                                App.cvData = cachedData;
                                Render.renderCV();
                                return;
                            }

                            this.refreshParsedData();
                            return;
                        }

                        console.error("Error en Data.fetchCVData:", error);
                    }
                },

                refreshParsedData() {
                    if (!App.originalData?.data) return;

                    const { data, tables } = App.originalData;
                    App.cvData = {
                        profesiones: this.mapAndFilter(
                            data.profesiones || [],
                            tables,
                            "profesiones",
                        ),
                        experiencia: this.mapAndFilter(
                            data.experiencia || [],
                            tables,
                            "experiencia",
                        ),
                        educacion: this.mapAndFilter(
                            data.educacion || [],
                            tables,
                            "educacion",
                        ),
                        enlaces_personales: this.mapAndFilter(
                            data.enlaces_personales || [],
                            tables,
                            "enlaces_personales",
                        ),
                        skills: this.mapAndFilter(
                            data.skills || [],
                            tables,
                            "skills",
                        ),
                        certifications: this.mapAndFilter(
                            data.certifications || [],
                            tables,
                            "certifications",
                        ),
                        portfolio_items: this.mapAndFilter(
                            data.portfolio_items || [],
                            tables,
                            "portfolio_items",
                        ),
                        publications: this.mapAndFilter(
                            data.publications || [],
                            tables,
                            "publications",
                        ),
                    };

                    const personalRow =
                        data.datos_personales.find(
                            (row) =>
                                row[row.length - 1] === App.currentLanguage,
                        ) || data.datos_personales[0];

                    App.cvData.nombres =
                        personalRow?.[1] || "Diego Mauricio Paucar Villacorta";
                    App.cvData.perfil = personalRow?.[5] || "";

                    Render.renderCV();
                },

                mapAndFilter(dataArray, schema, tableName) {
                    if (!Array.isArray(dataArray)) return [];

                    return dataArray
                        .map((row) => {
                            let obj = {};

                            if (tableName === "experiencia") {
                                if (Array.isArray(row)) {
                                    const hasCategory = row.length >= 13;
                                    obj = {
                                        id: row[0],
                                        persona_id: row[1],
                                        profesion_id: row[2],
                                        experiencia_categoria: hasCategory
                                            ? row[3]
                                            : "",
                                        inicio_anio: hasCategory
                                            ? row[4]
                                            : row[3],
                                        institucion: hasCategory
                                            ? row[5]
                                            : row[4],
                                        lugar: hasCategory ? row[6] : row[5],
                                        rol: hasCategory ? row[7] : row[6],
                                        tareas: hasCategory ? row[8] : row[7],
                                        logros: hasCategory ? row[9] : row[8],
                                        referencia: hasCategory
                                            ? row[10]
                                            : row[9],
                                        referencia_linkedin: hasCategory
                                            ? row[11]
                                            : row[10],
                                        lengua: row[row.length - 1],
                                    };
                                } else {
                                    obj = {
                                        id: row.id || row.n,
                                        persona_id: row.persona_id,
                                        profesion_id: row.profesion_id,
                                        experiencia_categoria:
                                            row.experiencia_categoria || "",
                                        inicio_anio: row.inicio_anio,
                                        institucion: row.institucion,
                                        lugar: row.lugar,
                                        rol: row.rol,
                                        tareas: row.tareas,
                                        logros: row.logros,
                                        referencia: row.referencia,
                                        referencia_linkedin:
                                            row.referencia_linkedin,
                                        lengua: row.lengua,
                                    };
                                }
                            } else if (tableName === "skills") {
                                const longFormat = row.length >= 11;
                                obj = {
                                    id: row[0],
                                    persona_id: row[1],
                                    profesion_id: row[2],
                                    skill_name: row[3],
                                    skill_level: row[4],
                                    tipo_skill: row[5],
                                    certificate_name: row[6] || "",
                                    certificate_year: longFormat
                                        ? row[7]
                                        : null,
                                    certificate_institution: longFormat
                                        ? row[8]
                                        : "",
                                    certificate_path: longFormat ? row[9] : "",
                                    lengua: row[row.length - 1],
                                };
                            } else if (tableName === "educacion") {
                                obj = {
                                    id: row[0],
                                    persona_id: row[1],
                                    grado_instruccion: row[2],
                                    institucion: row[3],
                                    titulo: row[4],
                                    fecha_inicio: row[5],
                                    en_curso: row[6],
                                    lengua: row[row.length - 1],
                                };
                            } else if (tableName === "portfolio_items") {
                                obj = {
                                    id: row[0],
                                    persona_id: row[1],
                                    item_type: row[2],
                                    title: row[3],
                                    description: row[4],
                                    date_created: row[5],
                                    url: row[6],
                                    repository_link: row[7],
                                    image_path: row[8],
                                    additional_info: row[9],
                                    lengua: row[row.length - 1],
                                };
                            } else if (tableName === "certifications") {
                                obj = {
                                    id: row[0],
                                    persona_id: row[1],
                                    name: row[2],
                                    issuer: row[3],
                                    year: row[4],
                                    url: row[5],
                                    lengua: row[row.length - 1],
                                };
                            } else if (tableName === "publications") {
                                if (Array.isArray(row)) {
                                    obj = {
                                        id: row[0],
                                        persona_id: row[1],
                                        title: row[2],
                                        authors: row[3],
                                        year: row[4],
                                        publication_type: row[5],
                                        journal_or_publisher: row[6],
                                        volume: row[7],
                                        pages: row[8],
                                        doi: row[9],
                                        url: row[10],
                                        contribution: row[11] || "",
                                        lengua: row[row.length - 1],
                                    };
                                } else {
                                    obj = {
                                        id: row.id,
                                        persona_id: row.persona_id,
                                        title: row.title,
                                        authors: row.authors,
                                        year: row.year,
                                        publication_type: row.publication_type,
                                        journal_or_publisher:
                                            row.journal_or_publisher,
                                        volume: row.volume,
                                        pages: row.pages,
                                        doi: row.doi,
                                        url: row.url,
                                        contribution: row.contribution || "",
                                        lengua: row.lengua,
                                    };
                                }
                            } else {
                                const tableSchema = schema.find(
                                    (table) => table.name === tableName,
                                );
                                const columns =
                                    tableSchema?.columns?.map(
                                        (col) => col.name,
                                    ) || [];
                                row.forEach((value, index) => {
                                    if (columns[index + 1]) {
                                        obj[columns[index + 1]] = value;
                                    }
                                });
                                obj.lengua = row[row.length - 1];
                            }

                            return obj;
                        })
                        .filter(
                            (item) =>
                                !item.lengua ||
                                item.lengua === App.currentLanguage,
                        );
                },
            };

            const Render = {
                renderCV() {
                    if (!App.cvData) return;

                    document.getElementById("personName").textContent =
                        App.cvData.nombres || "Diego Paucar";
                    document.getElementById("professions").textContent =
                        App.cvData.profesiones
                            ?.map((item) => item.profesion)
                            .join(" | ") || "";
                    document.getElementById("description").textContent =
                        App.cvData.perfil || "";

                    this.renderProjects();
                    this.renderPublications();
                    this.renderTimeline();
                    this.renderInfoSections();
                    this.renderSkills();

                    const addExpBtn = document.getElementById("addExpBtn");
                    if (addExpBtn) {
                        addExpBtn.style.display = App.isLoggedIn
                            ? "inline-block"
                            : "none";
                    }

                    UI.initLanguageUI();
                },

                renderProjects() {
                    const grid = document.getElementById("projectsGrid");
                    if (!grid) return;

                    const projects = App.cvData.portfolio_items || [];
                    if (projects.length === 0) {
                        grid.innerHTML = `<p>${
                            App.currentLanguage === "es"
                                ? "No hay proyectos disponibles."
                                : "No projects available."
                        }</p>`;
                        return;
                    }

                    grid.innerHTML = projects
                        .map((project) => {
                            const link = project.repository_link || project.url;
                            const linkLabel = project.repository_link
                                ? "GitHub"
                                : App.currentLanguage === "es"
                                  ? "Ver proyecto"
                                  : "View project";

                            return `
                                        <div class="project-card">
                                            <div class="project-card-header">
                                                <h3>${project.title}</h3>
                                                ${
                                                    link
                                                        ? `<a href="${link}" target="_blank" rel="noopener noreferrer" class="project-link">
                                                            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 0 1 2 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
                                                            ${linkLabel}
                                                        </a>`
                                                        : ""
                                                }
                                            </div>
                                            <p>${project.description || ""}</p>
                                        </div>
                                    `;
                        })
                        .join("");
                },

                renderPublications() {
                    const container =
                        document.getElementById("publicationsList");
                    if (!container) return;

                    const publications = App.cvData.publications || [];
                    if (publications.length === 0) {
                        container.innerHTML = `<p>${
                            App.currentLanguage === "es"
                                ? "No hay publicaciones registradas."
                                : "No publications listed."
                        }</p>`;
                        return;
                    }

                    container.innerHTML = publications
                        .map(
                            (pub) => `
                                        <div class="publication-item">
                                            <h4>${pub.title}</h4>
                                            <p class="pub-meta"><em>${pub.journal_or_publisher || ""}</em>${
                                                pub.year ? `, ${pub.year}` : ""
                                            }</p>
                                            <p>${pub.authors || ""}</p>
                                            ${
                                                pub.contribution
                                                    ? `<p class="pub-role">${pub.contribution}</p>`
                                                    : ""
                                            }
                                            ${pub.doi ? `<p class="pub-meta">DOI: ${pub.doi}</p>` : ""}
                                            ${
                                                pub.url
                                                    ? `<a href="${pub.url}" target="_blank" rel="noopener noreferrer" class="publication-link">${
                                                          App.currentLanguage ===
                                                          "es"
                                                              ? "Ver publicación"
                                                              : "View publication"
                                                      }</a>`
                                                    : ""
                                            }
                                        </div>
                                    `,
                        )
                        .join("");
                },

                renderTimeline() {
                    const container =
                        document.getElementById("timelineContainer");
                    if (!container) return;

                    container.innerHTML = "";
                    const experiences = App.cvData.experiencia || [];

                    if (experiences.length === 0) {
                        container.innerHTML = `<p>${
                            App.currentLanguage === "es"
                                ? "No hay experiencia disponible."
                                : "No experience available."
                        }</p>`;
                        return;
                    }

                    const visibleItems = experiences.slice(0, 10);
                    visibleItems.forEach((exp, index) => {
                        const isLeft = index % 2 === 0;
                        const year = this.formatYear(exp.inicio_anio);
                        const categoryClass = this.getCategoryClass(
                            exp.profesion_id,
                        );
                        const item = document.createElement("div");
                        item.className = "timeline-item";

                        const role = this.escapeHtml(exp.rol || "");
                        const institution = this.escapeHtml(
                            exp.institucion || "",
                        );
                        const location = this.escapeHtml(exp.lugar || "");
                        const category = this.escapeHtml(
                            exp.experiencia_categoria || "",
                        );
                        const contentClass = isLeft ? "left" : "right";
                        const deleteBtn = App.isLoggedIn
                            ? `<button class="btn-delete" onclick="CRUD.deleteExperience('${exp.id}')">Delete</button>`
                            : "";
                        const bulletDiv = `
                                    <div class="timeline-center">
                                        <div class="timeline-bullet ${categoryClass}"></div>
                                        <p class="timeline-year">${year}</p>
                                    </div>
                                `;
                        const contentDiv = `
                                    <div class="timeline-content ${contentClass}">
                                        <div class="timeline-header">
                                            <h3
                                                class="editable-field"
                                                data-table="experiencia"
                                                data-id="${exp.id}"
                                                data-field="rol"
                                                ondblclick="CRUD.makeEditable(this, 'text')"
                                            >${role}</h3>
                                        </div>
                                        ${
                                            category
                                                ? `<p class="timeline-category">${category}</p>`
                                                : ""
                                        }
                                        <p
                                            class="timeline-role editable-field"
                                            data-table="experiencia"
                                            data-id="${exp.id}"
                                            data-field="institucion"
                                            ondblclick="CRUD.makeEditable(this, 'text')"
                                        >${institution}${location ? ` · ${location}` : ""}</p>
                                        ${deleteBtn}
                                    </div>
                                `;
                        const detailBlocks = [
                            exp.tareas
                                ? `<p class="timeline-detail">${this.linkifyText(exp.tareas)}</p>`
                                : "",
                            exp.logros
                                ? `<p class="timeline-detail"><span class="timeline-detail-label">${
                                      App.currentLanguage === "es"
                                          ? "Logros:"
                                          : "Highlights:"
                                  }</span> ${this.linkifyText(exp.logros)}</p>`
                                : "",
                        ]
                            .filter(Boolean)
                            .join("");
                        const revealDiv = detailBlocks
                            ? `<div class="timeline-hover-reveal">${detailBlocks}</div>`
                            : "<div></div>";

                        item.innerHTML = isLeft
                            ? `${contentDiv}${bulletDiv}${revealDiv}`
                            : `${revealDiv}${bulletDiv}${contentDiv}`;

                        container.appendChild(item);
                    });
                },

                getCategoryClass(profId) {
                    const map = {
                        1: "work",
                        2: "other",
                        3: "design",
                    };
                    return map[Number(profId)] || "other";
                },

                renderInfoSections() {
                    const credentialsGrid =
                        document.getElementById("credentialsGrid");
                    const container = document.getElementById("infoSection");
                    const education = [...(App.cvData.educacion || [])].sort(
                        (a, b) =>
                            new Date(b.fecha_inicio || 0) -
                            new Date(a.fecha_inicio || 0),
                    );
                    const certifications =
                        App.cvData.certifications?.length > 0
                            ? App.cvData.certifications
                            : (App.cvData.skills || [])
                                  .filter(
                                      (skill) =>
                                          skill.certificate_name &&
                                          skill.certificate_name.trim() !== "",
                                  )
                                  .map((skill) => ({
                                      id: skill.id,
                                      name: skill.certificate_name,
                                      issuer:
                                          skill.certificate_institution ||
                                          skill.skill_name ||
                                          "",
                                      year: skill.certificate_year,
                                      url: skill.certificate_path || null,
                                  }));

                    if (credentialsGrid) {
                        credentialsGrid.innerHTML = certifications.length
                            ? certifications
                                  .map(
                                      (cert) => `
                                            <div class="credential-item">
                                                <span class="credential-type">${
                                                    App.currentLanguage === "es"
                                                        ? "Certificación"
                                                        : "Certification"
                                                }</span>
                                                <h4>${cert.name || ""}</h4>
                                                <span class="credential-issuer">${cert.issuer || ""}</span>
                                                <span class="credential-year">${this.formatYear(cert.year)}</span>
                                                ${
                                                    cert.url
                                                        ? `<a href="${cert.url}" target="_blank" rel="noopener noreferrer" class="publication-link">${
                                                              App.currentLanguage ===
                                                              "es"
                                                                  ? "Ver credencial"
                                                                  : "View credential"
                                                          }</a>`
                                                        : ""
                                                }
                                            </div>
                                        `,
                                  )
                                  .join("")
                            : `<p>${
                                  App.currentLanguage === "es"
                                      ? "No hay credenciales disponibles."
                                      : "No credentials available."
                              }</p>`;
                    }

                    if (!container) return;

                    const links = App.cvData.enlaces_personales || [];
                    container.innerHTML = "";

                    if (
                        education.length === 0 &&
                        links.length === 0 &&
                        !App.isLoggedIn
                    ) {
                        container.style.display = "none";
                        return;
                    }

                    container.style.display = "grid";

                    if (education.length > 0) {
                        const educationCard = document.createElement("div");
                        educationCard.className = "info-card";
                        educationCard.innerHTML = `
                                <h3>
                                    <span class="lang-content active" data-lang="en">Education</span>
                                    <span class="lang-content" data-lang="es">Educación</span>
                                </h3>
                                ${education
                                    .map(
                                        (edu) => `
                                            <div class="info-item">
                                                <h4>${edu.titulo || ""}</h4>
                                                <p>${edu.institucion || ""}</p>
                                                <p>${this.formatYear(edu.fecha_inicio)}</p>
                                            </div>
                                        `,
                                    )
                                    .join("")}
                            `;
                        container.appendChild(educationCard);
                    }

                    const linksCard = document.createElement("div");
                    linksCard.className = "info-card";
                    const linkItems = links
                        .map((link) => {
                            const deleteBtn = App.isLoggedIn
                                ? `<button class="btn-delete" onclick="CRUD.deleteLink('${link.id}')">Delete</button>`
                                : "";

                            return `
                                        <div class="info-item">
                                            <h4><a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.tipo}</a></h4>
                                            ${deleteBtn}
                                        </div>
                                    `;
                        })
                        .join("");

                    linksCard.innerHTML = `
                                <h3>
                                    <span class="lang-content active" data-lang="en">Links</span>
                                    <span class="lang-content" data-lang="es">Enlaces</span>
                                </h3>
                                ${linkItems}
                                ${
                                    App.isLoggedIn
                                        ? '<button class="btn-add" onclick="CRUD.openCreateModal(\'enlaces_personales\')">+ Add Link</button>'
                                        : ""
                                }
                            `;
                    container.appendChild(linksCard);
                },

                renderSkills() {
                    const container = document.getElementById("skillsSection");
                    if (!container) return;

                    const skills = (App.cvData.skills || []).filter(
                        (skill) =>
                            !(
                                skill.certificate_name &&
                                String(skill.certificate_name).trim()
                            ),
                    );

                    if (skills.length === 0) {
                        container.style.display = "none";
                        return;
                    }

                    container.style.display = "block";
                    container.innerHTML = `
                                <h2 class="section-title">
                                    <span class="lang-content active" data-lang="en">Skills</span>
                                    <span class="lang-content" data-lang="es">Habilidades</span>
                                </h2>
                                <div class="skills-grid">
                                    ${skills
                                        .map(
                                            (skill) =>
                                                `<span class="skill-tag">${skill.skill_name}</span>`,
                                        )
                                        .join("")}
                                </div>
                            `;
                },

                escapeHtml(value) {
                    return String(value ?? "")
                        .replace(/&/g, "&amp;")
                        .replace(/</g, "&lt;")
                        .replace(/>/g, "&gt;")
                        .replace(/"/g, "&quot;")
                        .replace(/'/g, "&#39;");
                },

                linkifyText(value) {
                    return this.escapeHtml(value).replace(
                        /(https?:\/\/[^\s<)]+)/g,
                        '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>',
                    );
                },

                formatYear(value) {
                    if (!value) return "";
                    if (value === "Actual") {
                        return App.currentLanguage === "es"
                            ? "Actual"
                            : "Present";
                    }

                    const date = new Date(value);
                    return Number.isNaN(date.getTime())
                        ? String(value)
                        : String(date.getFullYear());
                },
            };

            const CRUD = {
                currentEditElement: null,
                currentEditField: null,

                makeEditable(element, fieldType) {
                    if (!App.isLoggedIn) return;
                    if (element.querySelector(".edit-controls")) return;

                    const originalContent = element.innerHTML;
                    const input = document.createElement(
                        fieldType === "textarea" ? "textarea" : "input",
                    );
                    const tempDiv = document.createElement("div");
                    tempDiv.innerHTML = originalContent;
                    input.value = tempDiv.textContent.trim();
                    input.className = `editable-${fieldType}`;

                    element.innerHTML = "";
                    element.appendChild(input);
                    element.classList.add("edit-mode");

                    const saveBtn = document.createElement("button");
                    saveBtn.textContent = "Save";
                    saveBtn.type = "button";
                    saveBtn.className = "btn-primary";
                    saveBtn.style.marginRight = "0.5rem";
                    saveBtn.onclick = (event) => {
                        event.preventDefault();
                        CRUD.saveEdit(element, input.value, originalContent);
                    };

                    const cancelBtn = document.createElement("button");
                    cancelBtn.textContent = "Cancel";
                    cancelBtn.type = "button";
                    cancelBtn.className = "btn-secondary";
                    cancelBtn.onclick = (event) => {
                        event.preventDefault();
                        CRUD.cancelEdit(element, originalContent);
                    };

                    const controls = document.createElement("div");
                    controls.className = "edit-controls active";
                    controls.appendChild(saveBtn);
                    controls.appendChild(cancelBtn);
                    element.appendChild(controls);
                    input.focus();

                    input.addEventListener("keydown", (event) => {
                        if (event.key === "Enter" && fieldType === "text") {
                            event.preventDefault();
                            CRUD.saveEdit(
                                element,
                                input.value,
                                originalContent,
                            );
                        }
                        if (event.key === "Escape") {
                            event.preventDefault();
                            CRUD.cancelEdit(element, originalContent);
                        }
                    });
                },

                saveEdit(element, newValue, originalHtml) {
                    element.classList.remove("edit-mode");
                    element.innerHTML = newValue;
                    this.updateDataInMemory(element, newValue);
                    CacheManager.saveToCache(App.cvData);

                    if (App.isLoggedIn) {
                        setTimeout(() => AutoExport.exportOnChange(), 100);
                    }
                },

                deleteExperience(id) {
                    if (!confirm("Delete this experience?")) return;

                    const index = App.cvData.experiencia.findIndex(
                        (entry) => String(entry.id) === String(id),
                    );
                    if (index !== -1) {
                        App.cvData.experiencia.splice(index, 1);
                    }

                    CacheManager.saveToCache(App.cvData);
                    Render.renderTimeline();

                    if (App.isLoggedIn) {
                        setTimeout(() => AutoExport.exportOnChange(), 100);
                    }
                },

                deleteEducation(id) {
                    if (!confirm("Delete this education?")) return;

                    const index = App.cvData.educacion.findIndex(
                        (entry) => String(entry.id) === String(id),
                    );
                    if (index !== -1) {
                        App.cvData.educacion.splice(index, 1);
                    }

                    CacheManager.saveToCache(App.cvData);
                    Render.renderInfoSections();

                    if (App.isLoggedIn) {
                        setTimeout(() => AutoExport.exportOnChange(), 100);
                    }
                },

                deleteLink(id) {
                    if (!confirm("Delete this link?")) return;

                    const index = App.cvData.enlaces_personales.findIndex(
                        (entry) => String(entry.id) === String(id),
                    );
                    if (index !== -1) {
                        App.cvData.enlaces_personales.splice(index, 1);
                    }

                    CacheManager.saveToCache(App.cvData);
                    Render.renderInfoSections();

                    if (App.isLoggedIn) {
                        setTimeout(() => AutoExport.exportOnChange(), 100);
                    }
                },

                cancelEdit(element, originalHtml) {
                    element.classList.remove("edit-mode");
                    element.innerHTML = originalHtml;
                },

                openCreateModal(tableName) {
                    const modal = document.getElementById("createModal");
                    const title = document.getElementById("createModalTitle");
                    const container = document.getElementById(
                        "formFieldsContainer",
                    );
                    const schema = this.getTableSchema(tableName);

                    title.textContent = `Add New ${
                        tableName.charAt(0).toUpperCase() + tableName.slice(1)
                    }`;
                    container.innerHTML = "";

                    Object.entries(schema).forEach(([fieldName, fieldType]) => {
                        const group = document.createElement("div");
                        group.className = "form-group";

                        const label = document.createElement("label");
                        label.textContent = fieldName
                            .replace(/_/g, " ")
                            .toUpperCase();

                        const input = document.createElement(
                            fieldType === "textarea" ? "textarea" : "input",
                        );
                        if (fieldType !== "textarea") {
                            input.type = fieldType === "date" ? "date" : "text";
                        }

                        input.id = `field-${fieldName}`;
                        input.dataset.field = fieldName;
                        input.required = true;

                        group.appendChild(label);
                        group.appendChild(input);
                        container.appendChild(group);
                    });

                    modal.classList.add("active");
                    document.getElementById("createForm").dataset.table =
                        tableName;
                    const firstInput =
                        container.querySelector("input, textarea");
                    if (firstInput) firstInput.focus();
                },

                closeCreateModal() {
                    const modal = document.getElementById("createModal");
                    modal.classList.remove("active");
                    document.getElementById("createForm").reset();
                    document.getElementById("formFieldsContainer").innerHTML =
                        "";
                },

                handleCreateSubmit(event) {
                    event.preventDefault();
                    const form = document.getElementById("createForm");
                    const tableName = form.dataset.table;
                    const newEntry = {};
                    let allFieldsValid = true;

                    form.querySelectorAll("[data-field]").forEach((input) => {
                        if (input.required && !input.value.trim()) {
                            allFieldsValid = false;
                            input.style.borderColor = "red";
                        } else {
                            input.style.borderColor = "";
                            newEntry[input.dataset.field] = input.value;
                        }
                    });

                    if (!allFieldsValid) {
                        alert("Please fill in all required fields.");
                        return;
                    }

                    const currentEntries = App.cvData[tableName] || [];
                    const maxId = Math.max(
                        0,
                        ...currentEntries.map((entry) => Number(entry.id) || 0),
                    );

                    newEntry.id = String(maxId + 1);
                    newEntry.persona_id = "1";
                    newEntry.lengua = App.currentLanguage;

                    if (tableName === "experiencia") {
                        newEntry.profesion_id = "1";
                        newEntry.lugar = "";
                        newEntry.logros = null;
                        newEntry.referencia = null;
                        newEntry.referencia_linkedin = null;
                    }

                    if (tableName === "educacion") {
                        newEntry.grado_instruccion = "";
                        newEntry.en_curso = false;
                    }

                    if (!App.cvData[tableName]) {
                        App.cvData[tableName] = [];
                    }
                    App.cvData[tableName].push(newEntry);

                    CacheManager.saveToCache(App.cvData);

                    if (tableName === "experiencia") {
                        Render.renderTimeline();
                    } else if (
                        tableName === "educacion" ||
                        tableName === "enlaces_personales"
                    ) {
                        Render.renderInfoSections();
                    }

                    if (App.isLoggedIn) {
                        setTimeout(() => AutoExport.exportOnChange(), 100);
                    }

                    this.closeCreateModal();
                    form.reset();
                },

                updateDataInMemory(element, newValue) {
                    const tableName = element.dataset.table;
                    const fieldName = element.dataset.field;
                    const entryId = element.dataset.id;

                    if (
                        !tableName ||
                        !fieldName ||
                        !entryId ||
                        !Array.isArray(App.cvData[tableName])
                    ) {
                        return;
                    }

                    const entry = App.cvData[tableName].find(
                        (item) => String(item.id) === String(entryId),
                    );
                    if (entry) {
                        entry[fieldName] = newValue;
                    }
                },

                getTableSchema(tableName) {
                    const schemas = {
                        experiencia: {
                            institucion: "text",
                            rol: "text",
                            inicio_anio: "date",
                            tareas: "textarea",
                        },
                        educacion: {
                            titulo: "text",
                            institucion: "text",
                            fecha_inicio: "date",
                        },
                        enlaces_personales: {
                            tipo: "text",
                            url: "text",
                        },
                    };

                    return schemas[tableName] || {};
                },
            };

            document.addEventListener("DOMContentLoaded", async () => {
                UI.initLanguageUI();
                UI.updateConfigButton();
                await Auth.init();
                await Data.fetchCVData();
            });

            document.addEventListener("keydown", (event) => {
                const loginModal = document.getElementById("loginModal");
                const createModal = document.getElementById("createModal");

                if (
                    event.key === "Escape" &&
                    loginModal?.classList.contains("active")
                ) {
                    UI.toggleLoginModal();
                }

                if (
                    event.key === "Escape" &&
                    createModal?.classList.contains("active")
                ) {
                    CRUD.closeCreateModal();
                }
            });
        