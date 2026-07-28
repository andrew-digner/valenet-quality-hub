import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const backlogRoot = join(root, 'docs', 'backlog');
const retiredIds = new Set(['US075', 'US076']);
const failures = [];

const walk = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });

const markdownFiles = walk(root).filter(
  (path) => path.endsWith('.md') && !path.includes(`${join(root, 'node_modules')}`),
);
const storyFiles = walk(backlogRoot).filter((path) => /[/\\]US\d{3}[^/\\]*\.md$/u.test(path));
const storyIds = storyFiles.map((path) => path.match(/US\d{3}/u)?.[0]).filter(Boolean);
const uniqueIds = new Set(storyIds);

if (storyIds.length !== uniqueIds.size) {
  failures.push('Existem IDs duplicados no backlog.');
}

for (let index = 1; index <= 82; index += 1) {
  const id = `US${String(index).padStart(3, '0')}`;
  if (!retiredIds.has(id) && !uniqueIds.has(id)) {
    failures.push(`User Story ativa ausente: ${id}.`);
  }
}

for (const retiredId of retiredIds) {
  if (uniqueIds.has(retiredId)) {
    failures.push(`ID aposentado ainda possui arquivo de User Story: ${retiredId}.`);
  }
}

const forbiddenPaths = ['apps/api', 'apps/web'];
const forbiddenResponsePatterns = [/"message"\s*:\s*null/u, /"timestamp"\s*:/u];

for (const path of markdownFiles) {
  const content = readFileSync(path, 'utf8');
  const displayPath = relative(root, path);

  for (const forbiddenPath of forbiddenPaths) {
    if (content.includes(forbiddenPath) && !displayPath.includes('ADR-009')) {
      failures.push(`${displayPath}: referência legada ${forbiddenPath}.`);
    }
  }

  for (const pattern of forbiddenResponsePatterns) {
    if (pattern.test(content)) {
      failures.push(`${displayPath}: formato de resposta HTTP não canônico.`);
    }
  }

  for (const match of content.matchAll(/\[[^\]]+\]\((?!https?:|#)([^)]+)\)/gu)) {
    const target = match[1]?.split('#')[0];
    if (target && !existsSync(resolve(path, '..', decodeURIComponent(target)))) {
      failures.push(`${displayPath}: link local quebrado para ${target}.`);
    }
  }
}

if (failures.length > 0) {
  process.stderr.write(`${failures.join('\n')}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(
    `Documentação válida: ${markdownFiles.length} arquivos, ${storyIds.length} User Stories ativas e ${retiredIds.size} IDs aposentados.\n`,
  );
}
