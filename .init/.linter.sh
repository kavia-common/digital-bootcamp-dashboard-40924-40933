#!/bin/bash
cd /home/kavia/workspace/code-generation/digital-bootcamp-dashboard-40924-40933/dashboard_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

