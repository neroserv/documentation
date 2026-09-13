# Root-Passwort ändern

Das Passwort, das du bei der Serverbestellung erhalten hast, solltest du nach dem ersten Login austauschen. Es wurde per E-Mail oder im Dashboard übermittelt und ist damit an mehr Stellen gespeichert, als dir lieb sein kann.

## Voraussetzungen

- Zugriff auf den Server per [SSH](/rootserver/linux/ssh-verbinden) oder über die Konsole im Dashboard
- Root-Rechte bzw. ein Benutzer mit `sudo`

## Passwort des eigenen Benutzers ändern

Bist du als `root` angemeldet, genügt:

```bash
passwd
```

Du wirst zweimal zur Eingabe des neuen Passworts aufgefordert. Während der Eingabe erscheint **keine** Ausgabe — auch keine Sternchen. Das ist so gewollt.

## Root-Passwort als anderer Benutzer ändern

Arbeitest du mit einem normalen Benutzer, setzt du das Root-Passwort so:

```bash
sudo passwd root
```

## Passwort eines anderen Benutzers ändern

```bash
sudo passwd benutzername
```

## Ein sicheres Passwort erzeugen

Lass dir eines generieren, statt dir selbst eines auszudenken:

```bash
openssl rand -base64 24
```

Speichere es in einem Passwort-Manager. Ein Passwort, das du dir merken kannst, ist für einen Server, auf den du dich ohnehin per Schlüssel verbindest, nicht nötig.

::: tip Besser als jedes Passwort
Ein SSH-Schlüssel ist sicherer und bequemer zugleich. Wie du auf Schlüssel umstellst und die Passwortanmeldung anschließend abschaltest, steht hier: [SSH-Zugang absichern](/rootserver/konfiguration/ssh-absichern)
:::

## Root-Login ganz abschalten

Sobald ein Benutzer mit `sudo`-Rechten existiert und du dich damit erfolgreich anmelden kannst, solltest du den direkten Root-Login über SSH deaktivieren. Das nimmt Angreifern das bekannteste Ziel:

```bash
sudo nano /etc/ssh/sshd_config
```

```
PermitRootLogin no
```

Konfiguration prüfen und übernehmen:

```bash
sudo sshd -t && sudo systemctl restart ssh
```

::: danger Sitzung offen lassen
Teste den neuen Zugang immer in einem **zweiten** Terminalfenster, bevor du das erste schließt. Sperrst du dich aus, kommst du nur noch über die Notfallkonsole im Dashboard auf den Server.
:::

## Passwort vergessen

Hast du dich komplett ausgesperrt, hilft die Konsole im ForgeHost Dashboard weiter. Von dort aus meldest du dich direkt am System an — unabhängig von SSH — und kannst das Passwort neu setzen.

## Troubleshooting

- **`Authentication token manipulation error`:** Du hast keine ausreichenden Rechte. Nutze `sudo passwd`.
- **`BAD PASSWORD: The password is shorter than 8 characters`:** Nur ein Hinweis — als Root kannst du ihn mit einer erneuten Eingabe übergehen. Besser: ein längeres Passwort wählen.
- **Neues Passwort wird beim Login nicht akzeptiert:** Prüfe, ob du dich am richtigen Benutzer anmeldest, und ob `PasswordAuthentication` in der SSH-Konfiguration überhaupt noch erlaubt ist.
