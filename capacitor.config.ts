
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.9c8b395fb1af48fca3796751c05e3077',
  appName: 'lecture-ping-alerts',
  webDir: 'dist',
  server: {
    url: "https://9c8b395f-b1af-48fc-a379-6751c05e3077.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    }
  }
};

export default config;
