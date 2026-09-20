@echo off
title Suivi d'importation - Les Industries de Radisson
cd /d "%~dp0"
where python >nul 2>nul
if errorlevel 1 (
  echo Python est introuvable. Installez Python 3.9 ou plus recent.
  pause
  exit /b 1
)
echo ============================================================
echo   Suivi d'importation - Les Industries de Radisson
echo   Serveur local. Coupez cette fenetre pour arreter.
echo ============================================================
python server.py
pause