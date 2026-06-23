import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
const env = Object.fromEntries(readFileSync(".env.local","utf8").split("\n")
  .filter(l=>l&&!l.trim().startsWith("#")&&l.includes("="))
  .map(l=>{const i=l.indexOf("=");return [l.slice(0,i).trim(),l.slice(i+1).trim()];}));
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth:{persistSession:false} });

const { data: buckets, error: le } = await sb.storage.listBuckets();
if (le) { console.log("listBuckets error:", le.message); process.exit(1); }
if (buckets.some(b => b.name === "project-media")) {
  console.log("Bucket 'project-media' already exists. OK.");
} else {
  const { error } = await sb.storage.createBucket("project-media", { public: true });
  console.log(error ? "createBucket error: " + error.message : "Bucket 'project-media' created (public). OK.");
}
