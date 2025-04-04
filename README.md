# KMI Search Tool

## Overview
This repository contains the KMI Search Tool application, a custom-built solution designed to help KMI Sports Construction identify and target small U.S. towns with active municipal bonds for athletic facilities near DIII, DII, and NAIA schools.

**Prepared by Matt Yee, YeeCorp**

## Features
- **Multi-criteria Filtering**: Filter municipalities by region, athletic division, population range, bond amount, approval date, and state
- **Interactive Visualizations**: Visual representations of data distribution across regions, bond amounts, and athletic divisions
- **Detailed Profiles**: Comprehensive profiles for each target municipality
- **Responsive Design**: Works on both desktop and mobile devices

## Technology Stack
- **Frontend**: TypeScript, Vite, React, Redux
- **Database**: Supabase
- **Data Visualization**: Custom charts and data visualization components

## Repository Structure
- `/app` - Search tool application code
- `/data` - Database schema and CSV data files
- `/graphics` - Visualizations and charts
- `/research` - Research findings and analysis

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Supabase account

### Installation
1. Clone this repository
```bash
git clone https://github.com/theogyeezy/KMI-Seach.git
cd KMI-Seach
```

2. Install dependencies
```bash
cd app/kmi-search-tool
npm install
```

3. Configure Supabase
- Create a new Supabase project
- Run the database schema SQL from `/data/database_schema.sql`
- Import the CSV data from `/data/target_municipalities.csv`
- Update the Supabase URL and key in `/app/kmi-search-tool/src/services/supabase.ts`

4. Start the development server
```bash
npm run dev
```

## Deployment
To build the application for production:
```bash
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to any static hosting service.

## Strategic Scaling Plan
This application is part of a comprehensive strategic scaling plan for KMI Sports Construction. The full plan includes:

- Analysis of municipal bonds for sports facilities
- Identification of small colleges by division (DIII, DII, NAIA)
- Cross-referencing of towns with bonds and educational institutions
- Organization of data by geographic regions
- Strategic recommendations for national scaling

## Data Sources
- Municipal bond databases
- NCAA and NAIA college directories
- U.S. Census population data
- Municipal government websites

## License
© 2025 YeeCorp. All rights reserved.

---

*This project was prepared by Matt Yee, YeeCorp as a third-party consultant for KMI Sports Construction.*
