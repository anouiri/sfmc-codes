<script runat='server'>
    Platform.Load("Core","1");
    
    var api = new Script.Util.WSProxy();
 
    try {
    /* Retreive Automations_Monitoring_List DE automations that need to be monitored  */
        var deCustKey = 'Automations_Monitoring_List'; 

        var cols = ["AutomationName", "toBeMonitored"];
        var filter = {
            Property: "toBeMonitored",
            SimpleOperator: "equals",
            Value: true
        };

    var deReturn = api.retrieve("DataExtensionObject[" + deCustKey + "]", cols, filter);
    var automationName = "";
    for (var a = 0; a < deReturn.Results.length; a++) {
        var results = deReturn.Results[a];
        for (var i = 0; i < results.Properties.length; i++) {
            var value = results.Properties[i].Value;
            if (results.Properties[i].Name == "AutomationName") {
                Write(Stringify(value + " : "+ getAutomationStatus(results.Properties[i].Value) + " || "));
            }

          }
        }
    } catch(err) {
        var error = {
            Status: 500,
            Message: err
        }
        Write(Stringify(error)); 
    }

  /* Function to retrieve automation status */ 
  function getAutomationStatus(automationName) {
      var result = api.retrieve("Automation", ["Name","ProgramID","CustomerKey","Status"], {
        Property: "Name",
        SimpleOperator: "equals",
        Value: automationName
    });

    var automation = result.Results[0];
    var objectId = automation.ObjectID;
    if(objectId == null) throw "No automation with the name \"" + automationName + "\" was found.";
    else {
        var status = getAutomationStatusName(automation.Status);
        if(status == "Running" || status == "Ready") {
            var response = "Active";
        }
        else var response = status;
    }
    return status;
    }
  
  /* Function to retrieve automation status based on returned status code - Thanks Ivan ;) */ 
    function getAutomationStatusName(num) {
        switch(num) {
            case -1:
                status = 'Error';
            break;
            case 0:
                status = 'Building error';
            break;
            case 1:
                status = 'Building';
            break;
            case 2:
                status = 'Ready';
            break;
            case 3:
                status = 'Running';
            break;
            case 4:
                status = 'Paused';
            break;
            case 5:
                status = 'Stopped';
            break;
            case 6:
                status = 'Scheduled';
            break;
            case 7:
                status = 'Awaiting trigger';
            break;
            case 8:
                status = 'Inactive trigger';
            break;
        }
        return status;
    }

</script>   
