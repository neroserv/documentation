# Mit Linux Server verbinden (SSH)

## SSH Verbindung herstellen

**SSH** ist die sichere Methode, um auf deinen Linux Server zuzugreifen.

---

## Verbindung herstellen

```bash
ssh root@192.0.2.1
```

oder mit Hostname:

```bash
ssh root@beispiel.com
```

---

## Mit SSH-Key (empfohlen)

```bash
ssh -i ~/.ssh/id_rsa root@192.0.2.1
```

---

## Tipps

- Nutze starke Passwörter
- Verwende SSH-Keys statt Passwörter
- Ändere den default SSH-Port
- Aktiviere 2FA

---

## Nächste Schritte

- 🔒 Konfiguriere **SSH Sicherheit**
- 🔑 Richte **SSH-Keys** ein
