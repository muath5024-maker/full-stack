export type ProjectType = 'store' | 'app' | 'landing_page' | 'database' | 'domain';

export interface ProjectConfig {
  id: string;
  type: ProjectType;
  name: string;
  description?: string;
  ownerEmail?: string;
  createdAt: Date;
  
  // Specific configurations
  storeConfig?: StoreConfig;
  appConfig?: AppConfig;
  landingConfig?: LandingConfig;
  
  // Infrastructure
  domain?: string;
  paymentGateway?: string;
  deploymentStatus: 'draft' | 'provisioning' | 'active';
}

export interface StoreConfig {
  theme: 'modern_dark' | 'minimal_light' | 'vibrant_shop';
  inventoryType: 'basic' | 'advanced_erp' | 'dropshipping';
  paymentMethods: string[];
  currency: string;
}

export interface AppConfig {
  icon: string | null; // URL or specialized upload ID
  platforms: ('ios' | 'android')[];
  splashScreenColor: string;
  features: string[]; // e.g., ['push_notifications', 'camera', 'gps']
}

export interface LandingConfig {
  templateId: string;
  sections: string[]; // e.g., ['hero', 'about', 'contact']
}
