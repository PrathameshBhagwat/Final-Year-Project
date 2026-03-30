#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

// Load environment variables
require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in environment variables');
  process.exit(1);
}

async function runSchema() {
  // Create a new pool for migrations
  const pool = new Pool({
    connectionString: DATABASE_URL,
    // Disable prepared statements for complex migrations
    application_name: 'schema_runner',
    statement_timeout: 300000, // 5 minutes timeout
  });

  try {
    console.log('🔗 Connecting to Supabase database...');
    const client = await pool.connect();
    console.log('✅ Connected successfully!');

    try {
      // Read the schema file
      const schemaPath = path.join(__dirname, 'complete-database-schema.sql');
      const schema = fs.readFileSync(schemaPath, 'utf8');

      console.log('📝 Executing database schema...');
      
      // Split and execute statements
      const statements = schema
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

      let executed = 0;
      for (const statement of statements) {
        try {
          await client.query(statement);
          executed++;
          console.log(`✅ Statement ${executed} executed`);
        } catch (error) {
          console.error(`❌ Error on statement ${executed}:`, error.message);
          // Continue with next statement
        }
      }

      console.log(`\n✅ Schema setup complete! Executed ${executed} statements`);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runSchema();
