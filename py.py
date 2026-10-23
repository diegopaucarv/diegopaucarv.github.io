#!/usr/bin/env python3
"""
add_uncertified.py — Añade/actualiza experiencia_no_certificada en cvs.json

Uso:
    python add_uncertified.py                # aplica, crea .bak
    python add_uncertified.py --dry-run      # solo reporta
    python add_uncertified.py --path otra.json
    python add_uncertified.py --keep-existing  # no borra la entrada existente

Fuentes documentales (todas por RHE, salvo ESCAPE):
  ESCAPE               → sin respaldo (portafolio propio)
  Connective Action    → E001-10 (17 ene 2022, S/1,500)
  Gender Variable      → E001-11 (18 ene 2022, S/1,250)
  COVID-19             → E001-28 (15 ene 2025, S/2,000) + carta SciELO Ética
  Media & Conflicts    → E001-12 (31 may 2022, S/2,000), E001-13 (15 oct 2022, S/2,000)
  Female Cyberactivism → E001-14 (16 abr 2023, S/1,500)
  Massive Dynamics     → E001-15 (14 sep 2023), E001-16 (18 oct), E001-17 (28 nov)
  AYNE 2024            → E001-19 (08 mar 2024), E001-21/22 (30 sep 2024)
  Facilitadores Asoc.  → E001-23 (30 sep 2024) — RUC 20510979126 ⚠ distinto del contrato
"""

import json
import shutil
import sys
from pathlib import Path

JSON_PATH = Path("cvs.json")
BACKUP_SUFFIX = ".bak"

