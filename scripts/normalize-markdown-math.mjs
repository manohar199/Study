#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import { readdir } from "node:fs/promises";
import { join } from "node:path";

async function markdownFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if ([".git", "node_modules"].includes(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await markdownFiles(path)));
    else if (/\.md$/i.test(entry.name)) files.push(path);
  }
  return files;
}

function normalizeLine(line, state) {
  if (state.inFence || /^\s*(```|~~~)/.test(line)) return line;

  // Convert both old single-backslash bracket delimiters and double-escaped
  // delimiters to the Pandoc-preferred forms.
  let result = line
    .replace(/\\\\?\[/g, "$$")
    .replace(/\\\\?\]/g, "$$")
    .replace(/\\\\?\(/g, "\\(")
    .replace(/\\\\?\)/g, "\\)");

  // Normalize LaTeX commands inside math. This deliberately leaves ordinary
  // Markdown and fenced code untouched.
  let inInlineCode = false;
  let output = "";
  for (let index = 0; index < result.length; index += 1) {
    if (result[index] === "`") inInlineCode = !inInlineCode;
    const isMathDelimiter = result.startsWith("$$", index) || result.startsWith("\\(", index) || result.startsWith("\\)", index);
    if (!inInlineCode && (state.inMath || isMathDelimiter)) {
      if (result.startsWith("\\(", index)) state.inMath = true;
      if (result.startsWith("\\)", index)) state.inMath = false;
      if (result.startsWith("$$", index)) state.inMath = !state.inMath;
      if (result.startsWith("\\\\", index)) {
        output += "\\";
        index += 1;
        continue;
      }
    }
    output += result[index];
  }
  return output;
}

for (const file of await markdownFiles(".")) {
  const source = await readFile(file, "utf8");
  const lines = source.split(/\r?\n/);
  const state = { inFence: false, inMath: false };
  const normalized = lines.map((line) => {
    const next = normalizeLine(line, state);
    if (/^\s*(```|~~~)/.test(line)) state.inFence = !state.inFence;
    return next;
  }).join("\n");
  if (normalized !== source) await writeFile(file, normalized);
}
