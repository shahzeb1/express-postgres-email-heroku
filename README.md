# An Express / Postgres server for adding emails to a db

### Built specifically for [Heroku](https://heroku.com).

#### Instructions:

1. Clone this repo.
2. Run `npm install`.
3. Make sure Postgres is installed on your heroku app.
4. Run `git add .`, `git commit -am "commit"`, then `git push heroku master`

Run the command `curl --data "email=something@gmail.com" https://example.herokuapp.com/add` to add email to database.
