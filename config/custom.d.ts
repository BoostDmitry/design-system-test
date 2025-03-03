/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMINPANEL_URL: string;
  readonly VITE_HUMANCHAT_URL: string;
  readonly VITE_CHAT_PANEL_API_URL: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_GENESYS_AGENT_ASSIST_CLIENT_ID: string;
  readonly VITE_AGENT_ASSIST_CHAT_API_URL: string;
  readonly VITE_HELPCENTER_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  openHelpCenter: (pathname?: string) => void;
  closeHelpCenter: () => void;
  showArticle: (articleId: number) => void;
}