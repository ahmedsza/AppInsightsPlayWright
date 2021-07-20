# AppInsightsPlayWright
Same repo to show using App Insights with Playwright in an Azure Function to send availability info

This code was based on the blog from Anthony Chu https://anthonychu.ca/post/azure-functions-headless-chromium-puppeteer-playwright/ - and the associated sample code at https://github.com/anthonychu/functions-headless-chromium 



Check out the powershell script to create the resources and deploy

After deployment is done visit https://azfuncdemoplaywright.azurewebsites.net/api/screenshot (or the name of the function used)
you should see the screenshot

Then check out the application insights resource in the Azure portal. 
Click Availability - and you see the custom Availability Test called PlayWrightTest displayed

