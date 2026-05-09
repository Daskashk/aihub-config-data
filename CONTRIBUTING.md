# Contributing to AI Hub Config Data

Thanks for helping keep this data accurate and up‑to‑date!  
Please follow these guidelines so your changes can be merged quickly.

## Versioning Scheme

We use **Semantic Versioning** (`x.y.z`) for both JSON files.  
**When you make a change, update the `version` field in _both_ files** according to the table below.

| Change type   | Version bump | Examples                                                                                                                                           |
| ------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **patch (z)** | yes          | • Updating a service’s colour or URL<br>• Adding/removing a domain in any domain list<br>• Adding/removing a tracking parameter<br>• Fixing a typo |
| **minor (y)** | yes          | • Adding a new AI service<br>• Removing an existing AI service                                                                                     |
| **major (x)** | yes          | • Changing the JSON structure (keys, array → object)<br>⚠️ Avoid this – coordinate with app developers first                                       |

**Important:**

- When you bump the **minor** version (`y`), reset the **patch** (`z`) to `0`.
- When you bump the **major** version (`x`), reset both **minor** (`y`) and **patch** (`z`) to `0`.

If you’re unsure which part to bump, a maintainer will help during review.

## Adding or Modifying an AI Service

Edit `ai_services_list.json` → `"ai_services"` array.  
Each service is an **array of 5 strings**:

1. **Name** – Display name (e.g. `"ChatGPT"`)
2. **URL** – **Must start with `https://`** (e.g. `"https://chatgpt.com"`)
3. **Pricing** – One of the following (case‑sensitive):
   - `Free` – No paid features at all.
   - `Freemium` – Has paid tiers but can be used for free.
   - `Paid` – Requires payment to use.
4. **Privacy** – One of the following:
   - `Privacy focused` – Chats stored locally (browser storage, etc.)
   - `Privacy friendly` – Provider does **not** train on user data.
   - `Not for privacy` – None of the above.
5. **Colour** – 6‑digit hex accent colour **without** `#` (e.g. `"10A37F"`).  
   **Do not reuse a colour** already present in the list – pick a new distinct one.

Add your new entry at the **end** of the array, then bump the **minor** version (`y`) and reset `z` to `0`.

## Adding or Modifying Domain Filtering Rules

Edit `domain_filtering_rules.json`. The file contains four sections:

### `service_domains`

Object keyed by **service ID**.  
**Service ID =** service name lower‑cased, all spaces removed.  
Examples: `"aihub"`, `"googleaistudio"`.

Each value is an array of base domains.  
**Important:** Adding `"example.com"` automatically allows **all subdomains** (`www.example.com`, `abc.xyz.example.com`, etc.) in the AI Hub Android app.

### `always_blocked_domains`

Same structure as `service_domains`.  
Use this to block specific subdomains that would otherwise be allowed by a parent domain.  
_Example:_ If `example.com` is allowed but `static.example.com` should be blocked, add `"static.example.com"` here.

### `common_auth_domains`

Domains used for authentication (Google, Apple, GitHub, Microsoft, etc.).  
Add any domain that hosts OAuth/login flows for the listed services.

### `tracking_params`

An array of URL parameter names commonly used for tracking (e.g. `"utm_source"`, `"ref"`).  
Add any new tracking parameters you discover.

**Version bump:** All changes in this file are **patch** (`z`) except when adding a new service’s section (which is done together with the AI service entry – bump `y` for both files and reset `z` to `0`).

## Pull Request Checklist

1. Fork the repository.
2. Make your edits to the JSON files.
3. Update the `version` field in **both** `ai_services_list.json` and `domain_filtering_rules.json` according to the versioning rules (remember to reset lower parts when bumping `y` or `x`).
4. Verify your JSON is valid (no trailing commas, matching brackets).
5. Open a pull request with a clear description of what you changed.
6. A maintainer will review and merge.

Thank you for contributing to AI Hub Config Data!
