---
name: invoice-organizer
description: Organize invoices and receipts for tax prep — read PDFs, extract info, rename consistently, sort by vendor/category/date.
user-invocable: true
metadata: { "openclaw": { "emoji": "🧾" } }
---

# Invoice Organizer

Smart invoice and receipt organizer. Adapted from [awesome-claude-skills/invoice-organizer](https://github.com/ComposioHQ/awesome-claude-skills).

## Usage

```
/invoices <directory-with-receipts>
```

## Instructions

### Step 1: Scan the Directory

```bash
find "{directory}" -type f \( -name "*.pdf" -o -name "*.jpg" -o -name "*.png" -o -name "*.heic" \) | sort
```

- List all receipt/invoice files
- Count total files and estimate processing time

### Step 2: Extract Information from Each

For each file, extract:

- **Vendor/Company name**
- **Date** (invoice/purchase date)
- **Amount** (total including tax)
- **Currency**
- **Category** (office, travel, meals, software, hardware, etc.)
- **Invoice/Receipt number** (if present)

### Step 3: Propose Organization

Present the proposed structure to user:

```
receipts/
├── 2024-Q1/
│   ├── office/
│   │   └── 2024-01-15_amazon_$45.99.pdf
│   └── software/
│       └── 2024-02-01_github_$7.00.pdf
├── 2024-Q2/
│   └── travel/
│       └── 2024-04-10_uber_$23.50.pdf
└── summary.csv
```

### Step 4: Execute (only with approval)

- Rename files: `YYYY-MM-DD_vendor_$amount.ext`
- Move into category folders by quarter
- Generate `summary.csv` with all extracted data:
  `date,vendor,amount,currency,category,original_filename,new_path`

### Rules

- **Never delete originals** — copy, don't move, or ask first
- **Ask when uncertain** about vendor/category extraction
- **Generate CSV summary** always — this is the key deliverable
- **Flag duplicates** — same vendor + date + amount
