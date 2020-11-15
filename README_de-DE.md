# Generator-Swift

Ein Generator für Open-Source-Swift

---

[![Gitpod-Ready-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/jmuelbert/generator-swift)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/caf2526829cb447b9ca6091cccebad27)](https://app.codacy.com/manual/jmuelbert/generator-swift?utm_source=github.com&utm_medium=referral&utm_content=jmuelbert/generator-swift&utm_campaign=Badge_Grade_Dashboard)
[![NPM version][npm-image]][npm-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Coverage percentage][coveralls-image]][coveralls-url]
[![GitHub All Releases](https://img.shields.io/github/downloads/jmuelbert/generator-swift/total?label=downloads%40all)](https://github.com/jmuelbert/generator-swift/releases)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![pre-commit](https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit&logoColor=white)](https://github.com/pre-commit/pre-commit)
[![Help wanted issues](https://img.shields.io/github/issues/jmuelbert/generator-swift/help%20wanted)](https://github.com/jmuelbert/generator-swift/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)


[Funktionen](https://github.com/jmuelbert/generator-swift) | [Dokumentation](https://jmuelbert.github.io/generator-swift/) | [Änderungsprotokoll](CHANGELOG.md) | [Beitragen](CONTRIBUTING_de-DE.md) | [FAQ](https://github.com/jmuelbert/generator-swift/wiki/FAQ) | [english](README.md)

## Erste Schritte

- Abhängigkeiten
  - Installieren von Node.js auf MacOS

    ```bash
      Knoten installieren
    ```

  - Installieren von Node.js auf Windows-Betriebssystem

    ```cmd
       choco install nodejs
    ```

  - Yeoman: ``` npm install -g yo ```
  - Installieren: ``` npm install -g generator-swift ```

## Verwendung

- `yo swift` zeigt einen Assistenten zur Erstellung einer neuen swift-Anwendung oder Bibliothek
- Für die Verwendung von [swiftlint](https://github.com/realm/SwiftLint) muss dies mit installiert werden: `brauen Sie swiftlint installieren`.

## Vorlage-Projekte

Vollständige, vorlagenbasierte Projekte im Generator verfügbar:

- Leere Anwendung
- Konsolen-Anwendung
- Klassenbibliothek

### Zusätzlich für die Konsolenanwendung und die Klassenbibliothek

 Jetzt ist es ein Gulpfile für eine Fusselkontrolle für die Swiftfile's
 Dies ist nur unter MacOS verfügbar. Einleiten mit `npm install`

    - Aufruf mit `gulp`Linkcheck und Build durchführen
    - Rufen Sie mit `Schluckfussel` nur den Fusselscheck.

 ## Unterbefehl verfügbar:

    - `swift:class` - Erstellen Sie eine neue Klassenvorlage im Quellenverzeichnis
        - `swift:class` `name` Der neue Klassenname
        - `swift:class` `pfad/name` schreiben Sie die Schablone in das Unterverzeichnis

## Lizenz

Apache-2.0 © [Jürgen Mülbert](https:/github.com/jmuelbert/generator-swift)(https:/github.com/jmuelbert/generator-swift)

Nach oben zurückkehren](#top)

[npm-Bild]: https://badge.fury.io/js/generator-swift.svg
[npm-url]: https://npmjs.org/package/generator-swift
[daviddm-image]: https://david-dm.org/jmuelbert/generator-swift.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/jmuelbert/generator-swift
[coveralls-image]: https://coveralls.io/repos/jmuelbert/generator-swift/badge.svg
[coveralls-url]: https://coveralls.io/r/jmuelbert/generator-swift
