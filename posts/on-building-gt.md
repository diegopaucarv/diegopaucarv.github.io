---
title: On Building gt
date: 2025-09-03
description: Notes on why I built a command-line tool for social research, and what I learned doing it.
---

# On Building gt

Most research tools are built by software engineers for software engineers. They assume familiarity with certain conventions — version control, terminal interfaces, reproducible environments — that social scientists are rarely taught and often actively discouraged from using.

`gt` started as a personal frustration.

## The Problem

I kept doing the same things manually: downloading survey exports, cleaning column names, reshaping from wide to long, merging on identifiers that were inconsistent across waves. Every project began with two days of archaeology before any actual analysis could begin.

The obvious solution was a script. The less obvious solution was to make that script general enough to be useful across projects, and documented enough to be useful to others.

## What I Built

`gt` is a command-line interface for common social research data workflows. It handles:

- **Ingestion**: reading from CSV, Excel, SPSS, and survey platform exports
- **Normalization**: standardizing column names, encoding labels, handling missing value codes
- **Reshaping**: wide-to-long and long-to-wide transformations with sensible defaults
- **Audit trails**: every operation is logged with the input state and the transformation applied

The audit trail was the hardest part to design. Reproducibility requires not just knowing what you did, but knowing what the data looked like before you did it.

## What I Learned

Building a tool that other researchers might actually use forced me to think carefully about cognitive load. The interface has to be learnable in minutes, not hours. The defaults have to be defensible. The error messages have to be informative, not cryptic.

These are UX problems, not engineering problems. Sociology was surprisingly good preparation.
