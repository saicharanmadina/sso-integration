NodeJS Project

Steps to integrate login with Google/Github

Create client credentials using the documentation below

Google: https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid
Github: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app

Update the .env file with the variables mentioned in the .env.sample file

To verify Google login, navigate to `http://localhost:3000/auth/google`

To verify Github login, navigate to `http://localhost:3000/auth/github`