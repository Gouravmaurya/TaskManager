#!/bin/bash

echo "Creating folder structure..."

mkdir -p task-manager/{backend/{controllers,models,routes,middlewares,config},frontend/{components,pages,lib,styles}}

touch task-manager/.gitignore
touch task-manager/README.md

# Backend files
touch task-manager/backend/server.js
touch task-manager/backend/.env
touch task-manager/backend/package.json

# Frontend files
touch task-manager/frontend/package.json
touch task-manager/frontend/pages/index.js
touch task-manager/frontend/pages/login.js
touch task-manager/frontend/pages/register.js
touch task-manager/frontend/pages/dashboard.js
touch task-manager/frontend/lib/api.js

echo "Folder structure created successfully!"
