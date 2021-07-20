# setup variables 
$azurefunctionName='azfuncdemoplaywright'
$storageName='azfuncdemopw01storage'
$location='westeurope'
$rgName='azfuncdemoplaywright-rg'
$logAnalyticsWorkspaceName='azfuncloganalyticsworkspace'
$appInsightsName='demoplaywrightAppInsights'


# create resource group
az group create --name $rgName --location $location

# create storage account
az storage account create --name $storageName --location $location --resource-group $rgName --sku Standard_LRS

# create log analytics workspace
az monitor log-analytics workspace create -g $rgName -n $logAnalyticsWorkspaceName --location $location

# create application insights inside log analytics workspace
az monitor app-insights component create --app $appInsightsName --location $location --kind web -g $rgName --application-type web  --workspace $logAnalyticsWorkspaceName
$appInsightsKey=(az monitor app-insights component show -g $rgName -a $appInsightsName --query 'instrumentationKey' -o tsv)

# create function app, use appinsights, consumption plan on Linux running Node
az functionapp create --resource-group $rgName --app-insights $appInsightsName --app-insights-key $appInsightsKey  --consumption-plan-location $location --runtime node --runtime-version 12 --functions-version 3 --name $azurefunctionName --storage-account $storageName --os-type Linux

# very important environment variable for playwright
az functionapp config appsettings set --name $azurefunctionName --resource-group $rgName --settings "PLAYWRIGHT_BROWSERS_PATH=0"

# user name and password. SHould pref be in keyvault
az functionapp config appsettings set --name $azurefunctionName --resource-group $rgName --settings "B2CUSERNAME=demo@demo.com"
az functionapp config appsettings set --name $azurefunctionName --resource-group $rgName --settings "B2CPASSWORD=P2ssw0rd124"

# do a deploy with remote build
func azure functionapp publish $azurefunctionName  --build remote --javascript


# if you need to clean up the resource group
az group delete --name $rgName 