# [id, pid, prof_id, cat, inicio, dur, fin, inst, lugar, rol, tareas, logros, ref, ref_li, lengua]
EXPERIENCIA_NO_CERTIFICADA = [
    # 1. ESCAPE — consultoría propia, sin respaldo externo
    [
        "u1",
        "1",
        "1",
        "Consultoría propia",
        "2022-01-01",
        "",
        "Actual",
        "ESCAPE – BI & Analytics Consulting",
        "Lima, Perú",
        "Senior Data Scientist & AI Consultant",
        "Consultoría propia para agencias gubernamentales, ONGs y clientes privados. "
        "Flujos NLP/ML para análisis cuali-cuantitativo, minería de procesos, dashboards "
        "y capacitación. Rediseño BPMN y programas de cambio en minería y alimentos. "
        "Respaldo: portafolio (Escape Dashboard, REII, Geno-CGT).",
        None,
        None,
        None,
        "es",
    ],
    # 2. Connective Action — E001-10
    [
        "u2",
        "1",
        "1",
        "Consultoría académica",
        "2022-01-01",
        "1",
        "2022-01-31",
        "Universidad Científica del Sur — Connective Action & Conservative Mobilization",
        "Lima, Perú",
        "Consultor académico",
        "Estudio de 6,221 posts de Facebook sobre activismo digital contra el currículo "
        "escolar con enfoque de género en Perú. Pipeline computacional: BERTopic, "
        "embeddings multilingual-e5, sentimiento, coocurrencias y Random Forest con "
        "validación temporal. Publicado en Revista Latina de Comunicación Social "
        "(2026, DOI 10.4185/rlcs-2026-25531). "
        "Evidencia: RHE E001-10 (17 ene 2022, S/1,500).",
        None,
        None,
        None,
        "es",
    ],
    # 3. Gender Variable — E001-11
    [
        "u3",
        "1",
        "1",
        "Consultoría académica",
        "2022-01-01",
        "1",
        "2022-01-31",
        "Universidad Científica del Sur — Gender Variable in Science Communication",
        "Lima, Perú",
        "Consultor académico",
        "Estudio mixto de 13,165 posts de Twitter/X de 17 divulgadores científicos. "
        "Pipeline de recolección, limpieza, métricas, muestreo, sentimiento, ACP y "
        "curvas ROC para derivar categorías temáticas y comunicativas. Publicado en "
        "Revista de Comunicación (SciELO Perú). "
        "Evidencia: RHE E001-11 (18 ene 2022, S/1,250).",
        None,
        None,
        None,
        "es",
    ],
    # 4. COVID-19 Vaccination — E001-28
    [
        "u4",
        "1",
        "1",
        "Consultoría académica",
        "2025-01-01",
        "1",
        "2025-01-31",
        "Universidad Científica del Sur — COVID-19 Vaccination in Debate",
        "Lima, Perú",
        "Consultor académico",
        "Estudio mixto de cobertura periodística digital sobre vacunación COVID-19 en "
        "México, Brasil y Perú. Análisis del discurso, framing, estructuras narrativas, "
        "modelado multimodal de tópicos, segmentación semántica, clustering y análisis "
        "de correspondencias. Publicado en Comunicación y Medios (U. Chile). "
        "Evidencia: RHE E001-28 (15 ene 2025, S/2,000) + carta SciELO Ética (abr 2026).",
        None,
        None,
        None,
        "es",
    ],
    # 5. Media & Social Conflicts — E001-12 y E001-13
    [
        "u5",
        "1",
        "1",
        "Consultoría académica",
        "2022-05-01",
        "2",
        "2022-10-31",
        "Universidad Científica del Sur — Media and Social Conflicts During COVID-19",
        "Lima, Perú",
        "Consultor académico",
        "Estudio mixto de 53 portadas de diarios sobre cobertura mediática y conflicto "
        "social durante la pandemia. Framing, análisis crítico del discurso y comparación "
        "entre medios. Publicado en Discursos del Sur (UNMSM). "
        "Evidencia: RHE E001-12 (31 may 2022, S/2,000) y E001-13 (15 oct 2022, S/2,000). "
        "Carta de M. Ángulo (2024) confirma labor técnica.",
        None,
        None,
        None,
        "es",
    ],
    # 6. Female Cyberactivism — E001-14
    [
        "u6",
        "1",
        "1",
        "Consultoría académica",
        "2023-04-01",
        "1",
        "2023-04-30",
        "Universidad Científica del Sur — Female Cyberactivism on Twitter",
        "Lima, Perú",
        "Consultor académico",
        "Estudio mixto combinando análisis masivo de Twitter con entrevistas "
        "estructuradas. Análisis de redes en Gephi, BERTopic, engagement y "
        "codificación cualitativa para conectar patrones digitales con evidencia "
        "de entrevistas. "
        "Evidencia: RHE E001-14 (16 abr 2023, S/1,500).",
        None,
        None,
        None,
        "es",
    ],
    # 7. Massive Dynamics — E001-15, 16, 17
    [
        "u7",
        "1",
        "1",
        "Desarrollo IA",
        "2023-09-01",
        "3",
        "2023-11-30",
        "Massive Dynamics Perú SAC",
        "Lima, Perú",
        "Project Assistant / Chatbot Developer",
        "Tres servicios: investigación AI, creación de chatbot y diseño de inteligencia "
        "artificial. Azure Databricks, Azure ML, modelos OpenAI, SQL para data lake/blob "
        "storage y componentes HTML/JS para UX. "
        "Evidencia: RHE E001-15 (14 sep 2023), E001-16 (18 oct 2023), E001-17 (28 nov 2023).",
        None,
        None,
        None,
        "es",
    ],
    # 8. AYNE 2024 — E001-19, 21, 22
    [
        "u8",
        "1",
        "1",
        "Consultoría social",
        "2024-03-01",
        "2",
        "2024-09-30",
        "AYNE Perú — Diagnósticos Comunitarios 2024",
        "Puente Piedra, Lima",
        "Consultor de Diagnóstico Comunitario",
        "Tres encargos agrupados: diagnóstico social de Asociación Unidos La Grama "
        "(Puente Piedra), diagnóstico de la Red de Mujeres Jequetepeque, y diseño, "
        "análisis e informe de entrevistas a asociadas y lideresas de la Red de Mujeres. "
        "Evidencia: RHE E001-19 (08 mar 2024, S/500), E001-21 (30 sep 2024, S/1,120), "
        "E001-22 (30 sep 2024, S/500).",
        None,
        None,
        None,
        "es",
    ],
    # 9. Facilitadores Asociados S.A.C. — E001-23  ⚠ RUC distinto del contrato
    [
        "u9",
        "1",
        "1",
        "Consultoría corporativa",
        "2024-09-01",
        "1",
        "2024-09-30",
        "Facilitadores Asociados S.A.C.",
        "Lima, Perú",
        "Consultor",
        "Elaboración de propuestas, materiales de facilitación, levantamiento de "
        "información, procesos de trabajo e informes de proyectos. "
        "Evidencia: RHE E001-23 (30 sep 2024, S/1,500). "
        "NOTA: RUC 20510979126 — entidad distinta de 'Facilitadores y Consultores "
        "Asociados S.A.C.' (RUC 20553814457, contrato N°007-2024).",
        None,
        None,
        None,
        "es",
    ],
]

