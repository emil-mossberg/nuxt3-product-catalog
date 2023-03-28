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

        # TO DO Move this out of loop
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
  del parsed_json['products']
  parsed_json['slug_name'] = createSlug(parsed_json['name'])

  # # print(len(parsed_json['children']))
  # # print(parsed_json['children'])
  # aList = json.load(parsed_json['children'])
  # print(aList)
#  Parsing first level data
for categoryId0 in parsed_json['children']:
   del parsed_json['children'][categoryId0]['products']
   
   parsed_json['children'][categoryId0]['slug_name'] = createSlug(parsed_json['children'][categoryId0]['name'])

    #  Parsing second level data
   for categoryId1 in parsed_json['children'][categoryId0]['children']:
      del parsed_json['children'][categoryId0]['children'][categoryId1]['products']
      parsed_json['children'][categoryId0]['children'][categoryId1]['slug_name'] = createSlug(parsed_json['children'][categoryId0]['children'][categoryId1]['name'])

      #  Parsing third level data
      for categoryId2 in parsed_json['children'][categoryId0]['children'][categoryId1]['children']:
        del parsed_json['children'][categoryId0]['children'][categoryId1]['children'][categoryId2]['products']
        parsed_json['children'][categoryId0]['children'][categoryId1]['children'][categoryId2]['slug_name'] = createSlug(parsed_json['children'][categoryId0]['children'][categoryId1]['children'][categoryId2]['name'])

# print(parsed_json['children'])
with open('categoryTree.json', 'w') as outfile:
    json.dump((parsed_json), outfile, indent=4)