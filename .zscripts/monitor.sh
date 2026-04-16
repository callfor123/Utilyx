#!/bin/bash
# Utilyx Uptime Monitor
# Vérifie la disponibilité, latence et certificat SSL

SITE="utilyx.app"
LOG_FILE="/tmp/utilyx-monitor.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

log() {
    echo "[$TIMESTAMP] $1" | tee -a "$LOG_FILE"
}

check_http() {
    local start_time=$(python3 -c "from time import time; print(int(time() * 1000))")
    local http_code=$(curl -s -o /dev/null -w "%{http_code}" "https://$SITE/" --max-time 10 -L)
    local end_time=$(python3 -c "from time import time; print(int(time() * 1000))")
    local latency=$((end_time - start_time))
    
    echo "$http_code|$latency"
}

check_ssl() {
    echo | openssl s_client -connect "$SITE:443" -servername "$SITE" 2>/dev/null | openssl x509 -noout -dates 2>/dev/null | grep NotAfter | cut -d= -f2
}

alert_down() {
    local message="$1"
    log "⚠️ ALERTE: $message"
    echo "[$TIMESTAMP] DOWN: $message" >> /tmp/utilyx-alerts.log
}

# Exécution
log "=== Vérification Utilyx ==="

result=$(check_http)
http_code=$(echo "$result" | cut -d'|' -f1)
latency=$(echo "$result" | cut -d'|' -f2)

log "HTTP: $http_code | Latence: ${latency}ms"

if [[ "$http_code" =~ ^(200|307|301|302)$ ]]; then
    log "✅ Site accessible"
    [ "$latency" -gt 2000 ] && log "⚠️ Latence élevée: ${latency}ms"
else
    alert_down "HTTP $http_code - Latence ${latency}ms"
fi

# SSL check
ssl_expiry=$(check_ssl)
[ -n "$ssl_expiry" ] && log "🔒 SSL expire: $ssl_expiry"

log "=== Fin ==="
