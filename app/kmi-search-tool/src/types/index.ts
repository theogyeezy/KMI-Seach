// Types for KMI Sports Construction Strategic Scaling Tool

export interface Municipality {
  id: number;
  name: string;
  state: string;
  population: number;
  region: 'Northeast' | 'Midwest' | 'South' | 'West';
  created_at?: string;
  updated_at?: string;
}

export interface EducationalInstitution {
  id: number;
  name: string;
  athletic_division: 'DIII' | 'DII' | 'NAIA';
  conference?: string;
  public_private?: 'Public' | 'Private';
  hbcu?: boolean;
  municipality_id: number;
  created_at?: string;
  updated_at?: string;
}

export interface Bond {
  id: number;
  municipality_id: number;
  amount: number;
  purpose: string;
  approval_date: string;
  expiration_date?: string;
  documentation_link?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Contact {
  id: number;
  name: string;
  role: string;
  email?: string;
  phone?: string;
  institution_id?: number;
  municipality_id: number;
  created_at?: string;
  updated_at?: string;
}

export interface OpportunityAssessment {
  id: number;
  municipality_id: number;
  assessment_text: string;
  priority_level?: number;
  estimated_contract_value?: number;
  created_at?: string;
  updated_at?: string;
}

export interface TargetMunicipality {
  municipality: Municipality;
  bond: Bond;
  institution: EducationalInstitution;
  contact?: Contact;
  assessment?: OpportunityAssessment;
}

export interface FilterOptions {
  regions: string[];
  divisions: string[];
  populationRange: [number, number];
  bondAmountRange: [number, number];
  approvalDateRange: [string, string];
  states: string[];
}
