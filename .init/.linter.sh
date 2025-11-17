#!/bin/bash
cd /home/kavia/workspace/code-generation/edulearn-learning-management-system-253210-253219/frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

