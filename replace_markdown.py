import glob
import re

files = glob.glob('src/content/blog/*.md')
for f in files:
    with open(f, 'rb') as file:
        content = file.read()
    
    # Check if files contain the strings we want to replace
    original_text = content.decode('utf-8')
    new_text = original_text.replace('### Orta CTA (Nitelikli Talep)', '### Hemen netleştirelim')
    new_text = new_text.replace('## Nitelikli İletişim ve Bölge CTA', '## 30 saniyede fiyat aralığı')
    
    if original_text != new_text:
        with open(f, 'wb') as file:
            file.write(new_text.encode('utf-8'))
        print(f"Updated {f}")
