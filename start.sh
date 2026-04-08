#!/bin/bash
# Utilyx Server — Start script
# Kills any existing process on port 3000, then starts the production server

PORT=3000

echo "=== Utilyx Server ==="

# 1. Kill existing processes on port 3000
fuser -k ${PORT}/tcp 2>/dev/null
sleep 1

# 2. Check build exists
if [ ! -f ".next/standalone/server.js" ]; then
  echo "Build manquant. Lancement de npm run build..."
  npm run build
fi

# 3. Start server
echo "Démarrage du serveur sur le port ${PORT}..."
NODE_ENV=production PORT=${PORT} HOSTNAME=127.0.0.1 node .next/standalone/server.js &
SERVER_PID=$!

echo "PID: $SERVER_PID"
echo "Serveur démarré: http://localhost:${PORT}"

# 4. Wait and verify
sleep 2
if kill -0 $SERVER_PID 2>/dev/null; then
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 http://127.0.0.1:${PORT}/fr 2>/dev/null)
  if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Serveur actif — HTTP ${HTTP_CODE}"
  else
    echo "⚠️ Serveur démarré mais HTTP ${HTTP_CODE}"
  fi
else
  echo "❌ Le serveur a crashé au démarrage"
fi
