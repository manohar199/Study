#!/usr/bin/env node
import { readdir } from "node:fs/promises";
import { join } from "node:path";

const errors = [];

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if ([".git", "node_modules"].includes(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await markdownFiles(path));
    else if (/\.md$/i.test(entry.name)) files.push(path);
  }
  return files;
}

function validate(file, source) {
  const lines = source.split(/\r?\n/);
  let inFence = false;
  let fenceLine = 0;
  let round = 0;
  let square = 0;
  let dollars = 0;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      if (inFence) fenceLine = index + 1;
      continue;
    }
    if (inFence) continue;

    const withoutInlineCode = line.replace(/`[^`]*`/g, "");
    for (let position = 0; position < withoutInlineCode.length; position += 1) {
      if (withoutInlineCode[position] !== "\\") continue;
      const token = withoutInlineCode.slice(position, position + 2);
      if (token === "\\(") round += 1;
      if (token === "\\)") round -= 1;
      if (token === "\\[") square += 1;
      if (token === "\\]") square -= 1;
      if (round < 0 || square < 0) errors.push(`${file}:${index + 1}: unmatched LaTeX delimiter`);
    }
    dollars += (withoutInlineCode.match(/\$\$/g) || []).length;
  }

  if (inFence) errors.push(`${file}:${fenceLine}: unclosed Markdown code fence`);
  if (round !== 0 || square !== 0) errors.push(`${file}: unbalanced \\( \\), \\[ \\] LaTeX delimiters`);
  if (dollars % 2 !== 0) errors.push(`${file}: unbalanced $$ display-math delimiters`);
}

for (const file of await markdownFiles(".")) {
  validate(file, await (await import("node:fs/promises")).readFile(file, "utf8"));
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("Markdown and LaTeX delimiter validation passed.");
