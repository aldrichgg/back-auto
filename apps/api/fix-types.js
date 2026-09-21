const fs = require('fs');
const path = require('path');
const glob = require('glob'); // npm install glob or just use fs

function findEntities(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findEntities(filePath, fileList);
    } else if (filePath.endsWith('.entity.ts')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const entityFiles = findEntities('f:/Sistema/autoequity/apps/api/src');
let changedFiles = 0;

for (const file of entityFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Find @Column decorators that don't have 'type:' but the property has 'string | null'
  // and add type: 'varchar'
  content = content.replace(/@Column\(\{([^}]*)\}\)\s*([a-zA-Z0-9_]+)\s*:\s*string\s*\|\s*null;/g, (match, options, propName) => {
    if (!options.includes('type:')) {
      return `@Column({ type: 'varchar', ${options.trim()} })\n  ${propName}: string | null;`;
    }
    return match;
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    changedFiles++;
    console.log(`Updated: ${file}`);
  }
}

console.log(`Finished. Changed ${changedFiles} files.`);
