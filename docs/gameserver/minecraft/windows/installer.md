# Minecraft Server unter Windows per Installer einrichten

Der schnellste Weg zu einem lauffähigen Server ist der **ForgeHost Minecraft Installer**. Das Skript fragt alles Nötige der Reihe nach ab und erledigt die Schritte aus den [Grundlagen](/gameserver/minecraft/windows/grundlagen) automatisch — ein Befehl genügt.

## Was der Installer erledigt

- lädt die gewünschte [Paper](/gameserver/minecraft/windows/paper)-Version herunter (Standard: die neueste)
- stellt die passende Java-Version bereit — portabel im Serverordner, ohne Systeminstallation
- legt `start.bat`, `server.properties` und `eula.txt` an und fragt dich nach der Zustimmung zur [Minecraft-EULA](https://aka.ms/MinecraftEULA)
- gibt den Server-Port in der Windows-Firewall frei
- richtet hinter einem Heimrouter per UPnP die Portweiterleitung ein, sofern der Router das unterstützt
- aktualisiert bestehende Server später auf einen neuen Build oder eine neue Minecraft-Version und legt vorher ein Backup an

## Voraussetzungen

- Windows Server oder Windows 10/11
- Internetverbindung für den Download von Paper und Java
- Ein Benutzerkonto, das Administratorrechte erhalten darf (für die Firewall-Regeln)

## Installer in PowerShell ausführen

1. Öffne **PowerShell** über das Startmenü. Administratorrechte brauchst du dafür noch nicht — der Installer fordert sie später selbst an.
2. Lege einen Ordner für deine Server an und wechsle hinein. Der Installer schlägt später genau diesen Ordner als Speicherort vor:

   ```powershell
   mkdir C:\Minecraft
   cd C:\Minecraft
   ```

3. Lade den Installer herunter:

   ```powershell
   curl.exe -L "https://fhost.me/paste/673ec7a4-3167-434c-a441-9b6f01746822/raw" -o ForgeHost-Minecraft-Installer.bat
   ```

   `-L` folgt Weiterleitungen, `-o` legt den Dateinamen fest.

4. Starte den Installer. Das vorangestellte `.\` ist nötig, weil PowerShell Programme im aktuellen Ordner sonst nicht findet:

   ```powershell
   .\ForgeHost-Minecraft-Installer.bat
   ```

5. Bestätige die Abfrage der Benutzerkontensteuerung mit **Ja**. Der Installer braucht Administratorrechte für die Firewall-Regeln und läuft dafür in einem neuen Fenster weiter.
6. Wähle **1) Neuen Server installieren** und beantworte die Fragen. Mit **Enter** übernimmst du jeweils den Vorschlag in eckigen Klammern.

Am Ende zeigt der Installer den Serverordner sowie die Adressen an, unter denen der Server im lokalen Netz und über das Internet erreichbar ist, und bietet den direkten Start an. Später startest du den Server über die `start.bat` im Serverordner.

::: warning `curl.exe` statt `curl`
In Windows PowerShell 5.1 — dem vorinstallierten PowerShell — ist `curl` nur ein Alias für `Invoke-WebRequest` und kennt die Optionen `-L` und `-o` nicht. Mit `curl.exe` rufst du das echte curl auf, das ab Windows 10 (1803) und Windows Server 2019 mitgeliefert wird. In der Eingabeaufforderung und in PowerShell 7 funktioniert der Befehl auch ohne `.exe`.
:::

::: tip Kein curl vorhanden?
Auf älteren Systemen wie Windows Server 2016 lädst du die Datei mit PowerShell-Bordmitteln herunter:

```powershell
[Net.ServicePointManager]::SecurityProtocol = 'Tls12'
Invoke-WebRequest -Uri "https://fhost.me/paste/673ec7a4-3167-434c-a441-9b6f01746822/raw" -OutFile ForgeHost-Minecraft-Installer.bat -UseBasicParsing
```
:::

## Server aktualisieren

Starte den Installer erneut und wähle **2) Bestehenden Server updaten**. Welt, Plugins und Einstellungen bleiben erhalten — ersetzt wird nur die `paper.jar`.

## Wie geht es weiter?

- Spieler verbinden sich über die Adresse, die der Installer am Ende anzeigt. Eine eigene Domain richtest du so ein: [DNS-Einträge für Minecraft-Server](/dashboard/produkte/dns-eintraege/minecraft)
- Wichtige Einstellungen und Konsolenbefehle findest du in den [Grundlagen](/gameserver/minecraft/windows/grundlagen#wichtige-einstellungen-in-der-server-properties)
- Du brauchst eine andere Server-Software als Paper, etwa Forge oder Fabric? Dann folge der passenden Anleitung in der Seitenleiste.
