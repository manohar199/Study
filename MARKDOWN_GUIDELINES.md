# Repository Markdown and LaTeX Standards

This repository uses clean Markdown and Pandoc-compatible LaTeX math syntax for all notes and study files on the `main` branch. This policy applies to the current branch and every future uploaded file.

## Required rules for all future uploads

1. Use valid Markdown headings and spacing.

   - Add a blank line before and after headings, lists, tables, and math blocks.
   - Keep heading levels consistent: `#`, `##`, `###`, etc.

2. Use Pandoc-compatible LaTeX math syntax.

   - Use `\(...\)` or `$...$` for inline math.
   - Use `$$...$$` for display math.
   - Use a single backslash in LaTeX commands and delimiters.
   - Never use double-escaped math such as `\\(`, `\\[`, `\\)`, or `\\]`.
   - Do not put normal note content in raw HTML math tags.

3. Keep formulas readable and consistent.

   - Inline example: `The relation is \(Q = n\cdot u\).`
   - Display example:

     $$
     Q = n_1u_1 = n_2u_2
     $$

4. Use valid Markdown tables and lists.

   - Keep rows aligned and avoid malformed cells.
   - Use `-` or `*` for bullet lists, not mixed indentation styles.

5. Keep file paths clean where practical.

   - Prefer hyphenated or underscored names instead of spaces when possible.

6. Avoid hidden syntax traps.

   - Do not use double escaping in math.
   - Do not leave broken code fences or unclosed backticks.
   - Do not leave trailing whitespace on a line.

7. Every Markdown file uploaded to `main` is automatically normalized and validated by `.github/workflows/format-markdown.yml`.

## Review checklist before upload

- Markdown renders cleanly.
- Inline math uses `\(...\)` or `$...$` with single backslashes.
- Display math uses `$$...$$`.
- No broken tables, lists, or code fences.
- No duplicate escaping in LaTeX.
- The file passes the repository's automated validation.

This standard applies to every future uploaded file in the repository's `main` branch.
