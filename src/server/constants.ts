function env<Key extends keyof NodeJS.ProcessEnv>(key: Key) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable ${key}`);
  }

  return value;
}

export const DISCORD_ID = env('DISCORD_ID');
export const DISCORD_WEBHOOK = env('DISCORD_WEBHOOK');
