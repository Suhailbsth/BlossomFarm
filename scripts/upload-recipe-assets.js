const { execSync } = require('child_process');
const path = require('path');

const files = [
  'recipe-kashna.jpg',
  'recipe-salad.jpg',
  'recipe-pasta.jpg',
  'recipe-sandwich.jpg'
];

const studioDir = path.resolve(__dirname, '../../blossomfarm-cms/studio');
const imagesDir = path.resolve(__dirname, '../public/images/recipes');

const results = {};

for (const file of files) {
  const filePath = path.join(imagesDir, file);
  let success = false;
  let attempts = 0;
  while (!success && attempts < 4) {
    attempts++;
    try {
      console.log(`Uploading ${file} (attempt ${attempts})...`);
      const output = execSync(`npx sanity assets upload --file "${filePath}" --type image --dataset production`, {
        cwd: studioDir,
        encoding: 'utf-8',
        timeout: 60000
      });
      const match = output.match(/(image-[a-f0-9]+-\d+x\d+-[a-z]+)/);
      if (match) {
        results[file] = match[1];
        console.log(`Success: ${file} => ${match[1]}`);
        success = true;
      } else {
        console.log(`Unexpected output:`, output);
      }
    } catch (err) {
      console.warn(`Attempt ${attempts} failed for ${file}:`, err.message);
      execSync('node -e "setTimeout(()=>{}, 2000)"');
    }
  }
}

console.log('\nAll asset IDs:');
console.log(JSON.stringify(results, null, 2));

