## Arrangement Creation (20 points)
You will need to create a form by which an employee can create new arrangement designs. Designs should include a name, description, and an image. You should take advantage of the existing database.arrangements.create() method to commit the new arrangement to the database.This area will be used by the assessor to leave comments related to this criterion.

## Arrangement Updating (20 points)
You will need to add a method by which an employee can edit details about an arrangement. This includes populating the form with existing values, and using the database.arrangement.update() method to commit changes to the database.

## Authentication (15 points)
You will need to add password-based authentication to authenticate employees. This involves creating a users table in the database, and storing usernames, salt, and the encrypted password. Additionally, you will need to create a login form and store session data using cookies.

## Role-Based Authorization (20 points)
Only authorized users should be allowed to access forms and endpoints for modifying site data. Specifically: - Admins can create and update users - All users can update their password - All users can create and update arrangements

## Password Update (10 points)
You will also need to add support for updating a user's password. This should involve verifying the existing password before creating and storing the new one in the database.

## User Creation (15 points)
Admins can create new users, set their role, and a default password for them. You will need to implement the forms and endpoints to make this possible.
