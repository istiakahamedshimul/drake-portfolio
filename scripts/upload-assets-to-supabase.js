require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !serviceRoleKey) {
  console.log('Error: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not defined.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function uploadAll() {
  const imagesDir = path.join(__dirname, '../public/assets/images');
  const files = fs.readdirSync(imagesDir);

  console.log(`Uploading ${files.length} assets to Supabase Storage bucket 'portfolio-assets'...`);

  for (const file of files) {
    if (file.endsWith('.mp4')) {
      // videos can also be uploaded if <= 10MB
      const stat = fs.statSync(path.join(imagesDir, file));
      if (stat.size > 10 * 1024 * 1024) {
        console.log(`Skipping large video ${file} (${Math.round(stat.size / 1024 / 1024)}MB)`);
        continue;
      }
    }

    const filePath = path.join(imagesDir, file);
    const fileBuffer = fs.readFileSync(filePath);
    let contentType = 'image/jpeg';
    if (file.endsWith('.png')) contentType = 'image/png';
    else if (file.endsWith('.mp4')) contentType = 'video/mp4';

    const { data, error } = await supabase.storage
      .from('portfolio-assets')
      .upload(file, fileBuffer, {
        contentType,
        upsert: true
      });

    if (error) {
      console.error(`Failed to upload ${file}:`, error.message);
    } else {
      console.log(`Uploaded ${file} -> portfolio-assets/${file}`);
    }
  }

  console.log('Asset upload completed!');
}

uploadAll();
