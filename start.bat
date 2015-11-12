@echo off
start ConEmu64 /cmdlist "npm run start" -new_console:fn ^|^|^| "cmd" -cur_console:s2T25V
start ConEmu64 /cmdlist "npm run test" -cur_console:fn
