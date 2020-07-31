# Gateway-Project

## Pre requirements

Installed mongodb or put in the enviroment the address of the connection to the database whether you use Atlas.

## Environment Settings

There is a .env file in the root folder that contains all definitions.
Using the dotenv NPM package, it will load it into the process.env object.
<b>It is recommended that you add the .env to your gitignore when cloning this project as it will contain sensitive data.</b>

PORT = 5000
NONGO_URI = 'mongodb://localhost:27017/gateways-db'

### Build

```bash
# install dependencies
npm install

# serve with hot reload at localhost:5000
npm start
```

##### Notes:

When the project is run if there is no data in the database, it automatically runs a seed with data

## Endpoints

### Gateway

### Get All Gategays with its peripherals

[GET] http://localhost:5000/api/gateway

### Get One Gateway with its peripherals

[GET] http://localhost:5000/api/gateway/:id

### Create Gateway with or without peripherals

[POST] http://localhost:5000/api/gateway

`headers: Content-Type: application/json`

```json:
    {
        {
            "serialNumber": "serialNumber1",
            "name": "gw1",
            "ipv4": "162.168.1.0",
            "peripherals": [
                {
                    "uid": 9,
                    "vendor": "Osvaldo Lopez"
                }
            ]
        }
    }
```

### Create Gateway with or without peripherals

[POST] http://localhost:5000/api/gateway/setPeripheral/:gatewayId

`headers: Content-Type: application/json`

```json:
{
  "uid": 15,
  "vendor": "Jonh Doe"
}
```

### Update Gateway with or without peripherals

[PUT]http://localhost:5000/api/gateway/:id

`headers: Content-Type: application/json`

```json:
{
  "serialNumber": "serialNumber1",
  "name": "test2",
  "ipv4": "162.168.1.2",
  "peripherals": [
    {
      "uid": 9,
      "vendor": "Osvaldo Lopez"
    }
  ]
}
```

### Delete Peripheral to Gateway

[DELETE]http://localhost:5000/api/gateway/deletePeripheral/:gatewayId/:peripheralId

### Peripheral

### Get All Peripherals

[GET] http://localhost:5000/api/peripheral

### Get One Peripheral

[GET] http://localhost:5000/api/peripheral/:id

### Create Gateway with or without peripherals

[POST] http://localhost:5000/api/peripheral

`headers: Content-Type: application/json`

```json:
{
  "uid": 9,
  "vendor": "Osvaldo Lopez"
}
```

### Update Gateway with or without peripherals

[PUT]http://localhost:5000/api/peripheral/:id

`headers: Content-Type: application/json`

```json:
{
  "uid": 9,
  "vendor": "Daniel Herrera",
  "status": false
}
```

### Delete Peripheral

[DELETE]http://localhost:5000/api/peripheral/:id
