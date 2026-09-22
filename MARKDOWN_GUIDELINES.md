# Repository Markdown and KaTeX Standards

This repository uses clean Markdown and KaTeX syntax for all notes and study files.

## Required rules for all future uploads

1. Use valid Markdown headings and spacing.
   - Add a blank line before and after headings, lists, tables, and math blocks.
   - Keep heading levels consistent: `#`, `##`, `###`, etc.

2. Use KaTeX in the source form that renders correctly in GitHub-style preview tools.
   - Use `\(...\)` for inline math.
   - Use `\[...\]` for display math.
   - Do not use escaped backslashes in source, such as `\\(`, `\\[`, `\\)`, or `\\]`.
   - Do not mix raw HTML with math for normal note content.

3. Keep formulas readable and consistent.
   - Example: `\(Q = n\cdot u\)`
   - Example: `\[n_1u_1 = n_2u_2\]`

4. Use valid Markdown tables and lists.
   - Keep rows aligned and avoid malformed cells.
   - Use `-` or `*` for bullet lists, not mixed indentation styles.

5. Keep file paths clean.
   - Prefer hyphenated or underscored names instead of spaces when possible.
   - Example: `Physics/Units-and-Dimensions/` is preferred over `Physics/ Units and Dimensions/`.

6. No hidden syntax traps.
   - Avoid double escaping in files.
   - Avoid broken code fences or unclosed backticks.
   - Do not leave trailing whitespace on a line.

## Correct examples

```markdown
The relation is \(Q = n\cdot u\).

\[
Q = n_1u_1 = n_2u_2
\]
```

## Incorrect examples

```markdown
The relation is \\(Q = n\\cdot u\\).

\\[
Q = n_1u_1 = n_2u_2
\\]
```

These patterns are invalid for this repository and should never be uploaded again.

## Review checklist before upload

- Markdown renders cleanly
- KaTeX uses single backslashes only
- No broken tables or lists
- No duplicate escaping
- File names and directories are clean and consistent

This standard applies to every future uploaded file in the repository.
