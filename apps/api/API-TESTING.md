API Testing
===========


```bash
# create 
curl -v -X POST \
  http://localhost:3000/myapi/project \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "myproject",
    "description": "myproject description",
    "projectId": "myproject1",
    "description" : "test 123",
    "owner": "sumo1",
    "organization": "my arg"
  }' \
| jq .

# get all
curl -v -X GET \
  http://localhost:3000/myapi/project \
| jq .

# get one 
curl -v -X GET \
  http://localhost:3000/myapi/project/5b3289e5ac3366280d6c59de \
| jq .

# patch
curl -v -X PATCH \
  http://localhost:3000/myapi/project/5b3289e5ac3366280d6c59de \
  -H 'Content-Type: application/json' \
  -d '{
    "projectId": "myproject2"
  }' \
| jq .

# verify if it is patched
curl -v -X GET \
  http://localhost:3000/myapi/project/5b3289e5ac3366280d6c59de \
| jq .

# replace
curl -v -X PUT \
  http://localhost:3000/myapi/project/5b3289e5ac3366280d6c59de \
  -H 'Content-Type: application/json' \
  -d '    {
    "name": "myproject",
    "description": "myproject description",
    "projectId": "myproject3",
    "description" : "test 321",
    "owner": "sumo1",
    "organization": "my arg"
   }' \
| jq .

# verify if it is replaced
curl -v -X GET \
  http://localhost:3000/myapi/project/5b3289e5ac3366280d6c59de \
| jq .

# delete
curl -v -X DELETE \
  http://localhost:3000/myapi/project/5b3289e5ac3366280d6c59de \
| jq .

```
