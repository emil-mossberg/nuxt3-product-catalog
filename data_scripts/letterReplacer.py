#! /usr/bin/python3
import re  

# ÅÄÖ mappings

# \u00e5 - å
# \u00c5 - Å
# \u00e4 - ä
# \u00c4 - Ä
# \u00f6 - ö
# \u00d6 - Ö

word = "Andra gr\u00f6dor     \u00e5 asdasd asdasd\u00c5asdasd"


def createSlug(word):
    charChange = {
    '\u00e5' : 'a', 
    '\u00c5' : 'a',
    '\u00e4' : 'a',
    '\u00c4' : 'a',
    '\u00f6' : 'o',
    '\u00d6' : 'o'
    }

    for change in charChange:
        word = re.sub(change, charChange[change], word)


    word = re.sub(r'\s+', '-', word)
    word = word.lower()

    return word


print(createSlug(word))