import { createClient } from '@supabase/supabase-js';

const STORAGE_URL_KEY = 'marko_supabase_url';
const STORAGE_ANON_KEY = 'marko_supabase_anon_key';

export function getSupabaseCredentials() {
  const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  try {
    const savedUrl = localStorage.getItem(STORAGE_URL_KEY) || '';
    const savedKey = localStorage.getItem(STORAGE_ANON_KEY) || '';
    return {
      url: (savedUrl || envUrl).trim(),
      anonKey: (savedKey || envKey).trim(),
    };
  } catch {
    return { url: envUrl.trim(), anonKey: envKey.trim() };
  }
}

export function saveSupabaseCredentials(url, anonKey) {
  try {
    localStorage.setItem(STORAGE_URL_KEY, (url || '').trim());
    localStorage.setItem(STORAGE_ANON_KEY, (anonKey || '').trim());
  } catch {}
}

export function clearSupabaseCredentials() {
  try {
    localStorage.removeItem(STORAGE_URL_KEY);
    localStorage.removeItem(STORAGE_ANON_KEY);
  } catch {}
}

export function createSupabaseClient() {
  const { url, anonKey } = getSupabaseCredentials();
  if (!url || !anonKey || !url.startsWith('http')) {
    return null;
  }
  try {
    return createClient(url, anonKey);
  } catch {
    return null;
  }
}

export async function fetchAllSiteDataFromSupabase() {
  const supabase = createSupabaseClient();
  if (!supabase) return { connected: false, data: null, error: 'Not configured' };

  try {
    const { data, error } = await supabase
      .from('marko_site_store')
      .select('key, value');

    if (error) {
      return { connected: false, data: null, error: error.message };
    }

    const map = {};
    if (Array.isArray(data)) {
      data.forEach((row) => {
        map[row.key] = row.value;
      });
    }
    return { connected: true, data: map, error: null };
  } catch (err) {
    return {
      connected: false,
      data: null,
      error: err?.message || 'Connection failed',
    };
  }
}

export async function upsertSiteKeyToSupabase(key, value) {
  const supabase = createSupabaseClient();
  if (!supabase) return { ok: false, error: 'Supabase not configured' };

  try {
    const { error } = await supabase.from('marko_site_store').upsert(
      {
        key,
        value,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'key' }
    );
    if (error) return { ok: false, error: error.message };
    return { ok: true, error: null };
  } catch (err) {
    return { ok: false, error: err?.message || 'Failed to sync' };
  }
}

export const SUPABASE_SQL_SCHEMA = `-- Run this once in your Supabase SQL Editor (https://supabase.com/dashboard)
create table if not exists public.marko_site_store (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

alter table public.marko_site_store enable row level security;

drop policy if exists "Allow public read and write on marko_site_store" on public.marko_site_store;

create policy "Allow public read and write on marko_site_store"
  on public.marko_site_store
  for all
  to anon, authenticated
  using (true)
  with check (true);`;
