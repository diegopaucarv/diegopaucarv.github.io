window.__CV_CONFIG__ = {
  "users": [
    {
      "email": "diegoblaster@hotmail.com",
      "password": "mauricio"
    }
  ]
};

window.__CV_DATA__ = {
  "tables": [
    {
      "name": "datos_personales",
      "columns": [
        {
          "name": "n",
          "type": "UINT",
          "constraints": [
            "AUTO_INCREMENT",
            "PRIMARY KEY"
          ]
        },
        {
          "name": "id",
          "type": "UINT",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "nombres",
          "type": "VARCHAR(200)",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "telefono",
          "type": "VARCHAR(20)",
          "constraints": []
        },
        {
          "name": "email",
          "type": "VARCHAR(255)",
          "constraints": []
        },
        {
          "name": "lugar",
          "type": "CHAR(50)",
          "constraints": []
        },
        {
          "name": "perfil",
          "type": "TEXT",
          "constraints": []
        },
        {
          "name": "lengua",
          "type": "CHAR(2)",
          "constraints": []
        },
        {
          "name": "created_at",
          "type": "TIMESTAMP",
          "constraints": [
            "DEFAULT CURRENT_TIMESTAMP()"
          ]
        },
        {
          "name": "updated_at",
          "type": "TIMESTAMP",
          "constraints": [
            "DEFAULT CURRENT_TIMESTAMP()",
            "ON UPDATE CURRENT_TIMESTAMP()"
          ]
        }
      ]
    },
    {
      "name": "profesiones",
      "columns": [
        {
          "name": "n",
          "type": "UINT",
          "constraints": [
            "AUTO_INCREMENT",
            "PRIMARY KEY"
          ]
        },
        {
          "name": "id",
          "type": "INT",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "persona_id",
          "type": "UINT",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "profesion",
          "type": "VARCHAR(100)",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "lengua",
          "type": "CHAR(2)",
          "constraints": []
        },
        {
          "name": "created_at",
          "type": "TIMESTAMP",
          "constraints": [
            "DEFAULT CURRENT_TIMESTAMP()"
          ]
        },
        {
          "name": "updated_at",
          "type": "TIMESTAMP",
          "constraints": [
            "DEFAULT CURRENT_TIMESTAMP()",
            "ON UPDATE CURRENT_TIMESTAMP()"
          ]
        }
      ]
    },
    {
      "name": "enlaces_personales",
      "columns": [
        {
          "name": "n",
          "type": "UINT",
          "constraints": [
            "AUTO_INCREMENT",
            "PRIMARY KEY"
          ]
        },
        {
          "name": "id",
          "type": "INT",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "persona_id",
          "type": "UINT",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "tipo",
          "type": "VARCHAR(50)",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "url",
          "type": "VARCHAR(255)",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "lengua",
          "type": "CHAR(2)",
          "constraints": []
        },
        {
          "name": "created_at",
          "type": "TIMESTAMP",
          "constraints": [
            "DEFAULT CURRENT_TIMESTAMP()"
          ]
        },
        {
          "name": "updated_at",
          "type": "TIMESTAMP",
          "constraints": [
            "DEFAULT CURRENT_TIMESTAMP()",
            "ON UPDATE CURRENT_TIMESTAMP()"
          ]
        }
      ]
    },
    {
      "name": "experiencia",
      "columns": [
        {
          "name": "n",
          "type": "UINT",
          "constraints": [
            "AUTO_INCREMENT",
            "PRIMARY KEY"
          ]
        },
        {
          "name": "id",
          "type": "UINT",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "persona_id",
          "type": "UINT",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "profesion_id",
          "type": "INT",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "experiencia_categoria",
          "type": "VARCHAR(100)",
          "constraints": []
        },
        {
          "name": "inicio_anio",
          "type": "CHAR(50)",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "institucion",
          "type": "VARCHAR(255)",
          "constraints": []
        },
        {
          "name": "lugar",
          "type": "VARCHAR(100)",
          "constraints": []
        },
        {
          "name": "rol",
          "type": "VARCHAR(255)",
          "constraints": []
        },
        {
          "name": "tareas",
          "type": "TEXT",
          "constraints": []
        },
        {
          "name": "logros",
          "type": "TEXT",
          "constraints": []
        },
        {
          "name": "referencia",
          "type": "VARCHAR(255)",
          "constraints": []
        },
        {
          "name": "referencia_linkedin",
          "type": "VARCHAR(255)",
          "constraints": []
        },
        {
          "name": "lengua",
          "type": "CHAR(2)",
          "constraints": []
        },
        {
          "name": "created_at",
          "type": "TIMESTAMP",
          "constraints": [
            "DEFAULT CURRENT_TIMESTAMP()"
          ]
        },
        {
          "name": "updated_at",
          "type": "TIMESTAMP",
          "constraints": [
            "DEFAULT CURRENT_TIMESTAMP()",
            "ON UPDATE CURRENT_TIMESTAMP()"
          ]
        }
      ]
    },
    {
      "name": "educacion",
      "columns": [
        {
          "name": "n",
          "type": "UINT",
          "constraints": [
            "AUTO_INCREMENT",
            "PRIMARY KEY"
          ]
        },
        {
          "name": "id",
          "type": "INT",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "persona_id",
          "type": "UINT",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "grado_instruccion",
          "type": "VARCHAR(100)",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "institucion",
          "type": "VARCHAR(255)",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "titulo",
          "type": "VARCHAR(255)",
          "constraints": []
        },
        {
          "name": "fecha_inicio",
          "type": "DATE",
          "constraints": []
        },
        {
          "name": "en_curso",
          "type": "BOOLEAN",
          "constraints": [
            "DEFAULT FALSE"
          ]
        },
        {
          "name": "lengua",
          "type": "CHAR(2)",
          "constraints": []
        }
      ]
    },
    {
      "name": "skills",
      "columns": [
        {
          "name": "n",
          "type": "UINT",
          "constraints": [
            "AUTO_INCREMENT",
            "PRIMARY KEY"
          ]
        },
        {
          "name": "id",
          "type": "INT",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "persona_id",
          "type": "UINT",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "profesion_id",
          "type": "INT",
          "constraints": []
        },
        {
          "name": "skill_name",
          "type": "VARCHAR(255)",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "skill_level",
          "type": "CHAR(100)",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "tipo_skill",
          "type": "CHAR(100)",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "certificate_name",
          "type": "VARCHAR(255)",
          "constraints": []
        },
        {
          "name": "certificate_year",
          "type": "DATE",
          "constraints": []
        },
        {
          "name": "certificate_institution",
          "type": "VARCHAR(255)",
          "constraints": []
        },
        {
          "name": "certificate_path",
          "type": "VARCHAR(255)",
          "constraints": []
        },
        {
          "name": "lengua",
          "type": "CHAR(2)",
          "constraints": []
        }
      ]
    },
    {
      "name": "publications",
      "columns": [
        {
          "name": "id",
          "type": "UINT",
          "constraints": [
            "AUTO_INCREMENT",
            "PRIMARY KEY"
          ]
        },
        {
          "name": "persona_id",
          "type": "UINT",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "title",
          "type": "VARCHAR(500)",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "authors",
          "type": "VARCHAR(500)",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "year",
          "type": "YEAR",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "publication_type",
          "type": "VARCHAR(50)",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "journal_or_publisher",
          "type": "VARCHAR(255)",
          "constraints": []
        },
        {
          "name": "volume",
          "type": "VARCHAR(50)",
          "constraints": []
        },
        {
          "name": "pages",
          "type": "VARCHAR(50)",
          "constraints": []
        },
        {
          "name": "doi",
          "type": "VARCHAR(100)",
          "constraints": []
        },
        {
          "name": "url",
          "type": "VARCHAR(255)",
          "constraints": []
        },
        {
          "name": "contribution",
          "type": "VARCHAR(255)",
          "constraints": []
        },
        {
          "name": "lengua",
          "type": "CHAR(2)",
          "constraints": []
        },
        {
          "name": "created_at",
          "type": "TIMESTAMP",
          "constraints": [
            "DEFAULT CURRENT_TIMESTAMP()"
          ]
        },
        {
          "name": "updated_at",
          "type": "TIMESTAMP",
          "constraints": [
            "DEFAULT CURRENT_TIMESTAMP()",
            "ON UPDATE CURRENT_TIMESTAMP()"
          ]
        }
      ]
    },
    {
      "name": "teaching_experience",
      "columns": [
        {
          "name": "id",
          "type": "UINT",
          "constraints": [
            "AUTO_INCREMENT",
            "PRIMARY KEY"
          ]
        },
        {
          "name": "persona_id",
          "type": "UINT",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "course_name",
          "type": "VARCHAR(255)",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "institution",
          "type": "VARCHAR(255)",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "start_date",
          "type": "DATE",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "end_date",
          "type": "DATE",
          "constraints": []
        },
        {
          "name": "number_of_sessions",
          "type": "UINT",
          "constraints": []
        },
        {
          "name": "location",
          "type": "VARCHAR(255)",
          "constraints": []
        },
        {
          "name": "description",
          "type": "TEXT",
          "constraints": []
        },
        {
          "name": "lengua",
          "type": "CHAR(2)",
          "constraints": []
        },
        {
          "name": "created_at",
          "type": "TIMESTAMP",
          "constraints": [
            "DEFAULT CURRENT_TIMESTAMP()"
          ]
        },
        {
          "name": "updated_at",
          "type": "TIMESTAMP",
          "constraints": [
            "DEFAULT CURRENT_TIMESTAMP()",
            "ON UPDATE CURRENT_TIMESTAMP()"
          ]
        }
      ]
    },
    {
      "name": "portfolio_items",
      "columns": [
        {
          "name": "id",
          "type": "UINT",
          "constraints": [
            "AUTO_INCREMENT",
            "PRIMARY KEY"
          ]
        },
        {
          "name": "persona_id",
          "type": "UINT",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "item_type",
          "type": "VARCHAR(100)",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "title",
          "type": "VARCHAR(255)",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "description",
          "type": "TEXT",
          "constraints": []
        },
        {
          "name": "date_created",
          "type": "DATE",
          "constraints": []
        },
        {
          "name": "url",
          "type": "VARCHAR(255)",
          "constraints": []
        },
        {
          "name": "repository_link",
          "type": "VARCHAR(255)",
          "constraints": []
        },
        {
          "name": "image_path",
          "type": "VARCHAR(255)",
          "constraints": []
        },
        {
          "name": "additional_info",
          "type": "JSON",
          "constraints": []
        },
        {
          "name": "lengua",
          "type": "CHAR(2)",
          "constraints": []
        },
        {
          "name": "created_at",
          "type": "TIMESTAMP",
          "constraints": [
            "DEFAULT CURRENT_TIMESTAMP()"
          ]
        },
        {
          "name": "updated_at",
          "type": "TIMESTAMP",
          "constraints": [
            "DEFAULT CURRENT_TIMESTAMP()",
            "ON UPDATE CURRENT_TIMESTAMP()"
          ]
        }
      ]
    },
    {
      "name": "certifications",
      "columns": [
        {
          "name": "id",
          "type": "UINT",
          "constraints": [
            "AUTO_INCREMENT",
            "PRIMARY KEY"
          ]
        },
        {
          "name": "persona_id",
          "type": "UINT",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "name",
          "type": "VARCHAR(255)",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "issuer",
          "type": "VARCHAR(255)",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "year",
          "type": "YEAR",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "url",
          "type": "VARCHAR(255)",
          "constraints": []
        },
        {
          "name": "lengua",
          "type": "CHAR(2)",
          "constraints": []
        },
        {
          "name": "created_at",
          "type": "TIMESTAMP",
          "constraints": [
            "DEFAULT CURRENT_TIMESTAMP()"
          ]
        },
        {
          "name": "updated_at",
          "type": "TIMESTAMP",
          "constraints": [
            "DEFAULT CURRENT_TIMESTAMP()",
            "ON UPDATE CURRENT_TIMESTAMP()"
          ]
        }
      ]
    },
    {
      "name": "portafolio_categoria",
      "columns": [
        {
          "name": "id",
          "type": "UINT",
          "constraints": [
            "AUTO_INCREMENT",
            "PRIMARY KEY"
          ]
        },
        {
          "name": "portafolio_id",
          "type": "UINT",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "categoria",
          "type": "VARCHAR(500)",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "lengua",
          "type": "CHAR(2)",
          "constraints": []
        }
      ]
    },
    {
      "name": "servicios",
      "columns": [
        {
          "name": "n",
          "type": "UINT",
          "constraints": [
            "AUTO_INCREMENT",
            "PRIMARY KEY"
          ]
        },
        {
          "name": "id",
          "type": "INT",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "persona_id",
          "type": "UINT",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "titulo",
          "type": "VARCHAR(500)",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "descripcion",
          "type": "VARCHAR(500)",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "lengua",
          "type": "CHAR(2)",
          "constraints": []
        }
      ]
    },
    {
      "name": "service_variations",
      "columns": [
        {
          "name": "id",
          "type": "UINT",
          "constraints": [
            "AUTO_INCREMENT",
            "PRIMARY KEY"
          ]
        },
        {
          "name": "service_id",
          "type": "INT",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "variation_description",
          "type": "VARCHAR(500)",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "price",
          "type": "DECIMAL(10, 2)",
          "constraints": [
            "NOT NULL"
          ]
        },
        {
          "name": "lengua",
          "type": "CHAR(2)",
          "constraints": []
        }
      ]
    }
  ],
  "views": [],
  "indexes": [],
  "data": {
    "datos_personales": [
      [
        "1",
        "Diego Mauricio Paucar Villacorta",
        "+51 902-413-372",
        "diegopaucarv@hotmail.com",
        "Lima, Peru",
        "ML Engineer / Applied AI Researcher building production-grade NLP systems, agentic LLM workflows, and evaluation pipelines for AI-assisted analysis. Combines software engineering, data science, and methodological research to deliver robust ML systems, analytics solutions, and decision-support tools for research and institutional clients.",
        "en"
      ],
      [
        "1",
        "Diego Mauricio Paucar Villacorta",
        "+51 902-413-372",
        "diegopaucarv@hotmail.com",
        "Lima, Perú",
        "Ingeniero de ML / Investigador de IA aplicada que construye sistemas NLP en producción, flujos agénticos con LLM y pipelines de evaluación para análisis asistido por IA. Combino ingeniería de software, ciencia de datos e investigación metodológica para desarrollar sistemas de ML robustos, soluciones analíticas y herramientas de apoyo a la decisión para clientes de investigación e institucionales.",
        "es"
      ]
    ],
    "profesiones": [
      [
        1,
        1,
        "ML Engineer",
        "en"
      ],
      [
        2,
        1,
        "Applied AI / NLP",
        "en"
      ],
      [
        3,
        1,
        "Analytics Consultant",
        "en"
      ],
      [
        1,
        1,
        "Ingeniero de ML",
        "es"
      ],
      [
        2,
        1,
        "IA Aplicada / NLP",
        "es"
      ],
      [
        3,
        1,
        "Consultor de Analytics",
        "es"
      ]
    ],
    "enlaces_personales": [
      [
        1,
        1,
        "Website",
        "https://www.facebook.com/escape.ccss/",
        "en"
      ],
      [
        2,
        1,
        "GitHub",
        "https://github.com/diegopaucarv",
        "en"
      ],
      [
        3,
        1,
        "LinkedIn",
        "https://www.linkedin.com/in/diegopaucarv/",
        "en"
      ],
      [
        4,
        1,
        "Tableau Public",
        "https://public.tableau.com/app/profile/diego.paucar",
        "en"
      ],
      [
        1,
        1,
        "Sitio web",
        "https://www.facebook.com/escape.ccss/",
        "es"
      ],
      [
        2,
        1,
        "GitHub",
        "https://github.com/diegopaucarv",
        "es"
      ],
      [
        3,
        1,
        "LinkedIn",
        "https://www.linkedin.com/in/diegopaucarv/",
        "es"
      ],
      [
        4,
        1,
        "Tableau Public",
        "https://public.tableau.com/app/profile/diego.paucar",
        "es"
      ]
    ],
    "experiencia": [
      [
        "17",
        "1",
        "1",
        "BI & Analytics Consulting",
        "Actual",
        "ESCAPE - BI & Analytics Consulting",
        "Lima, Peru / Remote",
        "Senior Data Scientist & AI Consultant",
        "Delivered BI and analytics consulting for government agencies, NGOs, and private-sector clients. Designed automated qualitative and quantitative workflows with NLP, ML, and AI, plus process-mining and optimization solutions. Led workshops on methodological innovation and AI-driven decision making.",
        "Delivered analytics solutions for multiple government agencies and NGOs. Designed BPMN process improvements and corporate change programs for mining, food, and other industries.",
        null,
        null,
        "en"
      ],
      [
        "9",
        "1",
        "1",
        "Applied NLP / AI",
        "Actual",
        "Universidad Científica del Sur",
        "Lima, Peru",
        "AI Specialist / NLP Engineer",
        "Developed a production text analysis pipeline using Modal, Llama 3, sentence similarity, and BERTopic. Built evaluation frameworks for model quality, latency, and token efficiency.",
        null,
        null,
        null,
        "en"
      ],
      [
        "18",
        "1",
        "3",
        "Corporate Consulting",
        "2024-08-01",
        "Facilitadores Asociados",
        "Lima, Peru",
        "Consultant & Analyst",
        "Designed BPMN process flows and corporate change programs for large mining, food, and other industry clients. Developed pedagogical resources, websites, and dashboards for tracking educational progress and KPI compliance.",
        null,
        null,
        null,
        "en"
      ],
      [
        "20",
        "1",
        "3",
        "AI Development",
        "2023-07-01",
        "Massive Dynamics Perú SAC",
        "Lima, Peru",
        "Project Assistant / Chatbot Developer",
        "Supported the development of a data-analysis-centric chatbot using Azure Databricks, Azure Machine Learning, and OpenAI's ChatGPT. Used SQL for data lake and blob storage management, and HTML/JavaScript for visual components.",
        null,
        null,
        null,
        "en"
      ],
      [
        "19",
        "1",
        "2",
        "Data Analysis",
        "2022-08-01",
        "APOYO Comunicación",
        "Lima, Peru",
        "Insights Consultant",
        "Developed topic analysis and similarity classification pipelines, database curation workflows for stakeholder analysis, multivariate classification pipelines for corporate sustainability culture surveys, and qualitative analysis workflows in MAXQDA for stakeholder research.",
        null,
        null,
        null,
        "en"
      ],
      [
        "23",
        "1",
        "2",
        "Academic Consulting",
        "2025",
        "Academic Consulting - COVID-19 Vaccination in Debate",
        "Remote",
        "Methodological Designer & Data Analyst",
        "Designed a mixed-method discourse-analysis workflow for digital news on COVID-19 vaccination in Mexico, Brazil, and Peru. Applied framing and narrative analysis, BERTopic, multimodal BERTopic, semantic segmentation with all-MiniLM-L6-v2 embeddings, Gemini 1.5 Pro-assisted coding, ACM/SVD, hierarchical clustering, Gap Statistic, silhouette evaluation, and Cramér's V. Publication: https://www.scielo.cl/scielo.php?pid=S0719-15292025000200055&script=sci_arttext",
        null,
        null,
        null,
        "en"
      ],
      [
        "22",
        "1",
        "2",
        "Academic Consulting",
        "2024",
        "Academic Consulting - Gender Variable in Science Communication on Twitter/X",
        "Remote",
        "Data Analyst & Methodological Consultant",
        "Designed the analysis strategy for a mixed study of 13,165 Twitter/X posts from 17 science communicators. Implemented social-media metrics, temporal analysis, efficiency indicators, stratified sampling in SPSS, manual inductive coding, automated sentiment analysis, PCA-based exploration, log transforms, and ROC-based evaluation. Publication: https://www.scielo.org.pe/scielo.php?script=sci_arttext&pid=S2415-09592024000400017",
        null,
        null,
        null,
        "en"
      ],
      [
        "24",
        "1",
        "2",
        "Academic Consulting",
        "2024",
        "Academic Consulting - Media and Social Conflicts During COVID-19",
        "Remote",
        "Data Analyst & Methodological Reviewer",
        "Conducted data analysis and methodological review for a mixed, descriptive study of 53 front pages from major Peruvian newspapers. Applied framing analysis, critical discourse analysis based on Fairclough's tridimensional model, descriptive frequency analysis of actors and valuations, and comparative analysis between reference and popular press. Publication: https://revistasinvestigacion.unmsm.edu.pe/index.php/discursos/article/view/25876",
        null,
        null,
        null,
        "en"
      ],
      [
        "28",
        "1",
        "2",
        "Academic Consulting",
        "2024",
        "Academic Consulting - Female Cyberactivism on Twitter",
        "Remote",
        "Data Analyst & NLP Research Consultant",
        "Supported a mixed-method study combining large-scale Twitter analysis with structured interviews. Implemented descriptive analysis of viral content and engagement metrics, social network analysis in Gephi with modularity and centrality, BERTopic-based topic modeling, qualitative coding in Atlas.ti, and integrated interpretation of online and offline participation dynamics.",
        null,
        null,
        null,
        "en"
      ],
      [
        "21",
        "1",
        "2",
        "Academic Consulting",
        "2024",
        "Academic Consulting - Connective Action & Conservative Mobilization",
        "Remote",
        "Methodological Designer & Data Analyst",
        "Designed the computational workflow for a study of digital activism against Peru's gender-approach school curriculum. Built and analyzed a 6,221-post Facebook corpus using BERTopic, multimodal BERTopic, multilingual-e5 embeddings, Gemini 1.5 Pro image analysis, pysentimiento, co-occurrence analysis, and Random Forest models with temporal cross-validation. Publication: https://nuevaepoca.revistalatinacs.org/index.php/revista/article/view/2553",
        null,
        null,
        null,
        "en"
      ],
      [
        "25",
        "1",
        "2",
        "Research",
        "2020-02-01",
        "AYNE-Perú Trinitarias",
        "Lima, Peru",
        "Research Consultant",
        "Designed, facilitated, analyzed, and reported community risk and social development surveys using questionnaire design and mixed descriptive/Bayesian statistical analysis workflows in Lima and Chiclayo (Peru).",
        null,
        null,
        null,
        "en"
      ],
      [
        "26",
        "1",
        "2",
        "Research",
        "2019-06-01",
        "i4d - Innovation for Development",
        "Lima, Peru",
        "Research Assistant",
        "Translated interviews to English and generated GIS entries for mining projects. Designed and implemented a virtual course for local government authorities (CENEPRED). Generated GIS outputs.",
        null,
        null,
        null,
        "en"
      ],
      [
        "27",
        "1",
        "2",
        "Research",
        "2019-02-01",
        "N&P Forest Woodwork",
        "Lima, Peru",
        "Qualitative Data Analyst",
        "Transcribed and analyzed qualitative data from 32 Amazonian communities for a major hydrocarbons company operating in Loreto and Amazonas using MAXQDA.",
        null,
        null,
        null,
        "en"
      ],
      [
        "17",
        "1",
        "1",
        "Consultoría BI y Analytics",
        "Actual",
        "ESCAPE - Consultoría BI & Analytics",
        "Lima, Perú / Remoto",
        "Senior Data Scientist y Consultor IA",
        "Realicé consultoría BI y analytics para agencias gubernamentales, ONGs y clientes privados. Diseñé flujos automatizados de análisis cualitativo y cuantitativo con NLP, ML e IA, además de soluciones de minería de procesos y optimización. Lideré talleres sobre innovación metodológica y toma de decisiones con IA.",
        "Entregué soluciones de analytics para múltiples agencias gubernamentales y ONGs. Diseñé mejoras de procesos BPMN y programas de cambio corporativo para minería, alimentos y otros rubros.",
        null,
        null,
        "es"
      ],
      [
        "9",
        "1",
        "1",
        "NLP Aplicado / IA",
        "Actual",
        "Universidad Científica del Sur",
        "Lima, Perú",
        "Especialista en IA / Ingeniero NLP",
        "Desarrollé un pipeline de análisis de texto en producción usando Modal, Llama 3, similitud semántica y BERTopic. Construí marcos de evaluación para calidad del modelo, latencia y eficiencia de tokens.",
        null,
        null,
        null,
        "es"
      ],
      [
        "18",
        "1",
        "3",
        "Consultoría Corporativa",
        "2024-08-01",
        "Facilitadores Asociados",
        "Lima, Perú",
        "Consultor y Analista",
        "Diseño de flujos de proceso BPMN y programas de cambio corporativo para grandes clientes de minería, alimentos y otros rubros. Desarrollo de recursos pedagógicos, sitios web y paneles de control para el seguimiento del progreso educativo y cumplimiento de KPI.",
        null,
        null,
        null,
        "es"
      ],
      [
        "20",
        "1",
        "3",
        "Desarrollo de IA",
        "2023-07-01",
        "Massive Dynamics Perú SAC",
        "Lima, Perú",
        "Asistente de Proyectos / Desarrollador Chatbot",
        "Apoyé el desarrollo de un chatbot centrado en análisis de datos usando Azure Databricks, Azure Machine Learning y ChatGPT de OpenAI. Utilicé SQL para gestión de datalakes y blobs, y HTML/JavaScript para componentes visuales.",
        null,
        null,
        null,
        "es"
      ],
      [
        "19",
        "1",
        "2",
        "Análisis de Datos",
        "2022-08-01",
        "APOYO Comunicación",
        "Lima, Perú",
        "Consultor de Insights",
        "Desarrollo de pipelines de análisis de temas y clasificación de similitudes, flujos de trabajo de curación de bases de datos para análisis de stakeholders, pipelines de clasificación multivariante para encuestas de cultura de sostenibilidad corporativa y flujos de análisis cualitativo en MAXQDA para investigación con stakeholders.",
        null,
        null,
        null,
        "es"
      ],
      [
        "23",
        "1",
        "2",
        "Consultoría Académica",
        "2025",
        "Consultoría Académica - La vacunación contra la COVID-19 en debate",
        "Remoto",
        "Diseñador Metodológico y Analista de Datos",
        "Diseñé un flujo mixto de análisis del discurso para noticias digitales sobre vacunación contra la COVID-19 en México, Brasil y Perú. Apliqué framing y estructuras narrativas, BERTopic, BERTopic multimodal, segmentación semántica con embeddings all-MiniLM-L6-v2, codificación asistida por Gemini 1.5 Pro, ACM/SVD, clusterización jerárquica, Gap Statistic, evaluación silhouette y V de Cramér. Publicación: https://www.scielo.cl/scielo.php?pid=S0719-15292025000200055&script=sci_arttext",
        null,
        null,
        null,
        "es"
      ],
      [
        "22",
        "1",
        "2",
        "Consultoría Académica",
        "2024",
        "Consultoría Académica - La variable de género en la difusión científica por Twitter/X",
        "Remoto",
        "Analista de Datos y Consultor Metodológico",
        "Diseñé la estrategia analítica para un estudio mixto de 13,165 publicaciones de Twitter/X de 17 divulgadores científicos. Implementé métricas de redes, análisis temporal, indicadores de eficiencia, muestreo estratificado en SPSS, codificación manual inductiva, análisis automatizado de sentimientos, exploración con ACP, transformaciones logarítmicas y evaluación con curvas ROC. Publicación: https://www.scielo.org.pe/scielo.php?script=sci_arttext&pid=S2415-09592024000400017",
        null,
        null,
        null,
        "es"
      ],
      [
        "24",
        "1",
        "2",
        "Consultoría Académica",
        "2024",
        "Consultoría Académica - Medios y conflictos sociales durante la COVID-19",
        "Remoto",
        "Analista de Datos y Revisor Metodológico",
        "Realicé el análisis de datos y la revisión metodológica de un estudio mixto y descriptivo sobre 53 portadas de los principales diarios peruanos. Apliqué análisis de framing, análisis crítico del discurso basado en el modelo tridimensional de Fairclough, análisis descriptivo de frecuencias de actores y valoraciones, y comparación entre prensa de referencia y prensa popular. Publicación: https://revistasinvestigacion.unmsm.edu.pe/index.php/discursos/article/view/25876",
        null,
        null,
        null,
        "es"
      ],
      [
        "28",
        "1",
        "2",
        "Consultoría Académica",
        "2024",
        "Consultoría Académica - Protestas en 280 caracteres",
        "Remoto",
        "Analista de Datos y Consultor de Investigación NLP",
        "Apoyé un estudio mixto que combinó análisis masivo de Twitter con entrevistas estructuradas. Implementé análisis descriptivo de contenidos virales y métricas de interacción, análisis de redes sociales en Gephi con modularidad y centralidad, modelado de tópicos con BERTopic, codificación cualitativa en Atlas.ti e integración interpretativa de la participación online y offline.",
        null,
        null,
        null,
        "es"
      ],
      [
        "21",
        "1",
        "2",
        "Consultoría Académica",
        "2024",
        "Consultoría Académica - Acción conectiva y movilización conservadora",
        "Remoto",
        "Diseñador Metodológico y Analista de Datos",
        "Diseñé el flujo computacional de un estudio sobre activismo digital contra el currículo escolar con enfoque de género en Perú. Construí y analicé un corpus de 6,221 publicaciones de Facebook con BERTopic, BERTopic multimodal, embeddings multilingual-e5, análisis de imágenes con Gemini 1.5 Pro, pysentimiento, análisis de coocurrencias y modelos Random Forest con validación cruzada temporal. Publicación: https://nuevaepoca.revistalatinacs.org/index.php/revista/article/view/2553",
        null,
        null,
        null,
        "es"
      ],
      [
        "25",
        "1",
        "2",
        "Investigación",
        "2020-02-01",
        "AYNE-Perú Trinitarias",
        "Lima, Perú",
        "Consultor de Investigación",
        "Diseño, facilitación, análisis y reporte de encuestas de riesgo comunitario y desarrollo social utilizando flujos de trabajo de diseño de cuestionarios y análisis estadístico descriptivo/bayesiano mixto en Lima y Chiclayo (Perú).",
        null,
        null,
        null,
        "es"
      ],
      [
        "26",
        "1",
        "2",
        "Investigación",
        "2019-06-01",
        "i4d - Innovation for Development",
        "Lima, Perú",
        "Asistente de Investigación",
        "Traduje entrevistas al inglés y generé entradas GIS para proyectos mineros. Diseñé e implementé un curso virtual para autoridades de gobiernos locales (CENEPRED). Generé salidas GIS.",
        null,
        null,
        null,
        "es"
      ],
      [
        "27",
        "1",
        "2",
        "Investigación",
        "2019-02-01",
        "N&P Forest Woodwork",
        "Lima, Perú",
        "Analista de Datos Cualitativos",
        "Transcribí y analicé datos cualitativos de 32 comunidades amazónicas para una importante empresa de hidrocarburos que opera en Loreto y Amazonas utilizando MAXQDA.",
        null,
        null,
        null,
        "es"
      ]
    ],
    "educacion": [
      [
        4,
        1,
        "Specialization",
        "ISIL",
        "Data Science & AI Specialization",
        "2024-01-01",
        false,
        "en"
      ],
      [
        1,
        1,
        "Higher Technical Education",
        "CIBERTEC",
        "Computer Programming & IT",
        "2023-04-01",
        false,
        "en"
      ],
      [
        2,
        1,
        "Undergraduate",
        "Universidad Nacional Mayor de San Marcos",
        "Social Sciences (Sociology)",
        "2010-04-01",
        false,
        "en"
      ],
      [
        4,
        1,
        "Especialización",
        "ISIL",
        "Especialización en Ciencia de Datos e IA",
        "2024-01-01",
        false,
        "es"
      ],
      [
        1,
        1,
        "Técnico Superior",
        "CIBERTEC",
        "Programación e Informática",
        "2023-04-01",
        false,
        "es"
      ],
      [
        2,
        1,
        "Pregrado",
        "Universidad Nacional Mayor de San Marcos",
        "Sociología",
        "2010-04-01",
        false,
        "es"
      ]
    ],
    "skills": [
      [
        1,
        1,
        1,
        "Python",
        "Specialist",
        "Software",
        null,
        null,
        null,
        null,
        "en"
      ],
      [
        2,
        1,
        1,
        "Natural Language Processing (NLP)",
        "Specialist",
        "Software",
        null,
        null,
        null,
        null,
        "en"
      ],
      [
        3,
        1,
        1,
        "LLMs & Agentic Systems (LangGraph)",
        "Specialist",
        "Software",
        null,
        null,
        null,
        null,
        "en"
      ],
      [
        4,
        1,
        3,
        "SQL & Database Management",
        "Specialist",
        "Software",
        null,
        null,
        null,
        null,
        "en"
      ],
      [
        5,
        1,
        1,
        "Machine Learning",
        "Specialist",
        "Software",
        null,
        null,
        null,
        null,
        "en"
      ],
      [
        6,
        1,
        3,
        "AWS (SageMaker, Lambda, EC2)",
        "Familiar",
        "Cloud",
        null,
        null,
        null,
        null,
        "en"
      ],
      [
        7,
        1,
        3,
        "Docker & Containerization",
        "Familiar",
        "DevOps",
        null,
        null,
        null,
        null,
        "en"
      ],
      [
        8,
        1,
        3,
        "React & Frontend Development",
        "Familiar",
        "Software",
        null,
        null,
        null,
        null,
        "en"
      ],
      [
        9,
        1,
        3,
        "Tableau (Data Visualization)",
        "Specialist",
        "Software",
        "Tableau Certified Data Analyst",
        "2023-01-01",
        "Tableau",
        null,
        "en"
      ],
      [
        10,
        1,
        1,
        "Data Engineering & ETL",
        "Specialist",
        "Software",
        null,
        null,
        null,
        null,
        "en"
      ],
      [
        11,
        1,
        null,
        "English",
        "Specialist",
        "Languages",
        "Certificate in Advanced English (C1)",
        "2018-01-01",
        "Cambridge",
        null,
        "en"
      ],
      [
        1,
        1,
        1,
        "Python",
        "Especialista",
        "Software",
        null,
        null,
        null,
        null,
        "es"
      ],
      [
        2,
        1,
        1,
        "Procesamiento de Lenguaje Natural (NLP)",
        "Especialista",
        "Software",
        null,
        null,
        null,
        null,
        "es"
      ],
      [
        3,
        1,
        1,
        "LLMs y Sistemas Agénticos (LangGraph)",
        "Especialista",
        "Software",
        null,
        null,
        null,
        null,
        "es"
      ],
      [
        4,
        1,
        3,
        "SQL y Gestión de Bases de Datos",
        "Especialista",
        "Software",
        null,
        null,
        null,
        null,
        "es"
      ],
      [
        5,
        1,
        1,
        "Aprendizaje Automático",
        "Especialista",
        "Software",
        null,
        null,
        null,
        null,
        "es"
      ],
      [
        6,
        1,
        3,
        "AWS (SageMaker, Lambda, EC2)",
        "Conoce y practica",
        "Cloud",
        null,
        null,
        null,
        null,
        "es"
      ],
      [
        7,
        1,
        3,
        "Docker y Contenedores",
        "Conoce y practica",
        "DevOps",
        null,
        null,
        null,
        null,
        "es"
      ],
      [
        8,
        1,
        3,
        "React y Desarrollo Frontend",
        "Conoce y practica",
        "Software",
        null,
        null,
        null,
        null,
        "es"
      ],
      [
        9,
        1,
        3,
        "Tableau (Visualización de Datos)",
        "Especialista",
        "Software",
        "Tableau Certified Data Analyst",
        "2023-01-01",
        "Tableau",
        null,
        "es"
      ],
      [
        10,
        1,
        1,
        "Ingeniería de Datos y ETL",
        "Especialista",
        "Software",
        null,
        null,
        null,
        null,
        "es"
      ],
      [
        11,
        1,
        null,
        "Inglés",
        "Especialista",
        "Idiomas",
        "Certificate in Advanced English (C1)",
        "2018-01-01",
        "Cambridge",
        null,
        "es"
      ]
    ],
    "publications": [
      [
        "1",
        "1",
        "How Do Waste-Picker Families Endure? Resolving Pains and Managing Support Systems as Close Relationship “Resourcing:” A CGT with Readily Available Data",
        "Paucar Villacorta, D. M.",
        "2020",
        "Article",
        "Grounded Theory Review",
        "19(2)",
        "88–106",
        null,
        "https://groundedtheoryreview.org/index.php/gtr/article/view/338",
        "Lead author",
        "en"
      ],
      [
        "1",
        "1",
        "¿Cómo resisten las familias recicladoras? Resolución del sufrimiento y gestión de sistemas de apoyo como “resourcing” en relaciones cercanas: una teoría fundamentada clásica con datos fácilmente disponibles",
        "Páucar Villacorta, D. M.",
        "2020",
        "Artículo",
        "Grounded Theory Review",
        "19(2)",
        "88–106",
        null,
        "https://groundedtheoryreview.org/index.php/gtr/article/view/338",
        "Autor principal",
        "es"
      ],
      [
        "2",
        "1",
        "Connective action and conservative mobilization: analysis of digital activism against the school curriculum with gender approach in Peru",
        "",
        "2026",
        "Article",
        "Revista Latina de Comunicación Social",
        "84",
        "1–33",
        "10.4185/rlcs-2026-25531",
        "https://nuevaepoca.revistalatinacs.org/index.php/revista/article/view/2553",
        "Methodological designer & data analyst",
        "en"
      ],
      [
        "2",
        "1",
        "Acción conectiva y movilización conservadora: análisis del activismo digital contra el currículo escolar con enfoque de género en Perú",
        "",
        "2026",
        "Artículo",
        "Revista Latina de Comunicación Social",
        "84",
        "1–33",
        "10.4185/rlcs-2026-25531",
        "https://nuevaepoca.revistalatinacs.org/index.php/revista/article/view/2553",
        "Diseñador metodológico y analista de datos",
        "es"
      ]
    ],
    "portfolio_items": [
      [
        "1",
        "1",
        "Software Project",
        "Geno-CGT",
        "Production-grade AI-assisted qualitative analysis system orchestrating 96 specialized LLM agents via LangGraph with two-tier model strategy (PRO/FLASH) and HITL validation.",
        "2026-01-01",
        "https://github.com/diegopaucarv/geno-cgt",
        "https://github.com/diegopaucarv/geno-cgt",
        null,
        null,
        "en"
      ],
      [
        "2",
        "1",
        "Software Project",
        "REII - Reproducible Social Inquiry",
        "Framework for reproducible and iterative social inquiry using NLP pipelines (ALCESTE, Stanza, sliding windows) and fine-tuned transformers for Spanish social science texts.",
        "2025-01-01",
        "https://github.com/diegopaucarv/reii",
        "https://github.com/diegopaucarv/reii",
        null,
        null,
        "en"
      ],
      [
        "3",
        "1",
        "Software Project",
        "Escape Dashboard",
        "Full-stack web application for monitoring social research projects, built with React, FastAPI, PostgreSQL, Redis, Docker, and Kubernetes. Real-time dashboards.",
        "2024-06-01",
        "https://github.com/diegopaucarv/escape_dashboard",
        "https://github.com/diegopaucarv/escape_dashboard",
        null,
        null,
        "en"
      ],
      [
        "1",
        "1",
        "Proyecto de Software",
        "Geno-CGT",
        "Sistema de análisis cualitativo asistido por IA en producción que orquesta 96 agentes LLM vía LangGraph con estrategia de dos modelos (PRO/FLASH) y validación HITL.",
        "2026-01-01",
        "https://github.com/diegopaucarv/geno-cgt",
        "https://github.com/diegopaucarv/geno-cgt",
        null,
        null,
        "es"
      ],
      [
        "2",
        "1",
        "Proyecto de Software",
        "REII - Investigación Social Reproducible",
        "Framework para investigación social reproducible e iterativa con pipelines de NLP (ALCESTE, Stanza, ventanas deslizantes) y transformers afinados.",
        "2025-01-01",
        "https://github.com/diegopaucarv/reii",
        "https://github.com/diegopaucarv/reii",
        null,
        null,
        "es"
      ],
      [
        "3",
        "1",
        "Proyecto de Software",
        "Escape Dashboard",
        "Aplicación web full-stack para monitorear proyectos de investigación social, construida con React, FastAPI, PostgreSQL, Redis, Docker y Kubernetes.",
        "2024-06-01",
        "https://github.com/diegopaucarv/escape_dashboard",
        "https://github.com/diegopaucarv/escape_dashboard",
        null,
        null,
        "es"
      ]
    ],
    "certifications": [
      [
        1,
        1,
        "Oracle AI Database SQL Associate (1Z0-171)",
        "Oracle University",
        2026,
        null,
        "en"
      ],
      [
        2,
        1,
        "Microsoft AI-102: Azure ML, NLP & AI",
        "Microsoft",
        2023,
        "https://learn.microsoft.com/es-es/users/diegomauriciopaucarvillacorta-9426/credentials/c3cdb017bddf82a8?ref=https%3A%2F%2Fwww.linkedin.com%2F",
        "en"
      ],
      [
        3,
        1,
        "NVIDIA NCA-GENL: AI and DL Ops knowledge",
        "NVIDIA",
        2024,
        "https://www.credly.com/badges/5a1b0a52-6ea7-42bc-8a2f-0aab57879a43/",
        "en"
      ],
      [
        4,
        1,
        "Tableau Certified Data Analyst",
        "Tableau",
        2023,
        "https://www.credly.com/badges/2b43ae9e-c9fa-4da6-a79d-df2d1ba7ecab/linked_in_profile",
        "en"
      ],
      [
        5,
        1,
        "UML 2.5 — OMG OCUP2",
        "OMG",
        2020,
        "https://www.credly.com/badges/27d58355-d2ae-46c2-adf8-4981fba7e093/public_url",
        "en"
      ],
      [
        6,
        1,
        "MAXQDA AI-Assist Professional Trainer",
        "MAXQDA / VERBI",
        2020,
        "https://www.maxqda.com/workshoptrainer/diego-mauricio-paucar-villacorta",
        "en"
      ],
      [
        1,
        1,
        "Oracle AI Database SQL Associate (1Z0-171)",
        "Oracle University",
        2026,
        null,
        "es"
      ],
      [
        2,
        1,
        "Azure ML, NLP e IA — Microsoft AI-102",
        "Microsoft",
        2023,
        "https://learn.microsoft.com/es-es/users/diegomauriciopaucarvillacorta-9426/credentials/c3cdb017bddf82a8?ref=https%3A%2F%2Fwww.linkedin.com%2F",
        "es"
      ],
      [
        3,
        1,
        "Progreso actual en LLMs y Deep Learning — NVIDIA NCA-GENL",
        "NVIDIA",
        2024,
        "https://www.credly.com/badges/5a1b0a52-6ea7-42bc-8a2f-0aab57879a43/",
        "es"
      ],
      [
        4,
        1,
        "Data Storytelling y Análisis — Tableau Certified Data Analyst",
        "Tableau",
        2023,
        "https://www.credly.com/badges/2b43ae9e-c9fa-4da6-a79d-df2d1ba7ecab/linked_in_profile",
        "es"
      ],
      [
        5,
        1,
        "Modelamiento y Análisis de Sistemas con UML 2.5 — OMG OCUP2",
        "OMG",
        2020,
        "https://www.credly.com/badges/27d58355-d2ae-46c2-adf8-4981fba7e093/public_url",
        "es"
      ],
      [
        6,
        1,
        "Investigación cualitativa automatizada — MAXQDA Professional Trainer",
        "MAXQDA / VERBI",
        2020,
        "https://www.maxqda.com/workshoptrainer/diego-mauricio-paucar-villacorta",
        "es"
      ]
    ]
  },
  "servicios": [
    [
      "1",
      "1",
      "Análisis de Datos",
      "Análisis cuantitativo y cualitativo para investigaciones académicas y corporativas",
      "es"
    ],
    [
      "2",
      "1",
      "Desarrollo de IA",
      "Desarrollo de soluciones de Inteligencia Artificial y Machine Learning",
      "es"
    ],
    [
      "3",
      "1",
      "Consultoría en Investigación Social",
      "Diseño y ejecución de proyectos de investigación social",
      "es"
    ],
    [
      "1",
      "1",
      "Data Analysis",
      "Quantitative and qualitative analysis for academic and corporate research",
      "en"
    ],
    [
      "2",
      "1",
      "AI Development",
      "Development of Artificial Intelligence and Machine Learning solutions",
      "en"
    ],
    [
      "3",
      "1",
      "Social Research Consulting",
      "Design and execution of social research projects",
      "en"
    ]
  ],
  "other": [
    {
      "type": "<class 'sqlglot.expressions.Drop'>",
      "raw_sql": "DROP SCHEMA IF EXISTS cvs"
    },
    {
      "type": "<class 'sqlglot.expressions.Use'>",
      "raw_sql": "USE cvs"
    },
    {
      "type": "<class 'sqlglot.expressions.Drop'>",
      "raw_sql": "/* Personal Data Table */ DROP TABLE IF EXISTS datos_personales"
    },
    {
      "type": "<class 'sqlglot.expressions.Drop'>",
      "raw_sql": "/* Personal Links Table */ DROP TABLE IF EXISTS profesiones"
    },
    {
      "type": "<class 'sqlglot.expressions.Drop'>",
      "raw_sql": "DROP TABLE IF EXISTS enlaces_personales"
    },
    {
      "type": "<class 'sqlglot.expressions.Drop'>",
      "raw_sql": "/* Experience Table */ DROP TABLE IF EXISTS experiencia"
    },
    {
      "type": "<class 'sqlglot.expressions.Drop'>",
      "raw_sql": "/* Education Table */ DROP TABLE IF EXISTS educacion"
    },
    {
      "type": "<class 'sqlglot.expressions.Drop'>",
      "raw_sql": "/* Skills Table */ DROP TABLE IF EXISTS skills"
    },
    {
      "type": "<class 'sqlglot.expressions.Drop'>",
      "raw_sql": "DROP TABLE IF EXISTS portafolio_categoria"
    },
    {
      "type": "<class 'sqlglot.expressions.Drop'>",
      "raw_sql": "DROP TABLE IF EXISTS servicios"
    },
    {
      "type": "<class 'sqlglot.expressions.Drop'>",
      "raw_sql": "DROP TABLE IF EXISTS service_variations"
    }
  ]
};
