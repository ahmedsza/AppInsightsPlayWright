const { chromium } = require("playwright-chromium");
const appInsights = require("applicationinsights");
appInsights.setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY)
    .setAutoCollectPerformance(false)
    .setSendLiveMetrics(true)
    .start()


module.exports = async function (context, req) {
    context.log("we are about start");

    let start = process.hrtime();
    let client = appInsights.defaultClient;

    // some additional appinsights code... not really needed but just to demo
    
client.trackEvent({name: "my custom event", properties: {customProperty: "custom property value"}});
client.trackException({exception: new Error("handled exceptions can be logged with this method")});
client.trackMetric({name: "custom metric", value: 3});
client.trackTrace({message: "trace message"})




     const url =  "https://b2creact01.azurewebsites.net/'";
     const browser =  await chromium.launch({
        headless: true
      });
     const page = await browser.newPage();
     await page.goto(url);

     const [page3] = await Promise.all([
        page.waitForEvent('popup'),
        page.click('text=Sign in using Popup')
      ]);
    
      await page3.fill('[placeholder="Email Address"]', process.env.B2CUSERNAME); 
      await page3.fill('[placeholder="Password"]', process.env.B2CPASSWORD); 

      await Promise.all([
        page3.waitForNavigation(),
        page3.click('button')
      ]);
    
      await page.click('text=HelloAPI');
      await page.dblclick('text=value1');



     const screenshotBuffer = await page.screenshot({ fullPage: true });
     await browser.close();

    context.res = {
        body: screenshotBuffer,
        headers: {
            "content-type": "image/png"
        }
    };
    let stop = process.hrtime(start);
    let timetaken=(stop[0] * 1e9 + stop[1])/1e9;
    let expectedTelemetryData=  { 
        duration: timetaken, id: "id1", message: "message1",success : true, name: "PlayWrightTest", runLocation: "demolocation" 
    };
    
    
    context.log("ending")
    context.log(timetaken);

    // this is the key line of code to send the availability data to Application Insights
    client.trackAvailability(expectedTelemetryData);
};
