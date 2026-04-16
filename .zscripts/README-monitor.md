# Monitoring Utilyx - Guide DevOps

## Scripts disponibles

### `.zscripts/monitor.sh`
Script principal de monitoring. Vérifie :
- HTTP status (200, 307, 301, 302 = OK)
- Latence en ms
- Expiration certificat SSL

**Logs**: `/tmp/utilyx-monitor.log`
**Alertes**: `/tmp/utilyx-alerts.log`

### `.zscripts/health-check.sh`
Health check léger pour monitoring externe (crontab, uptime robot, etc.)
**Output JSON**: `/tmp/utilyx-health.json`

### `.zscripts/utilyx-monitor.plist`
LaunchAgent pour macOS (exécution toutes les 5 minutes auto)

## Installation (macOS LaunchAgent)

```bash
cp .zscripts/utilyx-monitor.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/utilyx-monitor.plist
```

## Configuration optionnelle

Pour recevoir des alertes via webhook:
```bash
export WEBHOOK_URL="https://..."
```

## Résultats derniers checks

| Date | HTTP | Latence | Status |
|------|------|---------|--------|
| $(date) | 200 | ~2s | ✅ OK |

