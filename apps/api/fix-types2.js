const fs = require('fs');
const path = require('path');

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

  // Find @Column decorators that don't have 'type:' but the property has 'number | null'
  // and add type: 'int'
  content = content.replace(/@Column\(\{([^}]*)\}\)\s*([a-zA-Z0-9_]+)\s*:\s*number\s*\|\s*null;/g, (match, options, propName) => {
    if (!options.includes('type:')) {
      return `@Column({ type: 'int', ${options.trim()} })\n  ${propName}: number | null;`;
    }
    return match;
  });

  // Find boolean | null just in case
  content = content.replace(/@Column\(\{([^}]*)\}\)\s*([a-zA-Z0-9_]+)\s*:\s*boolean\s*\|\s*null;/g, (match, options, propName) => {
    if (!options.includes('type:')) {
      return `@Column({ type: 'boolean', ${options.trim()} })\n  ${propName}: boolean | null;`;
    }
    return match;
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    changedFiles++;
    console.log(`Updated: ${file}`);
  }
}

console.log(`Finished numbers/booleans. Changed ${changedFiles} files.`);
