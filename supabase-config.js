// Supabase Configuration
const SUPABASE_URL = 'https://wpsejjiqklhngnjeovwt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indwc2Vqamlxa2xobmduamVvdnd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxNTUwMDIsImV4cCI6MjA4NTczMTAwMn0.yPoPTlj6ExpMEmxSp3NX6ScVlCJ-uKH31JLQvnwydTM';

// Initialize Supabase client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
