import { createClient } from '@supabase/supabase-js';

/**
 * Manual Supabase Configuration:
 * 1. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file, OR
 * 2. Paste your Project URL and Anon Key directly in SUPABASE_URL and SUPABASE_ANON_KEY below.
 */
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://iytalqdhrywqmyvblvni.supabase.co';
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_vBuOn_uFv3MQkmdis6xmfA_m6wlg5xD';

export const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_URL.startsWith('http')
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

export async function fetchAllSiteDataFromSupabase() {
  if (!supabase) return { connected: false, data: null };

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
    return { connected: true, data: map };
  } catch (err) {
    return { connected: false, data: null, error: err?.message };
  }
}

export async function upsertSiteKeyToSupabase(key, value) {
  if (!supabase) return { ok: false };

  try {
    const { error } = await supabase.from('marko_site_store').upsert(
      {
        key,
        value,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'key' }
    );
    return { ok: !error, error: error?.message || null };
  } catch (err) {
    return { ok: false, error: err?.message };
  }
}
