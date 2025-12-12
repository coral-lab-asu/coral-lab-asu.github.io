"""
Update _data/resources.csv from uploaded CSV files in _data/uploaded.

Expected columns in uploaded CSV:
- Publication Title
- Authors
- Venue
- Code Link
- Dataset Link
Optional:
- Description (used directly for the description field)
- Image (filename under images/paper snap/)
- demo (Yes => new record goes to Demo section)
Optionally, if present:
- Paper Link (used to fetch abstract for description)

Behavior:
- Matches existing entries by title (case-insensitive, trimmed).
- Only updates an existing record if a field value differs and the new value is non-empty.
- Adds new records for unmatched titles.
- Tries to generate a 2–3 sentence description from the paper link abstract when available.
- After processing, renames each uploaded CSV by appending a timestamp.
"""

import csv
import datetime as dt
import os
import re
from pathlib import Path
from typing import Dict, List

import requests  # Required for fetching abstracts from paper links


ROOT = Path(__file__).resolve().parent.parent
RESOURCES_CSV = ROOT / "_data" / "resources.csv"
UPLOAD_DIR = ROOT / "_data" / "uploaded"

RESOURCE_FIELDS = [
    "section",
    "title",
    "paper_url",
    "data_url",
    "code_url",
    "demo_url",
    "image",
    "authors",
    "venue_name",
    "venue_url",
    "description",
]


def load_resources() -> List[Dict[str, str]]:
    if not RESOURCES_CSV.exists():
        return []
    with RESOURCES_CSV.open(newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def save_resources(rows: List[Dict[str, str]]) -> None:
    with RESOURCES_CSV.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=RESOURCE_FIELDS)
        writer.writeheader()
        for row in rows:
            writer.writerow({key: row.get(key, "") for key in RESOURCE_FIELDS})


def normalize_title(title: str) -> str:
    return re.sub(r"\s+", " ", title or "").strip().lower()


def fetch_abstract(url: str) -> str:
    if not url:
        return ""
    try:
        resp = requests.get(url, timeout=10)
        resp.raise_for_status()
        text = resp.text
    except Exception:
        return ""

    # Simple heuristics: try meta description, then arXiv abstract blockquote.
    match = re.search(r'<meta name="description" content="([^"]+)"', text, re.IGNORECASE)
    if match:
        return clean_sentences(match.group(1))

    match = re.search(r'<blockquote class="abstract[^"]*">\\s*<span class="descriptor">Abstract:</span>(.*?)</blockquote>', text, re.IGNORECASE | re.DOTALL)
    if match:
        abstract = re.sub(r"<[^>]+>", " ", match.group(1))
        return clean_sentences(abstract)

    return ""


def clean_sentences(text: str) -> str:
    cleaned = re.sub(r"\s+", " ", text).strip()
    if not cleaned:
        return ""
    # Keep only the first 2–3 sentences.
    parts = re.split(r"(?<=[.!?])\s+", cleaned)
    summary = " ".join(parts[:3]).strip()
    # Soft cap the length to keep it gisted.
    if len(summary) > 450:
        summary = summary[:447].rsplit(" ", 1)[0] + "..."
    return summary


def merge_row(existing: Dict[str, str], incoming: Dict[str, str]) -> Dict[str, str]:
    updated = existing.copy()
    for key, value in incoming.items():
        if value and existing.get(key, "") != value:
            updated[key] = value
    return updated


def map_upload_row(row: Dict[str, str]) -> Dict[str, str]:
    title = row.get("Publication Title", "").strip()
    data_url = row.get("Dataset Link", "").strip()
    code_url = row.get("Code Link", "").strip()
    paper_url = row.get("Paper Link", "").strip()
    authors = row.get("Authors", "").strip()
    venue = row.get("Venue", "").strip()
    demo_flag = (row.get("demo") or row.get("Demo") or "").strip().lower()
    section = "demo" if demo_flag == "yes" else "data"
    image = (row.get("Image") or row.get("image") or row.get("Thumbnail") or "").strip()

    description = row.get("Description", "").strip()
    if not description and paper_url:
        description = fetch_abstract(paper_url)

    return {
        "section": section,
        "title": title,
        "paper_url": paper_url,
        "data_url": data_url,
        "code_url": code_url,
        "demo_url": "",
        "image": image,
        "authors": authors,
        "venue_name": venue,
        "venue_url": "",
        "description": description,
    }


def process_upload(upload_path: Path, resources: List[Dict[str, str]]) -> List[Dict[str, str]]:
    by_title = {normalize_title(r.get("title", "")): r for r in resources}
    changed = False

    with upload_path.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            mapped = map_upload_row(row)
            norm_title = normalize_title(mapped["title"])
            if not norm_title:
                continue

            if norm_title in by_title:
                # Preserve existing section; only new items get mapped section
                mapped["section"] = ""
                # Preserve existing section if incoming lacks one
                if not mapped.get("section"):
                    mapped["section"] = by_title[norm_title].get("section", "")
                merged = merge_row(by_title[norm_title], mapped)
                if merged != by_title[norm_title]:
                    by_title[norm_title] = merged
                    changed = True
            else:
                if not mapped.get("section"):
                    mapped["section"] = "data"
                by_title[norm_title] = mapped
                changed = True

    updated_resources = list(by_title.values())

    if changed:
        updated_resources.sort(key=lambda r: r.get("title", "").lower())
    return updated_resources


def rename_processed(upload_path: Path) -> None:
    ts = dt.datetime.now().strftime("%Y%m%d%H%M%S")
    new_name = upload_path.with_name(f"{upload_path.stem}.processed-{ts}{upload_path.suffix}")
    upload_path.rename(new_name)


def main() -> None:
    resources = load_resources()
    if not UPLOAD_DIR.exists():
        print("No upload directory found; exiting.")
        return

    uploads = sorted(
        [
            p
            for p in UPLOAD_DIR.glob("*.csv")
            if "processed-" not in p.stem  # skip already processed files
        ]
    )
    if not uploads:
        print("No uploaded CSV files found; nothing to do.")
        return

    for upload in uploads:
        resources = process_upload(upload, resources)
        rename_processed(upload)

    save_resources(resources)
    print("resources.csv updated.")


if __name__ == "__main__":
    main()
