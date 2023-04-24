#! /usr/bin/python3
import helperFunctions
import json

categoryIndex = {}

with open('./categories.json') as user_file:
  parsed_json = json.load(user_file)
#  Parsing 0 level data
  del parsed_json['products']
  parsed_json['slug_name'] = helperFunctions.createSlug(parsed_json['name'])

#  Parsing first level data
for categoryId0 in parsed_json['children']:

   del parsed_json['children'][categoryId0]['products']
   
   currentSlug0 = helperFunctions.createSlug(parsed_json['children'][categoryId0]['name'])
   parsed_json['children'][categoryId0]['slug_name'] = currentSlug0
  
    #  Parsing second level data
   for categoryId1 in parsed_json['children'][categoryId0]['children']:
      del parsed_json['children'][categoryId0]['children'][categoryId1]['products']
      currentSlug1 = helperFunctions.createSlug(parsed_json['children'][categoryId0]['children'][categoryId1]['name'])
      parsed_json['children'][categoryId0]['children'][categoryId1]['slug_name'] = currentSlug1

      #  Parsing third level data
      for categoryId2 in parsed_json['children'][categoryId0]['children'][categoryId1]['children']:
        del parsed_json['children'][categoryId0]['children'][categoryId1]['children'][categoryId2]['products']
        currentSlug2 = helperFunctions.createSlug(parsed_json['children'][categoryId0]['children'][categoryId1]['children'][categoryId2]['name'])
        parsed_json['children'][categoryId0]['children'][categoryId1]['children'][categoryId2]['slug_name'] = currentSlug2
        
with open('categoryTree.json', 'w') as outfile:
    json.dump((parsed_json), outfile, indent=4)