import type { NextConfig } from "next";

function getSupabaseHostname() {
  try {
    return new URL(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://kslbjarqvaiyuksgxiug.supabase.co",
    ).hostname;
  } catch {
    return "kslbjarqvaiyuksgxiug.supabase.co";
  }
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    serverActions: {
      // Admin uploads are validated again at 7 MB inside the action. The extra
      // room covers multipart metadata while keeping a bounded request size.
      bodySizeLimit: "8mb",
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        // Supabase Storage — images uploaded through the admin panel.
        protocol: "https",
        hostname: getSupabaseHostname(),
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
