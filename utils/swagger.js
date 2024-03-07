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
                                            type: "number",
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
