require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !serviceRoleKey) {
  console.log('Error: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not defined.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function test() {
  console.log('Testing Supabase connection...');
  try {
    // Check if tables already exist
    const { data: projects, error: projErr } = await supabase.from('projects').select('*').limit(1);
    if (projErr) {
      console.log('Projects table error (probably not created yet):', projErr.message);
    } else {
      console.log('Projects table exists! Count:', projects.length);
    }

    const { data: buckets, error: bucketErr } = await supabase.storage.listBuckets();
    if (bucketErr) {
      console.log('Buckets error:', bucketErr.message);
    } else {
      console.log('Existing buckets:', buckets.map(b => b.name));
    }
  } catch (err) {
    console.error('Connection error:', err);
  }
}

test();
