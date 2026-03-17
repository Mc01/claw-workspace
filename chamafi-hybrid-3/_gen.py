import os, json

BASE = '/app/workspace/chamafi-hybrid-3'

# We'll build the HTML as a list of lines and join them
lines = []
A = lines.append

# ---- HEAD ----
A('<!DOCTYPE html>')
A('<html lang="en">')
A('<head>')
A('  <meta charset="UTF-8" />')
A('  <meta name="viewport" content="width=device-width, initial-scale=1.0" />')
A('  <title>ChamaFi &mdash; Savings Circles, Reimagined on Celo</title>')
A('  <link rel="preconnect" href="https://fonts.googleapis.com" />')
A('  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />')
A('  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&amp;family=Space+Mono:wght@400;700&amp;display=swap" rel="stylesheet" />')
A('  <link rel="stylesheet" href="/style.css" />')
A('</head>')
A('<body class="loading">')
A('')

open(BASE + '/_gen.py', 'w').write('\n'.join(lines))
print('wrote', len(lines), 'lines to _gen.py')
