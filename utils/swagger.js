const options = {
    swaggerDefinition: {
        openapi: "3.1.0",
        info: {
            version: '1.0.0',
            title: "Shopping List API",
            description: "API to access shopping app",
        },
        servers: [
            {
                "url": "http://localhost:3080/api",
                "description": "Local server"
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security:
        {
            bearerAuth: [],
        },
        paths: {
            "/register": {
                post: {
                    summary: "used to register a user",
                    tags: ["User"],
                    responses: {
                        201: {
                            description: "user registered succesfully"
                        }

                    },
                    requestBody: {
                        require: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        username: {
                                            type: "string",
                                            required: true,
                                            description: "username of the user",
                                            example: "user123"
                                        },
                                        password: {
                                            type: "string",
                                            required: true,
                                            description: "password of the user",
                                            example: "password@12342"
                                        },
                                        email: {
                                            type: "string",
                                            required: true,
                                            description: "email of the user",
                                            example: "user@email.com"
                                        },
                                        mobileNumber: {
                                            type: "integer",
                                            required: true,
                                            description: "mobile number of the user",
                                            example: 1234567890
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/login": {
                post: {
                    summary: "used to login a user",
                    tags: ["User"],
                    responses: {
                        201: {
                            description: "user login succesfull"
                        }

                    },
                    requestBody: {
                        require: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        username: {
                                            type: "string",
                                            required: true,
                                            description: "username of the user",
                                            example: "user123"
                                        },
                                        password: {
                                            type: "string",
                                            required: true,
                                            description: "password of the user",
                                            example: "password@12342"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/shoppingList": {
                post: {
                    summary: "use this endpoint to create a shopping list",
                    tags: ["shopping list"],
                    responses: {
                        201: {
                            description: "shopping list added succesfully"
                        }

                    },
                    requestBody: {
                        require: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        userId: {
                                            type: "integer",
                                            required: true,
                                            description: "user id for whom the shopping list has to be created under",
                                            example: 145
                                        },
                                        shoppingListName: {
                                            type: "string",
                                            required: true,
                                            description: "suitable name for your shopping list",
                                            example: "my shopping list"
                                        },
                                        description: {
                                            type: "string",
                                            required: true,
                                            description: "suitable description for your shopping list",
                                            example: "this is my shopping list containing my favourite items"
                                        },
                                        itemList: {
                                            type: "array",
                                            required: false,
                                            description: "array of items in the shopping list",
                                            example: [
                                                {
                                                    "name": "orange",
                                                    "quantity": 4,
                                                    "isleId": 1
                                                },
                                                {
                                                    "name": "apple",
                                                    "quantity": 3,
                                                    "isleId": 1
                                                },
                                                {
                                                    "name": "tissue",
                                                    "quantity": 2,
                                                    "isleId": 3
                                                },
                                                {
                                                    "name": "toothbrush",
                                                    "quantity": 4,
                                                    "isleId": 5
                                                }

                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/shoppingList/{listId}": {
                put: {
                    summary: "used to update name or description of a shopping list",
                    tags: ["shopping list"],
                    responses: {
                        200: {
                            description: "shopping list updated succesfully"
                        }

                    },
                    parameters: [
                        {
                            in: "path",
                            name: "listId",
                            type: "integer",
                            required: true,
                            description: "id of the list to be updated"
                        }
                    ],
                    requestBody: {
                        require: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        userId: {
                                            type: "integer",
                                            required: true,
                                            description: "id of the user that is accesing the request",
                                            example: 145
                                        },
                                        name: {
                                            type: "string",
                                            required: false,
                                            description: "name of the shopping list",
                                            example: "my new list name"
                                        },
                                        description: {
                                            type: "string",
                                            required: false,
                                            description: "description of the shopping list",
                                            example: "this is my new description for my shopping list"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                delete: {
                    summary: "used to delete a shopping list",
                    tags: ["shopping list"],
                    responses: {
                        200: {
                            description: "shopping list deleted succesfully"
                        }

                    },
                    parameters: [
                        {
                            in: "path",
                            name: "listId",
                            type: "integer",
                            required: true,
                            description: "id of the list to be updated"
                        }
                    ],
                    requestBody: {
                        require: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        userId: {
                                            type: "integer",
                                            required: true,
                                            description: "id of the user that is accesing the request",
                                            example: 145
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
        },
    },
    apis: ['./routes/index.js', 'app.js']
}
module.exports = options
