# Package Manager Service

This service manages package information, including creating, and retrieving, package data.

## Endpoints of Packages Module

### 1. Get Domains

- **Endpoint:** `GET pack/domains`
- **Description:** Gets all the domains in the system
- **Headers:**
    - `Bearer <JWT token>` (string): The JWT token.
- **Request DTO:**
  - no request DTO
- **Response DTO:**
  - `Domains` (Array): List of all the domains in the system.

- **Example Response:**
  ```json
  [{
    "id": 1,
    "domain": "driving",
  }]

### 2. Get Servers

- **Endpoint:** `GET pack/servers`
- **Description:** Gets all the servers in the system
- **Headers:**
    - `Bearer <JWT token>` (string): The JWT token.
- **Request DTO:**
  - no request DTO
- **Response DTO:**
  - `Servers` (Array): List of all the servers in the system.

- **Example Response:**
  ```json
  [{
    "id": 1,
    "server": "NXP",
  }]

### 3. Get Packages

- **Endpoint:** `GET pack/packages?server=server&domain=domain&userCredentialsId=userCredentialId`
- **Description:** Gets all the packages in the system
- **Headers:**
    - `Bearer <JWT token>` (string): The JWT token.
- **Request DTO:**
  - **Query Parameters:**
    - `userCredentialId` (number): The id of the logged in user.
    - `server` (string): Selected Server.
    - `domain` (string): Selected Domain.
- **Response DTO:**
  - `Packages` (Array): List of all the packages in the system.

- **Example Response:**
  ```json
  [
    {
        "packageId": 1,
        "packageName": "package1",
        "swVariants": [
            {
                "id": 1,
                "type": "SOURCE",
                "level": "ADVANCE",
                "price": 120,
                "accessLink": "access_link_1",
                "linkToMainImage": "image_link_1",
                "variantFeatures": [
                    {
                        "id": 1,
                        "feature": "feature_1"
                    }
                ],
                "variantSpecDocs": [
                    {
                        "type": "pdf",
                        "docId": 1,
                        "documentName": "asd"
                    }
                ],
                "subscriptionStatus": "SUBSCRIBED"
            }
        ]
    },
    {
        "packageId": 2,
        "packageName": "package2",
        "swVariants": [
            {
                "id": 2,
                "type": "SOURCE",
                "level": "ADVANCE",
                "price": 120,
                "accessLink": "access_link_1",
                "linkToMainImage": "image_link_1",
                "variantFeatures": [
                    {
                        "id": null,
                        "feature": null
                    }
                ],
                "variantSpecDocs": [
                    {
                        "type": null,
                        "docId": null,
                        "documentName": null
                    }
                ],
                "subscriptionStatus": "UNSUBSCRIBED"
            }
        ]
    }
  ]

### 4. Download Package

- **Endpoint:** `GET pack/download/:id`
- **Description:** Download package
- **Headers:**
    - `Bearer <JWT token>` (string): The JWT token.
- **Request DTO:**
  - **Path Parameters:**
    - `id` (number): The id of the package (accessLink).
- **Response DTO:**
  - No response DTO

## Endpoints of Subscriptions Module

### 1. Add Subscription

- **Endpoint:** `POST subscriptions/`
- **Description:** Add a subscription record
- **Headers:**
    - `Bearer <JWT token>` (string): The JWT token.
- **Request DTO:**
  - `userId` (number): Id of the user.
  - `variantId` (number): Id of the variant the user wishes to subscribe to.
- **Response DTO:**
  - `message` (string): message whether the subscription was added successfuly or not.

- **Example Response:**
  ```json
  {
    "message": "Subscription added successfuly, and status is pending approval",
  }

### 2. Approve Subscription

- **Endpoint:** `PUT subscriptions/approve/:id`
- **Description:** Approve Subscription of a user.
- **Headers:**
    - `Bearer <JWT token>` (string): The JWT token.
- **Request DTO:**
  - **Path Parameters:**
    - `id` (number): Id of the subscription.
- **Response DTO:**
  - `message` (string): message whether the subscription was approved successfuly.

- **Example Response:**
  ```json
  {
    "message": "Subscription approved successfuly",
  }

### 3. Reject Subscription

- **Endpoint:** `PUT subscriptions/reject/:id`
- **Description:** Reject Subscription of a user.
- **Headers:**
    - `Bearer <JWT token>` (string): The JWT token.
- **Request DTO:**
  - **Path Parameters:**
    - `id` (number): Id of the subscription.
- **Response DTO:**
  - `message` (string): message whether the subscription was rejected successfuly.

- **Example Response:**
  ```json
  {
    "message": "Subscription removed successfuly",
  }
