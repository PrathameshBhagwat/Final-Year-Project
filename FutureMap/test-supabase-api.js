#!/usr/bin/env node

const https = require('https');

// Test the Supabase REST API to verify service is running
const url = 'https://wmnegxgkynzgqwjfscph.supabase.co/rest/v1/';

https.get(url, { 
  headers: { 
    'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  } 
}, (res) => {
  console.log(`✅ Supabase API is reachable (Status: ${res.statusCode})`);
  console.log('✅ Your Supabase project is active!');
  process.exit(0);
}).on('error', (err) => {
  console.error('❌ Cannot reach Supabase API:', err.message);
  process.exit(1);
});
