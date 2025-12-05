@echo off
chcp 65001 >nul
python blog-generator.py "%~1"
