<script runat=server>

var city = Platform.Request.GetFormField('city');
var email = Platform.Request.GetFormField('email');

// Detect form submission
if ( (city) && (email) ) { 

   var weather = getWeather(city);

   var temp = weather.temp;
   var feels = weather.feelslike;

   var prox = new Script.Util.WSProxy();
   var key = 20160; // update value!
   var subscriberKey = 'temp-subscriber';
 
   var ts = {
         TriggeredSendDefinition: {
               CustomerKey: key
            },
            Subscribers: [{
               EmailAddress: email,
               SubscriberKey: subscriberKey,
               Attributes: [{
                  Name: 'city',
                  Value: city
               },
               {
                  Name: 'temp',
                  Value: temp
               },
               {
                  Name: 'feels',
                  Value: feels
               }]
            }]
         };

  var res = prox.createItem('TriggeredSend', ts);
  Platform.Variable.SetValue('@sent', 1);

}

function getWeather(loc) {

   var apiKey = 'b9e7ffe9542245a483174e40223dccfd';
   var url = 'http://api.weatherstack.com/forecast?access_key=' + apiKey + '&query=' + loc;
   var weather = Platform.Function.HTTPGet(url);
   var obj = Platform.Function.ParseJSON(weather);

       return {
        temp: obj.current.temperature,
        feelslike: obj.current.feelslike
       };

}

</script>
<!DOCTYPE html>
<html>
   <body>

%%[ if empty(@sent) then]%%

<h2>Complete the form for a real-time forecast</h2>
<form action="%%=RequestParameter('PAGEURL')=%%" method="post">
   <label>City</label>
   <input type="text" name="city">
   <label>Email</label>
   <input type="text" name="email">
   <input type="submit" value="Submit">
</form>

%%[ else ]%%

<h2>Complete the form for a real-time forecast</h2>
<p>An email has been sent to your address</p>

%%[ endif ]%%
   </body>
</html>