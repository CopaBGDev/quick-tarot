# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Building and Deploying

### Building the Application

To create a production-ready version of your app, run the following command in your terminal:

```bash
npm run build
```
This will compile your Next.js application and prepare all the necessary assets in an `out` directory.

### Deploying to Firebase App Hosting

Once your application is built, you can deploy it to Firebase. Make sure you have the Firebase CLI installed and you are logged into your Firebase account.

If you don't have the Firebase CLI, you can install it globally via npm:
```bash
npm install -g firebase-tools
```

To deploy your application, run:
```bash
firebase deploy
```

This command will upload your built application to Firebase App Hosting. Once the deployment is complete, the CLI will provide you with the URL to your live application.
