#! /usr/bin/python3
import json
import re  
import helperFunctions

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

categoryIndex = {}

with open('./categories.json') as user_file:
  parsed_json = json.load(user_file)
#  Parsing 0 level data
  categoryIndex[helperFunctions.createSlug(parsed_json['name'])] = { "name": parsed_json['name'], "id": parsed_json['id'], "products": parsed_json['products'] }

#  Parsing first level data
for categoryId0 in parsed_json['children']:
   breadCrumb = [{'name': 'Produktkatalogen', 'url' : '/'}]
   currentSlug0 = helperFunctions.createSlug(parsed_json['children'][categoryId0]['name']) 
   currentName0 = parsed_json['children'][categoryId0]['name']

   breadCrumb.append({'name': currentName0, 'url': currentSlug0 })

   categoryIndex[currentSlug0] = { "name": currentName0, "id": categoryId0, "products": parsed_json['children'][categoryId0]['products'], "breadcrumbs": breadCrumb}

    #  Parsing second level data
   for categoryId1 in parsed_json['children'][categoryId0]['children']:
      breadCrumb1 = breadCrumb.copy()
      currentSlug1 = helperFunctions.createSlug(parsed_json['children'][categoryId0]['children'][categoryId1]['name'])
      currentName1 = parsed_json['children'][categoryId0]['children'][categoryId1]['name']
      breadCrumb1.append({'name': currentName1, 'url': currentSlug1 })
      categoryIndex[currentSlug1] = {"name": currentName1,  "id" : categoryId1, "products": parsed_json['children'][categoryId0]['children'][categoryId1]['products'], "breadcrumbs": breadCrumb1 }


      #  Parsing third level data
      for categoryId2 in parsed_json['children'][categoryId0]['children'][categoryId1]['children']:
        breadCrumb2 = breadCrumb1.copy()
        currentSlug2 = helperFunctions.createSlug(parsed_json['children'][categoryId0]['children'][categoryId1]['children'][categoryId2]['name'])
        currentName2 = parsed_json['children'][categoryId0]['children'][categoryId1]['children'][categoryId2]['name']
        breadCrumb2.append({'name' : currentName2, 'url' : currentSlug2})
        categoryIndex[helperFunctions.createSlug(parsed_json['children'][categoryId0]['children'][categoryId1]['children'][categoryId2]['name'])] = {"name": currentName2, "id" : categoryId2, "products": parsed_json['children'][categoryId0]['children'][categoryId1]['children'][categoryId2]['products'], "breadcrumbs" : breadCrumb2 }


with open('categoryProductMapping.json', 'w') as outfile:
    json.dump((categoryIndex), outfile, indent=4)