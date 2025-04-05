
/// <reference types="vite/client" />

// This file defines the types for environment variables
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_MONGODB_URI: string;
  readonly VITE_UPLOAD_PATH: string;
  readonly VITE_MOCK_MODE?: string;
  // Add any other environment variables your application uses here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
