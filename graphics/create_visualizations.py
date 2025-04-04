import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import os

# Create directory for saving figures
os.makedirs('/home/ubuntu/kmi_project/graphics', exist_ok=True)

# Load the data
data = pd.read_csv('/home/ubuntu/kmi_project/data/target_municipalities.csv')

# 1. Regional Distribution Pie Chart
plt.figure(figsize=(10, 8))
region_counts = data['Region'].value_counts()
colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12']  # Northeast, Midwest, South, West
plt.pie(region_counts, labels=region_counts.index, autopct='%1.1f%%', startangle=90, colors=colors, shadow=True)
plt.title('Distribution of Target Municipalities by Region', fontsize=16, fontweight='bold')
plt.tight_layout()
plt.savefig('/home/ubuntu/kmi_project/graphics/regional_distribution_pie.png', dpi=300, bbox_inches='tight')
plt.close()

# 2. Bond Amount Distribution Bar Chart
plt.figure(figsize=(12, 8))
# Create bond amount categories
bins = [0, 3000000, 5000000, 7000000, 10000000, 15000000]
labels = ['Under $3M', '$3M-$5M', '$5M-$7M', '$7M-$10M', 'Over $10M']
data['Bond_Category'] = pd.cut(data['Bond_Amount'], bins=bins, labels=labels)
bond_counts = data['Bond_Category'].value_counts().sort_index()

bar_colors = ['#3498db', '#2ecc71', '#f39c12', '#e74c3c', '#9b59b6']
plt.bar(bond_counts.index, bond_counts.values, color=bar_colors)
plt.title('Bond Amount Distribution Across Target Municipalities', fontsize=16, fontweight='bold')
plt.xlabel('Bond Amount Range', fontsize=14)
plt.ylabel('Number of Municipalities', fontsize=14)
plt.grid(axis='y', linestyle='--', alpha=0.7)
plt.tight_layout()
plt.savefig('/home/ubuntu/kmi_project/graphics/bond_amount_distribution.png', dpi=300, bbox_inches='tight')
plt.close()

# 3. Athletic Division Distribution
plt.figure(figsize=(10, 8))
division_counts = data['Athletic_Division'].value_counts()
division_colors = ['#3498db', '#e74c3c', '#2ecc71']  # DIII, DII, NAIA
plt.pie(division_counts, labels=division_counts.index, autopct='%1.1f%%', startangle=90, colors=division_colors, shadow=True)
plt.title('Distribution of Athletic Divisions', fontsize=16, fontweight='bold')
plt.tight_layout()
plt.savefig('/home/ubuntu/kmi_project/graphics/division_distribution_pie.png', dpi=300, bbox_inches='tight')
plt.close()

# 4. Population Distribution Histogram
plt.figure(figsize=(12, 8))
plt.hist(data['Population'], bins=10, color='#3498db', edgecolor='black')
plt.title('Population Distribution of Target Municipalities', fontsize=16, fontweight='bold')
plt.xlabel('Population', fontsize=14)
plt.ylabel('Number of Municipalities', fontsize=14)
plt.grid(axis='y', linestyle='--', alpha=0.7)
plt.tight_layout()
plt.savefig('/home/ubuntu/kmi_project/graphics/population_distribution.png', dpi=300, bbox_inches='tight')
plt.close()

# 5. Bond Approval Timeline
plt.figure(figsize=(14, 8))
data['Approval_Date'] = pd.to_datetime(data['Approval_Date'])
data['Approval_Year_Month'] = data['Approval_Date'].dt.to_period('M')
timeline = data.groupby('Approval_Year_Month').size()
timeline.index = timeline.index.astype(str)
plt.plot(timeline.index, timeline.values, marker='o', linestyle='-', color='#3498db', linewidth=2, markersize=8)
plt.title('Bond Approval Timeline', fontsize=16, fontweight='bold')
plt.xlabel('Approval Date', fontsize=14)
plt.ylabel('Number of Bonds Approved', fontsize=14)
plt.xticks(rotation=45)
plt.grid(linestyle='--', alpha=0.7)
plt.tight_layout()
plt.savefig('/home/ubuntu/kmi_project/graphics/bond_approval_timeline.png', dpi=300, bbox_inches='tight')
plt.close()

# 6. Regional Bond Amount Comparison
plt.figure(figsize=(12, 8))
region_bond_avg = data.groupby('Region')['Bond_Amount'].mean() / 1000000  # Convert to millions
plt.bar(region_bond_avg.index, region_bond_avg.values, color=colors)
plt.title('Average Bond Amount by Region', fontsize=16, fontweight='bold')
plt.xlabel('Region', fontsize=14)
plt.ylabel('Average Bond Amount (Millions $)', fontsize=14)
plt.grid(axis='y', linestyle='--', alpha=0.7)
for i, v in enumerate(region_bond_avg):
    plt.text(i, v + 0.1, f'${v:.2f}M', ha='center', fontweight='bold')
plt.tight_layout()
plt.savefig('/home/ubuntu/kmi_project/graphics/regional_bond_comparison.png', dpi=300, bbox_inches='tight')
plt.close()

# 7. US Map with Target Municipalities (Simplified version)
plt.figure(figsize=(15, 10))
# This is a simplified placeholder - in a real implementation, you would use geopandas or another mapping library
regions = ['Northeast', 'Midwest', 'South', 'West']
region_counts = data['Region'].value_counts()
region_colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12']

plt.bar(regions, [region_counts.get(region, 0) for region in regions], color=region_colors)
plt.title('Target Municipalities by US Region', fontsize=16, fontweight='bold')
plt.xlabel('Region', fontsize=14)
plt.ylabel('Number of Target Municipalities', fontsize=14)
plt.grid(axis='y', linestyle='--', alpha=0.7)
for i, v in enumerate([region_counts.get(region, 0) for region in regions]):
    plt.text(i, v + 0.5, str(v), ha='center', fontweight='bold')
plt.tight_layout()
plt.savefig('/home/ubuntu/kmi_project/graphics/us_region_map.png', dpi=300, bbox_inches='tight')
plt.close()

print("All visualizations have been created and saved to /home/ubuntu/kmi_project/graphics/")
