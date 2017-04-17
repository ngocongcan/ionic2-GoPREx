http://www.iconarchive.com/show/flag-icons-by-gosquared.10.html
https://www.joshmorony.com/adding-responsive-charts-graphs-to-ionic-2-applications/

Ahead of time compilation
npm run ionic:build --aot

follow by 
ionic run android --prod --device
ionic run ios --device -lc

to build
ionic build android --prod
ionic build ios --prod --device

to add custom icon and splash
copy custom icon and plash into resources folder
run 'ionic resources'
then follow by build.

**Push Notification
$ ionic plugin add phonegap-plugin-push --variable SENDER_ID=XXXXXXXXX
The sender ID in config.xml need to change when PROD build.
Remember to change the Sender_Id in app.component.ts

*** PROD build
* Make sure Facebook ID is updated
* Make sure Google OAuth and analytic is updated

*** RELEASE build
*  Rename the config.ts file. eg: config.prod.ts.bak rename to config.ts 
