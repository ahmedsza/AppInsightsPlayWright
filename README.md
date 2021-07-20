# AppInsightsPlayWright
Same repo to show using App Insights with Playwright in an Azure Function to send availability info
Check out the powershell script to create the resources and deploy

After deployment is done visit https://azfuncdemoplaywright.azurewebsites.net/api/screenshot (or the name of the function used)
you should see the screenshot

Then check out the application insights resource in the Azure portal. 
Click Availability - and you see the custom Availability Test called PlayWrightTest displayed

