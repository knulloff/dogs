### .env

``` 
PORT=8080
URI=Mongodb-uri
MODE=DEV
SECRET=ghfvnhygub9847ngrgr
```

Here's the API documentation formatted in Markdown for a `README.md` file:

```markdown
# API Documentation

## Endpoints

### 1. **Create User Account**

- **Method**: `POST`
- **URL**: `/create-account`
- **Description**: Creates a new user account.
- **Request Body**:
    ```json
    {
      "username": "string",
      "password": "string",
      ...
    }
    ```

### 2. **Find User Account**

- **Method**: `GET`
- **URL**: `/find-account`
- **Description**: Retrieves user account information.
- **Query Parameters**:
    ```json
    {
      "userId": "string"
    }
    ```

### 3. **Update User Account**

- **Method**: `PUT`
- **URL**: `/update-account`
- **Description**: Updates the user account details.
- **Request Body**:
    ```json
    {
      "userId": "string",
      "newDetails": { ... }
    }
    ```

### 4. **Leaderboard by Points**

- **Method**: `GET`
- **URL**: `/leaderboard`
- **Description**: Retrieves the public leaderboard by points.

### 5. **Admin Leaderboard by Points**

- **Method**: `GET`
- **URL**: `/admin/leaderboard`
- **Description**: Retrieves the admin leaderboard by points.

### 6. **Create New Task**

- **Method**: `POST`
- **URL**: `/create-task`
- **Description**: Creates a new task for the user.
- **Request Body**:
    ```json
    {
      "taskName": "string",
      "taskDetails": { ... }
    }
    ```

### 7. **Complete Task**

- **Method**: `POST`
- **URL**: `/complete-task`
- **Description**: Marks a task as completed by the user.
- **Request Body**:
    ```json
    {
      "taskId": "string",
      "userId": "string"
    }
    ```

### 8. **Task List**

- **Method**: `GET`
- **URL**: `/task-list`
- **Description**: Retrieves a list of available tasks.

### 9. **Point Table by User ID**

- **Method**: `GET`
- **URL**: `/point-table`
- **Description**: Retrieves the user's point table.
- **Query Parameters**:
    ```json
    {
      "userId": "string"
    }
    ```

### 10. **Referred Someone**

- **Method**: `PUT`
- **URL**: `/referred-someone`
- **Description**: Updates referral information for the user.
- **Request Body**:
    ```json
    {
      "userId": "string",
      "referredUserId": "string"
    }
    ```

### 11. **Make Withdraw Request**

- **Method**: `POST`
- **URL**: `/make-withdraw`
- **Description**: Submits a withdrawal request.
- **Request Body**:
    ```json
    {
      "userId": "string",
      "amount": "number"
    }
    ```

### 12. **New Tap Instance**

- **Method**: `POST`
- **URL**: `/new-tap`
- **Description**: Logs a new tap action.
- **Request Body**:
    ```json
    {
      "userId": "string",
      "tapDetails": { ... }
    }
    ```

### 13. **Claim Game Points**

- **Method**: `POST`
- **URL**: `/claim-game-point`
- **Description**: Claims all unclaimed points for the user.
- **Request Body**:
    ```json
    {
      "userId": "string"
    }
    ```

### 14. **Get Redeemable Points**

- **Method**: `GET`
- **URL**: `/claimable-point`
- **Description**: Retrieves how many points the user can redeem.
- **Query Parameters**:
    ```json
    {
      "userId": "string"
    }
    ```

### 15. **Refer Leaderboard List**

- **Method**: `GET`
- **URL**: `/refer-list`
- **Description**: Retrieves the referral leaderboard list.

### 16. **Admin Withdraw Status**

- **Method**: `GET`
- **URL**: `/admin/withdraw-status`
- **Description**: Retrieves the status of the last withdrawal for admin.

### 17. **Admin Task List**

- **Method**: `GET`
- **URL**: `/admin/task`
- **Description**: Retrieves the task list for admin.

### 18. **Admin Login**

- **Method**: `POST`
- **URL**: `/admin/login`
- **Description**: Logs in the admin using a secret code.
- **Request Body**:
    ```json
    {
      "secretCode": "string"
    }
    ```

### 19. **Admin Withdraw List**

- **Method**: `GET`
- **URL**: `/admin/withdraw-list`
- **Description**: Retrieves all withdrawal requests for admin.

### 20. **Admin Cancel Withdraw**

- **Method**: `PUT`
- **URL**: `/admin/cancel-withdraw`
- **Description**: Cancels a withdrawal request.
- **Request Body**:
    ```json
    {
      "withdrawId": "string"
    }
    ```

### 21. **Admin Recheck Withdraw**

- **Method**: `PUT`
- **URL**: `/admin/recheck-withdraw`
- **Description**: Rechecks a withdrawal request.
- **Request Body**:
    ```json
    {
      "withdrawId": "string"
    }
    ```

### 22. **Admin Mark as Paid**

- **Method**: `PUT`
- **URL**: `/admin/paid-withdraw`
- **Description**: Marks a withdrawal as paid.
- **Request Body**:
    ```json
    {
      "withdrawId": "string"
    }
    ```

### 23. **Admin Update Points**

- **Method**: `PUT`
- **URL**: `/admin/update-point`
- **Description**: Updates the points of a user.
- **Request Body**:
    ```json
    {
      "userId": "string",
      "newPoints": "number"
    }
    ```

### 24. **Admin Update Game Play Time**

- **Method**: `PUT`
- **URL**: `/admin/update-game-time`
- **Description**: Updates the game play time for a user.
- **Request Body**:
    ```json
    {
      "userId": "string",
      "newTime": "number"
    }
    ```

---
```
