import glob
import re

files = glob.glob('src/content/models/*.md')
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()

    lines = content.split('\n')
    new_lines = []
    changed = False
    
    for line in lines:
        if line.strip().startswith("answer: '") and line.endswith("'"):
            inner_text = line[line.find("answer: '") + 9 : -1]
            inner_text = inner_text.replace('"', '\\"') 
            new_line = line[:line.find("answer: '")+8] + ' "' + inner_text + '"'
            new_lines.append(new_line)
            changed = True
        else:
            new_lines.append(line)
            
    if changed:
        with open(f, 'w', encoding='utf-8') as file:
            file.write('\n'.join(new_lines))
        print(f"Fixed YAML in {f}")
