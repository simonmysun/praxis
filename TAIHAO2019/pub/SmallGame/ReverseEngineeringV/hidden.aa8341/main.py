#!/usr/bin/env python3
import sys

lookup = [76,105,102,101,32,105,115,32,115,104,111,114,116,44,32,121,111,117,32,110,101,101,100,32,80,121,116,104,111,110]
pw = input('What is the password? \n').strip()
if len(pw) != 30:
    print('Wrong password. ')
    sys.exit(1)
for i in range(0, len(pw)):
    if ord(pw[i]) != lookup[i]:
        print('Wrong password')
        sys.exit(1)

print('Congratulations')
