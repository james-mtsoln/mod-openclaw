---
name: csv-analyzer
description: Automatically analyze CSV files — generate insights, statistics, visualizations, and data quality reports.
user-invocable: true
metadata: { "openclaw": { "emoji": "📊" } }
---

# CSV Data Analyzer

Instant CSV data analysis and visualization. Adapted from [csv-data-summarizer](https://github.com/coffeefuelbump/csv-data-summarizer-claude-skill).

## Usage

```
/csv <path-to-csv-file>
```

## Instructions

When the user provides a CSV file:

### Step 1: Load and Inspect

```bash
head -5 "{file}"
wc -l "{file}"
```

- Show first 5 rows
- Report: row count, column count, file size

### Step 2: Data Quality Report

For each column:

- **Type**: numeric, text, date, boolean
- **Missing values**: count and percentage
- **Unique values**: count (flag if all unique = likely ID column)
- **Sample values**: 3 example values

### Step 3: Statistical Summary (numeric columns)

- Mean, median, min, max, std dev
- Distribution shape (normal, skewed, bimodal)
- Outlier detection (values > 3σ from mean)

### Step 4: Key Insights

Automatically identify:

- **Correlations** between numeric columns
- **Trends** in time-series data (if date column exists)
- **Top/bottom values** in key metrics
- **Anomalies** — sudden changes or outliers

### Step 5: Recommendations

- Suggest next analysis steps
- Identify columns suitable for groupby/pivot
- Recommend chart types for the data
- Flag data quality issues to fix

### Output Format

```markdown
## Data Overview

{rows} rows × {cols} columns

## Column Summary

| Column | Type | Missing | Unique | Example |
| ------ | ---- | ------- | ------ | ------- |

## Key Findings

1. {insight with data}
2. {insight with data}

## Data Quality Issues

- {issue and suggestion}
```

### Rules

- **Never modify the source file**
- **Use command-line tools** (awk, sort, uniq, head) for large files
- **Warn if file > 100MB** — suggest sampling
