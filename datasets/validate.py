import json

# This is your JSON data loaded as a Python dictionary, assuming 'data' contains your JSON data
data = open("listas.json", "r").read()
data = json.loads(data)

# Add an '_id' to each product inside each shopping list
product_id = 1  # Start numbering products from 1
for shopping_list in data:
    for product in shopping_list["produtos"]:
        product["_id"] = product_id
        product_id += 1

# Convert the modified dictionary back to JSON to print it or use it elsewhere
modified_json = json.dumps(data, indent=4)
print(modified_json)
json.dump(data, open("listas.json", "w"), indent=4)
