# SSO Integration

Integrate login with Google/Github

## Important Links

Create client credentials using the documentation below

Google: https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid

Github: https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app

## Steps

1. Update the .env file with the variables mentioned in the .env.sample file
2. Start the application `node src/app.js`
3. To verify Google login, navigate to `http://localhost:3000/auth/google` 
4. To verify Github login, navigate to `http://localhost:3000/auth/github`
5. Once the login flow is complete, the response will be printed as JSON in the browser tab