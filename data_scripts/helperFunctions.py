#! /usr/bin/python3
import re  

# Helper function building slug part of the url
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

    word = word.replace(' - ', '-')
    word = word.replace('/', '-')
    word = re.sub(r'\s+', '-', word)
    
    word = word.lower()

    return word