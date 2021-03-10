# Information Architecture
The initial plan for the database and user flow has changed slightly where more efficient methods or routings were found 
the plan for the database and website user flow are as follows:
![Logic Plan](/readme-supporting-docs/website_logic_plan.jpg)
![Database Plan](/readme-supporting-docs/database_overview.jpg)


The final database structure consists of one database, hosting 6 different collections:
1. Users: 
    1. A list of website users also used to save data from other collections into, such as "fav_recipes" and "cart_items".
2. Recipes:
    1. Mostly isolated, this collections records are only connected back to Users via the "created_by" field.
3. Products:
    1. This collection is isolated, in the sense that it does not depend or call on any other collection.
4. Comments:
    1. This collection of records is used for comments on specific recipes. Once navigating to a recipe page, all comments that are for that recipe 
    will be pulled from MongoDB.
5. Messages:
    1. The messages collection is almost the same as comments, however these are messages that users can leave on another users profile. 
6. Tickets:
    1. Tickets are the records that admins have full access to, but users will only have access to tickets they have created. The reply field 
    is an array, with each reply being stored at the end of the list. This allows a back and forth conversation between users and admins before finally closing 
    and deleting the ticket.


## Database: Ripe Recipes
## Collections: Users, Recipes, Products, Comments, Messages & Tickets.

### A Table Representation Of The Database & Collections Can Be Found Below:

| Users       | Recipes       | Products | Comments     | Messages     | Tickets       |
|-------------|---------------|----------|--------------|--------------|---------------|
| _id         | _id           | _id      | _id          | _id          | _id           |
| username    | category_name | name     | message_from | message_from | query_type    |
| email       | recipe_name   | price    | message_for  | message_for  | details       |
| fav_food    | serves        | photos   | message_text | message_text | submit_by     |
| prof_pic    | prep_time     | about    | rating       | date         | user_id       |
| bio         | cooking_time  | desc     | date         |              | ticket_opened |
| password    | difficulty    |----------|--------------|--------------| reply         |
| fav_recipes | pic_url       |          |              |              | open_ticket   |
| cart_items  | description   |          |              |              | closed_by     |
| is_admin    | ingredients   |          |              |              |---------------|
|-------------| instructions  |          |              |              |               |
|             | created_by    |          |              |              |               |
|             | tags          |          |              |              |               |
|             | kcal          |          |              |              |               |
|             | fat           |          |              |              |               |
|             | saturates     |          |              |              |               |
|             | carbs         |          |              |              |               |
|             | sugars        |          |              |              |               |
|             | fibre         |          |              |              |               |
|             | protein       |          |              |              |               |
|             | salt          |          |              |              |               |

## Database Overview Planned:

Back to [Readme](../../README.md)

