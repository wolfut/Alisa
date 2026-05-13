import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.dreamscope',
  appName: 'DreamScope',
  webDir: 'dist',
  server: {
    url: 'https://104ffffa-580a-4761-8e1f-1102b4bed649.lovableproject.com?forceHideBadge=true',
    cleartext: true
  }
};

export default config;