# Opcional: agregar a teaching_experience (descomenta si lo quieres)
TEACHING_NO_CERTIFICADA = [
    # [id, pid, course_name, institution, start, end, sessions, location, description, lengua]
    [
        "t1",
        "1",
        "Taller de Data Storytelling",
        "Centro Municipal de Promoción Juvenil (CMPJ)",
        "2024-06-23",
        "2024-06-23",
        1,
        "Lima, Perú",
        "Taller de Data Storytelling para profesionales de ciencias sociales. "
        "Servicio puntual de docencia. Evidencia: RHE E001-20 (23 jun 2024, S/268.50).",
        "es",
    ],
]


def main():
    dry_run = "--dry-run" in sys.argv
    keep_existing = "--keep-existing" in sys.argv
    path = JSON_PATH
    if "--path" in sys.argv:
        path = Path(sys.argv[sys.argv.index("--path") + 1])

    if not path.exists():
        print(f"❌ No encontrado: {path}")
        sys.exit(1)

    data = json.loads(path.read_text(encoding="utf-8"))
    d = data.setdefault("data", {})

    prev = len(d.get("experiencia_no_certificada", []))
    if keep_existing and prev > 0:
        existing_ids = {r[0] for r in d["experiencia_no_certificada"] if r}
        new = [r for r in EXPERIENCIA_NO_CERTIFICADA if r[0] not in existing_ids]
        d["experiencia_no_certificada"] = d["experiencia_no_certificada"] + new
        print(f"➕ Añadidas {len(new)} (conservadas {prev})")
    else:
        d["experiencia_no_certificada"] = [list(r) for r in EXPERIENCIA_NO_CERTIFICADA]
        print(
            f"📝 experiencia_no_certificada: {prev} → {len(d['experiencia_no_certificada'])}"
        )

    # teaching opcional
    t_prev = len(d.get("teaching_experience", []))
    if "teaching_experience" not in d:
        d["teaching_experience"] = [list(r) for r in TEACHING_NO_CERTIFICADA]
        print(
            f"📝 teaching_experience: {t_prev} → {len(d['teaching_experience'])} (nuevo)"
        )

    if dry_run:
        print("(dry-run: no se guardó)")
        return

    shutil.copy2(path, path.with_suffix(path.suffix + BACKUP_SUFFIX))
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"✅ Guardado: {path}")
    print(f"   Backup: {path.with_suffix(path.suffix + BACKUP_SUFFIX)}")
    print()
    print("ℹ️  Notas:")
    print("   • Entrada u9 (Facilitadores Asociados) es RUC DISTINTO al contrato")
    print("     N°007-2024. Verifica si la quieres conservar o borrar.")
    print("   • CMPJ (teaching) solo se añade si teaching_experience no existía.")
    print("     Descomenta/edita TEACHING_NO_CERTIFICADA si prefieres no incluirla.")


if __name__ == "__main__":
    main()
