#! /usr/bin/python3
import json
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

# TO DO - Work out URL form where, what to do with åaö
categoryIndex = {}

with open('./categories.json') as user_file:
  parsed_json = json.load(user_file)
#  Parsing 0 level data
  categoryIndex[createSlug(parsed_json['name'])] = { "name": parsed_json['name'], "id": parsed_json['id'], "products": parsed_json['products'] }

#  Parsing first level data
for categoryId0 in parsed_json['children']:

   categoryIndex[createSlug(parsed_json['children'][categoryId0]['name'])] = { "name": parsed_json['children'][categoryId0]['name'], "id": categoryId0, "products": parsed_json['children'][categoryId0]['products'] }

    #  Parsing second level data
   for categoryId1 in parsed_json['children'][categoryId0]['children']:
      categoryIndex[createSlug(parsed_json['children'][categoryId0]['children'][categoryId1]['name'])] = {"name": parsed_json['children'][categoryId0]['children'][categoryId1]['name'],  "id" : categoryId1, "products": parsed_json['children'][categoryId0]['children'][categoryId1]['products'] }


      #  Parsing third level data
      for categoryId2 in parsed_json['children'][categoryId0]['children'][categoryId1]['children']:
        categoryIndex[createSlug(parsed_json['children'][categoryId0]['children'][categoryId1]['children'][categoryId2]['name'])] = {"name": parsed_json['children'][categoryId0]['children'][categoryId1]['children'][categoryId2]['name'], "id" : categoryId2, "products": parsed_json['children'][categoryId0]['children'][categoryId1]['children'][categoryId2]['products'] }

# print(parsed_json['children'])
with open('categoryProductMapping.json', 'w') as outfile:
    json.dump((categoryIndex), outfile, indent=4)