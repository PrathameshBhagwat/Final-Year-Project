#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

async function setupDatabase() {
  console.log('🔗 Initializing Supabase client...');
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    // Read the schema file
    const schemaPath = path.join(__dirname, 'complete-database-schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    console.log('📝 Executing database schema...');
    
    // Execute the full schema
    const { data, error } = await supabase.rpc('exec', {
      sql: schema
    }).single();

    if (error) {
      console.error('❌ Error executing schema:', error.message);
      // Try alternative approach - split into smaller statements
      console.log('\n📋 Trying alternative approach with individual statements...');
      await executeStatements(supabase, schema);
    } else {
      console.log('✅ Schema executed successfully!');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

async function executeStatements(supabase, schema) {
  const statements = schema
    .split(';')
    .map(stmt => stmt.trim())
    .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

  let executed = 0;
  let failed = 0;

  for (let i = 0; i < statements.length; i += 10) {
    const batch = statements.slice(i, i + 10);
    const batchSql = batch.join(';\n') + ';';

    try {
      const { error } = await supabase.rpc('exec', {
        sql: batchSql
      }).single();

      if (error) {
        console.error(`❌ Batch ${i / 10 + 1} failed:`, error.message);
        failed++;
      } else {
        executed += batch.length;
        console.log(`✅ Batch ${i / 10 + 1}: ${batch.length} statements executed`);
      }
    } catch (error) {
      console.error(`❌ Error in batch ${i / 10 + 1}:`, error.message);
      failed++;
    }
  }

  console.log(`\n📊 Summary: ${executed} statements executed, ${failed} batches had issues`);
  
  if (executed > 0) {
    console.log('✅ Database setup partially complete!');
    console.log('💡 Run "npm run db:studio" to verify created tables');
  }
}

setupDatabase();
