import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "docs",

  title: "Dokumentation",
  description: "Willkommen in der offiziellen ForgeHost Dokumentation",
  head: [
    ['link', { rel: 'icon', href: 'https://cdn.forgehost.de/branding/ForgeHostLogo.svg', type: 'image/svg+xml' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: 'https://cdn.forgehost.de/branding/ForgeHostLogo.svg',

    search: {
      provider: 'local'
    },

    nav: [
      { text: 'Webseite', link: 'https://forgehost.de' },
      { text: 'Support', link: 'https://forgehost.de/support' },
      { text: 'Dashboard', link: 'https://dash.forgehost.de' },
      { text: 'Impressum', link: 'https://forgehost.de/imprint' }
    ],

    sidebar: [
      {
        text: 'Allgemein',
        items: [
          { text: 'Start', link: '/' },
          { text: 'Contributer werden', link: '/allgemein/contributer-werden' }
        ]
      },
      {
        text: 'Dashboard',
        items: [
          {
            text: 'Erste Schritte',
            collapsed: true,
            items: [
              { text: 'Login & Registrierung', link: '/dashboard/login-registrierung' }
            ]
          },
          {
            text: 'Mein Account',
            collapsed: true,
            items: [
              { text: 'Account-Verwaltung', link: '/dashboard/mein-account' }
            ]
          },
          {
            text: 'Produkte & Freigaben',
            collapsed: true,
            items: [
              { text: 'Produkte teilen', link: '/dashboard/produkte-freigeben' },
              {
                text: 'Domains',
                collapsed: true,
                items: [
                  { text: 'Domain kaufen', link: '/dashboard/produkte/domain-kaufen' },
                  { text: 'DNS verwalten', link: '/dashboard/produkte/dns-verwalten' },
                  { text: 'Nameserver ändern', link: '/dashboard/produkte/nameserver-aendern' },
                  {
                    text: 'DNS Einträge Beispiele',
                    collapsed: true,
                    items: [
                      { text: 'Webserver', link: '/dashboard/produkte/dns-eintraege/webserver' },
                      { text: 'FiveM Server (SRV)', link: '/dashboard/produkte/dns-eintraege/fivem-srv' },
                      { text: 'Minecraft Server', link: '/dashboard/produkte/dns-eintraege/minecraft' },
                      { text: 'TeamSpeak Server', link: '/dashboard/produkte/dns-eintraege/teamspeak' }
                    ]
                  }
                ]
              },
              {
                text: 'Webspaces',
                collapsed: true,
                items: [
                  { text: 'Webspace bestellen', link: '/dashboard/produkte/webspace-bestellen' },
                  { text: 'Domain verbinden', link: '/dashboard/produkte/webspace-domain-verbinden' },
                  { text: 'Plesk Panel öffnen', link: '/dashboard/produkte/plesk-panel' }
                ]
              },
              {
                text: 'KVM-Server',
                collapsed: true,
                items: [
                  { text: 'Server starten / stoppen', link: '/dashboard/produkte/kvm-power' },
                  { text: 'rDNS erstellen', link: '/dashboard/produkte/rdns-erstellen' },
                  { text: 'Firewall verwalten', link: '/dashboard/produkte/firewall' },
                  { text: 'Backup erstellen', link: '/dashboard/produkte/backup-erstellen' }
                ]
              },
              {
                text: 'Teamspeak Server',
                collapsed: true,
                items: [
                  { text: 'TeamSpeak mieten', link: '/dashboard/produkte/teamspeak-mieten' },
                  { text: 'Server steuern', link: '/dashboard/produkte/teamspeak-steuern' },
                  { text: 'Tokens erstellen', link: '/dashboard/produkte/teamspeak-tokens' }
                ]
              }
            ]
          },
          {
            text: 'Abrechnung',
            collapsed: true,
            items: [
              { text: 'Rechnungen & Zahlungen', link: '/dashboard/abrechnung' }
            ]
          },
          {
            text: 'Support',
            collapsed: true,
            items: [
              { text: 'Support-Tickets erstellen', link: '/dashboard/support-tickets' },
              { text: 'Community-Hilfe', link: '/dashboard/community-hilfe' },
              { text: 'Support-Freigabe (Login als Kunde)', link: '/dashboard/support-freigabe' }
            ]
          }
        ]
      },
      {
        text: 'Root Server',
        items: [
          {
            text: 'Anwendungen',
            collapsed: false,
            items: [
              { text: 'Docker installieren', link: '/rootserver/anwendungen/docker-installieren' },
              { text: 'Node.js + npm installieren', link: '/rootserver/anwendungen/nodejs-installieren' },
              { text: 'Java installieren', link: '/rootserver/anwendungen/java-installieren' },
              { text: 'Nginx installieren', link: '/rootserver/anwendungen/nginx-installieren' },
              { text: 'Certbot installieren', link: '/rootserver/anwendungen/certbot-installieren' },
              { text: 'PHPMyAdmin + Nginx + MySQL installieren', link: '/rootserver/anwendungen/phpmyadmin-nginx-mysql-installieren' },
              { text: 'Screen installieren und nutzen', link: '/rootserver/anwendungen/screen-installieren-und-nutzen' },
              { text: 'Pterodactyl Panel installieren', link: '/rootserver/anwendungen/pterodactyl-installieren' },
              { text: 'Mailcow Mailserver installieren', link: '/rootserver/anwendungen/mailcow-installieren' }
            ]
          },
          {
            text: 'Tools',
            collapsed: true,
            items: [
              { text: 'Speed Test', link: '/rootserver/tools/speed-test' },
              { text: 'btop installieren', link: '/rootserver/tools/btop-installieren' }
            ]
          },
          {
            text: 'Windows',
            collapsed: true,
            items: [
              { text: 'Mit Windows Server verbinden (RDP)', link: '/rootserver/windows/rdp-verbinden' },
              { text: 'Windows Firewall einstellen', link: '/rootserver/windows/firewall-einstellen' }
            ]
          },
          {
            text: 'Linux',
            collapsed: true,
            items: [
              { text: 'Mit Linux Server verbinden (SSH)', link: '/rootserver/linux/ssh-verbinden' }
            ]
          },
          {
            text: 'Konfiguration',
            collapsed: true,
            items: [
              { text: 'Root-Passwort ändern', link: '/rootserver/konfiguration/root-passwort-aendern' },
              { text: 'SSH Zugang absichern', link: '/rootserver/konfiguration/ssh-absichern' },
              { text: 'UFW installieren und konfigurieren', link: '/rootserver/konfiguration/ufw-konfigurieren' },
              { text: 'Fail2ban installieren', link: '/rootserver/konfiguration/fail2ban-installieren' }
            ]
          }
        ]
      },
      {
        text: 'Gameserver',
        items: [
          {
            text: 'FiveM',
            collapsed: false,
            items: [
              { text: 'Server installieren (Linux)', link: '/gameserver/fivem/installation-linux' },
              { text: 'Lizenz Key hinterlegen', link: '/gameserver/fivem/lizenz-key-hinterlegen' },
              { text: 'Steam Web API Key hinterlegen', link: '/gameserver/fivem/steam-web-api-key-hinterlegen' },
              { text: 'Admin hinzufügen', link: '/gameserver/fivem/admin-hinzufuegen' },
              { text: 'Resources hinzufügen', link: '/gameserver/fivem/resources-hinzufuegen' },
              { text: 'Server beitreten', link: '/gameserver/fivem/server-beitreten' }
            ]
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/neroserv' },
      { icon: 'discord', link: 'https://discord.gg/HU5EP9mdtM' },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z"/></svg>'
        },
        link: 'https://forgehost.de'
      }
    ]
  }
})
