-- Database schema for KMI Sports Construction Strategic Scaling Tool

-- Municipalities table to store information about towns/cities
CREATE TABLE municipalities (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  state TEXT NOT NULL,
  population INTEGER,
  region TEXT NOT NULL CHECK (region IN ('Northeast', 'Midwest', 'South', 'West')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Educational institutions table to store college/university information
CREATE TABLE educational_institutions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  athletic_division TEXT NOT NULL CHECK (athletic_division IN ('DIII', 'DII', 'NAIA')),
  conference TEXT,
  public_private TEXT CHECK (public_private IN ('Public', 'Private')),
  hbcu BOOLEAN DEFAULT FALSE,
  municipality_id INTEGER REFERENCES municipalities(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bonds table to store municipal bond information
CREATE TABLE bonds (
  id SERIAL PRIMARY KEY,
  municipality_id INTEGER REFERENCES municipalities(id),
  amount DECIMAL(15, 2) NOT NULL,
  purpose TEXT NOT NULL,
  approval_date DATE NOT NULL,
  expiration_date DATE,
  documentation_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Contacts table to store decision-maker information
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  institution_id INTEGER REFERENCES educational_institutions(id),
  municipality_id INTEGER REFERENCES municipalities(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Opportunity assessments table to store analysis of each target
CREATE TABLE opportunity_assessments (
  id SERIAL PRIMARY KEY,
  municipality_id INTEGER REFERENCES municipalities(id),
  assessment_text TEXT NOT NULL,
  priority_level INTEGER CHECK (priority_level BETWEEN 1 AND 5),
  estimated_contract_value DECIMAL(15, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for common query patterns
CREATE INDEX idx_municipalities_region ON municipalities(region);
CREATE INDEX idx_municipalities_population ON municipalities(population);
CREATE INDEX idx_educational_institutions_division ON educational_institutions(athletic_division);
CREATE INDEX idx_bonds_approval_date ON bonds(approval_date);
CREATE INDEX idx_bonds_amount ON bonds(amount);

-- Create views for common queries

-- View for all target municipalities with their bonds and institutions
CREATE VIEW target_municipalities_view AS
SELECT 
  m.id AS municipality_id,
  m.name AS municipality_name,
  m.state,
  m.population,
  m.region,
  b.id AS bond_id,
  b.amount AS bond_amount,
  b.purpose AS bond_purpose,
  b.approval_date,
  b.expiration_date,
  e.id AS institution_id,
  e.name AS institution_name,
  e.athletic_division,
  e.conference,
  e.public_private,
  e.hbcu
FROM 
  municipalities m
  JOIN bonds b ON m.id = b.municipality_id
  JOIN educational_institutions e ON m.id = e.municipality_id;

-- View for regional summary statistics
CREATE VIEW regional_summary_view AS
SELECT
  region,
  COUNT(DISTINCT m.id) AS municipality_count,
  AVG(population) AS avg_population,
  SUM(b.amount) AS total_bond_amount,
  COUNT(DISTINCT e.id) AS institution_count,
  COUNT(DISTINCT CASE WHEN e.athletic_division = 'DIII' THEN e.id END) AS diii_count,
  COUNT(DISTINCT CASE WHEN e.athletic_division = 'DII' THEN e.id END) AS dii_count,
  COUNT(DISTINCT CASE WHEN e.athletic_division = 'NAIA' THEN e.id END) AS naia_count
FROM
  municipalities m
  JOIN bonds b ON m.id = b.municipality_id
  JOIN educational_institutions e ON m.id = e.municipality_id
GROUP BY
  region;
